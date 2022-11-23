<template>
  <div class="header">
    <header class="header_section">
      <h3>File upload</h3>
    </header>
    <main>
      <div class="description">List: {{ listName }}</div>
    </main>

    <FileUpload
        class="p-button-label"
        :customUpload="true"
        :auto="true"
        @uploader="sendFile"
        mode="basic"
        accept=".csv, .xls, .xlsx"
    ></FileUpload>
    <h5 v-if="emptyFile">Empty list, please retry!</h5>
    <div v-if="parsed">
      <h4>DATA PREVIEW: {{ fileName }}</h4>
      <div
          class="parsed_data"
      > {{ parsedSkippedEmptyLines }} record(s) found
      </div>
      <h5>Delimiter: "{{ parsedData.meta.delimiter }}"</h5>
      <h6>Please check if the record seem correct.
        If not, try to go back,
        change parameters and then re-upload or check
        your source-file is not damaged.
      </h6>
    </div>

    <DataTable
        v-if="parsed"
        :value="slicedArray"
        responsiveLayout="scroll"
    >
      <Column
          v-for="col of columns"
          :field="col.field"
          :header="col.header"
          :key="col.id"
          :headerStyle="darkModeSwitch
          ? {'background': '#494C57'}
          : {}"
          :bodyStyle=" darkModeSwitch
          ? {'color': 'white','background': '#32343A' }
          : {}"
      />
    </DataTable>
    <div v-if="parsed" class="paginator_container">
      <Button
          class="p-button-text"
          label="< Show previous"
          @click="paginationBackward"
          v-if="currentPage !== 1"
      />
      <Button
          class="p-button-text"
          label="Show next >"
          @click="paginationForward"
          v-if="currentPage !== lastPageProp"
      />
    </div>
    <div
        v-if="!parsed && !this.$browserDetect.isIOS"
        class="downloader"
    >
      <a
          style="text-decoration: none"
          :href='exampleFile'
          download
      >
        <Button
            icon="pi pi-download"
            label="Download example"
        />
      </a>
    </div>
    <Toast position="bottom-center"/>
  </div>
</template>

<script>
import Vue from 'vue'
import tgMixin from "@/mixins/telegram/tgMixin";
import {mapGetters} from 'vuex'
import Papa from 'papaparse'
import e from '../assets/example.csv'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "Uploader",
  mixins: [tgMixin],
  data() {
    return {
      parsedData: '',
      columns: [],
      parsed: false,
      emptyFile: false,
      fileName: '',
      delimiter: '',
      parsedSkippedEmptyLines: '',
      itemsPerPage: 5,
      currentPage: 1,
      exampleFile: e
    }
  },
  methods: {
    paginationForward() {
      if (this.currentPage < this.lastPageProp) this.currentPage++
    },
    paginationBackward() {
      if (this.currentPage > 1) this.currentPage--
    },
    redirectCb() {
      this.$router.push({name: 'uploadLayout'})
    },
    actionCb() {
      if (this.$route.path === '/uploader') this.$router.push({name: 'mapper'})
    },
    sendFile(event) {
      return new Promise((resolve) => {
        this.fileName = event.files[0].name
        this.$store.commit('setFileName', this.fileName)
        if (event.files[0].type !== 'text/csv') {
          const bodyFormData = new FormData();
          bodyFormData.append('document', event.files[0]);
          this.$store.dispatch('SEND_DOCUMENT', bodyFormData)
              .then(res => {
                if (res.data.status !== 200) {
                  this.$toast.add({
                    severity: 'warn',
                    summary: 'Warning message',
                    detail: 'The server encountered an unexpected error,' +
                        ' try to load again or load in CSV format',
                    life: 3000
                  });
                }
                resolve(res.data.data)
              })
              .catch(err => {
                console.log(err)
                this.$toast.add({
                  severity: 'warn',
                  summary: 'Warning message',
                  detail: 'The server encountered an unexpected error,' +
                      ' try again later!',
                  life: 3000
                });
              })
        } else resolve(event.files[0])
      })
          .then((prevResult) => {
            Papa.parse(prevResult, {
              header: true,
              worker: true,
              skipEmptyLines: 'greedy',
              delimitersToGuess: [',', '\t', '|', ';', ' ', '/', ':',
                Papa.RECORD_SEP, Papa.UNIT_SEP],
              complete: result => {
                if (!result.data.length) this.emptyFile = true
                else {
                  this.emptyFile = false
                  this.parsed = true
                  this.parsedData = result
                  Vue.prototype.$fullObject = result
                  this.parsedSkippedEmptyLines = result.data.length
                  this.$store.commit('setParsedListLength', this.parsedSkippedEmptyLines)
                  this.$store.commit('setParsedFields', result.meta.fields)
                  if (result.meta.delimiter === '\t') this.parsedData.meta.delimiter = 'Tab'
                  if (result.meta.delimiter === ' ') this.parsedData.meta.delimiter = 'Space'
                }
              },
            })
          })
    }
  },
  computed: {
    ...mapGetters(['listName']),
    slicedArray() {
      if (this.parsedData.data) {
        return this.parsedData.data.slice(this.fromProp, this.toProp)
      }
    },
    fromProp() {
      return ((this.currentPage - 1) * this.itemsPerPage)
    },
    lastPageProp() {
      return Math.ceil(this.parsedSkippedEmptyLines / this.itemsPerPage)
    },
    toProp() {
      return this.currentPage * this.itemsPerPage < this.parsedSkippedEmptyLines
          ? this.currentPage * this.itemsPerPage
          : this.parsedSkippedEmptyLines
    },
  },
  watch: {
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.p-column-title')
              .forEach(e => e.classList.replace('p-column-title', 'p-column-title-dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.p-column-title-dark')
              .forEach(e => e.classList.replace('p-column-title-dark', 'p-column-title-dark'))
        }
      },
    },
    parsedData: {
      handler(newValue) {
        this.columns = newValue.meta.fields.map((el) => ({field: el, header: el}))

        if (this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-column-title')
                .forEach(e => e.classList.replace('p-column-title', 'p-column-title-dark'))
          }, 0)
        }
      },
      deep: true
    },
    parsed: {
      handler() {
        globalTelegram.MainButton.setText('Map columns')
        globalTelegram.MainButton.color = '#16a34a'
        globalTelegram.MainButton.show()
      },
    }
  },
  mounted() {
    globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
    this.$store.commit('setVisitedRouteFlag', 0)
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/Uploader.scss';
</style>
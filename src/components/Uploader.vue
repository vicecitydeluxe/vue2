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

    <div v-if="parsed">
      <h4>DATA PREVIEW: {{ fileName }}</h4>
      <div class="parsed_data"> {{ parsedDataLength }} record(s) found</div>
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
    <!--    <button @click="$router.push({name: 'mapper'})">Test</button>-->
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
  </div>
</template>

<script>
import Vue from 'vue'
import tgMixin from "@/mixins/tgMixin";
import {mapGetters} from 'vuex'
import Papa from 'papaparse'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "Uploader",
  mixins: [tgMixin],
  data() {
    return {
      parsedData: '',
      columns: [],
      parsed: false,
      fileName: '',
      delimiter: '',
      parsedDataLength: '',
      itemsPerPage: 5,
      currentPage: 1,
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
      this.fileName = event.files[0].name
      this.updateFileName()
      const bodyFormData = new FormData();
      bodyFormData.append('document', event.files[0]);
      this.$store.dispatch('SEND_DOCUMENT', bodyFormData)

      return new Promise((resolve) => {
        Papa.parse(event.files[0], {
          header: true,
          worker: true,
          skipEmptyLines: true,
          delimitersToGuess: [',', '\t', '|', ';', ' ', '/', ':', Papa.RECORD_SEP, Papa.UNIT_SEP],
          complete: result => {
            resolve(result)
            this.parsed = true
            this.parsedData = result
            this.parsedDataLength = result.data.length
            if (result.meta.delimiter === '\t') this.parsedData.meta.delimiter = 'Tab'
            if (result.meta.delimiter === ' ') this.parsedData.meta.delimiter = 'Space'

          },
        })
      }).then((result) => {
        return new Promise((resolve) => {
          Vue.prototype.$parsedHeaders = Papa.unparse(Object.assign({
            'fields': Object.keys(result.data[0]),
          }), {})
          Vue.prototype.$parsedFullObject = Papa.unparse(Object.assign({
            'fields': Object.keys(result.data[0]),
            'data': result.data.map((el) => Object.values(el))
          }), {
            skipEmptyLines: 'greedy',
          })
          resolve(Vue.prototype.$parsedHeaders)
        })
      }).then(result => {
        const download = function (result) {
          const blob = new Blob([result], {type: 'text/csv'});
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.setAttribute('href', url)
          a.setAttribute('download', 'parsed.csv');
          // uncomment next line to download file
          // a.click()
        }
        //disable timeout to download instantly
        setTimeout(() => download(result), 3000)
        // console.log(res)
      })
    },
    updateFileName() {
      this.$store.commit('setFileName', this.fileName)
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
      return Math.ceil(this.parsedDataLength / this.itemsPerPage)
    },
    toProp() {
      return this.currentPage * this.itemsPerPage < this.parsedDataLength
          ? this.currentPage * this.itemsPerPage
          : this.parsedDataLength
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
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/Uploader.scss';
</style>
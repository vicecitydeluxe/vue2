<template>
  <div class="section">
    <header class="header">
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
      <h6>Please check if the record seem correct. If not, try to go back,change parameters and then re-upload or check
        your source-file is not damaged.</h6>
    </div>

    <DataTable v-if="parsed" :value="parsedData.data"
               responsiveLayout="scroll">
      <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.id"></Column>
    </DataTable>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Papa from 'papaparse'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "Uploader",
  data() {
    return {
      parsedData: '',
      columns: [],
      parsed: false,
      fileName: '',
      parsedDataLength: '',
    }
  },
  methods: {
    sendFile(event) {
      this.fileName = event.files[0].name
      this.updateFileName()
      const bodyFormData = new FormData();
      bodyFormData.append('document', event.files[0]);
      bodyFormData.append('caption', 'Here is your file from web-app')
      bodyFormData.append('disable_notification', false,)
      bodyFormData.append('reply_to_message_id', null)
      bodyFormData.append('chat_id', '191675396')
      this.$store.dispatch('SEND_DOCUMENT', bodyFormData)

      return new Promise((resolve) => {
        Papa.parse(event.files[0], {
          preview: 5,
          header: true,
          worker: true,
          skipEmptyLines: true,
          complete: result => {
            resolve(result)
            this.parsed = true
            this.parsedData = result
          }
        })
      }).then(() => Papa.parse(event.files[0], {
        header: true,
        worker: true,
        skipEmptyLines: true,
        complete: result => {
          this.parsedDataLength = result.data.length
          console.log(result)
        }
      }))
    },
    updateFileName() {
      this.$store.commit('setFileName', this.fileName)
    }
  },
  computed: {
    ...mapGetters(['listName']),
  },
  watch: {
    parsedData: {
      handler(newValue) {
        this.columns = newValue.meta.fields.map((el) => ({field: el, header: el}))
      },
      deep: true
    },
    parsed: {
      handler() {
        globalTelegram.MainButton.setText('Map columns')
        globalTelegram.MainButton.color = '#16a34a'
        globalTelegram.MainButton.show()
            .onClick(() => {
              if (this.$route.path === '/uploader') this.$router.push({name: 'mapper'}
              )
            })
      },
    }
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.hide()
    globalTelegram.BackButton.show().onClick(() => this.$router.push({name: 'uploadLayout'}))
  },
  beforeDestroy() {
    globalTelegram.BackButton.hide().offClick(() => this.$router.push({name: 'uploadLayout'}))
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/Uploader.scss';
</style>
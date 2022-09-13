<template>
  <div>
    <header class="header">
      <h3>File upload</h3>
      <Button icon="pi pi-times" class="p-button-rounded p-button-help p-button-text"
              @click="$router.push({name:'uploadLayout'})"/>
    </header>
    <main>
      <div class="description">List: {{ listName }}</div>
    </main>

    <FileUpload
        :customUpload="true"
        :auto="true"
        @uploader="sendFile"
        mode="basic"
        accept=".csv, .xls, .xlsx"
    ></FileUpload>

    <div v-if="parsed">
      <h4>Data preview: {{ fileName }}</h4>
      <h5>Delimiter: "{{ parsedData.meta.delimiter }}"</h5>
    </div>

    <DataTable v-if="parsed" :value="parsedData.data"
               responsiveLayout="scroll">
      <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.id"></Column>
    </DataTable>
    <!--    <Button v-if="parsed" class="bottom-button" @click="$router.push({name:'mapper'})">Map columns</Button>-->
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
            .show()
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
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/Uploader.scss';
</style>
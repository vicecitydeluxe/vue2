<template>
  <div class="header">
    <!--    <Button @click="sendStatistics">Testyyyyy</Button>-->
    <!--    <Button @click="sendParsedList">LIST SENDER</Button>-->
    <header class="header_section">
      <h3># {{ this.listNameLocal }}</h3>
    </header>
    <main>
      <div>List: {{ this.listNameLocal }}</div>
      <hr class="name_divider">
      <div>File: {{ this.fileNameLocal }}</div>
      <div class="description">Estimation of how loaded
        leads are unique across all your leads. Numbers are valid on:
        {{ this.todayDate }}
      </div>
      <div class="description_divider">Lead loading results</div>
      <DataTable
          :value="privateResults"
          responsiveLayout="scroll"
      >
        <Column
            v-for="col of privateColumns"
            :field="col.field"
            :header="col.header"
            :key="col.field"
            :headerStyle="darkModeSwitch
            ? {'background': '#494C57'}
            : {}"
            :bodyStyle=" darkModeSwitch
            ? {'color': 'white','background': '#32343A' }
            : {}"
        />
      </DataTable>
      <Button
          style="margin-top: 10px;"
          label="Download wrong results"
          @click="downloadInvalidLeads"
          v-if="invalidFieldsChecker"
      />
      <hr class="hidden">
      <div class="description_divider">Duplicates</div>
      <section class="description">
        <div>Some of leads are found in
          your previously imported lists. Among them:
        </div>
        <div class="details_container">
          <div>24</div>
          <div>Full duplicates (email+phone)</div>
        </div>
        <div class="map_container">
          <Button
              style="font-size: 12px;"
              label="Remove from the list"
              @click="getFullDuplicates"
              :disabled="duplicatesButtonDisabler"
          />
          <Button
              style="font-size: 12px;"
              label="Remove from  other lists"
          />
        </div>
        <div class="details_container">
          <div>105</div>
          <div>Partial duplicates (email or phone)</div>
        </div>
        <div class="map_container">
          <Button
              style="font-size: 12px;"
              label="Remove from the list"
              @click="getPartialDuplicates"
              :disabled="duplicatesButtonDisabler"
          />
          <Button
              style="font-size: 12px;"
              label="Remove from  other lists"
          />
        </div>
      </section>
      <div class="description_divider">Public statistics</div>
      <div class="description">Numbers are valid
        at the time of loading on {{ this.todayDate }}
      </div>
      <div class="description_divider">Leads age</div>
      <DataTable
          :value="publicResults"
          responsiveLayout="scroll">
        <Column
            v-for="col of publicColumns"
            :field="col.field"
            :header="col.header"
            :key="col.field"
            :headerStyle="darkModeSwitch
            ? {'background': '#494C57'}
            : {}"
            :bodyStyle=" darkModeSwitch
            ? {'color': 'white','background': '#32343A' }
            : {}"
        />
      </DataTable>
      <hr class="hidden">
      <div class="description_divider">Uniqueness</div>
      <DataTable
          :value="uniqueResults"
          responsiveLayout="scroll">
        <Column
            v-for="col of uniqueColumns"
            :field="col.field"
            :header="col.header"
            :key="col.field"
            :headerStyle="darkModeSwitch
            ? {'background': '#494C57'}
            : {}"
            :bodyStyle=" darkModeSwitch
            ? {'color': 'white','background': '#32343A' }
            : {}"
        />
      </DataTable>
    </main>
    <Toast position="bottom-center"/>
    <Toast group="key" position="center"/>
  </div>
</template>

<script>
// noinspection ES6UnusedImports
import Vue from 'vue'
import Papa from "papaparse";
import tgMixin from "@/mixins/telegram/tgMixin";
import resultImporterHelper from "@/mixins/helpers/resultImporterHelper";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "ResultImporter",
  mixins: [tgMixin, resultImporterHelper],
  data() {
    return {
      listNameLocal: '',
      fileNameLocal: ''
    }
  },
  methods: {
    sendParsedList() {
      let obj = Vue.prototype?.$fullObject.data
      this.$store.dispatch('SEND_PARSED_LEADS',
          {name: this.listNameLocal, file_name: this.fileNameLocal, object: obj})
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    },
    sendUploadStatus() {
      /**
       * Values below taken from getters in mixin-helper
       */
      const obj = {
        name: this.listName,
        filename: this.filename,
        vertical: this.vertical,
        funnel_type: this.funnelType,
        type: 'Unknown',
        valid_leads_amount: Vue.prototype?.$fullObject?.data?.length,
        upload_date: this.todayDate,
        status: this.listStatusBeforeUpload
      }
      this.$store.dispatch('SEND_UPLOAD_STATUS', obj)
          .then((res) => {
            // console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
    },
    sendStatistics() {
      const obj = {
        name: this.listName,
        file_name: this.fileName,
        full_records: this.parsedListLength,
        valid_leads: this.privateResults[1]?.value,
        unable_to_parse: this.privateResults[2]?.value,
        invalid_emails: this.privateResults[4]?.value,
        invalid_phones: this.privateResults[5]?.value,
        invalid_names: this.privateResults[6]?.value,
      }
      this.$store.dispatch('SEND_STATS', obj)
          .then((res) => {
            // console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
    },
    redirectCb() {
      this.$router.push({name: 'country'})
    },
    actionCb() {
      if (this.$route.path === '/result-importer') this.$router.push({name: 'layout'})
    },
    getFullDuplicates() {
      const helpMap = new Map();
      Vue.prototype.$fullDuplicates = [];

      Vue.prototype?.$fullObject?.data.map((element, index) => {
        if (helpMap.has(element[this.chosenEmail])) {
          const existingElement = helpMap.get(element[this.chosenEmail]);

          if (element[this.chosenPhone] === existingElement) {
            Vue.prototype.$fullDuplicates.push(element);
            this.fullDuplicatesIndexes.push(index)
          }
        } else {
          helpMap.set(element[this.chosenEmail], element[this.chosenPhone]);
        }
      });
      this.showFullInfoToast()
      // console.log(Vue.prototype.$fullDuplicates)
    },
    getPartialDuplicates() {
      const helpMap = new Map();
      Vue.prototype.$partialDuplicates = []

      Vue.prototype?.$fullObject?.data.map((element, index) => {
        if (helpMap.has(element[this.chosenEmail])) {
          const existingElement = helpMap.get(element[this.chosenEmail]);

          if (element[this.chosenPhone] !== existingElement) {
            Vue.prototype.$partialDuplicates.push(element);
            this.partialDuplicatesIndexes.push(index)
          }
        } else {
          helpMap.set(element[this.chosenEmail], element[this.chosenPhone]);
        }
      });
      this.showPartialInfoToast()
      // console.log(Vue.prototype.$partialDuplicates)
    },
    downloadInvalidLeads() {
      return new Promise((resolve) => {
        Vue.prototype.$parsedDocument = Papa.unparse(Object.assign({
          'fields': Object.keys(Vue.prototype?.$invalidObject[0]),
          'data': Vue.prototype?.$invalidObject.map((el) => Object.values(el))
        }))
        resolve(Vue.prototype.$parsedDocument)
      }).then(result => {
        const download = function (result) {
          const blob = new Blob([result], {type: 'text/csv'});
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.setAttribute('href', url)
          a.setAttribute('download', 'invalid_leads.csv');
          a.click()
        }
        download(result)
      })
    },

  },
  computed: {
    invalidFieldsChecker() {
      return this.invalidParsedLinesIndexes?.length > 1;
    },
    duplicatesButtonDisabler() {
      return this.partialDuplicatesIndexes.length > 0
          || this.fullDuplicatesIndexes.length > 0;
    },
  },
  watch: {
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.p-column-title')
              .forEach(e => e.classList.replace('p-column-title', 'p-column-title-dark'))
          document.querySelectorAll('.description').forEach(e => e.classList.add('description_dark'))
          document.querySelectorAll('.description_divider').forEach(e => e.classList.add('description_divider_dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.p-column-title-dark')
              .forEach(e => e.classList.replace('p-column-title-dark', 'p-column-title'))
          document.querySelectorAll('.description_dark').forEach(e => e.classList.remove('description_dark'))
          document.querySelectorAll('.description_divider').forEach(e => e.classList.remove('description_divider_dark'))
        }
      },
    },
    invalidParsedLinesIndexes: {
      handler(newValue) {
        /**
         * Invalid leads in $invalidObject (lines)
         */
        const fullData = JSON.parse(JSON.stringify(Vue.prototype?.$fullObject?.data))
        const mappedData = fullData.map((el, i) => {
          if (newValue.includes(i)) return el
        })
        Vue.prototype.$invalidObject = mappedData.filter(Boolean)
        /**
         * Valid leads in $fullObject
         */
        Vue.prototype.$fullObject.data = Vue.prototype?.$fullObject?.data.filter((el, i) => {
          if (!newValue.includes(i)) return el
        })
        // console.log(Vue.prototype?.$fullObject?.data)
      },
    },
    fullDuplicatesIndexes: {
      handler(newValue) {
        Vue.prototype.$fullObject.data = Vue.prototype?.$fullObject?.data.filter((el, i) => {
          if (!newValue.includes(i)) return el
        })
        this.privateResults[1].value = Vue.prototype.$fullObject.data.length
        // console.log(Vue.prototype?.$fullObject?.data)
      },
    },
    partialDuplicatesIndexes: {
      handler(newValue) {
        Vue.prototype.$fullObject.data = Vue.prototype?.$fullObject?.data.filter((el, i) => {
          if (!newValue.includes(i)) return el
        })
        this.privateResults[1].value = Vue.prototype.$fullObject.data.length
        // console.log(Vue.prototype?.$fullObject?.data)
      },
    },
  },
  created() {
    this.listNameLocal = this.listName
    this.fileNameLocal = this.fileName
  },
  mounted() {
    if (this.parsedListLength > 0) this.privateResults[0].value = this.parsedListLength

    if (!!Vue.prototype?.$fullObject?.data) {
      this.countersInvoker()
    } else {
      this.$store.dispatch('GET_STATS')
          .then((res) => {
            let obj = res.data.data[res.data.data.length - 1]
            this.listNameLocal = obj?.name || 'Unknown_list'
            this.fileNameLocal = obj?.fileName || 'Unknown_file'
            this.privateResults[0].value = obj?.fullRecords || ''
            this.privateResults[1].value = obj?.validLeads || ''
            this.privateResults[2].value = obj?.unableToParse || ''
            this.privateResults[4].value = obj?.invalidEmails || ''
            this.privateResults[5].value = obj?.invalidPhones || ''
            this.privateResults[6].value = obj?.invalidNames || ''
            this.$toast.add({
              group: 'key',
              severity: 'info',
              summary: 'Info message',
              detail: 'Last added file stats retrived',
              life: 2000
            });
          })
          .catch((err) => {
            console.log(err)
            this.$toast.add({
              severity: 'warn',
              summary: 'Warn message',
              detail: 'Server error, please try again later',
              life: 2000
            });
          })
    }
    /**
     * uncomment next line to see invalid lines after parsing
     */
    // console.log(Vue.prototype?.$fullObject?.data)

    if (this.darkModeSwitch) {
      setTimeout(() => {
        document.querySelectorAll('.p-column-title')
            .forEach(e => e.classList.replace('p-column-title', 'p-column-title-dark'))
      }, 0)
    }
    globalTelegram.MainButton.setText('Import results')
    globalTelegram.MainButton.color = '#16a34a'
    globalTelegram.MainButton.show().onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    /**
     * uncomment logs to see 2 different objects
     */
    // console.log(Vue.prototype?.$fullObject?.data)
    // console.log(Vue.prototype?.$invalidObject)
    globalTelegram.MainButton.offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
    /**
     * Clear global arrays before leave to prevent stacking results
     */
    this.$store.dispatch('eraseInvoker')
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/ResultImporter.scss';
</style>
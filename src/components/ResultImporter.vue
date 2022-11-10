<template>
  <div class="header">
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
          <div>{{ fullDuplicatesIndexes.length }}</div>
          <div>Full duplicates (email+phone)</div>
        </div>
        <div class="map_container">
          <Button
              style="font-size: 12px;"
              label="Remove from the list"
              @click="removeFullDuplicates"
              :disabled="!fullButtonDisabler"
          />
          <Button
              style="font-size: 12px;"
              label="Remove from  other lists"
          />
        </div>
        <div class="details_container">
          <div>{{ partialDuplicatesIndexes.length }}</div>
          <div>Partial duplicates (email or phone)</div>
        </div>
        <div class="map_container">
          <Button
              style="font-size: 12px;"
              label="Remove from the list"
              @click="removePartialDuplicates"
              :disabled="!partialButtonDisabler"
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
import moment from 'moment';

const globalTelegram = window.Telegram.WebApp

export default {
  name: "ResultImporter",
  mixins: [tgMixin, resultImporterHelper],
  data() {
    return {
      listNameLocal: '',
      fileNameLocal: '',
      betweenDay: [],
      betweenWeek: [],
      betweenMonth: [],
      betweenOneTwoMonths: [],
      betweenTwoThreeMonths: [],
      overThreeMonths: [],
      futureDateErrors: [],
      unknownDateFormat: []
    }
  },
  methods: {
    dateChecker() {
      const u = undefined
      const dayBefore = moment().subtract(1, 'd')
      const weekBefore = moment().subtract(1, 'week')
      const monthBefore = moment().subtract(1, 'month')
      const twoMonthBefore = moment().subtract(2, 'month')
      const threeMonthBefore = moment().subtract(3, 'month')
      const year = moment().subtract(1, 'year')
      //  specify format, default is EU;
      const format = 'DD.MM.YYYY'

      Vue.prototype?.$fullObject?.data.map((el) => {
        const elem = el[this.chosenRegDate]

        if (!moment(elem, format).isValid()) {
          this.unknownDateFormat.push(elem)
        } else if (moment(elem, format).isBetween(dayBefore, u)) {
          this.betweenDay.push(elem)
        } else if (moment(elem, format).isBetween(weekBefore, u)) {
          this.betweenWeek.push(elem)
        } else if (moment(elem, format).isBetween(monthBefore, weekBefore)) {
          this.betweenMonth.push(elem)
        } else if (moment(elem, format).isBetween(twoMonthBefore, monthBefore)) {
          this.betweenOneTwoMonths.push(elem)
        } else if (moment(elem, format).isBetween(threeMonthBefore, twoMonthBefore)) {
          this.betweenTwoThreeMonths.push(elem)
        } else if (moment(elem, format).isBetween(year, threeMonthBefore)) {
          this.overThreeMonths.push(elem)
        } else if (moment(elem, format).isAfter()) {
          this.futureDateErrors.push(elem)
        } else console.error(elem)
      })
      this.publicResults[0].value = this.betweenDay.length
      this.publicResults[1].value = this.betweenWeek.length
      this.publicResults[2].value = this.betweenMonth.length
      this.publicResults[3].value = this.betweenOneTwoMonths.length
      this.publicResults[4].value = this.betweenTwoThreeMonths.length
      this.publicResults[5].value = this.overThreeMonths.length
      this.publicResults[6].value = this.futureDateErrors.length
      this.publicResults[7].value = this.unknownDateFormat.length
    },
    getFullDuplicates() {
      const helpMap = new Map();
      Vue.prototype.$fullDuplicates = [];
      if (!!Vue.prototype?.$fullObject?.data) {
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
      }
    },
    getPartialDuplicates() {
      const helpMap = new Map();
      /**
       * $partialDuplicates & $fullDuplicatesRemoved
       * are helper array to store
       * lines to remove later if needed
       */
      Vue.prototype.$partialDuplicates = []
      if (!!Vue.prototype?.$fullObject?.data) {
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
      }
    },
    removeFullDuplicates() {
      Vue.prototype.$fullDuplicatesRemoved = Vue.prototype?.$fullObject?.data.filter((el, i) => {
        if (!this.fullDuplicatesIndexes.includes(i)) return el
      })
      this.privateResults[1].value = Vue.prototype.$fullDuplicatesRemoved.length
      this.fullDuplicatesIndexes = []
      this.showFullInfoToast()
    },
    removePartialDuplicates() {
      Vue.prototype.$partialDuplicatesRemoved = Vue.prototype?.$fullObject?.data.filter((el, i) => {
        if (!this.partialDuplicatesIndexes.includes(i)) return el
      })
      this.privateResults[1].value = Vue.prototype.$partialDuplicatesRemoved.length
      this.partialDuplicatesIndexes = []
      this.showPartialInfoToast()
    },
    downloadInvalidLeads() {
      return new Promise((resolve) => {
        /**
         * $parsedDocument non-reactive helper-object to create a file
         * user could download and see wrong lines
         */
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
    sendParsedList() {
      let obj = []
      /**
       * $fullDuplicatesRemoved or $partialDuplicatesRemoved
       * non-reactive helper-objects
       * if any of them exist would send as a payload later
       */
      if (!!Vue.prototype?.$fullDuplicatesRemoved?.length) {
        obj = Vue.prototype?.$fullDuplicatesRemoved
      } else if (!!Vue.prototype?.$partialDuplicatesRemoved?.length) {
        obj = Vue.prototype?.$partialDuplicatesRemoved
      } else if (!!Vue.prototype?.$fullObject?.data) {
        obj = Vue.prototype?.$fullObject?.data
      }

      this.$store.dispatch('SEND_PARSED_LEADS',
          {name: this.listNameLocal, file_name: this.fileNameLocal, object: obj})
          .then(() => {
            // console.log(res.data)
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
          .then(() => {
            // console.log(res)
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
          .then(() => {
            this.sendStatistics()
            // console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
    },
    actionCb() {
      if (this.$route.path === '/result-importer') {
        this.sendParsedList()
        this.sendUploadStatus()
        this.$router.push({name: 'layout'})
      }
    },
    redirectCb() {
      this.$router.push({name: 'country'})
    },
    backCb() {
      if (this.$route.path === '/result-importer') {
        this.$router.push({name: 'layout'})
      }
    },
  },
  computed: {
    invalidFieldsChecker() {
      return this.invalidParsedLinesIndexes?.length > 0;
    },
    fullButtonDisabler() {
      return this.fullDuplicatesIndexes?.length > 0;
    },
    partialButtonDisabler() {
      return this.partialDuplicatesIndexes?.length > 0
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
        this.privateResults[1].value = Vue.prototype.$fullObject.data.length

        if (this.invalidParsedLinesIndexes.length !== 0) {
          this.getFullDuplicates()
          this.getPartialDuplicates()
        }
      },
    },
  },
  created() {
    this.listNameLocal = this.listName
    this.fileNameLocal = this.fileName
  },
  mounted() {
    if (this.parsedListLength > 0) this.privateResults[0].value = this.parsedListLength
    this.privateResults[1].value = Vue.prototype?.$fullObject?.data?.length

    if (!!Vue.prototype?.$fullObject?.data) {
      this.dateChecker()
      this.countersInvoker()
      if (this.invalidParsedLinesIndexes.length === 0) {
        this.getFullDuplicates()
        this.getPartialDuplicates()
      }
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
    if (this.darkModeSwitch) {
      setTimeout(() => {
        document.querySelectorAll('.p-column-title')
            .forEach(e => e.classList.replace('p-column-title', 'p-column-title-dark'))
      }, 0)
    }

    if (!Vue.prototype?.$fullObject?.data) {
      globalTelegram.MainButton.setText('Go back to layout section')
      globalTelegram.MainButton.color = '#e50fda'
      globalTelegram.MainButton.show().onClick(this.backCb)
    } else {
      globalTelegram.MainButton.setText('Import results')
      globalTelegram.MainButton.color = '#16a34a'
      globalTelegram.MainButton.show().onClick(this.actionCb)
      globalTelegram.BackButton.show().onClick(this.redirectCb)
    }
  },
  beforeDestroy() {
    globalTelegram.MainButton.offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
    if (!Vue.prototype?.$fullObject?.data) {
      globalTelegram.MainButton.offClick(this.backCb)
    }
    /**
     * Clear global and generated arrays
     * before leave to prevent stacking results
     * and errors in "if" statements
     */
    this.$store.dispatch('eraseInvoker')
    Vue.prototype.$fullDuplicatesRemoved = []
    Vue.prototype.$partialDuplicatesRemoved = []
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/ResultImporter.scss';
</style>
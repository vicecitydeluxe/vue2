<template>
  <div class="header">
<!--    <Button @click="sendData">LIST SENDER</Button>-->
    <header class="header_section">
      <h3># {{ listNameLocal }}</h3>
    </header>
    <main>
      <div>List: {{ listNameLocal }}</div>
      <hr class="name_divider">
      <div>File: {{ fileNameLocal }}</div>
      <div
          class="description"
          v-once
      >Estimation of how loaded
        leads are unique across all your leads. Numbers are valid on:
        {{ todayDate }}
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
      <!--      <div class="description_divider">Duplicates</div>-->
      <!--      <section class="description">-->
      <!--        <div>Some of leads are found in-->
      <!--          your previously imported lists. Among them:-->
      <!--        </div>-->
      <!--        <div class="details_container">-->
      <!--          <div>{{ fullDuplicatesIndexes.length }}</div>-->
      <!--          <div>Full duplicates (email+phone)</div>-->
      <!--        </div>-->
      <!--        <div class="map_container">-->
      <!--          <Button-->
      <!--              style="font-size: 12px;"-->
      <!--              label="Remove from the list"-->
      <!--              @click="removeFullDuplicates"-->
      <!--              :disabled="!fullButtonDisabler"-->
      <!--          />-->
      <!--          <Button-->
      <!--              style="font-size: 12px;"-->
      <!--              label="Remove from  other lists"-->
      <!--          />-->
      <!--        </div>-->
      <!--        <div class="details_container">-->
      <!--          <div>{{ partialDuplicatesIndexes.length }}</div>-->
      <!--          <div>Partial duplicates (email or phone)</div>-->
      <!--        </div>-->
      <!--        <div class="map_container">-->
      <!--          <Button-->
      <!--              style="font-size: 12px;"-->
      <!--              label="Remove from the list"-->
      <!--              @click="removePartialDuplicates"-->
      <!--              :disabled="!partialButtonDisabler"-->
      <!--          />-->
      <!--          <Button-->
      <!--              style="font-size: 12px;"-->
      <!--              label="Remove from  other lists"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </section>-->
    </main>
    <Toast position="bottom-center"/>
    <Toast group="key" position="center"/>
  </div>
</template>

<script>
// noinspection ES6UnusedImports
import Vue from 'vue'
import tgMixin from "@/mixins/telegram/tgMixin";
import dataAnalyzerHelper from "@/mixins/helpers/WizardSection/dataAnalyzerHelper";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "DataAnalyzer",
  components: {
    DataTable: () => import ('primevue/datatable'),
    Column: () => import ('primevue/column'),
    Button: () => import('primevue/button'),
  },
  mixins: [tgMixin, dataAnalyzerHelper],
  data() {
    return {
      listNameLocal: '',
      fileNameLocal: '',
    }
  },
  methods: {
    // if you need to store extra fields, disable next function on created() hook
    removeExtraFields(arr) {
      const keys = ["firstname", 'lastname', 'fullname', "email", "phone", "country", "regdate"]
      arr.forEach(el => {
        for (const dupeElement in el) {
          if (!keys.includes(dupeElement)) delete el[dupeElement]
        }
      })
    },
    actionCb() {
      this.sendData()
      this.$router.push({name: 'results'})
    },
    redirectCb() {
      this.$router.push({name: 'country'})
    },
    backCb() {
      this.$router.push({name: 'layout'})
    },
    inlineTGHandler() {
      globalTelegram.MainButton.setText('Go back to layout section')
      globalTelegram.MainButton.color = '#e50fda'
      globalTelegram.MainButton.show().onClick(this.backCb)
    },
    regularTGHandler() {
      globalTelegram.MainButton.setText('Import results')
      globalTelegram.MainButton.color = '#16a34a'
      globalTelegram.MainButton.show().onClick(this.actionCb)
      globalTelegram.BackButton.show().onClick(this.redirectCb)
    }
  },
  computed: {
    invalidFieldsChecker() {
      return this.invalidParsedLinesIndexes?.length > 0;
    },
    // fullButtonDisabler() {
    //   return this.fullDuplicatesIndexes?.length > 0;
    // },
    // partialButtonDisabler() {
    //   return this.partialDuplicatesIndexes?.length > 0
    // },
  },
  watch: {
    darkModeSwitch: {
      handler(n) {
        n
            ? this.switchHandler()
            : this.switchRemover()
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

        // if (this.invalidParsedLinesIndexes.length !== 0) {
        //   this.getFullDuplicates()
        //   this.getPartialDuplicates()
        // }
      }
    },
  },
  created() {
    this.listNameLocal = this.listName
    this.fileNameLocal = this.fileName

    if (this.parsedListLength > 0) this.privateResults[0].value = this.parsedListLength

    this.privateResults[1].value = Vue.prototype?.$fullObject?.data?.length

    if (!!Vue.prototype?.$fullObject?.data) {
      //remove next line if you need to store extra fields
      this.removeExtraFields(Vue.prototype?.$fullObject?.data)
      this.countersInvoker()
    } else {
      this.getStats()
    }
  },
  mounted() {
    !!Vue.prototype?.$fullObject?.data && console.log(Vue.prototype.$fullObject.data)

    this.darkModeSwitch && setTimeout(() => {
      document.querySelectorAll('.p-column-title')
          .forEach(e => e.classList.replace('p-column-title', 'p-column-title-dark'))
    }, 0)

    // when we enter from inline button
    !Vue.prototype?.$fullObject?.data
        ? this.inlineTGHandler()
        : this.regularTGHandler()
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
    // Vue.prototype.$fullDuplicatesRemoved = []
    // Vue.prototype.$partialDuplicatesRemoved = []
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/WizardSection/DataAnalyzer';
</style>
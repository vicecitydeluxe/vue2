<template>
  <div class="header">
    <header class="header_section">
      <h3>{{ listName }}</h3>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <hr class="name_divider">
      <div>File: {{ fileName }}</div>
      <div class="description">Estimation of how loaded
        leads are unique across all your leads. Numbers are valid on:
        {{ this.todayDate }}
      </div>
      <div class="description_divider">Lead loading results</div>
      <DataTable
          :value="privateResults"
          responsiveLayout="scroll">
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
          <Button style="font-size: 12px;"
                  label="Remove from the list"/>
          <Button style="font-size: 12px;"
                  label="Remove from  other lists"/>
        </div>
        <div class="details_container">
          <div>105</div>
          <div>Partial duplicates (email or phone)</div>
        </div>
        <div class="map_container">
          <Button style="font-size: 12px;"
                  label="Remove from the list"/>
          <Button style="font-size: 12px;"
                  label="Remove from  other lists"/>
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
  </div>
</template>

<script>
// noinspection ES6UnusedImports
import Vue from 'vue'
import tgMixin from "@/mixins/telegram/tgMixin";
import resultImporterHelper from "@/mixins/helpers/resultImporterHelper";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "ResultImporter",
  mixins: [tgMixin, resultImporterHelper],
  data() {
    return {
      invalidParsedLinesIndexes: []
    }
  },
  methods: {
    redirectCb() {
      this.$router.push({name: 'country'})
    },
    actionCb() {
      if (this.$route.path === '/result-importer') this.$router.push({name: 'layout'})
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
        console.log(Vue.prototype?.$fullObject?.data)
      },
    },
  },
  mounted() {
    this.privateResults[0].value = this.parsedListLength
    this.countersInvoker()
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
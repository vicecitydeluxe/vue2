<template>
  <div class="header">
    <!--    <Button @click="sendParsedList">LIST SENDER</Button>-->
    <header class="header_section">
      <h3># {{ listNameLocal }}</h3>
    </header>
    <main>
      <div>List: {{ listNameLocal }}</div>
      <hr class="name_divider">
      <div>File: {{ fileNameLocal }}</div>
      <hr class="hidden">
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
import resultImporterHelper from "@/mixins/helpers/WizardSection/resultImporterHelper";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "ResultImporter",
  mixins: [tgMixin, resultImporterHelper],
  data() {
    return {
      listNameLocal: '',
      fileNameLocal: '',
    }
  },
  methods: {
    actionCb() {
      this.$router.push({name: 'layout'})
    },
    backCb() {
      this.$router.push({name: 'analyzer'})
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
  },
  created() {
    this.listNameLocal = this.listName
    this.fileNameLocal = this.fileName
  },
  mounted() {
    this.dateChecker()
    if (this.darkModeSwitch) {
      setTimeout(() => {
        document.querySelectorAll('.p-column-title')
            .forEach(e => e.classList.replace('p-column-title', 'p-column-title-dark'))
      }, 0)
    }
    globalTelegram.BackButton.show().onClick(this.backCb)
    globalTelegram.MainButton.setText('Publish')
    globalTelegram.MainButton.color = '#16a34a'
    globalTelegram.MainButton.show().onClick(this.actionCb)

  },
  beforeDestroy() {
    globalTelegram.MainButton.offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.backCb)
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/WizardSection/ResultImporter';
</style>
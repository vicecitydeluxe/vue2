<template>
  <div class="section">
    <header class="header">
      <h3>{{ listName }}</h3>
      <Button icon="pi pi-times" class="p-button-rounded p-button-help p-button-text"
              @click="$router.push({name:'mapper'})"/>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <div>File: {{ fileName }}</div>
      <div>Estimation of how loaded leads are unique across all your leads. Numbers are valid on: {{ this.todayDate }}
      </div>
      <div>These stats are available only for you:</div>
      <DataTable :value="privateResults" responsiveLayout="scroll">
        <Column v-for="col of privateColumns" :field="col.field" :header="col.header" :key="col.field"></Column>
      </DataTable>
      <hr class="hidden">
      <div>Some of leads are found in your previously imported lists. Among them:</div>
      <div class="map_container">
        <h6>24</h6>
        <div>Full duplicates (email+phone)</div>
      </div>
      <div class="map_container">
        <Button label="Remove from the list"></Button>
        <Button label="Remove from  other lists"></Button>
      </div>
      <div class="map_container">
        <h6>105</h6>
        <div>Partial duplicates (email or phone)</div>
      </div>
      <div class="map_container">
        <Button label="Remove from the list"></Button>
        <Button label="Remove from  other lists"></Button>
      </div>
      <div>This stats are available to all buyers:</div>
      <DataTable :value="publicResults" responsiveLayout="scroll">
        <Column v-for="col of publicColumns" :field="col.field" :header="col.header" :key="col.field"></Column>
      </DataTable>
      <hr class="hidden">
      <div>Estimation of how loaded leads are unique across the Marketplace. Numbers are valid on {{ todayDate }}</div>
      <DataTable :value="uniqueResults" responsiveLayout="scroll">
        <Column v-for="col of uniqueColumns" :field="col.field" :header="col.header" :key="col.field"></Column>
      </DataTable>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "ResultImporter",
  data() {
    return {
      todayDate: new Date().toLocaleDateString("ru-RU", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      privateColumns: [
        {field: 'description', header: 'Stat'},
        {field: 'value', header: 'hash'},
      ],
      privateResults: [
        {description: 'Records in source file', value: '1500'},
        {description: 'Fully valid leads (imported) view', value: '1200'},
        {description: 'Cannot parse line view lines', value: '90'},
        {description: 'Invalid leads view', value: ''},
        {description: '-missing or invalid email', value: '50'},
        {description: '-missing or invalid number', value: '60'},
        {description: '-missing name/lastname/fullname', value: '20'},
      ],
      publicColumns: [
        {field: 'description', header: "Leads' age"},
        {field: 'value', header: 'hash'},
      ],
      publicResults: [
        {description: 'Less 24 hours', value: '15'},
        {description: 'Less than a week', value: '30'},
        {description: 'less than a month', value: '40'},
        {description: 'Over a month', value: '100'},
        {description: 'Up to 3 months', value: '150'},
        {description: 'more than 3 months', value: '760'},
        {description: 'Unknown', value: '15'},
      ],
      uniqueColumns: [
        {field: 'description', header: "Across marketplace"},
        {field: 'value', header: 'hash'},
      ],
      uniqueResults: [
        {description: 'Fully unique leads', value: '150'},
        {description: 'Partially unique leads', value: '550'},
        {description: 'Duplicate leads', value: '800'},
      ],
    }
  },
  computed: {
    ...mapGetters(['listName', 'fileName'])
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    // globalTelegram.MainButton.hide()
    globalTelegram.MainButton.setText('Import results')
        .show()
        .onClick(() => {
          if (this.$route.path === '/result-importer') this.$router.push({name: 'layout'}
          )
        })
  },
}
</script>

<style scoped>
@import '../styles/ResultImporter.scss';
</style>
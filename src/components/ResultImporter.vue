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
            :headerStyle="darkModeSwitch ? {'background': '#494C57'} : {}"
            :bodyStyle=" darkModeSwitch ? {'color': 'white','background': '#32343A' } : {}"
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
            :headerStyle="darkModeSwitch ? {'background': '#494C57'} : {}"
            :bodyStyle=" darkModeSwitch ? {'color': 'white','background': '#32343A' } : {}"
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
import {mapGetters} from 'vuex'
import tgMixin from "@/mixins/tgMixin";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "ResultImporter",
  mixins: [tgMixin],
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
  methods: {
    redirectCb() {
      this.$router.push({name: 'country'})
    },
    actionCb() {
      if (this.$route.path === '/result-importer') this.$router.push({name: 'layout'})
    }
  },
  computed: {
    ...mapGetters(['listName', 'fileName'])
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
  mounted() {
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
    globalTelegram.MainButton.offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/ResultImporter.scss';
</style>
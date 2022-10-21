<template>
  <div class="header">
    <header class="header_section">
      <h3>COUNTRY MAPPING</h3>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <hr class="name_divider">
      <div class="section_divider">File: {{ fileName }}</div>
      <div class="description">Unknown countries have been found.
        Map them.
      </div>
      <div class="map_container"><h5>IRLA</h5>
        <Dropdown
            :class="[ darkModeSwitch ? 'dropdown_dark' : 'dropdown']"
            v-model="selectedCountry"
            placeholder="Ireland"
            :options="countries"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container"><h5>UK</h5>
        <Dropdown
            :class="[ darkModeSwitch ? 'dropdown_dark' : 'dropdown']"
            v-model="selectedCountry"
            placeholder="GB"
            :options="countries"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="description">This is the final step
        which will load leads to the DB.
      </div>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import tgMixin from "@/mixins/tgMixin";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "CountryMapper",
  mixins: [tgMixin],
  data() {
    return {
      darkDropdown: 0,
      selectedCountry: null,
      countries: [
        {name: 'Ireland'},
        {name: 'AnotherGreatCountry'},
      ],
    }
  },
  methods: {
    toggleDarkDropdown() {
      this.darkDropdown++
    },
    redirectCb() {
      this.$router.push({name: 'mapper'})
    },
    actionCb() {
      if (this.$route.path === '/country-mapper') this.$router.push({name: 'spinner'})
    }
  },
  computed: {
    ...mapGetters(['listName', "fileName"]),
  },
  watch: {
    darkDropdown: {
      handler() {
        if (this.darkDropdown && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
            document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
            document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
            document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
          }, 0)
        }
      }, deep: true
    },
    $data: {
      handler() {
        if (this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
            document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
            document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
            document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
          }, 0)
        }
      }, deep: true
    },
    selectedCountry: {
      handler(newValue) {
        if (newValue) {
          globalTelegram.MainButton.setText('Create leads')
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
        }
      },
    },
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
          document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
          document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
          document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
          document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
          document.querySelectorAll('.description').forEach(e => e.classList.add('description_dark'))
        }
        if (!newValue) {
          const darkStylesSelectors = ['p-placeholder_dark', 'pi-chevron-down_dark',
            'p-dropdown-item_dark', 'p-inputtext_dark',
            'p-highlight_dark', 'description_dark']
          document.querySelectorAll('[class*="_dark"]')
              .forEach(e => e.classList.remove(...darkStylesSelectors))
        }
      },
    },
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
@import '../styles/CountryMapper.scss';
</style>
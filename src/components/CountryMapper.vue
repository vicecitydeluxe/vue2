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
      <div class="map_container">
        <h5 class="map_container_divider"
            v-for="(country, index) in countriesToMap"
            :key="index"
        >{{ country }}
          <Dropdown
              :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'dropdown']"
              v-model="selectedCountry[index]"
              placeholder="Choose сode"
              :options="countries"
              :filter="true"
              @before-show="toggleDarkDropdown"
          />
        </h5>
      </div>
      <div class="description">This is the final step
        which will load leads to the DB.
      </div>
    </main>
  </div>
</template>

<script>
// noinspection ES6UnusedImports
import Vue from 'vue'
import {mapGetters} from 'vuex'
import tgMixin from "@/mixins/tgMixin";
import ISO3166 from '@/assets/ISO3166.json'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "CountryMapper",
  mixins: [tgMixin],
  data() {
    return {
      darkDropdown: 0,
      countriesDictionary: ISO3166,
      countriesToMap: [],
      countriesIndex: [],
      selectedCountry: [],
      countries: [],
    }
  },
  methods: {
    wrongCountryFinder() {
      const arrayDictionary = this.countriesDictionary.map((el) => {
        return [el.alpha, el.beta]
      }).flat()
      this.countries = arrayDictionary
      const wrong = Vue.prototype.$fullObject.data.filter((el) => {
        if (!arrayDictionary.includes(el[this.chosenCountry])) {
          return el
        }
      })
      this.countriesToMap = wrong.map((el) => {
        return el[this.chosenCountry]
      })
    },
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
    ...mapGetters(['listName', "fileName", "chosenCountry"]),
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
          Vue.prototype.$fullObject.data.forEach((el, i) => {
            if (!this.countriesIndex[i] || !this.selectedCountry[i]) return
            Vue.prototype.$fullObject.data[this.countriesIndex[i]][this.chosenCountry] = this.selectedCountry[i]
          })
          //uncomment next line to see mutation of $fullObject
          // console.log(Vue.prototype.$fullObject.data)
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
    this.wrongCountryFinder()
    // uncomment to see init variation of the $parsedHeaders
    // console.log(Vue.prototype.$parsedHeaders)
    // console.log(Vue.prototype.$fullObject.data)
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
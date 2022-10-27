<template>
  <div class="header">
    <header class="header_section">
      <h3>COUNTRY MAPPING</h3>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <hr class="name_divider">
      <div class="section_divider">File: {{ fileName }}</div>
      <div
          v-if="countriesToMap.length > 1"
          class="description"
      >Unknown countries have been found. Map them.
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
              @change="toggleDarkDropdown"
              @before-show="toggleDarkDropdown"
              @filter="toggleDarkDropdown"
          />
        </h5>
      </div>
      <div
          v-if="countriesToMap.length > 1"
          class="description"
      >This is the final step
        which will load leads to the DB.
      </div>
      <div
          v-if="countriesToMap.length < 1"
          class="description"
      >All fields are already mapped!
      </div>
    </main>
  </div>
</template>

<script>
// noinspection ES6UnusedImports
import Vue from 'vue'
import {mapGetters} from 'vuex'
import tgMixin from "@/mixins/telegram/tgMixin";
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
      countryIndexes: [],
      selectedCountry: [],
      countries: [],
    }
  },
  methods: {
    /**
     * wrongCountryFinder() creates an array
     * with all country-codes first.
     * Then it iterates through
     * $fullObject and stores [index]
     * and [elements] if country-code
     * wasn't recognized/
     */
    wrongCountryFinder() {
      const arrayDictionary = this.countriesDictionary.map((el) => {
        return [el.alpha, el.beta]
      }).flat()
      this.countries = arrayDictionary

      const wrong = Vue.prototype.$fullObject.data.filter((el, i) => {
        if (!arrayDictionary.includes(el[this.chosenCountry])) {
          this.countryIndexes.push(i)
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
            document.querySelectorAll('.p-dropdown-empty-message').forEach(e => e.classList.add('p-dropdown-empty-message_dark'))
            document.querySelectorAll('.p-dropdown-header').forEach(e => e.classList.add('p-dropdown-header_dark'))
            document.querySelectorAll('.p-dropdown-filter-icon').forEach(e => e.classList.add('p-dropdown-filter-icon_dark'))
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
          /**
           * handler iterates through
           * $fullObject's elements each time.
           * It replaces each element by following schema:
           * ...$fullObject[index_of_element][dynamic_key]
           * redefines to selectedCountry[index]
           */
          Vue.prototype.$fullObject.data.forEach((el, i) => {
            if (!this.countryIndexes[i] || !this.selectedCountry[i]) return
            Vue.prototype.$fullObject.data[this.countryIndexes[i]][this.chosenCountry] = this.selectedCountry[i]
          })

          //uncomment next line to see mutation of $fullObject
          console.log(Vue.prototype.$fullObject.data)
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
          document.querySelectorAll('.p-dropdown-empty-message').forEach(e => e.classList.add('p-dropdown-empty-message_dark'))
          document.querySelectorAll('.p-dropdown-header').forEach(e => e.classList.add('p-dropdown-header_dark'))
          document.querySelectorAll('.p-dropdown-filter-icon').forEach(e => e.classList.add('p-dropdown-filter-icon_dark'))
        }
        if (!newValue) {
          const darkStylesSelectors = ['p-placeholder_dark', 'pi-chevron-down_dark',
            'p-dropdown-item_dark', 'p-inputtext_dark',
            'p-highlight_dark', 'description_dark',
            'p-dropdown-empty-message_dark', 'p-dropdown-header_dark',
            'p-dropdown-filter-icon_dark']
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
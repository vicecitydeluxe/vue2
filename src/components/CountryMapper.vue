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
            v-for="(country, index) in paginatedCountries"
            v-if="country"
            :key="index"
        >{{ country }}
          <Dropdown
              v-if="country"
              :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'dropdown']"
              v-model="selectedCountry[index]"
              placeholder="Choose сode"
              :options="countriesFullTitles"
              :filter="true"
              @change="toggleDarkDropdown"
              @before-show="toggleDarkDropdown"
              @filter="toggleDarkDropdown"
          />
        </h5>
        <Paginator
            v-if="countriesToMap.length > 5"
            class="paginator"
            :rows="5"
            :pageLinkSize="4"
            :totalRecords="countriesToMap.length"
            @page="paginationMaker($event)"
        />
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
import countryMapperHelper from "@/mixins/helpers/countryMapperHelper";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "CountryMapper",
  mixins: [tgMixin, countryMapperHelper],
  data() {
    return {
      darkDropdown: 0,
      countriesToMap: [],
      paginatedCountries: [],
      countryIndexes: [],
      selectedCountry: [],
      countryPossibleKeys: [
        'country',
        'countryid',
        'geo',
        'country_id',
        'country_code',
      ],
      countryKeyChecker: false,
    }
  },
  methods: {
    paginationMaker(event) {
      this.paginatedCountries = new Array(this.countriesToMap.length).fill(undefined)
      let arr = this.countriesToMap.slice(event.page * 5, event.page * 5 + 5)
      this.paginatedCountries.splice(event.page * 5, event.page * 5 + 5, ...arr)
    },
    /**
     * Checker function toggles
     * countryKeyChecker property
     * if there's no country key
     */
    countryKeyCheckerFn() {
      if (!!Vue.prototype?.$fullObject?.data) {
        Vue.prototype?.$fullObject?.data.filter(obj => {
          for (const key of Object.keys(obj)) {
            if (this.countryPossibleKeys.includes(key)) {
              this.countryKeyChecker = true
              return
            }
          }
        })
      }
    },
    /**
     * wrongCountryFinder() creates an array
     * with all country-codes first.
     * Then it iterates through
     * $fullObject and stores [index]
     * and [elements] if country-code
     * wasn't recognized/
     */
    wrongCountryFinder() {
      this.countryKeyCheckerFn()

      if (this.countryKeyChecker) {
        const wrong = Vue.prototype?.$fullObject?.data.filter((el, i) => {
          if (!this.countries.includes(el['country'])) {
            this.countryIndexes.push(i)
            return el
          }
        })

        if (!!wrong) {
          this.countriesToMap = wrong.map((el) => {
            return el['country']
          })
        } else return
      } else return
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
    selectedCountryCreator() {
      this.selectedCountry = new Array(this.countriesToMap.length).fill(undefined)
    },
    ...mapGetters(['listName', "fileName", "chosenCountry"]),
    allCountriesInitiallyMapped() {
      return !!this.countriesToMap.length < 1 && this.selectedCountry.length < 1
    },
    allCountriesMapped() {
      return (this.countriesToMap.length === this.selectedCountry.length)
          && !this.selectedCountry.includes(undefined);
    },
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
        if (newValue || newValue.length) {
          Vue.prototype.$fullObject.data.forEach((el, i) => {
            if (!this.selectedCountry[i]) return
            Vue.prototype.$fullObject.data[this.countryIndexes[i]]['country'] = this.selectedCountry[i]
          })
          //uncomment next line to see mutation of $fullObject
          console.log(Vue.prototype?.$fullObject?.data)
        }
      }, deep: true
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
    allCountriesMapped: {
      handler(newValue) {
        if (newValue) {
          globalTelegram.MainButton.show()
        }
      },
    },
  },
  created() {
    this.wrongCountryFinder()
    if (!!this.countriesToMap.length) {
      let e = {}
      e.page = 0
      this.paginationMaker(e)
    }
  },
  mounted() {
    if (!!this.allCountriesInitiallyMapped) {
      globalTelegram.MainButton.show()
      globalTelegram.BackButton.show()
    }
    // console.log(Vue.prototype?.$invalidObject)
    globalTelegram.MainButton.setText('Create leads')
    globalTelegram.MainButton.color = '#16a34a'
    globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
    Vue.prototype.$invalidObject = []
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/CountryMapper.scss';
</style>
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
            v-show="country && uniqueChecker(index)"
            :key="index"
        >{{ country }}
          <Dropdown
              v-show="country"
              :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'dropdown']"
              v-model="selectedCountry[index]"
              placeholder="Choose сode"
              :options="countriesFullTitles"
              :filter="true"
              @change="toggleDarkDropdown;
              currentSelectedCountry = selectedCountry[index]
               curIndex = index"
              @before-show="toggleDarkDropdown"
              @filter="toggleDarkDropdown"
          />
        </h5>
        <Paginator
            v-if="uniqueCountriesLength > 5"
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
      prevSelectedCounty: '',
      currentSelectedCountry: '',
      curIndex: ''
    }
  },
  methods: {
    uniqueChecker(e) {
      let unique = this.countriesToMap.map((item, i, ar) => ar.indexOf(item) === i)
      return unique[e]
    },
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
    uniqueCountriesLength() {
      return this.countriesToMap.filter((item, i, ar) => ar.indexOf(item) === i).length
    },
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
    //TODO mapping logic, redo prev and current state
    selectedCountry: {
      handler(newValue) {
        if ((newValue || newValue.length) && !newValue.every(el => el === undefined)) {
          if (!this.prevSelectedCounty) {
            Vue.prototype.$fullObject.data.forEach(el => {
              el.country === this.countriesToMap[this.curIndex]
                  ? el.country = this.selectedCountry.filter(el => el)[0]
                  : this.countriesToMap[this.curIndex]
            })
          } else {

            Vue.prototype.$fullObject.data.forEach(el => {

              if (this.countriesToMap[this.curIndex] === el.country) {
                el.country === this.countriesToMap[this.curIndex]
                    ? el.country = this.currentSelectedCountry
                    : this.countriesToMap[this.curIndex]
              } else {
                // el.country === this.currentSelectedCountry
                //     ? el.country = this.currentSelectedCountry
                //     : el.country
              }
              console.log(this.countriesToMap[this.curIndex],
                  el.country,
                  this.prevSelectedCounty,
                  this.currentSelectedCountry)
            })
          }
          this.prevSelectedCounty = this.selectedCountry.filter(el => el)[0]

          //uncomment next line to see mutation of $fullObject.country
          console.log(Vue.prototype?.$fullObject?.data.map(el => el.country))
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
    globalTelegram.MainButton.setText('Next')
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
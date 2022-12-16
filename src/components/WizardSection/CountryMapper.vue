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
          v-once
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
              @change="toggleDarkDropdown;
                        iterationIndex = index;
                        setCountry($event.value)"
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
          v-once
      >This is the final step
        before loading leads to the DB.
      </div>
      <div
          v-if="countriesToMap.length < 1"
          v-once
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
import countryMapperHelper from "@/mixins/helpers/WizardSection/countryMapperHelper";
import countryMapperHandler from "@/mixins/styleHandlers/WizardSection/countryMapperHandler";


const globalTelegram = window.Telegram.WebApp

export default {
  name: "CountryMapper",
  components: {
    Paginator: () => import('primevue/paginator'),
    Dropdown: () => import('primevue/dropdown')
  },
  mixins: [tgMixin, countryMapperHelper, countryMapperHandler],
  data() {
    return {
      darkDropdown: 0,
      countriesToMap: [],
      paginatedCountries: [],
      countryIndexes: [],
      selectedCountry: [],
      iterationIndex: '',
    }
  },
  methods: {
    setCountry(e) {
      this.$store.commit('setOldCountryState', e)
    },
    paginationMaker(event) {
      this.paginatedCountries = new Array(this.countriesToMap.length).fill(undefined)
      let arr = this.countriesToMap.slice(event.page * 5, event.page * 5 + 5)
      this.paginatedCountries.splice(event.page * 5, event.page * 5 + 5, ...arr)
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
      const wrong = Vue.prototype?.$fullObject?.data.filter((el, i) => {
        if (!this.countries.includes(el['country'])) {
          this.countryIndexes.push(i)
          return el
        }
      })
      if (!!wrong) {
        this.countriesToMap = wrong.map(el => el['country'])
      } else return

      this.countriesToMap = Array.from(new Set(this.countriesToMap))
    },
    toggleDarkDropdown() {
      this.darkDropdown++
    },
    redirectCb() {
      this.$router.push({name: 'mapper'})
    },
    actionCb() {
      this.$router.push({name: 'analyzer'})
    }
  },
  computed: {
    ...mapGetters(['listName', "fileName", "chosenCountry", 'oldCountryState']),
    allCountriesInitiallyMapped() {
      return !!this.countriesToMap.every(el => !el)
    },
  },
  watch: {
    darkDropdown: {
      handler() {
        (this.darkDropdown && this.darkModeSwitch) && this.dropdownHandler()
      }, deep: true
    },
    $data: {
      handler() {
        this.darkModeSwitch && this.dataHandler()
      }, deep: true
    },
    selectedCountry: {
      handler(newValue) {
        if (!newValue.includes(undefined)) {
          console.log('all countries mapped!', newValue)
          globalTelegram.MainButton.show()
        }
        // next line: nullish checker is for handling console warning
        if ((newValue || newValue.length) && !!Vue.prototype?.$fullObject?.data) {
          Vue.prototype.$fullObject.data.forEach((el, i) => {
            if (el.country === this.countriesToMap[this.iterationIndex]) {
              Vue.prototype.$_countries[i] = this.oldCountryState
            }
            if (!this.selectedCountry[i]) return
            Vue.prototype.$_countries[this.countryIndexes[i]] = this.selectedCountry[i]
          })
          //uncomment next line to see changed values
          console.log(Vue.prototype.$_countries)
        }
      }, deep: true
    },
    darkModeSwitch: {
      handler(n) {
        n
            ? this.switchHandler()
            : this.switchRemover()
      },
    },
  },
  created() {
    /**
     * $_countries is initial state array
     * which is created to take data from,
     * basic structure: [{country:'value'},...]
     */
    !!Vue.prototype?.$fullObject?.data && (Vue.prototype.$_countries = JSON.parse(JSON.stringify(Vue.prototype.$fullObject.data.map(el => el.country))))
    this.wrongCountryFinder()
    if (!!this.countriesToMap.length) {
      let e = {}
      e.page = 0
      this.paginationMaker(e)
    }
  },
  mounted() {
    this.selectedCountry = new Array(this.countriesToMap.length).fill(undefined)

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

    !!Vue.prototype?.$invalidObject && (Vue.prototype.$invalidObject = [])
    !!Vue.prototype.$fullObject?.data && (Vue.prototype.$fullObject.data = Vue.prototype.$fullObject.data.map((el, i) => ({
      ...el,
      country: Vue.prototype.$_countries[i]
    })))
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/WizardSection/CountryMapper';
</style>
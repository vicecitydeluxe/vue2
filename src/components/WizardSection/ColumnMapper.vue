<template>
  <div class="header">
    <!--    <div>{{ requiredFieldsFilled}}</div>-->
    <header class="header_section">
      <h3>COLUMN MAPPING</h3>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <hr class="main_section_divider">
      <div>File: {{ fileName }}</div>
      <div
          class="description"
          v-once
      >Please map the required columns.
        You can import either full name or first+last name.
      </div>
      <div class="map_container"
           v-for="(_, index) in dropdownModelTop"
      >
        <div
            class="map_container_title"
            v-text="dropdownTitles[index]"
        />
        <Dropdown
            :class="styleHandler"
            @change="dropdownCb(index)"
            v-model="$data['selected' + dropdownModelTop[index]]"
            :value="selectedFirstname"
            :options="parsedFields"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <h6 class="map_container">OR</h6>
      <div v-for="(_, index) in dropdownModelMain">
        <div class="map_container">
          <div
              class="map_container_title"
              v-text="dropdownTitles[index+2]"
          />
          <Dropdown
              :class="styleHandler"
              @change="dropdownCb(index+2)"
              v-model="$data['selected' + dropdownModelMain[index]]"
              :value="$data['selected' + dropdownModelMain[index]]"
              :options="parsedFields"
              @before-show="toggleDarkDropdown"
          />
        </div>
        <hr style="margin: 10px">
      </div>
      <div class="map_container">
        <div
            class="map_container_title"
            v-text="dropdownTitles[5]"
        />
        <Dropdown
            :class="styleHandler"
            @change="dropdownCb(5)"
            v-model="selectedCountry"
            :value="selectedCountry"
            :options="parsedFields"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <span
          v-if="countryEmptyFlag"
          v-once
      >*No column detected or empty fields exist,
        you need to set default value:
      </span>
      <div
          v-if="!countryEmptyFlag"
          v-once
          style="margin-bottom:5px"
      >Choose a default value (if no value provided in the file):
      </div>
      <div class="sub_map_container">
        <div>
          <RadioButton
              :disabled="countryCheckboxDisabler"
              id="emptyCountry"
              value="empty"
              v-model="checkedCountry"
              @click="toggleDarkDropdown"
          />
          <label
              class="sub_map_container_divider"
              for="emptyCountry"
          >Set empty to
          </label>
        </div>
        <Dropdown
            :class="styleHandler"
            v-model="selectedCountryFromList"
            placeholder="(choose)"
            :filter="true"
            :options="countriesFullTitles"
            @filter="toggleDarkDropdown"
            @change="toggleDarkDropdown"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="sub_map_container">
        <div>
          <RadioButton
              id="country"
              value="all_to"
              v-model="checkedCountry"
              @click="toggleDarkDropdown"
          />
          <label
              class="sub_map_container_divider"
              for="country"
          >Set all to
          </label>
        </div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'map_container_dropdown_dark'
            : 'map_container_dropdown']"
            v-model="selectedCountryFromList"
            placeholder="(choose)"
            :filter="true"
            :options="countriesFullTitles"
            @filter="toggleDarkDropdown"
            @change="toggleDarkDropdown"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <hr style="margin: 10px">
      <div class="map_container">
        <div
            class="map_container_title"
            v-text="dropdownTitles[6]"
        />
        <Dropdown
            :class="styleHandler"
            @change="dropdownCb(6)"
            v-model="selectedRegdate"
            :value="selectedRegdate"
            :options="parsedFields"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <span
          v-if="regdateEmptyFlag"
          v-once
      >*No column detected or empty fields exist,
        you need to set default value:
      </span>
      <div
          v-if="!regdateEmptyFlag"
          v-once
          style="margin-bottom:5px;"
      >Choose a default value (if no value provided in the file):
      </div>
      <div class="sub_map_container">
        <div>
          <RadioButton
              :disabled="regDateCheckboxDisabler"
              id="emptyRegdate"
              value="empty"
              v-model="checkedRegDate"
              @click="toggleDarkDropdown"
          />
          <label
              class="radio_label_divider"
              for="emptyRegdate"
          >Set empty to
          </label>
        </div>
        <Calendar
            id="icon"
            v-model="registrationDate"
            :showIcon="true"
            :touchUI="true"
            @hide="darkCalendar++"
            @date-select="darkCalendar++"
            @show="darkCalendar++"
            @month-change="darkCalendar++"
            @year-change="darkCalendar++"
            dateFormat="dd/mm/yy"
        />
      </div>
      <div class="map_container">
        <div>
          <RadioButton
              id="regdate"
              value="all_to"
              v-model="checkedRegDate"
              @click="toggleDarkDropdown"
          />
          <label
              class="sub_map_container_divider"
              for="regdate"
          >Set all to
          </label>
        </div>
        <Calendar
            id="icon"
            v-model="registrationDate"
            :showIcon="true"
            :touchUI="true"
            @hide="darkCalendar++"
            @date-select="darkCalendar++"
            @show="darkCalendar++"
            @month-change="darkCalendar++"
            @year-change="darkCalendar++"
            dateFormat="dd/mm/yy"
        />
      </div>
      <hr style="margin: 10px">
      <div
          class="bottom_section_container"
          v-if="extraFieldsFlag"
      >
        <div
            v-once
        >What to do with the rest of the fields
          found in the source file? (You shouldn't include them if they
          contain sensitive data)
        </div>
        <div class="options_container">
          <button
              class="btn_left"
              @click="includeExtra = false"
          >Don't include
          </button>
          <button
              class="btn_right"
              @click="includeExtra = true"
          >Include
          </button>
        </div>
        <div
            v-once
        >Other fields will be imported,
          stored and buyers will be able to see them after
          purchase these leads.
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// noinspection ES6UnusedImports
import Vue from 'vue'
import moment from 'moment';
import tgMixin from "@/mixins/telegram/tgMixin";
import columnMapperHelper from "@/mixins/helpers/WizardSection/columnMapperHelper";
import countryMapperHelper from "@/mixins/helpers/WizardSection/countryMapperHelper";
import columnMapperHandler from "@/mixins/styleHandlers/WizardSection/columnMapperHandler";
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp
// noinspection JSUnusedGlobalSymbols
export default {
  name: "Mapper",
  components: {
    Dropdown: () => import ('primevue/dropdown'),
    RadioButton: () => import ('primevue/radiobutton'),
    Calendar: () => import ('primevue/calendar')
  },
  mixins: [tgMixin, columnMapperHelper,
    countryMapperHelper, columnMapperHandler],
  data() {
    return {
      darkCalendar: 0,
      darkDropdown: 0,
      includeExtra: true,
      extraFieldsFlag: false,
      countryCheckboxDisabler: false,
      regDateCheckboxDisabler: false,
      prevRoute: '',
      countryEmptyFlag: false,
      regdateEmptyFlag: false
    }
  },
  methods: {
    emptyChecker(e) {
      const length = Vue.prototype?.$fullObject?.data?.length
      for (let i = 0; i < length; i++) {
        !Vue.prototype?.$fullObject?.data[i][e] && (this[`${e}EmptyFlag`] = true)
      }
    },
    removeExtraFields(arr) {
      const keys = ["firstname", 'lastname', 'fullname',
        "email", "phone", "country", "regdate"]
      arr.forEach(el => {
        for (const dupeElement in el) {
          if (!keys.includes(dupeElement)) delete el[dupeElement]
        }
      })
    },
    /**
     * $_reducedObject is non-reactive helper-object to remove all extra
     * non-required fields.
     * Assigned to $fullObject. data
     * if user has chosen option to delete all extra fields
     */
    globalReducer() {
      Vue.prototype.$_reducedObject = Object.preventExtensions(Vue.prototype.$fullObject.data)
      this.removeExtraFields(Vue.prototype.$_reducedObject)
      // console.log(Vue.prototype?.$_reducedObject)
    },
    stateReselect() {
      this.selectedFirstname = this.chosenFirstname
      this.selectedLastname = this.chosenLastname
      this.selectedFullname = this.chosenFullname
      this.selectedEmail = this.chosenEmail
      this.selectedPhone = this.chosenPhone
      this.selectedCountry = this.chosenCountry
      this.selectedRegdate = this.chosenRegdate
    },
    checkedHandler(header) {
      this.$data['selected' + header] = header
      this.$store.commit(`setChosen${header[0].toUpperCase() + header.slice(1)}`, header)
      this.$data[header + 'EmptyFlag'] = false
    },
    toggleDarkCalendar() {
      this.darkCalendar++
    },
    toggleDarkDropdown() {
      this.darkDropdown++
    },
    redirectCb() {
      this.$router.push({name: 'uploader'})
    },
    actionCb() {
      this.$router.push({name: 'country'})
    },
  },
  computed: {
    ...mapGetters(['listName', "fileName", "parsedFields", 'visitedRouteFlag']),
    requiredFieldsFilled() {
      return !!(this.selectedFirstname && this.selectedLastname
              && this.selectedEmail && this.selectedPhone
              && this.selectedCountry && this.selectedRegdate
              && !this.countryEmptyFlag && !this.regdateEmptyFlag) ||
          !!(this.selectedFullname && this.selectedEmail
              && this.selectedPhone
              && this.selectedCountry && this.selectedRegdate
              && !this.countryEmptyFlag && !this.regdateEmptyFlag);
    }
  },
  watch: {
    //TODO: add fullname swap first+last replace logic
    // selectedFullname: {
    //   handler(n, o) {
    //     Vue.prototype.$fullObject.data.forEach(el => {
    //       delete el.firstname
    //       delete el.lastname
    //     })
    //   }
    // },
    checkedCountry: {
      handler(newValue) {
        if (newValue === 'empty' && this.selectedCountryFromList) {
          this.checkedHandler('country')
          Vue.prototype.$fullObject.data.forEach(el => {
            if (!el['country']) el['country'] = this.selectedCountryFromList
          })
          // console.log(Vue.prototype.$fullObject.data)
        } else if (newValue === 'all_to' && this.selectedCountryFromList) {
          this.checkedHandler('country')
          Vue.prototype.$fullObject.data.forEach(el => {
            el['country'] = this.selectedCountryFromList
          })
          // console.log(Vue.prototype.$fullObject.data)
          this.countryCheckboxDisabler = true
        }
      }
    },
    checkedRegDate: {
      handler(newValue) {
        if (newValue === 'empty' && this.registrationDate) {
          this.checkedHandler('regdate')
          Vue.prototype.$fullObject.data.forEach(el => {
            if (!el['regdate']) el['regdate'] = moment(this.registrationDate).format('DD.MM.YYYY')
          })
          // console.log(Vue.prototype.$fullObject.data)
        } else if (newValue === 'all_to' && this.registrationDate) {
          this.checkedHandler('regdate')
          Vue.prototype.$fullObject.data.forEach(el => {
            el['regdate'] = moment(this.registrationDate).format('DD.MM.YYYY')
          })
          // console.log(Vue.prototype.$fullObject.data)
          this.regDateCheckboxDisabler = true
        }
      },
    },
    selectedCountry: {
      handler() {
        this.countryEmptyFlag = false
      }
    },
    selectedRegdate: {
      handler() {
        this.regdateEmptyFlag = false
      }
    },
    selectedCountryFromList: {
      handler() {
        if (this.checkedCountry === 'empty') this.checkedCountry = ''
        else if (this.checkedCountry === 'all_to') this.checkedCountry = ''
      },
    },
    registrationDate: {
      handler() {
        if (this.checkedRegDate === 'empty') this.checkedRegDate = ''
        else if (this.checkedRegDate === 'all_to') this.checkedRegDate = ''
      },
    },
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
    requiredFieldsFilled: {
      handler(newValue) {
        if (newValue) {
          if (this.parsedFields.length !== this.sortedParsedFields.length && this.prevRoute !== '/country-mapper') this.extraFieldsFlag = true
          globalTelegram.MainButton.setText('Next')
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
        } else globalTelegram.MainButton.hide()
      },
    },
    darkModeSwitch: {
      handler(n) {
        n
            ? this.switchHandler()
            : this.switchRemover()
      },
    },
    includeExtra: {
      handler(n) {
        !n
            ? this.globalReducer()
            : console.log(Vue.prototype.$fullObject.data)
      }
    },
    darkCalendar: {
      handler(n) {
        (n && this.darkModeSwitch) && this.calendarHandler()
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.$data.prevRoute = from.fullPath)
  },
  mounted() {
    !!Vue.prototype?.$fullObject?.data && !this.visitedRouteFlag
        ? this.startCheck()
        : this.stateReselect()

    this.emptyChecker('country')
    this.emptyChecker('regdate')

    !!Vue.prototype?.$fullObject?.data && console.log(Vue.prototype.$fullObject.data)

    globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    if (!this.includeExtra && !!Vue.prototype?.$fullObject?.data && !!Vue.prototype?.$_reducedObject) {
      Vue.prototype.$fullObject.data = Vue.prototype.$_reducedObject
    }

    globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)

    this.$store.commit('setVisitedRouteFlag', 1)
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/WizardSection/ColumnMapper';
</style>
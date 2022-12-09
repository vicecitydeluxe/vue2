<template>
  <div class="header">
    <header class="header_section">
      <h3>COLUMN MAPPING</h3>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <hr class="main_section_divider">
      <div>File: {{ fileName }}</div>
      <div class="description">Please map the required columns.
        You can import either full name or first+last name.
      </div>
      <div class="map_container">
        <div class="map_container_title">First name</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="dropdownCb(0)"
            v-model="selectedFirstname"
            :value="selectedFirstname"
            :options="parsedFields"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Last name</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="dropdownCb(1)"
            v-model="selectedLastname"
            :value="selectedLastname"
            :options="parsedFields"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <h6 class="map_container">OR</h6>
      <div class="map_container">
        <div class="map_container_title">Full name</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="dropdownCb(2)"
            v-model="selectedFullname"
            :value="selectedFullname"
            :options="parsedFields"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <hr style="margin: 10px">
      <div class="map_container">
        <div class="map_container_title">Email</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="dropdownCb(3)"
            v-model="selectedEmail"
            :value="selectedEmail"
            :options="parsedFields"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <hr style="margin: 10px">
      <div class="map_container">
        <div class="map_container_title">Phone number</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="dropdownCb(4)"
            v-model="selectedPhone"
            :value="selectedPhone"
            :options="parsedFields"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <hr style="margin: 10px">
      <div class="map_container">
        <div class="map_container_title">Country</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="dropdownCb(5)"
            v-model="selectedCountry"
            :value="selectedCountry"
            :options="parsedFields"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <span
          v-if="countryEmptyFlag"
      >*No column detected or empty fields exist, you need to set default value:</span>
      <div
          v-if="!countryEmptyFlag"
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
          <label class="sub_map_container_divider" for="emptyCountry">Set empty to</label>
        </div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
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
      <div class="sub_map_container">
        <div>
          <RadioButton
              id="country"
              value="all_to"
              v-model="checkedCountry"
              @click="toggleDarkDropdown"
          />
          <label class="sub_map_container_divider"
                 for="country">Set all to</label>
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
        <div class="map_container_title">Reg date</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="dropdownCb(6)"
            v-model="selectedRegdate"
            :value="selectedRegdate"
            :options="parsedFields"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <span
          v-if="regdateEmptyFlag"
      >*No column detected or empty fields exist, you need to set default value:</span>
      <div
          v-if="!regdateEmptyFlag"
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
          <label class="radio_label_divider"
                 for="emptyRegdate">Set empty to</label>
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
          <label class="sub_map_container_divider"
                 for="regdate">Set all to</label>
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
          v-if="this.extraFieldsFlag"
      >
        <div>What to do with the rest of the fields
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
        <div>Other fields will be imported,
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
      includeExtra: null,
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
      for (let i = 0; i < Vue.prototype?.$fullObject?.data?.length; i++) {
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
     * $reducedObject non-reactive helper-object to remove all extra
     * non-required fields.
     * Assigned to $fullObject. data
     * if user has chosen option to delete all extra fields
     */
    globalReducer() {
      Vue.prototype.$reducedObject = Object.preventExtensions(Vue.prototype.$fullObject.data)
      this.removeExtraFields(Vue.prototype.$reducedObject)
      console.log(Vue.prototype?.$reducedObject)
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
    checkedCountry: {
      handler(newValue) {
        if (newValue === 'empty' && this.selectedCountryFromList) {
          this.selectedCountry = 'country'
          this.$store.commit('setChosenCountry', 'country')
          this.countryEmptyFlag = false
          Vue.prototype.$fullObject.data.forEach((el) => {
            if (!el['country']) el['country'] = this.selectedCountryFromList
          })
          console.log(Vue.prototype.$fullObject.data)
        } else if (newValue === 'all_to' && this.selectedCountryFromList) {
          this.selectedCountry = 'country'
          this.$store.commit('setChosenCountry', 'country')
          this.countryEmptyFlag = false
          Vue.prototype.$fullObject.data.forEach((el) => {
            el['country'] = this.selectedCountryFromList
          })
          console.log(Vue.prototype.$fullObject.data)
          this.countryCheckboxDisabler = true
        } else if (newValue === 'empty' || newValue === 'all_to') {
          this.$toast.add({
            severity: 'warn',
            summary: 'Warn message',
            detail: 'Choose country from the list to proceed!',
            life: 2000
          });
        }
      },
    },
    checkedRegDate: {
      handler(newValue) {
        if (newValue === 'empty' && this.registrationDate) {
          Vue.prototype.$fullObject.data.forEach((el) => {
            this.selectedRegdate = 'regdate'
            this.$store.commit('setChosenRegdate', 'regdate')
            this.regdateEmptyFlag = false
            if (!el['regdate']) el['regdate'] = moment(this.registrationDate).format('DD.MM.YYYY')
          })
          console.log(Vue.prototype.$fullObject.data)
        } else if (newValue === 'all_to' && this.registrationDate) {
          this.selectedRegdate = 'regdate'
          this.$store.commit('setChosenRegdate', 'regdate')
          this.regdateEmptyFlag = false
          Vue.prototype.$fullObject.data.forEach((el) => {
            el['regdate'] = moment(this.registrationDate).format('DD.MM.YYYY')
          })
          console.log(Vue.prototype.$fullObject.data)
          this.regDateCheckboxDisabler = true
        }
      },
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
    if (!this.includeExtra && !!Vue.prototype?.$fullObject?.data && !!Vue.prototype?.$reducedObject) {
      Vue.prototype.$fullObject.data = Vue.prototype.$reducedObject
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
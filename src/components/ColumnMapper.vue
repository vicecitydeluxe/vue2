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
            @change="firstNameReplacer"
            v-model="selectedFirstName"
            :value="selectedFirstName"
            :options="firstNames"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Last name</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="lastNameReplacer"
            v-model="selectedLastName"
            :value="selectedLastName"
            :options="lastNames"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Full name</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="fullNameReplacer"
            v-model="selectedFullName"
            :value="selectedFullName"
            :options="fullNames"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Email</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="emailReplacer"
            v-model="selectedEmail"
            :value="selectedEmail"
            :options="emails"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Phone number</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="phoneNumberReplacer"
            v-model="selectedPhoneNumber"
            :value="selectedPhoneNumber"
            :options="phoneNumbers"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Country</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="countryReplacer"
            v-model="selectedCountry"
            :value="selectedCountry"
            :options="countriesHeaders"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="sub_map_container">
        <div>
          <RadioButton
              :disabled="countryCheckboxDisabler"
              id="empty"
              value="empty"
              v-model="checkedCountry"
              @click="toggleDarkDropdown"
          />
          <label class="sub_map_container_divider" for="empty">Set empty to</label>
        </div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            v-model="selectedCountryFromList"
            placeholder="(choose)"
            :options="countries"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="sub_map_container">
        <div>
          <RadioButton
              id="all_to"
              value="all_to"
              v-model="checkedCountry"
              @click="toggleDarkDropdown"
          />
          <label class="sub_map_container_divider"
                 for="all_to">Set all to</label>
        </div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'map_container_dropdown_dark'
            : 'map_container_dropdown']"
            v-model="selectedCountryFromList"
            placeholder="(choose)"
            :options="countries"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Reg date</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="registrationDateReplacer"
            v-model="selectedRegDate"
            :value="selectedRegDate"
            :options="regDateList"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="sub_map_container">
        <div>
          <RadioButton
              :disabled="regDateCheckboxDisabler"
              id="empty"
              value="empty"
              v-model="checkedRegDate"
              @click="toggleDarkDropdown"
          />
          <label class="radio_label_divider"
                 for="empty">Set empty to</label>
        </div>
        <Calendar
            id="icon"
            v-model="registrationDate"
            :showIcon="true"
            :touchUI="true"
            @hide="darkCalendar++"
        />
      </div>
      <div class="map_container">
        <div>
          <RadioButton
              id="all_to"
              value="all_to"
              v-model="checkedRegDate"
              @click="toggleDarkDropdown"
          />
          <label class="sub_map_container_divider"
                 for="all_to">Set all to</label>
        </div>
        <Calendar
            id="icon"
            v-model="registrationDate"
            :showIcon="true"
            :touchUI="true"
            @hide="darkCalendar++"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Deposit/sales date</div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="depositReplacer"
            v-model="selectedDeposit"
            :value="selectedDeposit"
            :options="deposits"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
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
      <Toast position="bottom-center"/>
    </main>
  </div>
</template>

<script>
// noinspection ES6UnusedImports
import Vue from 'vue'
import tgMixin from "@/mixins/telegram/tgMixin";
import columnMapperHelper from "@/mixins/helpers/columnMapperHelper";
import countryMapperHelper from "@/mixins/helpers/countryMapperHelper";
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp
const calendars = document.getElementsByClassName('p-calendar')

// noinspection JSUnusedGlobalSymbols
export default {
  name: "Mapper",
  mixins: [tgMixin, columnMapperHelper, countryMapperHelper],
  data() {
    return {
      darkCalendar: 0,
      darkDropdown: 0,
      includeExtra: null,
      extraFieldsFlag: false,
      emptyCountryValueFlag: false,
      emptyRegDateValueFlag: false,
      countryCheckboxDisabler: false,
      regDateCheckboxDisabler: false,
    }
  },
  methods: {
    countryValueChecker() {
      Vue.prototype.$fullObject.data.filter((el) => {
        if (!el[this.chosenCountry] && !!el?.[this.chosenCountry]) {
          this.emptyCountryValueFlag = true
          return
        }
      })
    },
    regDateValueChecker() {
      Vue.prototype.$fullObject.data.filter((el) => {
        if (!el[this.chosenRegDate] && !!el?.[this.chosenRegDate]) {
          this.emptyRegDateValueFlag = true
          return
        }
      })
    },
    extraFieldsChecker() {
      Vue.prototype?.$fullObject?.data.filter(obj => {
        for (const key of Object.keys(obj)) {
          if (!this.requiredFieldsDictionary.includes(key)) {
            this.extraFieldsFlag = true
            return
          }
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
      if (!Vue.prototype?.$reducedObject) {
        Vue.prototype.$reducedObject = JSON.parse(JSON.stringify(Vue.prototype.$fullObject.data))
        Vue.prototype?.$reducedObject.filter(obj => {
          for (const key of Object.keys(obj)) {
            if (!this.requiredFieldsDictionary.includes(key)) delete obj[key];
          }
        })
      }
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
      if (this.$route.path === '/mapper') this.$router.push({name: 'country'})
    },
    showIncludedToast() {
      this.$toast.add({
        severity: 'info',
        summary: 'Info message',
        detail: ' Rest of the fields will be included!',
        life: 2000
      });
    },
    showWarnToast() {
      this.$toast.add({
        severity: 'warn',
        summary: 'Info message',
        detail: ' Rest of the fields will not be included!',
        life: 2000
      });
    },
  },
  computed: {
    ...mapGetters(['listName', "fileName", "parsedFields"]),
    countryEmptyChecker() {
      for (let i = 0; i < Vue.prototype?.$fullObject?.data?.length; i++) {
        return !Vue.prototype?.$fullObject?.data[i][this.chosenCountry];
      }
    },
    requiredFieldsFilled() {
      return !!(this.selectedFirstName?.name && this.selectedLastName?.name
              && this.selectedEmail?.name && this.selectedPhoneNumber?.name
              && this.selectedCountry?.name && this.selectedRegDate?.name
              && this.selectedDeposit?.name && !this.countryEmptyChecker) ||
          !!(this.selectedFullName?.name && this.selectedEmail?.name
              && this.selectedPhoneNumber?.name
              && this.selectedCountry?.name && this.selectedRegDate?.name
              && this.selectedDeposit?.name && !this.countryEmptyChecker);
    }
  },
  watch: {
    checkedCountry: {
      handler(newValue) {
        if (newValue === 'empty' && this.selectedCountryFromList) {
          Vue.prototype.$fullObject.data.forEach((el) => {
            if (!el[this.chosenCountry]) el[this.chosenCountry] = this.selectedCountryFromList
          })
          // console.log(Vue.prototype.$fullObject.data)
        } else if (newValue === 'all_to' && this.selectedCountryFromList) {
          Vue.prototype.$fullObject.data.forEach((el) => {
            el[this.chosenCountry] = this.selectedCountryFromList
          })
          // console.log(Vue.prototype.$fullObject.data)
          this.countryCheckboxDisabler = true
        } else if (newValue === 'empty' || newValue === 'all_to') {
          this.$toast.add({
            severity: 'warn',
            summary: 'Warn message',
            detail: 'Choose country from the list to procced!',
            life: 2000
          });
        }
      },
    },
    checkedRegDate: {
      handler(newValue) {
        if (newValue === 'empty' && this.registrationDate) {
          Vue.prototype.$fullObject.data.forEach((el) => {
            if (!el[this.chosenRegDate]) el[this.chosenRegDate] = this.registrationDate
          })
          // console.log(Vue.prototype.$fullObject.data)
        } else if (newValue === 'all_to' && this.registrationDate) {
          Vue.prototype.$fullObject.data.forEach((el) => {
            el[this.chosenRegDate] = this.registrationDate
          })
          // console.log(Vue.prototype.$fullObject.data)
          this.regDateCheckboxDisabler = true
        }
      },
    },
    selectedCountryFromList: {
      handler() {
        if (this.checkedCountry === 'empty') {
          this.checkedCountry = ''
        } else if (this.checkedCountry === 'all_to') {
          this.checkedCountry = ''
        }
      },
    },
    registrationDate: {
      handler() {
        if (this.checkedRegDate === 'empty') {
          this.checkedRegDate = ''
        } else if (this.checkedRegDate === 'all_to') {
          this.checkedRegDate = ''
        }
      },
    },
    darkDropdown: {
      handler() {
        if (this.darkDropdown && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
            document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
            document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
            document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
            document.querySelectorAll('.p-radiobutton-box').forEach(e => e.classList.add('p-radiobutton-box_dark'))
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
    requiredFieldsFilled: {
      handler(newValue) {
        if (newValue) {
          globalTelegram.MainButton.setText('Next')
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
        } else globalTelegram.MainButton.hide()
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
          document.querySelectorAll('.pi-calendar').forEach(e => e.classList.add('pi-calendar_dark'))
          document.querySelectorAll('.bottom_section_container').forEach(e => e.classList.add('bottom_section_container_dark'))
          document.querySelectorAll('.description').forEach(e => e.classList.add('description_dark'))
          document.querySelectorAll('.map_container_title').forEach(e => e.classList.add('map_container_title_dark'))
          document.querySelectorAll('.btn_left').forEach(e => e.classList.add('btn_left_dark'))
          document.querySelectorAll('.btn_right').forEach(e => e.classList.add('btn_right_dark'))
          document.querySelectorAll('.p-radiobutton-box').forEach(e => e.classList.add('p-radiobutton-box_dark'))
          document.querySelectorAll('.p-calendar').forEach(e => e.classList.add('p-calendar_dark'))
          document.querySelectorAll('.p-datepicker').forEach(e => e.classList.add('p-datepicker_dark'))
          document.querySelectorAll('.p-datepicker-header').forEach(e => e.classList.add('p-datepicker-header_dark'))
          document.querySelectorAll('.p-datepicker-year').forEach(e => e.classList.add('p-datepicker-year_dark'))
          document.querySelectorAll('.p-datepicker-month').forEach(e => e.classList.add('p-datepicker-month_dark'))
          document.querySelectorAll('.p-datepicker-next').forEach(e => e.classList.add('p-datepicker-next_dark'))
          document.querySelectorAll('.p-datepicker-prev').forEach(e => e.classList.add('p-datepicker-prev_dark'))
          document.querySelectorAll('.p-datepicker-trigger').forEach(e => e.classList.add('p-datepicker-trigger_dark'))
        }
        if (!newValue) {
          const darkStylesSelectors = ['p-placeholder_dark', 'pi-chevron-down_dark',
            'p-dropdown-item_dark', 'p-inputtext_dark', 'p-highlight_dark',
            'pi-calendar_dark', 'bottom_section_container_dark',
            'description_dark', 'map_container_title_dark', 'btn_left_dark',
            'btn_right_dark', 'p-radiobutton-box_dark', 'p-calendar_dark',
            'p-datepicker_dark', 'p-datepicker-header_dark',
            'p-datepicker-month_dark', 'p-datepicker-next_dark',
            'p-datepicker-prev_dark', 'p-datepicker-year_dark']
          document.querySelectorAll('[class*="_dark"]')
              .forEach(e => e.classList.remove(...darkStylesSelectors))
        }
      },
    },
    includeExtra: {
      handler(newValue) {
        if (newValue && this.extraFieldsFlag) {
          this.showIncludedToast()
        } else {
          this.globalReducer()
          this.showWarnToast()
        }
      }
    },
    darkCalendar: {
      handler(newValue) {
        if (newValue && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-calendar').forEach(e => e.classList.add('p-calendar_dark'))
            document.querySelectorAll('.p-datepicker').forEach(e => e.classList.add('p-datepicker_dark'))
            document.querySelectorAll('.p-datepicker-header').forEach(e => e.classList.add('p-datepicker-header_dark'))
            document.querySelectorAll('.p-datepicker-month').forEach(e => e.classList.add('p-datepicker-month_dark'))
            document.querySelectorAll('.p-datepicker-year').forEach(e => e.classList.add('p-datepicker-year_dark'))
            document.querySelectorAll('.p-datepicker-next').forEach(e => e.classList.add('p-datepicker-next_dark'))
            document.querySelectorAll('.p-datepicker-prev').forEach(e => e.classList.add('p-datepicker-prev_dark'))
          }, 0)
        }
      }
    },
  },
  mounted() {
    if (!!Vue.prototype?.$fullObject?.data) {
      this.multipleCheckerCaller()
      this.extraFieldsChecker()
      this.countryValueChecker()
      this.regDateValueChecker()
    }
    globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)

    for (let i = 0; i < calendars.length; i++) {
      calendars[i].addEventListener('click', this.toggleDarkCalendar);
    }

  },
  beforeDestroy() {
    if (!this.includeExtra && !!Vue.prototype?.$fullObject?.data && !!Vue.prototype?.$reducedObject) {
      Vue.prototype.$fullObject.data = Vue.prototype?.$reducedObject
    }
    globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/ColumnMapper.scss';
</style>
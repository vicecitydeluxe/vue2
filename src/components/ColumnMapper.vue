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

        <div>
          <RadioButton id="load"
                       value="load"
                       v-model="checkedCountry"
                       @click="toggleDarkDropdown"
          />
          <label class="sub_map_container_divider" for="load">Load</label>
        </div>

        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            @change="countryReplacer"
            v-model="selectedCountry"
            :value="selectedCountry"
            :options="countries"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="sub_map_container">
        <div class="field-checkbox">
          <label for="binary">set empty to</label>
        </div>
        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            v-model="selectedCountryFromList"
            placeholder="GB UK"
            :options="countriesList"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="sub_map_container">
        <div>
          <RadioButton
              id="all_to"
              value="set_all_to"
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
            :options="countriesList"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Reg date</div>

        <div>
          <RadioButton
              id="all_to"
              value="load"
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
      <div class="sub_map_container">

        <div>
          <RadioButton
              id="load"
              value="set_all_to"
              v-model="checkedRegDate"
              @click="toggleDarkDropdown"
          />
          <label class="radio_label_divider"
                 for="load">Load</label>
        </div>

        <Dropdown
            :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
            v-model="selectedRegDate"
            :value="selectedRegDate"
            :options="regGateList"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="field-checkbox">
          <label for="binary">set empty or broken to</label>
        </div>
        <Calendar
            id="icon"
            v-model="brokenDate"
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
            v-model="selectedDeposit"
            :value="selectedDeposit"
            :options="deposits"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="bottom_section_container">
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

import tgMixin from "@/mixins/tgMixin";
import parsedListsCheckers from "@/mixins/parsedListsCheckers";
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp
const calendars = document.getElementsByClassName('p-calendar')

export default {
  name: "Mapper",
  mixins: [tgMixin, parsedListsCheckers],
  data() {
    return {
      darkCalendar: 0,
      darkDropdown: 0,
      includeExtra: null,
    }
  },
  methods: {
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
    requiredFieldsFilled() {
      if (this.selectedFirstName && this.selectedLastName
          && this.selectedEmail && this.selectedPhoneNumber
          && this.selectedCountry && this.selectedRegDate) {
        return true
      }
    }
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
        if (newValue) {
          this.showIncludedToast()
        } else this.showWarnToast()
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
    this.multipleCheckerCaller()
    // uncomment to see init variation of the $parsedHeaders
    // console.log(Vue.prototype.$parsedHeaders)
    // console.log(Vue.prototype.$fullObject.data)
    // console.log(this.$parsedHeaders.split(','))
    globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)

    for (let i = 0; i < calendars.length; i++) {
      calendars[i].addEventListener('click', this.toggleDarkCalendar);
    }

  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/ColumnMapper.scss';
</style>
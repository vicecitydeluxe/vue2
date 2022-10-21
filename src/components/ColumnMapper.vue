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
            :class="[ darkModeSwitch ? 'dropdown_dark' : 'map_container_dropdown']"
            @change="firstNameValidator"
            v-model="selectedFirstName"
            placeholder="name"
            :options="firstNames"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Last name</div>
        <Dropdown
            :class="[ darkModeSwitch ? 'dropdown_dark' : 'map_container_dropdown']"
            @change="lastNameValidator"
            v-model="selectedLastName"
            placeholder="last_name"
            :options="lastNames"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Full name</div>
        <Dropdown
            :class="[ darkModeSwitch ? 'dropdown_dark' : 'map_container_dropdown']"
            @change="fullNameValidator"
            v-model="selectedFullName"
            placeholder="(select)"
            :options="fullNames"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Email</div>
        <Dropdown
            :class="[ darkModeSwitch ? 'dropdown_dark' : 'map_container_dropdown']"
            @change="emailValidator"
            v-model="selectedEmail"
            placeholder="email"
            :options="emails"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="map_container_title">Phone number</div>
        <Dropdown
            :class="[ darkModeSwitch ? 'dropdown_dark' : 'map_container_dropdown']"
            @change="phoneNumberValidator"
            v-model="selectedPhoneNumber"
            placeholder="phone"
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
            :class="[ darkModeSwitch ? 'dropdown_dark' : 'map_container_dropdown']"
            @change="countryValidator"
            v-model="selectedCountry"
            placeholder="country"
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
            :class="[ darkModeSwitch ? 'dropdown_dark' : 'map_container_dropdown']"
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
            :class="[ darkModeSwitch ? 'map_container_dropdown_dark' : 'map_container_dropdown']"
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

        <span class="p-input-icon-right">
          <InputMask
              inputmode="decimal"
              :class="[ darkModeSwitch ? 'input_mask_dark' : 'input_mask']"
              mask="99/99/9999"
              v-model="registrationDate"
              placeholder="  /  /    "
              slotChar="mm/dd/yyyy"/>
        <i class="pi pi-calendar"></i>
        </span>
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
            :class="[ darkModeSwitch ? 'dropdown_dark' : 'map_container_dropdown']"
            v-model="selectedRegDate"
            placeholder="reg"
            :options="regGateList"
            optionLabel="name"
            @before-show="toggleDarkDropdown"
        />
      </div>
      <div class="map_container">
        <div class="field-checkbox">
          <label for="binary">set empty or broken to</label>
        </div>
        <span class="p-input-icon-right">
                  <InputMask
                      inputmode="decimal"
                      :class="[ darkModeSwitch ? 'input_mask_dark' : 'input_mask']"
                      mask="99/99/9999"
                      v-model="emptyDateSetter"
                      placeholder="  /  /    "
                      slotChar="mm/dd/yyyy"
                  />
        <i class="pi pi-calendar"></i>
        </span>
      </div>
      <div class="map_container">
        <div class="map_container_title">Deposit/sales date</div>
        <Dropdown
            :class="[ darkModeSwitch ? 'dropdown_dark' : 'map_container_dropdown']"
            v-model="selectedDeposit"
            placeholder="ftd"
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
          <button class="btn_left">Don't include</button>
          <button class="btn_right">Include</button>
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
import tgMixin from "@/mixins/tgMixin";
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "Mapper",
  mixins: [tgMixin],
  data() {
    return {
      darkDropdown: 0,
      selectedFirstName: null,
      selectedLastName: null,
      selectedFullName: null,
      selectedEmail: null,
      selectedPhoneNumber: null,
      selectedCountry: null,
      selectedCountryFromList: null,
      selectedRegDate: null,
      selectedDeposit: null,
      checkedCountry: '',
      checkedRegDate: '',
      registrationDate: null,
      emptyDateSetter: null,
      firstNames: [
        {name: 'firstname'},
        {name: 'fname'},
        {name: 'first_name'},
      ],
      lastNames: [
        {name: 'lastname'},
        {name: 'last'},
        {name: 'last name'},
        {name: 'lname'},
      ],
      fullNames: [
        {name: 'fullname'},
        {name: 'full_name'},
      ],
      emails: [
        {name: 'email'},
        {name: 'mail'},
        {name: 'e-mail'},
      ],
      phoneNumbers: [
        {name: 'phone'},
        {name: 'mobile phone'},
        {name: 'phone number'},
        {name: 'mobile'},
        {name: 'main number'},
        {name: 'main phone'},
        {name: 'phone_number'},
        {name: 'mobile_phone'},
      ],
      countries: [
        {name: 'country'},
        {name: 'countryid'},
        {name: 'geo'},
        {name: 'country_id'},
        {name: 'country code'},
      ],
      regGateList: [
        {name: 'regdate'},
        {name: 'reg date'},
        {name: 'reg_date'},
        {name: 'registration_date'},
        {name: 'registered'},
        {name: 'registered_at'},
      ],
      deposits: [
        {name: 'deposited'},
        {name: 'deposit date'},
        {name: 'deposit_date'},
        {name: 'ftd date'},
        {name: 'ftd_date'},
        {name: 'ftd'},
      ],
      countriesList: [
        {name: 'GB'},
        {name: 'RU'},
        {name: 'USA'},
        {name: 'UA'},
      ],
    }
  },
  methods: {
    toggleDarkDropdown() {
      this.darkDropdown++
    },
    firstNameValidator() {
      let splittedObject = this.$parsedHeaders.split(',')
      splittedObject[0] = this.selectedFirstName.name
      this.$parsedHeaders = splittedObject.join()
      console.log(this.$parsedHeaders)
    },
    lastNameValidator() {
      let splittedObject = this.$parsedHeaders.split(',')
      splittedObject[1] = this.selectedLastName.name
      this.$parsedHeaders = splittedObject.join()
      console.log(this.$parsedHeaders)
    },
    fullNameValidator() {
      let splittedObject = this.$parsedHeaders.split(',')
      splittedObject[2] = this.selectedFullName.name
      this.$parsedHeaders = splittedObject.join()
      console.log(this.$parsedHeaders)
    },
    emailValidator() {
      let splittedObject = this.$parsedHeaders.split(',')
      splittedObject[3] = this.selectedEmail.name
      this.$parsedHeaders = splittedObject.join()
      console.log(this.$parsedHeaders)
    },
    phoneNumberValidator() {
      let splittedObject = this.$parsedHeaders.split(',')
      splittedObject[4] = this.selectedPhoneNumber.name
      this.$parsedHeaders = splittedObject.join()
      console.log(this.$parsedHeaders)
    },
    countryValidator() {
      let splittedObject = this.$parsedHeaders.split(',')
      splittedObject[5] = this.selectedCountry.name
      this.$parsedHeaders = splittedObject.join()
      console.log(this.$parsedHeaders)
    },
    redirectCb() {
      this.$router.push({name: 'uploader'})
    },
    actionCb() {
      if (this.$route.path === '/mapper') this.$router.push({name: 'country'})
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
    checkedCountry: {
      handler(newValue) {
        if (newValue) {
          globalTelegram.MainButton.setText('Next')
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
          document.querySelectorAll('.pi-calendar').forEach(e => e.classList.add('pi-calendar_dark'))
          document.querySelectorAll('.bottom_section_container').forEach(e => e.classList.add('bottom_section_container_dark'))
          document.querySelectorAll('.description').forEach(e => e.classList.add('description_dark'))
          document.querySelectorAll('.map_container_title').forEach(e => e.classList.add('map_container_title_dark'))
          document.querySelectorAll('.btn_left').forEach(e => e.classList.add('btn_left_dark'))
          document.querySelectorAll('.btn_right').forEach(e => e.classList.add('btn_right_dark'))
          document.querySelectorAll('.p-radiobutton-box').forEach(e => e.classList.add('p-radiobutton-box_dark'))
        }
        if (!newValue) {
          const darkStylesSelectors = ['p-placeholder_dark', 'pi-chevron-down_dark',
            'p-dropdown-item_dark', 'p-inputtext_dark', 'p-highlight_dark',
            'pi-calendar_dark', 'bottom_section_container_dark', 'description_dark',
            'map_container_title_dark', 'btn_left_dark',
            'btn_right_dark', 'p-radiobutton-box_dark']
          document.querySelectorAll('[class*="_dark"]')
              .forEach(e => e.classList.remove(...darkStylesSelectors))
        }
      },
    },
  },
  mounted() {
    // uncomment to see init variation of the $parsedHeaders
    // console.log(Vue.prototype.$parsedHeaders)
    // console.log(Vue.prototype.$parsedFullObject)
    // console.log(this.$parsedHeaders.split(','))
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
@import '../styles/ColumnMapper.scss';
</style>
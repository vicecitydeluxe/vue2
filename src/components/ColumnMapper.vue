<template>
  <div class="header">
    <header class="header_section">
      <h3>COLUMN MAPPING</h3>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <hr class="main_section_divider">
      <div>File: {{ fileName }}</div>
      <div class="description">Please map the required columns. You can import either full name or first+last name.
      </div>
      <div class="map_container">
        <div class="map_container_title">First name</div>
        <Dropdown @change="firstNameValidator" class="map_container_dropdown" v-model="selectedFirstName"
                  placeholder="name" :options="firstNames"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="map_container_title">Last name</div>
        <Dropdown @change="lastNameValidator" class="map_container_dropdown" v-model="selectedLastName"
                  placeholder="last_name" :options="lastNames"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="map_container_title">Full name</div>
        <Dropdown @change="fullNameValidator" class="map_container_dropdown" v-model="selectedFullName"
                  placeholder="(select)" :options="fullNames"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="map_container_title">Email</div>
        <Dropdown @change="emailValidator" class="map_container_dropdown" v-model="selectedEmail" placeholder="email"
                  :options="emails"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="map_container_title">Phone number</div>
        <Dropdown @change="phoneNumberValidator" class="map_container_dropdown" v-model="selectedPhoneNumber"
                  placeholder="phone"
                  :options="phoneNumbers"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="map_container_title">Country</div>

        <div>
          <RadioButton id="load" value="load" v-model="checkedCountry"/>
          <label class="sub_map_container_divider" for="load">Load</label>
        </div>

        <Dropdown @change="countryValidator" class="map_container_dropdown" v-model="selectedCountry"
                  placeholder="country" :options="countries"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="sub_map_container">
        <div class="field-checkbox">
          <label for="binary">set empty to</label>
        </div>
        <Dropdown class="map_container_dropdown" v-model="selectedCountryFromList" placeholder="GB UK"
                  :options="countriesList"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="sub_map_container">
        <div>
          <RadioButton id="all_to" value="set_all_to" v-model="checkedCountry"/>
          <label class="sub_map_container_divider" for="all_to">Set all to</label>
        </div>
        <Dropdown class="map_container_dropdown" v-model="selectedCountryFromList" placeholder="(choose)"
                  :options="countriesList"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="map_container_title">Reg date</div>

        <div>
          <RadioButton id="all_to" value="load" v-model="checkedRegDate"/>
          <label class="sub_map_container_divider" for="all_to">Set all to</label>
        </div>

        <span class="p-input-icon-right">
          <InputMask inputmode="decimal" class="input_mask" mask="99/99/9999" v-model="registrationDate"
                     placeholder="  /  /    "
                     slotChar="mm/dd/yyyy"></InputMask>
        <i class="pi pi-calendar"></i>
        </span>
      </div>
      <div class="sub_map_container">

        <div>
          <RadioButton id="load" value="set_all_to" v-model="checkedRegDate"/>
          <label class="radio_label_divider " for="load">Load</label>
        </div>

        <Dropdown class="map_container_dropdown" v-model="selectedRegDate" placeholder="reg" :options="regGateList"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="field-checkbox">
          <label for="binary">set empty or broken to</label>
        </div>
        <span class="p-input-icon-right">
                  <InputMask inputmode="decimal" class="input_mask" mask="99/99/9999" v-model="emptyDateSetter"
                             placeholder="  /  /    "
                             slotChar="mm/dd/yyyy"></InputMask>
        <i class="pi pi-calendar"></i>
        </span>
      </div>
      <div class="map_container">
        <div class="map_container_title">Deposit/sales date</div>
        <Dropdown class="map_container_dropdown" v-model="selectedDeposit" placeholder="ftd" :options="deposits"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="bottom_section_container">
        <div>What to do with the rest of the fields found in the source file? (You shouldn't include them if they
          contain
          sensitive data)
        </div>
        <div class="options_container">
          <button class="btn_left">Don't include</button>
          <button class="btn_right">Include</button>
        </div>
        <div>Other fields will be imported, stored and buyers will be able to see them after purchase these leads.
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "Mapper",
  data() {
    return {
      darkModeSwitch: false,
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
    firstNameValidator() {
      let splittedObject = this.$parsedObject.split(',')
      splittedObject[0] = this.selectedFirstName.name
      this.$parsedObject = splittedObject.join()
      console.log(this.$parsedObject)
    },
    lastNameValidator() {
      let splittedObject = this.$parsedObject.split(',')
      splittedObject[1] = this.selectedLastName.name
      this.$parsedObject = splittedObject.join()
      console.log(this.$parsedObject)
    },
    fullNameValidator() {
      let splittedObject = this.$parsedObject.split(',')
      splittedObject[2] = this.selectedFullName.name
      this.$parsedObject = splittedObject.join()
      console.log(this.$parsedObject)
    },
    emailValidator() {
      let splittedObject = this.$parsedObject.split(',')
      splittedObject[3] = this.selectedEmail.name
      this.$parsedObject = splittedObject.join()
      console.log(this.$parsedObject)
    },
    phoneNumberValidator() {
      let splittedObject = this.$parsedObject.split(',')
      splittedObject[4] = this.selectedPhoneNumber.name
      this.$parsedObject = splittedObject.join()
      console.log(this.$parsedObject)
    },
    countryValidator() {
      let splittedObject = this.$parsedObject.split(',')
      splittedObject[5] = this.selectedCountry.name
      this.$parsedObject = splittedObject.join()
      console.log(this.$parsedObject)
    }
  },
  computed: {
    ...mapGetters(['listName', "fileName"]),
  },
  watch: {
    checkedCountry: {
      handler(newValue) {
        if (newValue) {
          globalTelegram.MainButton.setText('Next')
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
              .onClick(() => {
                if (this.$route.path === '/mapper') this.$router.push({name: 'country'}
                )
              })
        }
      },
    },
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.bottom_section_container').forEach(e => e.classList.replace('bottom_section_container', 'bottom_section_container_dark'))
          document.querySelectorAll('.description').forEach(e => e.classList.replace('description', 'description_dark'))
          document.querySelectorAll('.map_container_title').forEach(e => e.classList.replace('map_container_title', 'map_container_title_dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.bottom_section_container_dark').forEach(e => e.classList.replace('bottom_section_container_dark', 'bottom_section_container'))
          document.querySelectorAll('.description_dark').forEach(e => e.classList.replace('description_dark', 'description'))
          document.querySelectorAll('.map_container_title_dark').forEach(e => e.classList.replace('map_container_title_dark', 'map_container_title'))
        }
      },
    },
  },
  created() {
    globalTelegram.colorScheme === "light" ? this.darkModeSwitch = false : this.darkModeSwitch = true;
  },
  mounted() {
    // uncomment to see init variation of the $parsedObject
    // console.log(this.$parsedObject.split(','))
    globalTelegram.onEvent('themeChanged', () => {
      globalTelegram.colorScheme === "light" ? this.darkModeSwitch = false : this.darkModeSwitch = true;
    })
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.hide()
    globalTelegram.BackButton.show().onClick(() => this.$router.push({name: 'uploader'}))
  },
  beforeDestroy() {
    globalTelegram.BackButton.hide().offClick(() => this.$router.push({name: 'uploader'}))
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/ColumnMapper.scss';
</style>
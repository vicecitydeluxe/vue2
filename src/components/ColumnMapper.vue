<template>
  <div class="section">
    <header class="header">
      <h3>COLUMN MAPPING</h3>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <hr class="top_section_divider">
      <div>File: {{ fileName }}</div>
      <div class="description">Please map the required columns. You can import either full name or first+last name.
      </div>
      <div class="map_container">
        <div class="title">First name</div>
        <Dropdown class="dropdown" v-model="selectedFirstName" placeholder="name" :options="firstNames"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="title">Last name</div>
        <Dropdown class="dropdown" v-model="selectedSecondName" placeholder="f_name" :options="lastNames"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="title">Full name</div>
        <Dropdown class="dropdown" v-model="selectedFullName" placeholder="(select)" :options="fullNames"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="title">Email</div>
        <Dropdown class="dropdown" v-model="selectedEmail" placeholder="email" :options="emails"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="title">Phone number</div>
        <Dropdown class="dropdown" v-model="selectedPhoneNumber" placeholder="phone" :options="phoneNumbers"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="title">Country</div>
        <div class="field-checkbox">
          <Checkbox id="binary" v-model="checkedCountry" :binary="true"/>
          <label for="binary">load</label>
        </div>
        <Dropdown class="dropdown" v-model="selectedCountry" placeholder="country" :options="countries"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="sub_map_container">
        <div class="field-checkbox">
          <label for="binary">set empty to</label>
        </div>
        <Dropdown class="dropdown" v-model="selectedCountryFromList" placeholder="GB UK" :options="countriesList"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="sub_map_container">
        <div class="field-checkbox">
          <label for="binary">set all to</label>
        </div>
        <Dropdown class="dropdown" v-model="selectedCountryFromList" placeholder="(choose)" :options="countriesList"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="title">Reg date</div>
        <div class="field-checkbox">
          <Checkbox id="binary" v-model="checkedRegDate" :binary="true"/>
          <label for="binary">set all to</label>
        </div>
        <span class="p-input-icon-right">
          <InputMask class="inputmask" mask="99/99/9999" v-model="registrationDate" placeholder="  /  /    "
                     slotChar="mm/dd/yyyy"></InputMask>
        <i class="pi pi-calendar"></i>
        </span>
      </div>
      <div class="sub_map_container">
        <div class="field-checkbox">
          <Checkbox id="binary" v-model="checkedRegDateToLoad" :binary="true"/>
          <label for="binary">load</label>
        </div>
        <Dropdown class="dropdown" v-model="selectedRegDate" placeholder="reg" :options="regGateList"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container">
        <div class="field-checkbox">
          <label for="binary">set empty or broken to</label>
        </div>
        <span class="p-input-icon-right">
                  <InputMask class="inputmask" mask="99/99/9999" v-model="emptyDateSetter" placeholder="  /  /    "
                             slotChar="mm/dd/yyyy"></InputMask>
        <i class="pi pi-calendar"></i>
        </span>
      </div>
      <div class="map_container">
        <div class="title">Deposit/sales date</div>
        <Dropdown class="dropdown" v-model="selectedDeposit" placeholder="ftd" :options="deposits"
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
      selectedFirstName: null,
      selectedSecondName: null,
      selectedFullName: null,
      selectedEmail: null,
      selectedPhoneNumber: null,
      selectedCountry: null,
      selectedCountryFromList: null,
      selectedRegDate: null,
      selectedDeposit: null,
      checkedCountry: false,
      checkedRegDate: false,
      checkedRegDateToLoad: false,
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
        } else if (!newValue) {
          globalTelegram.MainButton.hide()
        }
      },
    }
  },
  mounted() {
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
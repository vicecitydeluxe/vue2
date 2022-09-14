<template>
  <div>
    <header class="header">
      <h3>Column mapping</h3>
      <Button icon="pi pi-times" class="p-button-rounded p-button-help p-button-text"
              @click="$router.push({name:'uploader'})"/>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <div>File: {{ fileName }}</div>
      <div class="description">Please map the required columns. You can import either full name or first+last name.
      </div>
      <div class="map_container"><h5>firstname *</h5>
        <Dropdown class="dropdown" v-model="selectedFirstName" placeholder="name" :options="firstNames"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container"><h5>lastname *</h5>
        <Dropdown class="dropdown" v-model="selectedSecondName" placeholder="f_name" :options="lastNames"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container"><h5>fullname</h5>
        <Dropdown class="dropdown" v-model="selectedFullName" placeholder="(select)" :options="fullNames"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container"><h5>email *</h5>
        <Dropdown class="dropdown" v-model="selectedEmail" placeholder="email" :options="emails"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container"><h5>phone-number *</h5>
        <Dropdown class="dropdown" v-model="selectedPhoneNumber" placeholder="phone" :options="phoneNumbers"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container"><h5>country</h5>
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
      <div class="map_container"><h5>registration date *</h5>
        <div class="field-checkbox">
          <Checkbox id="binary" v-model="checkedRegDate" :binary="true"/>
          <label for="binary">set all to</label>
        </div>
        <InputMask mask="99/99/9999" v-model="registrationDate" placeholder="  /  /    "
                   slotChar="mm/dd/yyyy"></InputMask>
        <i class="pi pi-calendar" style="font-size: 2rem"></i>
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
        <InputMask mask="99/99/9999" v-model="emptyDateSetter" placeholder="  /  /    "
                   slotChar="mm/dd/yyyy"></InputMask>
        <i class="pi pi-calendar" style="font-size: 2rem"></i>
      </div>
      <div class="map_container"><h5>deposit/sales date</h5>
        <Dropdown class="dropdown" v-model="selectedDeposit" placeholder="ftd" :options="deposits"
                  optionLabel="name"></Dropdown>
      </div>
      <hr>
      <div>What to do do with the rest fields found in the source file? (You better don't include them if they contain
        sensitive data.)
      </div>
      <div class="options_container">
        <Button style="width: 100%" label="Don't include"></Button>
        <Button style="width: 100%" label="Include"></Button>
      </div>
      <div>Other fields will be imported, stored and buyers will be able to see them after purchase these leads.
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
        {name: 'name'},
        {name: 'firstname'},
        {name: 'f_name'},
      ],
      lastNames: [
        {name: 'lastname'},
        {name: 'l_name'},
      ],
      fullNames: [
        {name: 'fullname'},
        {name: 'full_name'},
      ],
      emails: [
        {name: 'email'},
        {name: 'e-mail'},
      ],
      phoneNumbers: [
        {name: 'phone'},
        {name: 'mobile'},
        {name: 'phone_number'},
      ],
      countries: [
        {name: 'countries'},
        {name: 'country'},
      ],
      regGateList: [
        {name: 'reg_date'},
        {name: 'registration-date'},
      ],
      deposits: [
        {name: 'depo'},
        {name: 'example'},
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
              .show()
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
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/ColumnMapper.scss';
</style>
// noinspection ES6UnusedImports
import Vue from 'vue'
import {mapGetters} from "vuex";

export default {
    data() {
        return {
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
            brokenDate: null,
            emptyDateSetter: null,
            firstNames: [
                {name: 'name'},
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
                {name: 'country_code'},
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
        firstNameChecker() {
            const arrayDictionary = this.firstNames.map((el) => el.name)
            const result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedFirstName = {name: result[0]}
        },
        lastNameChecker() {
            let arrayDictionary = this.lastNames.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedLastName = {name: result[0]}
        },
        fullNameChecker() {
            let arrayDictionary = this.fullNames.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedFullName = {name: result[0]}
        },
        emailChecker() {
            let arrayDictionary = this.emails.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedEmail = {name: result[0]}
        },
        phoneChecker() {
            let arrayDictionary = this.phoneNumbers.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedPhoneNumber = {name: result[0]}
        },
        countryChecker() {
            let arrayDictionary = this.countries.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedCountry = {name: result[0]}

            this.$store.commit('setChosenCountry', this.selectedCountry.name)
        },
        registrationDateChecker() {
            let arrayDictionary = this.regGateList.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedRegDate = {name: result[0]}
        },
        depositChecker() {
            let arrayDictionary = this.deposits.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedDeposit = {name: result[0]}
        },
        multipleCheckerCaller() {
            this.firstNameChecker()
            this.lastNameChecker()
            this.fullNameChecker()
            this.emailChecker()
            this.phoneChecker()
            this.countryChecker()
            this.registrationDateChecker()
            this.depositChecker()
        },
        firstNameReplacer() {
            const splitObject = this.$parsedHeaders.split(',')
            const replacer = this.selectedFirstName?.name
            const arrayDictionary = this.firstNames.map((el) => el.name)
            const replacedArr = splitObject.map((i) => arrayDictionary.includes(i)
                ? replacer
                : i)
            console.log(replacedArr.join())
        },
        lastNameReplacer() {
            const splitObject = this.$parsedHeaders.split(',')
            const replacer = this.selectedLastName?.name
            const arrayDictionary = this.lastNames.map((el) => el.name)
            const replacedArr = splitObject.map((i) => arrayDictionary.includes(i)
                ? replacer
                : i)
            console.log(replacedArr.join())
        },
        fullNameReplacer() {
            const splitObject = this.$parsedHeaders.split(',')
            const replacer = this.selectedFullName?.name
            const arrayDictionary = this.fullNames.map((el) => el.name)
            const replacedArr = splitObject.map((i) => arrayDictionary.includes(i)
                ? replacer
                : i)
            console.log(replacedArr.join())
        },
        emailReplacer() {
            const splitObject = this.$parsedHeaders.split(',')
            const replacer = this.selectedEmail?.name
            const arrayDictionary = this.emails.map((el) => el.name)
            const replacedArr = splitObject.map((i) => arrayDictionary.includes(i)
                ? replacer
                : i)
            console.log(replacedArr.join())
        },
        phoneNumberReplacer() {
            const splitObject = this.$parsedHeaders.split(',')
            const replacer = this.selectedPhoneNumber?.name
            const arrayDictionary = this.phoneNumbers.map((el) => el.name)
            const replacedArr = splitObject.map((i) => arrayDictionary.includes(i)
                ? replacer
                : i)
            console.log(replacedArr.join())
        },
        countryReplacer() {
            const splitObject = this.$parsedHeaders.split(',')
            const replacer = this.selectedCountry?.name
            const arrayDictionary = this.countries.map((el) => el.name)
            const replacedArr = splitObject.map((i) => arrayDictionary.includes(i)
                ? replacer
                : i)
            // console.log(replacedArr.join())
            Vue.prototype.$fullObject.data.forEach(el => {
                el[this.selectedCountry.name] = el[this.chosenCountry]
                delete el[this.chosenCountry]
            })
            // TODO replace old key in this.$store.commit('setParsedFields', this.selectedCountry.name)
            this.$store.commit('setChosenCountry', this.selectedCountry.name)
        },
    },
    computed: {
        ...mapGetters(["chosenCountry"]),
    },
}
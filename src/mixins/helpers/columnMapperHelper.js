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
            registrationDate: new Date(),
            emptyDateSetter: null,
            requiredFieldsDictionary: ["name", "firstname", "fname", "first_name",
                "lastname", "last", "last name", "lname",
                "fullname", "full_name",
                "email", "mail", "e-mail",
                "phone", "mobile phone", "phone number",
                "mobile", "main number", "main phone",
                "phone_number", "mobile_phone",
                "country", "countryid", "geo", "country_id", "country_code",
                "regdate", "reg date", "reg_date", "registration_date", "registered", "registered_at",
                "deposited", "deposit date", "deposit_date", "ftd date", "ftd_date", "ftd"],
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
            countriesHeaders: [
                {name: 'country'},
                {name: 'countryid'},
                {name: 'geo'},
                {name: 'country_id'},
                {name: 'country_code'},
            ],
            regDateList: [
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

        }
    },
    methods: {
        /**
         * Each checker pre-selects dropdown value in ColumnMapper.vue
         */
        firstNameChecker() {
            const arrayDictionary = this.firstNames.map((el) => el.name)
            const result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedFirstName = {name: result[0]}

            this.$store.commit('setChosenFirstName', this.selectedFirstName.name)

        },
        lastNameChecker() {
            let arrayDictionary = this.lastNames.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedLastName = {name: result[0]}

            this.$store.commit('setChosenLastName', this.selectedLastName.name)
        },
        fullNameChecker() {
            let arrayDictionary = this.fullNames.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedFullName = {name: result[0]}

            this.$store.commit('setChosenFullName', this.selectedFullName.name)
        },
        emailChecker() {
            let arrayDictionary = this.emails.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedEmail = {name: result[0]}

            this.$store.commit('setChosenEmail', this.selectedEmail.name)
        },
        phoneChecker() {
            let arrayDictionary = this.phoneNumbers.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedPhoneNumber = {name: result[0]}

            this.$store.commit('setChosenPhone', this.selectedPhoneNumber.name)
        },
        countryChecker() {
            let arrayDictionary = this.countriesHeaders.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedCountry = {name: result[0]}

            this.$store.commit('setChosenCountry', this.selectedCountry.name)
        },
        registrationDateChecker() {
            let arrayDictionary = this.regDateList.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedRegDate = {name: result[0]}

            this.$store.commit('setChosenRegDate', this.selectedRegDate.name)
        },
        depositChecker() {
            let arrayDictionary = this.deposits.map((el) => el.name)
            let result = this.parsedFields.filter(i => arrayDictionary.includes(i));
            this.selectedDeposit = {name: result[0]}

            this.$store.commit('setChosenDeposit', this.selectedDeposit.name)
        },
        /**
         * multipleCheckerCaller() invokes
         * all checkers in ColumnMapper.vue mounted-hook
         */
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
        /**
         * Replacers recompile $parsedHeaders
         * each time dropdown value change
         * assigning this value in right order
         */
        firstNameReplacer() {
            /**
             * copy logic to each dropdown if you
             * want to test $parsedHeaders
             */
            // const splitObject = this.$parsedHeaders.split(',')
            // const replacer = this.selectedFirstName?.name
            // const arrayDictionary = this.firstNames.map((el) => el.name)
            // const replacedArr = splitObject.map((i) => arrayDictionary.includes(i)
            //     ? replacer
            //     : i)
            // console.log(replacedArr.join())
            /**
             * Please see countryReplacer() method annotation
             */
            Vue.prototype.$fullObject.data.forEach(el => {
                el[this.selectedFirstName.name] = el[this.chosenFirstName]
                delete el[this.chosenFirstName]
            })
            const oldChosenFirstName = this.chosenFirstName
            const newChosenFirstName = this.selectedFirstName.name
            const newParsedFields = this.parsedFields
            newParsedFields.forEach((el, index) => {
                if (el === oldChosenFirstName) newParsedFields
                    .splice(index, 1, newChosenFirstName)
            })
            this.$store.commit('setChosenFirstName', this.selectedFirstName.name)
            this.$store.commit('setParsedFields', newParsedFields)
        },
        lastNameReplacer() {
            /**
             * Please see countryReplacer() method annotation
             */
            Vue.prototype.$fullObject.data.forEach(el => {
                el[this.selectedLastName.name] = el[this.chosenLastName]
                delete el[this.chosenLastName]
            })
            const oldChosenLastName = this.chosenLastName
            const newChosenLastName = this.selectedLastName.name
            const newParsedFields = this.parsedFields
            newParsedFields.forEach((el, index) => {
                if (el === oldChosenLastName) newParsedFields
                    .splice(index, 1, newChosenLastName)
            })
            this.$store.commit('setChosenLastName', this.selectedLastName.name)
            this.$store.commit('setParsedFields', newParsedFields)
        },
        fullNameReplacer() {
            /**
             * Please see countryReplacer() method annotation
             */
            Vue.prototype.$fullObject.data.forEach(el => {
                el[this.selectedFullName.name] = el[this.chosenFullName]
                delete el[this.chosenFullName]
            })
            const oldChosenFullName = this.chosenFullName
            const newChosenFullName = this.selectedFullName.name
            const newParsedFields = this.parsedFields
            newParsedFields.forEach((el, index) => {
                if (el === oldChosenFullName) newParsedFields
                    .splice(index, 1, newChosenFullName)
            })
            this.$store.commit('setChosenFullName', this.selectedFullName.name)
            this.$store.commit('setParsedFields', newParsedFields)
        },
        emailReplacer() {
            /**
             * Please see countryReplacer() method annotation
             */
            Vue.prototype.$fullObject.data.forEach(el => {
                el[this.selectedEmail.name] = el[this.chosenEmail]
                delete el[this.chosenEmail]
            })
            const oldChosenEmail = this.chosenEmail
            const newChosenEmail = this.selectedEmail.name
            const newParsedFields = this.parsedFields
            newParsedFields.forEach((el, index) => {
                if (el === oldChosenEmail) newParsedFields
                    .splice(index, 1, newChosenEmail)
            })
            this.$store.commit('setChosenEmail', this.selectedEmail.name)
            this.$store.commit('setParsedFields', newParsedFields)
        },
        phoneNumberReplacer() {
            /**
             * Please refer to
             * countryReplacer() method
             * annotation to know details
             */
            Vue.prototype.$fullObject.data.forEach(el => {
                el[this.selectedPhoneNumber.name] = el[this.chosenPhone]
                delete el[this.chosenPhone]
            })
            const oldChosenPhone = this.chosenPhone
            const newChosenPhone = this.selectedPhoneNumber.name
            const newParsedFields = this.parsedFields
            newParsedFields.forEach((el, index) => {
                if (el === oldChosenPhone) newParsedFields
                    .splice(index, 1, newChosenPhone)
            })
            this.$store.commit('setChosenPhone', this.selectedPhoneNumber.name)
            this.$store.commit('setParsedFields', newParsedFields)
        },
        countryReplacer() {
            /**
             * After each change of dropdown option,
             * we mutate our global non-reactive
             * variable and change global state
             * parsedFields array & chosenCountry
             * (previous "old" state-accessor)
             */
            Vue.prototype.$fullObject.data.forEach(el => {
                el[this.selectedCountry.name] = el[this.chosenCountry]
                delete el[this.chosenCountry]
            })
            const oldChosenCountry = this.chosenCountry
            const newChosenCountry = this.selectedCountry.name
            const newParsedFields = this.parsedFields
            newParsedFields.forEach((el, index) => {
                if (el === oldChosenCountry) newParsedFields
                    .splice(index, 1, newChosenCountry)
            })
            this.$store.commit('setChosenCountry', this.selectedCountry.name)
            this.$store.commit('setParsedFields', newParsedFields)
            console.log(Vue.prototype?.$fullObject?.data)

        },
        registrationDateReplacer() {
            /**
             * Please see countryReplacer() method annotation
             */
            Vue.prototype.$fullObject.data.forEach(el => {
                el[this.selectedRegDate.name] = el[this.chosenRegDate]
                delete el[this.chosenRegDate]
            })
            const oldChosenRegDate = this.chosenRegDate
            const newChosenRegDate = this.selectedRegDate.name
            const newParsedFields = this.parsedFields
            newParsedFields.forEach((el, index) => {
                if (el === oldChosenRegDate) newParsedFields
                    .splice(index, 1, newChosenRegDate)
            })
            this.$store.commit('setChosenRegDate', this.selectedRegDate.name)
            this.$store.commit('setParsedFields', newParsedFields)
        },
        depositReplacer() {
            /**
             * Please see countryReplacer() method annotation
             */
            Vue.prototype.$fullObject.data.forEach(el => {
                el[this.selectedDeposit.name] = el[this.chosenDeposit]
                delete el[this.chosenDeposit]
            })
            const oldChosenDeposit = this.chosenDeposit
            const newChosenDeposit = this.selectedDeposit.name
            const newParsedFields = this.parsedFields
            newParsedFields.forEach((el, index) => {
                if (el === oldChosenDeposit) newParsedFields
                    .splice(index, 1, newChosenDeposit)
            })
            this.$store.commit('setChosenDeposit', this.selectedDeposit.name)
            this.$store.commit('setParsedFields', newParsedFields)
        },
    },
    computed: {
        ...mapGetters(['parsedFields',
            "chosenFirstName",
            "chosenLastName",
            "chosenFullName",
            "chosenEmail",
            "chosenPhone",
            'chosenCountry',
            "chosenRegDate",
            "chosenDeposit",
        ]),
    },
}
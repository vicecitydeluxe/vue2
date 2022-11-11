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
                'name',
                'firstname',
                'fname',
                'first_name',
            ],
            lastNames: [
                'lastname',
                'last',
                'last name',
                'lname',
            ],
            fullNames: [
                'fullname',
                'full_name',
            ],
            emails: [
                'email',
                'mail',
                'e-mail',
            ],
            phoneNumbers: [
                'phone',
                'mobile phone',
                'phone number',
                'mobile',
                'main number',
                'main phone',
                'phone_number',
                'mobile_phone',
            ],
            countriesHeaders: [
                'country',
                'countryid',
                'geo',
                'country_id',
                'country_code',
            ],
            regDateList: [
                'regdate',
                'reg date',
                'reg_date',
                'registration_date',
                'registered',
                'registered_at',
            ],
            deposits: [
                'deposited',
                'deposit date',
                'deposit_date',
                'ftd date',
                'ftd_date',
                'ftd',
            ],
        }
    },
    methods: {
        /**
         * Each checker pre-selects dropdown value in ColumnMapper.vue
         */
        firstNameChecker() {
            let result = this.parsedFields.filter(i => this.firstNames.includes(i));
            this.selectedFirstName = result[0]
            this.$store.commit('setChosenFirstName', this.selectedFirstName)

            Vue.prototype.$fullObject.data.forEach((element) => {
                if (this.selectedFirstName === 'firstname') return
                delete Object.assign(element, {firstname: element[this.selectedFirstName]})[this.selectedFirstName];
            })
        },
        lastNameChecker() {
            let result = this.parsedFields.filter(i => this.lastNames.includes(i));
            this.selectedLastName = result[0]
            this.$store.commit('setChosenLastName', this.selectedLastName)
            Vue.prototype.$fullObject.data.forEach((element) => {
                if (this.selectedLastName === 'lastname') return
                delete Object.assign(element, {lastname: element[this.selectedLastName]})[this.selectedLastName];
            })
        },
        fullNameChecker() {
            let result = this.parsedFields.filter(i => this.fullNames.includes(i));
            this.selectedFullName = result[0]
            this.$store.commit('setChosenFullName', this.selectedFullName)
            Vue.prototype.$fullObject.data.forEach((element) => {
                if (this.selectedFullName === 'fullname') return
                delete Object.assign(element, {fullname: element[this.selectedFullName]})[this.selectedFullName];
            })
        },
        emailChecker() {
            let result = this.parsedFields.filter(i => this.emails.includes(i));
            this.selectedEmail = result[0]
            this.$store.commit('setChosenEmail', this.selectedEmail)
            Vue.prototype.$fullObject.data.forEach((element) => {
                if (this.selectedEmail === 'email') return
                delete Object.assign(element, {email: element[this.selectedEmail]})[this.selectedEmail];
            })
        },
        phoneChecker() {
            let result = this.parsedFields.filter(i => this.phoneNumbers.includes(i));
            this.selectedPhoneNumber = result[0]

            this.$store.commit('setChosenPhone', this.selectedPhoneNumber)

            Vue.prototype.$fullObject.data.forEach((element) => {
                if (this.selectedPhoneNumber === 'phone') return
                delete Object.assign(element, {phone: element[this.selectedPhoneNumber]})[this.selectedPhoneNumber];
            })
        },
        countryChecker() {
            let result = this.parsedFields.filter(i => this.countriesHeaders.includes(i));
            this.selectedCountry = result[0]
            this.$store.commit('setChosenCountry', this.selectedCountry)
            Vue.prototype.$fullObject.data.forEach((element) => {
                if (this.selectedCountry === 'country') return
                delete Object.assign(element, {country: element[this.selectedCountry]})[this.selectedCountry];
            })
        },
        registrationDateChecker() {
            let result = this.parsedFields.filter(i => this.regDateList.includes(i));
            this.selectedRegDate = result[0]
            this.$store.commit('setChosenRegDate', this.selectedRegDate)
            Vue.prototype.$fullObject.data.forEach((element) => {
                if (this.selectedRegDate === 'regdate') return
                delete Object.assign(element, {regdate: element[this.selectedRegDate]})[this.selectedRegDate];
            })
        },
        depositChecker() {
            let result = this.parsedFields.filter(i => this.deposits.includes(i));
            this.selectedDeposit = result[0]
            this.$store.commit('setChosenDeposit', this.selectedDeposit)
            Vue.prototype.$fullObject.data.forEach((element) => {
                if (this.selectedDeposit === 'deposit') return
                delete Object.assign(element, {deposit: element[this.selectedDeposit]})[this.selectedDeposit];
            })
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
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.firstNames.some(el => e.hasOwnProperty(el))) {
                    if (this.selectedFirstName === 'firstname') return
                    delete Object.assign(e, {firstname: e[this.selectedFirstName]})[this.selectedFirstName];
                } else if (this.selectedFirstName === this.selectedLastName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedLastName = this.chosenFirstName
                } else if (this.selectedFirstName === this.selectedFullName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedFullName = this.chosenFirstName
                } else if (this.selectedFirstName === this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.email})['email'];
                    delete Object.assign(e, {email: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedEmail = this.chosenFirstName
                } else if (this.selectedFirstName === this.selectedPhoneNumber) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedPhoneNumber = this.chosenFirstName
                } else if (this.selectedFirstName === this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.country})['country'];
                    delete Object.assign(e, {country: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedCountry = this.chosenFirstName
                } else if (this.selectedFirstName === this.selectedRegDate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedRegDate = this.chosenFirstName
                } else if (this.selectedFirstName === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedDeposit = this.chosenFirstName
                }
            })
            this.$store.commit('setChosenFirstName', this.selectedFirstName)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        lastNameReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.lastNames.some(el => e.hasOwnProperty(el))) {
                    if (this.selectedLastName === 'lastname') return
                    delete Object.assign(e, {lastname: e[this.selectedLastName]})[this.selectedLastName];
                } else if (this.selectedLastName === this.selectedFirstName) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedFirstName = this.chosenLastName
                } else if (this.selectedLastName === this.selectedFullName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedFullName = this.chosenLastName
                } else if (this.selectedLastName === this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.email})['email'];
                    delete Object.assign(e, {email: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedEmail = this.chosenLastName
                } else if (this.selectedLastName === this.selectedPhoneNumber) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedPhoneNumber = this.chosenLastName
                } else if (this.selectedLastName === this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.country})['country'];
                    delete Object.assign(e, {country: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedCountry = this.chosenLastName
                } else if (this.selectedLastName === this.selectedRegDate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedRegDate = this.chosenLastName
                } else if (this.selectedLastName === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedDeposit = this.chosenLastName
                }
            })
            this.$store.commit('setChosenLastName', this.selectedLastName)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        fullNameReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.fullNames.some(el => e.hasOwnProperty(el))) {
                    if (this.selectedFullName === 'fullname') return
                    delete Object.assign(e, {fullname: e[this.selectedFullName]})[this.selectedFullName];
                } else if (this.selectedFullName === this.selectedFirstName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedFirstName = this.chosenFullName
                } else if (this.selectedFullName === this.selectedLastName) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedLastName = this.chosenFullName
                } else if (this.selectedFullName === this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.email})['email'];
                    delete Object.assign(e, {email: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedEmail = this.chosenFullName
                } else if (this.selectedFullName === this.selectedPhoneNumber) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedPhoneNumber = this.chosenFullName
                } else if (this.selectedFullName === this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.country})['country'];
                    delete Object.assign(e, {country: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedCountry = this.chosenFullName
                } else if (this.selectedFullName === this.selectedRegDate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedRegDate = this.chosenFullName
                } else if (this.selectedFullName === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedDeposit = this.chosenFullName
                }
            })
            this.$store.commit('setChosenFullName', this.selectedFullName)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        emailReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.emails.some(el => e.hasOwnProperty(el))) {
                    if (this.selectedEmail === 'email') return
                    delete Object.assign(e, {email: e[this.selectedEmail]})[this.selectedEmail];
                } else if (this.selectedEmail === this.selectedFirstName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedFirstName = this.chosenEmail
                } else if (this.selectedEmail === this.selectedLastName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedLastName = this.chosenEmail
                } else if (this.selectedEmail === this.selectedFullName) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedFullName = this.chosenEmail
                } else if (this.selectedEmail === this.selectedPhoneNumber) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedPhoneNumber = this.chosenEmail
                } else if (this.selectedEmail === this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.country})['country'];
                    delete Object.assign(e, {country: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedCountry = this.chosenEmail
                } else if (this.selectedEmail === this.selectedRegDate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedRegDate = this.chosenEmail
                } else if (this.selectedEmail === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedDeposit = this.chosenEmail
                }
            })
            this.$store.commit('setChosenEmail', this.selectedEmail)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        phoneNumberReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.phoneNumbers.some(el => e.hasOwnProperty(el))) {
                    if (this.selectedPhoneNumber === 'phone') return
                    delete Object.assign(e, {phone: e[this.selectedPhoneNumber]})[this.selectedPhoneNumber];
                } else if (this.selectedPhoneNumber === this.selectedFirstName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedFirstName = this.chosenPhone
                } else if (this.selectedPhoneNumber === this.selectedLastName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedLastName = this.chosenPhone
                } else if (this.selectedPhoneNumber === this.selectedFullName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedFullName = this.chosenPhone
                } else if (this.selectedPhoneNumber === this.selectedEmail) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.email})['email'];
                    delete Object.assign(e, {email: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedEmail = this.chosenPhone
                } else if (this.selectedPhoneNumber === this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.country})['country'];
                    delete Object.assign(e, {country: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedCountry = this.chosenPhone
                } else if (this.selectedPhoneNumber === this.selectedRegDate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedRegDate = this.chosenPhone
                } else if (this.selectedPhoneNumber === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedDeposit = this.chosenPhone
                }
            })
            this.$store.commit('setChosenPhone', this.selectedPhoneNumber)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        countryReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.countriesHeaders.some(el => e.hasOwnProperty(el))) {
                    if (this.selectedCountry === 'country') return
                    delete Object.assign(e, {country: e[this.selectedCountry]})[this.selectedCountry];
                } else if (this.selectedCountry === this.selectedFirstName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedFirstName = this.chosenCountry
                } else if (this.selectedCountry === this.selectedLastName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedLastName = this.chosenCountry
                } else if (this.selectedCountry === this.selectedFullName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedFullName = this.chosenCountry
                } else if (this.selectedCountry === this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.email})['email'];
                    delete Object.assign(e, {email: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedEmail = this.chosenCountry
                } else if (this.selectedCountry === this.selectedPhoneNumber) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedPhoneNumber = this.chosenCountry
                } else if (this.selectedCountry === this.selectedRegDate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedRegDate = this.chosenCountry
                } else if (this.selectedCountry === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedDeposit = this.chosenCountry
                }
            })
            this.$store.commit('setChosenCountry', this.selectedCountry)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        registrationDateReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.regDateList.some(el => e.hasOwnProperty(el))) {
                    if (this.selectedRegDate === 'regdate') return
                    delete Object.assign(e, {regdate: e[this.selectedRegDate]})[this.selectedRegDate];
                } else if (this.selectedRegDate === this.selectedFirstName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedFirstName = this.chosenRegDate
                } else if (this.selectedRegDate === this.selectedLastName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedLastName = this.chosenRegDate
                } else if (this.selectedRegDate === this.selectedFullName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedFullName = this.chosenRegDate
                } else if (this.selectedRegDate === this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.email})['email'];
                    delete Object.assign(e, {email: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedEmail = this.chosenRegDate
                } else if (this.selectedRegDate === this.selectedPhoneNumber) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedPhoneNumber = this.chosenRegDate
                } else if (this.selectedRegDate === this.selectedCountry) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.country})['country'];
                    delete Object.assign(e, {country: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedCountry = this.chosenRegDate
                } else if (this.selectedRegDate === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedDeposit = this.chosenRegDate
                }
            })
            this.$store.commit('setChosenRegDate', this.selectedRegDate)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        depositReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.deposits.some(el => e.hasOwnProperty(el))) {
                    if (this.selectedDeposit === 'deposit') return
                    delete Object.assign(e, {deposit: e[this.selectedDeposit]})[this.selectedDeposit];
                } else if (this.selectedDeposit === this.selectedFirstName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedFirstName = this.chosenRegDate
                } else if (this.selectedDeposit === this.selectedLastName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedLastName = this.chosenRegDate
                } else if (this.selectedDeposit === this.selectedFullName) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedFullName = this.chosenRegDate
                } else if (this.selectedDeposit === this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.email})['email'];
                    delete Object.assign(e, {email: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedEmail = this.chosenRegDate
                } else if (this.selectedDeposit === this.selectedPhoneNumber) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedPhoneNumber = this.chosenRegDate
                } else if (this.selectedDeposit === this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.country})['country'];
                    delete Object.assign(e, {country: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedCountry = this.chosenRegDate
                } else if (this.selectedDeposit === this.selectedRegDate) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.d})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedDeposit = this.chosenRegDate
                }
            })
            this.$store.commit('setChosenDeposit', this.selectedDeposit)
            console.log(Vue.prototype?.$fullObject?.data)
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
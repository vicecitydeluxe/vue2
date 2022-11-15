// noinspection ES6UnusedImports
import Vue from 'vue'
import {mapGetters} from "vuex";

export default {
    data() {
        return {
            selectedFirstname: null,
            selectedLastname: null,
            selectedFullname: null,
            selectedEmail: null,
            selectedPhone: null,
            selectedCountry: null,
            selectedCountryFromList: null,
            selectedRegdate: null,
            selectedDeposit: null,
            checkedCountry: '',
            checkedRegDate: '',
            registrationDate: new Date(),
            emptyDateSetter: null,
            requiredFieldsDictionary: [["firstname", "name", "fname", "first_name"],
                ["lastname", "last", "last name", "lname"],
                ["fullname", "full_name"],
                ["email", "mail", "e-mail"],
                ["phone", "mobile phone", "phone number",
                    "mobile", "main number", "main phone",
                    "phone_number", "mobile_phone"],
                ["country", "countryid", "geo", "country_id", "country_code"],
                ["regdate", "reg date", "reg_date", "registration_date", "registered", "registered_at"],
                ['deposit', "deposited", "deposit date", "deposit_date", "ftd date", "ftd_date", "ftd"]],
        }
    },
    methods: {
        firstNameReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.requiredFieldsDictionary[0].some(el => e.hasOwnProperty(el))) {
                    if (this.selectedFirstname === 'firstname') return
                    delete Object.assign(e, {firstname: e[this.selectedFirstname]})[this.selectedFirstname];
                } else if (this.selectedFirstname === this.chosenFirstname) {
                    return
                } else if (this.selectedFirstname === this.selectedLastname || !this.selectedLastname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedLastname = null
                    this.$store.commit('setChosenLastname', this.selectedLastname)
                } else if (this.selectedFirstname === this.selectedFullname || !this.selectedFullname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedFullname = null
                    this.$store.commit('setChosenFullname', this.selectedFullname)
                } else if (this.selectedFirstname === this.selectedEmail || !this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.email})['email'];
                    delete Object.assign(e, {email: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedEmail = null
                    this.$store.commit('setChosenEmail', this.selectedEmail)
                } else if (this.selectedFirstname === this.selectedPhone || !this.selectedPhone) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedPhone = null
                    this.$store.commit('setChosenPhone', this.selectedPhone)
                } else if (this.selectedFirstname === this.selectedCountry || !this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.country})['country'];
                    delete Object.assign(e, {country: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedCountry = null
                    this.$store.commit('setChosenCountry', this.selectedCountry)
                } else if (this.selectedFirstname === this.selectedRegdate || !this.selectedRegdate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedRegdate = null
                    this.$store.commit('setChosenRegdate', this.selectedRegdate)
                } else if (this.selectedFirstname === this.selectedDeposit || !this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {firstname: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.firstname})['firstname'];
                    Object.assign(e, {firstname: o.firstname});
                    this.selectedDeposit = null
                    this.$store.commit('setChosenDeposit', this.selectedDeposit)
                }
                // else if (!this.requiredFieldsDictionary.includes(this.selectedFirstName)) {
                //     if (!Object.values(e).filter((el) => el).every((e, i, a) => a.indexOf(e) === i)) {
                //         Object.assign(e, {firstname: e[this.selectedFirstName]})[this.selectedFirstName]
                //     }
                //
                //     const o = JSON.parse(JSON.stringify(e))
                //     // o[this.selectedFirstName] = o['firstname']
                //     !o['firstname'] ? o[this.chosenFirstName] = o['firstname'] : o[this.selectedFirstName] = o['firstname']
                //     Object.assign(e, {firstname: e[this.selectedFirstName]})[this.selectedFirstName]
                //     Object.assign(e, {[this.selectedFirstName]: o[this.selectedFirstName]})[this.selectedFirstName]
                //
                // }

                // else {
                //     const o = JSON.parse(JSON.stringify(e))
                //     o[this.chosenFirstName] = o['firstname']
                //     Object.assign(e, {firstname: e[this.chosenFirstName]})[this.chosenFirstName]
                //     Object.assign(e, {[this.chosenFirstName]: o[this.chosenFirstName]})[this.chosenFirstName]
                //
                // }
            })
            this.$store.commit('setChosenFirstname', this.selectedFirstname)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        lastNameReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.requiredFieldsDictionary[1].some(el => e.hasOwnProperty(el))) {
                    if (this.selectedLastname === 'lastname') return
                    delete Object.assign(e, {lastname: e[this.selectedLastname]})[this.selectedLastname];
                } else if (this.selectedLastname === this.chosenLastname) {
                    return
                } else if (this.selectedLastname === this.selectedFirstname) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedFirstname = this.chosenLastname
                    this.$store.commit('setChosenFirstname', this.selectedFirstname)
                } else if (this.selectedLastname === this.selectedFullname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedFullname = this.chosenLastname
                    this.$store.commit('setChosenFullname', this.selectedFullname)
                } else if (this.selectedLastname === this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.email})['email'];
                    delete Object.assign(e, {email: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedEmail = this.chosenLastname
                    this.$store.commit('setChosenEmail', this.selectedEmail)
                } else if (this.selectedLastname === this.selectedPhone) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedPhone = this.chosenLastname
                    this.$store.commit('setChosenPhone', this.selectedPhone)
                } else if (this.selectedLastname === this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.country})['country'];
                    delete Object.assign(e, {country: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedCountry = this.chosenLastname
                    this.$store.commit('setChosenCountry', this.selectedCountry)
                } else if (this.selectedLastname === this.selectedRegdate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedRegdate = this.chosenLastname
                    this.$store.commit('setChosenRegdate', this.selectedRegdate)
                } else if (this.selectedLastname === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {lastname: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.lastname})['lastname'];
                    Object.assign(e, {lastname: o.lastname});
                    this.selectedDeposit = this.chosenLastname
                    this.$store.commit('setChosenDeposit', this.selectedDeposit)
                }
            })
            this.$store.commit('setChosenLastname', this.selectedLastname)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        fullNameReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.requiredFieldsDictionary[2].some(el => e.hasOwnProperty(el))) {
                    if (this.selectedFullname === 'fullname') return
                    delete Object.assign(e, {fullname: e[this.selectedFullname]})[this.selectedFullname];
                } else if (this.selectedFullname === this.chosenFullname) {
                    return
                } else if (this.selectedFullname === this.selectedFirstname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedFirstname = this.chosenFullname
                    this.$store.commit('setChosenFirstname', this.selectedFirstname)
                } else if (this.selectedFullname === this.selectedLastname) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedLastname = this.chosenFullname
                    this.$store.commit('setChosenLastname', this.selectedLastname)
                } else if (this.selectedFullname === this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.email})['email'];
                    delete Object.assign(e, {email: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedEmail = this.chosenFullname
                    this.$store.commit('setChosenEmail', this.selectedEmail)
                } else if (this.selectedFullname === this.selectedPhone) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedPhone = this.chosenFullname
                    this.$store.commit('setChosenPhone', this.selectedPhone)
                } else if (this.selectedFullname === this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.country})['country'];
                    delete Object.assign(e, {country: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedCountry = this.chosenFullname
                    this.$store.commit('setChosenCountry', this.selectedCountry)
                } else if (this.selectedFullname === this.selectedRegdate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedRegdate = this.chosenFullname
                    this.$store.commit('setChosenRegdate', this.selectedRegdate)
                } else if (this.selectedFullname === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {fullname: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.fullname})['fullname'];
                    Object.assign(e, {fullname: o.fullname});
                    this.selectedDeposit = this.chosenFullname
                    this.$store.commit('setChosenDeposit', this.selectedDeposit)
                }
            })
            this.$store.commit('setChosenFullname', this.selectedFullname)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        emailReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.requiredFieldsDictionary[3].some(el => e.hasOwnProperty(el))) {
                    if (this.selectedEmail === 'email') return
                    delete Object.assign(e, {email: e[this.selectedEmail]})[this.selectedEmail];
                } else if (this.selectedEmail === this.chosenEmail) {
                    return
                } else if (this.selectedEmail === this.selectedFirstname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedFirstname = this.chosenEmail
                    this.$store.commit('setChosenFirstname', this.selectedFirstname)
                } else if (this.selectedEmail === this.selectedLastname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedLastname = this.chosenEmail
                    this.$store.commit('setChosenLastname', this.selectedLastname)
                } else if (this.selectedEmail === this.selectedFullname) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedFullname = this.chosenEmail
                    this.$store.commit('setChosenFullname', this.selectedFullname)
                } else if (this.selectedEmail === this.selectedPhone) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedPhone = this.chosenEmail
                    this.$store.commit('setChosenPhone', this.selectedPhone)
                } else if (this.selectedEmail === this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.country})['country'];
                    delete Object.assign(e, {country: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedCountry = this.chosenEmail
                    this.$store.commit('setChosenCountry', this.selectedCountry)
                } else if (this.selectedEmail === this.selectedRegdate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedRegdate = this.chosenEmail
                    this.$store.commit('setChosenRegdate', this.selectedRegdate)
                } else if (this.selectedEmail === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {email: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.email})['email'];
                    Object.assign(e, {email: o.email});
                    this.selectedDeposit = this.chosenEmail
                    this.$store.commit('setChosenDeposit', this.selectedDeposit)
                }
            })
            this.$store.commit('setChosenEmail', this.selectedEmail)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        phoneNumberReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.requiredFieldsDictionary[4].some(el => e.hasOwnProperty(el))) {
                    if (this.selectedPhone === 'phone') return
                    delete Object.assign(e, {phone: e[this.selectedPhone]})[this.selectedPhone];
                } else if (this.selectedPhone === this.chosenPhone) {
                    return
                } else if (this.selectedPhone === this.selectedFirstname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedFirstname = this.chosenPhone
                    this.$store.commit('setChosenFirstname', this.selectedFirstname)
                } else if (this.selectedPhone === this.selectedLastname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedLastname = this.chosenPhone
                    this.$store.commit('setChosenLastname', this.selectedLastname)
                } else if (this.selectedPhone === this.selectedFullname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedFullname = this.chosenPhone
                    this.$store.commit('setChosenFullname', this.selectedFullname)
                } else if (this.selectedPhone === this.selectedEmail) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.email})['email'];
                    delete Object.assign(e, {email: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedEmail = this.chosenPhone
                    this.$store.commit('setChosenEmail', this.selectedEmail)
                } else if (this.selectedPhone === this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.country})['country'];
                    delete Object.assign(e, {country: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedCountry = this.chosenPhone
                    this.$store.commit('setChosenCountry', this.selectedCountry)
                } else if (this.selectedPhone === this.selectedRegdate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedRegdate = this.chosenPhone
                    this.$store.commit('setChosenRegdate', this.selectedRegdate)
                } else if (this.selectedPhone === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {phone: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.phone})['phone'];
                    Object.assign(e, {phone: o.phone});
                    this.selectedDeposit = this.chosenPhone
                    this.$store.commit('setChosenDeposit', this.selectedDeposit)
                }
            })
            this.$store.commit('setChosenPhone', this.selectedPhone)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        countryReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.requiredFieldsDictionary[5].some(el => e.hasOwnProperty(el))) {
                    if (this.selectedCountry === 'country') return
                    delete Object.assign(e, {country: e[this.selectedCountry]})[this.selectedCountry];
                } else if (this.selectedCountry === this.chosenCountry) {
                    return
                } else if (this.selectedCountry === this.selectedFirstname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedFirstname = this.chosenCountry
                    this.$store.commit('setChosenFirstname', this.selectedFirstname)
                } else if (this.selectedCountry === this.selectedLastname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedLastname = this.chosenCountry
                    this.$store.commit('setChosenLastname', this.selectedLastname)
                } else if (this.selectedCountry === this.selectedFullname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedFullname = this.chosenCountry
                    this.$store.commit('setChosenFullname', this.selectedFullname)
                } else if (this.selectedCountry === this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.email})['email'];
                    delete Object.assign(e, {email: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedEmail = this.chosenCountry
                    this.$store.commit('setChosenEmail', this.selectedEmail)
                } else if (this.selectedCountry === this.selectedPhone) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedPhone = this.chosenCountry
                    this.$store.commit('setChosenPhone', this.selectedPhone)
                } else if (this.selectedCountry === this.selectedRegdate) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedRegdate = this.chosenCountry
                    this.$store.commit('setChosenRegdate', this.selectedRegdate)
                } else if (this.selectedCountry === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {country: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.country})['country'];
                    Object.assign(e, {country: o.country});
                    this.selectedDeposit = this.chosenCountry
                    this.$store.commit('setChosenDeposit', this.selectedDeposit)
                }
            })
            this.$store.commit('setChosenCountry', this.selectedCountry)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        registrationDateReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.requiredFieldsDictionary[6].some(el => e.hasOwnProperty(el))) {
                    if (this.selectedRegdate === 'regdate') return
                    delete Object.assign(e, {regdate: e[this.selectedRegdate]})[this.selectedRegdate];
                } else if (this.selectedRegdate === this.chosenRegdate) {
                    return
                } else if (this.selectedRegdate === this.selectedFirstname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedFirstname = this.chosenRegdate
                    this.$store.commit('setChosenFirstname', this.selectedFirstname)
                } else if (this.selectedRegdate === this.selectedLastname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedLastname = this.chosenRegdate
                    this.$store.commit('setChosenLastname', this.selectedLastname)
                } else if (this.selectedRegdate === this.selectedFullname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedFullname = this.chosenRegdate
                    this.$store.commit('setChosenFullname', this.selectedFullname)
                } else if (this.selectedRegdate === this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.email})['email'];
                    delete Object.assign(e, {email: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedEmail = this.chosenRegdate
                    this.$store.commit('setChosenEmail', this.selectedEmail)
                } else if (this.selectedRegdate === this.selectedPhone) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedPhone = this.chosenRegdate
                    this.$store.commit('setChosenPhone', this.selectedPhone)
                } else if (this.selectedRegdate === this.selectedCountry) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.country})['country'];
                    delete Object.assign(e, {country: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedCountry = this.chosenRegdate
                    this.$store.commit('setChosenCountry', this.selectedCountry)
                } else if (this.selectedRegdate === this.selectedDeposit) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {regdate: e.deposit})['deposit'];
                    delete Object.assign(e, {deposit: e.regdate})['regdate'];
                    Object.assign(e, {regdate: o.regdate});
                    this.selectedDeposit = this.chosenRegdate
                    this.$store.commit('setChosenDeposit', this.selectedDeposit)
                }
            })
            this.$store.commit('setChosenRegdate', this.selectedRegdate)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        depositReplacer() {
            Vue.prototype.$fullObject.data.forEach(e => {
                if (!this.requiredFieldsDictionary[7].some(el => e.hasOwnProperty(el))) {
                    if (this.selectedDeposit === 'deposit') return
                    delete Object.assign(e, {deposit: e[this.selectedDeposit]})[this.selectedDeposit];
                } else if (this.selectedDeposit === this.chosenDeposit) {
                    return
                } else if (this.selectedDeposit === this.selectedFirstname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.firstname})['firstname'];
                    delete Object.assign(e, {firstname: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedFirstname = this.chosenRegdate
                    this.$store.commit('setChosenFirstname', this.selectedFirstname)
                } else if (this.selectedDeposit === this.selectedLastname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.lastname})['lastname'];
                    delete Object.assign(e, {lastname: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedLastname = this.chosenRegdate
                    this.$store.commit('setChosenLastname', this.selectedLastname)
                } else if (this.selectedDeposit === this.selectedFullname) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.fullname})['fullname'];
                    delete Object.assign(e, {fullname: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedFullname = this.chosenRegdate
                    this.$store.commit('setChosenFullname', this.selectedFullname)
                } else if (this.selectedDeposit === this.selectedEmail) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.email})['email'];
                    delete Object.assign(e, {email: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedEmail = this.chosenRegdate
                    this.$store.commit('setChosenEmail', this.selectedEmail)
                } else if (this.selectedDeposit === this.selectedPhone) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.phone})['phone'];
                    delete Object.assign(e, {phone: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedPhone = this.chosenRegdate
                    this.$store.commit('setChosenPhone', this.selectedPhone)
                } else if (this.selectedDeposit === this.selectedCountry) {

                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.country})['country'];
                    delete Object.assign(e, {country: e.deposit})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedCountry = this.chosenRegdate
                    this.$store.commit('setChosenCountry', this.selectedCountry)
                } else if (this.selectedDeposit === this.selectedRegdate) {
                    //
                    const o = JSON.parse(JSON.stringify(e))
                    delete Object.assign(o, {deposit: e.regdate})['regdate'];
                    delete Object.assign(e, {regdate: e.d})['deposit'];
                    Object.assign(e, {deposit: o.deposit});
                    this.selectedDeposit = this.chosenRegdate
                    this.$store.commit('setChosenDeposit', this.selectedDeposit)
                }
            })
            this.$store.commit('setChosenDeposit', this.selectedDeposit)
            console.log(Vue.prototype?.$fullObject?.data)
        },
        //todo: refactor in one function

        // replacer(dropdownIndex, initialKey, validKey) {
        //     dropdown, value1, value2
        //     const o = JSON.parse(JSON.stringify(e))
        //     delete Object.assign(o, {firstname: e.lastname})['lastname'];
        //     delete Object.assign(e, {lastname: e.firstname})['firstname'];
        //     Object.assign(e, {firstname: o.firstname});
        //     this.selectedLastName = this.chosenFirstname
        //     this.$store.commit('setChosenLastName', this.selectedLastName)
        //
        //     switch (dropdown) {
        //         case '123':
        //             this.customHandler();
        //             break;
        //         case '456':
        //             // ...
        //             break;
        // },
        // customHandler() {
        //     if (!this.requiredFieldsDictionary.includes(this.selectedFirstName)) {
        //         if (!Object.values(e).filter((el) => el).every((e, i, a) => a.indexOf(e) === i)) {
        //             Object.assign(e, {firstname: e[this.selectedFirstName]})[this.selectedFirstName]
        //         }
        //         const o = JSON.parse(JSON.stringify(e))
        //         // o[this.selectedFirstName] = o['firstname']
        //         !o['firstname'] ? o[this.chosenFirstname] = o['firstname'] : o[this.selectedFirstName] = o['firstname']
        //         Object.assign(e, {firstname: e[this.selectedFirstName]})[this.selectedFirstName]
        //         Object.assign(e, {[this.selectedFirstName]: o[this.selectedFirstName]})[this.selectedFirstName]
        //     } else {
        //         const o = JSON.parse(JSON.stringify(e))
        //         o[this.selectedFirstName] = o['firstname']
        //         Object.assign(e, {firstname: e[this.selectedFirstName]})[this.selectedFirstName]
        //         Object.assign(e, {[this.selectedFirstName]: o[this.selectedFirstName]})[this.selectedFirstName]
        //     }
        // }
    },
    computed: {
        ...
            mapGetters(['parsedFields',
                "chosenFirstname",
                "chosenLastname",
                "chosenFullname",
                "chosenEmail",
                "chosenPhone",
                'chosenCountry',
                "chosenRegdate",
                "chosenDeposit",
            ]),
    }
    ,
}
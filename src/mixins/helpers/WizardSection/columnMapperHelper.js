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
            checkedCountry: '',
            checkedRegDate: '',
            registrationDate: new Date(),
            emptyDateSetter: null,
            requiredFieldsDictionary: [
                ["firstname", "name", "fname", "first_name"],
                ["lastname", "last", "last name", "lname"],
                ["fullname", "full_name"],
                ["email", "mail", "e-mail"],
                ["phone", "mobile phone", "phone number",
                    "mobile", "main number", "main phone",
                    "phone_number", "mobile_phone"],
                ["country", "countryid", "geo", "country_id", "country_code"],
                ["regdate", "reg date", "reg_date", "registration_date", "registered", "registered_at"],
            ],
            sortedParsedFields: [],
            sortedDropdownIndexes: [],
        }
    },
    methods: {
        dropdownCb(index) {
            const i = this.requiredFieldsDictionary[index][0]

            Vue.prototype.$fullObject.data.forEach((el, index) => {
                Object.assign(el, {[i]: Vue.prototype.$dirtyObject[index][this[`selected${i[0].toUpperCase() + i.slice(1)}`]]})
            })
            this.$store.commit(`setChosen${i[0].toUpperCase() + i.slice(1)}`, this[`selected${i[0].toUpperCase() + i.slice(1)}`])
            console.log(Vue.prototype.$fullObject.data)
        },
        startCheck() {
            this.sortParsedFields()
            this.sortedParsedFields.forEach((el, i) => {
                    const cb = (num) => this.requiredFieldsDictionary[i + num].includes(el)
                        ? this.requiredFieldsDictionary[i + num][0]
                        : cb(num + 1)

                    const result = {
                        initialKey: el,
                        validKey: this.requiredFieldsDictionary[i].includes(el) ? this.requiredFieldsDictionary[i][0] : cb(1),
                    }
                    Vue.prototype.$fullObject.data.forEach(element => {
                        if (result.initialKey !== result.validKey) {
                            Object.assign(element, {[result.validKey]: element[result.initialKey]})[result.initialKey];
                        }
                    })
                    if (result.validKey) {
                        this[`selected${result.validKey[0].toUpperCase() + result.validKey.slice(1)}`] = result.initialKey
                        this.$store.commit(`setChosen${result.validKey[0].toUpperCase() + result.validKey.slice(1)}`, result.initialKey)
                    }
                    // console.log(result)
                }
            )
            Vue.prototype.$dirtyObject = JSON.parse(JSON.stringify(Vue.prototype.$fullObject.data))
        },
        sortParsedFields() {
            for (let i = 0; i < this.requiredFieldsDictionary.length; i++) {
                this.parsedFields.filter(el => {
                    if (this.requiredFieldsDictionary[i].includes(el)) {
                        this.sortedParsedFields.push(el)
                        this.sortedDropdownIndexes.push(i)
                    }
                })
            }
        },
    },
    computed: {
        ...mapGetters([
            'parsedFields',
            "chosenFirstname",
            "chosenLastname",
            "chosenFullname",
            "chosenEmail",
            "chosenPhone",
            'chosenCountry',
            "chosenRegdate",
        ]),
    }
}
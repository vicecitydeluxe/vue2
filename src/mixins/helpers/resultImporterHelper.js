// noinspection ES6UnusedImports
import Vue from "vue";
import {ParseError, parsePhoneNumber} from "libphonenumber-js";
import {parsePhoneNumberFromString as parseMax} from "libphonenumber-js/min";
import {mapActions, mapGetters} from "vuex";

export default {
    data() {
        return {
            todayDate: new Date().toLocaleDateString("ru-RU", {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            privateColumns: [
                {field: 'description', header: 'Stat'},
                {field: 'value', header: '#'},
            ],
            privateResults: [
                {description: 'Records in source file', value: ''},
                {description: 'Fully valid leads (would be imported)', value: ''},
                {description: 'Cannot parse line view lines', value: ''},
                {description: 'Invalid leads view'},
                {description: '-missing or invalid email', value: ''},
                {description: '-missing or invalid number', value: ''},
                {description: '-missing name/lastname/fullname', value: ''},
            ],
            publicColumns: [
                {field: 'description', header: "Leads' age"},
                {field: 'value', header: '#'},
            ],
            publicResults: [
                {description: 'Less 24 hours', value: '15'},
                {description: 'Less than a week', value: '30'},
                {description: 'less than a month', value: '40'},
                {description: 'Over a month', value: '100'},
                {description: 'Up to 3 months', value: '150'},
                {description: 'more than 3 months', value: '760'},
                {description: 'Unknown', value: '15'},
            ],
            uniqueColumns: [
                {field: 'description', header: "Across marketplace"},
                {field: 'value', header: '#'},
            ],
            uniqueResults: [
                {description: 'Fully unique leads', value: '150'},
                {description: 'Partially unique leads', value: '550'},
                {description: 'Duplicate leads', value: '800'},
            ],
            invalidParsedLinesIndexes: [],
            fullDuplicatesIndexes: [],
            partialDuplicatesIndexes: [],
        }
    },
    methods: {
        firsNameInvalidCounter() {
            if (this.chosenFirstName) {
                this.privateResults[6].value = this.invalidFirstName.length

                Vue.prototype?.$fullObject?.data.map((el, i) => {
                    let element = Vue.prototype?.$fullObject?.data[i][this.chosenFirstName]

                    if (element) {
                        this.$store.commit('pushValidFirstName', element)
                    } else if (!element) {
                        this.invalidParsedLinesIndexes.push(i)
                        this.$store.commit('pushInvalidFirstName', element)
                        this.privateResults[6].value = this.invalidFirstName.length
                    }
                })
            }
        },
        lastNameInvalidCounter() {
            if (this.chosenLastName) {
                this.privateResults[6].value = this.invalidLastName.length

                Vue.prototype?.$fullObject?.data.map((el, i) => {
                    let element = Vue.prototype?.$fullObject?.data[i][this.chosenLastName]

                    if (element) {
                        this.$store.commit('pushValidLastName', element)
                    } else if (!element) {
                        /**
                         * Function invokes after firsNameInvalidCounter(),
                         * and if there exist duplicated indexes with
                         * invalid data, it skips them
                         */
                        if (this.invalidParsedLinesIndexes.includes(i)) return
                        this.invalidParsedLinesIndexes.push(i)
                        this.$store.commit('pushInvalidLastName', element)
                        this.privateResults[6].value = this.invalidLastName.length + this.invalidFirstName.length
                    }
                })
            }
        },
        fullNameInvalidCounter() {
            if (this.chosenFullName) {
                this.privateResults[6].value = this.invalidFullName.length

                Vue.prototype?.$fullObject?.data.map((el, i) => {
                    let element = Vue.prototype?.$fullObject?.data[i][this.chosenFullName]

                    if (element) {
                        this.$store.commit('pushValidFullName', element)
                    } else if (!element) {
                        this.invalidParsedLinesIndexes.push(i)
                        this.$store.commit('pushInvalidFullName', element)
                        this.privateResults[6].value = this.invalidFullName.length
                    }
                })
            }
        },
        emailInvalidCounter() {
            this.privateResults[4].value = this.invalidEmail.length

            if (this.chosenEmail) {
                Vue.prototype?.$fullObject?.data.map((el, i) => {
                    let element = Vue.prototype?.$fullObject?.data[i][this.chosenEmail]
                    const regex = new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g)

                    if (regex.test(element)) {
                        this.$store.commit('pushValidEmail', element)
                    } else {
                        this.invalidParsedLinesIndexes.push(i)
                        this.$store.commit('pushInvalidEmail', element)
                        this.privateResults[4].value = this.invalidEmail.length
                    }
                })
            }
        },
        phoneInvalidCounter() {
            this.privateResults[5].value = this.invalidPhone.length

            if (this.chosenPhone) {
                Vue.prototype?.$fullObject?.data.map((el, i) => {
                    let element = Vue.prototype?.$fullObject?.data[i][this.chosenPhone]

                    try {
                        parsePhoneNumber(element).isValid()
                    } catch (error) {
                        if (error instanceof ParseError) {
                            this.invalidParsedLinesIndexes.push(i)
                            this.$store.commit('pushInvalidPhone', element)
                            this.privateResults[5].value = this.invalidPhone.length
                            // console.log(error.message)
                            return
                        } else throw error
                    }

                    if (parseMax(element).isValid()) {
                        this.$store.commit('pushValidPhone', element)
                    } else {
                        this.invalidParsedLinesIndexes.push(i)
                        this.$store.commit('pushInvalidPhone', element)
                        this.privateResults[5].value = this.invalidPhone.length
                    }
                })
            }
        },
        countersInvoker() {
            this.emailInvalidCounter()
            this.phoneInvalidCounter()
            this.firsNameInvalidCounter()
            this.lastNameInvalidCounter()
            this.fullNameInvalidCounter()
            this.invalidParsedLinesIndexes = [...new Set(this.invalidParsedLinesIndexes)]
        },
        showFullInfoToast() {
            if (this.fullDuplicatesIndexes.length > 0) {
                this.$toast.add({
                    severity: 'info',
                    summary: 'Info message',
                    detail: 'Full duplicates was removed from the list!',
                    life: 2000
                });
            } else {
                this.$toast.add({
                    severity: 'info',
                    summary: 'Info message',
                    detail: 'No duplicates in the list!',
                    life: 2000
                });
            }
        },
        showPartialInfoToast() {
            if (this.partialDuplicatesIndexes.length > 0) {
                this.$toast.add({
                    severity: 'info',
                    summary: 'Info message',
                    detail: 'Partial duplicates was removed from the list!!',
                    life: 2000
                });
            } else {
                this.$toast.add({
                    severity: 'info',
                    summary: 'Info message',
                    detail: 'No duplicates in the list!',
                    life: 2000
                });
            }
        },
    },
    computed: {
        ...mapGetters(['listName', 'fileName', 'parsedListLength',

            "vertical", 'funnelType', 'validLeadsAmount', 'uploadDate',
            'listStatusBeforeUpload',

            "chosenFirstName", "chosenLastName", "chosenFullName",
            "chosenEmail", "chosenPhone", 'chosenRegDate',

            "invalidPhone", 'invalidEmail', "invalidFirstName",
            "invalidLastName", "invalidFullName"]),
        ...mapActions((['eraseInvoker']))
    },
}
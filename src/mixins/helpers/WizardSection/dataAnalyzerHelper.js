// noinspection ES6UnusedImports
import Vue from "vue";
import {mapActions, mapGetters} from "vuex";
import Papa from "papaparse";
import {ParseError, parsePhoneNumber} from "libphonenumber-js";
import {parsePhoneNumberFromString as parseMax} from "libphonenumber-js/min";

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
            invalidParsedLinesIndexes: [],
            fullDuplicatesIndexes: [],
            partialDuplicatesIndexes: [],
        }
    },
    methods: {
        firsNameInvalidCounter() {
            if (this.chosenFirstname) {
                this.privateResults[6].value = this.invalidFirstName.length

                Vue.prototype?.$fullObject?.data.map((el, i) => {
                    let element = Vue.prototype?.$fullObject?.data[i]['firstname']

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
            if (this.chosenLastname) {
                this.privateResults[6].value = this.invalidLastName.length

                Vue.prototype?.$fullObject?.data.map((el, i) => {
                    let element = Vue.prototype?.$fullObject?.data[i]['lastname']

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
            if (this.chosenFullname) {
                this.privateResults[6].value = this.invalidFullName.length

                Vue.prototype?.$fullObject?.data.map((el, i) => {
                    let element = Vue.prototype?.$fullObject?.data[i]['fullname']

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
                    let element = Vue.prototype?.$fullObject?.data[i]['email']
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
                    let element = Vue.prototype?.$fullObject?.data[i]['phone']

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
        getFullDuplicates() {
            const helpMap = new Map();
            Vue.prototype.$fullDuplicates = [];
            if (!!Vue.prototype?.$fullObject?.data) {
                Vue.prototype?.$fullObject?.data.map((element, index) => {
                    if (helpMap.has(element['email'])) {
                        const existingElement = helpMap.get(element['email']);

                        if (element['phone'] === existingElement) {
                            Vue.prototype.$fullDuplicates.push(element);
                            this.fullDuplicatesIndexes.push(index)
                        }
                    } else {
                        helpMap.set(element['email'], element['phone']);
                    }
                });
            }
        },
        getPartialDuplicates() {
            const helpMap = new Map();
            /**
             * $partialDuplicates & $fullDuplicatesRemoved
             * are helper array to store
             * lines to remove later if needed
             */
            Vue.prototype.$partialDuplicates = []
            if (!!Vue.prototype?.$fullObject?.data) {
                Vue.prototype?.$fullObject?.data.map((element, index) => {
                    if (helpMap.has(element['email'])) {
                        const existingElement = helpMap.get(element['email']);

                        if (element['phone'] !== existingElement) {
                            Vue.prototype.$partialDuplicates.push(element);
                            this.partialDuplicatesIndexes.push(index)
                        }
                    } else {
                        helpMap.set(element['email'], element['phone']);
                    }
                });
            }
        },
        // removeFullDuplicates() {
        //     Vue.prototype.$fullDuplicatesRemoved = Vue.prototype?.$fullObject?.data.filter((el, i) => {
        //         if (!this.fullDuplicatesIndexes.includes(i)) return el
        //     })
        //     this.privateResults[1].value = Vue.prototype.$fullDuplicatesRemoved.length
        //     this.fullDuplicatesIndexes = []
        //     console.log(Vue.prototype.$fullDuplicatesRemoved)
        //     // this.showFullInfoToast()
        // },
        // removePartialDuplicates() {
        //     Vue.prototype.$partialDuplicatesRemoved = Vue.prototype?.$fullObject?.data.filter((el, i) => {
        //         if (!this.partialDuplicatesIndexes.includes(i)) return el
        //     })
        //     this.privateResults[1].value = Vue.prototype.$partialDuplicatesRemoved.length
        //     this.partialDuplicatesIndexes = []
        //     console.log(Vue.prototype.$partialDuplicatesRemoved)
        //     // this.showPartialInfoToast()
        // },
        downloadInvalidLeads() {
            return new Promise((resolve) => {
                /**
                 * $parsedDocument non-reactive helper-object to create a file
                 * user could download and see wrong lines
                 */
                Vue.prototype.$parsedDocument = Papa.unparse(Object.assign({
                    'fields': Object.keys(Vue.prototype?.$invalidObject[0]),
                    'data': Vue.prototype?.$invalidObject.map((el) => Object.values(el))
                }))
                resolve(Vue.prototype.$parsedDocument)
            }).then(result => {
                const download = function (result) {
                    const blob = new Blob([result], {type: 'text/csv'});
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.setAttribute('href', url)
                    a.setAttribute('download', 'invalid_leads.csv');
                    a.click()
                }
                download(result)
            })
        },
        // requests
        sendParsedList() {
            let obj = []
            /**
             * $fullDuplicatesRemoved or $partialDuplicatesRemoved
             * non-reactive helper-objects
             * if any of them exist would send as a payload later
             */
            if (!!Vue.prototype?.$fullDuplicatesRemoved?.length) {
                obj = Vue.prototype?.$fullDuplicatesRemoved
            } else if (!!Vue.prototype?.$partialDuplicatesRemoved?.length) {
                obj = Vue.prototype?.$partialDuplicatesRemoved
            } else if (!!Vue.prototype?.$fullObject?.data) {
                obj = Vue.prototype?.$fullObject?.data
            }

            this.$store.dispatch('SEND_PARSED_LEADS',
                {name: this.listNameLocal, file_name: this.fileNameLocal, object: obj})
                .then(() => {
                    // console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        sendStatistics() {
            const obj = {
                name: this.listName,
                file_name: this.fileName,
                full_records: this.parsedListLength,
                valid_leads: this.privateResults[1]?.value,
                unable_to_parse: this.privateResults[2]?.value,
                invalid_emails: this.privateResults[4]?.value,
                invalid_phones: this.privateResults[5]?.value,
                invalid_names: this.privateResults[6]?.value,
            }
            this.$store.dispatch('SEND_STATS', obj)
                .then(() => {
                    // console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        sendUploadStatus() {
            /**
             * Values below taken from getters in mixin-helper
             */
            const obj = {
                name: this.listName,
                filename: this.filename,
                vertical: this.vertical,
                funnel_type: this.funnelType,
                type: 'Unknown',
                valid_leads_amount: this.privateResults[1]?.value,
                upload_date: this.todayDate,
                status: this.listStatusBeforeUpload
            }
            this.$store.dispatch('SEND_UPLOAD_STATUS', obj)
                .then(() => {
                    this.sendStatistics()
                    // console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getStats() {
            this.$store.dispatch('GET_STATS')
                .then((res) => {
                    let obj = res.data.data[res.data.data.length - 1]
                    this.listNameLocal = obj?.name || 'Unknown_list'
                    this.fileNameLocal = obj?.fileName || 'Unknown_file'
                    this.privateResults[0].value = obj?.fullRecords || ''
                    this.privateResults[1].value = obj?.validLeads || ''
                    this.privateResults[2].value = obj?.unableToParse || ''
                    this.privateResults[4].value = obj?.invalidEmails || ''
                    this.privateResults[5].value = obj?.invalidPhones || ''
                    this.privateResults[6].value = obj?.invalidNames || ''
                    this.$toast.add({
                        group: 'key',
                        severity: 'info',
                        summary: 'Info message',
                        detail: 'Last added file stats retrived',
                        life: 2000
                    });
                })
                .catch((err) => {
                    console.log(err)
                    this.$toast.add({
                        severity: 'warn',
                        summary: 'Warn message',
                        detail: 'Server error, please try again later',
                        life: 2000
                    });
                })
        }
    },
    computed: {
        ...mapGetters(['listName', 'fileName', 'parsedListLength',

            "vertical", 'funnelType', 'validLeadsAmount', 'uploadDate',
            'listStatusBeforeUpload',

            "chosenFirstname", "chosenLastname", "chosenFullname",
            "chosenEmail", "chosenPhone", 'chosenRegdate',

            "invalidPhone", 'invalidEmail', "invalidFirstName",
            "invalidLastName", "invalidFullName"]),
        ...mapActions((['eraseInvoker']))
    },
}
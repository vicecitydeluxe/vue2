// noinspection ES6UnusedImports
import Vue from "vue";
import {mapGetters} from "vuex";
import Papa from "papaparse";
import {isValidPhoneNumber} from 'libphonenumber-js'

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
                {description: 'Records in source file', value: null},
                {description: 'Fully valid leads (would be imported)', value: null},
                {description: 'Cannot parse line view lines', value: null},
                {description: 'Invalid leads view'},
                {description: '-missing or invalid email', value: null},
                {description: '-missing or invalid number', value: null},
                {description: '-missing name/lastname/fullname', value: null},
            ],
            invalidParsedLinesIndexes: [],
            fullDuplicatesIndexes: [],
            partialDuplicatesIndexes: [],
        }
    },
    methods: {
        invalidCounter(condition, staticHeader, index, regExp, cb) {
            if (condition) {
                let invalid = 0
                let indexes = []
                Vue.prototype?.$fullObject?.data.map((el, i) => {
                    const element = Vue.prototype?.$fullObject?.data[i][staticHeader]
                    const regex = new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g)
                    if (!element) {
                        if (this.invalidParsedLinesIndexes.includes(i)) return
                        invalid++
                        indexes.push(i)
                    } else if (regExp && !regex.test(element)) {
                        indexes.push(i)
                        invalid++
                    } else if (cb && !cb(element)) {
                        indexes.push(i)
                        invalid++
                    }
                })
                this.invalidParsedLinesIndexes = [...this.invalidParsedLinesIndexes, ...indexes]
                this.privateResults[index].value += invalid
            }
        },
        countersInvoker() {
            this.invalidCounter(this.chosenFirstname, 'firstname', 6)
            this.invalidCounter(this.chosenLastname, 'lastname', 6)
            this.invalidCounter(this.chosenFullname, 'fullname', 6)
            this.invalidCounter(this.chosenEmail, 'email', 4, true)
            this.invalidCounter(this.chosenPhone, 'phone', 5, false, isValidPhoneNumber)
            this.invalidParsedLinesIndexes = [...new Set(this.invalidParsedLinesIndexes)]
        },
        // getFullDuplicates() {
        //     const helpMap = new Map();
        //     Vue.prototype.$fullDuplicates = [];
        //     if (!!Vue.prototype?.$fullObject?.data) {
        //         Vue.prototype?.$fullObject?.data.map((element, index) => {
        //             if (helpMap.has(element['email'])) {
        //                 const existingElement = helpMap.get(element['email']);
        //
        //                 if (element['phone'] === existingElement) {
        //                     Vue.prototype.$fullDuplicates.push(element);
        //                     this.fullDuplicatesIndexes.push(index)
        //                 }
        //             } else {
        //                 helpMap.set(element['email'], element['phone']);
        //             }
        //         });
        //     }
        // },
        // getPartialDuplicates() {
        //     const helpMap = new Map();
        //     /**
        //      * $partialDuplicates & $fullDuplicatesRemoved
        //      * are helper array to store
        //      * lines to remove later if needed
        //      */
        //     Vue.prototype.$partialDuplicates = []
        //     if (!!Vue.prototype?.$fullObject?.data) {
        //         Vue.prototype?.$fullObject?.data.map((element, index) => {
        //             if (helpMap.has(element['email'])) {
        //                 const existingElement = helpMap.get(element['email']);
        //
        //                 if (element['phone'] !== existingElement) {
        //                     Vue.prototype.$partialDuplicates.push(element);
        //                     this.partialDuplicatesIndexes.push(index)
        //                 }
        //             } else {
        //                 helpMap.set(element['email'], element['phone']);
        //             }
        //         });
        //     }
        // },
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
            return new Promise(resolve => {
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
        sendData() {
            let obj = []
            /**
             * $fullDuplicatesRemoved or $partialDuplicatesRemoved
             * non-reactive helper-objects
             * if any of them exist would send as a payload later
             */
            // if (!!Vue.prototype?.$fullDuplicatesRemoved?.length) {
            //     obj = Vue.prototype?.$fullDuplicatesRemoved
            // } else if (!!Vue.prototype?.$partialDuplicatesRemoved?.length) {
            //     obj = Vue.prototype?.$partialDuplicatesRemoved
            // } else if (!!Vue.prototype?.$fullObject?.data) {
            //     obj = Vue.prototype?.$fullObject?.data
            // }
            obj = Vue.prototype?.$fullObject?.data

            const firstRequest = this.$store.dispatch('SEND_PARSED_LEADS',
                {name: this.listNameLocal, file_name: this.fileNameLocal, object: obj})
                .catch(err => console.log(err))

            const objStatus = {
                name: this.listName,
                filename: this.filename,
                vertical: this.vertical,
                funnel_type: this.funnelType,
                type: 'Unknown',
                valid_leads_amount: this.privateResults[1]?.value,
                upload_date: this.todayDate,
                status: this.listStatusBeforeUpload
            }

            const secondRequest = this.$store.dispatch('SEND_UPLOAD_STATUS', objStatus)
                .catch(err => console.log(err))

            const objStat = {
                name: this.listName,
                file_name: this.fileName,
                full_records: this.parsedListLength,
                valid_leads: this.privateResults[1]?.value,
                unable_to_parse: this.privateResults[2]?.value,
                invalid_emails: this.privateResults[4]?.value,
                invalid_phones: this.privateResults[5]?.value,
                invalid_names: this.privateResults[6]?.value,
            }

            const thirdRequest = this.$store.dispatch('SEND_STATS', objStat)
                .catch(err => console.log(err))

            const arr = [firstRequest, secondRequest, thirdRequest]

            Promise.allSettled(arr)
                .then(res => console.log(res))
                .catch(err => console.log(err))

        },
        getStats() {
            this.$store.dispatch('GET_STATS')
                .then(res => {
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
                .catch(err => {
                    console.log(err)
                    this.$toast.add({
                        severity: 'warn',
                        summary: 'Warn message',
                        detail: 'Server error, please try again later',
                        life: 2000
                    });
                })
        },
        switchHandler() {
            document.querySelectorAll('.p-column-title')
                .forEach(e => e.classList.replace('p-column-title', 'p-column-title-dark'))
            document.querySelectorAll('.description').forEach(e => e.classList.add('description_dark'))
            document.querySelectorAll('.description_divider').forEach(e => e.classList.add('description_divider_dark'))
        },
        switchRemover() {
            document.querySelectorAll('.p-column-title-dark')
                .forEach(e => e.classList.replace('p-column-title-dark', 'p-column-title'))
            document.querySelectorAll('.description_dark').forEach(e => e.classList.remove('description_dark'))
            document.querySelectorAll('.description_divider').forEach(e => e.classList.remove('description_divider_dark'))
        },
    },
    computed: {
        ...mapGetters(['listName', 'fileName', 'parsedListLength',

            "vertical", 'funnelType', 'validLeadsAmount', 'uploadDate',
            'listStatusBeforeUpload',

            "chosenFirstname", "chosenLastname", "chosenFullname",
            "chosenEmail", "chosenPhone", 'chosenRegdate',
        ])
    },
}
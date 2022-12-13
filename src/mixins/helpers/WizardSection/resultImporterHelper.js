// noinspection ES6UnusedImports
import Vue from "vue";
import {mapGetters} from "vuex";
import moment from "moment/moment";

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
            publicColumns: [
                {field: 'description', header: "Leads' age"},
                {field: 'value', header: '#'},
            ],
            publicResults: [
                {description: 'Less 24 hours', value: ''},
                {description: 'Less than a week', value: ''},
                {description: 'Less than a month', value: ''},
                {description: 'Over a month', value: ''},
                {description: 'Up to 3 months', value: ''},
                {description: 'More than 3 months', value: ''},
                {description: 'Future day, invalid', value: ''},
                {description: 'Unknown', value: ''},
            ],
            uniqueColumns: [
                {field: 'description', header: "Across marketplace"},
                {field: 'value', header: '#'},
            ],
            uniqueResults: [
                {description: 'Fully unique leads', value: ''},
                {description: 'Partially unique leads', value: ''},
                {description: 'Duplicate leads', value: ''},
            ],
            betweenDay: [],
            betweenWeek: [],
            betweenMonth: [],
            betweenOneTwoMonths: [],
            betweenTwoThreeMonths: [],
            overThreeMonths: [],
            futureDateErrors: [],
            unknownDateFormat: []
        }
    },
    methods: {
        dateChecker() {
            if (this.chosenRegdate) {
                //todo: try to guess format & keep it or it should be static?
                //console.log(moment(a, ['DDMMMMY', 'MMMMDDY', 'MM/DD/YYYY HH:mm:ss.SSS']).isValid())
                const u = undefined
                const dayBefore = moment().subtract(1, 'd')
                const weekBefore = moment().subtract(1, 'week')
                const monthBefore = moment().subtract(1, 'month')
                const twoMonthBefore = moment().subtract(2, 'month')
                const threeMonthBefore = moment().subtract(3, 'month')
                const year = moment().subtract(1, 'year')
                //  specify format, default is non-EU;
                const format = 'MM.DD.YYYY'

                Vue.prototype?.$fullObject?.data.map(el => {
                    const elem = el['regdate']

                    if (!moment(elem, format).isValid()) {
                        this.unknownDateFormat.push(elem)
                    } else if (moment(elem, format).isBetween(dayBefore, u)) {
                        this.betweenDay.push(elem)
                    } else if (moment(elem, format).isBetween(weekBefore, u)) {
                        this.betweenWeek.push(elem)
                    } else if (moment(elem, format).isBetween(monthBefore, weekBefore)) {
                        this.betweenMonth.push(elem)
                    } else if (moment(elem, format).isBetween(twoMonthBefore, monthBefore)) {
                        this.betweenOneTwoMonths.push(elem)
                    } else if (moment(elem, format).isBetween(threeMonthBefore, twoMonthBefore)) {
                        this.betweenTwoThreeMonths.push(elem)
                    } else if (moment(elem, format).isBetween(year, threeMonthBefore)) {
                        this.overThreeMonths.push(elem)
                    } else if (moment(elem, format).isAfter()) {
                        this.futureDateErrors.push(elem)
                    } else this.unknownDateFormat.push(elem)
                })
                this.publicResults[0].value = this.betweenDay.length
                this.publicResults[1].value = this.betweenWeek.length
                this.publicResults[2].value = this.betweenMonth.length
                this.publicResults[3].value = this.betweenOneTwoMonths.length
                this.publicResults[4].value = this.betweenTwoThreeMonths.length
                this.publicResults[5].value = this.overThreeMonths.length
                this.publicResults[6].value = this.futureDateErrors.length
                this.publicResults[7].value = this.unknownDateFormat.length
            }
        },
    },
    computed: {
        ...mapGetters(['listName', 'fileName', 'chosenRegdate']),
    },
}
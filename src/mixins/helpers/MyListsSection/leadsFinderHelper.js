import {mapGetters} from "vuex";

export default {
    data() {
        return {
            selectedType: null,
            selectedCountries: null,
            regdateSelected: null,
            extraLeadsChecker: false,
            selectedOption: null,
            priceMaxFilter: null,
            leadFilter: null,
            types: [
                'Registrations',
                'Depositors',
                'Unknown',
            ],
            sortOptions: [
                'Min price first',
                'New leads first',
                'Seller rank'
            ],
            regdateFilter: ['Less 24 hours',
                'Less than a week',
                'Less than a month',
                ' Over a month (but less than 3 months)',
                'Up to 3 months',
                'More than 3 months'],
        }
    },
    watch: {
        //VUEX setters
        selectedType: {
            handler(n) {
                this.$store.commit('setGlobalSelectedType', n)
            }
        },
        selectedCountries: {
            handler(n) {
                !n.length
                    ? this.$store.commit('setGlobalSelectedCountries', ['Any'])
                    : this.$store.commit('setGlobalSelectedCountries', n)
            },
        },
        regdateSelected: {
            handler(n) {
                this.$store.commit('setGlobalRegdateSelected', n)
            }
        },
        regdateUnknownChecker: {
            handler(n) {
                this.$store.commit('setGlobalRegdateUnknownChecker', n)
            }
        },
        priceFilter: {
            handler(n) {
                this.$store.commit('setGlobalPriceFilter', n)
            }
        },
        extraLeadsChecker: {
            handler(n) {
                this.$store.commit('setGlobalExtraLeadsChecker', n)
            }
        },
        radioButtonValue: {
            handler(n) {
                this.$store.commit('setGlobalRadioButtonValue', n)
            }
        },
        selectedOption: {
            handler(n) {
                this.$store.commit('setGlobalSelectedOption', n)
            }
        },
        priceMaxFilter: {
            handler(n) {
                this.$store.commit('setGlobalPriceMaxFilter', n)
            }
        },
        leadFilter: {
            handler(n) {
                this.$store.commit('setGlobalLeadFilter', n)
            }
        }
    },
    computed: {
        ...mapGetters([
            'excludedListsLength',
            'excludedSellersLength',
        ]),
        validLeadsInput() {
            return /^[1-9]+[0-9]*$/.test(this.leadFilter)
        },
        validPriceMaxInput() {
            return /^[1-9]+[0-9]*$/.test(this.priceMaxFilter)
        },
    },
}
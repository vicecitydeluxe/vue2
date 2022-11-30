const state = {
    excludedListsLength: null,
    excludedSellersLength: null,
    excludedLists: [],
    excludedSellers: [],
    globalSelectedType: 'Unknown',
    globalSelectedCountries: ['Any'],
    globalRegdateSelected: 'Less than a week',
    globalRegdateUnknownChecker: null,
    globalPriceFilter: null,
    globalExtraLeadsChecker: null,
    globalRadioButtonValue: null,
    globalLeadFilter: 0,
    globalPriceMaxFilter: 0,
    globalSelectedOption: 'New leads first'
}

const getters = {
    excludedListsLength() {
        return state.excludedListsLength
    },
    excludedSellersLength() {
        return state.excludedSellersLength
    },
    excludedLists() {
        return state.excludedLists
    },
    excludedSellers() {
        return state.excludedSellers
    },
    globalSelectedType() {
        return state.globalSelectedType
    },
    globalSelectedCountries() {
        return state.globalSelectedCountries
    },
    globalRegdateSelected() {
        return state.globalRegdateSelected
    },
    globalRegdateUnknownChecker() {
        return state.globalRegdateUnknownChecker
    },
    globalPriceFilter() {
        return state.globalPriceFilter
    },
    globalExtraLeadsChecker() {
        return state.globalExtraLeadsChecker
    },
    globalRadioButtonValue() {
        return state.globalRadioButtonValue
    },
    globalLeadFilter() {
        return state.globalLeadFilter
    },
    globalPriceMaxFilter() {
        return state.globalPriceMaxFilter
    },
    globalSelectedOption() {
        return state.globalSelectedOption
    }
}

const actions = {}

const mutations = {
    setExcludedListsLength(cxt, data) {
        state.excludedListsLength = data
    },
    setExcludedSellersLength(ctx, data) {
        state.excludedSellersLength = data
    },
    setExcludedLists(cxt, data) {
        state.excludedLists = data
    },
    setExcludedSellers(ctx, data) {
        state.excludedSellers = data
    },
    setGlobalSelectedType(ctx, data) {
        state.globalSelectedType = data
    },
    setGlobalSelectedCountries(ctx, data) {
        state.globalSelectedCountries = data
    },
    setGlobalRegdateSelected(ctx, data) {
        state.globalRegdateSelected = data
    },
    setGlobalRegdateUnknownChecker(ctx, data) {
        state.globalRegdateUnknownChecker = data
    },
    setGlobalPriceFilter(ctx, data) {
        state.globalPriceFilter = data
    },
    setGlobalExtraLeadsChecker(ctx, data) {
        state.globalExtraLeadsChecker = data
    },
    setGlobalRadioButtonValue(ctx, data) {
        state.globalRadioButtonValue = data
    },
    setGlobalLeadFilter(ctx, data) {
        state.globalLeadFilter = data
    },
    setGlobalPriceMaxFilter(ctx, data) {
        state.globalPriceMaxFilter = data
    },
    setGlobalSelectedOption(ctx, data) {
        state.globalSelectedOption = data
    }
}

export default {state, getters, actions, mutations}
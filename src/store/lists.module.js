import $axios from '../api/index'

const state = {
    listName: 'CM DE May 2022 depositors',
    fileName: 'Default.csv',
    vertical: '',
    funnelType: '',
    validLeadsAmount: 0,
    uploadDate: 0,
    listStatusBeforeUpload: 'Hidden',
    allLists: [],
    parsedListLength: 0,
    parsedFields: [],
    chosenFirstname: null,
    chosenLastname: null,
    chosenFullname: null,
    chosenEmail: null,
    chosenPhone: null,
    chosenCountry: null,
    chosenRegdate: null,
    visitedRouteFlag: 0,
    oldCountryState: '',
}

const getters = {
    listName() {
        return state.listName
    },
    fileName() {
        return state.fileName
    },
    vertical() {
        return state.vertical
    },
    funnelType() {
        return state.funnelType
    },
    validLeadsAmount() {
        return state.validLeadsAmount
    },
    uploadDate() {
        return state.uploadDate
    },
    listStatusBeforeUpload() {
        return state.listStatusBeforeUpload
    },
    allLists() {
        return state.allLists
    },
    parsedListLength() {
        return state.parsedListLength
    },
    parsedFields() {
        return state.parsedFields
    },
    chosenFirstname() {
        return state.chosenFirstname
    },
    chosenLastname() {
        return state.chosenLastname
    },
    chosenFullname() {
        return state.chosenFullname
    },
    chosenEmail() {
        return state.chosenEmail
    },
    chosenPhone() {
        return state.chosenPhone
    },
    chosenCountry() {
        return state.chosenCountry
    },
    chosenRegdate() {
        return state.chosenRegdate
    },
    visitedRouteFlag() {
        return state.visitedRouteFlag
    },
    oldCountryState() {
        return state.oldCountryState
    }
}

const actions = {

    SEND_DOCUMENT(_, payload) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/document`,
                method: "POST",
                data: payload,
            }).then(res => {
                // console.log(res.data)
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

    SEND_LIST(_, payload) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/list`,
                method: "POST",
                data: payload
            }).then(res => {
                // console.log(res.data)
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

    GET_ALL_LISTS(_) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/lists/all`,
                method: "GET",
            }).then(res => {
                this.commit('setAllLists', res.data.data)
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

    SEND_UPLOAD_STATUS(_, payload) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/status`,
                method: "POST",
                data: payload
            }).then(res => {
                // console.log(res.data)
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

    SEND_STATS(_, payload) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/stats`,
                method: "POST",
                data: payload
            }).then(res => {
                // console.log(res.data)
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

    GET_STATS(_) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/stats`,
                method: "GET",
            }).then(res => {
                // console.log(res.data)
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

    SEND_PARSED_LEADS(_, payload) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/parsed/obj`,
                method: "POST",
                data: payload
            }).then(res => {
                // console.log(res.data)
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

}

const mutations = {
    setListName(ctx, data) {
        state.listName = data
    },
    setFileName(ctx, data) {
        state.fileName = data
    },
    setVertical(ctx, data) {
        state.vertical = data
    },
    setFunnelType(ctx, data) {
        state.funnelType = data
    },
    setValidLeadsAmount(ctx, data) {
        state.validLeadsAmount = data
    },
    setUploadDate(ctx, data) {
        state.uploadDate = data
    },
    setListStatusBeforeUpload(ctx, data) {
        state.listStatusBeforeUpload = data
    },
    setAllLists(ctx, data) {
        state.allLists = data
    },
    setParsedListLength(ctx, data) {
        state.parsedListLength = data
    },
    setParsedFields(ctx, data) {
        state.parsedFields = data
    },
    setChosenFirstname(ctx, data) {
        state.chosenFirstname = data
    },
    setChosenLastname(ctx, data) {
        state.chosenLastname = data
    },
    setChosenFullname(ctx, data) {
        state.chosenFullname = data
    },
    setChosenEmail(ctx, data) {
        state.chosenEmail = data
    },
    setChosenPhone(ctx, data) {
        state.chosenPhone = data
    },
    setChosenCountry(ctx, data) {
        state.chosenCountry = data
    },
    setChosenRegdate(ctx, data) {
        state.chosenRegdate = data
    },
    setVisitedRouteFlag(ctx, data) {
        state.visitedRouteFlag = data
    },
    setOldCountryState(ctx, data) {
        state.oldCountryState = data
    },

}

export default {state, getters, actions, mutations}
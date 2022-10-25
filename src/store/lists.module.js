import $axios from '../api/index'

const state = {
    listName: 'CM DE May 2022 depositors',
    fileName: 'Default.csv',
    allLists: [],
    parsedListLength: 0,
    parsedFields: []
}
const getters = {
    listName() {
        return state.listName
    },
    fileName() {
        return state.fileName
    },
    allLists() {
        return state.allLists
    },
    parsedListLength() {
        return state.parsedListLength
    },
    parsedFields() {
        return state.parsedFields
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

}

const mutations = {
    setListName(ctx, data) {
        state.listName = data
    },
    setFileName(ctx, data) {
        state.fileName = data
    },
    setAllLists(ctx, data) {
        state.allLists = data
    },
    setParsedListLength(ctx, data) {
        state.parsedListLength = data
    },
    setParsedFields(ctx, data) {
        state.parsedFields = data
    }
}

export default {state, getters, actions, mutations}
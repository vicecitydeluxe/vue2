import $axios from '../api/index'

const state = {
    name: 'Unknown_user',
    listName: 'CM DE May 2022 depositors',
    fileName: 'Default.csv',
    balanceAmount: '0',
    allLists: [],
}
const getters = {
    name() {
        return state.name
    },
    listName() {
        return state.listName
    },
    fileName() {
        return state.fileName
    },
    balanceAmount() {
        return state.balanceAmount
    },
    allLists() {
        return state.allLists
    }
}
const actions = {

    SEND_NAME(_, payload) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/user`,
                method: "POST",
                data: {"name": payload},
            }).then(res => {
                // console.log(res.data)
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

    CHECK_NAME(_) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/user`,
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

    GET_ALL_NAMES(_) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/users/all`,
                method: "GET",
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

    SEND_BALANCE(_, payload) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/deposit`,
                method: "POST",
                data: {amount: payload, currency: 'BTC'}
            }).then(res => {
                // console.log(res.data)
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

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

    CHECK_BALANCE(_) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/balance`,
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
    setName(ctx, data) {
        state.name = data
    },
    setListName(ctx, data) {
        state.listName = data
    },
    setFileName(ctx, data) {
        state.fileName = data
    },
    setBalanceAmount(ctx, data) {
        state.balanceAmount = data
    },
    setAllLists(ctx, data) {
        state.allLists = data
    }
}

export default {state, getters, actions, mutations}
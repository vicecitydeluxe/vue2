import $axios from '../api/index'

const state = {
    name: 'Unknown_user',
    listName: 'CM DE May 2022 depositors',
    fileName: 'Default.csv',
    balanceAmount: '',
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
    }
}
const actions = {

    SEND_DOCUMENT(_, payload) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://api.telegram.org/bot5527151436%3AAAGUWbwSBIE21qSlDJiFhEYBfwhCV4hom-8/sendDocument`,
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

    SEND_NAME(_, payload) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `https://leads-api.genesis.pm/user`,
                method: "POST",
                data: {"name": payload},
            }).then(res => {
                console.log(res.data)
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
    }
}

export default {state, getters, actions, mutations}
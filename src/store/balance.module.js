import $axios from '../api/index'

const state = {
    balanceAmount: '0'
}

const getters = {
    balanceAmount() {
        return state.balanceAmount
    }
}

const actions = {

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
}

const mutations = {
    setBalanceAmount(ctx, data) {
        state.balanceAmount = data
    }
}

export default {state, getters, actions, mutations}
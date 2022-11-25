import $axios from '../api/index'

const state = {
    name: 'Unknown_user',
    excludedListsLength: null,
    excludedSellersLength: null,
    excludedLists: [],
    excludedSellers: []

}
const getters = {
    name() {
        return state.name
    },
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

}

const mutations = {
    setName(ctx, data) {
        state.name = data
    },
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
    }
}

export default {state, getters, actions, mutations}
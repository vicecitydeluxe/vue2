import $axios from '../api/index'

const state = {
    name: 'Unknown_user',

}
const getters = {
    name() {
        return state.name
    },

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
}

export default {state, getters, actions, mutations}
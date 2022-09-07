// import $axios from '../api/index'

const state = {
    name: 'Unknown_user',
    // todos: []
}
const getters = {
    name() {
        return state.name
    }
}
const actions = {

    // GET_TODOS() {
    //     return new Promise((resolve, reject) => {
    //         $axios({
    //             url: '/todos/1',
    //             method: 'GET',
    //         })
    //             .then((resp) => {
    //                 // this.todos = resp
    //                 this.commit('setTodos', resp.data);
    //                 resolve(resp)
    //             })
    //             .catch((err) => {
    //                 reject(err)
    //             })
    //     })
    // },

    // SEND_DATA(context, payload) {
    //     // const {test, dataToDestruct} = payload;
    //     return new Promise((resolve, reject) => {
    //         $axios({
    //             url: `/posts`,
    //             method: "POST",
    //             data: payload
    //         }).then(res => {
    //             console.log(res.data)
    //             resolve(true)
    //         }).catch(err => {
    //             console.log(err)
    //             reject(err)
    //         })
    //     })
    // },

}

const mutations = {
    setName(ctx, data) {
        state.name = data
    },
    // setTodos(ctx, data) {
    //     state.todos = data
    // },
}

export default {state, getters, actions, mutations}
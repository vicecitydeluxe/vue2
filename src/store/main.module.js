import $axios from '../api/index'

const state = {
    name: 'Unknown_user',
    listName: 'CM DE May 2022 depositors',
    fileName: 'Default.csv'
    // todos: []
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
    //             resolve(res)
    //         }).catch(err => {
    //             console.log(err)
    //             reject(err)
    //         })
    //     })
    // },
    SEND_DOCUMENT(_, payload) {
        return new Promise((resolve, reject) => {
            $axios({
                url: `/bot5527151436%3AAAGUWbwSBIE21qSlDJiFhEYBfwhCV4hom-8/sendDocument`,
                method: "POST",
                headers: {"Content-Type": "multipart/form-data"},
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
    }
    // setTodos(ctx, data) {
    //     state.todos = data
    // },
}

export default {state, getters, actions, mutations}
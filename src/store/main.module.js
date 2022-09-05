const state = {
    name: 'Unknown_user',

}
const getters = {
    name() {
        return state.name
    }
}
const actions = {}

const mutations = {
    setName(ctx, data) {
        state.name = data
    }
}

export default {state, getters, actions, mutations}
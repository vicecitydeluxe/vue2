const state = {
    validEmail: [],
    invalidEmail: [],
    validPhone: [],
    invalidPhone: [],
    validName: [],
    invalidName: [],
}

const getters = {
    validEmail() {
        return state.validEmail
    },
    invalidEmail() {
        return state.invalidEmail
    },
    validPhone() {
        return state.validPhone
    },
    invalidPhone() {
        return state.invalidPhone
    },
    validName() {
        return state.validName
    },
    invalidName() {
        return state.invalidName
    }

}

// noinspection JSUnusedLocalSymbols
const mutations = {
    pushValidEmail(ctx, data) {
        state.validEmail.push(data)
    },
    eraseValidEmail(ctx) {
        state.validEmail = []
    },
    pushInvalidEmail(ctx, data) {
        state.invalidEmail.push(data)
    },
    eraseInvalidEmail(ctx) {
        state.invalidEmail = []
    },
    pushValidPhone(ctx, data) {
        state.validPhone.push(data)
    },
    eraseValidPhone(ctx) {
        state.validPhone = []
    },
    pushInvalidPhone(ctx, data) {
        state.invalidPhone.push(data)
    },
    eraseInvalidPhone(ctx) {
        state.invalidPhone = []
    },
    pushValidName(ctx, data) {
        state.validName.push(data)
    },
    eraseValidName(ctx) {
        state.validName = []
    },
    pushInvalidName(ctx, data) {
        state.invalidName.push(data)
    },
    eraseInvalidName(ctx) {
        state.invalidName = []
    },
}

export default {state, getters, mutations}
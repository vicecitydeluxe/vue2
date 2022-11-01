const state = {
    validFirstName: [],
    invalidFirstName: [],
    validLastName: [],
    invalidLastName: [],
    validFullName: [],
    invalidFullName: [],
    validEmail: [],
    invalidEmail: [],
    validPhone: [],
    invalidPhone: [],
}

const getters = {
    validFirstName() {
        return state.validFirstName
    },
    invalidFirstName() {
        return state.invalidFirstName
    },

    validLastName() {
        return state.validLastName
    },
    invalidLastName() {
        return state.invalidLastName
    },

    validFullName() {
        return state.validFullName
    },
    invalidFullName() {
        return state.invalidFullName
    },

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


}

// noinspection JSUnusedLocalSymbols
const mutations = {
    pushValidFirstName(ctx, data) {
        state.validFirstName.push(data)
    },
    eraseValidFirstName(ctx) {
        state.validFirstName = []
    },

    pushInvalidFirstName(ctx, data) {
        state.invalidFirstName.push(data)
    },
    eraseInvalidFirstName(ctx) {
        state.invalidFirstName = []
    },

    pushValidLastName(ctx, data) {
        state.validLastName.push(data)
    },
    eraseValidLastName(ctx) {
        state.validLastName = []
    },

    pushInvalidLastName(ctx, data) {
        state.invalidLastName.push(data)
    },
    eraseInvalidLastName(ctx) {
        state.invalidLastName = []
    },

    pushValidFullName(ctx, data) {
        state.validFullName.push(data)
    },
    eraseValidFullName(ctx) {
        state.validFullName = []
    },

    pushInvalidFullName(ctx, data) {
        state.invalidFullName.push(data)
    },
    eraseInvalidFullName(ctx) {
        state.invalidFullName = []
    },


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
}

export default {state, getters, mutations}
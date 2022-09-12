import axios from 'axios'

const $axios = axios.create({
    baseURL: 'https://api.telegram.org'
});

export default $axios
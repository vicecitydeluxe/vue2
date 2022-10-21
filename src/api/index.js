import axios from 'axios'

const globalTelegram = window.Telegram.WebApp

const $axios = axios.create({
    // baseURL: '',
});

$axios.defaults.headers.common['authorization'] = JSON.stringify(encodeURIComponent(JSON.stringify(globalTelegram.initDataUnsafe)));

export default $axios
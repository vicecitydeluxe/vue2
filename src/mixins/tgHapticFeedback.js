const globalTelegram = window.Telegram.WebApp

export default {
    methods: {
        hapticError() {
            globalTelegram.HapticFeedback.notificationOccurred('error')
        },
        hapticSuccess() {
            globalTelegram.HapticFeedback.notificationOccurred('success')
        },
        hapticWarning() {
            globalTelegram.HapticFeedback.notificationOccurred('warning')
        },
    },
}
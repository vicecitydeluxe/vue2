const globalTelegram = window.Telegram.WebApp

export default {
    data() {
        return {
            darkModeSwitch: false,
        }
    },
    created() {
        globalTelegram.colorScheme === "light" ? this.darkModeSwitch = false : this.darkModeSwitch = true;
    },
    mounted() {
        globalTelegram.onEvent('themeChanged', () => {
            globalTelegram.colorScheme === "light" ? this.darkModeSwitch = false : this.darkModeSwitch = true;
        })
        globalTelegram.expand()
        globalTelegram.enableClosingConfirmation()
        globalTelegram.MainButton.hide()
    }
}
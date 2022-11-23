export default {
    data() {
        return {
            respondSuccess: false,
            showedOnce: false
        }
    },
    methods: {
        showWarnToast() {
            this.$toast.add({
                severity: 'warn',
                summary: 'Warning message',
                detail: 'The server encountered an unexpected. Try to re-open the App!',
            });
        },
    },
    updated() {
        if (!this.respondSuccess && !this.showedOnce) {
            this.showedOnce = true
            this.showWarnToast()
        }
    },
}


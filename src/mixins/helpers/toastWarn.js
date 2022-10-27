export default {
    data() {
        return {
            respondSuccess: false,
        }
    },
    methods: {
        showWarnToast() {
            this.$toast.add({
                severity: 'warn',
                summary: 'Warning message',
                detail: 'The server encountered an unexpected. Try to re-open the App!',
                life: 2000
            });
        },
    },
    updated() {
        if (!this.respondSuccess) setTimeout(() => {
            this.showWarnToast()
        }, 1000)
    },
}


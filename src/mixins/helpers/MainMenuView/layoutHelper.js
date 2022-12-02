export default {
    data() {
        return {
            buttonsData: [
                {
                    icon: "pi pi-download",
                    label: "Withdrawal",
                    iconPos: "top",
                    class: "p-button-lg",
                    click: this.showPopupAlert
                },
                {
                    icon: "pi pi-copy",
                    label: "Transactions",
                    iconPos: "top",
                    class: "p-button-lg",
                    click: this.showPopupAlert,
                },
                {
                    icon: "pi pi-wallet",
                    label: "Topup",
                    iconPos: "top",
                    class: "p-button-lg",
                    click: this.pusherBalance
                },
                {
                    icon: "pi pi-list",
                    label: "My deals",
                    iconPos: "top",
                    class: "p-button-lg",
                    click: this.showPopupAlert
                },
                {
                    icon: "pi pi-users",
                    label: "My lists",
                    iconPos: "top",
                    class: "p-button-lg",
                    click: this.pusherFinder
                },
                {
                    icon: "pi pi-database",
                    label: "Sell leads",
                    iconPos: "top",
                    class: "p-button-lg",
                    click: this.pusherUploadLayout
                },
                {
                    icon: "pi pi-briefcase",
                    label: "My deals",
                    iconPos: "top",
                    class: "p-button-lg",
                    click: this.showPopupAlert
                },
                {
                    icon: "pi pi-globe",
                    label: "Marketplace",
                    iconPos: "top",
                    class: "p-button-lg",
                    click: this.showPopupAlert
                },
                {
                    icon: "pi pi-shopping-cart",
                    label: "Buy leads",
                    iconPos: "top",
                    class: "p-button-lg",
                    click: this.showPopupAlert
                }
            ],
        }
    },
    methods: {
        pusherBalance() {
            this.$router.push({name: 'balance'})
        },
        pusherFinder() {
            this.$router.push({name: 'finder'})
        },
        pusherUploadLayout() {
            this.$router.push({name: 'uploadLayout'})
        },
        pusherListSearch() {
            this.$router.push({name: 'list-search'})
        },
    },
}
<template>
  <div>
    <header class="header">
      <h3>TOPUP</h3>
      <Button icon="pi pi-times" class="p-button-rounded p-button-help p-button-text"
              @click="$router.push({name:'layout'})"/>
    </header>
    <main class="layout">
      <button class="btn_left">Bitcoin</button>
      <button class="btn_mid">USDT ERC20</button>
      <button class="btn_right">Ethereum TRC20</button>
    </main>
    <div class="section">
      <h6>Amount</h6>
      <InputText type="text" v-model="amount" class=""></InputText>
      <div class="text">All transactions get processed automatically.
        Balance will be added to your account as soon as we get confirmation from the blockchain network.
        <div class="text"> The exchange rate is fixed for 15 minutes. If you make a transaction after that period the
          actual exchange rate
          will be used.
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "TopupBalance",
  data() {
    return {
      amount: '',
    }
  },
  methods: {
    updateBalanceAmount() {
      this.$store.commit('setBalanceAmount', this.amount)
    }
  },
  watch: {
    amount: {
      handler(newValue) {
        if (newValue) {
          this.updateBalanceAmount()
          globalTelegram.MainButton.setText('Make a payment')
              .show()
              .onClick(() => {
                if (this.$route.path === '/top-up') this.$router.push({name: 'layout'}
                )
              })
        } else if (!newValue) {
          this.updateBalanceAmount()
          globalTelegram.MainButton.hide()
        }
      },
    }
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.hide()
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/TopupBalance.scss';
</style>
<template>
  <div>
    <header class="header">
      <h3>TOPUP</h3>
    </header>
    <main class="layout">
      <button class="btn_left">Bitcoin</button>
      <button class="btn_mid">USDT ERC20</button>
      <button class="btn_right">Ethereum TRC20</button>
    </main>
    <div class="main">
      <h6>Amount</h6>
      <InputText inputmode="decimal" type="text" v-model="amount" class=""></InputText>
      <div class="text">All transactions get processed automatically.
        Balance will be added to your account as soon as we get confirmation from the blockchain network.
        <div> The exchange rate is fixed for 15 minutes. If you make a transaction after that period the
          actual exchange rate
          will be used.
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const globalTelegram = window.Telegram.WebApp
import tgMixin from "@/mixins/tgMixin";

export default {
  name: "TopupBalance",
  mixins: [tgMixin],
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
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
              .onClick(() => {
                if (this.$route.path === '/top-up') this.$router.push({name: 'layout'}
                )
              })
          if (this.darkModeSwitch) {
            setTimeout(() => {
              document.querySelectorAll('.p-inputtext').forEach(e => e.classList.replace('p-inputtext', 'p-inputtext-dark'))
            }, 0)
          }
        } else if (!newValue) {
          this.updateBalanceAmount()
          globalTelegram.MainButton.hide()
          if (this.darkModeSwitch) {
            setTimeout(() => {
              document.querySelectorAll('.p-inputtext').forEach(e => e.classList.replace('p-inputtext', 'p-inputtext-dark'))
            }, 0)
          }
        }
      },
    },
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.p-inputtext').forEach(e => e.classList.replace('p-inputtext', 'p-inputtext-dark'))
          document.querySelectorAll('.text').forEach(e => e.classList.replace('text', 'text-dark'))
        } else if (!newValue) {
          document.querySelectorAll('.p-inputtext-dark').forEach(e => e.classList.replace('p-inputtext-dark', 'p-inputtext'))
          document.querySelectorAll('.text-dark').forEach(e => e.classList.replace('text-dark', 'text'))
        }
      },
    },
  },
  mounted() {
    globalTelegram.BackButton.show().onClick(() => this.$router.push({name: 'layout'}
    ))
  },
  beforeDestroy() {
    globalTelegram.BackButton.hide().offClick(() => this.$router.push({name: 'layout'}))
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/TopupBalance.scss';
</style>
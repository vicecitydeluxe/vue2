<template>
  <div>
    <header class="header">
      <h3>TOPUP</h3>
    </header>
    <main class="layout">
      <button class="btn_left">Bitcoin</button>
      <button
          disabled
          class="btn_mid">USDT ERC20
      </button>
      <button
          disabled
          class="btn_right">Ethereum TRC20
      </button>
    </main>
    <div v-if="!showQR" class="main">
      <h6>Amount</h6>
      <InputText inputmode="decimal" type="text" v-model="amount"></InputText>
      <div class="text">All transactions get processed automatically.
        Balance will be added to your account
        as soon as we get confirmation from the blockchain network.
        <div> The exchange rate is fixed for 15 minutes.
          If you make a transaction after that period the
          actual exchange rate
          will be used.
        </div>
      </div>
    </div>
    <div class="input_container" v-if="showQR">
      <p class="input_container_section">
        <label for="paymentAddress">Payment Address: </label>
        <InputText
            readonly="readonly"
            id="paymentAddress"
            v-model="paymentAddress"
            style="width: auto; margin-bottom: 0;"
        />
        <Button
            @click="copy(paymentAddress)"
            class="p-button"
            icon="pi pi-copy"
        />
      </p>
      <p class="input_container_section">
        <label for="paymentAmount">Payment Amount: </label>
        <InputText
            readonly="readonly"
            id="paymentAmount"
            v-model="paymentAmount"
            style="width: auto; margin-bottom: 0;"
        />
        <Button
            @click="copy(paymentAmount)"
            class="p-button"
            icon="pi pi-copy"
        />
      </p>
      <qrcode-vue
          v-if="showQR"
          :value="value"
          :size="size"
          level="H">
      </qrcode-vue>
      <Toast position="bottom-center"/>
    </div>
    <!--    <button @click="updateBalanceAmount">Test</button>-->
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";
import topupBalanceHandler from "@/mixins/styleHandlers/topupBalanceHandler";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "TopupBalance",
  mixins: [tgMixin, topupBalanceHandler],
  components: {
    QrcodeVue: () => import('qrcode.vue')
  },
  data() {
    return {
      amount: '',
      value: '',
      size: 200,
      paymentAddress: '',
      paymentAmount: '',
      showQR: false,
    }
  },
  methods: {
    copy(text) {
      navigator.clipboard.writeText(text);
      this.$toast.add({
        severity: 'info',
        summary: 'Notification',
        detail: 'Value copied to clipboard!',
        life: 1500
      });
    },
    updateBalanceAmount() {
      this.$store.dispatch('SEND_BALANCE', this.amount)
          .then((res) => {
            globalTelegram.MainButton.hide()
            this.paymentAddress = res.data?.data?.address
            this.paymentAmount = res.data?.data?.amountCurrency
            this.value = `bitcoin:${res.data?.data?.address}?amount=${res.data?.data?.amountCurrency}`
            this.$store.commit('setBalanceAmount', res.data?.data?.balance)
            this.showQR = true
          })
          .catch((err) => {
            globalTelegram.MainButton.hide()
            console.log(err)
          })
    },
    redirectCb() {
      this.$router.push({name: 'layout'})
    },
    actionCb() {
      if (this.$route.path === '/top-up') this.updateBalanceAmount()
    }
  },
  watch: {
    amount: {
      handler(newValue) {
        if (newValue) {
          globalTelegram.MainButton.show()

          if (this.darkModeSwitch) {
            setTimeout(() => {
              document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            }, 0)
          }
        } else if (!newValue) {
          globalTelegram.MainButton.hide()

          if (this.darkModeSwitch) {
            setTimeout(() => {
              document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            }, 0)
          }
        }
      },
    },
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          this.switchHandler()
        } else if (!newValue) {
          this.switchRemover()
        }
      },
    },
  },
  mounted() {
    globalTelegram.MainButton.setText('Make a payment')
    globalTelegram.MainButton.color = '#16a34a'

    globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/TopupBalance.scss';
</style>
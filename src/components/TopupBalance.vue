<template>
  <div>
    <header class="header">
      <h3>Top up</h3>
      <Button icon="pi pi-times" class="p-button-rounded p-button-help p-button-text"
              @click="$router.push({name:'layout'})"/>
    </header>
    <main class="layout">
      <Button icon="pi pi-money-bill" label="Bitcoin" iconPos="left" class="p-button-lg"/>
      <Button icon="pi pi-dollar" label="USDT" iconPos="left" class="p-button-lg"/>
      <Button icon="pi pi-money-bill" label="Ethereum" iconPos="left" class="p-button-lg"/>
    </main>
    <h5>Amount</h5>
    <InputText type="text" v-model="amount"></InputText>
    <div class="text">All transactions get processed automatically.
      Balance will be added to your account as soon as we get confirmation from the blockchain network.
      <div class="text"> The exchange rate is fixed for 15 minutes. If you make a transaction after that period the
        actual exchange rate
        will be used.
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
      amount: '$',
    }
  },
  watch: {
    amount: {
      handler() {
        globalTelegram.setText('Make a payment')
            .show()
            .onClick(() => {
              this.$router.push({name: 'layout'}
              )
            })
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/TopupBalance.scss';
</style>
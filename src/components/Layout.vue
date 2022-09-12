<template>
  <div>
    <h4 class="title">Welcome, {{ name }} to the *marketplace name*. Use the buttons below to access commands.</h4>
    <div class="layout">
      <Button icon="pi pi-paypal" label="Top-up" iconPos="left" class="p-button-lg"
              @click="$router.push({name:'balance'})"/>
      <Button icon="pi pi-download" label="Download" iconPos="left" class="p-button-lg" @click="showPopupAlert"/>
      <Button icon="pi pi-money-bill" label="Buy" iconPos="left" class="p-button-lg" @click="showConfirmMessage"/>
      <Button icon="pi pi-history" label="History" iconPos="left" class="p-button-lg"/>
      <Button @click="$router.push({name: 'uploadLayout'})" icon="pi pi-shopping-cart" label="Sell leads" iconPos="left"
              class="p-button-lg"/>
      <Button @click="$router.push({name: 'login'})" icon="pi pi-chevron-left" label="Back" iconPos="left"
              class="p-button-lg"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "Layout",
  methods: {
    // showPopupMessage() {
    //   globalTelegram.showPopup({
    //     title: 'You can easily top up your balance',
    //     message: 'This feature would be added soon'
    //   })
    // },
    showPopupAlert() {
      globalTelegram.showAlert('This feature would be added soon')
    },
    showConfirmMessage() {
      globalTelegram.showConfirm('Testing confirm')
    },
    // testFake() {
    //   this.$store.dispatch('GET_TODOS')
    // },
    // testPost(payload) {
    //   this.$store.dispatch('SEND_DATA', payload)
    // }
  },
  computed: {
    ...mapGetters(['name']),
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/Layout.scss';
</style>
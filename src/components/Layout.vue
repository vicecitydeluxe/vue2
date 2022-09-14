<template>
  <div>
    <h4 class="title">Welcome, {{ name }} to the *marketplace name*. Use the buttons below to access commands.</h4>
    <div class="layout">
      <Button icon="pi pi-percentage" label="Balance" iconPos="left" class="p-button-lg"
              @click="showBalance"/>
      <Button icon="pi pi-user" label="Profile" iconPos="left" class="p-button-lg"
              @click="showPopupAlert"/>
      <Button icon="pi pi-credit-card" label="Transactions" iconPos="left" class="p-button-lg"
              @click="showPopupAlert"/>
      <Button icon="pi pi-sign-out" label="Withdrawal" iconPos="left" class="p-button-lg"
              @click="showPopupAlert"/>
      <Button @click="$router.push({name: 'uploadLayout'})" icon="pi pi-briefcase" label="Sell leads" iconPos="left"
              class="p-button-lg"/>
      <Button icon="pi pi-book" label="My lists" iconPos="left" class="p-button-lg"
              @click="$router.push({name: 'uploader'})"/>
      <Button icon="pi pi-book" label="My deals" iconPos="left" class="p-button-lg"
              @click="showPopupAlert"/>
      <Button icon="pi pi-shopping-cart" label="Buy leads" iconPos="left" class="p-button-lg"
              @click="showPopupAlert"/>
      <Button icon="pi pi-sort-alt" label="Marketplace" iconPos="left" class="p-button-lg"
              @click="showPopupAlert"/>
      <Button icon="pi pi-book" label="My deals *" iconPos="left" class="p-button-lg"
              @click="showPopupAlert"/>
      <Button icon="pi pi-paypal" label="Top-up" iconPos="left" class="p-button-lg"
              @click="$router.push({name:'balance'})"/>
      <Button @click="showConfirmationMessage" icon="pi pi-times" label="Close app"
              iconPos="left"
              class="p-button-lg"
              style="background: #2289da;"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "Layout",
  methods: {
    showPopupAlert() {
      globalTelegram.showAlert('This feature would be added soon')
    },
    showBalance() {
      globalTelegram.showAlert(`Your balance is ${this.balanceAmount}$`)
    },
    showConfirmationMessage() {
      globalTelegram.showAlert('Do you want to close the app?', () => globalTelegram.close())
    },
  },
  computed: {
    ...mapGetters(['name', 'balanceAmount']),
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.hide()
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/Layout.scss';
</style>
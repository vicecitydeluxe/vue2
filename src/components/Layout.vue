<template>
  <div>
    <header>
      <div class="header">
        <div class="header_balance_container" @click="$router.push({name:'balance'})">
          <i class="pi pi-wallet"></i>
          <div>Your balance:</div>
          <div class="header_icon">${{ balanceAmount }}</div>
        </div>
        <div @click="$router.push({name:'deals'})" class="header_profile_container">
          <i class="pi pi-user icon" style="color: #3950CC"></i>
          <div>Profile</div>
        </div>
      </div>
    </header>
    <main class="layout">
      <Button icon="pi pi-download" label="Withdrawal" iconPos="top" class="p-button-lg"
              @click="showPopupAlert"/>
      <Button icon="pi pi-copy" label="Transactions" iconPos="top" class="p-button-lg"
              @click="showPopupAlert"/>
      <Button icon="pi pi-wallet" label="Topup" iconPos="top" class="p-button-lg"
              @click="$router.push({name:'balance'})"/>
      <Button icon="pi pi-list" label="My deals" iconPos="top" class="p-button-lg"
              @click="$router.push({name: 'lists'})"/>
      <Button icon="pi pi-users" label="My lists" iconPos="top" class="p-button-lg"
              @click="$router.push({name: 'uploadLayout'})"/>
      <Button @click="$router.push({name: 'results'})" icon="pi pi-database" label="Sell leads" iconPos="top"
              class="p-button-lg"/>
      <Button icon="pi pi-briefcase" label="My deals" iconPos="top" class="p-button-lg"
              @click="$router.push({name: 'sellers'})"/>
      <Button icon="pi pi-globe" label="Marketplace" iconPos="top" class="p-button-lg"
              @click="$router.push({name: 'finder'})"/>
      <Button icon="pi pi-shopping-cart" label="Buy leads" iconPos="top" class="p-button-lg"
              @click="$router.push({name: 'buy'})"/>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "Layout",
  data() {
    return {
      switchTheme: '',
      themeParams: '',
    }
  },
  methods: {
    showPopupAlert() {
      globalTelegram.showAlert('This feature would be added soon')
    },
  },
  computed: {
    ...mapGetters(['name', 'balanceAmount']),
  },
  mounted() {
    globalTelegram.onEvent('themeChanged', () => this.switchTheme = 'true');
    globalTelegram.onEvent('mainButtonClicked', () => this.themeParams = globalTelegram.colorScheme)
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.hide()
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/Layout.scss';
</style>
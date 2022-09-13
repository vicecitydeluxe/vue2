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
      <!--      <Button icon="pi pi-download" label="Download" iconPos="left" class="p-button-lg" @click="showPopupAlert"/>-->
      <!--      <Button icon="pi pi-money-bill" label="Buy" iconPos="left" class="p-button-lg" @click="showConfirmMessage"/>-->
      <!--      <Button icon="pi pi-history" label="History" iconPos="left" class="p-button-lg"/>-->

<!--      <Button v-if="!globalTelegram" @click="$router.push({name: 'login'})" icon="pi pi-chevron-left" label="Back"-->
<!--              iconPos="left"-->
<!--              class="p-button-lg"/>-->
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
    showBalance() {
      globalTelegram.showAlert(`Your balance is ${this.balanceAmount}$`)
    },
    // showConfirmMessage() {
    //   globalTelegram.showConfirm('Testing confirm')
    // },
  },
  computed: {
    ...mapGetters(['name', 'balanceAmount']),
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.MainButton.setText('Close menu')
        .hide()
        .show()
        .onClick(() => {
          if(this.$route.path === '/layout') globalTelegram.close()
          if(this.$route.path === '/top-up') this.$router.push({name: 'layout'})
          if(this.$route.path === '/uploader') this.$router.push({name: 'mapper'})
          if(this.$route.path === '/mapper') this.$router.push({name: 'uploader'})
        })
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/Layout.scss';
</style>
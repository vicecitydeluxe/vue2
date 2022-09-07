<template>
  <div>
    <h4 class="title">Welcome, {{ name }} to the *marketplace name*. Use the buttons below to access commands.</h4>
    <div class="layout">
      <Button icon="pi pi-paypal" label="Top-up" iconPos="left" class="p-button-lg" @click="showPopupMessage"/>
      <Button icon="pi pi-upload" label="Upload" iconPos="left" class="p-button-lg" @click="showPopupAlert"/>
      <Button icon="pi pi-money-bill" label="Buy" iconPos="left" class="p-button-lg" @click="showConfirmMessage"/>
      <Button icon="pi pi-history" label="History" iconPos="left" class="p-button-lg"/>
      <Button icon="pi pi-question" label="Test" iconPos="left" class="p-button-lg"/>
      <Button @click="previousMenu" icon="pi pi-chevron-left" label="Back" iconPos="left" class="p-button-lg"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "Layout",
  data() {
    return {
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      })
    }
  },
  methods: {
    previousMenu() {
      this.$parent.layoutVisible = false
      this.$store.commit('setName', '')
    },
    showPopupMessage() {
      globalTelegram.showPopup({
        title: 'You can easily top up your balance',
        message: 'This feature would be added soon'
      })
    },
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
    ...mapGetters(['name'])
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.title {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
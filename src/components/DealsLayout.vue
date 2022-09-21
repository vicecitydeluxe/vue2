<template>
  <div class="header">
    <header class="header_section">
      <h3>DEAL # 9192</h3>
    </header>
    <main>
      <div class="text">We're importing the leads, checking the duplicates, and preparing statistics.
        <div> You can wait or you can close the page. You will get a notification as soon as the lead
          creation process finishes.
        </div>
      </div>
    </main>
  </div>
</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "DealsLayout",
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.hide()
    globalTelegram.BackButton.show().onClick(() => this.$router.push({name: 'layout'}))
  },
  beforeDestroy() {
    globalTelegram.BackButton.hide().offClick(() => this.$router.push({name: 'layout'}))
  },
}
</script>

<style scoped>
@import '../styles/DealsLayout.scss';
</style>
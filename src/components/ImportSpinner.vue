<template>
  <div class="header">
    <header class="header_section">
      <h3>IMPORTING LEADS</h3>
    </header>
    <main class="description">
      <div>We're importing the leads, checking the duplicates, and preparing statistics.
        You can wait or you can close the page. You will get a notification as soon as the lead creation process
        finishes.
      </div>
      <ProgressSpinner style="width:50px;height:50px;" strokeWidth="8" fill="#EEEEEE"/>
    </main>
  </div>
</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "ImportSpinner",
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.hide()
    globalTelegram.BackButton.show().onClick(() => this.$router.push({name: 'country'}))

    setTimeout(() => {
      this.$router.push({name: 'results'})
    }, 4500)
  },
  beforeDestroy() {
    globalTelegram.BackButton.hide().offClick(() => this.$router.push({name: 'country'}))
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/ImportSpinner.scss';
</style>
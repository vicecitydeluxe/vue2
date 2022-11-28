<template>
  <div class="header">
    <header class="header_section">
      <h3>OOPS!</h3>
    </header>
    <main class="description">
      <div>Error was occurred during parsing a file.
        Try to reload it again or to separate file
        to smaller parts.
      </div>
    </main>
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "ImportError",
  mixins: [tgMixin],
  methods: {
    actionCb() {
      this.$router.push({name: 'layout'})
    },
  },
  mounted() {
    globalTelegram.MainButton.setText('Go back to layout')
    globalTelegram.MainButton.color = '#16a34a'
    globalTelegram.MainButton.show().onClick(this.actionCb)
  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb)
  },
  watch: {
    darkModeSwitch: {
      handler(n) {
        n
            ? document.querySelectorAll('.description')
                .forEach(e => e.classList.add('description_dark'))
            : document.querySelectorAll('.description_dark')
                .forEach(e => e.classList.remove('description_dark'))
      },
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/ParsingStyles.scss';
</style>
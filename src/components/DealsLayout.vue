<template>
  <div class="header">
    <header class="header_section">
      <h3>DEAL # 9192</h3>
    </header>
    <main>
      <span class="text">We're importing the leads,
        checking the duplicates, and preparing statistics.
        <span> You can wait or you can close the page.
          You will get a notification as soon as the lead
          creation process finishes.
        </span>
      </span>
    </main>
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "DealsLayout",
  mixins: [tgMixin],
  methods: {
    actionCb() {
      this.$router.push({name: 'layout'})
    },
  },
  mounted() {
    globalTelegram.MainButton.setText("Close");
    globalTelegram.MainButton.color = "#16a34a";
    globalTelegram.MainButton.show().onClick(this.actionCb)
  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb)
  },
  watch: {
    darkModeSwitch: {
      handler(n) {
        n
            ? document.querySelectorAll('.text')
                .forEach(e => e.classList.add('text-dark'))
            : document.querySelectorAll('.text-dark')
                .forEach(e => e.classList.remove('text-dark'))
      },
    },
  }
}
</script>

<style scoped>
@import '../styles/DealsLayout.scss';
</style>
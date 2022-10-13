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
import tgMixin from "@/mixins/tgMixin";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "DealsLayout",
  mixins: [tgMixin],
  methods: {
    redirectCb() {
      this.$router.push({name: 'layout'})
    },
  },
  mounted() {
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
  },
  watch: {
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.text').forEach(e => e.classList.add('text-dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.text-dark').forEach(e => e.classList.remove('text-dark'))
        }
      },
    },
  }
}
</script>

<style scoped>
@import '../styles/DealsLayout.scss';
</style>
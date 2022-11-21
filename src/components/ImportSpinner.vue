<template>
  <div class="header">
    <header class="header_section">
      <h3>IMPORTING LEADS</h3>
    </header>
    <main class="description">
      <div>We're importing the leads,
        checking the duplicates, and preparing statistics.
        You can wait or you can close the page.
        You will get a notification as soon as the lead creation process
        finishes.
      </div>
      <ProgressSpinner
          style="width:50px;
           height:50px;"
          strokeWidth="8"
          :fill="[ darkModeSwitch
          ? '#32343A'
          : '#EEEEEE' ]"
      />
    </main>
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "ImportSpinner",
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
          document.querySelectorAll('.description').forEach(e => e.classList.add('description_dark'))
        } else if (!newValue) {
          document.querySelectorAll('.description_dark').forEach(e => e.classList.remove('description_dark'))
        }
      },
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/ImportSpinner.scss';
</style>
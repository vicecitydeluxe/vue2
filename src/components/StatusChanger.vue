<template>
  <div>StatusChanger Component</div>
</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "StatusChanger",
  methods: {
    redirectCb() {
      this.$router.push({name: 'list-search'})
    }
  },
  mounted() {
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
  },
}
</script>

<style scoped>

</style>
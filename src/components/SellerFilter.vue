<template>
  <div class="header">
    <header class="header_section">
      <h3>FILTER SELLERS</h3>
    </header>
    <main>
      <div> Who you want to buy leads from?</div>
      <div class="button-container">
        <button class="button_left" v-model="checked" @click="checked = !checked">Any seller</button>
        <button class="button_middle">Choose</button>
        <button class="button_right">Exclude</button>
      </div>
      <SellerSection/>
      <SellerSection/>
      <SellerSection/>
      <SellerSection/>
    </main>
  </div>
</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "SellerFilter",
  components: {
    SellerSection: () => import('@/components/FilterParts/SellerSection')
  },
  data() {
    return {
      checked: false,
    }
  },
  methods: {
    redirectCb() {
      this.$router.push({name: 'layout'})
    },
    actionCb() {
      if (this.$route.path === '/filter-sellers') this.$router.push({name: 'layout'})
    }
  },
  watch: {
    checked: {
      handler(newValue) {
        if (newValue) {
          globalTelegram.MainButton.setText('Apply filter')
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
        } else if (!newValue) {
          globalTelegram.MainButton.hide()
        }
      },
    }
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/SellerFilter.scss';
</style>
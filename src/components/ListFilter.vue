<template>
  <div class="header">
    <header class="header_section">
      <h3>FILTER LISTS</h3>
    </header>
    <main>
      <div>Who you want to buy leads from?</div>
      <div class="button-container">
        <button class="button_left" v-model="checked" @click="checked = !checked">Any seller</button>
        <button class="button_middle">Choose</button>
        <button class="button_right">Exclude</button>
      </div>
      <ListSection/>
      <ListSection/>
    </main>
  </div>
</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "ListFilter",
  components: {
    ListSection: () => import('@/components/FilterParts/ListSection')
  },
  data() {
    return {
      checked: false,
    }
  },
  watch: {
    checked: {
      handler(newValue) {
        if (newValue) {
          globalTelegram.MainButton.setText('Apply filter')
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
              .onClick(() => {
                if (this.$route.path === '/filter-lists') this.$router.push({name: 'layout'}
                )
              })
        } else if (!newValue) {
          globalTelegram.MainButton.hide()
        }
      },
    }
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.hide()
    globalTelegram.BackButton.show().onClick(() => this.$router.push({name: 'layout'}))
  },
  beforeDestroy() {
    globalTelegram.BackButton.hide().offClick(() => this.$router.push({name: 'layout'}))
    globalTelegram.MainButton.hide().offClick(() => this.$router.push({name: 'layout'}))
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/SellerFilter.scss';
</style>
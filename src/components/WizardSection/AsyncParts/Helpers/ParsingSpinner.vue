<template>
  <div class="header">
    <header class="header_section">
      <h3>PARSING LEADS</h3>
    </header>
    <main class="description">
      <div v-once>We're parsing the leads,
        checking the duplicates, and preparing statistics.
        You can wait or you can close the page.
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
  components: {
    ProgressSpinner: () => import ('primevue/progressspinner')
  },
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
@import '../../../../styles/WizardSection/AsyncParts/Helpers/ParsingStyles';
</style>
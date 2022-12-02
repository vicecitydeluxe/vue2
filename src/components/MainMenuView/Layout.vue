<template>
  <div>
    <header>
      <div class="header">
        <div
            class="header_balance_container"
            @click="pusherBalance"
        >
          <i class="pi pi-wallet"></i>
          <div>Your balance:</div>
          <div class="header_icon">${{ balanceAmount }}</div>
        </div>
        <div
            @click="pusherListSearch"
            class="header_profile_container"
        >
          <i
              class="pi pi-user icon"
              style="color: #3950CC"
          ></i>
          <div>Profile</div>
        </div>
      </div>
    </header>
    <main class="layout">
      <Button
          v-for="(item, i) in buttonsData"
          :key="i"
          :icon="item.icon"
          :label="item.label"
          :iconPos="item.iconPos"
          :class="item.class"
          @click="item.click"
      />
    </main>
    <!--    <button @click="getAllNAmes">Test</button>-->
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";
import tgHapticFeedback from "@/mixins/telegram/tgHapticFeedback";
import layoutHelper from "@/mixins/helpers/MainMenuView/layoutHelper";
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "Layout",
  mixins: [tgMixin, tgHapticFeedback, layoutHelper],
  methods: {
    showPopupAlert() {
      globalTelegram.showAlert('This feature would be added soon')
      this.hapticError()
    },
    // getAllNAmes() {
    //   this.$store.dispatch('GET_ALL_NAMES')
    // }
  },
  computed: {
    ...mapGetters(['name', 'balanceAmount']),
  },
  beforeMount() {
    this.$store.dispatch('CHECK_BALANCE')
        .then((res) => {
          this.$store.commit('setBalanceAmount', res.data.data.balance)
        })
        .catch((err) => {
          console.log(err)
        })
  },
  watch: {
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.p-button-lg').forEach(e => e.classList.add('p-button-lg-dark'))
          document.querySelectorAll('.header_icon').forEach(e => e.classList.add('header_icon_dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.p-button-lg-dark').forEach(e => e.classList.remove('p-button-lg-dark'))
          document.querySelectorAll('.header_icon_dark').forEach(e => e.classList.remove('header_icon_dark'))
        }
      },
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/MainMenuView/Layout';
</style>
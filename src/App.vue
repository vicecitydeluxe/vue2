<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
const globalTelegram = window.Telegram.WebApp;

export default {
  data() {
    return {
      darkModeSwitch: false,
    };
  },
  created() {
    globalTelegram.colorScheme === "light"
        ? this.darkModeSwitch = false
        : this.darkModeSwitch = true;
  },
  mounted() {
    if (this.darkModeSwitch) document.body.className = "dark"
    // comment next line to show Telegram and other warnings
    console.warn = () => {}
    globalTelegram.onEvent('themeChanged', () => {
      globalTelegram.colorScheme === "light"
          ? this.darkModeSwitch = false
          : this.darkModeSwitch = true;
    })
  },
  watch: {
    darkModeSwitch: {
      handler(newValue) {
        newValue
            ? document.body.className = "dark"
            : document.body.className = "light"
      },
    },
  },
};
</script>

<style lang="scss">
@import "/src/index.scss";
</style>

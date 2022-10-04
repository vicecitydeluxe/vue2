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
  mounted() {
    globalTelegram.onEvent('themeChanged', () => {
      console.log(globalTelegram.colorScheme)
      globalTelegram.colorScheme === "light" ? this.darkModeSwitch = false : this.darkModeSwitch = true;
    })
  },
  watch: {
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.body.className = "dark";
        } else if (!newValue) {
          document.body.className = "light";
        }
      },
    },
  },
};
</script>

<style lang="scss">
@import "/src/index.scss";
</style>

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
      globalTelegram: globalTelegram,
      darkModeSwitch: false,
    };
  },
  watch: {
    globalTelegram: {
      handler(newValue) {
        if (newValue.colorScheme === "light") {
          this.darkModeSwitch = false;
        } else if (newValue.colorScheme === "dark") {
          this.darkModeSwitch = true;
        }
      },
      deep: true,
    },
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

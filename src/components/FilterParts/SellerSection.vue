<template>
  <section class="container">
    <div class="container_top">
      <span class="container_title">#192 MegaSeller</span>
      <ToggleButton
          v-model="checked"
          onLabel="Include"
          offLabel="Exclude"
      />
    </div>
    <div class="container_bottom">
      <span>Rating: ++++-</span>
      <span> 5 lists, 4500 leads</span>
      <span>You bought5: 1 list, 1670 leads</span>
    </div>
  </section>
</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "SellerSection",
  data() {
    return {
      darkModeSwitch: false,
      checked: true,
    }
  },
  watch: {
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.container').forEach(e => e.classList.add('container_dark'))
          document.querySelectorAll('.container_title').forEach(e => e.classList.add('container_title_dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.container_dark').forEach(e => e.classList.remove('description_dark'))
          document.querySelectorAll('.container_title_dark').forEach(e => e.classList.remove('container_title_dark'))
        }
      },
    },
  },
  created() {
    globalTelegram.colorScheme === "light"
        ? this.darkModeSwitch = false
        : this.darkModeSwitch = true;
  },
  mounted() {
    globalTelegram.onEvent('themeChanged', () => {
      globalTelegram.colorScheme === "light"
          ? this.darkModeSwitch = false
          : this.darkModeSwitch = true;
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 15px;
  height: 140px;
  background: #F7F7FD;
  border-radius: 7px;
  margin-bottom: 25px;

  &_dark {
    padding: 15px;
    height: 140px;
    background: #32343A;
    border-radius: 7px;
    margin-bottom: 25px;
  }

  &_title {
    font-weight: 600;
    color: #495057;

    &_dark {
      font-weight: 600;
      color: white;
    }
  }

  &_top {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
  }

  &_bottom {
    display: flex;
    flex-direction: column;
  }
}
</style>
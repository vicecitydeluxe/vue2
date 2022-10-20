<template>
  <section class="container">
    <div class="container_top">
      <span class="container_title">#192 MegaSeller</span>
      <ToggleButton v-model="checked"
                    onLabel="Include"
                    offLabel="Exclude"/>
    </div>
    <div class="container_bottom">
      <span>Rating: ++++-</span>
      <span>#1829 CFD May 2022 depositors
        + deposit date + sales comments</span>
      <span>Funnel: Unknown</span>
      <span>include Upload date: 2022-09-16: 12:10</span>
      <span>Sold (fully or partially)7 times</span>
      <span>Matching leads/total: 15/570</span>
    </div>
  </section>

</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "ListSection",
  data() {
    return {
      darkModeSwitch: false,
      checked: true,
    }
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
  },
  watch: {
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.container').forEach(e => e.classList.add('container-dark'))
          document.querySelectorAll('.container_title').forEach(e => e.classList.add('container_title_dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.container-dark').forEach(e => e.classList.remove('container-dark'))
          document.querySelectorAll('.container_title_dark').forEach(e => e.classList.remove('container_title_dark'))
        }
      },
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 15px;
  height: 260px;
  background: #F7F7FD;
  border-radius: 7px;
  margin-bottom: 25px;

  &-dark {
    background: #32343A;
    color: white;
    padding: 15px;
    height: 260px;
    border-radius: 7px;
    margin-bottom: 25px;
  }

  &_title {
    font-weight: 600;
    color: #495057;

    &_dark {
      font-weight: 600;
      color: #ffffff;
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
    gap: 14px;
  }
}
</style>
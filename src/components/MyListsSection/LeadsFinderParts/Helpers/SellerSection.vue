<template>
  <section class="container">
    <div class="container_top">
      <span class="container_title">{{ name }}</span>
      <ToggleButton
          @change="checker"
          onLabel="Include"
          offLabel="Exclude"
          :value="checked"
      />
    </div>
    <div class="container_bottom">
      <span>Rating:{{ rating }}</span>
      <span> {{ lists }} lists, {{ leads }} leads</span>
      <span>You bought: {{ historyList }} list, {{ historyLeads }}leads</span>
    </div>
  </section>
</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "SellerSection",
  components: {
    ToggleButton: () => import ('primevue/togglebutton')
  },
  props: {
    name: {
      default: 'Unresolved name',
      type: String
    },
    rating: {
      default: 'Unresolved rating',
      type: String
    },
    lists: {
      default: 'Unresolved amount',
      type: String
    },
    leads: {
      default: 'Unresolved amount',
      type: String
    },
    historyList: {
      default: 'Unresolved amount',
      type: String
    },
    historyLeads: {
      default: 'Unresolved amount',
      type: String
    },
    checked: Boolean
  },
  data() {
    return {
      darkModeSwitch: false,
      checkedLocal: null
    }
  },
  computed: {
    checkAssigner() {
      this.checkedLocal = this.checked
    },
  },
  methods: {
    checker() {
      this.checked
          ? this.checkedLocal = false
          : this.checkedLocal = true
      this.$emit('checker', this.checkedLocal)
    },
  },
  watch: {
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.container').forEach(e => e.classList.add('container_dark'))
          document.querySelectorAll('.container_title').forEach(e => e.classList.add('container_title_dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.container_dark').forEach(e => e.classList.remove('container_dark'))
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
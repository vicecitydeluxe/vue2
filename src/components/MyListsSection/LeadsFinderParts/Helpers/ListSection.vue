<template>
  <section class="container">
    <div class="container_top">
      <span class="container_title">{{ name }}</span>
      <ToggleButton
          @change="checker()"
          onLabel="Include"
          offLabel="Exclude"
          :value="checked"
      />
    </div>
    <div class="container_bottom">
      <span>Rating:{{ rating }}</span>
      <span>{{ list }}</span>
      <span>Funnel: {{ funnel }}</span>
      <span>Upload date:{{ uploadDate }}</span>
      <span>Sold (fully or partially) {{ sold }} times</span>
      <span>Matching leads/total: {{ matching }}/ {{ total }}</span>
    </div>
  </section>

</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "ListSection",
  components: {
    ToggleButton: () => import ('primevue/togglebutton'),
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
    list: {
      default: 'List name unresolved',
      type: String
    },
    funnel: {
      default: 'Funnel unresolved',
      type: String
    },
    uploadDate: {
      default: 'Upload date unresolved',
      type: String
    },
    sold: {
      default: 'Unresolved amount',
      type: String
    },
    matching: {
      default: 'Unresolved amount',
      type: String
    },
    total: {
      default: 'Unresolved amount',
      type: String
    },
    checked: Boolean
  },
  data() {
    return {
      darkModeSwitch: false,
      checkedLocal: false
    }
  },
  methods: {
    checker() {
      this.checked
          ? this.checkedLocal = false
          : this.checkedLocal = true
      this.$emit('checker', this.checkedLocal)
    },
  },
  computed: {
    checkAssigner() {
      this.checkedLocal = this.checked
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
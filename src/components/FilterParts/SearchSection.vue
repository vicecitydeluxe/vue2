<template>
  <section class="container">
    <div class="container_section">
      <span class="container_title">{{ number }}</span>
      <Button
          label="Edit"
          @click="editList"
      />
    </div>
    <div class="container_bottom">
      <span>Upload date:{{ uploadDate }}</span>
      <div class="container_section">
        <span>{{ list }}</span>
        <Button
            label="Stats"
            v-if="status !=='Empty'"
            @click="statsList"
        />
      </div>
      <span>Leads: {{ leads }} </span>
      <div class="container_section">
        <span>Leads Price: {{ leadsPrice }}</span>
        <Button
            label="Change status"
            v-if="status !=='Empty'"
            @click="changeStatusList"
        />
      </div>
      <span>Status: <b>{{ status }}</b></span>
    </div>
  </section>

</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "ListSection",
  props: {
    number: {
      default: '#0',
      type: String
    },
    list: {
      default: 'List Example',
      type: String
    },
    uploadDate: {
      default: '22.11.2022',
      type: String
    },
    leads: {
      default: '0',
      type: String
    },
    leadsPrice: {
      default: '0',
      type: String
    },
    status: {
      default: 'Empty (no leads uploaded)',
      type: String
    },
  },
  data() {
    return {
      darkModeSwitch: false,
      itemId: null
    }
  },
  methods: {
    editList() {
      this.$emit('edit', this.itemId)
      this.$router.push({name: 'uploadLayout'})
    },
    statsList() {
      this.$emit('stats', this.itemId)
      this.$router.push({name: 'analyzer'})
    },
    changeStatusList() {
      this.$emit('status', this.itemId)
      this.$router.push({name: 'status-changer'})
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
    number: {
      handler(newValue) {
        this.itemId = newValue
      }, immediate: true
    },
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
  height: 250px;
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

  &_section {
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
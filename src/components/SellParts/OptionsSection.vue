<template>
  <section class="container">
    <div class="container_bottom">
      <!--      <span><strong>Vertical:</strong> CFD/Crypto </span>-->
      <!--      <span><strong>Funnel type:</strong> Unknown,Education</span>-->
      <span><strong>Type: </strong>{{ globalSelectedType }}</span>
      <span style="word-wrap: break-word;"><strong>Countries: </strong> {{ globalSelectedCountries.join(',') }}</span>
      <span><strong>Registration date: </strong>{{ globalRegdateSelected }} </span>
      <span v-if="globalExtraLeadsChecker">Exclude leads I bought or already have</span>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";

const globalTelegram = window.Telegram.WebApp;

export default {
  name: "OptionsSection",
  data() {
    return {
      darkModeSwitch: false,
    }
  },
  computed: {
    ...mapGetters([
      'globalSelectedType',
      'globalSelectedCountries',
      'globalRegdateSelected',
      'globalExtraLeadsChecker',
    ]),
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
          document.querySelectorAll('.container').forEach(e => e.classList.add('container_dark'))
        } else if (!newValue) {
          document.querySelectorAll('.container_dark').forEach(e => e.classList.remove('container_dark'))
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 15px;
  background: #f7f7fd;
  border-radius: 7px;
  margin-bottom: 25px;
  margin-top: 15px;

  &_dark {
    padding: 15px;
    color: white;
    background: #32343A;
    border-radius: 7px;
    margin-bottom: 25px;
    margin-top: 15px;
  }

  &_bottom {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
</style>
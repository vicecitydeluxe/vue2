<template>
  <div class="header">
    <header class="header_section">
      <h3>COUNTRY MAPPING</h3>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <hr class="name_divider">
      <div class="section_divider">File: {{ fileName }}</div>
      <div class="description">Unknown countries have been found.
        Map them.</div>
      <div class="map_container"><h5>IRLA</h5>
        <Dropdown :class="[ darkModeSwitch ? 'dropdown_dark' : 'dropdown']"
                  v-model="selectedCountry"
                  placeholder="Ireland"
                  :options="countries"
                  optionLabel="name"/>
      </div>
      <div class="map_container"><h5>UK</h5>
        <Dropdown :class="[ darkModeSwitch ? 'dropdown_dark' : 'dropdown']"
                  v-model="selectedCountry"
                  placeholder="GB"
                  :options="countries"
                  optionLabel="name"/>
      </div>
      <div class="description">This is the final step
        which will load leads to the DB.</div>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import tgMixin from "@/mixins/tgMixin";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "CountryMapper",
  mixins: [tgMixin],
  data() {
    return {
      selectedCountry: null,
      countries: [
        {name: 'Ireland'},
        {name: 'AnotherGreatCountry'},
      ],
    }
  },
  methods: {
    redirectCb() {
      this.$router.push({name: 'mapper'})
    },
    actionCb() {
      if (this.$route.path === '/country-mapper') this.$router.push({name: 'spinner'})
    }
  },
  computed: {
    ...mapGetters(['listName', "fileName"]),
  },
  watch: {
    selectedCountry: {
      handler(newValue) {
        if (newValue) {
          globalTelegram.MainButton.setText('Create leads')
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
        }
      },
    },
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.description').forEach(e => e.classList.add('description_dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.description_dark').forEach(e => e.classList.remove('description_dark'))
        }
      },
    },
  },
  mounted() {
    globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/CountryMapper.scss';
</style>
<template>
  <div class="header">
    <header class="header_section">
      <h3>COUNTRY MAPPING</h3>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <hr class="name_divider">
      <div class="section_divider">File: {{ fileName }}</div>
      <div class="description">Unknown countries have been found. Map them.</div>
      <div class="map_container"><h5>IRLA</h5>
        <Dropdown class="dropdown" v-model="selectedCountry" placeholder="Ireland" :options="countries"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container"><h5>UK</h5>
        <Dropdown class="dropdown" v-model="selectedCountry" placeholder="GB" :options="countries"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="description">This is the final step which will load leads to the DB.</div>
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
              .onClick(() => {
                if (this.$route.path === '/country-mapper') this.$router.push({name: 'spinner'}
                )
              })
        }
      },
    },
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.description').forEach(e => e.classList.replace('description', 'description_dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.description_dark').forEach(e => e.classList.replace('description_dark', 'description'))
        }
      },
    },
  },
  mounted() {
    globalTelegram.BackButton.show().onClick(() => this.$router.push({name: 'mapper'}))
  },
  beforeDestroy() {
    globalTelegram.BackButton.hide().offClick(() => this.$router.push({name: 'mapper'}))
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/CountryMapper.scss';
</style>
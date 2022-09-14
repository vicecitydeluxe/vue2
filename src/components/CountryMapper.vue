<template>
  <div>
    <header class="header">
      <h3>Country mapping</h3>
      <Button icon="pi pi-times" class="p-button-rounded p-button-help p-button-text"
              @click="$router.push({name:'mapper'})"/>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <div>File: {{ fileName }}</div>
      <hr>
      <div>Unknown countries have been found. Map them.</div>
      <div class="map_container"><h5>IRLA</h5>
        <Dropdown class="dropdown" v-model="selectedCountry" placeholder="Ireland" :options="countries"
                  optionLabel="name"></Dropdown>
      </div>
      <div class="map_container"><h5>UK</h5>
        <Dropdown class="dropdown" v-model="selectedCountry" placeholder="GB" :options="countries"
                  optionLabel="name"></Dropdown>
      </div>
      <div>This is the final step which will load leads to the DB.</div>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "CountryMapper",
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
              .show()
              .onClick(() => {
                if (this.$route.path === '/country-mapper') this.$router.push({name: 'layout'}
                )
              })
        }
      },
    }
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.hide()
  },
}
</script>

<style scoped>
@import '../styles/CountryMapper.scss';
</style>
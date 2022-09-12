<template>
  <div>
    <header class="header">
      <h3>Column mapping</h3>
      <Button icon="pi pi-times" class="p-button-rounded p-button-help p-button-text"
              @click="$router.push({name:'uploader'})"/>
    </header>
    <main>
      <div>List: {{ listName }}</div>
      <div>File: {{ fileName }}</div>
      <div class="description">Please map the required columns. You can import either full name or first+last name.</div>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "Mapper",
  computed: {
    ...mapGetters(['listName', "fileName"]),
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.hide()
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/Mapper.scss';
</style>
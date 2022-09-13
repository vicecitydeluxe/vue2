<template>
  <div>
    <header class="header">
      <h3>New list</h3>
      <Button icon="pi pi-times" class="p-button-rounded p-button-help p-button-text"
              @click="$router.push({name:'layout'})"/>
    </header>
    <main>
      <h6>List name (visible to you)</h6>
      <InputText @keyup="updateListName" :class="[validListName ? 'p-inputtext ' : 'p-invalid']" type="text"
                 v-model="listName"></InputText>
      <small v-if="!validListName" class="p-error">Min 5 characters required</small>

      <h6>List description (visible to buyers)</h6>
      <InputText :class="[validListDescription ? 'p-inputtext ' : 'p-invalid']" type="text"
                 v-model="listDescription"></InputText>
      <small v-if="!validListDescription" class="p-error">Min 5 characters required</small>

      <h6>Vertical</h6>
      <Dropdown v-model="selectedCrypto" placeholder="Select a crypto" :options="cryptoPairs"
                optionLabel="name"></Dropdown>
      <h6>Type</h6>
      <Button label="Registrations" iconPos="left" class="p-button-lg"/>
      <Button label="Depositors" iconPos="left" class="p-button-lg"/>
      <Button label="Unknown" iconPos="left" class="p-button-lg"/>
      <h6>Funnel type</h6>
      <Dropdown v-model="selectedFunnel" placeholder="Unknown" :options="funnels"
                optionLabel="name"></Dropdown>
      <h6 v-if="validUploadButton">Upload list:</h6>
      <!--      <Button :disabled="!validUploadButton" @click="$router.push({name: 'uploader'})">Hit me!</Button>-->
    </main>
  </div>
</template>

<script>
const globalTelegram = window.Telegram.WebApp

export default {
  name: "UploadLayout",
  data() {
    return {
      listName: 'CM DE May 2022 depositors',
      listDescription: 'CFD May 2022 depositors',
      selectedCrypto: null,
      selectedFunnel: null,
      cryptoPairs: [
        {name: 'Bitcoin'},
        {name: 'USDT'},
        {name: 'Ethereum',},
        {name: 'Shiba',},
        {name: 'Luna',}
      ],
      funnels: [
        {name: 'Some'},
        {name: 'Random'},
        {name: 'Data'},
      ]
    }
  },
  methods: {
    updateListName() {
      this.$store.commit('setListName', this.listName)
    }
  },
  computed: {
    //validation including spaces !
    validListName() {
      return /[0-9a-zA-Z_ ]{5,}/.test(this.listName)
    },
    validListDescription() {
      return /[0-9a-zA-Z_ ]{5,}/.test(this.listDescription)
    },
    validUploadButton() {
      return !!(this.validListName && this.validListDescription && this.selectedCrypto && this.selectedFunnel);
    },
  },
  watch: {
    validUploadButton: {
      handler(newValue, oldValue) {
        if (newValue) {
          globalTelegram.MainButton.setText('Create a list')
              .show()
              .onClick(() => {
                if (this.$route.path === '/upload-layout') this.$router.push({name: 'uploader'}
                )
              })
        } else if (oldValue) globalTelegram.MainButton.hide()
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

<style lang="scss" scoped>
@import '../styles/UploadLayout.scss';
</style>
<template>
  <div class="header">
    <header class="header_section">
      <h3>NEW LIST</h3>
    </header>
    <main>
      <h6>List name (visible to you)</h6>
      <InputText enterkeyhint="enter"
                 @keyup="updateListName"
                 :class="[validListName ? 'p-input_text ' : 'p-invalid']"
                 type="text"
                 v-model="listName"></InputText>
      <small v-if="!validListName" class="p-error">Min 5 characters required</small>

      <h6>List description (visible to buyers)</h6>
      <InputText enterkeyhint="enter"
                 :class="[validListDescription ? 'p-input_text ' : 'p-invalid']"
                 type="text"
                 v-model="listDescription"></InputText>
      <small v-if="!validListDescription" class="p-error">Min 5 characters required</small>

      <h6>Vertical</h6>
      <Dropdown :class="[ darkModeSwitch ? 'dropdown_dark' : '']"
                v-model="selectedCrypto" placeholder="Select a crypto"
                :options="cryptoPairs"
                optionLabel="name"></Dropdown>
      <h6>Type</h6>
      <div class="button_container">
        <button class="btn_left">Registrations</button>
        <button class="btn_middle">Depositors</button>
        <button class="btn_right">Unknown</button>
      </div>

      <h6>Funnel type</h6>
      <Dropdown :class="[ darkModeSwitch ? 'dropdown_dark' : '']"
                v-model="selectedFunnel" placeholder="Unknown"
                :options="funnels"
                optionLabel="name"></Dropdown>
    </main>
<!--        <button @click="sendList">SENDDDDD</button>-->
  </div>
</template>

<script>
import tgMixin from "@/mixins/tgMixin";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "UploadLayout",
  mixins: [tgMixin],
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
    redirectCb() {
      this.$router.push({name: 'layout'})
    },
    actionCb() {
      if (this.$route.path === '/upload-layout') {
        this.sendList()
        this.$router.push({name: 'uploader'})
      }
    },
    updateListName() {
      this.$store.commit('setListName', this.listName)
    },
    sendList() {
      const obj = {
        name: this.listName,
        filename: this.listDescription,
        vertical: this.selectedCrypto?.name,
        funnel_type: this.selectedFunnel?.name,
        type: 'Unknown'
      }
      this.$store.dispatch('SEND_LIST', obj)
          .then(() => {
            // console.log(res)
          })
          .catch((err) => console.log(err))
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
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
        } else if (oldValue) globalTelegram.MainButton.hide()
      },
    },
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.p-fluid').forEach(e => e.classList.add('p-fluid-dark'))
          document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
          document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
          document.querySelectorAll('.p-inputwrapper-focus').forEach(e => e.classList.add('p-inputwrapper-focus-dark'))
          document.querySelectorAll('.p-inputwrapper-filled').forEach(e => e.classList.add('p-inputwrapper-filled-dark'))
          document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
          document.querySelectorAll('.btn_left').forEach(e => e.classList.add('btn_left_dark'))
          document.querySelectorAll('.btn_middle').forEach(e => e.classList.add('btn_middle_dark'))
          document.querySelectorAll('.btn_right').forEach(e => e.classList.add('btn_right_dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.p-fluid-dark').forEach(e => e.classList.remove('p-fluid-dark'))
          document.querySelectorAll('.p-inputtext-dark').forEach(e => e.classList.remove('p-inputtext-dark'))
          document.querySelectorAll('.p-filled-dark').forEach(e => e.classList.remove('p-filled-dark'))
          document.querySelectorAll('.p-inputwrapper-focus-dark').forEach(e => e.classList.remove('p-inputwrapper-focus-dark'))
          document.querySelectorAll('.p-inputwrapper-filled-dark').forEach(e => e.classList.remove('p-inputwrapper-filled-dark'))
          document.querySelectorAll('.p-component-dark').forEach(e => e.classList.remove('p-component-dark'))
          document.querySelectorAll('.btn_left_dark').forEach(e => e.classList.remove('btn_left_dark'))
          document.querySelectorAll('.btn_middle_dark').forEach(e => e.classList.remove('btn_middle_dark'))
          document.querySelectorAll('.btn_right_dark').forEach(e => e.classList.remove('btn_right_dark'))
        }
      },
    },
    listName: {
      handler(newValue) {
        if (newValue.length < 5 && newValue.length !== 0 && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.add('p-invalid-dark'))
          }, 0)
        } else if (!newValue.length && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.add('p-invalid-dark'))
          }, 0)
        } else if (newValue.length >= 5 && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.add('p-invalid-dark'))
          }, 0)
        }
      },
      deep: true
    },
    listDescription: {
      handler(newValue) {
        if (newValue.length < 5 && newValue.length !== 0 && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.add('p-invalid-dark'))
          }, 0)
        } else if (!newValue.length && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.add('p-invalid-dark'))
          }, 0)
        } else if (newValue.length >= 5 && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.add('p-invalid-dark'))
          }, 0)
        }
      },
      deep: true
    },
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
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
@import '../styles/UploadLayout.scss';
</style>
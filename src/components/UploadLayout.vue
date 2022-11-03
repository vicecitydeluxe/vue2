<template>
  <div class="header">
    <Button
        @click="actionCb"
    >TESTY</Button>
    <header class="header_section">
      <h3>NEW LIST</h3>
    </header>
    <main>
      <h6>List name (visible to you)</h6>
      <InputText
          enterkeyhint="enter"
          @keyup="updateListName"
          :class="[validListName
          ? 'p-input_text '
          : 'p-invalid']"
          type="text"
          v-model="listName"
      />
      <small v-if="!validListName"
             class="p-error">Min 5 characters required</small>

      <h6>List description (visible to buyers)</h6>
      <InputText
          enterkeyhint="enter"
          :class="[validListDescription
          ? 'p-input_text '
          : 'p-invalid']"
          type="text"
          v-model="listDescription"
      />
      <small v-if="!validListDescription"
             class="p-error">Min 5 characters required</small>

      <h6>Vertical</h6>
      <Dropdown
          :disabled="!respondSuccess"
          :class="[ darkModeSwitch
          ? 'dropdown_dark'
          : '']"
          v-model="selectedCrypto"
          placeholder="Select a crypto"
          :options="cryptoPairs"
          optionLabel="name"
          @change="updateVertical"
          @before-show="toggleDarkDropdown"
      />
      <h6>Type</h6>
      <div class="button_container">
        <button class="btn_left">Registrations</button>
        <button class="btn_middle">Depositors</button>
        <button class="btn_right">Unknown</button>
      </div>

      <h6>Funnel type</h6>
      <Dropdown
          :disabled="!respondSuccess"
          :class="[ darkModeSwitch
          ? 'dropdown_dark'
          : '']"
          v-model="selectedFunnel"
          placeholder="Unknown"
          :options="funnels"
          optionLabel="name"
          @change="updateFunnels"
          @before-show="toggleDarkDropdown"
      />
    </main>
    <!--    <button @click="sendList">Test</button>-->
    <Toast position="bottom-center"/>
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";
import toastWarn from "@/mixins/helpers/toastWarn";
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "UploadLayout",
  mixins: [tgMixin, toastWarn],
  data() {
    return {
      darkDropdown: 0,
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
    toggleDarkDropdown() {
      this.darkDropdown++
    },
    getaAllLists() {
      this.$store.dispatch('GET_ALL_LISTS')
          .then((res) => {
            if (res.data.error === 'NOT_FOUND' || res.data.error === 'FORBIDDEN') {
              console.log(res.data.error)
              setTimeout(() => {
                this.showWarnToast()
              }, 2000)
            } else {
              this.respondSuccess = true
              const lastListAdded = this.allLists[this.allLists.length - 1]
              this.listName = lastListAdded.name
              this.updateListName()
              this.listDescription = lastListAdded.filename
              this.$store.commit('setFileName', this.listDescription)
              this.$toast.add({
                severity: 'info',
                summary: 'Notification',
                detail: 'Last session list name was restored!',
                life: 2500
              });
            }
          })
          .catch((err) => {
            console.log(err)
          })
    },
    redirectCb() {
      this.$router.push({name: 'layout'})
    },
    actionCb() {
      if (this.$route.path === '/upload-layout') this.sendList()
    },
    updateListName() {
      this.$store.commit('setListName', this.listName)
    },
    updateFunnels() {
      this.$store.commit('setFunnelType', this.selectedFunnel.name)
    },
    updateVertical() {
      this.$store.commit('setVertical', this.selectedCrypto.name)
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
          .then((res) => {
            if (res.data.error === 'ALREADY_EXISTED_LIST_NAME') {
              this.$toast.add({
                severity: 'info',
                summary: 'Notification',
                detail: 'This name is already exists, try another one!',
                life: 2500
              });
            } else this.$router.push({name: 'uploader'})
          })
          .catch((err) => {
            this.showWarnToast()
            setTimeout(() => {
              this.$router.push({name: 'layout'})
            }, 3000)
            console.log(err)
          })
    },
  },
  computed: {
    ...mapGetters(['allLists']),
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
    darkDropdown: {
      handler() {
        if (this.darkDropdown && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
            document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
            document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
            document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
          }, 0)
        }
      }, deep: true
    },
    $data: {
      handler() {
        if (this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
            document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
            document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
            document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
          }, 0)
        }
      }, deep: true
    },
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
          document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
          document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
          document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
          document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
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
          const darkStylesSelectors = ['p-placeholder_dark', 'pi-chevron-down_dark',
            'p-dropdown-item_dark', 'p-highlight_dark', 'p-inputtext_dark',
            'btn_left_dark', 'btn_middle_dark', 'btn_right_dark']
          const darkStyles = ['p-fluid-dark', 'p-inputtext-dark',
            'p-filled-dark', 'p-inputwrapper-focus-dark',
            'p-inputwrapper-filled-dark', 'p-component-dark'
          ]
          document.querySelectorAll('[class*="_dark"]')
              .forEach(e => e.classList.remove(...darkStylesSelectors))
          document.querySelectorAll('[class*="-dark"]')
              .forEach(e => e.classList.remove(...darkStyles))
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
  beforeMount() {
    this.getaAllLists()
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
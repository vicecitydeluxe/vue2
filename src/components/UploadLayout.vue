<template>
  <div class="header">
    <!--    <Button-->
    <!--        @click="actionCb"-->
    <!--    >TESTY</Button>-->
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
          :class="[ darkModeSwitch
          ? 'dropdown_dark'
          : '']"
          v-model="selectedVertical"
          placeholder="CFD/Crypto"
          :options="vertical"
          @change="updateVertical"
          @before-show="toggleDarkDropdown"
      />
      <h6>Type</h6>
      <div class="button_container">
        <SelectButton
            class="select_button"
            :options="types"
            v-model="selectedType"
        />
      </div>
      <h6>Funnel type</h6>
      <Dropdown
          :class="[ darkModeSwitch
          ? 'dropdown_dark'
          : '']"
          v-model="selectedFunnel"
          placeholder="Unknown "
          :options="funnels"
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
import uploadLayoutHandler from "@/mixins/styleHandlers/uploadLayoutHandler";
import {mapGetters} from 'vuex'

const globalTelegram = window.Telegram.WebApp

export default {
  name: "UploadLayout",
  mixins: [tgMixin, uploadLayoutHandler],
  data() {
    return {
      darkDropdown: 0,
      listName: 'CM DE May 2022 depositors',
      listDescription: 'CFD May 2022 depositors',
      selectedVertical: null,
      selectedFunnel: null,
      selectedType: null,
      vertical: [
        '* CFD',
        '* Crypto',
      ],
      funnels: [
        'Education',
        'How to make money',
        'Unknown'
      ],
      types: [
        'Registrations',
        'Depositors',
        'Unknown'
      ],
      prevRoute: ''
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
      this.$store.commit('setFunnelType', this.selectedFunnel)
    },
    updateVertical() {
      this.$store.commit('setVertical', this.selectedVertical)
    },
    sendList() {
      const obj = {
        name: this.listName,
        filename: this.listDescription,
        vertical: this.selectedVertical,
        funnel_type: this.selectedFunnel,
        type: this.selectedType
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
      return /^.{5,}$/.test(this.listName)
    },
    validListDescription() {
      return /^.{5,}$/.test(this.listDescription)
    },
    validUploadButton() {
      return !!(this.validListName && this.validListDescription && this.selectedVertical && this.selectedFunnel);
    },
  },
  watch: {
    darkDropdown: {
      handler() {
        if (this.darkDropdown && this.darkModeSwitch) {
          this.dropdownHandler()
        }
      }, deep: true
    },
    $data: {
      handler() {
        if (this.darkModeSwitch) {
          this.dataHandler()
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
          this.switchHandler()
        }
        if (!newValue) {
          this.switchRemover()
        }
      },
    },
    listName: {
      handler(newValue) {
        if (newValue.length < 5 && newValue.length !== 0 && this.darkModeSwitch) {
          this.listHandler()
        } else if (!newValue.length && this.darkModeSwitch) {
          this.listHandler()
        } else if (newValue.length >= 5 && this.darkModeSwitch) {
          this.listHandler()
        }
      },
      deep: true
    },
    listDescription: {
      handler(newValue) {
        if (newValue.length < 5 && newValue.length !== 0 && this.darkModeSwitch) {
          this.listHandler()
        } else if (!newValue.length && this.darkModeSwitch) {
          this.listHandler()
        } else if (newValue.length >= 5 && this.darkModeSwitch) {
          this.listHandler()
        }
      },
      deep: true
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.$data.prevRoute = from.fullPath)
  },
  mounted() {
    if (this.prevRoute === "/") this.getaAllLists()
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
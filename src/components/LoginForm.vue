<template>
  <div class="form-demo" v-if="showComponent">
    <div class="p-d-flex p-jc-center">
      <div class="card">
        <h5 class="p-text-center">Hi, {{ userInfo.tgNickname }}!</h5>
        <form class="p-fluid">
          <div class="p-field">
            <div class="p-float-label">
              <InputText id="name" v-model="userInfo.username" @keyup="updateUsername"
                         :class="[validInput ? 'p-inputtext ' : 'p-invalid']"
              />
              <label for="name">You may choose alternative
                username*</label>
            </div>
            <small v-if="!validInput" class="p-error">Min 5 characters required</small>
          </div>
          <Button :disabled='!isDisabledButton' @click="setUserName" type="button" label="Register"
                  class="p-mt-2"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import tgMixin from "@/mixins/tgMixin";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "LoginForm",
  mixins: [tgMixin],
  data() {
    return {
      showComponent: false,
      userInfo: {
        username: '',
        tgNickname: '',
        tgID: '',
      },
    }
  },
  created() {
    globalTelegram.ready()
  },
  beforeMount() {
    this.userInfo.username = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.username : 'Unknown_user'
    this.userInfo.tgNickname = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.username : 'Unknown_user'
    this.userInfo.tgID = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.id : '000000000'
    this.$store.commit('setName', this.userInfo.username)

    this.$store.dispatch('CHECK_NAME')
        .then((res) => {
          if (res.data.status === 200) {
            this.$router.push({name: 'layout'})
          } else if (res.data.status === 400) {
            this.showComponent = true
          }
        })
        .catch((err) => {
          console.log(`ERR: ${err}`)
        })
  },
  methods: {
    updateUsername() {
      this.$store.commit('setName', this.userInfo.username)
    },
    setUserName() {
      this.$store.dispatch('SEND_NAME', this.userInfo.username)
      this.$router.push({name: 'layout'})
    },
  },
  computed: {
    validInput() {
      return /[0-9a-zA-Z_]{5,}/.test(this.userInfo.username)
    },
    isDisabledButton() {
      return this.validInput && this.userInfo.username
    }
  },
  watch: {
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.p-fluid').forEach(e => e.classList.replace('p-fluid', 'p-fluid-dark'))
          document.querySelectorAll('.p-inputtext').forEach(e => e.classList.replace('p-inputtext', 'p-inputtext-dark'))
          document.querySelectorAll('.p-float-label').forEach(e => e.classList.replace('p-float-label', 'p-float-label-dark'))
          document.querySelectorAll('.p-filled').forEach(e => e.classList.replace('p-filled', 'p-filled-dark'))
          document.querySelectorAll('.p-inputwrapper-focus').forEach(e => e.classList.replace('p-inputwrapper-focus', 'p-inputwrapper-focus-dark'))
          document.querySelectorAll('.p-inputwrapper-filled').forEach(e => e.classList.replace('p-inputwrapper-filled', 'p-inputwrapper-filled-dark'))
          document.querySelectorAll('.p-button').forEach(e => e.classList.replace('p-button', 'p-button-dark'))
          document.querySelectorAll('.p-component').forEach(e => e.classList.replace('p-component', 'p-component-dark'))
        }
        if (!newValue) {
          document.querySelectorAll('.p-fluid-dark').forEach(e => e.classList.replace('p-fluid-dark', 'p-fluid'))
          document.querySelectorAll('.p-inputtext-dark').forEach(e => e.classList.replace('p-inputtext-dark', 'p-inputtext'))
          document.querySelectorAll('.p-float-label-dark').forEach(e => e.classList.replace('p-float-label-dark', 'p-float-label'))
          document.querySelectorAll('.p-filled-dark').forEach(e => e.classList.replace('p-filled-dark', 'p-filled'))
          document.querySelectorAll('.p-inputwrapper-focus-dark').forEach(e => e.classList.replace('p-inputwrapper-focus-dark', 'p-inputwrapper-focus'))
          document.querySelectorAll('.p-inputwrapper-filled-dark').forEach(e => e.classList.replace('p-inputwrapper-filled-dark', 'p-inputwrapper-filled'))
          document.querySelectorAll('.p-button-dark').forEach(e => e.classList.replace('p-button-dark', 'p-button'))
          document.querySelectorAll('.p-component-dark').forEach(e => e.classList.replace('p-component-dark', 'p-component'))
        }
      },
    },
    userInfo: {
      handler(newValue) {
        if (newValue.username.length < 5 && newValue.username.length !== 0 && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.replace('p-inputtext', 'p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.replace('p-component', 'p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.replace('p-filled', 'p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.replace('p-invalid', 'p-invalid-dark'))
          }, 0)
        } else if (!newValue.username.length && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.replace('p-inputtext', 'p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.replace('p-component', 'p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.replace('p-filled', 'p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.replace('p-invalid', 'p-invalid-dark'))
          }, 0)
        } else if (newValue.username.length >= 5 && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.replace('p-inputtext', 'p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.replace('p-component', 'p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.replace('p-filled', 'p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.replace('p-invalid', 'p-invalid-dark'))
          }, 0)
        }
      },
      deep: true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/LoginForm.scss';
</style>

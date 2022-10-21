<template>
  <div class="form-demo" v-if="showComponent">
    <div class="p-d-flex p-jc-center">
      <div class="card">
        <h5 class="p-text-center">Hi, {{ userInfo.tgNickname }}!</h5>
        <form class="p-fluid">
          <div class="p-field">
            <div class="p-float-label">
              <InputText
                  id="name"
                  v-model="userInfo.username"
                  @keyup="updateUsername"
                  :class="[validInput ? 'p-inputtext ' : 'p-invalid']"
              />
              <label for="name">You may choose alternative
                username*</label>
            </div>
            <small v-if="!validInput"
                   class="p-error">Min 5 characters required</small>
          </div>
          <Button
              :disabled='!isDisabledButton || !respondSuccess'
              @click="setUserName"
              type="button"
              label="Register"
              class="p-mt-2"
          />
        </form>
      </div>
    </div>
    <Toast position="bottom-center"/>
  </div>
</template>

<script>
import tgMixin from "@/mixins/tgMixin";
import toastWarn from "@/mixins/toastWarn";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "LoginForm",
  mixins: [tgMixin, toastWarn],
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
          if (res.data.status === 200 || res.data?.error === 'ALREADY_REGISTERED') {
            this.respondSuccess = true
            this.$router.push({name: 'layout'})
          } else if ((res.data.status === 400 && res.data.error === 'NOT_REGISTERED') || res.data.error === 'NOT_STARTED') {
            this.respondSuccess = true
            this.showComponent = true
          } else {
            this.showComponent = true
          }
        })
        .catch((err) => {
          this.showComponent = true
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
          document.querySelectorAll('.p-fluid').forEach(e => e.classList.add('p-fluid-dark'))
          document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
          document.querySelectorAll('.p-float-label').forEach(e => e.classList.add('p-float-label-dark'))
          document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
          document.querySelectorAll('.p-inputwrapper-focus').forEach(e => e.classList.add('p-inputwrapper-focus-dark'))
          document.querySelectorAll('.p-inputwrapper-filled').forEach(e => e.classList.add('p-inputwrapper-filled-dark'))
          document.querySelectorAll('.p-button').forEach(e => e.classList.add('p-button-dark'))
          document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
        }
        if (!newValue) {
          const darkStylesSelectors = ['p-fluid-dark', 'p-inputtext-dark',
            'p-float-label-dark', 'p-filled-dark',
            'p-inputwrapper-focus-dark', 'p-inputwrapper-filled-dark',
            'p-button-dark', 'p-component-dark']
          document.querySelectorAll('[class*="-dark"]')
              .forEach(e => e.classList.remove(...darkStylesSelectors))
        }
      },
    },
    userInfo: {
      handler(newValue) {
        if (newValue.username.length < 5 && newValue.username.length !== 0 && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.add('p-invalid-dark'))
          }, 0)
        } else if (!newValue.username.length && this.darkModeSwitch) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.add('p-invalid-dark'))
          }, 0)
        } else if (newValue.username.length >= 5 && this.darkModeSwitch) {
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
}
</script>

<style lang="scss" scoped>
@import '../styles/LoginForm.scss';
</style>

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
                  :class="[validInput
                  ? 'p-inputtext '
                  : 'p-invalid']"
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
import tgMixin from "@/mixins/telegram/tgMixin";
import toastWarn from "@/mixins/helpers/toastWarn";
import loginFormHandler from "@/mixins/styleHandlers/loginFormHandler";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "LoginForm",
  mixins: [tgMixin, toastWarn, loginFormHandler],
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
  //TODO async logic
  mounted() {
    if (this.darkModeSwitch) setTimeout(() => {
      this.darkModeMaker()
    }, 1600)
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
      return /^.{5,}$/.test(this.userInfo.username)
    },
    isDisabledButton() {
      return this.validInput && this.userInfo.username
    },
  },
  watch: {
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
    userInfo: {
      handler(newValue) {
        if (newValue.username.length < 5 && newValue.username.length !== 0 && this.darkModeSwitch) {
          this.dataHandler()
        } else if (!newValue.username.length && this.darkModeSwitch) {
          this.dataHandler()
        } else if (newValue.username.length >= 5 && this.darkModeSwitch) {
          this.dataHandler()
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

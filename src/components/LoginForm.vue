<template>
  <div class="form-demo">
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
const globalTelegram = window.Telegram.WebApp

export default {
  name: "LoginForm",
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
  beforeCreate() {
    globalTelegram.ready()
  },
  beforeMount() {
    //TODO fix validation scenario
    this.userInfo.username = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.username : 'Unknown_user'
    this.userInfo.tgNickname = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.username : 'Unknown_user'
    this.userInfo.tgID = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.id : '000000000'
    this.$store.commit('setName', this.userInfo.username)
    // this.$store.dispatch('SEND_NAME', this.userInfo.tgNickname)
    //     .then((res) => {
    //       if (res.data.data.tgUserId === this.userInfo.tgID) this.$router.push({name: 'layout'})
    //       else this.showComponent = true
    //     })
    //     .catch((err) => {
    //       this.showComponent = true
    //       console.log(err)
    //     })
  },
  mounted() {
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
    globalTelegram.MainButton.hide()
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
  // watch: {
  //   userInfo: {
  //     handler(newValue) {
  //       localStorage.setItem("userInfo", JSON.stringify(newValue));
  //     },
  //     deep: true
  //   }
  // },
}
</script>

<style lang="scss" scoped>
@import '../styles/LoginForm.scss';
</style>

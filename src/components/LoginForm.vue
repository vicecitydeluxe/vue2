<template>
  <div class="form-demo">
    <div class="p-d-flex p-jc-center">
      <div class="card">
        <h5 class="p-text-center">Hi, {{ userInfo.tgNickname }}!</h5>
        <form @submit.prevent="resetForm" class="p-fluid">
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
          <Button :disabled='!isDisabledButton' type="submit" label="Register" class="p-mt-2"/>
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
      userInfo: {
        username: '',
        tgNickname: '',
        tgID: '',
      },
    }
  },
  beforeCreate() {
    globalTelegram.ready()
    globalTelegram.expand()
    globalTelegram.enableClosingConfirmation()
  },
  mounted() {
    this.userInfo.username = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.username : 'Unknown_user'
    this.userInfo.tgNickname = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.username : 'Unknown_user'
    this.userInfo.tgID = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.id : '000000000'
    this.$store.commit('setName', this.userInfo.username)

    // this.$watch('$data.userInfo.username', function (newVal) {
    //   console.log(newVal)}, {deep: true})

    //if(this.userInfo.tgID === JSON.parse(localStorage.getItem("userInfo")).tgID)
  },
  methods: {
    resetForm() {
      this.$parent.layoutVisible = true
      this.userInfo.username = ''
    },
    updateUsername() {
      this.$store.commit('setName', this.userInfo.username)
    }
  },
  computed: {
    validInput() {
      return /[0-9a-zA-Z]{5,}/.test(this.userInfo.username)
    },
    isDisabledButton() {
      return this.validInput && this.userInfo.username
    }
  },
  watch: {
    userInfo: {
      handler(newValue) {
        localStorage.setItem("userInfo", JSON.stringify(newValue));
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.form-demo {
  .card {
    min-width: 250px;

    form {
      margin-top: 2rem;
    }

    .p-field {
      margin-bottom: 2rem;
    }
  }

  .p-text-center {
    display: flex;
    justify-content: space-around;
  }

  @media screen and (max-width: 960px) {
    .card {
      width: 95%;
    }
  }
}
</style>

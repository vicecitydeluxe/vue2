<template>
  <div class="form-demo">
    <div class="p-d-flex p-jc-center">
      <div class="card">
        <h5 class="p-text-center">Hi, {{ userInfo.tgNickname }}!</h5>
        <form @submit.prevent="resetForm" class="p-fluid">
          <div class="p-field">
            <div class="p-float-label">
              <InputText id="name" v-model="userInfo.username" @keyup="updateUsername"/>
              <label for="name">You may choose alternative
                username*</label>
            </div>
          </div>
          <Button :disabled='!userInfo.username' type="submit" label="Register" class="p-mt-2"/>
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
  },
  mounted() {
    this.userInfo.username = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.username : 'Unknown_user'
    this.userInfo.tgNickname = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.username : 'Unknown_user'
    this.userInfo.tgID = globalTelegram.initDataUnsafe.user ? globalTelegram.initDataUnsafe.user.id : '000000000'
    this.$store.commit('setName', this.userInfo.username)

    //if(this.userInfo.tgID === JSON.parse(localStorage.getItem("userInfo")).tgID) return
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

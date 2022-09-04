<template>
  <div class="form-demo">
    <div class="p-d-flex p-jc-center">
      <div class="card">
        <h5 class="p-text-center">Hi, {{ userInfo.username }} {{ userInfo.tgID }}!</h5>
        <form @submit.prevent="resetForm" class="p-fluid">
          <div class="p-field">
            <div class="p-float-label">
              <InputText id="name" v-model="v$.userInfo.name.$model" :class="{'p-invalid':v$.userInfo.name.$invalid}"/>
              <label for="name" :class="{'p-error':v$.userInfo.name.$invalid}">You may choose alternative
                username*</label>
            </div>
            <small v-if="(v$.userInfo.name.$invalid) || v$.userInfo.name.$pending.$response"
                   class="p-error">{{ v$.userInfo.name.required.$message.replace('Value', 'Username') }}</small>
          </div>
          <Button type="submit" label="Register" class="p-mt-2"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "LoginForm",
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      userInfo: {
        username: '',
        name: '',
        tgID: '',
      },
    }
  },
  validations() {
    return {
      userInfo: {
        name: {required},
      }
    }
  },
  beforeCreate() {
    globalTelegram.ready()
    globalTelegram.expand()
  },
  mounted() {
    if (!!globalTelegram?.initDataUnsafe?.user?.username) {
      this.userInfo.username = globalTelegram.initDataUnsafe.user.username
      this.userInfo.name = globalTelegram.initDataUnsafe.user.username
    } else {
      this.userInfo.username = 'Unknown_user'
      this.userInfo.name = 'Unknown_user'
    }

    if (!!globalTelegram?.initDataUnsafe?.user?.id) {
      this.userInfo.tgID = globalTelegram.initDataUnsafe.user.id
    } else this.userInfo.tgID = ''
  },
  methods: {
    resetForm() {
      if (!this.userInfo.name) return
      this.$parent.layoutVisible = true
      this.userInfo.name = ''
      this.userInfo.tgID = ''
          this.userInfo.username = ''
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

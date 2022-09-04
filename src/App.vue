<template>
  <div>
    <layout v-if="layoutVisible"></layout>
    <login-form v-if="!layoutVisible"></login-form>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import Layout from "@/components/Layout";

export default {
  components: {LoginForm, Layout},
  data() {
    return {
      layoutVisible: false,
    }
  }
}

</script>


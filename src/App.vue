<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import Layout from "@/components/Layout";

export default {
  components: {LoginForm, Layout},

}
</script>

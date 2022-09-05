<template>
  <div>
    <h1 class="title">Welcome, {{ name }}!</h1>
    <div class="layout">
      <Button icon="pi pi-paypal" label="Top-up" iconPos="left" class="p-button-lg"/>
      <Button icon="pi pi-upload" label="Upload" iconPos="left" class="p-button-lg"/>
      <Button icon="pi pi-money-bill" label="Buy" iconPos="left" class="p-button-lg"/>
      <Button icon="pi pi-history" label="History" iconPos="left" class="p-button-lg"/>
      <Button icon="pi pi-question" label="Test" iconPos="left" class="p-button-lg"/>
      <Button @click="previousMenu" icon="pi pi-forward" label="Back" iconPos="left" class="p-button-lg"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Layout",
  methods: {
    previousMenu() {
      this.$parent.layoutVisible = false
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.title {
  display: flex;
  justify-content: center;
}
</style>
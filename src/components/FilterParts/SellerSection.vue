<template>
  <section class="container">
    <div class="container_top">
      <span class="container_title">#192 MegaSeller</span>
      <ToggleButton v-model="checked" onLabel="Include" offLabel="Exclude"></ToggleButton>
    </div>

    <div class="container_bottom">
      <span>Rating: ++++-</span>
      <span> 5 lists, 4500 leads</span>
      <span>You bought5: 1 list, 1670 leads</span>
    </div>
  </section>

</template>

<script>
export default {
  name: "SellerSection",
  data() {
    return {
      checked: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 15px;
  height: 140px;
  background: #F7F7FD;
  border-radius: 7px;
  margin-bottom: 25px;

  &_title {
    font-weight: 600;
    color: #495057;
  }

  &_top {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
  }

  &_bottom {
    display: flex;
    flex-direction: column;
  }
}
</style>
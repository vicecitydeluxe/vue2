<template>
  <section class="container">
    <div class="container_top">
      <span class="container_title">#192 MegaSeller</span>
      <ToggleButton v-model="checked" onLabel="Include" offLabel="Exclude"></ToggleButton>
    </div>
    <div class="container_bottom">
      <span>Rating: ++++-</span>
      <span>#1829 CFD May 2022 depositors + deposit date + sales comments</span>
      <span>Funnel: Unknown</span>
      <span>include Upload date: 2022-09-16: 12:10</span>
      <span>Sold (fully or partially)7 times</span>
      <span>Matching leads/total: 15/570</span>
    </div>
  </section>

</template>

<script>
export default {
  name: "ListSection",
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
  height: 260px;
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
    gap: 14px;
  }
}
</style>
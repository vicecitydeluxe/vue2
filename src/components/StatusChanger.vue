<template>
  <div class="header">
    <header class="header_section">
      <h3>{{ mockID || '# Unresolved list name' }}</h3>
    </header>
    <main>
      <div>List status:</div>
      <div class="button-container">
        <SelectButton
            v-model="selectedFilter"
            :options="filter"
        />
      </div>
      <span class="text">Buyers can purchase your list only if the list was published.</span>
      <div class="input_container">
        <span>Price per lead:</span>
        <InputNumber
            :min="0"
            style="height: 38px;"
            v-model="inputValue"
            mode="currency"
            currency="USD"
            locale="en-US"
            @input="toggleDarkDropdown"
        />
      </div>
      <span class="text">This is the price buyers pay for a lead. The service fee, 10%, would be deducted when you actually sell leads.</span>
      <div class="field-checkbox" style="margin:10px 10px">
        <Checkbox
            id="option"
            v-model="selectedOption"
            :binary="true"
        />
        <label for="option">Decrease price</label>
      </div>
      <div class="bottom_section">
        <div class="bottom_section_container">
          <span>By</span>
          <InputNumber
              :min="0"
              :max="100"
              id="bottom"
              style="height: 38px; width: 80px"
              v-model="percentValue"
              prefix="%"
              @input="toggleDarkDropdown"
          />
        </div>
        <div class="bottom_section_container">
          <span>Every</span>
          <Dropdown
              style="width: 180px"
              :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : 'map_container_dropdown']"
              @change="toggleDarkDropdown"
              v-model="selectedTimePeriod"
              :value="selectedTimePeriod"
              :options="timePeriod"
              @before-show="toggleDarkDropdown"
          />
        </div>

      </div>
      <div class="bottom_section">
        <div class="bottom_section_container">
          <span>Down to minimum of</span>
          <InputNumber
              :min="0"
              :max="100"
              id="input"
              style="height: 38px; width: 80px"
              v-model="minPercentValue"
              prefix="%"
              @input="toggleDarkDropdown"
          />
          <span>of the initial price</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";
import {mapGetters} from "vuex";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "StatusChanger",
  mixins: [tgMixin],
  data() {
    return {
      darkDropdown: 0,
      filter: ['Hidden', 'Published', 'Archived'],
      selectedFilter: null,
      timePeriod: ['day', '2 days', '3 days', 'week'],
      selectedTimePeriod: null,
      selectedOption: null,
      inputValue: 0,
      percentValue: 0,
      minPercentValue: 0
    }
  },
  computed: {
    ...mapGetters(['mockLists', 'mockID']),
  },
  methods: {
    redirectCb() {
      this.$router.push({name: 'layout'})
    },
    // actionCb() {
    //   this.$router.push({name: 'finder'})
    // },
    toggleDarkDropdown() {
      this.darkDropdown++
    },
    multiSelectHandler() {
      setTimeout(() => {
        document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
        document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
        document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputnumber-input_dark'))
        document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
      }, 0)
    },
    switchHandler() {
      document.querySelectorAll('.text').forEach(e => e.classList.add('text-dark'))
      document.querySelectorAll('.p-inputnumber-input').forEach(e => e.classList.add('p-inputnumber-input_dark'))
      document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
    },
    switchRemover() {
      const darkStylesSelectors = ['text-dark', 'p-inputnumber-input_dark', 'p-placeholder_dark']
      document.querySelectorAll('[class*="_dark"]')
          .forEach(e => e.classList.remove(...darkStylesSelectors))
    },
    dataHandler() {
      setTimeout(() => {
        document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
        document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
        document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
        document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
        document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
      }, 0)
    },
  },
  watch: {
    $data: {
      handler() {
        this.darkModeSwitch && this.dataHandler()
      }, deep: true
    },
    darkModeSwitch: {
      handler(n) {
        n
            ? this.switchHandler()
            : this.switchRemover()
      },
    },
    darkDropdown: {
      handler() {
        (this.darkDropdown && this.darkModeSwitch) && this.multiSelectHandler()
      }
    },
    selectedFilter: {
      handler(n) {
        this.$store.commit('setMockLists', n)
      }
    },
  },
  mounted() {
    document.getElementById('bottom').setAttribute("style", "width:50px");
    document.getElementById('input').setAttribute("style", "width:50px");
    // globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    // globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/StatusChanger';
</style>
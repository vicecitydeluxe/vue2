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
            showButtons
            :step="0.05"
            :min="0"
            style="height: 38px;"
            :class="[!publishedFlag
                  ? ''
                  : 'p-invalid']"
            v-model="pricePerLead"
            mode="currency"
            currency="USD"
            locale="en-US"
            @input="toggleDarkDropdown"
        />
      </div>
      <span class="text">This is the price buyers pay for a lead.
        The service fee, 10%, would be deducted when you actually sell leads.</span>
      <div class="field-checkbox" style="margin:10px 10px">
        <Checkbox
            id="option"
            v-model="decreaseFlag"
            :binary="true"
        />
        <label for="option">Decrease price</label>
      </div>
      <div class="bottom_section">
        <div class="bottom_section_container">
          <span>By</span>
          <InputNumber
              :disabled="!decreaseFlag"
              :min="0"
              :max="100"
              id="bottom"
              style="height: 38px; width: 65px"
              v-model="percentValue"
              suffix="%"
              @input="toggleDarkDropdown"
          />
        </div>
        <div class="bottom_section_container">
          <span>Every</span>
          <Dropdown
              :disabled="!decreaseFlag"
              style="width: 180px;"
              :class="[ darkModeSwitch
            ? 'dropdown_dark'
            : '']"
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
              :disabled="!decreaseFlag"
              :min="0"
              :max="100"
              id="input"
              style="height: 38px; width: 65px"
              v-model="minPercentValue"
              suffix="%"
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
      selectedTimePeriod: 'day',
      decreaseFlag: false,
      pricePerLead: 0,
      percentValue: 0,
      minPercentValue: 0,
      publishedFlag: false
    }
  },
  computed: {
    ...mapGetters(['mockLists', 'mockID', 'mockStatus']),
    mainButtonShow() {
      return !!(this.selectedFilter === 'Published' && this.pricePerLead) ||
          !!(this.decreaseFlag && this.percentValue && this.minPercentValue)
    }
  },
  methods: {
    actionCb() {
      this.$router.push({name: 'list-search'})
    },
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
      document.querySelectorAll('.text-dark').forEach(e => e.classList.remove('text-dark'))
      document.querySelectorAll('.p-inputnumber-input_dark').forEach(e => e.classList.remove('p-inputnumber-input_dark'))
      document.querySelectorAll('.p-placeholder_dark').forEach(e => e.classList.remove('p-placeholder_dark'))
      document.querySelectorAll('.pi-chevron-down_dark').forEach(e => e.classList.remove('pi-chevron-down_dark'))
      document.querySelectorAll('.p-dropdown-item_dark').forEach(e => e.classList.remove('p-dropdown-item_dark'))
      document.querySelectorAll('.p-inputtext_dark').forEach(e => e.classList.remove('p-inputtext_dark'))
      document.querySelectorAll('.p-highlight_dark').forEach(e => e.classList.remove('p-highlight_dark'))
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
        n === 'Published'
            ? this.publishedFlag = true
            : this.publishedFlag = false
      }
    },
    pricePerLead: {
      handler(n) {
        !n
            ? this.publishedFlag = true
            : this.publishedFlag = false
      }, immediate: true
    },
    decreaseFlag: {
      handler(n) {
        if (n) {
          document.getElementById("bottom").classList.add("p-invalid");
          document.getElementById("input").classList.add("p-invalid");
        } else {
          document.getElementById("bottom").classList.remove("p-invalid");
          document.getElementById("input").classList.remove("p-invalid");
        }
      }
    },
    percentValue: {
      handler(n) {
        n
            ? setTimeout(() => document.getElementById("bottom").classList.remove("p-invalid"), 0)
            : setTimeout(() => document.getElementById("bottom").classList.add("p-invalid"), 0)
      }
    },
    minPercentValue: {
      handler(n) {
        n
            ? setTimeout(() => document.getElementById("input").classList.remove("p-invalid"), 0)
            : setTimeout(() => document.getElementById("input").classList.add("p-invalid"), 0)
      }
    },
    mainButtonShow: {
      handler(n) {
        n
            ? globalTelegram.MainButton.show()
            : globalTelegram.MainButton.hide()
      }
    },
  },
  created() {
    this.selectedFilter = this.mockStatus
  },
  mounted() {
    document.getElementById('bottom').setAttribute("style", "width:35px");
    document.getElementById('input').setAttribute("style", "width:35px");

    globalTelegram.MainButton.setText('Update status')
    globalTelegram.MainButton.color = '#16a34a'
    globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.actionCb)
  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.actionCb)
  },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/MyListsSection/ListSearcherParts/StatusChanger';
</style>
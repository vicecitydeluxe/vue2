<template>
  <div class="header">
    <header class="header_section">
      <h3>FIND LEADS</h3>
    </header>
    <div class="sticky">
      <div class="sticky_number">205 192</div>
      <span class="sticky_number__title">leads are currently
        for sale found in the database</span>
    </div>
    <main class="main">
      <div class="filter_container">
        <div class="filter_header">Filter</div>
        <div class="filter_container_wrapper">
          <div class="filter_header_divider">Type (Multiple select)</div>
          <div style="display:flex; justify-content: center">
            <SelectButton
                v-model="selectedType"
                :options="types"
            />
          </div>
        </div>
        <div class="filter_container_wrapper">
          <div class="filter_header_divider">Countries</div>
          <MultiSelect
              :class="[ darkModeSwitch
                      ? 'dropdown_dark'
                      : 'dropdown']"
              v-model="selectedCountries"
              placeholder="Choose сode"
              :options="countriesFullTitles"
              :filter="true"
              @change="toggleDarkDropdown"
              @before-show="toggleDarkDropdown"
              @filter="toggleDarkDropdown"
          />
        </div>
        <div class="filter_container_wrapper">
          <div class="filter_header_divider">Registration date</div>
          <Dropdown
              :class="[ darkModeSwitch
                      ? 'dropdown_dark'
                      : 'dropdown']"
              :options="regdateFilter"
              v-model="regdateSelected"
              placeholder="Choose filter"
          />
        </div>
        <div class="filter_container_wrapper">
          <div class="field-checkbox">
            <Checkbox
                id="binary"
                v-model="regdateUnknownChecker"
                :binary="true"
            />
            <label for="binary">With Unknown registration date</label>
          </div>
          <div class="filter_header_divider">Lead price <</div>
          <InputNumber
              :class="[ darkModeSwitch
                      ? 'dropdown_dark'
                      : 'dropdown']"
              v-model="priceFilter"
              mode="currency"
              currency="USD"
              locale="en-US"
          />
        </div>
        <div class="filter_container_wrapper">
          <div class="field-checkbox">
            <Checkbox
                id="binary"
                v-model="extraLeadsChecker"
                :binary="true"
            />
            <label for="binary">Exclude leads I bought or
              already have</label>
          </div>
        </div>
      </div>
      <div class="options_container">
        <Button
            @click="$router.push({name: 'sellers'})"
            icon="pi pi-angle-right"
            label='Any seller'
            class="options_container_button"
        />
        <Button
            @click="$router.push({name: 'lists'})"
            icon="pi pi-angle-right"
            label='Any list'
            class="options_container_button"
        />
      </div>
      <div class="limit_container">
        <div class="limit_header">Limit</div>
        <div class="limit_wrapper">
          <div class="field-radiobutton">
            <RadioButton
                id="city1"
                name="city"
                value="demand"
                v-model="demand"
            />
            <label style="margin-left:4px;"
                   for="city1">I need</label>
          </div>
          <InputNumber
              class="input"
              type="text"
              :class="[ darkModeSwitch
                        ? 'input_dark'
                        : 'input']"
              v-model="leadFilter"
          />
          <span>leads</span>
        </div>
        <div class="limit_wrapper">
          <div class="field-radiobutton">
            <RadioButton
                id="city1"
                name="city"
                value="maxAmount"
                v-model="maxAmount"
            />
            <label
                for="city1">I spent max</label>
          </div>
          <InputNumber
              :class="[ darkModeSwitch
                        ? 'input_dark'
                        : 'input']"
              v-model="priceMaxFilter"
              mode="currency"
              currency="USD"
              locale="en-US"
          />
          <span>balance:</span>
        </div>
      </div>
      <div>Sort by
        <div class="button-container">
          <SelectButton
              :options="sortOptions"
              v-model="selectedOption"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";
import leadsFinderHandler from "@/mixins/styleHandlers/leadsFinderHandler";
import countryMapperHelper from "@/mixins/helpers/countryMapperHelper";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "LeadsFinder",
  mixins: [tgMixin, leadsFinderHandler, countryMapperHelper],
  data() {
    return {
      darkDropdown: 0,
      regdateUnknownChecker: false,
      extraLeadsChecker: false,
      types: [
        'Registrations',
        'Depositors',
        'Unknown',
      ],
      selectedType: null,
      sortOptions: [
        'Min price first',
        'New leads first',
        'Seller rank'
      ],
      regdateFilter: ['Less 24 hours',
        'Less than a week',
        'Less than a month',
        ' Over a month (but less than 3 months)',
        'Up to 3 months',
        'More than 3 months'],
      selectedCountries: null,
      selectedOption: 'New leads first',
      regdateSelected: null,
      priceFilter: null,
      leadFilter: null,
      priceMaxFilter: null,
      demand: null,
      maxAmount: null,
    }
  },
  methods: {
    redirectCb() {
      this.$router.push({name: 'layout'})
    },
    actionCb() {
      if (this.$route.path === '/leads-finder') this.$router.push({name: 'buy'})
    },
    toggleDarkDropdown() {
      this.darkDropdown++
    },
  },
  watch: {
    darkDropdown: {
      handler() {
        if (this.darkDropdown && this.darkModeSwitch) {
          this.multiSelectHandler()
        }
      }, deep: true
    },
    // extraLeadsChecker: {
    //   handler(newValue) {
    //     if (newValue) {
    //       globalTelegram.MainButton.setText('Apply changes / Buy leads')
    //       globalTelegram.MainButton.color = '#16a34a'
    //       globalTelegram.MainButton.show()
    //     } else if (!newValue) {
    //       globalTelegram.MainButton.hide()
    //     }
    //   },
    // },
    priceFilter: {
      handler(newValue) {
        if ((newValue && this.darkModeSwitch) || (!newValue && this.darkModeSwitch)) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputnumber-input').forEach(e => e.classList.add('p-inputnumber-input_dark'))
          }, 0)
        }
      }
    },
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          this.switchHandler()
        } else if (!newValue) {
          this.switchRemover()
        }
      },
    },
  },
  mounted() {
    globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
    globalTelegram.MainButton.hide().offClick(this.actionCb)
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/LeadsFinder.scss';
</style>
<template>
  <div class="header">
    <!--    <Button @click="actionCb">NEXT STEP</Button>-->
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
                id="regdate"
                v-model="regdateUnknownChecker"
                :binary="true"
            />
            <label for="regdate">With Unknown registration date</label>
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
                id="extraLeads"
                v-model="extraLeadsChecker"
                :binary="true"
            />
            <label for="extraLeads">Exclude leads I bought or
              already have</label>
          </div>
        </div>
      </div>
      <div class="options_container">
        <Button
            @click="$router.push({name: 'sellers'})"
            icon="pi pi-angle-right"
            :label="excludedSellersLength
                ? `Any seller expect ${excludedSellersLength} selected`
                : 'Any seller'"
            class="options_container_button"
        />
        <Button
            @click="$router.push({name: 'lists'})"
            icon="pi pi-angle-right"
            :label="excludedListsLength
                ? `Any list expect ${excludedListsLength} selected`
                : 'Any list'"
            class="options_container_button"
        />
      </div>
      <div class="limit_container">
        <div class="limit_header">Limit</div>
        <div class="limit_wrapper">
          <div class="field-radiobutton">
            <RadioButton
                id="leadFilter"
                value="leadFilter"
                v-model="radioButtonValue"
            />
            <label
                style="margin-left: 3px"
                for="leadFilter"
            >I need</label>
          </div>
          <InputNumber
              style="height: 38px;"
              :class="[validLeadsInput
                  ? 'input'
                  : 'p-invalid']"
              v-model="leadFilter"
              @input="toggleDarkDropdown"
          />
          <span
              style="width: 65px;"
          >leads</span>
        </div>
        <div class="limit_wrapper">
          <div class="field-radiobutton" style="width: 70px;">
            <RadioButton
                id="priceMax"
                value="priceMaxFilter"
                v-model="radioButtonValue"
            />
            <label
                style="margin-left: 3px"
                for="priceMax"
            >I spent max</label>
          </div>
          <InputNumber
              style="height: 38px;"
              :class="[validPriceMaxInput
                  ? 'input'
                  : 'p-invalid']"
              v-model="priceMaxFilter"
              mode="currency"
              currency="USD"
              locale="en-US"
              @input="toggleDarkDropdown"
          />
          <span
              style="width: 70px;"
          >balance:</span>
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
import leadsFinderHelper from "@/mixins/helpers/MyListsSection/leadsFinderHelper";
import leadsFinderHandler from "@/mixins/styleHandlers/MyListsSection/leadsFinderHandler";
import countryMapperHelper from "@/mixins/helpers/WizardSection/countryMapperHelper";
import {mapGetters} from "vuex";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "LeadsFinder",
  components: {
    InputNumber: () => import ('primevue/inputnumber'),
    Button: () => import('primevue/button'),
    SelectButton: () => import ('primevue/selectbutton'),
    Dropdown: () => import ('primevue/dropdown'),
    Checkbox: () => import ('primevue/checkbox'),
    RadioButton: () => import ('primevue/radiobutton'),
    MultiSelect: () => import('primevue/multiselect')
  },
  mixins: [
    tgMixin,
    leadsFinderHelper,
    leadsFinderHandler,
    countryMapperHelper
  ],
  data() {
    return {
      darkDropdown: 0,
      regdateUnknownChecker: false,
      priceFilter: null,
      radioButtonValue: null,
    }
  },
  computed: {
    ...mapGetters([
      'globalSelectedType',
      'globalSelectedCountries',
      'globalRegdateSelected',
      'globalRegdateUnknownChecker',
      'globalPriceFilter',
      'globalExtraLeadsChecker',
      'globalRadioButtonValue',
      'globalSelectedOption',
      'globalLeadFilter',
      'globalPriceMaxFilter',
    ]),
    mainButtonFlag() {
      return !!(this.leadFilter && !!this.priceMaxFilter)
    }
  },
  methods: {
    globalStateAssigner() {
      this.selectedType = this.globalSelectedType
      if (!this.globalSelectedCountries.includes('Any')) this.selectedCountries = this.globalSelectedCountries
      this.regdateSelected = this.globalRegdateSelected
      this.regdateUnknownChecker = this.globalRegdateUnknownChecker
      this.priceFilter = this.globalPriceFilter
      this.extraLeadsChecker = this.globalExtraLeadsChecker
      this.radioButtonValue = this.globalRadioButtonValue
      this.selectedOption = this.globalSelectedOption
      this.priceMaxFilter = this.globalPriceMaxFilter
      this.leadFilter = this.globalLeadFilter
    },
    redirectCb() {
      this.$router.push({name: 'layout'})
    },
    actionCb() {
      this.$router.push({name: 'buy'})
    },
    toggleDarkDropdown() {
      this.darkDropdown++
    },
    mainButtonShow(p) {
      globalTelegram.MainButton.setText(p)
      globalTelegram.MainButton.color = '#16a34a'
      globalTelegram.MainButton.show()
    },
  },
  watch: {
    darkDropdown: {
      handler() {
        (this.darkDropdown && this.darkModeSwitch) && this.multiSelectHandler()
      }
    },
    //TODO: set up right condition to show MainButton
    mainButtonFlag: {
      handler(n) {
        n
            ? this.mainButtonShow('Buy leads')
            : this.mainButtonShow('Apply changes / Buy leads')
      }
    },
    priceFilter: {
      handler(newValue) {
        if ((newValue && this.darkModeSwitch) || (!newValue && this.darkModeSwitch)) {
          setTimeout(() => {
            document.querySelectorAll('.p-inputnumber-input')
                .forEach(e => e.classList.add('p-inputnumber-input_dark'))
          }, 0)
        }
      }
    },
    darkModeSwitch: {
      handler(n) {
        n
            ? this.switchHandler()
            : this.switchRemover()
      },
    },
  },
  created() {
    this.globalStateAssigner()
  },
  mounted() {
    this.mainButtonShow('Buy leads')
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
@import '../../styles/MyListsSection/LeadsFinder';
</style>
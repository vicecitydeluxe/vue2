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
          <SelectButton
              v-model="selectedType"
              :options="selectedOptions"
              optionLabel="name"
              multiple
          />
        </div>
        <div class="filter_container_wrapper">
          <div class="filter_header_divider">Countries</div>
          <Dropdown
              :class="[ darkModeSwitch ? 'dropdown_dark' : 'dropdown']"
          />
        </div>
        <div class="filter_container_wrapper">
          <div class="filter_header_divider">Registration date</div>
          <Dropdown
              :class="[ darkModeSwitch ? 'dropdown_dark' : 'dropdown']"
          />
        </div>
        <div class="filter_container_wrapper">
          <div class="filter_header_divider">Lead price <</div>
          <InputText
              :class="[ darkModeSwitch ? 'dropdown_dark' : 'dropdown']"/>
        </div>
        <div class="filter_container_wrapper">
          <div class="field-checkbox">
            <Checkbox
                id="binary"
                v-model="checked"
                :binary="true"
            />
            <label for="binary">Exclude leads I bought or
              ready have (leads having the same email or phone)</label>
          </div>
        </div>
      </div>
      <Accordion>
        <AccordionTab header="Any seller">
          <p>
            Lorem ipsum dolor sit amet
          </p>
        </AccordionTab>
        <AccordionTab header="Any list">
          <p>
            Lorem ipsum dolor sit amet
          </p>
        </AccordionTab>
      </Accordion>
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
            <label style="margin-right: 34px;
             margin-left:4px;"
                   for="city1">I need</label>
          </div>
          <InputText
              class="input"
              type="text"
              v-model="value1"
              :class="[ darkModeSwitch ? 'input_dark' : 'input']"
          />
          <span :style="{marginLeft: '.5em'}">leads</span>
        </div>
        <div class="limit_wrapper">
          <div class="field-radiobutton">
            <RadioButton
                id="city1"
                name="city"
                value="maxAmount"
                v-model="maxAmount"
            />
            <label style="margin-left:4px;"
                   for="city1">I spent max</label>
          </div>
          <InputText
              :class="[ darkModeSwitch ? 'input_dark' : 'input']"
              type="text"
              v-model="value1"
              placeholder="$"
          />
          <span :style="{marginLeft: '.5em'}">balance:</span>
        </div>
      </div>
      <div>Sort by
        <div class="button-container">
          <button class="button_left">Min price first</button>
          <button class="button_middle">New leads first</button>
          <button class="button_right">Seller rank</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import tgMixin from "@/mixins/tgMixin";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "LeadsFinder",
  mixins: [tgMixin],
  data() {
    return {
      checked: false,
      selectedType: null,
      selectedOptions: [
        {name: 'Registrations', value: 1},
        {name: 'Depositors', value: 2},
        {name: 'Unknown', value: 3}
      ],
      demand: null,
      maxAmount: null,
    }
  },
  methods: {
    redirectCb() {
      this.$router.push({name: 'layout'})
    },
    actionCb() {
      if (this.$route.path === '/leads-finder') this.$router.push({name: 'layout'})
    }
  },
  watch: {
    checked: {
      handler(newValue) {
        if (newValue) {
          globalTelegram.MainButton.setText('Apply changes / Buy leads')
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
        } else if (!newValue) {
          globalTelegram.MainButton.hide()
        }
      },
    },
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.sticky').forEach(e => e.classList.add('sticky_dark'))
          document.querySelectorAll('.sticky_number__title').forEach(e => e.classList.add('sticky_number__title_dark'))
          document.querySelectorAll('.filter_header').forEach(e => e.classList.add('filter_header_dark'))
          document.querySelectorAll('.filter_header_divider').forEach(e => e.classList.add('filter_header_divider_dark'))
          document.querySelectorAll('.filter_container').forEach(e => e.classList.add('filter_container_dark'))
          document.querySelectorAll('.filter_container_wrapper').forEach(e => e.classList.add('filter_container_wrapper_dark'))
          document.querySelectorAll('.limit_header').forEach(e => e.classList.add('limit_header_dark'))
          document.querySelectorAll('.limit_container').forEach(e => e.classList.add('limit_container_dark'))
          document.querySelectorAll('.button_left').forEach(e => e.classList.add('button_left_dark'))
          document.querySelectorAll('.button_middle').forEach(e => e.classList.add('button_middle_dark'))
          document.querySelectorAll('.button_right').forEach(e => e.classList.add('button_right_dark'))
          document.querySelectorAll('.p-radiobutton-box').forEach(e => e.classList.add('p-radiobutton-box_dark'))
          document.querySelectorAll('.p-accordion-header-link').forEach(e => e.classList.add('p-accordion-header-link_dark'))
          document.querySelectorAll('.p-accordion-content').forEach(e => e.classList.add('p-accordion-content_dark'))
        } else if (!newValue) {
          document.querySelectorAll('.sticky').forEach(e => e.classList.remove('sticky_dark'))
          document.querySelectorAll('.sticky_number__title').forEach(e => e.classList.remove('sticky_number__title_dark'))
          document.querySelectorAll('.filter_header').forEach(e => e.classList.remove('filter_header_dark'))
          document.querySelectorAll('.filter_header_divider').forEach(e => e.classList.remove('filter_header_divider_dark'))
          document.querySelectorAll('.filter_container').forEach(e => e.classList.remove('filter_container_dark'))
          document.querySelectorAll('.filter_container_wrapper').forEach(e => e.classList.remove('filter_container_wrapper_dark'))
          document.querySelectorAll('.limit_header').forEach(e => e.classList.remove('limit_header_dark'))
          document.querySelectorAll('.limit_container').forEach(e => e.classList.remove('limit_container_dark'))
          document.querySelectorAll('.button_left').forEach(e => e.classList.remove('button_left_dark'))
          document.querySelectorAll('.button_middle').forEach(e => e.classList.remove('button_middle_dark'))
          document.querySelectorAll('.button_right').forEach(e => e.classList.remove('button_right_dark'))
          document.querySelectorAll('.p-radiobutton-box').forEach(e => e.classList.remove('p-radiobutton-box_dark'))
          document.querySelectorAll('.p-accordion-header-link').forEach(e => e.classList.remove('p-accordion-header-link_dark'))
          document.querySelectorAll('.p-accordion-content').forEach(e => e.classList.remove('p-accordion-content_dark'))
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
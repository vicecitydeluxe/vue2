<template>
  <div class="header">
    <header class="header_section">
      <h3>FIND LEADS</h3>
    </header>
    <div class="sticky">
      <div class="sticky_number">205 192</div>
      <span class="sticky_number__title">leads are currently for sale found in the database</span>
    </div>
    <main class="main">
      <div class="filter_container">
        <div class="filter_header">Filter</div>
        <div class="filter_container_wrapper">
          <div class="filter_header_divider">Type (Multiple select)</div>
          <SelectButton v-model="selectedType" :options="selectedOptions" optionLabel="name" multiple/>
        </div>
        <div class="filter_container_wrapper">
          <div class="filter_header_divider">Countries</div>
          <Dropdown class="dropdown"></Dropdown>
        </div>
        <div class="filter_container_wrapper">
          <div class="filter_header_divider">Registration date</div>
          <Dropdown class="dropdown"></Dropdown>
        </div>
        <div class="filter_container_wrapper">
          <div class="filter_header_divider">Lead price <</div>
          <InputText class="dropdown"></InputText>
        </div>
        <div class="filter_container_wrapper">
          <div class="field-checkbox">
            <Checkbox id="binary" v-model="checked" :binary="true"/>
            <label for="binary">Exclude leads I bought or already have (leads having the same email or phone)</label>
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
            <RadioButton id="city1" name="city" value="demand" v-model="demand"/>
            <label style="margin-right: 34px; margin-left:4px;" for="city1">I need</label>
          </div>
          <InputText class="input" type="text" v-model="value1"/>
          <span :style="{marginLeft: '.5em'}">leads</span>
        </div>
        <div class="limit_wrapper">
          <div class="field-radiobutton">
            <RadioButton id="city1" name="city" value="maxAmount" v-model="maxAmount"/>
            <label style="margin-left:4px;" for="city1">I spent max</label>
          </div>
          <InputText class="input" type="text" v-model="value1" placeholder="$"/>
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
  watch: {
    checked: {
      handler(newValue) {
        if (newValue) {
          globalTelegram.MainButton.setText('Apply changes / Buy leads')
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
              .onClick(() => {
                if (this.$route.path === '/leads-finder') this.$router.push({name: 'layout'}
                )
              })
        } else if (!newValue) {
          globalTelegram.MainButton.hide()
        }
      },
    },
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.sticky').forEach(e => e.classList.replace('sticky', 'sticky_dark'))
          document.querySelectorAll('.sticky_number__title').forEach(e => e.classList.replace('sticky_number__title', 'sticky_number__title_dark'))
          document.querySelectorAll('.filter_header').forEach(e => e.classList.replace('filter_header', 'filter_header_dark'))
          document.querySelectorAll('.filter_header_divider').forEach(e => e.classList.replace('filter_header_divider', 'filter_header_divider_dark'))
          document.querySelectorAll('.filter_container').forEach(e => e.classList.replace('filter_container', 'filter_container_dark'))
          document.querySelectorAll('.filter_container_wrapper').forEach(e => e.classList.replace('filter_container_wrapper', 'filter_container_wrapper_dark'))
          document.querySelectorAll('.limit_header').forEach(e => e.classList.replace('limit_header', 'limit_header_dark'))
          document.querySelectorAll('.limit_container').forEach(e => e.classList.replace('limit_container', 'limit_container_dark'))
        } else if (!newValue) {
          document.querySelectorAll('.sticky_dark').forEach(e => e.classList.replace('sticky_dark', 'sticky'))
          document.querySelectorAll('.sticky_number__title_dark').forEach(e => e.classList.replace('sticky_number__title_dark', 'sticky_number__title'))
          document.querySelectorAll('.filter_header_dark').forEach(e => e.classList.replace('filter_header_dark', 'filter_header'))
          document.querySelectorAll('.filter_header_divider_dark').forEach(e => e.classList.replace('filter_header_divider_dark', 'filter_header_divider'))
          document.querySelectorAll('.filter_container_dark').forEach(e => e.classList.replace('filter_container_dark', 'filter_container'))
          document.querySelectorAll('.filter_container_wrapper').forEach(e => e.classList.replace('filter_container_wrapper_dark', 'filter_container_wrapper'))
          document.querySelectorAll('.limit_header_dark').forEach(e => e.classList.replace('limit_header_dark', 'limit_header'))
          document.querySelectorAll('.limit_container_dark').forEach(e => e.classList.replace('limit_container_dark', 'limit_container'))
        }
      },
    },
  },
  mounted() {
    globalTelegram.BackButton.show().onClick(() => this.$router.push({name: 'layout'}
    ))
  },
  beforeDestroy() {
    globalTelegram.BackButton.hide().offClick(() => this.$router.push({name: 'layout'}))
    globalTelegram.MainButton.hide().offClick(() => this.$router.push({name: 'layout'}))
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/LeadsFinder.scss';
</style>
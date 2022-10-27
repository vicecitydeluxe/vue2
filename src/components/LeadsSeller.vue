<template>
  <div class="header">
    <header class="header_section">
      <h3>BUY LEADS</h3>
    </header>
    <main>
      <div class="main_top_container"><span>600</span> <span>1500$</span></div>
      <span class="main_title">Review your options</span>
      <OptionsSection/>
      <Accordion :activeIndex="0">
        <AccordionTab header="Any seller except 2 selected">
          <div class="field-checkbox">
            <Checkbox
                id="seller1"
                name="seller"
                value="Seller 1"
                v-model="options"
            />
            <label for="seller1">Seller 1</label>
          </div>
          <div class="field-checkbox">
            <Checkbox
                id="seller2"
                name="seller"
                value="Seller 2"
                v-model="options"
            />
            <label for="seller2">Seller 2</label>
          </div>
        </AccordionTab>
        <AccordionTab header="Any list except 1 selected">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>
        </AccordionTab>
      </Accordion>
      <div class="main_bottom_description">Take maximum of $1500</div>
      <div class="main_bottom_filter">
        <strong>Sort by: New leads first</strong>
      </div>
      <div class="description">
        Sort by: New leads first Finishing the deal takes time (up to several
        minutes). During that time some list may be closed and lead prices
        changed. As a result the actual amount of leads you get may vary (some
        of the leads may not be even available anymore). You will get notified
        with the actual amount when the process finishes. The system will
        allocate $1 500 and deduct the actual amount (not exceeded $1 500) in
        the end of the process.
      </div>
    </main>
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";

const globalTelegram = window.Telegram.WebApp;

export default {
  mixins: [tgMixin],
  components: {
    OptionsSection: () => import("@/components/SellParts/OptionsSection"),
  },
  data() {
    return {
      options: [],
    };
  },
  methods: {
    redirectCb() {
      this.$router.push({name: "layout"})
    },
    actionCb() {
      if (this.$route.path === "/buy-leads") this.$router.push({name: "layout"})
    }
  },
  watch: {
    options: {
      handler(newValue) {
        if (newValue.length > 0) {
          globalTelegram.MainButton.setText("Confirm allocation and buy leads");
          globalTelegram.MainButton.color = "#16a34a";
          globalTelegram.MainButton.show()
        } else if (newValue.length === 0) {
          globalTelegram.MainButton.hide();
        }
      },
    },
    darkModeSwitch: {
      handler(newValue) {
        if (newValue) {
          document.querySelectorAll('.p-accordion-header-link').forEach(e => e.classList.add('p-accordion-header-link_dark'))
          document.querySelectorAll('.p-accordion-content').forEach(e => e.classList.add('p-accordion-content_dark'))
          document.querySelectorAll('.description').forEach(e => e.classList.replace('description', 'description_dark'))
        } else if (!newValue) {
          document.querySelectorAll('.p-accordion-header-link_dark').forEach(e => e.classList.remove('p-accordion-header-link_dark'))
          document.querySelectorAll('.p-accordion-content_dark').forEach(e => e.classList.remove('p-accordion-content_dark'))
          document.querySelectorAll('.description_dark').forEach(e => e.classList.replace('description_dark', 'description'))
        }
      },
    },
  },
  mounted() {
    globalTelegram.MainButton.onClick(this.actionCb);
    globalTelegram.BackButton.show().onClick(this.redirectCb);
  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb);
    globalTelegram.BackButton.hide().offClick(this.redirectCb);
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/LeadsSeller.scss";
</style>

<template>
  <div class="header">
    <header class="header_section">
      <h3>BUY LEADS</h3>
    </header>
    <main>
      <div class="main_top_container"><span>{{ globalLeadFilter }}</span>
        <span>{{ globalPriceMaxFilter }} $</span>
      </div>
      <span class="main_title">Review your options:</span>
      <OptionsSection/>
      <div class="options_container">
        <Button
            disabled
            :label="excludedSellersLength
                ? `Any seller expect ${excludedSellersLength} selected`
                : 'Any seller'"
            class="options_container_button"
        />
        <Button
            disabled
            :label="excludedListsLength
                ? `Any list expect ${excludedListsLength} selected`
                : 'Any list'"
            class="options_container_button"
        />
      </div>
      <div class="main_bottom_description">Take maximum of {{ globalPriceMaxFilter }} $</div>
      <div class="main_bottom_filter">
        <strong>Sort by: {{ globalSelectedOption }}</strong>
      </div>
      <div class="description">
        Finishing the deal takes time (up to several
        minutes). During that time some list may be closed and lead prices
        changed. As a result the actual amount of leads you get may vary (some
        of the leads may not be even available anymore). You will get notified
        with the actual amount when the process finishes. The system will
        allocate {{ globalPriceMaxFilter }} $ and deduct
        the actual amount (not exceeded {{ globalPriceMaxFilter }} $)
        in the end of the process.
      </div>
    </main>
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";
import leadsSellerHandler from "@/mixins/styleHandlers/leadsSellerHandler";
import {mapGetters} from "vuex";

const globalTelegram = window.Telegram.WebApp;

export default {
  mixins: [
    tgMixin,
    leadsSellerHandler
  ],
  components: {
    OptionsSection: () => import("@/components/SellParts/OptionsSection"),
  },
  data() {
    return {
      darkModeSwitch: false,
    };
  },
  computed: {
    ...mapGetters([
      'excludedListsLength',
      'excludedSellersLength',
      'globalSelectedOption',
      'globalLeadFilter',
      'globalPriceMaxFilter'
    ]),
  },
  methods: {
    redirectCb() {
      this.$router.push({name: "finder"})
    },
    actionCb() {
      this.$router.push({name: "deals"})
    }
  },
  watch: {
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
    globalTelegram.MainButton.setText("Confirm allocation and buy leads");
    globalTelegram.MainButton.color = "#16a34a";
    globalTelegram.MainButton.show()
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

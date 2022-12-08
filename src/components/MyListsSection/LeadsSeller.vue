<template>
  <div class="header">
    <header class="header_section">
      <h3>BUY LEADS</h3>
    </header>
    <main>
      <div class="main_top_container">
        <span v-text="globalLeadFilter"/>
        <span v-text="globalPriceMaxFilter"/>
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
      <div class="main_bottom_description">Take maximum of {{ localMaximumAmount }}⠀
        <span
            v-if="spanSwitch === 'price'"
        >
          $</span>
        <span
            v-if="spanSwitch === 'lead'"
        >
          leads</span>
      </div>
      <div class="main_bottom_filter">
        <strong>Sort by: {{ globalSelectedOption }}</strong>
      </div>
      <div
          v-if="balanceFlag && !errorFlag"
          class="description"
      >
        Finishing the deal takes time (up to several
        minutes). During that time some list may be closed and lead prices
        changed. As a result the actual amount of leads you get may vary (some
        of the leads may not be even available anymore). You will get notified
        with the actual amount when the process finishes. The system will
        allocate {{ globalPriceMaxFilter }} $ and deduct
        the actual amount (not exceeded {{ globalPriceMaxFilter }} $)
        in the end of the process.
      </div>
      <div
          v-if="!balanceFlag && !errorFlag"
          class="description"
      >
        You don't have enough funds to make this deal. You can return to the previous step
        and adjust the limit according to your current balance or top-up
        your balance.
      </div>
      <div
          v-if="errorFlag"
          class="description"
      >
        Server encountered error, try again later!
      </div>
    </main>
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";
import leadsSellerHandler from "@/mixins/styleHandlers/MyListsSection/leadsSellerHandler";
import {mapGetters} from "vuex";

const globalTelegram = window.Telegram.WebApp;

export default {
  name: 'LeadsSeller',
  components: {
    OptionsSection: () => import("@/components/MyListsSection/LeadsSellerParts/OptionsSection"),
    Button: () => import('primevue/button')
  },
  mixins: [
    tgMixin,
    leadsSellerHandler
  ],
  data() {
    return {
      darkModeSwitch: false,
      balanceFlag: true,
      errorFlag: false,
      localMaximumAmount: 0,
      spanSwitch: null
    };
  },
  computed: {
    ...mapGetters([
      'excludedListsLength',
      'excludedSellersLength',
      'globalSelectedOption',
      'globalLeadFilter',
      'globalPriceMaxFilter',
      'balanceAmount',
      'globalRadioButtonValue',
    ]),
  },
  methods: {
    redirectCb() {
      this.$router.push({name: "finder"})
    },
    actionCb() {
      this.$router.push({name: "deals"})
    },
    topupCb() {
      this.$router.push({name: "balance"})
    },
    templateHandler() {
      if (this.globalRadioButtonValue === 'leadFilter') {
        this.spanSwitch = 'lead'
        this.localMaximumAmount = this.globalLeadFilter
      } else if (this.globalRadioButtonValue === "priceMaxFilter") {
        this.spanSwitch = 'price'
        this.localMaximumAmount = this.globalPriceMaxFilter
      }
    },
    balanceChecker() {
      this.$store.dispatch('CHECK_BALANCE')
          .then(res => {
            this.$store.commit('setBalanceAmount', res.data.data.balance)
            if (this.balanceAmount === 0) {
              this.balanceFlag = false
              globalTelegram.MainButton.setText("Top up");
              globalTelegram.MainButton.show()
              globalTelegram.MainButton.onClick(this.topupCb);
            } else {
              globalTelegram.MainButton.setText("Confirm allocation and buy leads");
              globalTelegram.MainButton.show()
              globalTelegram.MainButton.onClick(this.actionCb);
            }
          })
          .catch(err => {
            this.errorFlag = true
            console.log(err)
          })
    }
  },
  watch: {
    darkModeSwitch: {
      handler(n) {
        n
            ? this.switchHandler()
            : this.switchRemover()
      },
    },
  },
  created() {
    this.templateHandler()
    this.balanceChecker()
  },
  mounted() {
    globalTelegram.MainButton.color = "#16a34a";
    globalTelegram.BackButton.show().onClick(this.redirectCb);
  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb);
    globalTelegram.MainButton.hide().offClick(this.topupCb);
    globalTelegram.BackButton.hide().offClick(this.redirectCb);
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/MyListsSection/LeadsSeller";
</style>

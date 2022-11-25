<template>
  <div class="header">
    <header class="header_section">
      <h3>FILTER SELLERS</h3>
    </header>
    <main>
      <div> Who you want to buy leads from?</div>
      <div class="button-container">
        <SelectButton
            v-model="selectedFilter"
            :options="filter"
        />
      </div>
      <ul style="list-style: none">
        <li
            v-for="(item, index) in info"
            :key="index"
        >
          <SellerSection
              :name="item.name"
              :rating="item.rating"
              :lists="item.lists"
              :leads="item.leads"
              :historyList="item.historyList"
              :historyLeads="item.historyLeads"
              :checked="checkedList"
              @checker="(el) => {checkerParent(el, index)}"
          />
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import tgMixin from "@/mixins/telegram/tgMixin";
import {mapGetters} from "vuex";

const globalTelegram = window.Telegram.WebApp

export default {
  name: "SellerFilter",
  mixins: [tgMixin],
  components: {
    SellerSection: () => import('@/components/FilterParts/SellerSection')
  },
  data() {
    return {
      checkedList: [],
      selectedFilter: '',
      filter: ['Any seller', 'Choose', 'Exclude'],
      info: [
        {
          name: '#191 MegaSeller',
          rating: '++++-',
          lists: '5',
          leads: '4500',
          historyList: '1',
          historyLeads: '1500'
        },
        {
          name: '#192 MegaSeller',
          rating: '-----',
          lists: '4',
          leads: '4500',
          historyList: '1',
          historyLeads: '500'
        },
        {
          name: '#193 MegaSeller',
          rating: '+++--',
          lists: '3',
          leads: '4500',
          historyList: '1',
          historyLeads: '100'
        }
      ]
    }
  },
  computed: {
    ...mapGetters['excludedSellersLength'],
  },
  methods: {
    checkerParent(el, i) {
      this.$set(this.checkedList, i, el)
    },
    redirectCb() {
      this.$router.push({name: 'finder'})
    },
    actionCb() {
      if (this.$route.path === '/filter-sellers') this.$router.push({name: 'finder'})
    }
  },
  watch: {
    // darkModeSwitch: {
    //   handler(newValue) {
    //     if (newValue) {
    //
    //     } else if (!newValue) {
    //
    //     }
    //   },
    // },
    checkedList: {
      handler(newValue) {
        if (newValue) {
          this.$store.commit('setExcludedSellersLength', newValue.filter(el => !el).length)

          globalTelegram.MainButton.setText('Apply filter')
          globalTelegram.MainButton.color = '#16a34a'
          globalTelegram.MainButton.show()
        } else if (!newValue) {
          globalTelegram.MainButton.hide()
        }
      },
    }
  },
  created() {
    this.checkedList.length = this.info.length
    this.checkedList.fill(true)
  },
  mounted() {
    globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/SellerFilter.scss';
</style>
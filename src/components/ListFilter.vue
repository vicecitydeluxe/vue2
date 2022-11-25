<template>
  <div class="header">
    <header class="header_section">
      <h3>FILTER LISTS</h3>
    </header>
    <main>
      <div>Who you want to buy leads from?</div>
      <div class="button-container">
        <SelectButton
            v-model="selectedFilter"
            :options="filter"
        />
      </div>
      <ul style="list-style: none">
        <li
            v-for="(item, index) in lists"
            :key="index"
        >
          <ListSection
              :name="item.name"
              :rating="item.rating"
              :list="item.list"
              :funnel="item.funnel"
              :uploadDate="item.uploadDate"
              :sold="item.sold"
              :matching="item.matching"
              :total="item.total"
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
  name: "ListFilter",
  mixins: [tgMixin],
  components: {
    ListSection: () => import('@/components/FilterParts/ListSection')
  },
  data() {
    return {
      checkedList: [],
      selectedFilter: 'Any list',
      filter: ['Any list', 'Choose', 'Exclude'],
      lists: [
        {
          name: '#192 MegaSeller',
          rating: '-++--',
          list: 'List Example 1',
          funnel: 'Unknown',
          uploadDate: '22.11.2022',
          sold: '7',
          matching: '15',
          total: '570'
        },
        {
          name: '#190 Seller',
          rating: '-++--',
          list: 'List Example 2',
          funnel: 'Unknown',
          uploadDate: '20.11.2022',
          sold: '3',
          matching: '15',
          total: '1000'
        },
        {
          name: '#192 MegaSeller',
          rating: '-++++',
          list: 'List Example 3',
          funnel: 'Unknown',
          uploadDate: '21.11.2022',
          sold: '1',
          matching: '15',
          total: '570'
        }
      ]
    }
  },
  computed: {
    ...mapGetters['excludedListsLength'],
  },
  methods: {
    checkerParent(el, i) {
      this.$set(this.checkedList, i, el)
    },
    redirectCb() {
      this.$router.push({name: 'finder'})
    },
    actionCb() {
      this.$router.push({name: 'finder'})
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
          this.$store.commit('setExcludedListsLength', newValue.filter(el => !el).length)

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
    this.checkedList.length = this.lists.length
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
@import '../styles/ListFilter.scss';
</style>
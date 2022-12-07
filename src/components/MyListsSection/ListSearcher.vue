<template>
  <div class="header">
    <header class="header_section">
      <h3>MY LISTS</h3>
    </header>
    <main>
      <div>List status</div>
      <div class="button-container">
        <SelectButton
            id="select"
            v-model="selectedFilter"
            :options="filter"
        />
      </div>
      <span
          class="p-input-icon-left"
          style="width:100%;
                 margin-bottom:10px;
                 height: 100%;"
      >
        <i
            class="pi pi-search"
            style="margin-top: -12px;"
        />
        <InputText
            type="text"
            placeholder="Search..."
            v-model="inputValue"
            style="width:100%;
                   margin-bottom:10px;
                   height: 100%;"
        />
    </span>
      <ul
          style="list-style: none"
      >
        <li
            v-for="(item, index) in dynamicList"
            :key="index"
        >
          <SearchSection
              :number='item.number'
              :uploadDate="item.uploadDate"
              :list="item.list"
              :leads="item.leads"
              :leadsPrice="item.leadsPrice"
              :status="item.status"
              @edit="logID"
              @stats="logID"
              @status="logID"
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
  name: "ListSearcher",
  components: {
    SearchSection: () => import('@/components/MyListsSection/ListSearcherParts/Helpers/SearchSection'),
    InputText: () => import ('primevue/inputtext'),
    SelectButton: () => import ('primevue/selectbutton')
  },
  mixins: [tgMixin],
  data() {
    return {
      selectedFilter: 'All',
      filter: ['Hidden', 'Published', 'Archived', 'All'],
      lists: [],
      hiddenHelper: [],
      publishedHelper: [],
      archivedHelper: [],
      inputValue: null
    }
  },
  computed: {
    ...mapGetters(['mockLists']),
    dynamicList() {
      return this["lists" + this.selectedFilter]
    },
    listsAll() {
      if (!this.inputValue) return this.lists
      else {
        return this.lists.filter((_, i) => Object.values(this.lists[i])
            .join('')
            .toLowerCase()
            .includes(this.inputValue.toLowerCase())
        )
      }
    },
    listsHidden() {
      if (!this.inputValue) return this.hiddenHelper
      else {
        return this.hiddenHelper.filter((_, i) => Object.values(this.hiddenHelper[i])
            .join('')
            .toLowerCase()
            .includes(this.inputValue.toLowerCase())
        )
      }
    },
    listsPublished() {
      if (!this.inputValue) return this.publishedHelper
      else {
        return this.publishedHelper.filter((_, i) => Object.values(this.publishedHelper[i])
            .join('')
            .toLowerCase()
            .includes(this.inputValue.toLowerCase())
        )
      }
    },
    listsArchived() {
      if (!this.inputValue) return this.archivedHelper
      else {
        return this.archivedHelper.filter((_, i) => Object.values(this.archivedHelper[i])
            .join('')
            .toLowerCase()
            .includes(this.inputValue.toLowerCase())
        )
      }
    },
  },
  methods: {
    logID(e) {
      this.$store.commit("setMockID", e)
      console.log(e)
    },
    redirectCb() {
      this.$router.push({name: 'layout'})
    },
    // actionCb() {
    //   this.$router.push({name: 'finder'})
    // }
  },
  watch: {
    selectedFilter: {
      handler(n) {
        if (n === 'Hidden' && !this.hiddenHelper.length) {
          this.hiddenHelper = this.lists.filter(el => el.status === 'Hidden')
        } else if (n === 'Published' && !this.publishedHelper.length) {
          this.publishedHelper = this.lists.filter(el => el.status === 'Published')
        } else if (n === 'Archived' && !this.archivedHelper.length) {
          this.archivedHelper = this.lists.filter(el => el.status === 'Archived')
        }
      }, immediate: true
    },
  },
  created() {
    this.lists = this.mockLists
  },
  mounted() {
    setTimeout(() => {
      document.getElementById('select').setAttribute("style", "width:100%; display:flex");
    }, 100)
    // globalTelegram.MainButton.onClick(this.actionCb)
    globalTelegram.BackButton.show().onClick(this.redirectCb)
  },
  beforeDestroy() {
    // globalTelegram.MainButton.hide().offClick(this.actionCb)
    globalTelegram.BackButton.hide().offClick(this.redirectCb)
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/MyListsSection/LeadsFinderParts/ListFilter';
</style>
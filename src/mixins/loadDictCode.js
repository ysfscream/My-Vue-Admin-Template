import { mapActions } from 'vuex'

export default {
  computed: {
    dictCode() {
      return this.$store.state.base.dictCode
    },
  },
  methods: {
    ...mapActions(['GET_DICT_CODE']),
    loadData() {},
  },
  // store 里找不到 dict 时再从后端加载一次
  created() {
    if (this.dictCode && this.dictCode[this.dictCodeKey]) {
      this.loadData()
    } else if (!this.url && !this.options.length) {
      // 从 remote 加载的 && 前端写死的 options 的 select 不触发重新加载
      this.GET_DICT_CODE().then(() => {
        this.loadData()
      })
    } else {
      this.loadData()
    }
  },
}

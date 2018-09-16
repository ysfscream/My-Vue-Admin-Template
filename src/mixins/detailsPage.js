import { httpGet, httpPost, httpPut } from '@/functions/api'

export default {
  data() {
    return {
      pageLoading: false,
      saveLoading: false,
      accessType: undefined,
      detailsID: undefined,
      url: undefined,
      currentPageURL: undefined,
      listPageURL: undefined,
      record: {},
    }
  },
  computed: {
    disabled() {
      if (this.accessType === 'view') {
        return true
      }
      return false
    },
  },
  methods: {
    // eslint-disable-next-line
    processLoadedData(record) {}, // 数据加载后的处理回调
    // 数据加载
    loadData() {
      if (this.accessType === 'create') {
        return
      }
      if (!this.$route.params.id) {
        return
      }
      this.pageLoading = true
      this.detailsID = `${this.$route.params.id}`
      httpGet(`${this.url}/${this.detailsID}`).then((response) => {
        this.record = response.data
        this.processLoadedData(this.record)
        this.pageLoading = false
      }).catch(() => {
        this.pageLoading = false
      })
    },
    // 保存或者编辑
    save() {
      this.$refs.record.validate((valid) => {
        if (!valid) {
          return
        }
        if (this.accessType === 'create') {
          httpPost(`${this.url}`, this.record).then(() => {
            this.$message.success('新建成功!')
            this.$router.push({ path: `${this.listPageURL}` })
          }).catch(() => {
            this.$message.error('新建失败')
          })
        } else if (this.accessType === 'edit') {
          httpPut(`${this.url}/${this.detailsID}`, this.record).then(() => {
            this.$message.success('编辑成功!')
            this.$router.push({ path: `${this.listPageURL}` })
          }).catch(() => {
            this.$message.error('编辑失败')
          })
        }
      })
    },
  },
  created() {
    this.accessType = this.$route.query.oper
    this.currentPageURL = this.$route.path
    this.listPageURL = this.currentPageURL.replace(/\/\d+/g, '')
    this.loadData()
  },
}

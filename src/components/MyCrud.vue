<template>
  <div class="my-crud">
    <div class="crud-header">
      <el-row
        type="flex"
        justify="space-between"
        align="middle">
        <el-col :span="18">
          <span class="crud-title">{{ crudTitle }}</span>
        </el-col>
        <!-- 新建 -->
        <el-col :span="6">
          <slot name="createButton">
            <el-button
              v-if="tableActions.includes('create')"
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="showDetails('create')">新建
            </el-button>
          </slot>
        </el-col>
      </el-row>
    </div>

    <el-row
      type="flex"
      justify="space-between"
      align="middle">
      <el-col :span="12">
        <!-- 批量删除 -->
        <el-button
          v-if="tableActions.includes('deleteAll')"
          class="delete-all"
          float="left"
          type="danger"
          :disabled="this.selectedRecords.length === 0"
          @click="showConfirmDialog()">批量删除
        </el-button>
      </el-col>
      <el-col class="module-right" :span="12">
        <!-- 搜索框 -->
        <my-search-form
          v-if="tableActions.includes('search')"
          :searchOptions="searchOptions"
          :valueOptions="valueOptions"
          @search="search"
          @clear="clear"/>
      </el-col>
    </el-row>

    <el-card>
      <!-- 数据表 -->
      <el-table
        v-loading="loading"
        class="my-table"
        size="medium"
        :data="records"
        :empty-text="emptyText"
        @sort-change="loadRecords"
        @selection-change="selectionChange">
        <!-- 批量删除勾选框 -->
        <el-table-column
          v-if="tableActions.includes('deleteAll')"
          type="selection"
          width="40">
        </el-table-column>
        <!-- table 的其他内容列 -->
        <slot name="tableColumns"></slot>
        <!-- 数据表操作 -->
        <el-table-column min-width="90" class-name="oper">
          <template slot-scope="props">
            <el-button
              v-if="tableActions.includes('view')"
              @click="showDetails('view', props.row.id)"
              type="text">
              查看
            </el-button>
            <el-button
              v-if="tableActions.includes('edit')"
              @click="showDetails('edit', props.row.id)"
              type="text">
              编辑
            </el-button>
            <el-button
              v-if="tableActions.includes('delete')"
              @click="showConfirmDialog(props.row.id)"
              type="text">
              删除
            </el-button>
            <slot name="customOper" :row="props.row"></slot>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页 -->
    <el-pagination
      v-if="total>=1"
      background
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="currentPageChanged"
      @size-change="handleSizeChange">
    </el-pagination>

    <!-- 删除警告弹框 -->
    <my-dialog
      title="警告"
      :visible.sync="confirmDialogVisible"
      @confirm="deleteRecords">
      <span>确认删除？</span>
    </my-dialog>
  </div>
</template>


<script>
import { Card, Row, Col, Table, TableColumn, Pagination, Button, Input, Select, Option } from 'element-ui'
import { httpGet, httpDelete } from '@/functions/api'

import MyDialog from '@/components/MyDialog.vue'
import MySearchForm from '@/components/MySearchForm.vue'

export default {
  name: 'my-crud',
  components: {
    'el-card': Card,
    'el-row': Row,
    'el-col': Col,
    'el-table': Table,
    'el-table-column': TableColumn,
    'el-pagination': Pagination,
    'el-button': Button,
    'el-input': Input,
    'el-select': Select,
    'el-option': Option,
    MyDialog,
    MySearchForm,
  },
  props: {
    crudTitle: {
      type: String,
    },
    tableActions: {
      type: Array,
      default: () => ['view', 'create', 'edit', 'delete'],
    },
    searchOptions: {
      type: Array,
      default: () => [],
    },
    valueOptions: {
      type: Object,
      default: () => ({}),
    },
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isSearch: false,
      querySearch: undefined,
      loading: false,
      btnLoading: false,
      confirmDialogVisible: false,
      emptyText: '',
      currentPageURL: '',
      selectedRecords: [], // 选中的待删除记录
      willDelectIds: [], // 确认删除的id列表
      records: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    }
  },

  methods: {
    loadData() {
      this.currentPageURL = this.$route.path
      this.loadRecords()
    },
    // 加载table数据
    loadRecords() {
      this.loading = true
      this.records = []
      const symbol = this.url.includes('?') ? '&' : '?'
      let requestURL = `${this.url}${symbol}_page=${this.currentPage}&_limit=${this.pageSize}`
      if (this.isSearch && this.querySearch) {
        requestURL = `${requestURL}&${this.querySearch}`
      }
      httpGet(requestURL).then((response) => {
        if (response.data.meta) {
          this.total = response.data.meta.count || 0
        }
        const records = response.data.items
        this.loading = false
        this.records = records
        if (this.records.length < 1) {
          this.emptyText = '暂无数据'
        } else {
          this.emptyText = ' '
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 分页切换更新数据
    currentPageChanged(page) {
      this.currentPage = page
      this.loadRecords()
    },
    // 分页切换每页显示数据数量
    handleSizeChange(val) {
      this.pageSize = val
      this.loadRecords()
    },
    // 删除确认弹窗
    showConfirmDialog(deleteID = undefined) {
      if (deleteID) {
        this.willDelectIds = deleteID
      } else {
        this.willDelectIds = this.selectedRecords.map(record => record.id)
      }
      this.confirmDialogVisible = true
    },
    // 删除单条或者选中的多条记录
    deleteRecords() {
      httpDelete(`${this.url}/${this.willDelectIds}`).then((response) => {
        if (response.status === 204) {
          this.$message.success('删除成功!')
          this.confirmDialogVisible = false
          this.loadRecords()
        }
      }).catch(() => {
        this.$message.error('删除失败!')
        this.confirmDialogVisible = false
      })
    },
    // 勾选每一条待删除记录后的回调
    selectionChange(selections) {
      this.selectedRecords = selections
    },
    showDetails(accessType, id = 0) {
      this.$router.push({
        path: `${this.currentPageURL}/${id}`,
        query: { oper: accessType },
      })
    },
    search(key, value) {
      this.isSearch = true
      this.querySearch = `${key}=${value}`
      this.loadRecords()
    },
    clear() {
      this.isSearch = false
      this.loadRecords()
    },
  },

  created() {
    this.loadData()
  },
}
</script>


<style lang="scss">
.my-crud {
  .crud-header {
    .crud-title {
      line-height: 56px;
      font-size: 18px;
      color: #3e3e3e;
    }
    .el-button {
      float: right;
    }
  }
  .el-pagination {
    float: right;
    margin-top: 16px;
  }
}
</style>

<template>
  <el-select
    clearable
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    :multiple="multiple"
    :filterable="filterable"
    @change="change"
    @focus="loadCustomOpthions">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>


<script>
import { Select, Option } from 'element-ui'
import { httpGet } from '@/functions/api'

import loadDictCode from '@/mixins/loadDictCode'

export default {
  name: 'my-select-view',

  mixins: [loadDictCode],

  props: {
    value: {
      required: true,
    },
    customOptions: { // 自定义 options
      type: Array,
      default: () => [],
    },
    url: { // 查询的 url
      type: String,
      default: '',
    },
    dictCodeKey: { // dict_code 的关键字
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: { // 是否多选
      type: Boolean,
      default: false,
    },
    filterable: { // 是否可搜索
      type: Boolean,
      default: true,
    },
  },

  components: {
    'el-select': Select,
    'el-option': Option,
  },

  data() {
    return {
      options: [],
    }
  },

  methods: {
    loadData() {
      if (this.url) {
        this.loadOptions()
      } else if (this.dictCodeKey) {
        this.options = this.dictCode[this.dictCodeKey]
        // 单选默认选中第一个
        if (!this.multiple && !this.value && this.options[0]) {
          this.$emit('input', this.options[0].value, this.options[0])
        }
      }
    },
    loadCustomOpthions() {
      if (this.customOptions && this.customOptions.length) {
        this.options = this.customOptions
      }
    },
    loadOptions() {
      httpGet(this.url).then((response) => {
        this.options = response.data.items
      })
    },
    // 当 select 选中值变化时，触发父组件的 v-model 绑定
    change(value) {
      const selectedItem = this.options.find($ => $.value === value)
      this.$emit('input', value, selectedItem)
    },
  },

}
</script>

<template>
  <el-row class="my-search-form" type="flex" justify="end" align="middle" :gutter="10">
    <el-select class="search-select__head" v-model="searchKey" placeholder="请选择">
      <el-option
        v-for="(search, index) in searchOptions"
        :key="index"
        :label="search.label"
        :value="search.value">
      </el-option>
    </el-select>
    <el-input
      v-if="!valueOptions[searchKey]"
      clearable
      placeholder="请输入内容"
      v-model="searchValue"
      class="search-input"
      @clear="clear">
    </el-input>
    <el-select
      v-if="valueOptions[searchKey]"
      clearable
      class="search-select__body"
      v-model="searchValue"
      @clear="clear">
      <el-option
        v-for="(item, index) in valueOptions[searchKey]"
        :key="index"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button icon="el-icon-search" @click="search"></el-button>
  </el-row>
</template>


<script>
import { Row, Col, Select, Option, Input, Button } from 'element-ui'

export default {
  name: 'my-search-form',

  components: {
    'el-row': Row,
    'el-col': Col,
    'el-select': Select,
    'el-option': Option,
    'el-input': Input,
    'el-button': Button,
  },

  props: {
    searchOptions: {
      type: Array,
      default: () => [],
    },
    valueOptions: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      searchValue: '',
      searchKey: this.searchOptions[0].value,
    }
  },

  watch: {
    searchKey() {
      this.searchValue = ''
    },
  },

  methods: {
    search() {
      this.$emit('search', this.searchKey, this.searchValue)
    },
    clear() {
      this.$emit('clear')
    },
  },
}
</script>


<style lang="scss">
.my-search-form {
  margin: 0 0 16px 0 !important;
  .search-select__head {
    width: 160px;
    .el-input__inner {
      border-radius: 4px 0 0 4px;
    }
  }
  .search-select__body {
    .el-input__inner {
      border-radius: 0px;
    }
  }
  .search-input {
    .el-input__inner {
      border-radius: 0px;
    }
  }
  .search-select__body {
    width: 100% !important;
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #dcdfe6;;
  }
  .el-select .el-input__inner:focus {
    border-color: #dcdfe6;
  }
  .el-button {
    border-radius: 0 4px 4px 0;
  }
}
</style>

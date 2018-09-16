<template>
    <el-row class="my-details-head" type="flex" justify="space-between" align="middle">
      <el-col :span="18">
        <slot name="breadcrumb">
          <el-breadcrumb>
            <el-breadcrumb-item :to="backPath">{{ backTitle }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ accessTitle }}</el-breadcrumb-item>
          </el-breadcrumb>
        </slot>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
</template>


<script>
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'element-ui'

export default {
  name: 'my-details-head',
  components: {
    'el-row': Row,
    'el-col': Col,
    'el-breadcrumb': Breadcrumb,
    'el-breadcrumb-item': BreadcrumbItem,
  },
  props: {
    backTitle: {
      type: String,
      required: true,
    },
  },
  computed: {
    backPath() {
      return this.$route.path.replace(/\/\d+/g, '')
    },
    accessTitle() {
      const accessType = this.$route.query.oper
      switch (accessType) {
        case 'view':
          return '详情'
        case 'create':
          return '新建'
        case 'edit':
          return '编辑'
        default:
          return '详情'
      }
    },
  },
}
</script>


<style lang="scss">
.my-details-head {
  height: 56px;
  .el-breadcrumb {
    font-size: 18px;
    .el-breadcrumb__inner {
      vertical-align: top;
    }
    .el-breadcrumb__inner {
      font-weight: 400;
    }
  }
}
</style>

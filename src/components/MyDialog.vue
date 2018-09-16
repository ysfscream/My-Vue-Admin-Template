<template>
  <el-dialog
    class="emq-dialog"
    :visible.sync="visible"
    :title="title"
    :width="width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @close="close">
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="hideDialog">取 消</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-check"
        :loading="saveLoading"
        @click="confirmClick">确定
      </el-button>
    </div>
  </el-dialog>
</template>


<script>
import { Dialog, Button } from 'element-ui'

export default {
  name: 'emq-dialog',
  components: {
    'el-dialog': Dialog,
    'el-button': Button,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '400px',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    saveLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    confirmClick() {
      this.$emit('confirm')
    },
    close() {
      this.$emit('close')
    },
    hideDialog() {
      this.$emit('update:visible', false)
    },
  },
}
</script>


<style lang="scss">
.emq-dialog {
  .el-dialog__header {
    padding: 0 20px;
    line-height: 56px;
    border-bottom: 1px solid #f1f1f1;
    .el-dialog__title {
      color: #3e3e3e;
    }
    .el-icon-close {
      vertical-align: middle;
    }
  }
  .el-dialog__body {
    padding: 30px 20px 10px;
  }
  .el-dialog__footer {
    padding: 5px 20px 20px;
    .el-button--text {
      margin-right: 24px;
      color: #8e9196;
      &:hover {
        color: #409EFF;
      }
    }
    .el-button {
      font-size: 14px;
    }
  }
}
</style>

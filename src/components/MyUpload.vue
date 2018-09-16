<template>
  <div class="my-upload">
    <el-upload
      :list-type="listType"
      :class="{'disabled': disabled}"
      :action="action"
      :accept="accept"
      :headers="uploadHeaders"
      :limit="limit"
      :on-exceed="handleExceed"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :file-list="fileList">
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 查看照片详情 -->
    <el-dialog
      width="70%"
      :visible.sync="photoDetailDialogVisible">
      <img :src="detailPhotoURL">
    </el-dialog>
  </div>
</template>


<script>
import { Upload, Button, Dialog } from 'element-ui'

export default {
  name: 'my-upload',
  components: {
    'el-upload': Upload,
    'el-button': Button,
    'el-dialog': Dialog,
  },
  props: {
    value: {
      required: true,
    },
    uploadType: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
    limit: {
      type: Number,
    },
    listType: {
      type: String,
    },
  },
  data() {
    return {
      uploadLoading: false,
      photoDetailDialogVisible: false,
      action: '',
      accept: '',
      uploadHeaders: {},
      fileTypeErrorMessage: '',
      fileList: [],
      detailPhotoURL: '', // 点击图片文件后显示图片预览
    }
  },
  watch: {
    value(newValue) {
      if (newValue && newValue.length > 0 && newValue[0].name) {
        this.fileList = newValue
      }
    },
    fileList(newValue) {
      const ids = newValue.map(file => file.uploadID)
      this.$emit('input', ids)
    },
  },
  methods: {
    uploadConfig() {
      switch (this.uploadType) {
        case 'photo':
          this.action = '/api/upload_photo'
          this.accept = 'image/jpeg, image/bmp, image/gif, image/png'
          this.fileTypeErrorMessage = '请上传图片格式文件(jpg,png,bmp)'
          break
        case 'package':
          this.action = '/api/upload_package'
          this.accept = 'application/zip, application/gz, application/tar, application/tgz'
          this.fileTypeErrorMessage = '请上传 zip,gz,tar,tgz 格式文件'
          break
        default:
          this.action = '/api/upload_photo'
          this.accept = 'image/jpeg, image/bmp, image/gif, image/png'
          this.fileTypeErrorMessage = '请上传图片格式文件(jpg,png,bmp)'
      }
      this.tokenInit()
    },
    tokenInit() {
      this.uploadLoding = true
      const user = JSON.parse(sessionStorage.getItem('user')) ||
        JSON.parse(localStorage.getItem('user'))
      if (user) {
        this.uploadHeaders = {
          Authorization: `Bearer ${user.token}`,
        }
      }
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePreview(file) {
      this.detailPhotoURL = file.url
      if (this.uploadType === 'photo') {
        this.photoDetailDialogVisible = true
      } else {
        window.location.href = file.url
      }
    },
    handleSuccess(response, file, fileList) {
      file.uploadID = response.uploadID
      this.fileList = fileList
      this.$message.success('上传成功')
      this.uploadLoding = false
    },
    handleError(error) {
      if (error.status === 401) {
        this.$message.error('请登录')
      } else if (error.status === 400) {
        this.$message.error(this.fileTypeErrorMessage)
      } else {
        this.$message.error('服务器错误')
      }
      this.uploadLoding = false
    },
    handleExceed() {
      this.$message.error('只能上传一张标题图片')
    },
  },
  created() {
    this.uploadConfig()
  },
}
</script>


<style lang="scss">
.my-upload {
  .el-upload-list--picture-card .el-upload-list__item,
  .el-upload--picture-card {
    width: 80px;
    height: 80px;
  }
  /* 解决缩略图编译后高宽为0的问题 */
  .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    display: block !important;
  }
  .el-upload--picture-card {
    line-height: 86px;
  }
  .disabled {
    .el-upload-list {
      clear: left;
      padding-top: 1px;
    }
    .el-upload--picture-card,
    .el-upload--text,
    .el-upload-list .el-upload-list__item-status-label,
    .el-upload-list .el-icon-close {
      display: none;
    }
    .el-upload-list--picture-card .el-upload-list__item-actions:hover {
      .el-upload-list__item-delete {
        display: none;
      }
    }
  }
  .el-dialog__body {
    text-align: center;
    img {
      max-width: 90%;
    }
  }
}
</style>

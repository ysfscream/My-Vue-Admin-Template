<template>
  <div class="topbar">
    <div class="topbar-right">
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          {{ user.username }}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout" class="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <my-dialog
      title="修改密码"
      :saveLoading="btnLoading"
      :visible.sync="passwrodDialogVisible"
      @confirm="changePassword"
      @close="passwordDialogClosed">
      <el-form
        ref="changePasswordForm"
        :model="changePasswordForm"
        :rules="changePasswordRules">
        <el-form-item prop="oldPassword">
          <el-input
            v-model="changePasswordForm.oldPassword"
            size="medium"
            type="password"
            placeholder="旧密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="changePasswordForm.password"
            size="medium"
            type="password"
            placeholder="新密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="changePasswordForm.confirmPassword"
            size="medium"
            type="password"
            placeholder="密码确认">
          </el-input>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
import { Dropdown, DropdownMenu, DropdownItem, Form, FormItem, Input } from 'element-ui'
import { SHA256 } from 'crypto-js'

import { httpPut } from '@/functions/api'
import MyDialog from '@/components/MyDialog.vue'

export default {
  name: 'topbar',
  components: {
    'el-dropdown': Dropdown,
    'el-dropdown-menu': DropdownMenu,
    'el-dropdown-item': DropdownItem,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    MyDialog,
  },
  data() {
    return {
      btnLoading: false,
      passwrodDialogVisible: false,
      changePasswordForm: {
        oldPassword: '',
        password: '',
        confirmPassword: '',
      },
      changePasswordRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码' },
          { min: 6, message: '密码长度必须为6位以上字符' },
        ],
        password: [
          { required: true, message: '请输入新密码' },
          { min: 6, message: '密码长度必须为6位以上字符' },
        ],
        confirmPassword: [
          { required: true, validator: this.validatePassword },
          { min: 6, message: '密码长度必须为6位以上字符' },
        ],
      },
    }
  },
  computed: {
    user() {
      return this.$store.state.account.user
    },
  },
  methods: {
    ...mapActions(['USER_LOGOUT']),
    logout() {
      this.USER_LOGOUT()
      this.$router.push({ path: '/login' })
    },
    handleCommand(command) {
      if (command === 'changePassword') {
        this.changePasswordForm = {}
        this.passwrodDialogVisible = true
      }
      if (command === 'logout') {
        this.logout()
      }
    },
    // 修改密码
    changePassword() {
      this.$refs.changePasswordForm.validate((valid) => {
        if (!valid) {
          return
        }
        const data = {
          oldPassword: SHA256(this.changePasswordForm.oldPassword).toString(),
          password: SHA256(this.changePasswordForm.password).toString(),
        }
        this.btnLoading = true
        httpPut('/reset_password', data).then(() => {
          this.$message.success('修改密码成功')
          this.logout()
          this.btnLoading = false
          this.dialogVisible = false
        }).catch(() => {
          this.btnLoading = false
          this.dialogVisible = false
        })
      })
    },
    // 确认密码校验
    validatePassword(rule, value, callback) {
      if (!this.changePasswordForm.confirmPassword) {
        callback(new Error('请输入确认密码'))
        return
      }
      if (this.changePasswordForm.password !== this.changePasswordForm.confirmPassword) {
        callback(new Error('前后密码不一致'))
        return
      }
      callback()
    },
    passwordDialogClosed() {
      this.$refs.changePasswordForm.resetFields()
    },
  },
}
</script>


<style lang="scss">
.topbar {
  background-color: #fff;
  width: 100%;
  height: 100%;
  .topbar-right {
    float: right;
    margin-right: 20px;
    line-height: 56px;
  }
  .topbar-right .el-dropdown {
    float: right;
    margin-left: 15px;
  }
  .topbar-right .el-dropdown-link {
    cursor: pointer;
  }
}
</style>

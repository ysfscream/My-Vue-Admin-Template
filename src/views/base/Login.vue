<template>
  <el-row class="login-view">
    <el-col class="login-card" :xs="22" :sm="11" :md="9" :lg="8" :xl="6">
      <el-card>
        <div slot="header">
          <span>系统登录</span>
        </div>
        <el-form label-position="right" ref="loginForm" :rules="rules" :model="record">
          <el-form-item label="用户名" prop="email">
            <el-input v-model="record.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="record.password"></el-input>
          </el-form-item>
          <el-form-item label="记住密码">
            <el-switch v-model="record.remember"></el-switch>
          </el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="login">登 录</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>


<script>
import { Row, Col, Card, Form, FormItem, Input, Button, Switch } from 'element-ui'
import { SHA256 } from 'crypto-js'
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'login-view',

  components: {
    'el-row': Row,
    'el-col': Col,
    'el-card': Card,
    'el-input': Input,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-switch': Switch,
    'el-button': Button,
  },

  data() {
    return {
      btnLoading: false,
      record: {
        email: '',
        password: '',
        remember: true,
      },
      rules: {
        email: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
        ],
      },
    }
  },

  methods: {
    ...mapActions(['USER_LOGIN', 'GET_DICT_CODE']),
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          return
        }
        const headers = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
        const data = {
          email: this.record.email,
          password: SHA256(this.record.password).toString(),
          remember: this.record.remember,
        }
        this.btnLoading = true
        axios.post('/api/v1/login', { ...data }, { headers })
          .then((response) => {
            const userInfo = {
              token: response.data.token,
              userID: response.data.user_id,
              username: response.data.username,
            }
            this.USER_LOGIN({ user: userInfo, remember: this.record.remember })
            this.GET_DICT_CODE()
            const path = decodeURIComponent(this.$route.query.redirect || '/')
            this.$router.push({ path })
            this.btnLoading = false
          })
          .catch((error) => {
            this.btnLoading = false
            if (error.response.status === 401) {
              this.$message.error('用户名或密码错误')
            } else {
              this.$message.error('登录失败')
            }
          })
      })
    },
  },
}
</script>


<style lang="scss">
.login-view {
  height: 100%;
  .login-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    .el-card__header {
      text-align: center;
      font-size: 20px;
    }
    .el-card__body {
      padding: 16px 20px 20px;
      .el-form-item.is-required .el-form-item__label:before {
        display: none;
      }
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>

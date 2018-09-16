<template>
  <el-menu
    router
    class="leftbar-view"
    text-color="#bfcbd9"
    background-color="#304156"
    :default-active="'/' + $route.path.split('/')[1]">
    <el-menu-item class="site-title" index="" route>
      <span slot="title">后台管理系统</span>
    </el-menu-item>
    <el-menu-item class="menu-list" :index="menu.url" :key="menu.id" v-for="menu in menus">
      <i :class="menu.icon"></i>
      <span slot="title">{{ menu.title }}</span>
    </el-menu-item>
  </el-menu>
</template>


<script>
import { Menu, MenuItem } from 'element-ui'

export default {
  name: 'leftbar-view-view',

  components: {
    'el-menu': Menu,
    'el-menu-item': MenuItem,
  },

  data() {
    return {
      menus: [
        { title: 'Licenses 管理', url: '/licenses' },
        { title: '客户管理', url: '/clients' },
        { title: '博客管理', url: '/blog' },
        { title: '发布管理', url: '/releases' },
      ],
    }
  },
}
</script>


<style lang="scss">
.leftbar-view {
  z-index: 999;
  width: 100%;
  height: 100%;
  .site-title {
    background-color: #409EFF !important;
    color: #fff !important;
    font-size: 18px;
    cursor: default;
    padding-left: 30px !important;
  }
  .menu-list {
    span {
      margin-left: 10px;
    }
  }
  .el-icon-menu {
    visibility: hidden;
  }
}
</style>

<template>
  <div class="home-view">
    <el-container>
      <el-aside width="200px">
        <leftbar></leftbar>
      </el-aside>
      <el-container>
        <el-header height="56px">
          <topbar></topbar>
        </el-header>
        <el-main>
          <div class="home-content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import { Container, Aside, Header, Main } from 'element-ui'

import Topbar from '@/components/Topbar.vue'
import Leftbar from '@/components/Leftbar.vue'

export default {
  name: 'home-view',
  components: {
    'el-container': Container,
    'el-aside': Aside,
    'el-header': Header,
    'el-main': Main,
    Topbar,
    Leftbar,
  },
}
</script>


<style lang="scss">
.home-view {
  height: 100%;
  background-color: #f0f2f5;
  .el-main {
    padding-top: 8px;
  }
  .el-container {
    height: 100%;
    .el-header {
      top: 0;
      left: 200px;
      right: 0;
      padding: 0;
    }
  }
}
</style>

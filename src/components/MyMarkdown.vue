<template>
  <div class="my-markdown-view" id="editor" :style="`height: ${height}`">
    <mavon-editor
      ref="markdown"
      :value="contents"
      style="height: 100%"
      :editable="!disabled"
      :toolbars="toolbars"
      :boxShadow="false"
      @imgAdd="imgAdd"
      @input="change"/>
  </div>
</template>


<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { httpUpload } from '@/functions/api'

export default {
  name: 'my-markdown-view',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    contents: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '750px',
    },
  },

  components: {
    mavonEditor,
  },

  data() {
    return {
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    }
  },

  methods: {
    change(value) {
      this.$emit('input', value)
    },
    imgAdd(pos, $file) {
      httpUpload('/upload/photo', $file, 'file').then((response) => {
        this.$refs.markdown.$img2Url(pos, response.data.url)
      })
    },
  },

  created() {
    // console.log(this.contents)
  },
}
</script>


<style lang="scss">
#editor {
  margin: auto;
  width: 100%;
  margin-bottom: 20px;
}
</style>


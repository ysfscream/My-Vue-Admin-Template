module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      '/api/v1': {
        target: `${process.env.VUE_APP_SERVER}`,
        changeOrigin: true,
      },
    },
  },
}

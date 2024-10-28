const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // Tambahkan publicPath agar Vue.js tahu di mana file-file statis diakses
  publicPath: '/admin/',
})

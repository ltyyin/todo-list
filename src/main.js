import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 声明一个全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')

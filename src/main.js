// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
// mint ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

window.onload=function(){
    var width = window.screen.width;
	document.documentElement.style.fontSize = (width/750)*100+'px'
}  
//当浏览器窗口大小改变时，设置显示内容的高度 
window.onresize=function(){
    var width = window.screen.width;
	document.documentElement.style.fontSize = (width/750)*100+'px'
}
//==
axios.defaults.headers.common={
	'DAIWAN-API-TOKEN':'32133-23493-43483-4A83A'
}
Vue.prototype.ajax = axios;

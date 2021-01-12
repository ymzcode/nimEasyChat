import Vue from 'vue'
import App from './App'

import store from './store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store

// 尝试捕获vue中的错误
Vue.config.errorHandler = function (err, vm, info) {
	console.error('尝试捕获vue中的错误', err, vm, info);
	store.state.initNim.errCommon.uploadInfo(`${err.toString()} ||||||| ${info.toString()} |||||||`)
}

const app = new Vue({
    ...App,
	store
})
app.$mount()

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'vue-moment'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(moment)

axios.defaults.baeURL = 'http://localhost:3000';


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

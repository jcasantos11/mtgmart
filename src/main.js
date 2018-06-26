import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDIs-s1LLa59Y0m0JheC6Jq-7SBFJ3nlOo',
      authDomain: 'mtgmart-3ab34.firebaseapp.com',
      databaseURL: 'https://mtgmart-3ab34.firebaseio.com',
      projectId: 'mtgmart-3ab34',
      storageBucket: 'mtgmart-3ab34.appspot.com'
    })

    this.$store.dispatch('loadItems')
  }
})

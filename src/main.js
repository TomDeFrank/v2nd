import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store'
import * as firebase from 'firebase'
import FormAlert from '@/components/User/FormAlert'

Vue.use(Vuetify)
Vue.component('tbd-form-alert', FormAlert)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
  created(){
    var config = {
      apiKey: "AIzaSyBvDMP8BIwhDpkgb-9ovPcNk4IT7dGTRng",
      authDomain: "vuetify-tutorial.firebaseapp.com",
      databaseURL: "https://vuetify-tutorial.firebaseio.com",
      projectId: "vuetify-tutorial",
      storageBucket: "vuetify-tutorial.appspot.com",
      messagingSenderId: "190715957768"
    };
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', {id: user.uid})
      } else {
        this.$store.dispatch('signOut')
      }
    });
  },
  mounted(){
    this.$store.dispatch('loadMeetups');
  }
})

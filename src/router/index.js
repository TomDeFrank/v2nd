import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetup from '@/components/Meetups/Meetup'
import Meetups from '@/components/Meetups/Meetups'
import SignIn from '@/components/User/SignIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'Meetup',
      path: '/meetup/:id',
      component: Meetup,
      props: true
    },
    {
      name: 'Meetups',
      path: '/meetups',
      component: Meetups
    },
    {
      name: 'SignIn',
      path: '/signin',
      component: SignIn
    }
  ]
})

<template lang="pug">
  v-app(toolbar)
    v-navigation-drawer(temporary, v-model='drawer', light, overflow, absolute)
      v-list(dense)
        v-list-tile(v-for='(item,i) in currentMenu', :key='item.title', :to="item.path")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
    v-toolbar(fixed, dark)
      v-toolbar-side-icon(@click.stop='drawer = !drawer')
      v-toolbar-title Dev Meetup
      v-spacer
      v-toolbar-items(class="hidden-sm-and-down")
        v-btn(v-for="item in currentMenu", key='item.title', flat, :to="item.path") {{item.title}}
        v-btn(v-if="currentUser", @click="signOut", flat) Sign Out
    main
      router-view
    // debug area
    v-dialog(v-model="showModal", fullscreen, transition="dialog-bottom-transition", hide-overlay)
      v-btn(class="pink", dark, small, fixed, bottom, right, fab, style="bottom:2rem",slot="activator")
        v-icon add
      v-card(style="background:#eee")
        v-toolbar(dark class="primary")
          v-btn(icon @click.native="showModal = false" dark)
            v-icon close
          v-toolbar-title Debug
        v-card-text
          v-layout(column)
            div currentUser: {{ debugState.currentUser == null ? 'null or undefined' : debugState.currentUser }}
            div currentMeetup: {{ debugState.currentMeetup == null ? 'null or undefined' : debugState.currentMeetup }}
            div Number of Meetups: {{ debugState.meetups.length }}
            div(class="title mt-4 py-2") Meetups:
            div(v-for="m in debugState.meetups" style="border:1px solid #ccc; background:#fff; padding: 0.5rem; margin-bottom:0.5rem")
              div(v-for="(item,key) in m") <b>{{key}}:</b> {{item.length > 200 ? item.substr(0,100) + '...' : item}}
</template>

<script>
  export default {
    data(){
      return {
        drawer: null,
        showModal: false
      }
    },
    computed: {
      currentUser(){
        return this.$store.getters.currentUser
      },
      currentMenu(){
        var signedInMenu = [
          {title: "Home", icon: "home", path: "/"},
          {title: "Meetups", icon: "people", path: "/meetups"},
          {title: "Organize Meetup", icon: "add_location", path: "/organize-meetup"},
          {title: "Profile", icon: "person", path: "/profile"}
        ]
        var signedOutMenu = [
          {title: "Home", icon: "home", path: "/"},
          {title: "Meetups", icon: "people", path: "/meetups"},
          {title: "Sign In", icon: "person", path: "/signin"}
        ]
        if(this.currentUser){
          return signedInMenu
        } else {
          return signedOutMenu
        }
      },
      debugState(){
        return this.$store.getters.debugState
      }
    },
    methods: {
      signOut(){
        this.$store.dispatch('signOut')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>

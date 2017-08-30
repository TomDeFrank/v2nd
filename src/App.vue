<template lang="pug">
  v-app(toolbar, footer)
    v-navigation-drawer(temporary, v-model='drawer', light, overflow, absolute)
      v-list(dense)
        v-list-tile(v-for='(item,i) in currentMenu', :key='item.title', :to="item.path")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
        template(v-if="currentUser")
          v-list-tile
            v-list-tile-action
              v-icon exit_to_app
            v-list-tile-content
              v-list-tile-title Sign out
    v-toolbar(fixed, dark)
      v-toolbar-side-icon(@click.stop='drawer = !drawer')
      v-toolbar-title Dev Meetup
      v-spacer
      v-toolbar-items(class="hidden-sm-and-down")
        v-btn(v-for="item in currentMenu", key='item.title', flat, :to="item.path") {{item.title}}
        v-btn(v-if="currentUser", @click="signOut", flat) Sign Out
    main
      transition(name="fade", mode="out-in")
        router-view
    v-footer(class="grey darken-4", bottom)
      span(class="white--text") &copy; 2017
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
          {title: "Sign Up", icon: "person", path: "/signup"},
          {title: "Sign In", icon: "person", path: "/signin"}
        ]
        if(this.currentUser){
          return signedInMenu
        } else {
          return signedOutMenu
        }
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
  .fade-enter, .fade-leave-to{
    opacity:0
  }
  .fade-enter-to{
    opacity:1
  }
  .fade-enter-active, .fade-leave-active{
    transition:0.2s opacity;
  }
</style>

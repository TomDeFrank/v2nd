<template lang="pug">
  v-app(toolbar)
    v-navigation-drawer(temporary, v-model='drawer', light, overflow, absolute)
      v-list(dense)
        v-list-tile(v-for='item in menu', :key='item.title', :to="item.path")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
    v-toolbar(fixed, dark)
      v-toolbar-side-icon(@click.stop='drawer = !drawer')
      v-toolbar-title Dev Meetup
      v-spacer
      v-toolbar-items(class="hidden-sm-and-down")
        v-btn(v-for="item in menu", key='item.title', flat) {{item.title}}
    main
      router-view
</template>

<script>
  export default {
    data(){
      return {
        drawer: null,
        menu: [
          {title: "Home", icon: "home", path: "/"},
          {title: "Meetups", icon: "people", path: "/meetups"},
          {title: "Organize Meetup", icon: "add_location", path: "/organize-meetup"},
          {title: "Profile", icon: "person", path: "/profile"},
          {title: "Sign In", icon: "person", path: "/signin"}
        ]
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>

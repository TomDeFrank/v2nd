<template lang="pug">
  v-container(fluid)
      v-layout(justify-center)
        v-flex(xs12, md10, lg8)
          v-card(v-if="currentMeetup" class="elevation-5")
            v-card-title(class="headline") {{currentMeetup.title}}
            v-card-media(:src="currentMeetup.imageUrl", height="300px", style="border-bottom:2px solid #212121; border-top:2px solid #212121")
            v-card-text
              div(class="title") {{currentMeetup.location}}
              div(class="subtitle") {{dt}} ({{ fromNow }})
            v-divider
            v-card-text
              p {{currentMeetup.description}}
            v-card-actions
              v-spacer
              v-btn(v-if="!registered", @click="register", primary) Register
              v-btn(v-else, @click="unregister", primary) Unregister
</template>

<script>
  import moment from 'moment'

  export default {
    props: ['id'],
    computed: {
      currentMeetup(){
        return this.$store.getters.currentMeetup
      },
      currentUser(){
        return this.$store.getters.currentUser
      },
      fromNow(){
        return moment(this.currentMeetup.datetime).fromNow()
      },
      dt(){
        return moment(this.currentMeetup.datetime).format("YYYY-MM-DD hh:mm A Z")
      },
      registered(){
        if (this.currentUser){
          var regMeetups = this.currentUser.registeredMeetups
          // if regMeetups is not an array, they are not reg'd for any
          if(!Array.isArray(regMeetups)){ return false }
          return regMeetups.some(m => this.id === m)
        }
      }
    },
    methods: {
      register(){
        this.$store.dispatch('registerMeetup', {currentUser: this.currentUser, meetupID: this.currentMeetup.id})
      },
      unregister(){
        this.$store.dispatch('unregisterMeetup', {currentUser: this.currentUser, meetupID: this.currentMeetup.id})
      }
    },
    created(){
      this.$store.dispatch('getMeetupById', this.id)
    },
    destroyed(){
      this.$store.dispatch('unsetCurrentMeetup')
    }
  }
</script>

<style>

</style>

<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm10, md8)
        v-card
          v-cart-text
            div {{currentUser.email}}
            div {{currentUser.registeredMeetups}}
</template>

<script>
  import moment from 'moment'

  export default {
    computed: {
      meetups(){
        return this.$store.getters.meetups
      },
      currentUser(){
        return this.$store.getters.currentUser
      }
    },
    methods: {
      fromNow(datetime){
        return moment(datetime).fromNow()
      },
      moreDetails(id){
        this.$router.push('/meetup/' + id)
      },
      dt(datetime){
        return moment(datetime).format("YYYY-MM-DD hh:mm A Z")
      }
    }
  }
</script>

<style>

</style>

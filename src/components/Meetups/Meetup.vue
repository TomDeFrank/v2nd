<template lang="pug">
  v-container(fluid)
      v-layout(justify-center)
        v-flex(xs12, sm10, md9, lg6)
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
              v-btn(primary) Register
</template>

<script>
  import moment from 'moment'

  export default {

    props: ['id'],
    computed: {
      currentMeetup(){
        return this.$store.getters.currentMeetup
      },
      fromNow(){
        return moment(this.currentMeetup.datetime).fromNow()
      },
      dt(){
        return moment(this.currentMeetup.datetime).format("YYYY-MM-DD hh:mm A Z")
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

<template lang="pug">
  v-container(fluid)
      v-layout(justify-center)
        v-flex(xs12, sm10, md9)
          v-card
            v-card-title
              h4(class="ma-0") {{currentMeetup.title}}
            v-card-media(:src="currentMeetup.imageUrl", height="300px")
            v-card-text
              h5 {{currentMeetup.location}}
              h6 {{currentMeetup.date}}
              p {{currentMeetup.description}}
            v-card-actions
              v-spacer
              v-btn(primary) Register
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      currentMeetup(){
        return this.$store.getters.currentMeetup
      }
    },
    created(){
      this.$store.dispatch('getMeetupById', this.id)
    }
  }
</script>

<style>

</style>

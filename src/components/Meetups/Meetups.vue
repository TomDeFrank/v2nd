<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm10, md8)
        v-card(v-for="(meetup,i) in meetups", :key="i" class="mb-4")
          v-layout(wrap)
            v-flex(xs12, sm5, md4)
              v-card-media(:src="meetup.imageUrl", height="100%", style="min-height:150px")
            v-flex(xs12, sm7, md8)
              v-card-title
                div(class="headline") {{meetup.title}}
              v-card-text(class="py-0")
                div(class="title") {{meetup.location}}
                div(class="subtitle") {{dt(meetup.datetime)}} ({{ fromNow(meetup.datetime) }})
              v-card-actions
                v-spacer
                v-btn(primary @click="moreDetails(meetup.id)") More Details
</template>

<script>
  import moment from 'moment'

  export default {
    props: ['id'],
    computed: {
      meetups(){
        return this.$store.getters.meetups
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

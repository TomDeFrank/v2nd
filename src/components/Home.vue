<template lang="pug">
  v-container(fluid)
      v-layout(justify-center)
        v-flex(xs12, sm10, md9)
          v-carousel(v-if="meetups.length > 0")
              v-carousel-item(v-for="(item,i) in meetups",
              :src="item.imageUrl",
              :key="i",
              style="cursor:pointer",
              @click="navToMeetup(item.id)")
</template>

<script>
  export default {
    computed: {
      meetups(){
        return this.$store.getters.featuredMeetups
      }
    },
    methods:{
      navToMeetup(id){
        this.$router.push('/Meetup/' + id)
      }
    }
  }
</script>

<style>

</style>

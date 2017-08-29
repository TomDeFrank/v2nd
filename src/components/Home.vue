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
                h4(class="pa-3",style="color:#fff;background-color:rgba(0,0,0,0.6)") {{item.title}}
          v-layout(row, justify-center, mt-3)
            v-btn(primary to="/meetups") View Meetups
            v-btn(primary to="/organize-meetup") Organize Meetup
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

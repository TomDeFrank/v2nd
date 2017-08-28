<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm10, md8)
        v-card(v-for="(meetup,i) in meetups", :key="i" class="mb-4")
          v-layout(row-md column)
            v-flex(md4)
              v-card-media(:src="meetup.imageUrl", height="100%", style="min-height:150px")
            v-flex(md8)
              v-card-title
                h4(class="ma-0") {{meetup.title}}
              v-card-text(class="py-0")
                h5(class="ma-0") {{meetup.location}}
                h6 {{meetup.date}}
              v-card-actions
                v-spacer
                v-btn(primary @click="moreDetails(meetup.id)") More Details
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetups(){
        return this.$store.getters.meetups
      }
    },
    methods: {
      moreDetails(id){
        this.$router.push('/meetup/' + id)
      }
    }
  }
</script>

<style>

</style>

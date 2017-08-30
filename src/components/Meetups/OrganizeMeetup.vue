<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm10, md8, lg6)
        v-card
          v-card-title(class="primary white--text mb-0 pa-3 headline") Sign In
          v-card-text
            v-container(grid-list-lg)
              v-text-field(name="title", label="Meetup Title", id="title")
              v-text-field(name="location", label="Location", id="location")
              v-layout(row)
                v-flex(xs6)
                  v-text-field(name="date", label="Date", id="date")
                v-flex(xs6)
                  v-text-field(name="time", label="Time", id="time")
              v-text-field(name="imagurl", label="Image Url", id="imagurl")
              v-text-field(name="description", label="Description", id="description")
</template>

<script>
  export default {
    data(){
      return {

      }
    },
    methods: {

    }
  }
</script>

<style>

</style>

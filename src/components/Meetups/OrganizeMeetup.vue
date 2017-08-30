<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm10, md8, lg6)
        p {{getMoment}}
        v-card
          v-card-title(class="primary white--text mb-0 pa-3 headline") Organize Meetup
          v-card-text
            v-container(grid-list-lg)
              v-text-field(name="title", label="Meetup Title", id="title")
              v-text-field(name="location", label="Location", id="location")
              v-layout(row)
                v-flex(xs6)
                  v-menu(lazy, :close-on-content-click="false", transition="slide-x-transition", offset-y, full-width, :nudge-left="40", :nudge-top="30", max-width="290px")
                    v-text-field(slot="activator", label="Select a date",  v-model="date", prepend-icon="event", readonly)
                    v-date-picker(v-model="date", scrollable, autosave)
                v-flex(xs6)
                  v-menu(lazy, :close-on-content-click="false", transition="slide-x-transition", offset-y, full-width, :nudge-left="40", :nudge-top="30", max-width="290px")
                    v-text-field(slot="activator", label="Select a time", v-model="time", prepend-icon="access_time", readonly)
                    v-time-picker(v-model="time", autosave)
              v-text-field(name="imagurl", label="Image Url", id="imagurl")
              v-text-field(name="description", label="Description", id="description")
              v-card-actions(justify-center)
                v-spacer
                v-btn(primary, @click.prevent="signIn") Create Meetup
                v-spacer
</template>

<script>
  import moment from 'moment'

  export default {
    data(){
      return {
        date: '',
        time: '',
      }
    },
    computed: {
      getMoment(){
        if(this.date && this.time){
          var meridiem = this.time.substr(-2)
          var thetime = this.time.slice(0, -2)
          var l = thetime.match(/\d*[^:]/)
          l[0].length < 2 ? thetime = "0" + thetime : false
          if (meridiem === 'pm'){
            var h = thetime.match(/\d*[^:]/)
            var m = thetime.match(/[^:]\d/)
            thetime = parseInt(h) + 12 + ':' + m
            return moment(this.date + " " + thetime)
          } else {
            return moment(this.date + " " + thetime)
          }
        }
      }
    },
    methods: {

    }
  }
</script>

<style>

</style>

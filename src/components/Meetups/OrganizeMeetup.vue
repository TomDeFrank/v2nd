<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm10, md8, lg6)
        v-card
          v-card-title(class="primary white--text mb-0 pa-3 headline") Organize Meetup
          tbd-form-alert(:error="error")
          v-card-text
            v-container(grid-list-lg)
              v-text-field(label="Meetup Title", v-model="title")
              v-text-field(label="Location", v-model="location")
              v-layout(row)
                v-flex(xs6)
                  v-menu(lazy, :close-on-content-click="false", transition="slide-x-transition", offset-y, full-width, :nudge-left="40", :nudge-top="30", max-width="290px")
                    v-text-field(slot="activator", label="Select a date",  v-model="date", prepend-icon="event", readonly)
                    v-date-picker(v-model="date", scrollable, autosave)
                v-flex(xs6)
                  v-menu(lazy, :close-on-content-click="false", transition="slide-x-transition", offset-y, full-width, :nudge-left="40", :nudge-top="30", max-width="290px")
                    v-text-field(slot="activator", label="Select a time", v-model="time", prepend-icon="access_time", readonly)
                    v-time-picker(v-model="time", autosave)
              v-layout(row)
                v-flex(xs12)
                  v-divider
                  div(class="py-4")
                    label(for="mimg", style="cursor:pointer" class="select-img-lbl") Select Image
                      input(type="file", style="display:none", label="Meetup Image", name="mimg", id="mimg", @change="filechange")
                    div(v-if="filenamelabel" class="filenamelabel") Selected File: {{filenamelabel}}
                  v-divider
              v-text-field(label="Description", v-model="description" multi-line)
              v-card-actions(justify-center)
                v-spacer
                v-btn(primary, @click.prevent="createMeetup") Create Meetup
                v-spacer
</template>

<script>
  import moment from 'moment'

  export default {
    data(){
      return {
        date: moment().format("YYYY-MM-DD"),
        time: moment().format('h:mma'),
        title: '',
        location: '',
        description: '',
        file: null,
        filenamelabel: '',
        filesizelabel: ''
      }
    },
    computed: {
      getMoment(){
        var meridiem = this.time.slice(-2)
        var thetime = this.time.slice(0, -2)
        if(thetime.length === 4){ thetime = "0" + thetime}
        if(meridiem === 'pm'){
          var newtime = parseInt(thetime.slice(0,2)) + 12 + ":" + thetime.slice(-2)
          return moment(this.date + " " + newtime).toISOString()
        } else {
          return moment(this.date + " " + thetime).toISOString()
        }
      },
      error(){
        return this.$store.getters.error
      },
      currentUser(){
        return this.$store.getters.currentUser
      }
    },
    methods: {
      createMeetup(){
        var meetup = {
          datetime: this.getMoment,
          title: this.title,
          location: this.location,
          description: this.description,
          image: this.file
        }
        if(!meetup.image){
          this.$store.dispatch('setError', "You must supply an image.")
        } else {
          this.$store.dispatch('createMeetup', {meetup: meetup, userId: this.currentUser.id, ownedMeetups: this.currentUser.ownedMeetups})
        }
      },
      filechange(){
        var f = document.getElementById('mimg').files[0]
        this.file = f
        this.filenamelabel = f.name + " (" + Math.ceil(f.size / 1024) +" KB)"
      }
    }
  }
</script>

<style scoped>
  .select-img-lbl{
    background-color: #555 !important;
    border-color: #525252 !important;
    color:#fff;
    border-radius:2px;
    font-size:14px;
    text-transform: uppercase;
    justify-content: center;
    vertical-align: middle;
    font-weight:500;
    padding:0.5rem 1rem;
    display:inline-block !important;
  }
  .filenamelabel{
    padding:1rem 0 0 0;
  }
</style>

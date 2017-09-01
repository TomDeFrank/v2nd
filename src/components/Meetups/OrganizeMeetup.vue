<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm10, md8, lg6)
        v-card
          v-card-title(class="primary white--text mb-0 pa-3 headline") Organize Meetup
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
                  label(for="mimg", class="red", class="select-img-lbl") Select Image
                    input(type="file", style="display:none", label="Meetup Image", name="mimg", id="mimg", @change="filechange")
                  span(v-if="filenamelabel" class="filenamelabel") Selected File: {{filenamelabel}}
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
        this.$store.dispatch('createMeetup', meetup)
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
    background-color: #333 !important;
    border-color: #303030 !important;
    color:#fff;
    border-radius:2px;
    font-size:14px;
    text-transform: uppercase;
    height:36px;
    justify-content: center;
    vertical-align: middle;
    font-weight:500;
    padding:1rem;
  }
  .filenamelabel{
    padding:1rem;
  }
</style>

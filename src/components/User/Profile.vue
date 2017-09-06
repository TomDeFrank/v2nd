<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm10, md8)
        v-card(v-if="currentUser")
          v-card-title(class="primary white--text mb-0 pa-3 headline") Your Profile
          v-card-title
            span(class="headline") {{`${currentUser.firstname} ${currentUser.lastname}`}}
            span(class="subtitle ml-2") {{`(${currentUser.email})`}}
          v-card-text
            div(v-if="!currentUser.registeredMeetups") You are not registered for any meetups.
            div(v-else class="title") Registered Meetups:
            v-list(v-if="currentUser.registeredMeetups" three-line)
              v-list-tile(v-for="(meetup, index) in getMeetups(currentUser.registeredMeetups)" :key="meetup.id" :to="'/meetup/' + meetup.id")
                v-list-tile-content
                    v-list-tile-title {{meetup.title}}
                    v-list-tile-sub-title {{ meetup.location }}
                    v-list-tile-sub-title {{ dt(meetup.datetime) }}
                v-list-tile-action
                  v-dialog(v-model="dialog")
                    v-icon(slot="activator" style="cursor:pointer" class="red--text" @click="selectedUnregMeetupTitle = meetup.title; selectedUnregMeetupID = meetup.id") cancel
                    v-card
                      v-card-title(class="headline red white--text px-3 py-2", style="display:block")
                        | Unregister?
                      v-card-text
                        | This will unregister you from {{selectedUnregMeetupTitle}}.
                      v-card-actions
                        v-spacer
                        v-btn(class="red--text", flat="flat" @click.native="dialog = false") Cancel
                        v-btn(class="red--text", flat="flat" @click.native="unregisterMeetup(selectedUnregMeetupID)") Do It
</template>

<script>
  import moment from 'moment'

  export default {
    data(){
      return {
        dialog: false,
        selectedUnregMeetupTitle: '',
        selectedUnregMeetupID: ''
      }
    },
    computed: {
      meetups(){
        return this.$store.getters.meetups
      },
      currentUser(){
        return this.$store.getters.currentUser
      }
    },
    methods: {
      getMeetups(mus){
        var arr = []
        mus.forEach(i => arr.push(this.meetups.find(m => i === m.id)))
        return arr
      },
      dt(datetime){
        return moment(datetime).format("YYYY-MM-DD hh:mm A Z")
      },
      unregisterMeetup(id){
        this.dialog = false
        this.$store.dispatch('unregisterMeetup', {currentUser: this.currentUser, meetupID: id})
      }
    }
  }
</script>

<style scoped>

</style>

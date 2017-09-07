<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-flex(xs12, sm10)
        v-card(v-if="currentUser")
          v-card-title(class="primary white--text mb-0 pa-3 headline") Your Profile
          v-card-text
            v-layout(row, wrap)
              v-flex(xs12 md4)
                v-list
                  v-list-tile
                    v-icon(class="mr-2") person
                    span {{`${currentUser.firstname} ${currentUser.lastname}`}}
                  v-list-tile
                    v-icon(class="mr-2") mail
                    span {{`(${currentUser.email})`}}
              v-flex(xs12 md8)
                div(v-if="!currentUser.registeredMeetups") You are not registered for any meetups.
                v-card(v-if="currentUser.registeredMeetups")
                  v-card-title(class="title primary white--text pa-2") Registered Meetups:
                  v-card-text(class="py-2")
                    v-layout(v-for="(meetup, index) in getMeetups(currentUser.registeredMeetups)" :key="meetup.id" pa-2 mt-1 justify-center align-center style="background:#f0f0f0")
                      div
                        router-link(:to="'/meetup/' + meetup.id")
                          div {{meetup.title}}
                          div {{ meetup.location }}
                          div {{ dt(meetup.datetime) }}
                      v-spacer
                      div
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
        if(mus){
          var arr = []
          mus.forEach(i => arr.push(this.meetups.find(m => i === m.id)))
        }
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

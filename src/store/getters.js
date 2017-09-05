export default {
    meetups (state) {
       return state.meetups
     },
    currentMeetup (state) {
       return state.meetups[state.meetups.findIndex(m => m.id === state.currentMeetup)]
     },
    featuredMeetups (state) {
       return state.meetups.slice(0,5)
     },
    currentUser(state){
       return state.currentUser
     },
    error(state){
       return state.error
     },
    loading(state){
       return state.loading
    }
  }

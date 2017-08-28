import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    meetups: [],
    currentMeetup: null
  },
  mutations: {
    setMeetups(state, payload){
      state.meetups.push(payload)
    },
    setCurrentMeetup(state, payload){
      state.currentMeetup = payload
    }
  },
  actions: {
    getMeetupById({commit}, payload){
      commit('setCurrentMeetup', payload)
    },
    loadMeetups({commit}){
      firebase.database().ref('meetups').on('child_added', function(snapshot){
        var meetup = snapshot.val()
        meetup.id = snapshot.key
        commit('setMeetups', meetup)
      })
    }
  },
  getters: {
    meetups (state) {
      return state.meetups
    },
    currentMeetup (state) {
      return state.meetups.filter(mu => mu.id === state.currentMeetup)[0]
    },
    featuredMeetups (state) {
      return state.meetups.slice(0,5)
    }
  }
})

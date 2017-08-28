import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    meetups: [],
    currentMeetup: null,
    currentUser: null
  },
  mutations: {
    setMeetups(state, payload){
      state.meetups.push(payload)
    },
    setCurrentMeetup(state, payload){
      state.currentMeetup = payload
    },
    setCurrentUser(state, payload){
      state.currentUser = payload
    },
    unsetUser(state){
      state.currentUser = null
    },
    unsetCurrentMeetup(state){
      state.currentMeetup = null
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
    },
    signIn({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .catch(err => console.log(err.message))
    },
    signOut({commit}){
      firebase.auth().signOut()
      commit('unsetUser')
    },
    autoSignIn({commit}, payload){
      commit('setCurrentUser', payload)
    },
    unsetCurrentMeetup({commit}){
      commit('unsetCurrentMeetup')
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
    },
    currentUser(state){
      return state.currentUser
    },
    debugState(state){
      return state
    }
  }
})

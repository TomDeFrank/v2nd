import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    meetups: [],
    currentMeetup: null,
    currentUser: null,
    error: null,
    loading: false
  },
  mutations: {
    setMeetups(state, payload){ state.meetups.push(payload) },
    setCurrentMeetup(state, payload){ state.currentMeetup = payload },
    setCurrentUser(state, payload){ state.currentUser = payload },
    unsetUser(state){ state.currentUser = null },
    unsetCurrentMeetup(state){ state.currentMeetup = null },
    setError(state, payload){ state.error = payload },
    unsetError(state){ state.error = null },
    setLoading(state, payload){ state.loading = payload }
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
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('unsetError')
        commit('setLoading', false)
        user ? router.push('/') : false
      })
      .catch(err => {
          commit('setError', err.message)
          commit('setLoading', false)
        })
    },
    signUp({commit}, payload){
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('unsetError')
        commit('setLoading', false)
        user ? router.push('/') : false
      })
      .catch(err => {
        commit('setError', err.message)
        commit('setLoading', false)
      })
    },
    createMeetup({commit}, payload){
      firebase.database().ref('meetups').push(payload)
      .then(data => router.push('/meetup/' + data.key))
      .catch(err => console.log(err))
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
    },
    setError({commit}, payload){
      commit('setError', payload)
    },
    unsetError({commit}){
      commit('unsetError')
    },
    setLoading({commit}, payload){
      commit('setLoading', payload)
    }
  },
  getters: {
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
})

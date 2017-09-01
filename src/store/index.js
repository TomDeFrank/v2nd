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
    setImageUrl(state, payload){
      var currentIndex = state.meetups.findIndex(m => m.id === payload.id)
      state.meetups[currentIndex].imageUrl = payload.imageUrl
    },
    setCurrentUser(state, payload){ state.currentUser = payload },
    unsetUser(state){ state.currentUser = null },
    unsetCurrentMeetup(state){ state.currentMeetup = null },
    setError(state, payload){ state.error = payload },
    setLoading(state, payload){ state.loading = payload }
  },
  actions: {
    getMeetupById({commit}, payload){
      commit('setCurrentMeetup', payload)
    },
    loadMeetups({commit}){
      firebase.database().ref('meetups').orderByChild('datetime').on('child_added', function(snapshot){
        var meetup = snapshot.val()
        meetup.id = snapshot.key
        commit('setMeetups', meetup)
      })
    },
    signIn({commit}, payload){
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setError', null)
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
        commit('setError', null)
        commit('setLoading', false)
        user ? router.push('/') : false
      })
      .catch(err => {
        commit('setError', err.message)
        commit('setLoading', false)
      })
    },
    createMeetup({commit}, payload){
      var meetup = {
        datetime: payload.datetime,
        title: payload.title,
        location: payload.location,
        description: payload.description,
        imagename: payload.image.name
      }

      firebase.database().ref('meetups').push(meetup)
      .then(data => {
        firebase.storage().ref('images/' + data.key + "/" + payload.image.name).put(payload.image)
        .then(snapshot => {
          firebase.database().ref('/meetups/' + data.key + "/imageUrl").set(snapshot.downloadURL)
          .then(url => {
            commit('setImageUrl', {id: data.key, imageUrl: snapshot.downloadURL})
          })
          router.push('/meetup/' + data.key)
        })
        .catch(err => console.log(err.message))
      })
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

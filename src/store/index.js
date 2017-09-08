import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '../router'
import Getters from './getters'
import Actions from './actions'

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
    setLoading(state, payload){ state.loading = payload },
    setRegisteredMeetups(state, payload){ state.currentUser.registeredMeetups = payload  },
    setOwnedMeetups(state, payload){ state.currentUser.ownedMeetups = payload }
  },
  actions: Actions,
  getters: Getters
})

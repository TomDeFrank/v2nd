import * as firebase from 'firebase'
import router from '../router'

export default {
  getMeetupById({commit}, payload){ commit('setCurrentMeetup', payload) },
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
      var u = {
        id: user.uid,
        email: user.email,
        registeredMeetups: '',
        ownedMeetups: '',
        firstname: payload.firstname,
        lastname: payload.lastname
      }
      firebase.database().ref('/users/' + user.uid).set(u)
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
    var dlu = ''
    var key = firebase.database().ref('meetups').push().getKey()
    var pushImage = firebase.storage().ref('images/' + key + "/" + payload.image.name).put(payload.image)
    .then(snapshot => dlu = snapshot.downloadURL )
    var downloadUrl = firebase.storage().ref('/images/' + key + "/" + payload.image.name)
    var pushMeetup = firebase.database().ref('meetups/' + key).update(meetup)

    Promise.all([pushImage, downloadUrl, pushMeetup])
    .then( arr => {
      firebase.database().ref('/meetups/' + key + "/imageUrl").set(dlu)
      commit('setImageUrl', {id: key, imageUrl: dlu})
      router.push('/meetup/' + key)
    })
    .catch( err => {
      commit('setError', err.message)
    })
  },
  signOut({commit}){
    firebase.auth().signOut()
    router.push("/")
    commit('unsetUser')
  },
  autoSignIn({commit}, payload){
    var u
    firebase.database().ref('users/' + payload.id).once('value')
    .then( u => commit('setCurrentUser', u.val()))
  },
  unsetCurrentMeetup({commit}){ commit('unsetCurrentMeetup') },
  setError({commit}, payload){ commit('setError', payload) },
  setLoading({commit}, payload){ commit('setLoading', payload) },
  registerMeetup({commit}, payload){
    var userID = payload.currentUser.id
    var meetupID = payload.meetupID
    var regMeetups = payload.currentUser.registeredMeetups
    var arr = payload.currentUser.registeredMeetups
    if (arr == '') { arr = [] }
    arr.push(meetupID)
    firebase.database().ref('/users/' + userID + '/registeredMeetups').set(arr)
    commit('setRegisteredMeetups', arr)
  },
  unregisterMeetup({commit}, payload){
    var userID = payload.currentUser.id
    var meetupID = payload.meetupID
    var arr = payload.currentUser.registeredMeetups
    var index = arr.findIndex(m => m === meetupID)
    arr.splice(index, 1)
    arr = arr.length < 1 ? '' : arr
    firebase.database().ref('/users/' + userID + '/registeredMeetups').set(arr)
    commit('setRegisteredMeetups', arr)
  }
}
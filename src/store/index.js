import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedItems: [
      {
        imageUrl: 'https://res.cloudinary.com/csicdn/image/upload/c_pad,fl_lossy,h_300,q_auto,w_300/v1/Images/Products/mtg%20art/Dominaria/full/DZ4Lyu4UQAAftWf.jpg',
        id: '1',
        title: 'Lyra Dawnbringer',
        date: '2018-06-18',
        price: '1000.00',
        desc: 'Lyra Dawnbringer for sale',
        user: 'qwerty123',
        dealt: 'false',
        dealtto: ''
      },
      {
        imageUrl: 'https://cdn1.mtggoldfish.com/images/gf/Karn%252C%2BScion%2Bof%2BUrza%2B%255BDOM%255D.jpg',
        id: '2',
        title: 'Karn, Scion of Urza',
        date: '2018-06-19',
        price: '2000.00',
        desc: 'Karn, Scion of Urza for sale',
        user: 'qwerty123',
        dealt: 'false',
        dealtto: ''
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    postItem (state, payload) {
      state.loadedItems.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    postItem ({commit}, payload) {
      const item = {
        title: payload.title,
        price: payload.price,
        imageUrl: payload.imageUrl,
        desc: payload.desc,
        date: payload.date,
        id: payload.id
      }
      commit('postItem', item)
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            itemsOwned: [],
            itemDeals: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            itemsOwned: [],
            itemDeals: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedItems (state) {
      return state.loadedItems.sort((itemA, itemB) => {
        return itemA.date < itemB.date
      })
    },
    loadedItem (state) {
      return (itemId) => {
        return state.loadedItems.find((item) => {
          return item.id === itemId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})

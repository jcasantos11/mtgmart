import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedItems: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedItems (state, payload) {
      state.loadedItems = payload
    },
    postItem (state, payload) {
      state.loadedItems.push(payload)
    },
    updateItem (state, payload) {
      const item = state.loadedItems.find(item => {
        return item.id === payload.id
      })
      if (payload.title) {
        item.title = payload.title
      }
      if (payload.desc) {
        item.desc = payload.title
      }
      if (payload.price) {
        item.price = payload.price
      }
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
    loadItems ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('items').once('value')
      .then((data) => {
        const items = []
        const obj = data.val()
        for (let key in obj) {
          items.push({
            id: key,
            title: obj[key].title,
            price: obj[key].price,
            date: obj[key].date,
            imageUrl: obj[key].imageUrl,
            desc: obj[key].desc,
            user: obj[key].user,
            dealt: obj[key].dealt,
            dealtto: obj[key].dealtto
          })
        }
        commit('setLoadedItems', items)
        commit('setLoading', false)
      })
      .catch(
        (error) => {
          console.log(error)
          commit('setLoading', false)
        }
      )
    },
    postItem ({commit, getters}, payload) {
      const item = {
        title: payload.title,
        price: payload.price,
        imageUrl: payload.imageUrl,
        desc: payload.desc,
        date: payload.date.toISOString(),
        user: getters.user.id,
        dealt: payload.dealt,
        dealtto: payload.dealtto
      }
      firebase.database().ref('items').push(item)
      .then((data) => {
        const key = data.key
        commit('postItem', {
          ...item,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    updateItemData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.desc) {
        updateObj.des = payload.desc
      }
      if (payload.price) {
        updateObj.price = payload.price
      }
      firebase.database().ref('items').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateItem', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
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
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredItems: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
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

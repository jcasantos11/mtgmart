import Vue from 'vue'
import Vuex from 'vuex'

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
        dealt: 'false'
      },
      {
        imageUrl: 'https://cdn1.mtggoldfish.com/images/gf/Karn%252C%2BScion%2Bof%2BUrza%2B%255BDOM%255D.jpg',
        id: '2',
        title: 'Karn, Scion of Urza',
        date: '2018-06-19',
        price: '2000.00',
        desc: 'Karn, Scion of Urza for sale',
        user: 'qwerty123',
        dealt: 'false'
      }
    ],
    user: {
      id: 'qwerty123',
      itemsOwned: ['1']
    }
  },
  mutations: {
    postItem (state, payload) {
      state.loadedItems.push(payload)
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
    }

  }
})

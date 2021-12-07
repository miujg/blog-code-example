import Vue from 'vue'
import Vuex from '@/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'xxx'
  },
  getters: {
    getName (state) {
      return 'getters: ' + state.name
    }
  },
  mutations: {
    changeName (state, payload) {
      state.name = payload
    }
  },
  actions: {
    changeNameAsync ({commit}, payload) {
      setTimeout(() => {
        commit('changeName', payload)
      }, 2000)
    }
  },
  modules: {
    a: {
      state: {
        name: 'aaaa'
      },
      getters: {
        getNameA (state) {
          return state.name
        }
      },
      mutations: {
        changeNameA (state, payload) {
          state.name = payload
        }
      },
      modules: {
        c: {
          state: {
            name: 'cccc'
          },
          mutations: {
            changeNameC (state, payload) {
              state.name = payload
            }
          }
        }
      }
    },
    b: {
      state: {
        name: 'bbb'
      },
      mutations: {
        changeNameB (state, payload) {
          state.name = payload
        }
      },
      actions: {
        changeNameAsyncB ({commit}, payload) {
          setTimeout(() => {
            commit('changeNameB', payload)
          }, 2000)
        }
      }
    }
  }
})
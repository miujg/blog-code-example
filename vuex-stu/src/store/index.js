import Vue from 'vue'
import Vuex from '@/vuex'


const logger = () => (store) => {
  let prevState = JSON.stringify(store.state)
  store.subscirbe((mutaionName, state) => {
    console.log('prev-state', prevState)
    console.log(mutaionName)
    prevState = JSON.stringify(state)
    console.log('next-state', prevState)
  })
}

class VuexPersistence {
  constructor (options) {
    this.storage = options.storage
    this.storageName = 'vuex'
  }

  plugin = (store) => {
    let newState = JSON.parse(localStorage.getItem(this.storageName))
    if(newState) store.replaceState(newState)
    store.subscirbe((mutaionName, state) => {
      localStorage.setItem(this.storageName, JSON.stringify(state))
    })
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  namespaced: true,
  plugins: [
    // logger()
    // new VuexPersistence({storage: window.localStorage}).plugin
  ],
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
      namespaced: true,
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
          namespaced: true,
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
      namespaced: true,
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
            commit('b/changeNameB', payload)
          }, 2000)
        }
      }
    }
  }
})
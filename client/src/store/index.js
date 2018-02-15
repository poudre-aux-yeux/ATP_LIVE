import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import matches from './modules/match'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    matches
  }
})

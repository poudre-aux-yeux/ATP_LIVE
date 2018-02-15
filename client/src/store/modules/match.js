import match from '../../api/match'
import * as types from '../mutation-types'

// initial state
const state = []

// getters
const getters = {
  allMatchs: state => state
}

// actions
const actions = {
  getAllMatches ({ commit }) {
    match.getMatches(matches => {
      commit(types.GET_MATCHES, { matches })
    })
  }
}

// mutations
const mutations = {
  [types.GET_MATCHES] (state, { matches }) {
    state = matches
  },

  [types.ADD_MATCH] (state, { match }) {
    state = [...state, match]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

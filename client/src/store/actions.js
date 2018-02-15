import * as types from './mutation-types'

export const addMatch = ({ commit }, match) => {
  if (match != null) {
    commit(types.ADD_MATCH, {
      id: match.id,
      players: match.players,
      stadium: match.stadium,
      referee: match.referee
    })
  }
}

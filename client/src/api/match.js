import gql from 'graphql-tag'

/**
 * Mocking client-server processing
 */
/*
const _matchs = [
  {'id': 1, 'players': [1, 2], 'stadium': 1, 'referee': 2},
  {'id': 2, 'players': [3, 4], 'stadium': 1, 'referee': 3},
  {'id': 3, 'players': [5, 6], 'stadium': 2, 'referee': 2}
]
*/
export default {
  getMatches () {
    return gql`{matches}`
  }
}

<template>
  <v-container>
    <div class="matches">
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
        v-if="matches.length > 0"
      >
        <v-layout row wrap>
          <v-flex xs12 v-for="match in matches" :key="match.id">
            <v-card class="white--text match-card">
              <v-card-title primary-title class="match-card-title">
                <div class="stadium-headline">
                  <p class="stadium">
                    <span class="stadium-name">{{match.stadium.name}}</span>,
                    <span class="stadium-city"> {{match.stadium.city}}</span>
                    <span class="stadium-surface">{{match.stadium.surface}}</span>
                  </p>
                </div>
              </v-card-title>
              <v-card-text>
                <v-layout row wrap class="player-cards">
                  <v-flex xs4>
                    <v-card>
                      <v-card-text>
                        <v-layout row wrap>
                          <v-flex xs4>
                            <v-avatar
                              class="player-profile-picture grey lighten-4"
                              size="auto"
                            >
                              <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="avatar">
                            </v-avatar>
                          </v-flex>
                          <v-flex xs8>
                            {{match.homePlayers[0].name}}
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs4>
                    <v-card>
                      <v-card-text>
                        {{match.referee.name}}
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs4>
                    <v-card>
                      <v-card-text>
                        <v-layout row wrap>
                          <v-flex xs8>
                            {{match.awayPlayers[0].name}}
                          </v-flex>
                          <v-flex xs4>
                            <v-avatar
                              class="player-profile-picture grey lighten-4"
                              size="auto"
                            >
                              <img src="https://randomuser.me/api/portraits/women/72.jpg" alt="avatar">
                            </v-avatar>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
                <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
              </v-card-text>
              <v-card-actions>
                <v-btn flat dark>WATCH now</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <p v-else>Chargement ...</p>
    </div>
  </v-container>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import gql from 'graphql-tag'
// import MATCHES_QUERY from '../graphql/Matches.gql'

export default {
  name: 'HelloWorld',
  data () {
    return {
      matches: [],
      type: 'Company',
      newTag: ''
    }
  },
  apollo: {
    matches: gql`{matches{
    id
    date
    homePlayers{
      id
      name
    }
    awayPlayers{
      id
      name
    }
    referee{
      id
      name
    }
    stadium{
      id
      name
      city
      surface
    }
  }}`
    /* variables () {
        return {
          type: this.type
        }
      } */
    /* subscribeToMore: {
        document: gql`subscription name($type: String!) {
          tagAdded(type: $type) {
            id
            label
          }
        }`,
        // Variables passed to the subscription. Since we're using a function,
        // they are reactive
        variables () {
          return {
            type: this.type
          }
        },
        // Mutate the previous result
        updateQuery: (previousResult, { subscriptionData }) => {
          // Here, return the new result from the previous with the new data
          if (previousResult.matches.find(match => match.id === subscriptionData.data.matchAdded.id)) {
            return previousResult
          }
          return {
            matches: [
              ...previousResult.matches,
              // Add the new tag
              subscriptionData.data.tagAdded
            ]
          }
        },
        update ({ matches }) {
          // The field is different from 'tasks'
          return matches
        }
      } */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.match-card-title{
  background: #212121d4;
  padding: 5px;
}
.matches .match-card{
    background-image: url("https://ds1.static.rtbf.be/image/media/object/default/16x9/1248x702/9/c/3/9c35f94dfc54658177dd177cbe08827c.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
}
.stadium-headline .stadium {
  margin: 0px;
}
.player-cards{
  border-bottom: 1px solid white;
}
.player-cards .player-profile-picture{
  width: 100%;
}
</style>

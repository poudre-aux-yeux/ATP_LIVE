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
          <v-flex xs6 v-for="match in matches" :key="match.id">
            <div>{{formatDate(match.date)}}</div>
            <v-card class="white--text match-card">
              <v-card-title primary-title class="match-card-title">
                <div class="stadium-headline">
                  <p class="stadium">
                    <span class="stadium-name">{{match.stadium.name}}</span>,
                    <span class="stadium-city"> {{match.stadium.city}}</span>
                    <span class="stadium-surface">{{stadetypes[match.stadium.surface]}}</span>
                  </p>
                </div>
              </v-card-title>
              <v-card-text>
                <v-layout row wrap class="player-cards">
                  <v-flex xs10>
                    <v-card class="player-card player-left">
                      <v-card-text>
                        <v-layout row wrap>
                          <v-flex xs2 class="player-profile-picture-container">
                            <v-avatar
                              class="player-profile-picture grey lighten-4"
                              size="auto"
                            >
                              <img ref="homePlayerImage" :src="match.homePlayers[0].image" alt="avatar">
                            </v-avatar>
                          </v-flex>
                          <v-flex class="player-name-container" xs3>
                            <p>{{match.homePlayers[0].name}}</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg" alt="flag" width="20">
                          </v-flex>
                          <v-flex xs7>
                            <v-layout row wrap class="scores">
                              <v-flex :class="{
                                  'score-container':true,
                                  win:(set.home > 5 && set.home > set.away),
                                  current:(index==sets.length-1)
                                }"
                                v-for="(set, index) in sets"
                                :key="set.id"
                                xs2>
                                <p>{{set.home}}</p>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                    <v-card class="player-card player-right">
                      <v-card-text>
                        <v-layout row wrap>
                          <v-flex xs2 class="player-profile-picture-container">
                            <v-avatar
                              class="player-profile-picture grey lighten-4"
                              size="auto"
                            >
                              <img :src="match.awayPlayers[0].image" alt="avatar">
                            </v-avatar>
                          </v-flex>
                           <v-flex class="player-name-container" xs3>
                            <p>{{match.awayPlayers[0].name}}</p>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2000px-Flag_of_Germany.svg.png" alt="flag" width="20">
                          </v-flex>
                          <v-flex xs7>
                            <v-layout row wrap class="scores">
                              <v-flex :class="{
                                  'score-container':true,
                                  win:(set.away > 5 && set.away > set.home),
                                  current:(index==sets.length-1)
                                }"
                                v-for="(set, index) in sets"
                                :key="set.id"
                                xs2>
                                <p>{{set.away}}</p>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs2>
                    <v-card class="player-card" height="100%">
                      <v-card-text class="referee-card-text service-right">
                        <p class="versus">
                          15
                          <span class="versus-logo">vs</span>
                          30
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card-text>
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
// import gql from 'graphql-tag'
import AllMatches from '../graphql/Matches.gql'

export default {
  name: 'HelloWorld',
  data () {
    return {
      matches: [],
      type: 'Company',
      newTag: '',
      sets: [
        {
          id: 1,
          home: 3,
          away: 6
        },
        {
          id: 2,
          home: 5,
          away: 7
        },
        {
          id: 3,
          home: 8,
          away: 6
        }
      ],
      stadetypes: {
        CLAY: 'Terre battue'
      }
    }
  },
  computed: {
    reversedSets () {
      let unreversed = [...this.sets]
      return unreversed.reverse()
    }
  },
  methods: {
    formatDate (date) {
      let d = new Date(date)
      return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()
    }
  },
  apollo: {
    matches: AllMatches
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
  background: #00000061;
  padding: 5px;
}
.matches .match-card{
  background-image: url("https://ds1.static.rtbf.be/image/media/object/default/16x9/1248x702/9/c/3/9c35f94dfc54658177dd177cbe08827c.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.stadium-headline{
  width: 100%;
}
.stadium-headline .stadium {
  margin: 0px;
}
.stadium .stadium-surface{
  background: #8e3a0e;
  padding: 5px;
  border-radius: 4px;
  float: right;
}
.matches .player-cards .player-card .scores {
  height: 100%;
  margin: 0;
}
.player-left .scores,
.player-right .scores {
  justify-content: flex-end;
}
.scores .score-container{
  background: #212121;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.scores .score-container:first-child{
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.scores .score-container:last-child{
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.scores .score-container.current::before{
  position: absolute;
  content: close-quote;
  width: 8px;
  height: 8px;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  transform-origin: 50% 50%;
  transform: rotate(45deg);
}
.player-right .scores .score-container.current::before{
  transform: rotate(-135deg);
  animation: float-bottom 1.2s ease-in-out infinite;
}
.player-left .scores .score-container.current::before{
  animation: float-top 1.2s ease-in-out infinite;
}
.scores .score-container.win{
  background: #5a8e5c;
}
.scores .score-container>p{
  margin: 0px;
}
.player-cards .player-profile-picture-container{
  justify-content: center;
  align-items: center;
  display: flex;
}
.player-cards .player-profile-picture{
  width: 100%;
  padding-top: 100%;
}
.player-cards .player-profile-picture>img{
  border:1px solid #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
}
.player-cards .player-name-container{
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.player-cards .player-left .player-name-container,
.player-cards .player-right .player-name-container{
  align-items: flex-start;
}
.player-cards .player-right{
  margin-top: 5px;
}
.player-cards .player-name-container>p{
  margin: 0px;
  font-size: 1.8vw;
  font-weight: 100;
  color: #fff;
}
.player-cards .player-name-container>img{
  padding-top: 8px;
}
.player-cards .player-card{
  background-color: #212121d4;
}
.player-cards .player-card .referee-card-text>p{
  color: white;
  margin: 0px;
  text-align: center;
}
.player-cards .player-card .referee-card-text>p.versus{
  font-size: 1.5vw;
  font-weight: bold;
}
.player-cards .player-card .referee-card-text>p.versus>span{
  color:#c52b2b;
  margin: 5px;
}
.player-cards .player-card .referee-card-text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.card__text.referee-card-text::before, .card__text.referee-card-text::after{
  content: close-quote;
  position: absolute;
  width: 17px;
  height: 17px;
  -webkit-mask: url("../assets/tennis-ball.svg") no-repeat;
  -webkit-mask-size: cover;
  mask: url("../assets/tennis-ball.svg") no-repeat;
  mask-size: cover;
}
.card__text.referee-card-text::before{
  top: 10px;
}
.card__text.referee-card-text::after{
  bottom: 10px;
}
.card__text.referee-card-text.service-left::before, .card__text.referee-card-text.service-right::after{
  background-color: #ffd000;
}
.card__text.referee-card-text.service-left::after, .card__text.referee-card-text.service-right::before{
  background-color: #616161;
}

@keyframes float-top {
  from {
    top:-11px;
  }
  50%{
    top:-17px;
  }
  to {
    top:-11px;
  }
}

@keyframes float-bottom {
  from {
    bottom:-11px;
  }
  50%{
    bottom:-17px;
  }
  to {
    bottom:-11px;
  }
}
</style>

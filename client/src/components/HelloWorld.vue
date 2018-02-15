<template>
  <v-container>
    <div class="hello">
      <h1>Welcome to my vue.js app !</h1>
      <input type="text" v-model="newTag"/>
      <button @click="addTag">Click to send</button>
      <ul v-if="tags.length > 0">
        <li v-for="tag in tags" :key="tag.id">
          {{tag.id}} - {{tag.label}}
        </li>
      </ul>
      <p v-else>Chargement ...</p>
    </div>
  </v-container>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import gql from 'graphql-tag'
import TAGS_QUERY from '../graphql/TagsAll.gql'

export default {
  name: 'HelloWorld',
  data () {
    return {
      tags: [],
      type: 'Company',
      newTag: ''
    }
  },
  methods: {
    addTag () {
      // We save the user input in case of an error
      const newTag = this.newTag
      // We clear it early to give the UI a snappy feel
      this.newTag = ''
      // Call to the graphql mutation
      this.$apollo.mutate({
        // Query
        mutation: gql`mutation ($label: String!, $type: String!) {
          addTag(label: $label, type: $type) {
            id
            label
            type
          }
        }`,
        // Parameters
        variables: {
          label: newTag,
          type: this.type
        }
      }).then((data) => {
        // Result
        console.log(data)
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.newTag = newTag
      })
    }
  },
  apollo: {
    tags: {
      query: TAGS_QUERY,
      variables () {
        return {
          type: this.type
        }
      },
      subscribeToMore: {
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
          if (previousResult.tags.find(tag => tag.id === subscriptionData.data.tagAdded.id)) {
            return previousResult
          }
          return {
            tags: [
              ...previousResult.tags,
              // Add the new tag
              subscriptionData.data.tagAdded
            ]
          }
        },
        update ({ tags }) {
          // The field is different from 'tasks'
          return tags
        }
      }
    }
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
a {
  color: #42b983;
}
</style>

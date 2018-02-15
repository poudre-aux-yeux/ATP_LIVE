<template>
  <v-app>
      <v-container class="login-container" grid-list-md text-xs-center fluid v-if="!connected">
        <login @connected="connected = !connected"></login>
      </v-container>
      <v-app v-else>
        <v-navigation-drawer v-model="drawer" absolute clipped app></v-navigation-drawer>
        <v-toolbar clipped-left color="login" dark fixed app>
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar>
        <v-content app>
            <router-view></router-view>
        </v-content>
        <v-footer color="login" dark fixed app></v-footer>
      </v-app>
  </v-app>
</template>

<script>
import login from '@/components/Login'

export default {
  name: 'App',
  data: () => ({
    connected: false,
    drawer: false,
    entries: [
      {id: 'tennisList', label: 'Lister les match'}
    ]
  }),
  components: {
    login
  }
}
</script>

<style>
.login-container{
  background-image: url("https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb");
  background-size: cover;
}
</style>

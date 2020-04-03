<template>
  <nav>
    <v-app-bar flat app class="grey lighten-4">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-bold" left>StopWatch </span>
        <span>Todo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text small>
        <span>Sign Out</span>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app class="secondary" v-model="drawer">
      <v-layout column align-center>
        <v-flex class="my-5 white--text text-capitalize" text-center>
          <v-avatar size="123" class="mb-3">
            <img src="https://api.adorable.io/avatars/123/abott@adorable.png" alt="avatar">
          </v-avatar>
          <h1 class="headline">autobele silva</h1>
          <h1 class="subtitle-1">Entusiast Web Developer</h1>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-icon>
              <v-icon class="white--text"> {{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text" v-text="link.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-view-dashboard-variant', text: 'Dashboard', route: '/' },
        { icon: 'mdi-folder', text: 'Projects', route: '/projects'},
      ]
    };
  }
};
</script>

<style>
</style>
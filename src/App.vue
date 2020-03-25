/* eslint-disable */
<template>
  <v-app>
    <v-dialog :value="!IsConfigured" hide-overlay fullscreen>
      <v-card flat>
       <FirstConfigWizard>
       </FirstConfigWizard>
      </v-card>
    </v-dialog>
    <v-navigation-drawer
      v-model="drawer"
     app
     inset
     clipped>
      <v-list>
        <v-list-item link to="/dashboard">
          <v-list-item-action>
            <v-icon color="darken-1">mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Dashboard</v-list-item-title>
        </v-list-item>

		<!--
        <v-list-item link to="/live">
          <v-list-item-action>
            <v-icon color="darken-1">mdi-video</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Live View</v-list-item-title>
        </v-list-item>
		-->
        <v-list-item link to="/events">
          <v-list-item-action>
            <v-icon color="darken-1">mdi-alert-circle</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Events</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/library">
          <v-list-item-action>
            <v-icon color="darken-1">mdi-library-video</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Video Library</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/settings">
          <v-list-item-action>
            <v-icon color="darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Settings</v-list-item-title>
        </v-list-item>


      </v-list>
	</v-navigation-drawer>
    <v-app-bar clipped-left
        app
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <router-link to="/">
	<v-img
          alt="UAPTN Logo"
          src="./assets/uaptn_logo.png"
          transition="scale-transition"
          width="200"
	/>
        </router-link>
      </div>
    </v-app-bar>
      <v-content>
      <router-view/>
      </v-content>
    <v-footer>
       <v-spacer></v-spacer>
       <div class="font-weight-thin caption">&copy; {{ new Date().getFullYear() }} UAPTN. All Rights Reserved</div>
    </v-footer>
  </v-app>
</template>
<style scoped>
.nova {
	font-family: 'Nova Round', cursive;
}
</style>
<script>

import FirstConfigWizard from './components/FirstConfigWizard.vue';

export default {
  name: 'App',
  components: {
   FirstConfigWizard
  },
  methods: {
  },
  watch: {
  },
  created() {
    this.$store.dispatch('ui/GetConfig')
  },
  /* eslint-disable */
  computed: {
   IsConfigured: function () {
     var isConfigured = this.$store.state.ui.IsConfigured
     return isConfigured
   },
  },
  data: () => ({
    drawer:true,
	dialog:true,
  }),
};
</script>

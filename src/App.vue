/* eslint-disable */
<template>
    <v-app>
        <v-dialog :value="!IsConfigured" hide-overlay fullscreen>
            <v-card flat>
                <FirstConfigWizard>
                </FirstConfigWizard>
            </v-card>
        </v-dialog>

            <v-navigation-drawer elevation="12"  v-model="drawer" app inset clipped fixed :color="color" :expand-on-hover="expandOnHover" :mini-variant="miniVariant" :right="right" :permanent="permanent" :src="bg">
                <v-list-item class="px-2">
                    <v-list-item-avatar>
                        <v-img alt="Sky Hub Logo" src="./assets/icon.png" max-width="" />
                    </v-list-item-avatar>
                    <v-list-item-title>
                        <v-img alt="Sky Hub Logo" src="./assets/vector-letters.svg" style="margin:20px" />
                    </v-list-item-title>
                    <v-btn icon @click.stop="miniVariant = !miniVariant">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                </v-list-item>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item link to="/dashboard">
                        <v-list-item-action>
                            <v-icon color="darken-1">mdi-view-dashboard</v-icon>
                        </v-list-item-action>
                        <v-list-item-title class="text--darken-1">Dashboard</v-list-item-title>
                    </v-list-item>
    
                    <v-list-item link to="/events">
                        <v-list-item-action>
                            <v-icon color="darken-1">mdi-alert-circle</v-icon>
                        </v-list-item-action>
                        <v-list-item-title class="text--darken-1">Events</v-list-item-title>
                    </v-list-item>
    
                    <v-list-item link to="/library">
                        <v-list-item-action>
                            <v-icon color="darken-1">mdi-library-video</v-icon>
                        </v-list-item-action>
                        <v-list-item-title class="text--darken-1">Video Library</v-list-item-title>
                    </v-list-item>
    
                    <v-list-item link to="/settings">
                        <v-list-item-action>
                            <v-icon color="darken-1">mdi-settings</v-icon>
                        </v-list-item-action>
                        <v-list-item-title class="text--darken-1">Settings</v-list-item-title>
                    </v-list-item>
    
                </v-list>
            </v-navigation-drawer>
        
        <v-app-bar clipped-left dense flat app color="#333" dark>
            <v-app-bar-nav-icon @click="miniVariant = !miniVariant" align-right></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <div class="d-flex align-right">
                <router-link to="/">
                    <v-img alt="Sky Hub Logo" src="./assets/vector-file-white.svg" transition="scale-transition" width="64" />
                </router-link>
            </div>
        </v-app-bar>
        <v-content>
            <router-view />
        </v-content>
        <v-footer>
            <v-spacer></v-spacer>
            <div class="font-weight-thin caption">&copy; {{ new Date().getFullYear() }} Sky Hub. All Rights Reserved</div>
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
    methods: {},
    watch: {},
    created() {
        this.$store.dispatch('controller/GetConfig')
    },
    /* eslint-disable */
    computed: {
        IsConfigured: function() {
            var isConfigured = this.$store.state.controller.IsConfigured
            return isConfigured
        },
    },
    data: () => ({
        drawer: true,
        dialog: true,
        color: '#EEE',
        colors: [
            'primary',
            'blue',
            'success',
            'red',
            'teal',
        ],
        right: false,
        permanent: false,
        miniVariant: true,
        expandOnHover: false,
        background: false,
        mini: true
    }),
};
</script>

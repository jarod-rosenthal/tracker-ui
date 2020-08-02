/* eslint-disable */
<template>
    <v-app>
        
        <v-dialog :value="!IsConfigured" hide-overlay fullscreen>
            <v-card flat>
                <FirstConfigWizard>
                </FirstConfigWizard>
            </v-card>
        </v-dialog>
        <v-dialog :value="IsConfigured && !IsAuthenticated" hide-overlay fullscreen>
            <v-card flat>
                <Login>
                </Login>
            </v-card>
        </v-dialog>
        <v-app-bar elevation="5" fixed dense app dark v-show="IsAuthenticated">
            <div class="d-flex">
                <router-link to="/">
                    <v-img alt="Sky Hub Logo" src="./assets/vector-letters-white.svg" transition="scale-transition" width="140" />
                </router-link>
            </div>
            <!--
            <v-app-bar-nav-icon @click="miniVariant = !miniVariant" align-right></v-app-bar-nav-icon>
            -->
            <v-spacer></v-spacer>

            <v-menu right bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon dark>mdi-account-circle</v-icon>
                    </v-btn>
                </template>
                <v-list>
                <v-list-item @click="logout()">
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
                </v-list>
            </v-menu>    
    
        </v-app-bar>
        <v-navigation-drawer v-show="IsAuthenticated" v-model="drawer" dark app inset fixed :color="color" :expand-on-hover="expandOnHover" :mini-variant="miniVariant" :right="right" :permanent="permanent">
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-img alt="Sky Hub Logo" src="./assets/logo-dark-01.svg" />
                </v-list-item-avatar>
                <v-list-item-title>
                    <v-img alt="Sky Hub Logo" src="./assets/vector-letters.svg" />
                </v-list-item-title>
                <v-btn icon @click.stop="miniVariant = !miniVariant">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>
            <v-divider></v-divider>
            <v-list>
                <!--
                // <v-list-item link to="/live">
                //     <v-list-item-action>
                //         <v-icon color="darken-1">mdi-view-dashboard</v-icon>
                //     </v-list-item-action>
                //     <v-list-item-title class="text--darken-1">Live View</v-list-item-title>
                // </v-list-item>
                -->

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
    
    
        <v-main>
            <router-view />
        </v-main>
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
import Login from './components/Login.vue';
import FirstConfigWizard from './components/FirstConfigWizard.vue';

export default {
    name: 'App',
    components: {
        Login,
        FirstConfigWizard
    },
    methods: {
        logout: function() {
            this.$store.dispatch('controller/Logout');
        }
    },
    watch: {},
    created() {
        this.$store.dispatch('controller/AutoLogin')
    },
    /* eslint-disable */
    computed: {
        IsConfigured: function() {
            return this.$store.state.controller.IsConfigured
        },
        IsAuthenticated: function() {
            return this.$store.state.controller.IsAuthenticated
        }
    },
    data: () => ({
        drawer: true,
        dialog: true,
        // color: '#2b68a8',
        color: '#2b68a8',
        colors: [
            'primary',
            'blue',
            'success',
            'red',
            'teal',
        ],
        right: false,
        permanent: true,
        miniVariant: true,
        expandOnHover: false,
        background: false,
        mini: false
    }),
};
</script>

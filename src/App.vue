
<template>
    <v-app>
      <v-overlay :absolute="absolute" :value="!IsConnected">
        <v-alert>Unable to communicate with tracker.   Please wait while connection is re-esablished.</v-alert>
      </v-overlay>    

        <v-app-bar elevation="5" fixed dense app dark v-show="IsAuthenticated">
            <div class="d-flex">
                <router-link to="/">
                    <v-img alt="Sky Hub Logo" src="./assets/vector-letters-white.svg" transition="scale-transition" width="140" />
                </router-link>
            </div>
            <v-spacer></v-spacer>
            <v-switch :value="IsPrivate" label="Toggle Privacy" color="#2b68a8" @click="togglePrivate()" hide-details></v-switch>
            <v-menu right bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon dark>mdi-account-circle</v-icon>
                    </v-btn>
                </template>
                <v-list>
                <v-list-item @click="logout()">
                    <v-list-item-title>Sign Out</v-list-item-title>
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

                <v-list-item link to="/logs">
                    <v-list-item-action>
                        <v-icon color="darken-1">mdi-note</v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="text--darken-1">Logs</v-list-item-title>
                </v-list-item>

                <v-list-item link to="/settings">
                    <v-list-item-action>
                        <v-icon color="darken-1">mdi-settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="text--darken-1">Settings</v-list-item-title>
                </v-list-item>
    
            </v-list>
        </v-navigation-drawer>
        <v-snackbar v-model="snackbarenabled" :timeout="SnackBar.timeout">
            {{ SnackBar.message }}
            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="SnackBar.enabled = false">
                Close
                </v-btn>
            </template>
        </v-snackbar>        
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
.private {
    filter: blur(.3rem);
}
.public {
    filter: blur(0);
}
</style>

<script>
import settings from './plugins/settings.js'
import router from './router/index';


export default {
    name: 'App',
    components: {
    },
    methods: {
        logout: function() {
            this.$store.dispatch('controller/Logout');
        },
        togglePrivate: function() {
            this.$store.dispatch('controller/TogglePrivacy');
        }
    },
    watch: {
        IsAuthenticated: function(newstate) {
            if(newstate) {
                if(this.$route.name == 'login') {
                    this.$router.push({'path':'/dashboard'});
                }
            } else {
                this.$router.push({'path':'/login'});
            }
        },
        IsConfigured: function(newstate) {
            if(newstate === false) { 
                router.push({'path':'/configwizard'});
            }
        },
        IsConnected: function(newstate) {
            if(newstate === true) {
                if(this.$route.name === null || this.$route.name === "") {
                    this.$router.push({'path':'/login'});
                }
            }
        }
    },
    created() {
        var self = this;
        if(self.$data.pinging) { return; }
        window.setInterval(function(controller) { 
            return function() {
                controller.$data.pinging = true;
                controller.$store.dispatch('controller/Ping').then(function() {
                    controller.$data.pinging = false;
                });
            };
        }(self), this.settings.pingPollRate);
        self.$store.dispatch('controller/GetConfig').then(function() {
            if(self.$store.state.controller.IsConfigured) {
                self.$store.dispatch('controller/AutoLogin');
            } else {
                self.$router.push({'path':'/configwizard'});
            }
        });
    },
    computed: {
        IsPrivate() {
            return this.$store.state.controller.IsPrivate;
        },        
        IsConfigured: function() {
            return this.$store.state.controller.IsConfigured;
        },
        IsConnected: function() {
            return this.$store.state.controller.IsConnected;
        },        
        IsAuthenticated: function() {
            return this.$store.state.controller.IsAuthenticated;
        },
        AuthStatus: function() {
            return this.$store.state.controller.AuthStatus;
        },
        SnackBar: function() {
            return this.$store.state.controller.SnackBar;
        }
    },
    data: () => ({
        drawer: true,
        dialog: true,
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
        mini: false,
        snackbarenabled: false,
        absolute: false,
        settings: settings
    }),
};
</script>

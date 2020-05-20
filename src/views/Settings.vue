<template>
    <v-container fluid>
        <v-row block>
            <v-col cols="12">
                <v-row>
                    <v-card cols="4" class="ma-3 pa-6" width="256" elevation="2">
                    <div class="my-2">
                        <v-card-title>
                            General
                        </v-card-title>
                        <v-col>
                            <v-text-field outlined v-model="config.nodename" label="Node Name"></v-text-field>
                            <v-text-field outlined v-model="config.hostname" label="Hostname"></v-text-field>
                            <v-btn class="primary">Save Changes</v-btn>
                        </v-col>
                        </div>
                    </v-card>
                    <v-card cols="4" class="ma-3 pa-6" width="256" elevation="2">
                        <v-card-title>
                            Utilities
                        </v-card-title>
                        <v-col alignment="center">
                            <div class="my-2">
                                <v-btn class="primary">Change Password</v-btn>
                            </div>
                            <div class="my-2">
                                <v-btn color="primary" @click="resetConfig()">Reset Config</v-btn>
                            </div>
                            <div class="my-2">
                                <v-btn color="primary" @click="restartTracker()">Restart Tracker Service</v-btn>
                            </div>
                            <div class="my-2">
                                <v-btn color="error" @click="reboot()">Reboot Tracker</v-btn>
                            </div>
                        </v-col>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
        </v-row>
        <!--
        <v-card flat>
            <v-card-title>
                Settings
            </v-card-title>
            <v-card-text>
                <v-divider></v-divider>
                <v-divider class="ma-5"></v-divider>
                <v-subheader>
                    Cameras
                </v-subheader>
                <v-row wrap>
                    <v-col cols="3" v-for="c in config.camera" :key="c.name">
                        <v-hover v-slot:default="{ hover }">
                            <v-card width="256" height="256" :elevation="hover ? 16 : 2">
                                <v-card-title class="justify-center">{{c.name}}</v-card-title>
                                <v-card-text class="text-center">
                                    <v-img height="125" contain src="../assets/ptz.png"></v-img>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
                <v-btn class="primary">Add Camera</v-btn>
                <v-divider class="ma-5"></v-divider>
                <v-subheader>
                    Storage
                </v-subheader>
                <v-row wrap>
                    <v-col cols="3" v-for="c in config.storage" :key="c.name">
                        <v-hover v-slot:default="{ hover }">
                            <v-card width="256" height="256" :elevation="hover ? 16 : 2">
                                <v-card-title class="justify-center">{{c.name}}</v-card-title>
                                <v-card-text class="text-center">
                                    <v-img height="125" contain src="../assets/storage.png"></v-img>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
                <v-btn class="primary">Add Storage</v-btn>
            </v-card-text>
        </v-card>
        -->
    </v-container>
</template>

<script>
export default {
    name: 'Settings',
    data() {
        return {
            config: {
                password: "",
                passwordagain: "",
                hostname: "",
                nodename: "",
                camera: [],
                storage: [],
            }
        }
    },
    mounted() {
        this.$store.dispatch('controller/GetConfig')
    },
    watch: {
        ConfigResp(oldObj, o) {
            /* eslint-disable */

            if(o && o.config) {
                console.log(o)
                this.config.nodename = o.config.nodename
                this.config.hostname = o.config.hostname
                this.config.uuid = o.config.uuid
                this.config.camera = o.config.cameraList
                this.config.storage = o.config.storageList
            }
        }
    },
    methods: {
        restartTracker () {
            this.$store.dispatch('controller/IssueCommand', { command:"RESTART-TRACKER" });
        },
        reboot() {
            this.$store.dispatch('controller/IssueCommand', { command:"REBOOT" });
        },
        resetConfig() {
            var newConfig =  {
                uuid: this.config.uuid,
                configured: false,
                username: "",
                password: "",
                passwordagain: "",
                hostname: "",
                nodename: "",
                camera: [],
                storage: [],
            }
            var self = this;
            this.$store.dispatch('controller/SetConfig', newConfig).then(function() {
                // self.$store.commit('LoginResp', {});
                // self.$store.commit('IsAuthenticated', false);
                self.$store.dispatch('controller/GetConfig')
            })
        }

    },
    computed: {
        ConfigResp: function() {
            var config = this.$store.state.controller.GetConfigResp
            return config
        }
    }
}
</script>

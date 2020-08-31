<template>
    <v-container fluid v-cloak >
        <v-card>
            <v-card-title>
                Settings
            </v-card-title>
            <v-card-text>
            <v-expand-transition>
                <v-card-actions flat v-show="HasChanges" fixed top right>
                    <v-btn style="margin-bottom:40px;" color="primary"  @click="resetConfigChanges()">Cancel Changes</v-btn>
                    <v-btn style="margin-bottom:40px;" :readonly="saving" color="red" dark @click="saveConfig()">Save Change</v-btn>
                </v-card-actions>
            </v-expand-transition>
                <v-row wrap>
                    <v-col cols="4">
                        <v-hover>
                            <v-card width="100%" height="300px" elevation="2">
                                <v-card-title>
                                    General
                                </v-card-title>
                                <v-col>
                                    <v-text-field outlined v-model="config.nodename" label="Node Name"></v-text-field>
                                    <v-text-field outlined v-model="config.hostname" label="Hostname"></v-text-field>
                                </v-col>
                            </v-card>
                        </v-hover>
                    </v-col>
                    <v-col cols="4">
                        <v-hover>
                            <v-card width="100%" height="300px" elevation="2">
                                <v-card-title>
                                    Utilities
                                </v-card-title>
                                <v-col alignment="center">
                                    <!--
                                                <div class="my-2">
                                                    <v-btn class="primary">Change Password</v-btn>
                                                </div>
                                                -->
                                    <div class="my-2">
                                        <v-btn color="primary" @click="updateTracker()">Upate Software</v-btn>
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
                        </v-hover>
                    </v-col>
                </v-row>
                <v-divider class="ma-5"></v-divider>
                <v-subheader>
                    Cameras
                </v-subheader>
                <v-row wrap>
                    <v-col cols="2" v-for="(c,i) in config.cameraList" :key="i" row="1">
                        <v-hover v-slot:default="{ hover }">
                            <v-card width="220 " height="220" :elevation="hover ? 16 : 2">
                                <v-card-title class="justify-center">{{c.name}}</v-card-title>
                                <v-card-text class="text-center">
                                    <v-img height="80" contain src="../assets/ptz.png"></v-img>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <!--<v-card-text>Enabled: {{c.enabled.toString()}}</v-card-text>-->
                                    <v-btn icon v-show="c.enabled">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>                                    
                                    <v-btn icon @click="editCamera(i)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="delCameraRow(i)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
                <v-btn class="primary" @click="addCameraRow()">Add Camera</v-btn>
                <!--
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
                -->
            </v-card-text>
        </v-card>
        <v-dialog v-model="cameraDialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                <span class="headline">Camera Config</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-col cols="12">
                        <v-form row="1">
                            <v-row row="1">
                                <v-col cols="12">
                                    <v-text-field v-model="cameraEdit.name" outlined label="Name"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="cameraEdit.uri" outlined label="URI" placeholder="Example: rtsp://ipaddress:port"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="cameraEdit.username" outlined label="Username"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="cameraEdit.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="input-10-1" hint="At least 8 characters" counter @click:append="show1 = !show1" outlined label="Password"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="cameraEdit.location" outlined label="Location"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-select v-model="cameraEdit.type" :items="cameraTypes" label="Standard"></v-select>
                                </v-col>
                                <v-col cols="2">
                                    <v-checkbox v-model="cameraEdit.enabled" outlined :label="`Enabled: ${cameraEdit.enabled.toString()}`"></v-checkbox>
                                </v-col>
                            </v-row>                
                        </v-form>                        
                    </v-col>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelCameraEdit()">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="saveCameraEdit()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<style>
    .scroll {
      overflow-y: auto;
    }
</style>

<script>
export default {
    name: 'Settings',
    data() {
        return {
            configLoaded: false,
            config: {
                password: "",
                passwordagain: "",
                hostname: "",
                nodename: "",
                cameraList: [],
                storageList: [],
            },
            originalConfig: {},
            cameraDialog: false,
            cameraEdit: { name: "", location: "", uri: "", username: "", password: "", type:"PTX", enabled: true },
            cameraEditId: 0,
            show1: false,
            saving: false,
            cameraTypes: ['Standard', 'PTZ', 'Fisheye'],
        }
    },
    mounted() {
        this.$store.dispatch('controller/GetConfig')
    },
    watch: {
        ConfigResp(val) {
            this.config = JSON.parse(JSON.stringify(val.config));
            this.originalConfig = JSON.parse(JSON.stringify(val.config));
            if (this.config.cameraList.length === 0) {
                this.config.cameraList.push({ name: "", location: "", uri: "", username: "", password: "", type:"Standard", enabled: true });
            }
            this.config.nodename = val.config.nodename;
            this.config.uuid = val.config.uuid;
        },
    },
    methods: {
        editCamera(id) {
            this.cameraEdit = JSON.parse(JSON.stringify(this.config.cameraList[id]));
            this.cameraDialog = true;
            this.cameraEditId = id;
        },
        saveCameraEdit() {
            if(this.cameraEditId == null) {
                this.config.cameraList.push(this.cameraEdit);
                if(this.cameraEdit.enabled) { this.setCameraEnabled(this.config.cameraList.length - 1); }
            } else {
                this.$set(this.config.cameraList, this.cameraEditId, this.cameraEdit);
                if(this.cameraEdit.enabled) { this.setCameraEnabled(this.cameraEditId); }
            }

            this.cameraDialog = false;
            // this.$forceUpdate();
        },
        cancelCameraEdit() {
            this.cameraDialog = false;
            this.$forceUpdate();
        },
        restartTracker() {
            this.$store.dispatch('controller/IssueCommand', { command: "RESTART-TRACKER" });
        },
        reboot() {
            this.$store.dispatch('controller/IssueCommand', { command: "REBOOT" });
        },
        updateTracker() {
            this.$store.dispatch('controller/IssueCommand', { command: "UPDATE" });
        },
        resetConfig() {
            var newConfig = JSON.parse(JSON.stringify(this.$store.state.controller.GetConfigResp.config));
            newConfig.configured = false;
            var self = this;
            this.$store.dispatch('controller/SetConfig', newConfig).then(function() {
                // self.$store.commit('LoginResp', {});
                // self.$store.commit('IsAuthenticated', false);
                setTimeout(function() {
                    self.$store.dispatch('controller/GetConfig')
                }, 500);
            })
        },
        resetConfigChanges() {
            this.config = JSON.parse(JSON.stringify(this.originalConfig));
            this.$forceUpdate();
        },
        saveConfig() {
            /* eslint-disable */
            self = this;
            this.config.configured = true;
            this.saving = true;

            this.$store.dispatch('controller/SetConfig', this.config).then(function() {
                setTimeout(function() {
                    self.$store.dispatch('controller/GetConfig').then(function(){ self.saving = false; });
                }, 800);
            })
        },
        addCameraRow() {
            this.cameraEdit = { name: "NEW CAMERA", location: "", uri: "", username: "", password: "", type:"PTZ", enabled: false, new:true };
            this.cameraDialog = true;
            this.cameraEditId = null;
            this.$forceUpdate();
        },
        setCameraEnabled(id) {
            for (var i = 0; i < this.config.cameraList.length; i++) {
                var camera = this.config.cameraList[i];
                if (id == i) {
                    camera.enabled = true;
                } else {
                    camera.enabled = false;
                }
            }
        },
        delCameraRow(i) {
            var c = null
            if (this.config.cameraList[i].enabled) {
                if (i > 0) this.config.cameraList[i - 1].enabled = true;
                if (i == 0 && this.config.cameraList.length > 0) this.config.cameraList[i + 1].enabled = true;
            }
            this.config.cameraList.splice(i, 1)
            this.$forceUpdate();
        },
        addStorageRow() {
            this.config.storageList.push({ name: "", location: "" })
            this.config.storageList.push(0)
        },
        delStorageRow(i) {
            this.config.storageList.splice(i, 1)
            this.config.storageList.splice(i, 1)
        }
    },
    computed: {
        ConfigResp: function() {
            this.configLoaded = true;
            var config = this.$store.state.controller.GetConfigResp
            return config
        },
        HasChanges: function() {
            if(this.originalConfig === {}) return false;
            if(this.config === {}) return false;
            if(JSON.stringify(this.originalConfig) != JSON.stringify(this.config)) {
                return true;
            }
            return false;
        }

    }
}
</script>

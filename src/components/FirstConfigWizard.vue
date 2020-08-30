<template>
    <v-stepper class="elevation-0" v-model="e1" alt-labels>
        <v-stepper-header>
            <v-stepper-step editable step="1">Welcome!</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="2">Setup Tracker</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="3">Add Cameras</v-stepper-step>
            <v-divider></v-divider>
            <!--
            <v-stepper-step editable step="4">Add Storage</v-stepper-step>
            <v-divider></v-divider>
            -->
            <v-stepper-step editable step="4">Finished!</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
    
            <!-- Welcome -->
            <v-stepper-content step="1">
                <v-card>
                    <v-card-text class="text-center">
                        <v-col offset="3" align="center" justify="center" cols="6">
                            <v-row justify="center" align="center">
                                <div class="display-2">Welcome</div>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col align="center" justify="center" cols="6">
                                    <v-img width="350" src="../assets/skyhub_logo.png"></v-img>
                                </v-col>
                            </v-row>
                            <v-col class="mt-5">
                                We will now help you configure your Sky Hub Tracker device.
                                <!--<p class="title">Your Tracker's unique identifier is {{config.uuid}}</p>-->
                            </v-col>
                        </v-col>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" dark color="primary" @click="next()">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
    
            <!-- General Configuration -->
            <v-stepper-content step="2">
                <v-card flat>
                    <v-card-title>
                        Let's configure the general settings for your device.
                    </v-card-title>
                    <v-card-text>

                        <v-form>
                            <v-row>
                                <v-col cols="6">
                                    <v-subheader>Your node name is your public ID for Sky Hub</v-subheader>
                                    <v-text-field v-model="config.nodename" outlined label="Node Name"></v-text-field>
                                    <v-subheader>Set hostname for your node.</v-subheader>
                                    <v-text-field v-model="config.hostname" outlined label="Hostname"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-subheader>Set your email address.</v-subheader>
                                    <v-text-field v-model="config.username" outlined label="Email Address"></v-text-field>
                                    <v-subheader>Set password for your node.</v-subheader>
                                    <v-text-field type="password" v-model="config.password" outlined label="Password"></v-text-field>
                                    <v-text-field type="password" v-model="config.passwordagain" outlined label="Password Again"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
    
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" dark color="primary" @click="prev()">Back</v-btn>
                        <v-btn class="ma-5" dark color="primary" @click="next()">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
    
            <!-- Camera Configuration -->
            <v-stepper-content step="3">
                <v-card flat>
                    <v-card-title>
                        Configure your cameras.
                    </v-card-title>
                    <v-card-text>
                        <v-col cols="12">
                            <v-form v-for="(i,v) in config.cameraList" :key="v" row="1">
                                <v-row row="1">
                                    <v-col cols="4">
                                        <v-text-field v-model="config.cameraList[v].name" outlined label="Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="5">
                                        <v-text-field v-model="config.cameraList[v].uri" outlined label="URI" placeholder="Example: rtsp://ipaddress:port"></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field v-model="config.cameraList[v].location" outlined label="Location"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">
                                        <v-text-field v-model="config.cameraList[v].username" outlined label="Username"></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field v-model="config.cameraList[v].password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="input-10-1" hint="At least 8 characters" counter @click:append="show1 = !show1" outlined label="Password"></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                            <v-select v-model="config.cameraList[v].type" :items="cameraTypes" label="Standard"></v-select>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-checkbox v-model="config.cameraList[v].enabled" @click="setCameraEnabled(v)" outlined :label="`Enabled: ${config.cameraList[v].enabled.toString()}`"></v-checkbox>
                                    </v-col>
                                    <v-col cols="1">
                                        <v-btn class="ma-5" color="error" @click="delCameraRow(v)">Remove</v-btn>
                                    </v-col>
                                </v-row>
                                <v-divider class="ma-5"></v-divider>
                            </v-form>
                        </v-col>
                    </v-card-text>
                    <v-card-actions fixed bottom>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" color="" @click="addCameraRow()">Add Camera</v-btn>
                        <v-btn class="ma-5" dark color="primary" @click="prev()">Back</v-btn>
                        <v-btn class="ma-5" dark color="primary" @click="next()">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
    
            <!-- Storage Configuration -->
            <!--
            <v-stepper-content step="4">
                <v-card flat>
                    <v-card-title>
                        Setup storage devices that will be used to store video and sensor data.
                    </v-card-title>
                    <v-card-text>
                        <v-col cols="12">
                            <v-form>
                                <v-row v-for="(i,v) in storage" :key="v" row="1">
                                    <v-col justify="start" align="center" cols="1">
                                        <v-btn v-if="v && storage.length > 0" @click="delStorageRow(v)" icon>
                                            <v-icon large>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-subheader>Enter the name for disk. e.g. Storage_1 </v-subheader>
                                        <v-text-field v-model="config.storage[v].name" outlined label="Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-subheader>Enter the path to mounted disk. e.g. /mnt/storage</v-subheader>
                                        <v-text-field v-model="config.storage[v].location" outlined label="Location"></v-text-field>
                                    </v-col>
                                    <v-col justify="end" align="center" cols="1">
                                        <v-btn v-if="v == storage.length -1" @click="addStorageRow" icon>
                                            <v-icon large>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-col>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" dark color="primary" @click="prev()">Back</v-btn>
                        <v-btn class="ma-5" dark color="primary" @click="next()">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
            -->

            <!-- Finished -->
            <v-stepper-content step="5">
                <v-card>
                    <v-card-text class="text-center">
                        <v-col offset="3" align="center" justify="center" cols="6">
                            <v-row justify="center" align="center">
                                <div class="display-2">Setup Complete</div>
                            </v-row>
                            <v-col class="mt-5">
                                <p>Click done to save your setting and start using your tracker.</p>
                            </v-col>
                        </v-col>
                        <v-row justify="center" v-if="saving" align="center">
                            <v-progress-circular size="100" indeterminate></v-progress-circular>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" dark color="primary" @click="saveConfig()">Done</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'FirstConfigWizard',
    data() {
        return {
            saving: false,
            show1: false,
            config: {
                uuid: "",
                username: "",
                password: "",
                passwordagain: "",
                hostname: "",
                nodename: "",
                cameraList: [
                    { name: "", location: "", uri: "", username: "", password: "", type:"PTX", enabled: true },
                ],
                storageList: [
                    { name: "", location: "" },
                ],
            },
            cameras: [1],
            storage: [1],
            step:1,
            e1: 1,
            cameraTypes: ['PTZ', 'Fisheye'],
        }
    },
    /* eslint-disable */
    watch: {
        ConfigResp(val) {
            this.config = JSON.parse(JSON.stringify(val.config));
            if(this.config.cameraList.length === 0) {
                this.config.cameraList.push({ name: "", location: "", uri: "", username: "", password: "", type:"PTX", enabled: true });
            }
            this.config.nodename = val.config.nodename;
            this.config.uuid = val.config.uuid;
        }
    },
    created() {
        // this.$store.dispatch('controller/GetConfig')
    },
    computed: {
        ConfigResp() {
            var config = this.$store.state.controller.GetConfigResp
            return config
        }
    },
    methods: {
        next() {
            /* eslint-disable */
            console.log(this.step)
            this.e1++
        },
        prev() {
            this.e1--
        },
        saveConfig() {
            /* eslint-disable */
            self = this;
            this.config.configured = true;
            this.saving = true;

            this.$store.dispatch('controller/SetConfig', this.config).then(function() {
                self.saving = false;
                setTimeout(function() {
                    self.$store.dispatch('controller/GetConfig');
                }, 3000);
            })
        },
        addCameraRow() {
            this.config.cameraList.push({ name: "", location: "", uri: "", username: "", password: "", type:"PTX", enabled: false })
            //this.config.cameraList.push(0)
        },
        setCameraEnabled(id) {
            for(var i = 0; i < this.config.cameraList.length; i++) {
                var camera = this.config.cameraList[i];
                if(id == i) {
                    camera.enabled = true;
                } else {
                    camera.enabled = false;
                }
            }
        },
        delCameraRow(i) {
            var c = null
            if(this.config.cameraList[i].enabled) {
                if(i > 0) this.config.cameraList[i - 1].enabled = true;
                if(i == 0 && this.config.cameraList.length > 0) this.config.cameraList[i + 1].enabled = true;
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
        },
    }
}
</script>

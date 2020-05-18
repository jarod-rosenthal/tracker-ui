<template>
    <v-stepper class="elevation-0" v-model="e1" alt-labels>
        <v-stepper-header>
            <v-stepper-step editable step="1">Welcome!</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="2">Setup Node</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="3">Add Cameras</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="4">Add Storage</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="5">Finished!</v-stepper-step>
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
                            <v-form>
                                <v-row v-for="(i,v) in cameras" :key="v" row="1">
                                    <v-col cols="2">
                                        <v-text-field v-model="config.camera[v].name" outlined label="Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field v-model="config.camera[v].uri" outlined label="URI"></v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-text-field v-model="config.camera[v].location" outlined label="Location"></v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-text-field v-model="config.camera[v].username" outlined label="Username"></v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-text-field v-model="config.camera[v].password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="input-10-1" hint="At least 8 characters" counter @click:append="show1 = !show1" outlined label="Password"></v-text-field>
                                    </v-col>
                                    <v-col justify="end" align="center" cols="1">
                                        <v-btn @click="addCameraRow" icon>
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
    
            <!-- Storage Configuration -->
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
    
            <!-- Finished -->
            <v-stepper-content step="5">
                <v-card>
                    <v-card-text class="text-center">
                        <v-col offset="3" align="center" justify="center" cols="6">
                            <v-row justify="center" align="center">
                                <div class="display-2">Setup Complete</div>
                            </v-row>
                            <v-col class="mt-5">
                                <p>Your tracker is now operational.</p>
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
                username: "",
                password: "",
                passwordagain: "",
                hostname: "",
                nodename: "",
                camera: [
                    { name: "", location: "", uri: "", username: "", password: "", enabled: true },
                ],
                storage: [
                    { name: "", location: "" },
                ],
            },
            cameras: [1],
            storage: [1],
            e1: 1,
        }
    },
    /* eslint-disable */
    watch: {
        GConfigResp(oldObj, o) {
            this.config.nodename = o.config.nodename;
            this.config.uuid = o.config.uuid;
        }
    },
    created() {
        // this.$store.dispatch('controller/GetConfig')
    },
    computed: {
        // ConfigResp: function() {
        //     var config = this.$store.state.controller.GetConfigResp
        //     return config
        // }
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
            this.$store.dispatch('controller/SetConfig', this.config)
            console.log(this.config)
            this.saving = true
            self = this
            setTimeout(function() {
                self.$store.dispatch('controller/GetConfig')
            }, 3000)
        },
        addCameraRow() {
            this.config.camera.push({ name: "", location: "", uri: "", username: "", password: "", enabled: false })
            this.cameras.push(0)
        },
        delCameraRow(i) {
            var c = null
            this.cameras.splice(i, 1)
            this.selectedProtocol.splice(i, 1)
            this.config.camera.splice(i, 1)
            this.$forceUpdate();

        },
        addStorageRow() {
            this.config.storage.push({ name: "", location: "" })
            this.storage.push(0)
        },
        delStorageRow(i) {
            this.storage.splice(i, 1)
            this.config.storage.splice(i, 1)
        },
    }
}
</script>

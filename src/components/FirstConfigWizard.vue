<template>
    <v-stepper class="elevation-0" v-model="e1" alt-labels>
        <v-stepper-header>
            <v-stepper-step editable step="1">Welcome!</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="2">Setup Tracker</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="3">Add Cameras</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="4">License</v-stepper-step>
            <v-divider></v-divider>
            <!--
            <v-stepper-step editable step="4">Add Storage</v-stepper-step>
            <v-divider></v-divider>
            -->
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
    
     <v-stepper-content step="4">
                <v-card>
                    <v-card-title >
                        <v-col offset="3" align="center" justify="center" cols="6">
                        <h3>Sky Hub Terms of Service</h3>
                        </v-col>
                    </v-card-title>
                    <v-card-text class="text-center">
                        <v-col offset="2" align="center" justify="center" cols="8">
                            <v-col class="mt-5 eluabox">
                                <p>Unfortunately, the world we live in demands us to get your agreement to our Terms of Service. If you want to participate in this Project, please agree to the following:
                                This website is owned and operated by Sky Hub Inc and its subsidiaries (collectively “Sky Hub,” “we,” “us,” or “our”). These Terms of Service (“Terms”) govern your legal rights to use or access our project, software, and our websites (the “Project”). Please read these Terms carefully before taking part in the Project. By using or accessing our Project, you signify your acknowledgement and assent to the terms and conditions of use set forth below. These Terms (together with other user agreements, where applicable) constitute a binding legal agreement between you and Sky Hub (this “Agreement”). 
                                </p>
                                <p>*If you do not agree with these Terms, please do not take part in our Project. *</p>
                                <h4>
                                GENERAL
                                </h4>
                                <p>
                                This Agreement represents the entire understanding relating to your taking part in this Project and prevails over any prior or contemporaneous, conflicting or additional communications between you and Sky Hub. All rights not expressly granted herein are reserved by Sky Hub. However, to the extent your participation in the Project involves or is integrated with products or project of third party companies, any terms and policies covering those products or project may also apply.
                                The term “you,” as used in these Terms, includes any person or entity who is taking part in this Project and creates a user account with Sky Hub (“Participant”), as well as any person or entity allowed or authorized to access or use the Participant’s Project (“Authorized Users”). Authorized Users are responsible for their own actions in connection with the Project, but Participant hereby consents to these terms on behalf of all Authorized Users and agrees to be fully responsible for all actions taken by Authorized Users relating to the Participant’s involvement in the Project and Participant’s account. As a result, if you are a Participant, you should authorize only those individuals that you trust to access your account and take part in the Project.
                                You must be at least 13 years old to take part in the Project. If you are between the ages of 13 and 18, you may take part in the Project only with the consent and under the supervision of a parent or legal guardian who agrees to be bound by these Terms. If you are a parent or legal guardian of a user between the ages of 13 and 18, you consent to these terms on behalf of such user and you are fully responsible for the acts of such user in relation to our Project.
                                If you’re agreeing to these Terms on behalf of an organization or entity, you represent and warrant that you are authorized to agree to these Terms on that organization or entity’s behalf and bind them to these Terms (in which case, the references to “you” and “your” in these Terms, except for in this sentence, refer collectively to you personally and to that organization or entity).
                                </p>
                                <h4>
                                CHANGES TO THIS AGREEMENT AND PROJECT
                                </h4>
                                <p>
                                Sky Hub is free to revise these Terms or any other part of this Agreement at any time by updating this page. If we make changes to these Terms that we consider material, we will make reasonable efforts to notify you by placing a notice on the Sky Hub.com website, notifying you through the Project, by sending you an email, or by some other means. By continuing to use our Products and Project after such changes, you are expressing your acknowledgement and acceptance of the changes. Please check these Terms periodically for updates.
                                We’re always trying to improve the Project, so they may change over time. We may suspend or discontinue any part of the Project, or we may introduce new features or impose limits on certain features or restrict access to parts or all of the Project. Similarly, we reserve the right to remove any Content from the Project at any time, for any reason, in our sole discretion, and without notice.
                                We are also free to terminate (or suspend access to) your use of the Project or your account, for any reason in our discretion, including your breach of these Terms. We have the sole right to decide whether you are in violation of any of the restrictions set forth in this Agreement.
                                </p>
                                <h4>
                                ACCESS AND USE
                                </h4>
                                <p>
                                All right, title and interest in the Project and our content provided through the Project (including without limitation information, documents, logos, graphics, designs and images) are owned by Sky Hub. Subject to these Terms, Sky Hub grants you non-exclusive right to access and make non-commercial use of the Project and the data gathered through the Project under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License which can be read in detail here: https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.
                                Privacy and other laws applicable in your jurisdiction may impose certain responsibilities on you and your participation in the Project. You agree that it is your responsibility, and not the responsibility of Sky Hub, to ensure that you comply with any applicable laws when you participate in the Project, including but not limited to:
                                any laws or regulations relating to the recording or sharing of video or audio content, (2) any laws or regulations requiring that notice be given to or that consent be obtained from third parties with respect to your participation in the Project (for example, laws or regulations requiring you to display appropriate signage advising others that audio/visual recording is taking place), and/or (3) any laws or regulations requiring (a) that installation of any Tracker which takes visual and/or audio recordings be installed at such an angle that it does not take any recordings beyond the boundary of your property (including public pavements or roads); and (b) that, if you use your property as a workplace, you comply with laws governing the monitoring of employees.
                                If your participation in the Project is prohibited by applicable laws, then you aren’t authorized to take part in the Project. We can’t and won’t be responsible for your participation in the Project in a way that breaks the law.                                
                                </p>
                            </v-col>
                        </v-col>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" dark color="primary" @click="prev()">Back</v-btn>
                        <v-btn class="ma-5" dark color="primary" @click="next()">Accept &amp; Continue</v-btn>
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
                                <p>Click done to save your setting and start using your tracker.</p>
                            </v-col>
                        </v-col>
                        <v-row justify="center" v-if="saving" align="center">
                            <v-progress-circular size="100" indeterminate></v-progress-circular>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-5" dark color="primary" @click="prev()">Back</v-btn>
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

/* eslint-disable */
<style>
 .eluabox {
     overflow: auto;
     height: 350px;
     width:100%;
     border: solid #ddd 1px;
     border-radius: 4px;
 }
</style>
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
        <v-dialog
            v-model="showlicense"
            max-width="80%"
            >
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
                        
                        <v-col offset="2" align="center" justify="center" cols="8">
                        <v-btn class="ma-5" dark color="primary" @click="dialog=false">Accept</v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card>            
        </v-dialog>
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
    showlicense: true,
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

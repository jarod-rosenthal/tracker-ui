<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-row class="ma-5 pa-5">
                    <v-img width=600 src="../assets/skyhub_logo.png"></v-img>
                </v-row>
                <v-card class="elevation-12">
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="username" label="Login" name="login" prepend-icon="mdi-account" type="text" />
    
                            <v-text-field v-model="password" id="password" label="Password" name="password" prepend-icon="mdi-lock" type="password" v-on:keyup.enter="loginClicked" />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn @click="loginClicked" color="primary">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar v-model="show" :color="color">
            {{ message }}
            <v-btn text @click="show = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: null,
            loginPressed: false,
            show: false,
            message: '',
            color: ''
        }
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'ui/status') {
                this.message = state.ui.status
                this.color = state.color
                this.show = true
            }
        })
    },
    computed: {
        authenticated() {
            return this.$store.state.ui.authenticated
        },
        status() {
            return this.$store.state.ui.status
        }
    },
    methods: {
        loginClicked() {
            this.$store.dispatch('ui/login', {
                username: this.username,
                password: this.password,
            })
            this.loginPressed = true
            this.password = null
        },
        checkClicked() {
            this.$store.dispatch('ui/loginCheck')
        },
        logoutClicked() {
            this.$store.dispatch('ui/logout')
        }
    }
}
</script>

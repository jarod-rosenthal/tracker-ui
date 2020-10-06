<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-row class="ma-5 pa-5">
                    <v-img width=600 src="../assets/skyhub_logo.png"></v-img>
                </v-row>
                <v-card class="elevation-12">
                    Cannot Connect To Controller
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
    },
    created() {
    },
    computed: {
        connected() {
            return this.$store.state.controller.IsConnected
        },
    },
    methods: {
    }
}
</script>

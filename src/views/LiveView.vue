<template>
    <v-container fluid v-cloak>
        <v-card flat>
            <v-card-title>
                Live View
            </v-card-title>
            <v-card-text>
                <v-divider></v-divider>
                <v-subheader>
                    Video Streams
                </v-subheader>
                <video id="test_video" controls autoplay>
                          <source src="rtsp://skyhub:skyhub123@192.168.1.64:554" />
                        </video>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'Events',
    data() {
        return {}
    }
}
</script>

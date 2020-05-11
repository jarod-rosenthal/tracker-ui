<template>
    <v-container fluid>
        <v-row>
            <v-col cols="8">
                <v-card outlined>
                    <div class="ma-3 mb-0 title">Events</div>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item-group v-model="item" color="primary">
                            <v-list-item v-for="(item, i) in items" :key="i">
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
    
            <v-col cols="4">
                <v-card outlined>
                    <div class="ma-3 mb-0 title">System Status</div>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item-group v-model="item" color="primary">
                            <v-list-item v-for="(item, i) in status" :key="i">
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon :color="item.status_color" v-text="item.status"></v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    
        <v-col cols="12">
            <div class="ma-3 mb-0 title">Latest Video</div>
            <v-divider></v-divider>
            <v-row>
                
                <v-col col="1">
                    <v-card width="300" height="200">
                        <v-video ref="video" width="300" height="200" poster="http://localhost:3000/thumb/ddd2c40e-4e1b-11ea-aeb2-507b9d666ab9.png" class="video-js" webkit-playsinline playsinline x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true"
                            x5-video-orientation="portraint" controls sources="[http://localhost:3000/video/30458f6a-4d51-11ea-a80f-507b9d666ab9.mp4]"></v-video>
                    </v-card>
                </v-col>
                <v-col col="1">
                    <v-card width="300" height="200">
                        <v-video ref="video" width="300" height="200" poster="http://localhost:3000/thumb/ddd2c40e-4e1b-11ea-aeb2-507b9d666ab9.png" class="video-js" webkit-playsinline playsinline x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true"
                            x5-video-orientation="portraint" controls sources="[http://localhost:3000/video/30458f6a-4d51-11ea-a80f-507b9d666ab9.mp4]"></v-video>
                    </v-card>
                </v-col>
                <v-col col="1">
                    <v-card width="300" height="200">
                        <v-video ref="video" width="300" height="200" poster="http://localhost:3000/thumb/ddd2c40e-4e1b-11ea-aeb2-507b9d666ab9.png" class="video-js" webkit-playsinline playsinline x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true"
                            x5-video-orientation="portraint" controls sources="[http://localhost:3000/video/30458f6a-4d51-11ea-a80f-507b9d666ab9.mp4]"></v-video>
                    </v-card>
                </v-col>
                <v-col col="1">
                    <v-card width="300" height="200">
                        <v-video ref="video" width="300" height="200" poster="http://localhost:3000/thumb/ddd2c40e-4e1b-11ea-aeb2-507b9d666ab9.png" class="video-js" webkit-playsinline playsinline x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true"
                            x5-video-orientation="portraint" controls sources="[http://localhost:3000/video/30458f6a-4d51-11ea-a80f-507b9d666ab9.mp4]"></v-video>
                    </v-card>
                </v-col>
            </v-row>
    
        </v-col>
    </v-container>
</template>

<script>
export default {
    name: 'Dashboard',
    data: () => ({
        item: 1,
        items: [
            { text: 'Motion Detected from PTZ at 22:53', icon: 'mdi-video' },
            { text: 'Noise Detected from PTZ at 22:58', icon: 'mdi-surround-sound' },
            { text: 'Temperature Drop Detected from Witmotion at 22:59', icon: 'mdi-coolant-temperature' },
            { text: 'Motion Detected from Fisheye at 22:41', icon: 'mdi-video' },
        ],
        status_item: 1,
        status: [
            { status: "mdi-alert", status_color: "red", text: 'GPS', icon: 'mdi-crosshairs-gps' },
            { status: "mdi-checkbox-blank-circle", status_color: "green", text: 'Network', icon: 'mdi-wan' },
            { status: "mdi-checkbox-blank-circle", status_color: "green", text: 'Camera - PTZ', icon: 'mdi-video' },
            { status: "mdi-checkbox-blank-circle", status_color: "green", text: 'Storage - NVME', icon: 'mdi-harddisk' },
        ],
    }),
    components: {},
}
</script>

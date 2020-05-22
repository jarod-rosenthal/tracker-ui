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
                <v-col v-for="v in Videos" :key="v">
                    <v-card width="300" height="200">
                        <v-video ref="video" width="300" height="200" :poster="v.fullThumbPath" class="video-js" webkit-playsinline playsinline x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portrait" controls :sources="[v.fullPath]"
                            :options="playOpts.options" @ready="videoReady" @ended="videoEnd"></v-video>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import settings from '../plugins/settings.js'
export default {
    name: 'Dashboard',
    data: () => ({
        item: 1,
        page: 0,
        playOpts: {
            options: {
                controls: true,
                preload: 'auto',
                techOrder: ["html5"]
            }
        },        
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
    mounted() {
         this.$store.dispatch('controller/GetVideoEvents', { page: this.page, limit: 5 })
    },    
    methods: {
        GetVideos() {
            var videos = this.$store.state.controller.GetVideoEventsResp.videoList[10]
            if(videos === undefined) videos = [];
            videos.forEach(function(v) {
                v.fullPath = "http://" + settings.videoServer + ":3000/video/" + v.uri;
                v.fullThumbPath = "http://" + settings.videoServer + ":3000/thumbnail/" + v.thumb;
            });
            return videos;
        }
    },    
    computed: {
        Videos: function() {
            var videos = this.$store.state.controller.GetVideoEventsResp.videoList
            if(videos === undefined) videos = [];
            videos.forEach(function(v) {
                v.fullPath = "http://" + settings.videoServer + ":3000/video/" + v.uri;
                v.fullThumbPath = "http://" + settings.videoServer + ":3000/thumbnail/" + v.thumb;
            });
            return videos;
        }
    },    
    components: {},
}
</script>

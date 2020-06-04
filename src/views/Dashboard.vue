<template>
    <v-container fluid>
        <v-row>
            <v-col cols="6">
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

            <v-col cols="6">
                <v-card outlined>
                    <div class="ma-3 mb-0 title">Last {{events.length}} Events</div>
                    <v-divider></v-divider>
                    <v-list height="300">
                        <v-list-item-group v-model="item" color="primary">
                            <v-list-item v-for="(item, i) in events" :key="i">
                                <v-list-item-icon>
                                    <v-icon v-text="getEventIcon(item)"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-row cold="3">
                                        <v-col>{{item.source}}</v-col>
                                        <v-col>{{item.type}}</v-col>
                                        <v-col>{{item.time}}</v-col>
                                    </v-row>
                                    <!--
                                    <v-list-item-title v-text="`${item.source} - ${item.type} - ${item.time}`"></v-list-item-title>
                                    -->
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-btn icon :to="getEventUrl(item.id)"><v-icon>mdi-launch</v-icon></v-btn>
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

<style>
.v-list {
  height: 300px;
  overflow-y: auto;
}
</style>

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
        events: [],
        status_item: 1,
        status: [
            { status: "mdi-alert", status_color: "red", text: 'GPS', icon: 'mdi-crosshairs-gps' },
            { status: "mdi-checkbox-blank-circle", status_color: "green", text: 'Network', icon: 'mdi-wan' },
            { status: "mdi-checkbox-blank-circle", status_color: "green", text: 'Camera - PTZ', icon: 'mdi-video' },
            { status: "mdi-checkbox-blank-circle", status_color: "green", text: 'Storage - NVME', icon: 'mdi-harddisk' },
        ],
    }),
    mounted() {
        this.$store.dispatch('controller/GetVideoEvents', { page: this.page, limit: 4 })
        this.$store.dispatch('controller/GetEvents', { page: 1, limit: 15 })
        this.status.push({ status: "mdi-checkbox-blank-circle", status_color: "green", text: `UI Version: ${this.$store.getters.appVersion}`, icon: '' });
    },
    // watch: {
    //     Events: function() {
    //         if (!this.Events) {
    //             return
    //         }
    //         for (var i = 0; i < this.Events.length; i++) {
    //             var e = this.Events[i]
    //             var d = new Date(e.createdAt.seconds * 1000)
    //             this.events.push({
    //                 id: e.id,
    //                 time: d.toLocaleDateString() + ' ' + d.toLocaleTimeString(),
    //                 type: e.type,
    //                 source: e.source,
    //                 sensor: e.sensor,
    //                 duration: (e.duration / 1000).toFixed(2),
    //             })
    //         }
    //     }        
    // },
    methods: {
        GetVideos() {
            var videos = this.$store.state.controller.GetVideoEventsResp.videoList[10]
            if (videos === undefined) videos = [];
            videos.forEach(function(v) {
                v.fullPath = "http://" + settings.videoServer + ":3000/video/" + v.uri;
                v.fullThumbPath = "http://" + settings.videoServer + ":3000/thumbnail/" + v.thumb;
            });
            return videos;
        },
        getEventIcon(event){
            switch (event.type) {
                case "VideoMotion": {
                    return "mdi-video";
                }
                default: {
                    return "mdi-video";
                }
            }
        },
        getEventUrl: function(id) {
            return "/event/" + id
        }
    },
    computed: {
        Videos: function() {
            var videos = this.$store.state.controller.GetVideoEventsResp.videoList
            if (videos === undefined) videos = [];
            videos.forEach(function(v) {
                v.fullPath = "http://" + settings.videoServer + ":3000/video/" + v.uri;
                v.fullThumbPath = "http://" + settings.videoServer + ":3000/thumbnail/" + v.thumb;
            });
            return videos;
        },
        // Events: function() {
        //     var r = this.$store.state.controller.GetEventsResp
        //     if (r && r.eventList) {
        //         return r.eventList
        //     }
        //     return null
        // }        
    },
    components: {},
}
</script>

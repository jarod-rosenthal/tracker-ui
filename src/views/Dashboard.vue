<template>
    <v-container fluid v-cloak>
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
                <v-col v-for="v in videos" :key="v.id">
                    <v-card width="300" height="200">
                        <v-card-text>{{v.time}}</v-card-text>
                        <video-player ref="video"
                            class="video-js video-player-box"
                            webkit-playsinline
                            playsinline
                            x-webkit-airplay="allow"
                            x5-video-player-type="h5"
                            x5-video-player-fullscreen="true"
                            x5-video-orientation="portrait"
                            controls 
                            :options="v.options" />
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
        videos: [],
        status_item: 1,
        status: [
            { status: "mdi-alert", status_color: "yellow", text: 'Tracking Event: No', icon: 'mdi-crosshairs-gps' },
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
        // window.setTimeout(function() {
        //     this.$store.dispatch('controller/GetEvents', { page: 1, limit: 15 }).then(function() {
        //         var r = this.$store.state.controller.GetEventsResp
        //         if (r && r.eventList && r.eventList.length > 0) {
        //             var lastEvent = r.eventList[0];
        //             this.$data.status[0].status_color = lastEvent.EndedAt ? 'yellow' : 'green';
        //             this.$data.status[0].text = lastEvent.EndedAt ? 'Tracking Event: No' : 'Tracking Event: Yes';
        //         } else {
        //             this.$data.status[0].status_color = 'yellow';
        //             this.$data.status[0].text = 'Tracking Event: No';
        //         }
        //     });
        // }, 5000);

    },
    watch: {
        Events: function() {
            if (!this.Events) {
                return
            }
            for (var i = 0; i < this.Events.length; i++) {
                var e = this.Events[i]
                var d = new Date(e.createdAt.seconds * 1000)
                this.events.push({
                    id: e.id,
                    time: d.toLocaleDateString() + ' ' + d.toLocaleTimeString(),
                    type: e.type,
                    source: e.source,
                    sensor: e.sensor,
                    duration: (e.duration / 1000).toFixed(2),
                })
            }
        },
        Videos: function() {
            /* eslint-disable */
            if (!this.Videos) {
                return
            }
            for (var i = 0; i < this.Videos.length; i++) {
                var v = this.Videos[i];
                var d = new Date(v.createdAt.seconds * 1000)
                if(this.videos[i] === undefined) {
                    this.videos.push({
                        createdAt: v.createdAt,
                        eventId: v.eventId,
                        fullPath: v.fullPath,
                        fullThumbPath: v.fullThumbPath,
                        thumb: v.thumb,
                        time: d.toLocaleDateString() + ' ' + d.toLocaleTimeString(),
                        uri: v.webUri,
                        options: {
                            poster: v.fullThumbPath,
                            controls: true,
                            preload: 'auto',
                            height: '200',
                            width: '300',
                            language: 'en',
                            techOrder: ['html5'],                        
                            plugins: {

                            },
                            playbackRates: [0.1, 0.25, 0.5, 0.75, 1],
                            source: v.fullPath,
                            sources: [{
                                src: v.fullPath
                            }]
                        }
                    })
                } else {
                    this.videos[i].createdAt = v.createdAt;
                    this.videos[i].eventId = v.eventId;
                    this.videos[i].fullPath = v.fullPath;
                    this.videos[i].fullThumbPath = v.fullThumbPath;
                    this.videos[i].thumb = v.thumb;
                    this.videos[i].time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
                    this.videos[i].uri = v.webUri;
                    this.videos[i].options = {
                        poster: v.fullThumbPath,
                        controls: true,
                        preload: 'auto',
                        height: '200',
                        width: '300',
                        language: 'en',
                        techOrder: ['html5'],                        
                        plugins: {

                        },
                        playbackRates: [0.1, 0.25, 0.5, 0.75, 1],
                        sources: [{
                            src: v.fullPath
                        }]
                    };
                }
            }  
        }                   
    },
    methods: {
        GetVideos() {
            var videos = this.$store.state.controller.GetVideoEventsResp.videoList[10]
            if (videos === undefined) videos = [];
            videos.forEach(function(v) {
                var d = new Date(v.createdAt.seconds * 1000)
                v.fullPath = "http://" + settings.videoServer + ":3000/video/" + v.webUri;
                v.fullThumbPath = "http://" + settings.videoServer + ":3000/thumbnail/" + v.thumb;
                v.time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
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
                var d = new Date(v.createdAt.seconds * 1000)
                v.fullPath = "http://" + settings.videoServer + ":3000/video/" + v.webUri;
                v.fullThumbPath = "http://" + settings.videoServer + ":3000/thumbnail/" + v.thumb;
                v.time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
            });
            return videos;
        },
        Events: function() {
            var r = this.$store.state.controller.GetEventsResp
            if (r && r.eventList) {
                return r.eventList
            }
            return null
        }
    },
    components: {},
}
</script>

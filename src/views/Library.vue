<template>
    <v-container fluid >
        <v-card flat>
            <v-card-title>
                Video Library
            </v-card-title>
            <v-divider></v-divider>
            <v-pagination v-model="page" :length="NPages"  total-visible="6" :value="0"></v-pagination>
            <v-row>
                <v-col v-for="v in videos" :key="v.id">
                    <v-card width="300" height="270" >
                        <v-card-text><v-btn icon :to="getEventUrl(v.eventId)"><v-icon>mdi-launch</v-icon></v-btn>{{v.time}}</v-card-text>
                        <video width="300" height="200" controls setup="{}" playsinline :poster="v.fullThumbPath" >
                            <source :src="v.fullPath" type="video/webm">
                            Your browser does not support the video tag.
                        </video>  
                        <!--                      
                        <video-player ref="video"
                            class="video-js video-player-box"
                             playsinline
                            x-webkit-airplay="allow"
                            x5-video-player-type="h5"
                            x5-video-player-fullscreen="true"
                            x5-video-orientation="portrait"
                            controls 
                            setup='{}'
                            :options="v.options" />-->
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style>
video {
    background-color: #000;
}
</style>

<script>

import settings from '../plugins/settings.js'
// import videoplayer from '../components/Video.vue';

export default {
    name: 'Library',
    components: {
        // videoplayer
    },    
    mounted() {
         this.$store.dispatch('controller/GetVideoEvents', { page: this.page, limit: this.limit })
    },
    watch: {
        page: function() {
            this.$data.videos.splice(0, this.$data.videos.length)
            
            this.$store.dispatch("controller/GetVideoEvents", { page: this.page, limit: this.limit })
            //window.scrollTo(0, 0);
        },
        Videos: function() {
            
            if (!this.Videos) {
                return
            }
            for (var i = 0; i < this.Videos.length; i++) {
                var v = this.Videos[i];
                var d = new Date(v.starttime.seconds * 1000)
                if(this.videos[i] === undefined) {
                    this.videos.push({
                        createdAt: d,
                        eventId: v.eventuuid,
                        fullPath: v.fullPath,
                        fullThumbPath: v.fullThumbPath,
                        thumb: v.thumbnail,
                        time: d.toLocaleDateString() + ' ' + d.toLocaleTimeString(),
                        uri: v.weburi,
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
                            sources: [{
                                src: v.fullPath
                            }]
                        }
                    })
                } else {
                    this.videos[i].createdAt = d;
                    this.videos[i].eventId = v.eventuuid;
                    this.videos[i].fullPath = v.fullPath;
                    this.videos[i].fullThumbPath = v.fullThumbPath;
                    this.videos[i].thumb = v.thumbnail;
                    this.videos[i].time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
                    this.videos[i].uri = v.weburi;
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
        },        
    },
    data() {
        return {
            page: 1,
            limit: 9,
            search_limits: [9, 12, 20, 50],
            playOpts: {
                options: {
                    controls: true,
                    preload: 'auto',
                    techOrder: ["html5"]
                }
            },
            videos: []
        }
    },
    methods: {
        getEventUrl: function(id) {
            return "/event/" + id
        },
    },
    computed: {
        Videos: function() {
            var videos = this.$store.state.controller.GetVideoEventsResp.videoList
            if (videos === undefined) videos = [];
            videos.forEach(function(v) {
                var d = new Date(v.starttime.seconds * 1000)
                v.fullPath = "http://" + settings.videoServer + ":3000/video/" + v.weburi;
                v.fullThumbPath = "http://" + settings.videoServer + ":3000/thumbnail/" + v.thumbnail;
                v.time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
                v.options = {
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
            });
            return videos;
        },
        NPages: function() {
            try {
                var nPages = this.$store.state.controller.GetVideoEventsResp.npages
                if(nPages - 1 < 0) return 0;
                return nPages - 1;
            }catch(e) {
                return 0;
            }
        }
    }
}
</script>

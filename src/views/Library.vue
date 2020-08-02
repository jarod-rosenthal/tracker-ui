<template>
    <v-container fluid>
        <v-card flat>
            <v-card-title>
                Video Library
            </v-card-title>
            <v-divider></v-divider>
            <v-pagination v-model="page" :length="NPages"></v-pagination>
            <v-row>
                <v-col v-for="(v, idx) in videos" :key="idx">
                    <v-card width="300" height="250" >
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
        </v-card>
    </v-container>
</template>

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
            this.$store.dispatch("controller/GetVideoEvents", { page: this.page, limit: this.limit })
            //window.scrollTo(0, 0);
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
                        uri: v.uri,
                        options: {
                            poster: v.fullThumbPath,
                            controls: true,
                            preload: 'auto',
                            height: '200',
                            width: '300',
                            language: 'en',
                            techOrder: ['html5', 'flvjs'],                        
                            plugins: {

                            },
                            playbackRates: [0.1, 0.25, 0.5, 0.75, 1],
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
                    this.videos[i].uri = v.uri;
                    this.videos[i].options = {
                        poster: v.fullThumbPath,
                        controls: true,
                        preload: 'auto',
                        height: '200',
                        width: '300',
                        language: 'en',
                        techOrder: ['html5', 'flvjs'],                        
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
            page: 0,
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
    computed: {
        Videos: function() {
            var r = this.$store.state.controller.GetVideoEventsResp
            if (r && r.videoList) {
                // while(this.videos.length>0) { this.videos.splice(0, 1); }
                for(var i = 0; i < r.videoList.length; i++) {
                    var v = r.videoList[i];
                    v.fullPath = "http://" + settings.videoServer + ":3000/video/" + v.uri;
                    v.fullThumbPath = "http://" + settings.videoServer + ":3000/thumbnail/" + v.thumb;
                }
                return r.videoList
            }
            return null            
        },
        NPages: function() {
            var nPages = this.$store.state.controller.GetVideoEventsResp.npages
            return nPages - 1;
        }
    }
}
</script>

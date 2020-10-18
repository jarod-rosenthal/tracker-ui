<template>
    <v-container fluid>
        <v-row>
                
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-card outlined>
                    <div class="ma-3 mb-0 title">Latest System Status </div>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-item-group v-model="item" color="primary">
                            <v-list-item v-for="(item, k) in status" :key="k">
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text" v-bind:class="{private:IsPrivate && item.supportprivacy}"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon :color="item.status_color" v-text="item.status"></v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card outlined>
                    <google-map ref="gmap" :center="location" :zoom="zoom" style="width: 100%; height: 350px" v-bind:class="{private:IsPrivate }">
                         <google-marker :position="location" />
                    </google-map>
                </v-card>
            </v-col>

        </v-row>
        <v-row>
            <v-col cols="12" md="6">
            <v-card outlined >
                <div class="ma-3 mb-0 title">Last {{events.length}} Events</div>
                <v-divider></v-divider>
                <v-list height="300" dense>
                    <v-list-item-group v-model="item" color="primary">
                        <v-list-item v-for="(item, i) in events" :key="i">
                            <v-list-item-icon>
                                <v-icon v-text="getEventIcon(item)"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-row>
                                    <v-col>{{item.source}}</v-col>
                                    <v-col>{{item.type}}</v-col>
                                    <v-col cols="8">{{item.time}}</v-col>
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
            <v-col cols="12" md="6">
                <v-card outlined height="100%">
                <div class="ma-3 mb-0 title">Latest Video</div>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col v-for="v in videos" :key="v.id">
                            <v-card width="300" height="200" >
                                <v-card-text><v-btn icon :to="getEventUrl(v.eventId)"><v-icon>mdi-launch</v-icon></v-btn>{{v.time}}</v-card-text>
                                <video width="300" height="200" controls playsinline setup="{}" :poster="v.fullThumbPath" >
                                    <source :src="v.fullPath" type="video/webm">
                                    Your browser does not support the video tag.
                                </video>                                  
                                <!--<video-player ref="video"
                                    class="video-js video-player-box"
                                    webkit-playsinline
                                    playsinline
                                    x-webkit-airplay="allow"
                                    x5-video-player-type="h5"
                                    x5-video-player-fullscreen="true"
                                    x5-video-orientation="portrait"
                                    controls 
                                    :options="v.options" />-->
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
                </v-card>
            </v-col>
                    

        </v-row>

    </v-container>
</template>

<style>
.v-list {
  height: 300px;
  overflow-y: auto;
}
.private {
    filter: blur(.5rem);
}
.public {
    filter: blur(0);
}
</style>

<script>
import settings from '../plugins/settings.js'
export default {
    name: 'Dashboard',
    data: () => ({
        item: 1,
        page: 0,
        zoom: 10,
        playOpts: {
            options: {
                controls: true,
                preload: 'auto',
                techOrder: ["html5"]
            }
        },
        apikey: "AIzaSyBOjsllC4FN05HiOAPKJrw-eTHM-KGx0aM",
        gpslocked:false,
        temperatureAvailable: false,
        location: {lat:104.5230, lng:33.3943},
        events: [],
        videos: [],
        status_item: 1,
        status: [
            { status: "mdi-alert", status_color: "green", text: 'Tracker Name: Loading...', icon: 'mdi-desktop-mac' },
            { status: "mdi-alert", status_color: "green", text: 'Tracker Id: Loading...', icon: 'mdi-account-key' },
            
            // { status: "mdi-alert", status_color: "green", text: 'Temperature: Loading...', icon: 'mdi-thermometer' }
            { status: "mdi-alert", status_color: "green", text: 'Event Recording: Loading...', icon: 'mdi-radiobox-marked' },
            { status: "mdi-alert", status_color: "green", text: 'GPS Location: Loading...', icon: 'mdi-crosshairs-gps', supportprivacy: true},
            { status: "mdi-alert", status_color: "green", text: 'GPS Time: Loading...', icon: 'mdi-clock' }
        ],
        pollingSensor: false,
        pollingSetup: false,
        settings: settings
    }),
    mounted() {
        var self = this;
        this.$store.dispatch('controller/GetVideoEvents', { page: this.page, limit: 2 })
        var sensorPolling = function(viewModel) {
            return function() {
                if(viewModel.$data.pollingSensor) { return; }
                viewModel.$data.pollingSensor = true;
                viewModel.$store.dispatch('controller/GetSensorReport').then(function() {
                    viewModel.$data.pollingSensor = false;
                    if(viewModel.$store.state.controller.GetSensorReportResp && viewModel.$store.state.controller.GetSensorReportResp.tracker) {
                    viewModel.$data.location.lat = viewModel.$store.state.controller.GetSensorReportResp.tracker.latitude;
                    viewModel.$data.location.lng = viewModel.$store.state.controller.GetSensorReportResp.tracker.longitude;
                        if(viewModel.$data.location.lat != 0 && viewModel.$data.location.lng != 0) {
                            viewModel.$data.gpslocked = true;
                        } else {
                            viewModel.$data.gpslocked = false;
                        }
                    } else {
                        viewModel.$data.gpslocked = false;
                    }

                    // if(viewModel.$store.state.controller.GetSensorReportResp && viewModel.$store.state.controller.GetSensorReportResp.lonlat) {

                    // }
                    var gpsItem, hostnameItem, idItem, timeItem, eventItem
                    if(viewModel.$store.state.controller.GetSensorReportResp.eventid != "") {
                        eventItem = viewModel.$data.status.filter(x => x.text.startsWith("Event Recording:"));
                        eventItem[0].status_color = "red";
                        eventItem[0].status = "mdi-checkbox-blank-circle";
                        eventItem[0].text = "Event Recording: " + viewModel.$store.state.controller.GetSensorReportResp.eventid;
                    } else {
                        eventItem = viewModel.$data.status.filter(x => x.text.startsWith("Event Recording:"));
                        eventItem[0].status_color = "green";
                        eventItem[0].status = "mdi-checkbox-blank-circle";
                        eventItem[0].text = "Event Recording: Not Recording";
                    }

                    if(viewModel.$data.gpslocked) {
                        gpsItem = viewModel.$data.status.filter(x => x.text.startsWith("GPS Location:"));
                        gpsItem[0].status_color = "green";
                        gpsItem[0].status = "mdi-checkbox-blank-circle";
                        gpsItem[0].text = "GPS Location: (" + viewModel.$data.location.lat + ", " + viewModel.$data.location.lng + ")";

                        hostnameItem = viewModel.$data.status.filter(x => x.text.startsWith("Tracker Name:"));
                        hostnameItem[0].text = "Tracker Name: " + viewModel.$store.state.controller.GetSensorReportResp.tracker.name;
                        hostnameItem[0].status_color = "green";
                        hostnameItem[0].status = "mdi-checkbox-blank-circle";

                        idItem = viewModel.$data.status.filter(x => x.text.startsWith("Tracker Id:"));
                        idItem[0].status_color = "green"; 
                        idItem[0].text = "Tracker Id: " + viewModel.$store.state.controller.GetSensorReportResp.tracker.uuid;
                        idItem[0].status = "mdi-checkbox-blank-circle";

                        var dateObj = new Date(viewModel.$store.state.controller.GetSensorReportResp.tracker.time.seconds * 1000);
                        timeItem = viewModel.$data.status.filter(x => x.text.startsWith("GPS Time:"));
                        timeItem[0].status_color = "green"; 
                        timeItem[0].text = "GPS Time: " + dateObj.toString();
                        timeItem[0].status = "mdi-checkbox-blank-circle";

                    } else {
                        gpsItem = viewModel.$data.status.filter(x => x.text.startsWith("GPS Location:"));
                        gpsItem[0].status_color = "red";
                        gpsItem[0].status = "mdi-alert";
                        gpsItem[0].text = "GPS Location: Unknown";

                        hostnameItem = viewModel.$data.status.filter(x => x.text.startsWith("Tracker Name:"));
                        hostnameItem[0].status_color = "red";
                        hostnameItem[0].text = "Tracker Name: Unknown";
                        hostnameItem[0].status = "mdi-alert";

                        idItem = viewModel.$data.status.filter(x => x.text.startsWith("Tracker Id:"));
                        idItem[0].status_color = "red";
                        idItem[0].text = "Tracker Id: Unknown";
                        idItem[0].status = "mdi-alert";

                        timeItem = viewModel.$data.status.filter(x => x.text.startsWith("GPS Time:"));
                        timeItem[0].status_color = "red"; 
                        timeItem[0].text = "GPS Time: Unavailable";
                        timeItem[0].status = "mdi-alert";


                    }

                    // if(viewModel.$data.temperatureAvailable) {

                    // } else {

                    // }

                });
            }
        }(self);
        sensorPolling();
        this.$data.getSensorHandle = setInterval(sensorPolling, self.settings.sensorPollRate);
        this.$store.dispatch('controller/GetEvents', { page: 1, limit: 15 })
        // this.status.push({ status: "mdi-checkbox-blank-circle", status_color: "green", text: `UI Version: ${this.$store.getters.appVersion}`, icon: '' });
    },
    beforeDestroy() {
        clearInterval(this.$data.getSensorHandle);
    },
    watch: {
        Events: function() {
            if (!this.Events) {
                return
            }
            for (var i = 0; i < this.Events.length; i++) {
                var e = this.Events[i]
                var d = new Date(e.starttime.seconds * 1000)
                this.events.push({
                    id: e.uuid,
                    time: d.toLocaleDateString() + ' ' + d.toLocaleTimeString(),
                    type: e.type,
                    source: e.source.name,
                    duration: (e.duration / 1000).toFixed(2),
                })
            }
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
                        createdAt: v.starttime,
                        eventId: v.eventuuid,
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
        },
    },
    computed: {
        IsPrivate() {
            return this.$store.state.controller.IsPrivate;
        },
        Videos: function() {
            var videos = this.$store.state.controller.GetVideoEventsResp.videoList
            if (videos === undefined) videos = [];
            videos.forEach(function(v) {
                var d = new Date(v.starttime.seconds * 1000)
                v.fullPath = location.protocol + "//" + settings.videoServer + ":3000/video/" + v.weburi;
                v.fullThumbPath = location.protocol + "//" + settings.videoServer + ":3000/thumbnail/" + v.thumbnail;
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

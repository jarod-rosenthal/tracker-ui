<template>
	<v-container fluid>
		<v-row>
			<v-col cols="12" md="6">
                <v-card outlined>
                    <v-card-title>
                        Event Info
                    </v-card-title>
                    <v-card-text>
						<v-divider></v-divider>
						<v-list>
							<v-list-item-group v-model="item" color="primary">
								<v-list-item>
									<v-list-item-content>
										<b>Event ID:</b> {{ Event.uuid }}
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-content>
										<b>Event Start:</b> {{ Event.start }}
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-content>
										<b>Event End:</b> {{ Event.end }}
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>					
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
                <v-card outlined >
                    <v-card-title>
                        Videos
                    </v-card-title>
                    <v-card-text>
						<v-row  v-for="v in Videos" :key="v.id">
							<video width="100%" height="300" controls setup="{}" playsinline :poster="v.fullThumbPath" >
								<source :src="v.fullPath" type="video/webm">
								Your browser does not support the video tag.
							</video>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<!--
			<v-col cols="12" md="6">
				<vue-c3 :handler="handler"></vue-c3>
			</v-col>
			-->
			<v-col cols="12" md="12">
                <v-card outlined >
                    <v-card-title>
                        Event Data
                    </v-card-title>
                    <v-card-text>
						<v-divider></v-divider>
						<json-viewer class="jsonviewer" :value="JsonData" :expand-depth="1" style="width:100%;" copyable sort></json-viewer>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<style>
.jsonviewer {
  background: #000;
  white-space: nowrap;
  color: #525252;
  font-size: 14px;
  font-family: Consolas, Menlo, Courier, monospace;
}
  .jv-ellipsis {
    color: #999;
    background-color: #eee;
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0px 4px 2px 4px;
    border-radius: 3px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }
  .jv-button { color: #49b3ff }
  .jv-key { color: #111111 }
  .jv-item {
    &.jv-array { color: #111111 }
    &.jv-boolean { color: #fc1e70 }
    &.jv-function { color: #067bca }
    &.jv-number { color: #fc1e70 }
    &.jv-number-float { color: #fc1e70 }
    &.jv-number-integer { color: #fc1e70 }
    &.jv-object { color: #111111 }
    &.jv-undefined { color: #e08331 }
    &.jv-string {
      color: #42b983;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    .jv-toggle {
      &:before {
        padding: 0px 2px;
        border-radius: 2px;
      }
      &:hover {
        &:before {
          background: #eee;
        }
      }
    }
  }

</style>

<script>
import settings from "../plugins/settings.js";
// import VueC3 from 'vue-c3'

export default {
	type: "EventView",
	props: ["id"],
	// components:{ VueC3 },
	mounted() {
		this.$store.dispatch("controller/GetEvent", { eventid:this.$route.params.id });
		this.initChart();
	},
	data() {
		return {
			checking: false,
		};
	},
	methods: {
		initChart() {
			const options = {
				data: {
				columns: [
					['data1', 2, 4, 1, 5, 2, 1],
					['data2', 7, 2, 4, 6, 10, 1]
				],
				},
			};
			this.handler.$emit('init', options);
		}
	},
    computed: {
		JsonData() {
			var jsonObj = this.$store.state.controller.GetEventResp;
			if(jsonObj !== undefined) {
				return jsonObj;
			} else {
				return {};
			}
		},
        Videos: function() {
            var videos = this.$store.state.controller.GetEventResp.videosList;
            if (videos === undefined) videos = [];
            videos.forEach(function(v) {
                var d = new Date(v.starttime.seconds * 1000)
                v.fullPath = "http://" + settings.videoServer + ":3000/video/" + v.weburi;
				v.mkvPath = "http://" + settings.videoServer + ":3000/video/" + v.uri;
                v.fullThumbPath = "http://" + settings.videoServer + ":3000/thumbnail/" + v.thumbnail;
                v.time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
            });
            return videos;
        },
		Event: function() {
			var event = this.$store.state.controller.GetEventResp.event;
			if(event === undefined) {
				event = {
					start: "Undefined",
					end: "Undefined"
				};
			} else {
				var sd = new Date(event.starttime.seconds * 1000);
				var ed = new Date(event.endtime.seconds * 1000);
				event.start = sd.toLocaleString()
				event.end = ed.toLocaleString()
			}
			
			return event;

		},
		SensorReports: function() {
			var reports = this.$store.state.controller.GetEventResp.reportsList;
			if (reports === undefined) reports = [];
			return reports;
		}
	}
};
</script>

<template>
	<v-container fluid v-cloak>
		<v-row>
			<v-col>Event ID:</v-col><v-col>{{ Event.uuid }}</v-col>
		</v-row>
		<v-row>
			<v-col>Event Start:</v-col><v-col>{{ Event.start.toLocaleDateString() + ' ' + Event.start.toLocaleTimeString() }}</v-col>
		</v-row>
		<v-row>
			<v-col>Event End:</v-col><v-col>{{ Event.end.toLocaleDateString() + ' ' + Event.end.toLocaleTimeString() }}</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-divider></v-divider>
				<v-row>
					<v-col v-for="v in Videos" :key="v.id">
						<v-card width="600" height="420" >
							<video width="600" height="420" controls setup="{}" :poster="v.fullThumbPath" >
								<source :src="v.fullPath" type="video/webm">
								Your browser does not support the video tag.
							</video>                                  
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row>
			<json-viewer class="jsonviewer" :value="JsonData" :expand-depth="1" style="width:100%;" copyable boxed sort></json-viewer>
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

export default {
	type: "EventView",
	props: ["id"],
	mounted() {
		this.$store.dispatch("controller/GetEvent", { eventid:this.$route.params.id  }).then(function() {

		});
	},
	data() {
		return {
			checking: false,
		};
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
				event.start = new Date(event.starttime.seconds * 1000);
				event.end = new Date(event.starttime.seconds * 1000);
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

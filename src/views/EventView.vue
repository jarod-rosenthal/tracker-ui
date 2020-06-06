<template>
	<v-container fluid>
		You are viewing Event {{ id }}
		<v-col cols="12">
			<v-divider></v-divider>
			<v-row>
				<v-col col="6">
					<v-card width="600" height="400">
            <v-video ref="video" width="600" height="400" 
              :poster="video.thumb" class="video-js" 
              webkit-playsinline playsinline x-webkit-airplay="allow" 
              x5-video-player-type="h5" x5-video-player-fullscreen="true" 
              x5-video-orientation="portrait" controls :sources="[video.url]"
                            :options="playOpts.options" ></v-video>            
					</v-card>
				</v-col>
			</v-row>
		</v-col>
	</v-container>
</template>

<script>
import settings from "../plugins/settings.js";

export default {
	type: "EventView",
	props: ["id"],
	mounted() {

  },
	data() {
		return {
			checking: false,
      playOpts: {
          options: {
              controls: true,
              preload: 'auto',
              techOrder: ["html5"]
          }
      },      
			video: {
				url:  "http://" + settings.videoServer + ":3000/video/" + this.$route.params.id + ".mp4",
				thumb:  "http://" + settings.videoServer + ":3000/thumbnail/" + this.$route.params.id + ".png"
			}
		};
	}
};
</script>

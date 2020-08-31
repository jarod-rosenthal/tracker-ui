<template>
	<v-container fluid v-cloak>
		You are viewing Event {{ id }}
		<v-col cols="12">
			<v-divider></v-divider>
			<v-row>
				<v-col col="6">
					<v-card width="600" height="400">
                        <video-player ref="video"
                            class="video-js video-player-box"
                            webkit-playsinline
                            playsinline
                            x-webkit-airplay="allow"
                            x5-video-player-type="h5"
                            x5-video-player-fullscreen="true"
                            x5-video-orientation="portrait"
                            controls 
                            :options="options" />   					
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
			options: {
				controls: true,
				preload: 'auto',
				techOrder: ["html5"],
				poster: "http://" + settings.videoServer + ":3000/thumbnail/" + this.$route.params.id + ".png",
				height: '400',
				width: '600',
				language: 'en',
				playbackRates: [0.1, 0.25, 0.5, 0.75, 1],
				sources: [{
					src: "http://" + settings.videoServer + ":3000/video/" + this.$route.params.id + ".mp4",
				}]			  
			},
			video: {

				url:  "http://" + settings.videoServer + ":3000/video/" + this.$route.params.id + ".mp4",
				thumb:  "http://" + settings.videoServer + ":3000/thumbnail/" + this.$route.params.id + ".png"
			}
		};
	}
};
</script>

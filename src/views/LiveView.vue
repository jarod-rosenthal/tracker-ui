<template>
  <v-container fluid>
   <v-card flat>
    <v-card-title>
     Live View
    </v-card-title>
    <v-card-text>
     <v-divider></v-divider>
     <v-subheader>
      Video Streams
     </v-subheader>
      <!-- // rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov -->
      <video id="test_video" controls autoplay>
<source src="rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov">
</video>
    </v-card-text>
   </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'Events',
   data () {
    return {
   }
  }
}

</script>

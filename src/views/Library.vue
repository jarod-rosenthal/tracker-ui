<template>
  <v-container fluid>
   <v-card flat>
    <v-card-title>
     Video Library 
    </v-card-title>
    <v-card-text>
     <v-divider></v-divider>
    <v-row>
     <v-subheader>
      Latest Videos 
     </v-subheader>
    <!-- 
     <v-spacer></v-spacer>
     <v-col cols="2">
     <v-select outlined
        :items="search_limits"
        label="Results Per Page"
     ></v-select>
     </v-col> -->
    </v-row>
       <v-row>
      <v-col v-for="v in Videos" :key="v">
       <v-card width="300" height="200">
   <v-video ref="video" width="300" height="200"
         :poster="v.thumb"
         class="video-js"
         webkit-playsinline
         playsinline
         x-webkit-airplay="allow"
         x5-video-player-type="h5"
         x5-video-player-fullscreen="true"
         x5-video-orientation="portraint"
         controls :sources="[v.uri]" :options="playOpts.options" @ready="videoReady" @ended="videoEnd"></v-video>
       </v-card>
       </v-col>
        </v-row>
    </v-card-text>
            <v-pagination
              v-model="page"
              :length="6"
            ></v-pagination>
   </v-card>
  </v-container>
</template>
<script>
export default {
   name: 'Library',
     components: {
    },
    mounted() {
       this.$store.dispatch('controller/GetVideoEvents', {page:this.page, limit:9})
    },
    watch: {
       page: function() {
          this.$store.dispatch("controller/GetVideoEvents", {page:this.page, limit:9})
          window.scrollTo(0,0);
       },
       $route(to, from) {
          /* eslint-disable */
          console.log(to)
          if (to == from) {
             return
          }
          if (to == "/library") {
             this.$store.dispatch('controller/GetVideoEvents', {page:this.page, limit:9})
          }
       }
    },
   data () {
    return {
      page: 1,
      search_limits: [ 9, 12, 20, 50 ],
      playOpts: {
        options: {
          controls: true,
          // autoplay: true,
          preload: 'auto',
          techOrder: ["html5"]
          // aspectRatio: "16:9"
        }
      }
   }
  },
  computed: {
   Videos: function () {
     var v = this.$store.state.controller.GetVideoEventsResp.videoList
     return v 
   }
  }
}

</script>

<template>
  <v-container fluid>
  You are viewing Event {{id}}
    <v-col cols="12">
      <v-divider></v-divider>
       <v-row>
      <v-col col="1">
       <v-card width="300" height="200">
        <v-video ref="video" width="300" height="200"
         poster="http://localhost:3000/thumb/ddd2c40e-4e1b-11ea-aeb2-507b9d666ab9.png"
         class="video-js"
         webkit-playsinline
         playsinline
         x-webkit-airplay="allow"
         x5-video-player-type="h5"
         x5-video-player-fullscreen="true"
         x5-video-orientation="portraint"
         controls sources="[http://localhost:3000/video/30458f6a-4d51-11ea-a80f-507b9d666ab9.mp4]"></v-video>
       </v-card>
       </v-col>
      <v-col col="1">
       <v-card width="300" height="200">
        <v-video ref="video" width="300" height="200"
         poster="http://localhost:3000/thumb/ddd2c40e-4e1b-11ea-aeb2-507b9d666ab9.png"
         class="video-js"
         webkit-playsinline
         playsinline
         x-webkit-airplay="allow"
         x5-video-player-type="h5"
         x5-video-player-fullscreen="true"
         x5-video-orientation="portraint"
         controls sources="[http://localhost:3000/video/30458f6a-4d51-11ea-a80f-507b9d666ab9.mp4]"></v-video>
       </v-card>
       </v-col>
      <v-col col="1">
       <v-card width="300" height="200">
        <v-video ref="video" width="300" height="200"
         poster="http://localhost:3000/thumb/ddd2c40e-4e1b-11ea-aeb2-507b9d666ab9.png"
         class="video-js"
         webkit-playsinline
         playsinline
         x-webkit-airplay="allow"
         x5-video-player-type="h5"
         x5-video-player-fullscreen="true"
         x5-video-orientation="portraint"
         controls sources="[http://localhost:3000/video/30458f6a-4d51-11ea-a80f-507b9d666ab9.mp4]"></v-video>
       </v-card>
       </v-col>
      <v-col col="1">
       <v-card width="300" height="200">
        <v-video ref="video" width="300" height="200"
         poster="http://localhost:3000/thumb/ddd2c40e-4e1b-11ea-aeb2-507b9d666ab9.png"
         class="video-js"
         webkit-playsinline
         playsinline
         x-webkit-airplay="allow"
         x5-video-player-type="h5"
         x5-video-player-fullscreen="true"
         x5-video-orientation="portraint"
         controls sources="[http://localhost:3000/video/30458f6a-4d51-11ea-a80f-507b9d666ab9.mp4]"></v-video>
       </v-card>
       </v-col>
        </v-row>

    </v-col>

  <v-card
    class="mx-auto"
    color="grey lighten-4"
    max-height="200"
  >
    <v-card-title>
      <v-icon
        :color="checking ? 'red lighten-2' : 'indigo'"
        class="mr-12"
        size="64"
        @click="takePulse">
        mdi-thermometer
      </v-icon>
      <v-row align="start">
        <div class="caption grey--text text-uppercase">
         Temperature 
        </div>
        <div>
          <span
            class="title font-weight-black"
            v-text="avg || '—'"
          ></span>
          <strong v-if="avg">C</strong>
        </div>
      </v-row>

      <v-spacer></v-spacer>
    </v-card-title>

    <v-sheet color="transparent">
      <v-sparkline
        :key="String(avg)"
        :smooth="1"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="1"
        :value="heartbeats"
        auto-draw
        height="25"
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
  </v-card>

  </v-container>
</template>
<script>
  const exhale = ms =>
    new Promise(resolve => setTimeout(resolve, ms))
export default {
  type: 'EventView',
  props: ['id'],
    mounted() {
    },
    watch: {
       page: function() {
       },
       $route(to, from) {
          if (to == from) {
             return
          }
       }
    },
    computed: {
      avg () {
        const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0)
        const length = this.heartbeats.length

        if (!sum && !length) return 0

        return Math.ceil(sum / length)
      },
    },

    created () {
      this.takePulse(false)
    },

    methods: {
      heartbeat () {
        return Math.ceil(Math.random() * (120 - 80) + 80)
      },
      async takePulse (inhale = true) {
        this.checking = true

        inhale && await exhale(1000)

        this.heartbeats = Array.from({ length: 20 }, this.heartbeat)

        this.checking = false
      },
    },
   data () {
    return {
      checking: false,
      heartbeats: [],
   }
  }
}
</script>

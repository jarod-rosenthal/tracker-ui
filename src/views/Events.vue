<template>
  <v-container fluid>
   <v-card flat>
    <v-card-title>
     Events 
    </v-card-title>
    <v-card-text>
     <v-divider></v-divider>
     <v-subheader>
      Event Log
     </v-subheader>
<template>
  <v-card>
    <v-card-title>
      Events
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        outlined
        v-model="search"
        append-icon="mdi-search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="events"
      :search="search"
    >
      <template v-slot:item.id="{ item }">
        <v-btn icon :to="getEventUrl(item.id)"><v-icon>mdi-launch</v-icon></v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
    </v-card-text>
   </v-card>
  </v-container>
</template>
<script>
export default {
  type: 'Events',
    mounted() {
       this.$store.dispatch('controller/GetEvents', {page:this.page, limit:50})
    },
    methods: {
      getEventUrl: function(id) {
         return "/event/" + id
      }
    },
    watch: {
       Events: function() {
          /* eslint-disable */
          if (!this.Events) {
             return
          }
          for (var i = 0; i < this.Events.length; i++) {
             var e = this.Events[i]
             this.events.push({
                id: e.id,
                time: e.createdAt.seconds,
                type: e.type,
                source: e.source,
                sensor: e.sensor,
                duration: e.duration,
             })
          }
       },
       page: function() {
          this.$store.dispatch("controller/GetEvents", {page:this.page, limit:50})
          window.scrollTo(0,0);
       },
       $route(to, from) {
          /* eslint-disable */
         console.log(to)
          if (to == from) {
             return
          }
          if (to == "/events") {
             this.$store.dispatch('controller/GetEvents', {page:this.page, limit:50})
          }
       }
    },
  computed: {
   Events: function () {
     var r = this.$store.state.controller.GetEventsResp
     if (r && r.eventList) {
        return r.eventList
     }
     return null
   }
  },
   data () {
    return {
        search: "",
        headers: [
          { text: 'Time', align: 'left', sortable: true, value: 'time', },
          { text: 'Type', align: 'left', sortable: false, value: 'type', },
          { text: 'Source', value: 'source'},
          { text: 'Sensor', value: 'sensor'},
          { text: 'Duration (s)', value: 'duration' },
          { text: 'View Details', value: 'id' },
        ],
        events: [],
   }
  }
}

</script>

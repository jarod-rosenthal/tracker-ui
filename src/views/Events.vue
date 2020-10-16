<template>
    <v-container fluid>
        <v-card flat>
            <v-card-title>
                Events
            </v-card-title>
            <v-card-text>
                <v-divider></v-divider>
                <v-row>
                  <v-subheader>
                      Event Log
                  </v-subheader>
                </v-row>
    
                <v-card>
                    <v-card-title>
                        Events
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-text-field outlined v-model="search" append-icon="mdi-search" label="Search" single-line hide-details></v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="events" :search="search">
                        <template v-slot:item.id="{ item }">
                        <v-btn icon :to="getEventUrl(item.id)"><v-icon>mdi-launch</v-icon></v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-card-text>
          </v-card>
    </v-container>
</template>

<script>
export default {
    type: 'Events',
    mounted() {
        this.$store.dispatch('controller/GetEvents', { page: this.page, limit: 10000 })
    },
    methods: {
        getEventUrl: function(id) {
            return "/event/" + id
        }
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
                    source: e.source.name,
                    //type: e.type,
                    duration: (e.duration / 1000).toFixed(2),
                })
            }
        },
        page: function() {
            this.$store.dispatch("controller/GetEvents", { page: this.page, limit: 50 })
            window.scrollTo(0, 0);
        },
        $route(to, from) {
            
            console.log(to)
            if (to == from) {
                return
            }
            if (to == "/events") {
                this.$store.dispatch('controller/GetEvents', { page: this.page, limit: 50 })
            }
        }
    },
    computed: {
        Events: function() {
            var r = this.$store.state.controller.GetEventsResp
            if (r && r.eventList) {
                return r.eventList
            }
            return null
        }
    },
    data() {
        return {
            search: "",
            headers: [
                { text: 'Time', align: 'left', sortable: true, value: 'time', },
                //{ text: 'Type', align: 'left', sortable: false, value: 'type', },
                { text: 'Source', value: 'source' },
                // { text: 'Sensor', value: 'sensor' },
                { text: 'Duration (s)', value: 'duration' },
                { text: 'View Details', value: 'id' },
            ],
            events: [],
        }
    }
}
</script>

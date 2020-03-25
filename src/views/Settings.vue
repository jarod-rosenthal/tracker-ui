<template>
  <v-container fluid>
   <v-card flat>
    <v-card-title>
     Settings
    </v-card-title>
    <v-card-text>
     <v-divider></v-divider>
     <v-subheader>
      General
     </v-subheader>
     <v-col cols="3">
      <v-text-field outlined v-model="config.nodename" label="Node Name"></v-text-field>
      <v-text-field outlined v-model="config.hostname"  label="Hostname"></v-text-field>
      <v-btn class="primary">Change Password</v-btn>
     </v-col>
     <v-divider class="ma-5"></v-divider>
     <v-subheader>
      Cameras 
     </v-subheader>
     <v-row wrap>
      <v-col cols="3" v-for="c in config.camera" :key="c.name">
     <v-hover  v-slot:default="{ hover }">
     <v-card width="256" height="256" :elevation="hover ? 16 : 2">
      <v-card-title class="justify-center">{{c.name}}</v-card-title>
      <v-card-text class="text-center">
       <v-img height="125" contain src="../assets/ptz.png"></v-img>
      </v-card-text>
      <v-card-actions>
       <v-spacer></v-spacer>
       <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
       <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
      </v-card-actions>
     </v-card>
     </v-hover>
     </v-col>
    </v-row>
    <v-btn class="primary">Add Camera</v-btn>
     <v-divider class="ma-5"></v-divider>
     <v-subheader>
      Storage
     </v-subheader>
     <v-row wrap>
      <v-col cols="3" v-for="c in config.storage" :key="c.name">
     <v-hover  v-slot:default="{ hover }">
     <v-card width="256" height="256" :elevation="hover ? 16 : 2">
      <v-card-title class="justify-center">{{c.name}}</v-card-title>
      <v-card-text class="text-center">
       <v-img height="125" contain src="../assets/storage.png"></v-img>
      </v-card-text>
      <v-card-actions>
       <v-spacer></v-spacer>
       <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
       <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
      </v-card-actions>
     </v-card>
     </v-hover>
     </v-col>
    </v-row>
    <v-btn class="primary">Add Storage</v-btn>
    </v-card-text>
   </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'Settings',
   data () {
    return {
      config: {
        password: "",
        password_again: "",
        hostname: "",
        nodename: "",
        camera: [],
        storage: [],
     }
   }
  },
  mounted() {
    this.$store.dispatch('ui/GetConfig')
  },
  watch: {
    ConfigResp(oldObj, o) {
      /* eslint-disable */
      console.log(o)
      this.config.nodename = o.config.nodename
      this.config.hostname = o.config.hostname
      this.config.uuid = o.config.uuid
      this.config.camera = o.config.cameraList
      this.config.storage = o.config.storageList
    }
  },
  computed: {
   ConfigResp: function () {
     var config = this.$store.state.ui.GetConfigResp
     return config
   }
  }
}

</script>

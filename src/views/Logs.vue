<template>
    <v-container fluid v-cloak>
      <v-card-title>
          Tracker Logs
      </v-card-title>
      <v-divider></v-divider>    
  <v-row
    align="center"
    
  >
    <v-col cols="6" md="6">
        <v-select
          v-model="select"
          :hint="`${select.name}, ${select.id}`"
          :items="ContainerList"
          item-text="name"
          item-value="id"
          label="Select"
          persistent-hint
          return-object
          single-line
          :dense="true"
        ></v-select>
        
    </v-col>
    <v-col cols="3" md="2"><v-btn color="primary" v-on:click="loadSelectedLog">Refresh</v-btn></v-col>
    <v-col cols="3" md="2"><v-btn color="primary" v-on:click="copyText">Copy</v-btn></v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <div id="logs" class="logs"></div>
      <v-overlay :absolute="absolute" :value="loadinglog">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-overlay>    
    </v-col>
  </v-row>
    
   </v-container>
</template>
<style>
    .logs {
        width: 100%;
        height: 100%;
        max-height:500px;
        min-height: 400px;
        color:#FFF;
        background-color: #000;
        border-radius: 5px;
        overflow: auto;
        padding-top: 10px;
        padding-left: 20px;
        white-space: nowrap;
    }
    .copytextinput {
      white-space: pre;
      height:1px;
      width:1px;
      position:absolute;
      x:9000px;
      y:9000px;
    }
</style>

<script>
export default {
    name: 'Logs',
    data: () => ({
        select: {},
        items: [
        ],
        logLines: [],
        log: "",
        copysucess: false,
        copyerror: false,
        loadinglog: true,
        absolute: false
    }),
    created() {
      
    },
    mounted () {
      this.initialLoad();
    },
    methods:{
      initialLoad() {
        var self = this;
        //console.log("GetContainerList");
        self.$store.dispatch('controller/GetContainerList', {});
      },
      loadSelectedLog() {
        var self = this;
        if(this.ContainerList.length > 0 && !self.$data.select) { return; }
        this.$data.loadinglog = true;
        self.$store.dispatch('controller/GetContainerLog', {containerid: self.$data.select.id}).then(function() {
          if(self.$store.state.controller.GetContainerLogResp && self.$store.state.controller.GetContainerLogResp.log !== undefined) {
            var logDiv = document.querySelector("#logs");
            logDiv.innerHTML = self.$store.state.controller.GetContainerLogResp.log.replace(/\n/g, '<br>');
            logDiv.scrollTop = logDiv.scrollHeight;
            self.$data.loadinglog = false;
          } else {
            document.querySelector("#logs").innerHTML = "Loading Logs...";  
            self.$data.loadinglog = false;
          }
        })
      },
      copyText() {
        // var self = this;
        // const el = document.createElement('textarea');
        // if(self.$store.state.controller.GetContainerLogResp === undefined || self.$store.state.controller.GetContainerLogResp.log === undefined) {
        //   return;
        // }
        // el.value = self.$store.state.controller.GetContainerLogResp.log;
        // el.setAttribute('readonly', '');
        // el.style.position = 'absolute';
        // el.style.left = '0px';
        // document.body.appendChild(el);
        var logDiv = document.querySelector("#logs");
        window.getSelection().selectAllChildren(logDiv);        
        //logDiv.select();
        var successful = document.execCommand('copy');
        if(successful) {
          self.$store.dispatch('controller/ShowMessage', {message: "Copy to clipboard suceeded"});
          this.$data.copysucess = true;
        } else {
          self.$store.dispatch('controller/ShowMessage', {message: "Copy to clipboard failed"});
          this.$data.copyerror = true;
        }
        document.body.select();
        // document.body.removeChild(el);
      }  
    },
    watch: {
      select() {
        this.loadSelectedLog();
      },
      ContainerList() {
        var self = this;
        if(!self.$store.state.controller.GetContainerListResp || !self.$store.state.controller.GetContainerListResp.containersList) {
          return;
        }
        self.$data.select = self.$store.state.controller.GetContainerListResp.containersList[0]; 
      }
    },
    computed: {
      ContainerList: function() {
        if(this.$store.state.controller.GetContainerListResp) {
          return this.$store.state.controller.GetContainerListResp.containersList;
        } else {
          return [];
        }       
      }
    },
    components: {},
}
</script>

<template>
    <v-container fluid v-cloak>
      <v-card-title>
          Tracker Logs
      </v-card-title>
      <v-divider></v-divider>    
  <v-row
    align="center"
    
  >
    <v-col cols="4">
        <v-select
          v-model="select"
          :hint="`${select.name}, ${select.id}`"
          :items="items"
          item-text="name"
          item-value="id"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
        
    </v-col>
    <v-col cols="1"><v-btn color="primary" v-on:click="loadSelectedLog">Refresh</v-btn></v-col>
    <v-col cols="1"><v-btn color="primary" v-on:click="copyText">Copy</v-btn></v-col>
    <v-col cols="3">     
      <v-alert type="success" :value="copysucess">
        Successful coppied to clipboard.
      </v-alert>  
      <v-alert type="error" :value="copyerror">
        Unable to copy to clipboard.
      </v-alert>  
</v-col>
  </v-row>
  <v-row>
    <v-col cols="10">
        <div class="logs">
          <div v-for="(line, index) in logLines" :key="line"><span class="linenumber">{{index}}:</span><span>{{line}}</span></div>
        </div>
    </v-col>
    <v-col cols="2"></v-col>
  </v-row>
    
   </v-container>
</template>
<style>
    .logs {
        width: 100%;
        height: 100%;
        min-height: 400px;
        color:#FFF;
        background-color: #000;
        border-radius: 5px;
        overflow: auto;
        padding-top: 10px;
        padding-left: 10px;
    }
    .linenumber {
      padding-right: 10px;
      font-weight: bold;
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
        copyerror: false
    }),
    created() {
      
    },
    mounted () {
      this.initialLoad();
    },
    methods:{
      async initialLoad() {
        var self = this;
        //console.log("GetContainerList");
        await self.$store.dispatch('controller/GetContainerList', {});
        if(self.$store.state.controller.GetContainerListResp && self.$store.state.controller.GetContainerListResp.containersList) {
          var containerList = self.$store.state.controller.GetContainerListResp.containersList;
          for(var key in containerList) {
            var container = containerList[key];
            self.$data.items.push({ name: container.name , id: container.id});
          }
          if(self.$data.items.length > 0) self.$data.select = self.$data.items[0]; 
        }
      },
      async loadSelectedLog() {
        var self = this;
        await self.$store.dispatch('controller/GetContainerLog', {containerid: self.$data.select.id});
        if(self.$store.state.controller.GetContainerLogResp && self.$store.state.controller.GetContainerLogResp.log) {
          self.$data.log = self.$store.state.controller.GetContainerLogResp.log;
          var loglines = self.$store.state.controller.GetContainerLogResp.log.split('\n');
          self.$data.logLines = loglines;
        }
      },
      copyText() {
        const el = document.createElement('textarea');
        el.value = this.$data.log;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
            var successful = document.execCommand('copy');
            if(successful) {
              this.$data.copysucess = true;
            } else {
              this.$data.copyerror = true;
            }
            
            setTimeout(()=>{
              this.copysucess=false
              this.copyerror=false
            },5000)
        document.body.removeChild(el);
      }  
    },
    watch: {
      async select() {
        this.loadSelectedLog();
      }
    },
    components: {},
}
</script>

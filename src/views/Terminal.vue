<template>
    <v-container fluid>
      <v-card-title>
          Tracker Terminal
      </v-card-title>
      <v-divider></v-divider>    
  <v-row align="center">
    <v-col>
      <iframe frameborder="0" scrolling="no" height="500px" width="100%" id="term" src="" />
    </v-col>
  </v-row>
    
   </v-container>
</template>
<style>
</style>

<script>
export default {
    name: 'Terminal',
    data: () => ({
    }),
    created() { },
    mounted () {
      var term = document.querySelector("#term");
      term.src= location.protocol + "//" + location.hostname + ":4000/";
    }
}
</script>

<template>
  <div id="app" style="position: relative">
    <Map />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Map from "./components/mainPage/map/map.component.vue";

@Component({
  components: {
    Map
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

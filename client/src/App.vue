<template>
  <div id="app" style="position: relative">
    <appbar-component />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import appbarComponent from "./components/AppBar/appbar.component.vue";

@Component({
  components: { appbarComponent },
})
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

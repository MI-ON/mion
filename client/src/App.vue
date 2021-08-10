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
@import url('./style.scss');
</style>

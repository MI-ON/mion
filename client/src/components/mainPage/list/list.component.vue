<template>
  <div id="menu_wrap">
    <button id="zoom-in" @click="zoomIn"><img src="/img/upsize.png" alt="zoom in" /></button>
    <div id="pagination"></div>
    <div id="lists">
      <ul id="placesList"></ul>
    </div>
  </div>
</template>

<script lang="ts" src="./list.component.ts"></script>
<style lang="scss" src="./list.component.scss"></style>

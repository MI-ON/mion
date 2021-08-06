<template>
  <div class="app-bar">
    <img
      class="app-logo"
      src="../../assets/mion_logo.png"
      width="50"
      height="50"
    />
    <button class="logout-btn" type="button" v-on:click="this.onSignOut">
      Logout
    </button>
  </div>
</template>

<script lang="ts" src="./appbar.component.ts"></script>
<style lang="scss" src="./appbar.component.scss"></style>

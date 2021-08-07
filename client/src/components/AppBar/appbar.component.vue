<template>
  <div class="app-bar">
    <img
      class="app-logo"
      src="../../assets/mion_logo.png"
      width="50"
      height="50"
    />
    <img
      v-if="this.$store.getters.getUserImageUrl"
      class="user-profile-image"
      :src="this.$store.getters.getUserImageUrl"
      width="50"
      height="50"
      v-on:click="this.onSignOut"
    />
  </div>
</template>

<script lang="ts" src="./appbar.component.ts"></script>
<style lang="scss" src="./appbar.component.scss"></style>

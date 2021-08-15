<template>
  <div class="app-bar">
    <img
      class="app-logo"
      src="../../assets/AppBar/mion_logo.png"
      width="55"
      height="55"
      v-on:click="this.onClickRedirect"
    />
    <span class="app-logo-text" v-on:click="this.onClickRedirect">MI:ON</span>
    <v-avater>
      <img
        class="user-profile-image"
        v-if="this.$store.state.userToken"
        :src="$store.getters.getUserImageUrl"
        width="52"
        height="52"
        v-on:click="this.onSignOut"/>
    </v-avater>
  </div>
</template>

<script lang="ts" src="./appbar.component.ts"></script>
<style lang="scss" src="./appbar.component.scss"></style>

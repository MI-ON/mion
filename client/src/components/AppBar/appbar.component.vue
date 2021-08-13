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
    <div>
    <v-avater>
      <!-- 임시로 이미지 지정 -->
      <!-- v-if="this.$store.state.userToken" -->
      <!-- :src="this.$store.getters.getUserImageUrl" -->
        <img
      class="user-profile-image"
      src="../../assets/AppBar/default-profile.png"
      width="52"
      height="52"
      v-on:click="this.onSignOut"
    />
    </v-avater>
    </div>
  </div>
</template>

<script lang="ts" src="./appbar.component.ts"></script>
<style lang="scss" src="./appbar.component.scss"></style>

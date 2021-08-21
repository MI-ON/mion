<template>
<v-card>
    <v-app-bar class="mx-auto overflow-hidden">
      <img
      class="app-logo"
      src="../../assets/AppBar/mion_logo.png"
      width="55"
      height="55"
      v-on:click="this.onClickRouteRoot"/>
      <v-toolbar-title class="app-logo-text" v-on:click="this.onClickRouteRoot">MI:ON</v-toolbar-title>
      <v-avater class="profile">
      <img
        class="user-profile-image"
        v-if="this.$store.state.userToken"
        :src="$store.getters.getUserImageUrl"
        width="52"
        height="52"/>
        <div class="menu">
         <p v-on:click="this.onSignOut">로그아웃</p>
         <p v-on:click="this.onMemberPage">프로필 수정</p>
        </div>
    </v-avater>
    </v-app-bar>
     </v-card>
</template>

<script lang="ts" src="./appbar.component.ts"></script>
<style lang="scss" src="./appbar.component.scss"></style>

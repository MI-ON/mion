<template>
  <div class="app-bar">
    <img class="app-logo" src="/img/AppBar/mion_logo.png" width="55" height="55" @click="onClickRedirect" />
    <span class="app-logo-text" @click="onClickRedirect">MI:ON</span>
    <button>
      <img
        v-if="$store.state.userToken"
        class="user-profile-image"
        :src="$store.getters.getUserImageUrl"
        width="50"
        height="50"
      />
      <img
        v-show="!$store.state.userToken"
        class="user-profile-image"
        :src="defaultProfile"
        width="50"
        height="50"
        @click="onSignOn"
      />
      <div class="menu">
        <p @click="onSignOut">로그아웃</p>
        <p @click="onMemberPage">프로필 수정</p>
      </div>
    </button>
  </div>
</template>

<script lang="ts" src="./appbar.component.ts"></script>
<style lang="scss" src="./appbar.component.scss"></style>

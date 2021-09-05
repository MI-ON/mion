<template>
  <div id="member">
    <div class="member-wrapper">
      <span class="profile-text">프로필 변경</span><br>
      <img v-if="$store.state.userToken" class="member-profile" :src="$store.getters.getUserImageUrl" /><br />

      <form>
        <span class="fullname-text">이름</span>
        <input
          v-if="$store.state.userToken"
          v-model="inputName"
          type="text"
          class="fullname-input-box"
          :placeholder="fullName"
        /><br />
        <button class="change-fullname-btn" type="submit" @click="addFullName">
          <span class="change">변경</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="./member.component.ts"></script>
<style lang="scss" src="./member.component.scss"></style>

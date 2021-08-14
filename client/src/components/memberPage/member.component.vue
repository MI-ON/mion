<template>
    <div id="member">
        <div class="wrapper">
            <span class="profile-text">프로필 변경</span><br />
            <img
                src="../../assets/AppBar/default-profile.png"
                width="25%"
                height="25%"
            /><br />
            <span class="name">이름</span>
            <input
                type="text"
                class="input-box"
                v-on:keyup.enter="changeNickname"
            /><br />
            <button class="change-nickname" @click="changeNickname">
                변경
            </button>
        </div>
    </div>
</template>

<script lang="ts" src="./member.component.ts"></script>
<style lang="scss" src="./member.component.scss"></style>

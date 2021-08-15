<template>
    <div id="member">
        <div class="wrapper">
            <span class="profile-text">프로필 변경</span><br />
            <img
                src="../../assets/AppBar/default-profile.png"
                width="25%"
                height="25%"
            /><br />

            <form v-on:submit="addFullName">
                <span class="name">이름</span>
                <input
                    type="text"
                    class="input-box"
                    v-model="name"
                    :placeholder="$store.getters.getFullName"
                /><br />
                <button class="change-nickname">
                    변경
                </button>
            </form>
        </div>
    </div>
</template>

<script lang="ts" src="./member.component.ts"></script>
<style lang="scss" src="./member.component.scss"></style>

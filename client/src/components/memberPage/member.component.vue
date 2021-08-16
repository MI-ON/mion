<template>
    <div id="member">
        <div class="wrapper">
            <span class="profile-text">프로필 변경</span><br />
            <img
                class="member-profile"
                v-if="this.$store.state.userToken"
                :src="$store.getters.getUserImageUrl"
            /><br />

            <form v-on:submit.prevent>
                <span class="name">이름</span>
                <input
                    v-if="this.$store.state.userToken"
                    type="text"
                    class="input-box"
                    v-model="inputName"
                    :placeholder="fullName"
                /><br />
                <button class="change-full-name-btn" @click="addFullName">
                    변경
                </button>
            </form>
        </div>
    </div>
</template>

<script lang="ts" src="./member.component.ts"></script>
<style lang="scss" src="./member.component.scss"></style>

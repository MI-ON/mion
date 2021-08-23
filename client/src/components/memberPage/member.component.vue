<template>
    <div id="member">
        <div class="member-wrapper">
            <span class="profile-text">프로필 변경</span><br />
            <img
                class="member-profile"
                v-if="this.$store.state.userToken"
                :src="$store.getters.getUserImageUrl"
            /><br />

            <form>
                <span class="fullname-text">이름</span>
                <input
                    v-if="this.$store.state.userToken"
                    type="text"
                    class="fullname-input-box"
                    v-model="inputName"
                    :placeholder="fullName"
                /><br />
                <button
                    class="change-fullname-btn"
                    type="submit"
                    @click="addFullName"
                >
                    변경
                </button>
            </form>
        </div>
    </div>
</template>

<script lang="ts" src="./member.component.ts"></script>
<style lang="scss" src="./member.component.scss"></style>

<template>
    <div class="app-bar">
        <img
            class="app-logo"
            src="../../assets/AppBar/mion_logo.png"
            width="55"
            height="55"
            v-on:click="this.onClickRedirect"
        />
        <span class="app-logo-text" v-on:click="this.onClickRedirect"
            >MI:ON</span
        >
        <v-avater class="profile">
            <img
                class="user-profile-image"
                v-if="this.$store.state.userToken"
                :src="$store.getters.getUserImageUrl"
                width="50"
                height="50"
            />
            <img
                v-show="!this.$store.state.userToken"
                class="user-profile-image"
                :src="defaultProfile"
                width="50"
                height="50"
                v-on:click="this.onSignOn"
            />
             <div class="menu">
            <p v-on:click="this.onSignOut">로그아웃</p>
            <p v-on:click="this.onMemberPage">프로필 수정</p>
            </div>
        </v-avater>
    </div>
</template>

// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
// export default {
//     jQuery('.profile').click(function(){
//    jQuery(this).toggleClass('active');
// })
// }
// </script>
<script lang="ts" src="./appbar.component.ts"></script>
<style lang="scss" src="./appbar.component.scss"></style>

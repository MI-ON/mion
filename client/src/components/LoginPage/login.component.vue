<template>
  <div class="container">
    <v-wrap>
    <v-row>
      <v-col>
        <v-card class="container col1">
          <img src="../../assets/ImageContainer.png" alt="login_image">
        </v-card>
      </v-col>
      <v-col>
        <v-card class="container col2">
          <v-text class="title">LOGIN</v-text><br>
          <v-text class="content">Nice to meet you.</v-text><br>
          <v-text class="content">Please join us through Google</v-text><br>
          <div class="loginBtn" id="btn"></div>
        </v-card>
      </v-col>
     </v-row>
     </v-wrap>
  </div>
</template>

<script lang="ts" src="./login.component.ts"></script>
<style lang="scss" src="./login.component.scss"></style>

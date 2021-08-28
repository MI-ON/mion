<template>
  <div id="landingPageComponent">
    <div id="landingPageLeftComponent">
      <div id="landingPageTitleTextComponent">
        For Onda's happy lunch.
      </div>
      <div id="landingPageBodyTextComponent">
        <p>We wish everyone a heppy lunch.</p>
        <p>Let us labor for a better future.</p>
        <p>It's beautiful to see you trying every little thing</p>
        <p>for a happy organization.</p>
      </div>
      <div id="landingPageButtonComponent">
        <button type="button" v-on:click="onClickStartedBtn">
          Getting Started
        </button>
        <button type="button" v-on:click="onClickAboutBtn">
          About MION
        </button>
      </div>
    </div>
    <div id="landingPageRightComponent">
      <img src="../../assets/LandingPage/landing.gif" />
    </div>
  </div>
</template>

<script lang="ts" src="./landing.component.ts"></script>
<style lang="scss" src="./landing.component.scss"></style>

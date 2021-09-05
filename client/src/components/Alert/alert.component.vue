<template>
  <div v-if="alertToggle" id="alertComponentContainer">
    <div id="alertComponentInfo">
      <div>
        <img src="/img/Alert/info.png" />
      </div>
      <div>
        {{ alertMessage }}
      </div>
      <div>
        <button @click="onClickCancel">
          <img src="/img/Alert/cancel.png" />
        </button>
      </div>
    </div>
    <div id="alertComponentProgress">
      <progress :value="progressValue" max="100"></progress>
    </div>
  </div>
</template>

<script lang="ts" src="./alert.component.ts"></script>
<style lang="scss" src="./alert.component.scss"></style>

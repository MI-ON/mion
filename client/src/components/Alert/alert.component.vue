<template>
  <div v-if="alertToggle" id="alertComponentContainer">
    <div id="alertComponentInfo">
      <div>
        <img src="../../assets/Alert/info.png" />
      </div>
      <div>
        검색 결과가 없습니다.
        {{ alertMessage }}
      </div>
      <div>
        <button @click="onClickCancel">
          <img src="../../assets/Alert/cancel.png" />
        </button>
      </div>
    </div>
    <div id="alertComponentProgress">
      <progress v-bind:value="progressValue" max="100"></progress>
    </div>
  </div>
</template>

<script lang="ts" src="./alert.component.ts"></script>
<style lang="scss" src="./alert.component.scss"></style>

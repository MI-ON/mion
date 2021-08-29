<template>
  <div>
    <div id="vote-place-list">
      <VotedPlaceItemComponent
        v-for="(item, index) in votedPlaceData"
        v-bind:key="index"
        v-bind:votedPlaceData="item"
      />
    </div>

    <div id="pagination"></div>
  </div>
</template>

<script lang="ts" src="./vote.component.ts"></script>

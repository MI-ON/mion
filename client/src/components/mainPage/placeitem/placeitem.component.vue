<template>
  <v-layout id="placeItemContainer">
    <v-flex id="markerImageContainer">
      <img src="../../../assets/mainPage/default-marker.png" />
    </v-flex>

    <v-flex id="placeInfoContainer" colum>
      <div>{{ searchResult.place_name }}</div>
      <div>{{ searchResult.address_name }}</div>
      <div>(지번) {{ searchResult.road_address_name }}</div>
      <div>
        <span>{{ searchResult.phone }}</span>
        <a v-bind:href="searchResult.place_url">상세정보</a>
      </div>
    </v-flex>

    <v-flex id="voteButtonContainer" colum>
      <button type="button" v-on:click="this.onClickVoteBtn">
        <img src="../../../assets/vote-icon.png" />
      </button>
    </v-flex>
  </v-layout>
</template>

<script lang="ts" src="./placeitem.component.ts"></script>
<style lang="scss" src="./placeitem.component.scss"></style>

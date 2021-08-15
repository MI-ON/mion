<template>
  <v-container>
    <v-layout id="placeItemContainer">
      <v-flex id="markerImageContainer">
        <img src="../../../assets/mainPage/default-marker.png" />
      </v-flex>

      <v-flex id="placeInfoContainer" colum>
        <div>{{ searchResult.place_name }}</div>
        <div>{{ searchResult.address_name }}</div>
        <div>(지번) {{ searchResult.road_address_name }}</div>
        <span>{{ searchResult.phone }}</span>
        <a v-bind:href="searchResult.place_url">상세정보</a>
      </v-flex>

      <v-flex id="voteButtonContainer" colum>
        <v-btn><img src="../../../assets/vote-icon.png"/></v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class PlaceItemComponent extends Vue {
  @Prop(Object) protected searchResult!: Object;
  @Watch("searchResult")
  updateMessage() {
    console.log("placeitem에서 변경 감지");
    console.log(this.searchResult);
  }
}
</script>
<style lang="scss" src="./placeitem.component.scss"></style>

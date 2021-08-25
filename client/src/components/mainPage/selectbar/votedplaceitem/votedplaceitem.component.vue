<template>
  <v-container>
    <v-layout id="voted-place-item-container">
      <v-flex id="marker-image-container">
        <img src="../../../../assets/mainPage/click-marker.png" />
      </v-flex>

      <v-flex id="voted-place-info-container" colum>
        <div>{{ votedPlaceData.place_name }}</div>
        <div>{{ votedPlaceData.address_name }}</div>
        <div>{{ votedPlaceData.road_address_name }}</div>
        <span>{{ votedPlaceData.phone }}</span>
        <a v-bind:href="votedPlaceData.place_url">상세정보 |</a>
        <a>리뷰보기</a>

        <div id="voted-image-container">
          <!-- google Img로 수정 -->
          <img src="../../../../assets/AppBar/default-profile.png" />
          <img src="../../../../assets/AppBar/default-profile.png" />
          <img src="../../../../assets/AppBar/default-profile.png" />
          <img src="../../../../assets/AppBar/default-profile.png" />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts" src="./votedplaceitem.component.ts"></script>
<style lang="scss" src="./votedplaceitem.component.scss"></style>

<template>
  <div>
    <div id="voted-place-item-container">
      <div id="marker-image-container">
        <img src="../../../../assets/mainPage/click-marker.png" />
      </div>

      <div id="voted-place-info-container" colum>
        <div>{{ votedPlaceData.place_name }}</div>
        <div>{{ votedPlaceData.address_name }}</div>
        <div>{{ votedPlaceData.road_address_name }}</div>
        <span>{{ votedPlaceData.phone }}</span>
        <a v-bind:href="votedPlaceData.place_url">상세정보 |</a>
        <a>리뷰보기</a>

        <div id="voted-image-container">
          <img
            :key="i"
            v-for="(user, i) in userImageList.slice(0, 3)"
            :src="user.image_url"
          />
          <span v-if="userImageList.length >= 4"
            >+{{ userImageList.length - 3 }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./votedplaceitem.component.ts"></script>
<style lang="scss" src="./votedplaceitem.component.scss"></style>

<template>
  <div>
    <div id="voted-place-item-container">
      <div id="marker-image-container">
        <img src="/img/mainPage/click-marker.png" />
      </div>

      <div id="voted-place-info-container" colum>
        <div>{{ votedPlaceData.placeName }}</div>
        <div>{{ votedPlaceData.addressName }}</div>
        <div>{{ votedPlaceData.roadAddressName }}</div>
        <span>{{ votedPlaceData.phone }}</span>
        <a :href="votedPlaceData.placeUrl">상세정보 |</a>
        <a>리뷰보기</a>

        <div id="voted-image-container">
          <img v-for="(user, i) in userAvatarUrl.slice(0, 3)" :key="i" :src="user.avatarUrl" />
          <span v-if="userAvatarUrl.length >= 4">+{{ userAvatarUrl.length - 3 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./votedplaceitem.component.ts"></script>
<style lang="scss" src="./votedplaceitem.component.scss"></style>

<template>
  <div class="map_wrap">
    <div id="map"></div>

    <div id="menu_wrap" class="bg_white" v-if="isMenu">
      <div id="select-bar">
        <button id="search-btn" class="style1-btn on" @click="clickSelectbar">
          주변 음식점 검색
        </button>
        <button id="review-btn" class="style1-btn" @click="clickSelectbar">
          리뷰 보기
        </button>
        <button id="vote-btn" class="style1-btn" @click="clickSelectbar">
          투표
        </button>
      </div>
      <!-- 3개 컴포넌트-->

      <ReviewListComponent v-if="isReview"/>
      <SearchPlaceComponent
        v-if="isSearchPlace"
        v-bind:searchResult="searchResultData"
        v-on:searchplace-keyword="eventFromSearchplace"
      />
      <VoteComponent v-if="isVote" />

    </div>
    <button v-if="isMenu" id="side-menu-close" @click="sideMenuState">
      <div class="react"></div>
      <div class="tri-close"></div>
    </button>
    <button v-else id="side-menu-open" @click="sideMenuState">
      <div class="react"></div>
      <div class="tri-open"></div>
    </button>
  </div>
</template>

<script lang="ts" src="./map.component.ts"></script>
<style lang="scss" src="./map.component.scss"></style>
<style lang="scss" src="../infowindow/info-window-content.scss"></style>

<template>
  <div class="map_wrap">
    <AlertComponent :alert-message="alertMessage" />
    <div class="map_wrap">
      <div v-if="isMenu" id="map" class="map-close"></div>
      <div v-else id="map" class="map-open"></div>

      <div v-if="isMenu" id="menu_wrap" class="bg_white">
        <div id="select-bar">
          <button id="search-btn" class="style1-btn on" @click="clickSelectbar">주변 음식점 검색</button>
          <button id="review-btn" class="style1-btn" @click="clickSelectbar">리뷰 보기</button>
          <button id="vote-btn" class="style1-btn" @click="clickSelectbar">투표</button>
        </div>
        <!-- 3개 컴포넌트-->
        <SearchPlaceComponent
          v-if="isSearchPlace"
          :search-result="searchResultData"
          @searchplace-keyword="eventFromSearchplace"
        />
        <ReviewListComponent v-else-if="isReview" @displayPlaces="displayPlaces" @showWriteReview="showWriteReview" />
        <VoteComponent v-else-if="isVote" />
        <WriteReviewComponent
          v-else-if="isWriteReview"
          :store_name="store_name"
          @isReview="showReview"
        ></WriteReviewComponent>
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
  </div>
</template>

<script lang="ts" src="./map.component.ts"></script>

<style lang="scss" src="./map.component.scss"></style>
<style lang="scss" src="../infowindow/info-window-content.scss"></style>

<template>
  <div class="map_wrap">
    <div id="map"></div>

    <div id="menu_wrap" class="bg_white" v-if="isMenu">
      <div id="select-bar">
        <button id="search-btn" class="style1-btn on" @click="clickSelectbar">주변 음식점 검색</button>
        <button id="review-btn" class="style1-btn" @click="clickSelectbar">리뷰 보기</button>
        <button id="vote-btn" class="style1-btn" @click="clickSelectbar">투표</button>
      </div>
      <!-- 3개 컴포넌트-->
      <div>
        <div id="searchBar">
          <div>
            <form @submit="searchPlaces">
              <input
                type="text"
                v-model="keyword"
                id="keyword"
                size="15"
                placeholder="음식점 키워드를 입력해주세요."
              />
              <button type="submit">
                <img src="../../../assets/mainPage/search-icon.png" />
              </button>
            </form>
          </div>
        </div>

        <div id="placesList">
          <PlaceItemComponent
            v-for="(item, index) in searchResultData"
            v-bind:key="index"
            v-bind:searchResult="item"
          />
        </div>
      </div>
     
      <div id="pagination"></div>
    </div>
    <button v-if="isMenu" id="side-menu-close" @click="sideMenuState"><div class="react"></div><div class="tri-close"></div></button>
    <button v-else id="side-menu-open" @click="sideMenuState"><div class="react"></div><div class="tri-open"></div></button>
  </div>
</template>

<script lang="ts" src="./map.component.ts"></script>
<style lang="scss" src="./map.component.scss"></style>
<style lang="scss" src="../infowindow/info-window-content.scss"></style>

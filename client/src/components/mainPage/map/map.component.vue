<template>
  <div class="map_wrap">
    <div id="map" class="map-close" v-if="isMenu"></div>
    <div id="map" class="map-open" v-else></div>

    <div id="side-menu-wrap" v-if="isMenu">
      <div id="select-bar">
        <button id="search-btn" class="style1-btn on" @click="clickSelectbar">주변 음식점 검색</button>
        <button id="review-btn" class="style1-btn" @click="clickSelectbar">리뷰 보기</button>
        <button id="vote-btn" class="style1-btn" @click="clickSelectbar">투표</button>
      </div>
      <div class="option"> 
          <div>
            <form>
                <input type="text" value="삼성동 맛집" id="keyword" size="15"> 
                <button @click.prevent="searchPlaces"><img id="img-btn" src="../../../assets/searchbtn.png"></button> 
            </form>
          </div>
      </div>
      <List v-if="isList"/>
    </div>
    <button v-if="isMenu" id="side-menu-close" @click="sideMenuState"><div class="react"></div><div class="tri-close"></div></button>
    <button v-else id="side-menu-open" @click="sideMenuState"><div class="react"></div><div class="tri-open"></div></button>
  </div>
</template>


<script lang="ts" src="./map.component.ts"></script>

<style lang="scss" src="./map.component.scss"></style>
<style lang="scss" src="../infowindow/info-window-content.scss"></style>

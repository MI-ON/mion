<template>
  <div class="map_wrap">
    <div id="map"></div>

    <div id="side-menu-wrap">
      <div id="select-bar">
        <button id="search-btn" class="style1-btn">주변 음식점 검색</button>
        <button id="review-btn" class="style1-btn">리뷰 보기</button>
        <button id="vote-btn" class="style1-btn">투표</button>
      </div>
      <div class="option"> 
          <div>
            <form>
                <input type="text" value="삼성동 맛집" id="keyword" size="15"> 
                <button @click.prevent="searchPlaces"><img id="img-btn" src="../../../assets/searchbtn.png"></button> 
            </form>
          </div>
      </div>
      <List/>
    </div>
    
  </div>
</template>


<script lang="ts" src="./map.component.ts"></script>

<style lang="scss" src="./map.component.scss"></style>
<style lang="scss" src="../infowindow/info-window-content.scss"></style>

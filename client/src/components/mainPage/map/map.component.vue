<template>
  <div class="map_wrap">
    <div id="map"></div>

    <div id="menu_wrap" class="bg_white">
      <div class="option">
        <div>
          <form>
              키워드 : <input type="text" value="삼성동 맛집" id="keyword" size="15"> 
              <button @click.self.prevent="searchPlaces">검색하기</button> 
          </form>
        </div>
      </div>
      <hr />
      <ul id="placesList"></ul>
      <div id="pagination"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./map.component.ts"></script>
<style lang="scss" src="./map.component.scss"></style>
<style lang="scss" src="../infowindow/info-window-content.scss"></style>

<template>
  <div class="map_wrap">
    <div id="map"></div>

    <div id="menu_wrap" class="bg_white">
      <div id="searchBar">
        <div>
          <form>
            <input type="text" value="삼성동 맛집" id="keyword" size="15" />
            <button @click.self.prevent="searchPlaces">
              <img src="../../../assets/mainPage/search-icon.png" />
            </button>
          </form>
        </div>
      </div>

      <ul id="placesList">
        <li v-for="item in searchResultData" v-bind:key="item.place_name">
          <PlaceItemComponent v-bind:searchResult="item" />
        </li>
      </ul>

      <div id="pagination"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./map.component.ts"></script>
<style lang="scss" src="./map.component.scss"></style>
<style lang="scss" src="../infowindow/info-window-content.scss"></style>

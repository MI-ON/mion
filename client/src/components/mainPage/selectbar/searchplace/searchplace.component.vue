<template>
  <div>
    <div id="searchBar">
      <div>
        <form @submit="searchPlaces">
          <input id="keyword" v-model="keyword" type="text" size="15" placeholder="음식점 키워드를 입력해주세요." />
          <button type="submit">
            <img src="/img/mainPage/search-icon.png" />
          </button>
        </form>
      </div>
    </div>

    <div id="listComponent">
      <div id="placesList">
        <PlaceItemComponent v-for="(item, index) in searchResult" :key="index" :search-result="item" />
      </div>

      <div id="pagination"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./searchplace.component.ts"></script>

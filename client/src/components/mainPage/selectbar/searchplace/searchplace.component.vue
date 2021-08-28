<template>
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
            <img src="../../../../assets/mainPage/search-icon.png" />
          </button>
        </form>
      </div>
    </div>

    <div id="listComponent">
      <div id="placesList">
        <PlaceItemComponent
          v-for="(item, index) in searchResult"
          v-bind:key="index"
          v-bind:searchResult="item"
        />
      </div>

      <div id="pagination"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./searchplace.component.ts"></script>

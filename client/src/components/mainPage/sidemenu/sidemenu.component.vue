<template>
      <div id="menu_wrap" class="bg_white">

        <div id="select-bar">
          <button id="search-btn" class="style1-btn">주변 음식점 검색</button>
          <button id="review-btn" class="style2-btn">리뷰 보기</button>
          <button id="vote-btn" class="style1-btn">투표</button>
        </div>
        <div class="option"> 
          <div>
            <form>
                <input type="text" value="삼성동 맛집" id="keyword" size="15"> 
                <button @click.self.prevent="searchPlaces"><img id="img-btn" src="../../../assets/searchbtn.png"></button> 
            </form>
          </div>
        </div>

        <ul id="placesList"></ul>
        <div id="pagination"></div>
    </div>
</template>

<script lang="ts" src="./sidemenu.component.ts"></script>
<style lang="scss" src="./sidemenu.component.scss"></style>
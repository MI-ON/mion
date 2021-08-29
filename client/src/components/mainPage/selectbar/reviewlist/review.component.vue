<template>
    <div>
        <div id="searchBar">
          <form>
              <input
                type="text"
                v-model="reviewKeyword"
                id="review-keyword"
                size="15"
                placeholder="리뷰 키워드를 입력해주세요."/>
              <button type="submit" @click.stop.prevent="rkewordClick">
                <img src="@/assets/mainPage/search-icon.png" />
              </button>
            </form>
        </div>
        <div class="explain" v-if="!isSearch">
          <img src="@/assets/mainPage/reviewList_background.jpg" alt="검색어를 입력해주세요">
        </div>
        <div id="review-lists" v-else>
            <div id="button-div">
              <button><img src="@/assets/upsize.png" alt="button"></button>
            </div>

            <div id="list-div">
              <div class="list" v-for="(list) in lists" v-bind:key="list.place_name" @click="clickReview($event,list.place_name)">
                <div class="list-center">
                  <span class="title">{{list.place_name}}</span>
                  <div class="sub">
                    <span class="address1">{{list.address_name}}</span>
                    <span class="address2">{{list.road_address_name}}</span>
                    <span class="tel">{{list.phone}}</span>
                    <hr>
                    <span class="review">리뷰 {{list.r_count}} | <p class="rating">{{list.rating}}</p></span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./review.component.ts"/>

<style lang="scss" src="./review.component.scss"></style>
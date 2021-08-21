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
        <div id="review-lists">
            <div id="button-div">
              <button><img src="@/assets/upsize.png" alt="button"></button>
            </div>

            <div id="list-div">
              <div class="list" v-for="(list) in lists" v-bind:key="list.id" @click="clickList">
                <div class="list-center">
                  <span class="title">{{list.title}}</span>
                  <div class="sub">
                    <span class="address1">{{list.address1}}</span>
                    <span class="address2">{{list.address2}}</span>
                    <span class="tel">{{list.tel}}</span>
                    <hr>
                    <span class="review">리뷰 {{list.r_count}} | ☆☆☆☆</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./review.component.ts"/>

<style lang="scss" src="./review.component.scss"></style>
<template>
<div class="review-lists" v-if="!isLoading">
 <div class="button-div">
  <button><img src="@/assets/upsize.png" alt="button"></button>
  </div>
  <div class="write_list">
    <div class="store_title">
      {{this.store.place_name}}
    </div>
    <div class="store_comment">
      <h2 class="sub_title">상세 정보</h2>
      <span>{{this.store.address_name}}</span>
      <span>{{this.store.road_address_name}}</span>
      <span>{{this.store.phone}}</span>
    </div>
   <div class="review_profile">
      <img v-for="(img) in showImg" v-bind:key="img"
          class="profile_img" :src="img"/>
        <div v-if="isMaxPosts" class="count_people">+{{this.countPost}}</div>
    </div>
    <div class="write_container">
    <div class="write_review">
          <b-form-rating v-model="value" :locale="locale" show-value precision="1" class="mb-2" size='lg'></b-form-rating>
          <spa class="textCount">{{this.currentText}}/{{this.maxText}}</spa>
        <textarea
                @keyup="checkMaxText"
                type="text"
                id="review-keyword"
                size="15"
                placeholder="후기를 작성해주세요.">
        </textarea>
        <button @click="writeReview"><img src="../../../../assets/wirtereview.png" alt="리뷰 작성 버튼"/></button>
    </div>
    <div class="store_rating">
        <span class="store_rating">전체  {{this.count}}  | </span>
        {{this.stars}}
        {{this.rating}}.0
    </div>
   
      <div class="review_view" v-for="(post) in posts" v-bind:key="post.id" >
          <img class="profile_img" :src= "post.image_url" />
          <span class="content">{{post.rating}}.0 {{post.star}} <br> {{post.content}}</span>
          <p>{{post.full_name}}&nbsp;&nbsp;{{post.email}}</p>
          <p class="date">{{post.created_at}}</p>
      </div> 
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: null
      }
    }
  }
</script>
<script lang="ts" src="./writereview.component.ts"></script>
<style lang="scss" src="./writereview.component.scss"></style>
<template>
  <div class="review-lists" style="margin-left:1.5vw;">
 <div class="button-div">
  <button><img src="@/assets/upsize.png" alt="button"></button>
  </div>
  <div class="write_list">
    <div class="store_title">
      {{this.title}}
    </div>
    <div class="store_comment">
      <h2 class="sub_title">상세 정보</h2>
      <span>{{this.address1}}</span>
      <span>{{this.address2}}</span>
      <span>{{this.tel}}</span>
    </div>
   <div class="review_profile">
     <!--임의로 프로필 이미지를 여러개 깔아둠-->
      <img
          class="profile_img"
          v-if="this.$store.state.userToken"
          :src="$store.getters.getUserImageUrl"/>
        <img
          class="profile_img"
          v-if="this.$store.state.userToken"
          :src="$store.getters.getUserImageUrl"/>
        <img
          class="profile_img"
          v-if="this.$store.state.userToken"
          :src="$store.getters.getUserImageUrl"/>
        <img
          class="profile_img"
          v-if="this.$store.state.userToken"
          :src="$store.getters.getUserImageUrl"/>
        <img
          class="profile_img"
          v-if="this.$store.state.userToken"
          :src="$store.getters.getUserImageUrl"/>
        <div class="count_people">+{{this.ate_people}}</div>
    </div>
    <div class="write_container">
    <div class="write_review">
      <div class="mb-2">
      <b-form-rating v-model="value" :locale="locale" show-value precision="1" class="mb-2" size='lg'></b-form-rating>
  </div>
        <textarea
                type="text"
                v-model="reviewKeyword"
                id="review-keyword"
                size="15"
                placeholder="후기를 작성해주세요."></textarea>
      <button><img src="../../../../assets/wirtereview.png" alt="리뷰 작성 버튼"/></button>
    </div>
    <div class="store_rating">
        <span class="store_rating">전체  {{this.review_cont}}  | </span>
    <v-rating
      v-model="rating"
      icon-label="custom icon label text {0} of {1}"></v-rating> {{this.rating_num}}
    </div>
    <div class="review_view">
      <img
          class="profile_img"
          style="margin-left: 1vw;"
          v-if="this.$store.state.userToken"
          :src="$store.getters.getUserImageUrl"/>
          <v-rating
              v-model="rating"
              icon-label="custom icon label text {0} of {1}"></v-rating> {{this.rating_num}}
          <span>{{this.review_commend}}</span>
          <p>{{this.name}}</p>
    </div>
    <div class="review_view">
      <img
          class="profile_img"
          style="margin-left: 1vw;"
          v-if="this.$store.state.userToken"
          :src="$store.getters.getUserImageUrl"/>
         <v-rating
              v-model="rating"
              icon-label="custom icon label text {0} of {1}"></v-rating> {{this.rating_num}}
          <span>{{this.review_commend}}</span>
          <p>{{this.name}}</p>
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

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
        <!-- <div class="count_people">+{{this.ate_people}}</div> -->
    </div>
    <div class="write_container">
    <div class="write_review">
      <!-- <v-rating
        v-model="rating"
        background-color="indigo lighten-3"
        color="indigo"
        large></v-rating> -->
        <textarea
                type="text"
                id="review-keyword"
                size="15"
                placeholder="후기를 작성해주세요."></textarea>
      <button><img src="../../../../assets/wirtereview.png" alt="리뷰 작성 버튼"/></button>
    </div>
    <div class="store_rating">
        <span class="store_rating">전체  {{this.count}}  | </span>
        {{this.stars}}
        {{this.rating}}
    </div>
 
    <div class="review_view" v-for="(post) in posts" v-bind:key="post.id" > 
      <img class="profile_img" style="margin-left: 1vw;" :src= "post.image_url" />
      <!-- <v-rating
          v-model="rating"
          icon-label="custom icon label text {0} of {1}">
      </v-rating>  -->
      {{post.rating}}
      <span>{{post.content}}</span>
      <p>{{post.email}}</p>
      <p>{{post.full_name}}</p>
      <p>{{post.created_at}}</p>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      rating: 4,
    }),
  }
</script>
<script lang="ts" src="./writereview.component.ts"></script>
<style lang="scss" src="./writereview.component.scss"></style>
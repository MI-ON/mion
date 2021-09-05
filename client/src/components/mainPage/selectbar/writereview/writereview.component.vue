<template>
  <div v-if="!isLoading" class="review-lists">
    <div class="button-div" @click="clickGotoList">
      <button><img src="/img/backList_btn.png" alt="button" /></button>
    </div>
    <div class="write_list">
      <div class="store_title">
        {{ store.place_name }}
      </div>
      <div class="store_comment">
        <h2 class="sub_title">상세 정보</h2>
        <span>{{ store.address_name }}</span>
        <span>{{ store.road_address_name }}</span>
        <span>{{ store.phone }}</span>
      </div>
      <div class="review_profile">
        <img v-for="img in showImg" :key="img" class="profile_img" :src="img" />
        <div v-if="isMaxPosts" class="count_people">+{{ countPost }}</div>
      </div>
      <div class="write_container">
        <div class="write_review">
          <b-form-rating
            v-model="value"
            :locale="locale"
            show-value
            precision="1"
            class="mb-2"
            size="lg"
          ></b-form-rating>
          <spa class="textCount">{{ currentText }}/{{ maxText }}</spa>
          <textarea id="review-keyword" type="text" size="15" placeholder="후기를 작성해주세요." @keyup="checkMaxText">
          </textarea>
          <button @click="writeReview"><img src="/img/wirtereview.png" alt="리뷰 작성 버튼" /></button>
        </div>
        <div class="store_rating">
          <span class="store_rating">전체 {{ count }} | </span>
          {{ stars }}
          {{ rating }}.0
        </div>
        <div class="review_view">
          <div v-for="post in posts" :key="post.id">
            <img class="profile_img" :src="post.avatarUrl" />
            <span class="content">{{ post.rating }}.0 {{ post.star }}<br />{{ post.content }}</span>
            <p>{{ post.full_name }}&nbsp;&nbsp;{{ post.email }}</p>
            <p class="date">{{ post.created_at }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./writereview.component.ts"></script>
<style lang="scss" src="./writereview.component.scss"></style>

<template>
    <div>
        <div id="searchBar">
          <form @submit="searchPlaces">
              <input
                type="text"
                v-model="keyword"
                id="review-keyword"
                size="15"
                placeholder="리뷰 키워드를 입력해주세요."/>
              <button type="submit">
                <img src="@/assets/mainPage/search-icon.png" />
              </button>
            </form>
        </div>
        <div id="review-lists">
            <div id="button-div">
              <button><img src="@/assets/upsize.png" alt=""></button>
            </div>

            <div id="list-div">

              <div class="list">
                <div class="list-center">
                  <span class="title">크라이치즈버거 삼성역점</span>
                  <div class="sub">
                    <span>서울 강남구 테헤란로 616</span>
                    <span>서울 강남구 대치동 996-17</span>
                    <span>02-566-6244</span>
                    <hr>
                    <span>리뷰 2 | ☆☆☆☆</span>
                  </div>
                </div>
              </div>

            </div>
            
        </div>
    </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" src="./review.component.scss"></style>
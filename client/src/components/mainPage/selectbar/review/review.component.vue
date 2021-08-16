<template>
    <div>
        <div id="searchBar">
          <form @submit="searchPlaces">
              <input
                type="text"
                v-model="keyword"
                id="keyword"
                size="15"
                placeholder="리뷰 키워드를 입력해주세요."/>
              <button type="submit">
                <img src="../../../assets/mainPage/search-icon.png" />
              </button>
            </form>
        </div>
        <div id="review-lists">
            <div class="list">
                a
            </div>
        </div>
    </div>
</template>

<script>
export default {
  
}
</script>

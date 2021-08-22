<template>
    <v-container>
        <v-layout id="votedplaceItemContainer">
            <v-flex id="markerImageContainer">
                <img src="../../../../assets/mainPage/click-marker.png" />
            </v-flex>

            <!-- 
                1. ui 작업 (완료) 
                2. 투표한 음식점 리스트 가져오기 
                3. 투표한 음식점 리스트에서 투표한 사람 프로필 보여주기 (구글 토큰 이미지 활용)
                4. 상세정보, 리뷰보기 링크 걸기
            -->
            <v-flex id="votedplaceInfoContainer" colum>
                <div>place name</div>
                <div>address name</div>
                <div>road address name</div>
                <span>phone</span>
                <a>상세정보 |</a>
                <a>리뷰보기</a>
                <div id="votedImageContainer">
                    <!-- google image -->
                    <img src="../../../../assets/AppBar/default-profile.png" />
                    <img src="../../../../assets/AppBar/default-profile.png" />
                    <img src="../../../../assets/AppBar/default-profile.png" />
                    <img src="../../../../assets/AppBar/default-profile.png" />
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts" src="./vote.component.ts"></script>
<style lang="scss" src="./vote.component.scss"></style>

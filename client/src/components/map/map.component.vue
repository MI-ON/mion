<template>
    <!-- view에 해당하는 html 코드를 작성하는 영역 -->
    <!-- <div id="map"></div> -->
    <div>
        <div class="listview">
            <label>키워드</label>
            <input v-model="search" @keyup.enter="changeSearch"/>
            <button
                        @click="changeSearch"
                        @keyup.enter="changeSearch"
            >
                검색
            </button>
        </div>
        <div id="map"></div>
    </div>
</template>

<script lang="ts" src="./map.component.ts"></script>
<style lang="scss" src="./map.component.scss"></style>

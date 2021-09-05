<template>
  <div id="about-page-component">
    <div id="about-text">
      <img class="h-logo" src="/img/About/H-logo.png" />
      <span class="text-bold-blue">이란?</span>
    </div>
    <hr style="width: 60vw; border: 1px solid #5caafa; margin-top: 1vh" />
    <div id="about-content-box">
      <div id="about-content">
        미온이란, 미림여자정보과학고등학교에 재학 중이며<br />
        온다에 적응하고 있는 귀여운 예비 개발자들이<br />
        기획하고 개발한
        <span class="text-bold-black">"온다에서의 한 끼 정하기"</span>
        프로그램입니다.
      </div>
    </div>

    <span class="text-bold-blue">서비스</span>
    <hr style="width: 48vw; border: 1px solid #5caafa; margin-top: 1vh" />
    <div id="service-box-container">
      <div id="service-box">
        <img class="img1" src="/img/mainPage/default-marker.png" />
        <span id="service-title" class="text-bold-black">지도</span>
        <span id="service-content">ONDA 주변 맛집을 탐색해봐요!</span>
      </div>
      <div id="service-box">
        <img class="img2" src="/img/vote-icon.png" />
        <span id="service-title" class="text-bold-black">투표</span>
        <span id="service-content">식당을 투표해 점심을 함께 할<br />동료를 찾아봐요!</span>
      </div>
      <div id="service-box">
        <img class="img3" src="/img/review.png" />
        <span id="service-title" class="text-bold-black">리뷰</span>
        <span id="service-content">오늘 식사에 대한<br />온다만의 리뷰를 작성해봐요!</span>
      </div>
      <div id="service-box">
        <img class="img4" src="/img/AppBar/default-profile.png" />
        <span id="service-title" class="text-bold-black">발자국</span>
        <span id="service-content">식당에 대한 온다만의 식사 로그,<br />발자국을 남겨봐요!</span>
      </div>
    </div>

    <span class="text-bold-blue">개발자</span>
    <hr style="width: 70vw; border: 1px solid #5caafa; margin-top: 1vh" />
    <div id="developer-list-container">
      <div id="developer-list" class="Julianne">
        <span id="developer-name">Julianne</span>
        <a href="mailto:s2019w33@e-mirim.hs.kr"> <img class="gmail" src="/img/About/gmail.png" /></a>
        <a href="https://github.com/julianne03" target="_blank"> <img class="github" src="/img/About/github.png" /></a>
      </div>
      <div id="developer-list" class="Belle">
        <span id="developer-name">Belle</span>
        <a href="mailto:s2019s05@e-mirim.hs.kr"> <img class="gmail" src="/img/About/gmail.png" /></a>
        <a href="https://github.com/nayoon030303" target="_blank">
          <img class="github" src="/img/About/github.png" />
        </a>
      </div>
      <div id="developer-list" class="Dana">
        <span id="developer-name">Dana</span>
        <a href="mailto:s2019w18@e-mirim.hs.kr"> <img class="gmail" src="/img/About/gmail.png" /></a>
        <a href="https://github.com/dayeon-choi" target="_blank"> <img class="github" src="/img/About/github.png" /></a>
      </div>
      <div id="developer-list" class="Jackie">
        <span id="developer-name">Jackie</span>
        <a href="mailto:s2019w10@e-mirim.hs.kr"> <img class="gmail" src="/img/About/gmail.png" /></a>
        <a href="https://github.com/ParkJaeyeon0308" target="_blank">
          <img class="github" src="/img/About/github.png" />
        </a>
      </div>
      <div id="developer-list" class="Mia">
        <span id="developer-name">Mia</span>
        <a href="mailto:s2019w27@e-mirim.hs.kr"> <img class="gmail" src="/img/About/gmail.png" /></a>
        <a href="https://github.com/MaengSooYeon" target="_blank">
          <img class="github" src="/img/About/github.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./about.component.ts"></script>
<style lang="scss" src="./about.component.scss"></style>

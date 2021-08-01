import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({                 
  mode: 'history',                              
  routes:[                                 
      //path : url 주소, component : 페이지에 보여질 컴포넌트
      {                                            
          path: '/',
          redirect: '/news'
      },
  ]
});
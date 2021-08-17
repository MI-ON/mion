import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class ReviewComponent extends Vue{
    id:number=0;
    title:string ="크라이치즈버거 삼성역점";
    address1:string|null ="서울 강남구 테헤란로 616";
    address2:string|null ="서울 강남구 대치동 996-17";
    tel:string|null ="02-566-6244";
    r_count:number|null =2;
    rating:number|null = 4.0; 
    reviewKeyword:string|null ="";
    
    //test sample
    lists:object[] = [{
        id:0,
        title:"크라이치즈버거 삼성역점",
        address1:"서울 강남구 테헤란로 616",
        address2:"서울 강남구 대치동 996-17",
        tel:"02-566-6244",
        r_count:2,
        rating: 4.0, 
    },{
        id:0,
        title:"크라이치즈버거 삼성역점",
        address1:"서울 강남구 테헤란로 616",
        address2:"서울 강남구 대치동 996-17",
        tel:"02-566-6244",
        r_count:2,
        rating: 4.0, 
    },{
        id:0,
        title:"크라이치즈버거 삼성역점",
        address1:"서울 강남구 테헤란로 616",
        address2:"서울 강남구 대치동 996-17",
        tel:"02-566-6244",
        r_count:2,
        rating: 4.0, 
    },{
        id:0,
        title:"크라이치즈버거 삼성역점",
        address1:"서울 강남구 테헤란로 616",
        address2:"서울 강남구 대치동 996-17",
        tel:"02-566-6244",
        r_count:2,
        rating: 4.0, 
    },{
        id:0,
        title:"크라이치즈버거 삼성역점",
        address1:"서울 강남구 테헤란로 616",
        address2:"서울 강남구 대치동 996-17",
        tel:"02-566-6244",
        r_count:2,
        rating: 4.0, 
    }]

    mounted(){

    }

    //graphql에서 review 가져오기
    getReviews(){

    }

    //리뷰 키워드 버튼 클릭
    /**
     * 검색한 키워드를 부모로 올려보내고 
     * 마커를 가져온후 graphql에 있는 store만 표시하기?
     */
    rkewordClick(){
        console.log(this.reviewKeyword);
    }

    clickList(){
        
    }
}
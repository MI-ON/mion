import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class ReviewComponent extends Vue{

    id:number|null= null;
    title:string|null =null;
    address1:string|null =null;
    address2:string|null =null;
    tel:string|null =null;
    r_count:number|null =null;
    rating:number|null = null; 
    reviewKeyword:string|null =null;
    
    lists:object[] = []

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
        
    }

    clickList(){
        
    }
}
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class WriteReivewComponent extends Vue{

    title:string='크라이치즈버거 삼성역점';
    address1:string='서울 강남구 테헤란로 616';
    address2:string='서울 강남구 대치동 996-17';
    tel:string='02-566-6244';
    review_count:number=2;
    review_rating:string='★★★★★';
    review_cont:number=3;
    rating_num:number=4.5;
    ate_people:number=8-5;
    review_commend:string="맛있어요~~ 다음에 한번 더 오고 싶어요!맛있어요~~ 다음에 한번 더 오고 싶어요!"
}
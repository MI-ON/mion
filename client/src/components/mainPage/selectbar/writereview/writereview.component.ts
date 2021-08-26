import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { gql } from 'apollo-boost';
@Component({})
export default class WriteReivewComponent extends Vue{

    @Prop() protected store_name!:string;

    name:string="jackie";
    title:string='크라이치즈버거 삼성역점';
    address1:string='서울 강남구 테헤란로 616';
    address2:string='서울 강남구 대치동 996-17';
    tel:string='02-566-6244';
    review_count:number=2;
    review_rating:string='★★★★★';
    review_cont:number=3;
    rating_num:number=4.5;
    ate_people:number=8-5;
    review_commend:string="맛있어요~~ 다음에 한번 더 오고 싶어요!맛있어요~~ 다음에 한번 더 오고 싶어요!맛있어요~~ 다음에 한번 더 오고 싶어요!맛있어요~~ 다음에 한번 더 오고 싶어요!"

    mounted(){
        console.log(this.store_name);
        this.getDatas();
    }

    async getDatas(){

        const respose = await this.$apollo.query({
            query: gql`
            query($keyword:String!){
                get_stores(keyword: $keyword) {
                    address_name,
                    category_group_code,
                    category_group_name,
                    category_name,
                    id,
                    phone,
                    place_name,
                    place_url,
                    road_address_name,
                    x,
                    y

                }
                get_posts(keyword: $keyword) {
                    id,
                    email,
                    content,
                    rating,
                    created_at
                }
                get_subinfo(name:$keyword) {
                    count,
                    sum

                }
            }
            `,
            variables:{
                keyword:this.store_name,
                name:this.store_name
            }
        });
        console.log(respose);
        return respose;
        
    }

    //post 가져오기
    async getPosts(keyword:string|null){
        const respose = await this.$apollo.query({
            query: gql`
            query($keyword: String!) {
                get_posts(keyword: $keyword) {
                    store_name
                }
            }
            `,
            variables:{
                keyword:keyword
            }
        });

        return respose.data.get_posts.map((data:any)=>data.store_name);    
    }
}
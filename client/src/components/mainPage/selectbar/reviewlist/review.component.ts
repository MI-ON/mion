import { gql } from 'apollo-boost';
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
    
    lists:object[] = [];

    mounted(){

    }

   
    /**
     * 키워드를 입력 관련 키워드에 관한 post 가져오기(db에서)
     * post.store_name으로 정보 찾기 getStore로
     * 
     */

    //graphql에서 post에 store_name 가져오기
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

        console.log(respose);
    }

    rkewordClick(){
        console.log(this.reviewKeyword);
        this.getPosts(this.reviewKeyword);
    }

    clickList(){
        
    }
}
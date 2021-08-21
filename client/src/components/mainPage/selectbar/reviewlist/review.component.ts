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
        //this.$emit('displayPlaces');
    }

   
    /**
     * 키워드에 연관된 post 가져오기(db에서)  
     * post 음식점 이름만 배열에 담기
     * post.store_name으로 정보 찾기 getStore로
     * 찾은 정보로 마커 만들기
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

        return respose.data.get_posts.map((data:any)=>data.store_name);    
    }

    async getStoresData(names:string[]){
        console.log("이름들:",names);

        const respose = await this.$apollo.query({
            query: gql`
            query($store_names:[String]!){
                get_store(store_names:$store_names) {
                    address_name,
                    category_name,
                    id,
                    phone,
                    place_name
                }
            }
            `,
            variables:{
                store_names:names
            }
        });
        console.log(respose);
    }

    async rkewordClick(){
        console.log(this.reviewKeyword);
        const store_names = await this.getPosts(this.reviewKeyword);
        const datas = this.getStoresData(store_names);
    }

    clickList(){
        
    }
}
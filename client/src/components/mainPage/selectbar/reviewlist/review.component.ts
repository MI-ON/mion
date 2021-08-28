import { gql } from 'apollo-boost';
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class ReviewComponent extends Vue{

    
    id:number|null= null;
    place_name:string|null =null;
    address_name:string|null =null;
    road_address_name:string|null =null;
    phone:string|null =null;
    r_count:number|null =null;
    rating:number|null = null; 
    reviewKeyword:string|null =null;
    lists:object[] = [];

    isSearch:boolean = false;

    mounted(){
        
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
        //console.log("이름들:",names);
        try{
            const respose = await this.$apollo.query({
                query: gql`
                query($store_names:[String]!){
                    get_store(store_names:$store_names) {
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
                }
                `,
                variables:{
                    store_names:names
                }
            });
            this.isSearch = true;
            return respose.data.get_store;
        }catch{
            alert("관련 리뷰가 존재하지 않습니다.");
        }
        
        
    }

    async getPostInfos(name:String){
        const respose = await this.$apollo.query({
            query: gql`
            query($store_names:String!){
                get_subinfo(name:$store_names) {
                    count,
                    sum

                }
            }
            `,
            variables:{
                store_names:name
            }
        });
        return respose.data.get_subinfo;
    }

    createStar(rating:number){
        let result = '★'.repeat( Math.floor(rating));
        if(rating%1 == 0.5){
            result+='☆';
        }
        return result;
    }

    addLists(datas:any[]){
        datas.forEach(async(data)=>{
            const subinfo:any = await this.getPostInfos(data.place_name);
            data.r_count = subinfo.count;
            data.rating = this.createStar(subinfo.sum/subinfo.count);
            this.lists.push(data);
        })
    }

    async rkewordClick(){
        const lists = document.querySelectorAll(".list");
        for(let i=0; i<lists.length; i++){
            lists[i].remove();
        }
        const store_names = await this.getPosts(this.reviewKeyword);
        const datas = await this.getStoresData(store_names);
        this.addLists(datas);
        this.$emit('displayPlaces',datas);
    }

    clickReview(event:any,key:string){
        this.$emit('showWriteReview',key);
    }
}
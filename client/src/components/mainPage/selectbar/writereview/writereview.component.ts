import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { gql } from 'apollo-boost';
@Component({})
export default class WriteReivewComponent extends Vue{

    @Prop() protected store_name!:string;

    posts:any = [1,2,3];
    store:any;
    count:number=0;
    rating:number = 0;
    stars:String = "";
    isLoading = true;

    maxText = 200;
    currentText = 0;
    

    created(){
        console.log(this.store_name);
        this.getDatas();
        
    }
    createStar(rating:number){
        let result = '⭐️'.repeat( Math.floor(rating));
        if(rating%1 == 0.5){
            result+='☆';
        }
        return result;
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
        
        this.store = respose.data.get_stores[0];
        this.posts = respose.data.get_posts;
        this.count = respose.data.get_subinfo.count;
        this.rating =  respose.data.get_subinfo.sum / this.count;
        this.stars = this.createStar( this.rating );

        this.findUsers(respose.data.get_posts);
        this.isLoading = false;
    }

    async findUsers(get_posts:any){
        for(let i=0; i<get_posts.length; i++){
            const respose = await this.$apollo.query({
                query: gql`
                query($email:String!){
                    get_user_by_email(email: $email) {
                        full_name,
                        image_url,
                        email
                    }
                }
                `,
                variables:{
                    email:get_posts[i].email
                }
            });
            const data = respose.data.get_user_by_email;
            this.posts[i].full_name = data.full_name;
            this.posts[i].image_url = data.image_url;
            console.log(this.posts[i]);
        }
    }
}
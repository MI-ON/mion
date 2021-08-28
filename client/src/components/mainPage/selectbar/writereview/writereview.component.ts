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
    isLoading:boolean = true;
    isMaxPosts:boolean = false;
    showImg:any = [];
    countPost:number = 0;
    maxText = 200;
    currentText = 0;
    

    created(){
        this.getDatas();
         
    }

    writeReview(){
       
        //text
        let textArea:any = document.querySelector('#review-keyword');
        textArea = textArea.value;

        //rating
        let rating:any = document.querySelector('.b-rating-value');
        rating = rating.innerHTML;

        if(textArea.length !==0 && rating.length !==0){
            console.log(textArea);
            console.log(Number(rating));
            this.addPost(textArea,rating)
        }else{
            alert("내용을 입력해주세요");
            console.log("비어있습니다");
        }
    }

    async addPost(content:string, rating:string){
        
        const respose = await this.$apollo.mutate({
            mutation: gql`
            mutation( $store_name:String!,$category_name:String! ,$email:String! ,$content:String! ,$rating:Float!){
                add_post(
                    store_name: $store_name, 
                    category_name:$category_name,
                    email:$email, 
                    content:$content, 
                    rating:$rating) 
               
            }
            ` ,
            variables:{
                store_name:this.store.place_name,
                category_name:this.store.category_name,
                email:"kny030303khs@gamil.com",
                content:content,
                rating:Number(rating)
            }
        });
        
        if(!respose.data.add_post){
            alert("방문하지 않으셨습니다.");
        }else{
            alert("추가되었습니다.");
        }
        
    }


    createStar(rating:number){
        const result = '⭐️'.repeat( Math.floor(rating));
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
            }
        });
        
        this.store = respose.data.get_stores[0];
        this.posts = respose.data.get_posts
        this.count = respose.data.get_subinfo.count;
        this.rating =  respose.data.get_subinfo.sum / this.count;
        this.stars = this.createStar( this.rating );
        this.findUsers(respose.data.get_posts);
        
    }

    maxImg(posts:any) {
        for(let i=0; i<this.posts.length; i++){
            if(i>5){
                this.isMaxPosts = true;
                this.countPost = posts.length - 5;
                break;
            }else{
                this.showImg.push(this.posts[i].image_url);
            }
            
        }    
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
        }
        this.maxImg(this.posts);
      
    }
    
}
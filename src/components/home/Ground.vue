<template>
	<div class="main">
		<div class="background">
			<img :src="bk" class="backimg" />
		</div>
		<div>
			<div class="main_head">
				<div class="appname">
					<div>
						<!-- <img src="../../assets/img/star.png" style="width:245px;height:70px;margin:7px 0 0px 10px;" class="mainlogo"/> -->
						High Light
					</div>
					<!-- <p class="note">心有瑰宝 绚丽灿烂 唯有艺术是生动的永恒 </p> -->
				<!-- 星夜来自于梵高知名度最高作品之一的星夜，漫舞是将画家在绘画时画笔在挥动时的状态比喻成跳舞-->
				</div>
				<div class="set" >
					<el-col :span="12" style="line-height: 45px;"> 
						<el-dropdown trigger="click">
							<span class="el-dropdown-link" style="font-size:30px; letter-spacing:0.1em;"><i class="el-icon-more"></i></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);">{{logined}}</span></router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);">返回首页</span></router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/User"><span style="color: rgb(129, 147, 167);">个人中心</span></router-link></el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
				</div>
			</div>

			<div class="items_nav">
					<ul class="item_nav">
						<li class="navlist" v-for="(nlist,index) in navs" :key="index" @click="ChangeCu(index)" :class="{cupage:index===pageid}">
							{{nlist.name}}
						</li>
					</ul>	
			</div>
			<div class="content">
                <div class="scroll-card">
                    <el-carousel :interval="4000" type="card" height="840px">
                        <el-carousel-item v-for="(item,index) in shareList" :key="index">
                            <div class="card-img">
                                <img src="../../assets/img/60.jpg" width="820" height="520" />
                            </div>
                            <div class="card-info">
                                <div class="card-icon">
                                    <el-avatar :size="60" :src="icons"></el-avatar>
                                    <el-tooltip  class="tooltip" effect="light" content="查看主页" placement="right">
                                      <span class="card-uname">Linda</span>
                                    </el-tooltip>                  
                                    <img @click="Changelike(index)" v-show="item.isLike==false" class="heart" src="../../assets/img/dislike.png" width="40px"/>
                                    <img @click="Changelike(index)" v-show="item.isLike==true" class="heart" src="../../assets/img/like.png" width="40px"/>
                                </div>
                                <div class="card-content">
                                    <p class="article" style="text-indent:20px;">
                                      好像，人都有两个自我 一个以自我为中心 一个为现实努力 我们在不断地，平衡，追求 一次次，超越自己 生活是一片汪洋的大海 我们是一叶小舟 总是在，破浪前行 日月星辰，岁月如歌
                                    </p>
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
			<!-- 内容盒子底部 -->
		</div>
		<ShareDawer ref="sharedawer"></ShareDawer>
	</div>
</template>
<script>
import ShareDawer from '../Dialog/ShareDawer.vue';
import SalePage from '../Ponents/SalePage.vue';
import SaleCard from '../Ponents/SaleCard.vue';
export default {
    components:{ShareDawer,SalePage,SaleCard},
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        islogin:false,
		logined:"登录",
        bk:require('../../assets/img/52.jpg'),
        icons:require('../../assets/img/60.jpg'),
        RouterHead:'',
        RouterFoot:'',
        activeName: '0',
        TagName:'first',
        shareList:[
          {
            isLike:false,
          },
          {
            isLike:false,
          },
          {
            isLike:false,
          },
          {
            isLike:false,
          },
          {
            isLike:false,
          },
          {
            isLike:false,
          }
        ],
        navs:[
          {
            name:'艺术之廊',
            head:'Homepage'
          },
          {
            name:'分享画作',
            head:'Share'
          },
          {
            name:'拍卖画作',
            head:'Sale'
          },
          {
              name:'动态广场',
              head:'Ground'
          },
        ],

        pageid:3,
      };
    },
    methods: {
      ChangeCu(i){
        this.pageid=i
        for (let indes = 0; indes < this.navs.length; indes++) {
          if(indes==i){
            this.RouterHead=this.navs[i].head
            this.RouterFoot=''
          }
          
        }
        this.ChangeRouter()
      },
      ChangeRouter(){
        this.$router.push({ path: `/${this.RouterHead}/${this.RouterFoot}`,query:{pageid:this.pageid,islogin:this.islogin}})
      },
      Changelike(index){
        if(this.shareList[index].isLike==false){
          this.shareList[index].isLike=true
        }
        else if(this.shareList[index].isLike==true){
          this.shareList[index].isLike=false
        }
      }

    },
    mounted(){
      // this.pageid=this.$route.query.pageid
      this.islogin=this.$route.query.islogin
      if(this.islogin==true){
        this.logined="退出登录"
      }
      else if(this.islogin==false){
        this.logined="登录"
      }
	  },
}
</script>
<style src='../../assets/css/ground.scss' scoped>	
</style>
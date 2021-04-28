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
								<el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);">{{LoginState==true?'退出登录':'登录'}}</span></router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);">返回首页</span></router-link></el-dropdown-item>
								<el-dropdown-item ><span style="color: rgb(129, 147, 167);" @click="OpenUser()">个人中心</span></el-dropdown-item>
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
                    <el-carousel :autoplay="false" :interval="4000" type="card"  height="840px">
                        <el-carousel-item v-for="(item,index) in shareList" :key="index">
                            <div class="card-img">
                                <img :src="item.workurl" width="840" height="520" />
                            </div>
                            <div class="card-info">
                                <div class="card-icon">
                                    <el-avatar :size="60" :src="item.uicon"></el-avatar>
                                    <!-- <el-tooltip  class="tooltip" effect="light" content="点击查看主页" placement="right"> -->
                                      <span class="card-uname" @click="Touser(index)">{{item.username}}</span>
                                    <!-- </el-tooltip>                -->
                                    <img @click="Changelike(index)" v-show="item.liketag==false" class="heart" src="../../assets/img/dislike.png" width="40px"/>
                                    <img @click="Changelike(index)" v-show="item.liketag==true" class="heart" src="../../assets/img/like.png" width="40px"/>
                                    <i class="el-icon-chat-dot-round comment" @click="Tocomment(index)"></i>  
                                   
                                </div>
                                <div class="card-content">
                                    <p class="article" style="text-indent:20px;">
                                      {{item.ideaword}}
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
    <Commentbox ref="combox"></Commentbox>
    <User ref="user"></User>
	</div>
</template>
<script>
import ShareDawer from '../Dialog/ShareDawer.vue';
import SalePage from '../Ponents/SalePage.vue';
import SaleCard from '../Ponents/SaleCard.vue';
import Commentbox from '../Dialog/Commentbox'
import User from '../home/User'
import { mapState, mapMutations } from 'vuex'
export default {
    components:{ShareDawer,SalePage,SaleCard,Commentbox,User},
    computed: {
      ...mapState({
        LoginState:state=>state.loginStore.LoginState,
        Loginid:state=>state.loginStore.Loginid,
      }) 
    },
    mounted(){
      this.GetWorklist()
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        bk:require('../../assets/img/52.jpg'),
        icons:require('../../assets/img/60.jpg'),
        RouterHead:'',
        RouterFoot:'',
        activeName: '0',
        TagName:'first',
        shareList:[],
        NetData:[],
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
        this.$router.push({ path: `/${this.RouterHead}/${this.RouterFoot}`,query:{pageid:this.pageid}})
      },
      Changelike(index){
        if( this.shareList[index].liketag==false){
          this.Setlike(index)
        }
        else if( this.shareList[index].liketag==true){
          this.shareList[index].liketag=false
        }
      },
      


      Tocomment(index){
        this.$refs.combox.WorkData=this.shareList[index]
        this.$refs.combox.commentdialog=true
      },
      OpenUser(){
        this.$refs.user.Catchid=this.Loginid
        this.$refs.user.Catchtype='right'
        this.$refs.user.userdialog=true
      },
      Touser(index){
        console.log(this.Loginid,this.shareList[index].id)
        if(this.Loginid!=this.shareList[index].id){
          this.$refs.user.Catchid=this.shareList[index].id
          this.$refs.user.Catchtype='noright'
        }
        else if(this.Loginid==this.shareList[index].id){
          this.$refs.user.Catchid=this.shareList[index].id
          this.$refs.user.Catchtype='right'
        }
        this.$refs.user.userdialog=true
      },
      

      async Setlike(index){
        let form={
          netuserid:this.Loginid,
          networkid:this.shareList[index].workid,
          nettype:'收藏',
          comment:''
        }
        const {data:res}=await this.$http.post("addnetbox",form)
        if(res!='success'){
          return this.$message.error("收藏失败")
        }
        else{
          this.shareList[index].liketag=true
        }
		
      },
      async GetWorklist(){
        this.shareList=[]
        var dataarr=[]
        let netarr=[]
        let likearr=[]
        var queryinfo={
          query:'人物'
        }
        const {data:res}=await this.$http.get("getworklist",{param:queryinfo})
        for (let j = 0; j < res.wlist.length; j++) {
          const {data:userres}=await this.$http.get("getupdata?id="+res.wlist[j].ownnerid);
          let like={
            liketag:false
          }
          dataarr=Object.assign(res.wlist[j],userres,like)
          this.shareList.push(dataarr)
        }

        //获取列表中与当前登录用户有关系的数据
        var querynetInfo={
          netquery:this.Loginid
        }
        const {data:likeres}=await this.$http.get("getnetbox",{params:querynetInfo})
        this.NetData=JSON.parse(JSON.stringify(likeres.netdata))
        console.log("这是关系表数据",this.NetData)
  
        
        for (let i = 0; i < this.shareList.length; i++) {
          for (let a = 0; a < this.NetData.length; a++) {
            if((this.shareList[i].workid==this.NetData[a].networkid)&&this.NetData[a].nettype=='收藏'){
              this.shareList[i].liketag=true
            }
            else{
              // this.shareList[i].liketag=false
            } 
          }
        }
        console.log("作品数据",this.shareList)

      },

     

      
    },
}
</script>
<style lang="scss" scoped>	
@import '../../assets/css/ground.scss';

</style>
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

			<div class="sharebutton" @click="handleShare()">添加拍卖</div>

			<div class="items_nav">
					<ul class="item_nav">
						<li class="navlist" v-for="(nlist,index) in navs" :key="index" @click="ChangeCu(index)" :class="{cupage:index===pageid}">
							{{nlist.name}}
						</li>
					</ul>	
			</div>
			<div class="content">
				<div class="item_fram">
					<div class="scenery_auction">
								<div class="works_card">
                  <div class="tag-head">
                    <div class="tag-box" :class="[TagName=='first'?'Tagactive':'']" @click="Changetag(1)">我的拍卖</div>
                    <div class="tag-box" :class="[TagName=='second'?'Tagactive':'']" @click="Changetag(2)">我的关注</div>
                  </div>
                  <div class="tag-content">
                    <div class="sale-img">
                      <img src="../../assets/img/60.jpg"  />
                      <div class="sale-info">
                
                      </div>
                    </div>

                    <div class="sale-progress">
                        <div class="sale-time">
                          <i class="el-icon-alarm-clock"></i>
                          <span>出价倒计时：01时30分</span>
                          <span style="margin-left:10px;">已有10人参拍</span>
                        </div>
                        <div class="sale-price">
                          <span>起拍价：1,000 RMB</span>
                          <span style="margin-left:10px;">当前最高价：2,000 RMB</span>
                        </div>
                        <div class="sale-serve">
                          <span>拍卖行服务费：10%</span>
                          <span style="margin-left:10px;">本平台服务费：5%</span>
                        </div>
                        <div class="sale-history">
                          <div class="history-head">
                            <span style="margin-left:10px;">出价记录(8)</span>
                          </div>
                          <div class="history-content">
                            <div class="call-list" v-for="(u,index) in 8 " :key="index">
                              <el-avatar class="call-icon" icon="el-icon-user-solid"></el-avatar>
                              <span class="call-price">1,200 RMB</span>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
								</div>
                  
					</div>	
				</div>
				<div class="pic_show">
				</div>
					
			</div>
			<!-- 内容盒子底部 -->
		</div>
		<ShareDawer ref="sharedawer"></ShareDawer>
	</div>
</template>
<script>
import ShareDawer from '../Dialog/ShareDawer.vue';
export default {
    components:{ShareDawer},
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        islogin:false,
		    logined:"登录",
        bk:require('../../assets/img/52.jpg'),
        RouterHead:'',
        RouterFoot:'',
        activeName: '0',
        TagName:'first',
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

        pageid:2,
      };
    },
    methods: {
      handleRemove(file) { 
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        
      },
     
      handleDownload(file) {
        console.log(file);
      },
      handleShare(){
			  this.$refs.sharedawer.sharebox=true
      },
     
      Changetag(number){
        if(number==1){
          this.TagName='first'
        }
        else if(number==2){
          this.TagName='second'
        }
      },
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
<style src='../../assets/css/sale.scss' scoped>	
</style>
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

			<div class="sharebutton" @click="handleShare()">
				<i class="el-icon-plus"></i>
			</div>

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
									<div class="works_img">
										<div class="history_img"><img src="../../assets/img/09.jpg" style="width:700px;height:490px;"/></div>
										<div class="history_list">
											<div class="list_title">
												历史分享
											</div>
											<div class="h_list">
												<el-collapse v-model="activeName" accordion>
													<el-collapse-item name="1">
														 <template slot="title">
																作品名称：《星月夜》 上传时间：2020年12月25日
														</template>
														<div class="h_img">
															<img src="../../assets/img/09.jpg" style="width:300px;height:200px;"/>
														</div>
														
													</el-collapse-item>
													<el-collapse-item name="2">
														 <template slot="title">
																作品名称：《星月夜》 上传时间：2020年12月25日
														</template>
														<div class="h_img"><img src="../../assets/img/11.jpg" style="width:300px;height:200px;"/></div>
													</el-collapse-item>
													<el-collapse-item name="3">
														 <template slot="title">
																作品名称：《星月夜》 上传时间：2020年12月25日
														</template>
														<div class="h_img"><img src="../../assets/img/12.jpg" style="width:300px;height:200px;"/></div>
													</el-collapse-item>
													<el-collapse-item name="4">
														 <template slot="title">
																作品名称：《星月夜》 上传时间：2020年12月25日
														</template>
														<div class="h_img"><img src="../../assets/img/13.jpg" style="width:300px;height:200px;"/></div>
													</el-collapse-item>
												</el-collapse>
											</div>
										</div>
									</div>
									<div class="work_brief">
										<ul>
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>
											</li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>
											</li>
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div> 
											</li>
											
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>  
											</li>
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>  
											</li>
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>  
											</li>
										</ul>
										<!-- <div  class="join" >上传</div> -->
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
		pageid:1,
      };
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

}
</script>
<style  lang="scss" scoped>	
@import "../../assets/css/share.scss";
.el-collapse{
	width: 1185px;
	border-top: 1px solid rgb(204, 204, 187);
	margin-left: 20px;
}
</style>
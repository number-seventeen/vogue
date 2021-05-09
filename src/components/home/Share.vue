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
								<el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);" >{{LoginState==true?'退出登录':'登录'}}</span></router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/homepage"><span style="color: rgb(129, 147, 167);">返回首页</span></router-link></el-dropdown-item>
								<el-dropdown-item ><span style="color: rgb(129, 147, 167);" @click="OpenUser()">个人中心</span></el-dropdown-item>
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
										<div class="history_img"><img :src="ChoosedData.workurl" style="width:700px;height:490px;"/></div>
										<div class="history_list">
											<div class="list_title">
												历史动态
											</div>
											<div class="h_list">
												<el-collapse v-model="activeName" accordion >
													<el-collapse-item :name="(index+1).toString()" v-for="(item,index) in Worklist" :key="index" > 
														 <template slot="title">
															<div class="titlecontent"><span>{{item.ideaword |ellipsis}}</span></div>
															<div class="titletime"><span>上传时间：{{getTime(item.loadtime)}}</span></div>
														</template>
														<div class="h_content">
															<div class="h_img">
																<img :src="item.workurl" style="width:300px;height:200px;"/>
															</div>
															<div class="h_word">
																<div class="wordcontent">
																	<div class="words">{{item.ideaword}}</div>
																	<div class="delete">
																		<span @click="Delete(item)"><i class="el-icon-delete"></i></span>
																	</div>
																</div>
																<div class="wordlike">
																	<span class="liketotal" >收获点赞数：{{item.storetotal}}</span>
																</div>
																
															</div>
														</div>	
													</el-collapse-item>
													
												</el-collapse>
											</div>
										</div>
									</div>
									<div class="work_brief">
										<div v-for="(item,index) in commentData" :key="index">
											<div class="pinlun">
												<el-avatar class="user_icon" :src="item.uicon"></el-avatar>
												<div class="user_name">{{item.username}}</div>
											</div>
											<div class="pin_word">{{item.comment}}</div>
										</div>
										
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
		<User ref="shareuser"></User>
	</div>
</template>
<script>
import ShareDawer from '../Dialog/ShareDawer.vue';
import User from '../home/User'
import { mapState, mapMutations } from 'vuex'
export default {
	components:{ShareDawer,User},
	computed: {
		...mapState({
			LoginState:state=>state.loginStore.LoginState,
			Loginid:state=>state.loginStore.Loginid,
			
		})
		
	},
	watch:{
		activeName:{
			handler:function(newval){
				if(newval){
					var num=Number(newval)-1
					this.ChoosedData=[]
					this.ChoosedData=JSON.parse(JSON.stringify(this.Worklist[num]))
					this.getnetshare()
				}
			}
		}
	},
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
		disabled: false,
		bk:require('../../assets/img/52.jpg'),
		Worklist:[],
		ChoosedData:[],
		commentData:[],
		RouterHead:'',
		RouterFoot:'',
		activeName: '1',
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
	filters: {
		ellipsis: function(value) {
		if (!value) return "";
		if (value.length > 55) {
			return value.slice(0, 55) + "...";
		}
		return value;
		}
	}, 
	mounted(){
		this.getsharework()

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
			this.$refs.sharedawer.titles='新建分享'
			this.$refs.sharedawer.sharebox=true
		},
		Changeshare(index){
			console.log(index)
		},
		OpenUser(){
			this.$refs.shareuser.Catchid=this.Loginid
			this.$refs.shareuser.Catchtype='right'
			this.$refs.shareuser.userdialog=true
		},

		//转换时间戳
		getTime (time) {
			var t=0
            var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
            var nowDate = new Date(time).getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
            var target = new Date(nowDate + offset_GMT * 60 * 1000  );
            var date = target;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var y = date.getFullYear()
			var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
			var d = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
			return y + '-' + m + '-' + d
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



		async getsharework(){
			var num=
			this.ChoosedData=[]
			this.Worklist=[]
			var queryinfo={
				query:'人物'
			}
			const {data:res}=await this.$http.get("getworklist",{param:queryinfo})
			console.log(res.wlist)
			var sharearr=[]
			for (let index = 0; index < res.wlist.length; index++) {
				if(res.wlist[index].owntype=='出售'){
				}
				else if(res.wlist[index].owntype=='分享'&&res.wlist[index].ownnerid==this.Loginid){
					sharearr.push(res.wlist[index])
				}	
			}
			this.Worklist=JSON.parse(JSON.stringify(sharearr))
			if(this.Worklist.length>=1){
				var num=Number(this.activeName)-1
				this.ChoosedData=JSON.parse(JSON.stringify(sharearr[num]))
				this.getnetshare()
			}
			else if(this.Worklist.length==0){

			}
			
			
		},
		//获取用户的相关分享数据
		async getnetshare(){
			var netarr=[]
			let worknetarr=[]
			var queryWorkInfo={
				workquery:this.ChoosedData.workid
			}
			console.log(this.ChoosedData.workid)
			const {data:res}=await this.$http.get("getnetwork",{params:queryWorkInfo})
			for (let i = 0; i < res.networkdata.length; i++) {
				if(res.networkdata[i].nettype=='评论'){
					netarr.push(res.networkdata[i])
				}	
			}
			console.log("这是作品关系数据",netarr)

			this.commentData=[]
			for (let j = 0; j < netarr.length; j++) {
				const {data:userres}=await this.$http.get("getupdata?id="+netarr[j].netuserid);
				// console.log("ssss",userres)
				worknetarr=Object.assign(netarr[j],userres)
				this.commentData.push(worknetarr)
			}
		},
		Delete(item){
			this.todel(item)
		},
		async todel(item){
			let delid=[]
			console.log("删除的项",item)
			const confirmResult =await this.$confirm('确认删除该动态吗',{
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'info'
			}).catch(err => err)
			if(confirmResult!='confirm'){//取消
				return;
			}
			
			var queryWorkInfo={
				workquery:item.workid
			}
			console.log(item.workid)
			const {data:res}=await this.$http.get("getnetwork",{params:queryWorkInfo})
			console.log("ssssddvvv",res.networkdata)

			for (let i = 0; i < res.networkdata.length; i++) {
				if(res.networkdata[i].networkid==item.workid){
					delid.push(res.networkdata[i].netboxid)
				}
			}
			console.log("要删除的id",delid)
			for (let d = 0; d < delid.length; d++) {
				const {data:delres}=await this.$http.get("deletenetbox?Netboxid="+delid[d]);
				if(delres!='success'){
					console.log("分享板块历史动态删除失败")
				}	
			}

			const {data:workres}=await this.$http.get("deletework?workid="+item.workid)
			if(workres!='success'){
				return this.$message.error("删除失败")
			}
			else{
				this.$message.success("删除成功")
			}

			this.activeName=1
			this.getsharework()

		},



		ChangeRouter(){
			this.$router.push({ path: `/${this.RouterHead}/${this.RouterFoot}`,query:{pageid:this.pageid}})
		},

	},

}
</script>
<style  lang="scss" scoped>	
@import "../../assets/css/share.scss";
.el-collapse{
	width: 1185px;
	border-top: 1px solid rgb(187, 201, 204);
	margin-left: 20px;
}

/deep/ .el-collapse-item__header{
	font-size: 15px;
	font-weight: bold;
	color: #608096c7;
	// text-shadow:0 0 4px rgb(175, 178, 184);
	background: rgba(245, 245, 245, 0.39);
	padding-left: 20px;
	border-bottom: 1px solid rgb(187, 201, 204);
	i{
		font-weight: bold;
	}
	.titlecontent{
		width: 900px;
		font-size: 14px;
		height: 37px;
		span{
			position: relative;
			top:-5px;
		}
	}
	.titletime{
		width: 230px;
		font-size: 14px;
		height: 37px;
		text-align: right;
		span{
			position: relative;
			top:-5px;
		}
	}
	.delete{
		width: 40px;
		line-height: 5px;
		padding-left: 5px;
		text-align: center;
	}
}

</style>
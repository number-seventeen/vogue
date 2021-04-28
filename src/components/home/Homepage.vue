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
					<el-col :span="12">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link" style="font-size:30px; letter-spacing:0.1em;"><i class="el-icon-more"></i></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);">{{LoginState==false?'登录':'退出登录'}}</span></router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/Homepage"><span style="color: rgb(129, 147, 167);">返回首页</span></router-link></el-dropdown-item>
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
			<div class="content" >
				<div class="item_fram">
					<div class="scenery_auction">
						<ul>
							<li>
								<div class="works_card">
									<div>
										<div class="viewmore">
											<router-link to="/Deal" style="color:rgb(129, 147, 167);font-weight:600;">查看更多拍卖</router-link>
										</div>
									</div>
									<div class="works_img"><img :src="choosedWork.workurl"  style="width:740px; height:510px;border:2px solid gray; margin:22px 0px 0px 22px;opacity:0.8;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>{{choosedWork.workname}}</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">{{choosedWork.maketime}}</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{choosedWork.author}}</span></div>
											</li>
											<li>
												<span>*画作类型:</span><div class="wjoin"><span style="margin-left:6px;">{{choosedWork.worktype}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">{{choosedWork.tempprice}}</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
											<li>
												<span>*剩余时间:</span>
												<div class="wrest">
													<span style="margin-left:6px;" v-show="Dhours!=0||Dminutes!=0||Dseconds!=0">{{Dhours}}:{{Dminutes}}:{{Dseconds}}</span>
													<span style="margin-left:6px;" v-show="Dhours==0&&Dminutes==0&&Dseconds==0">拍卖已结束</span>
												</div>
											</li>
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
								<div v-show="downshow" style="margin-top:-50px;margin-left:532px;font-size:14px;font-weight:600;font-family:A;color:rgba(114, 158, 206, 0.644);">下滑浏览热门画作分享</div>
								<div class="chevron" v-show="downshow"><img src="../../assets/img/downarrow.png" style="width:60px;height:40px;" /></div>
							</li>	
						</ul>
						
					</div>	
				</div>
				<div class="hot">
					<ul>
						<li class="hot_head">=本周艺术家热度排行榜=</li>
						<li v-for="(hot,index) in bestUser" :key="index" @click="ChangeHot(index)" :class="{cuHot:index===hotid}">
							<div class="hot_u">
								<i>Top {{index+1}}</i>
								<div class="user_icon"><el-avatar :src="hot.uicon" :size="52" fit="scale-down" @error="errorHandler"></el-avatar></div>
								<div class="user_name" @click="Touser(index)">{{hot.username}}</div>
							</div>
						</li>	
					</ul>
				</div>
				<div class="pic_show">
					<div style="font-size:22px;font-weight:600;width:1615px;text-align:center;color:#6986b6a1;">热 门 分 享 画 作 </div>
					<div>
						<ul>
							<li v-for="(item,index) in shareimgs" :key="index">
								<div class="toshow">
									<div class="to_pic">
										<div><img class="sharepic" :src="item.workurl" /></div>
									</div>
									<div class="to_user">
										<div><el-avatar class="to_icon" :size="40" :src="item.uicon"></el-avatar></div>
										<div class="to_name"><span>{{item.username}}</span></div>
										<div class="to_like">
											<div v-show="item.tempstore==false" ><img @click="Changelike(index,item)"  class="heart" src="../../assets/img/dislike.png" ref="hearts"/></div>
											<div v-show="item.tempstore==true" ><img @click="Changelike(index,item)"  class="heart"  src="../../assets/img/like.png" /></div>
											<!-- <div style="margin-top:-5px;font-size:12px;font-family:A;color:rgba(112, 95, 146, 0.63);transform:scale(0.8);">{{shareimg.like}}</div> -->
										</div>
									</div>
								</div>	
							</li>
							<div class="sharemore" @click="ToMore()">查看更多</div>
						</ul>
					</div>
					
				</div>
			</div>
		<!-- 内容盒子底部 -->
		</div>
		<Tobuy ref="tobuy"></Tobuy>
		<User ref="homeuser"></User>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Rules from '../Dialog/Rules.vue'
import Tobuy from './Tobuy'
import User from '../home/User'
export default {
	components:{Rules,Tobuy,User},
	data(){
		return{
			downshow:true,
			RouterHead:'',
			RouterFoot:'',
			uicon:require('../../assets/img/46.jpg'),
			countimer:null,
			Dhours:0,
			Dminutes:0,
			Dseconds:0,
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
			bk:require('../../assets/img/52.jpg'),
			likeicon:require('../../assets/img/like.png'),
			dislikeicon:require('../../assets/img/dislike.png'),
			pageid:0,
			picid:0,
			hotid:0,
			dislike:true,
			WorkList:[],
			choosedWork:[],
			sharebest:[],
			shareimgs:[],
			bestUser:[],
			Netdata:[],
			

		}
	},
	beforeDestroy(){
		clearInterval(this.countimer)
	},
	mounted(){
		this.imgHeight = document.documentElement.clientHeight || document.body.clientHeight;
		window.addEventListener('mousewheel',this.handleScroll)
		this.GetWorklist()
		this.GetUser()
		this.Getnetlike()

		this.countimer=setInterval(() => {
			this.Watchtime()
		}, 1000);
	},
	computed: {
		...mapState({
			LoginState:state=>state.loginStore.LoginState,
			Loginid:state=>state.loginStore.Loginid,
			
		})
		
	},
	methods:{
		async GetWorklist(){
			this.shareimgs=[]
			var savelike=[]
			var sharearrs=[]
			var arr=[]
			var sortarr=[]
			this.bestUser=[]
			var queryinfo={
				query:'人物'
			}
			const {data:res}=await this.$http.get("getworklist",{param:queryinfo})
			
			this.WorkList=res.wlist
			for (let index = 0; index < this.WorkList.length; index++) {
				if(this.WorkList[index].owntype=='出售'){
					arr.push(this.WorkList[index])
				}
				else if(this.WorkList[index].owntype=='分享'){
					const {data:userres}=await this.$http.get("getupdata?id="+this.WorkList[index].ownnerid);
					sharearrs=Object.assign(this.WorkList[index],userres)
					sortarr.push(sharearrs)
				}	
				
			}
			var n=Math.floor(Math.random()*arr.length); 
			this.choosedWork=arr[n]
			console.log("结束时间",this.choosedWork.endtime)

			//分享区排序
			sortarr.sort(this.compare('storetotal'));
			for (let i = 0; i < sortarr.length; i++) {
				if(i<=7){
					this.shareimgs.push(sortarr[i])
				}
				
			}
			console.log("fenxiangfenxiang",this.shareimgs)
		},
		async GetUser(){
			var queryUserInfo={
				userquery:''
			}
			const {data:res}=await this.$http.get("alluser",{param:queryUserInfo})
			for (let i = 0; i < res.data.length; i++) {
				if(i<=8){
					this.bestUser.push(res.data[i])
				}
				
			}
		},

		async Getnetlike(){
			var likelist=[]
			var querynetInfo={
				netquery:this.Loginid
			}
			const {data:res}=await this.$http.get("getnetbox",{params:querynetInfo})
			console.log("这是关系表数据",this.shareimgs)
			this.NetData=JSON.parse(JSON.stringify(res.netdata))

			for (let i = 0; i < this.shareimgs.length; i++) {
				for (let a = 0; a < this.NetData.length; a++) {
					if((this.shareimgs[i].workid==this.NetData[a].networkid)&&this.NetData[a].nettype=='收藏'){
						this.shareimgs[i].tempstore=true
					}
					else{
						this.shareimgs[i].tempstore=false
					} 
					if((this.shareimgs[i].workid==this.NetData[a].networkid)&&this.NetData[a].nettype=='关注'){
						this.shareimgs[i].tempmind=true
					}
					else{
						this.shareimgs[i].tempmind=false
					} 
				}
			}
			console.log("作品数据",this.shareimgs)
		},

		async Setlike(index){
			let form={
				netuserid:this.Loginid,
				networkid:this.shareimgs[index].workid,
				nettype:'收藏',
				comment:''
			}
			const {data:res}=await this.$http.post("addnetbox",form)
			if(res!='success'){
				return this.$message.error("收藏失败")
			}
			else{
				this.shareimgs[index].tempstore=true
				this.Editwork(index,true,1)
				var querynetInfo={
					netquery:this.Loginid
				}
				const {data:res}=await this.$http.get("getnetbox",{params:querynetInfo})
				this.NetData=JSON.parse(JSON.stringify(res.netdata))

			}
		},
		async Delike(index){
			for (let i = 0; i < this.NetData.length; i++) {
				if((this.NetData[i].networkid==this.shareimgs[index].workid)&&this.NetData[i].nettype=='收藏'){
					console.log("需要取消的关系ID为：",this.NetData[i].netboxid)
					const {data:delres}=await this.$http.get("deletenetbox?Netboxid="+this.NetData[i].netboxid);
					if(delres!='success'){
						return this.$message.error("取消失败")
					}
					else{
						this.shareimgs[index].tempstore=false
						this.Editwork(index,false,-1)
						var querynetInfo={
							netquery:this.Loginid
						}
						const {data:res}=await this.$http.get("getnetbox",{params:querynetInfo})
						this.NetData=JSON.parse(JSON.stringify(res.netdata))
					}
				}
			}
		},

		async Editwork(index,state,num){
			let form={
				workid:this.shareimgs[index].workid,
				owntype:this.shareimgs[index].owntype,
				worktype:this.shareimgs[index].worktype,
				workname:this.shareimgs[index].workname,
				maketime:this.shareimgs[index].maketime,
				storetotal:this.shareimgs[index].storetotal+num,
				ideaword:this.shareimgs[index].ideaword,
				loadtime:this.shareimgs[index].loadtime,
				endtime:this.shareimgs[index].endtime,
				salecompany:this.shareimgs[index].salecompany,
				author:this.shareimgs[index].author,
				ownnerid:this.shareimgs[index].ownnerid,
				workurl:this.shareimgs[index].workurl,
				workprice:this.shareimgs[index].workprice,
				tempownner:this.shareimgs[index].tempownner,
				tempprice:this.shareimgs[index].tempprice,
				tempstore:false,
				tempmind:false
			}
			const {data:res}=await this.$http.put("editwork",form)
			
		},

		

		OpenUser(){
			this.$refs.homeuser.Catchid=this.Loginid
			this.$refs.homeuser.Catchtype='right'
			this.$refs.homeuser.userdialog=true
		},
		Touser(index){
			console.log(this.Loginid,this.bestUser[index].id)
			if(this.Loginid!=this.bestUser[index].id){
			this.$refs.homeuser.Catchid=this.bestUser[index].id
			this.$refs.homeuser.Catchtype='noright'
			}
			else if(this.Loginid==this.bestUser[index].id){
			this.$refs.homeuser.Catchid=this.bestUser[index].id
			this.$refs.homeuser.Catchtype='right'
			}
			this.$refs.homeuser.userdialog=true
		},
		compare(value){
			return function(a,b){
				var val1 = a[value];
				var val2 = b[value];
				return val2 - val1;
			}
		},
		handleScroll (e) {
			var direction = e.deltaY>0?'down':'up'
			// 该语句可以用来判断滚轮是向上滑动还是向下
			if(direction=="down"){
					this.downshow=false
			}
			else if(direction=="up"){ 
				if(document.getElementsByClassName('content')[0].scrollTop<=10){
					this.downshow=true

				}
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
		Changelike(i,item){
			if(item.tempstore==false){
				this.Setlike(i)
			}
			else if(item.tempstore==true){
				this.Delike(i)
			}
		},
		ChangeHot(i){
			this.hotid=i
		},
		ChangeRouter(){
			this.$router.push({ path: `/${this.RouterHead}/${this.RouterFoot}`,query:{pageid:this.pageid}})
		},
		ToBuy(){
			this.$refs.tobuy.routetype='home'
			this.$refs.tobuy.storecontent=true
			this.$refs.tobuy.WorkData=this.choosedWork
		},
		ToMore(){
			this.pageid=3
			this.RouterHead='Ground'
			this.RouterFoot=''
			this.ChangeRouter()
		},
		
		errorHandler() {
        	return true
      	},

		Watchtime(){
			var m=this.choosedWork.endtime
			var dateend=new Date(m);
			var datenow=new Date();
			let timestampend = dateend.getTime()
			let timestampnow = datenow.getTime()
			if(timestampend>timestampnow){
				this.ChangeStamp(timestampnow,timestampend)
			}
			else{
				
			}
		},
		ChangeStamp(beginTime,endTime){
			var dateBegin = new Date(beginTime);
			var dateEnd = new Date(endTime);
			var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
			var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
			var dayhour=dayDiff*24
			var leave1 = dateDiff % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
			var hours = Math.floor(leave1 / (3600 * 1000))+dayhour;//计算出小时数
			//计算相差分钟数
			var leave2 = leave1 % (3600 * 1000);   //计算小时数后剩余的毫秒数
			var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
			//计算相差秒数
			var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
			var seconds = Math.round(leave3 / 1000);
			this.Dhours=hours
			this.Dminutes=minutes
			this.Dseconds=seconds
		},

		Clear(){
			this.WorkList=[],
			this.choosedWork=[],
			this.sharebest=[],
			this.shareimgs=[],
			this.bestUser=[],
			this.Netdata=[]
		},
		

	}
}
</script>
<style src='../../assets/css/homepage.css' scoped>	
</style>
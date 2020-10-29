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
							<span class="el-dropdown-link" style="font-size:30px; letter-spacing:0.1em;">设置</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item ><router-link to="/">退出登录</router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/">返回首页</router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/">个人中心</router-link></el-dropdown-item>
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
									<div class="works_img"><img src="../../assets/img/25.jpg" style="width:620px; height:420px; margin:20px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
								<div v-show="downshow" style="margin-top:-40px;margin-left:430px;font-size:12px;font-weight:600;font-family:A;color:rgba(114, 158, 206, 0.644);">下滑浏览热门画作分享</div>
								<div class="chevron" v-show="downshow"><img src="../../assets/img/downarrow.png" style="width:60px;height:40px;" /></div>
							</li>	
						</ul>
						
					</div>	
				</div>
				<div class="hot">
					<ul>
						<li class="hot_head">=本周艺术家热度排行榜=</li>
						<li v-for="(hotlist,index) in 9" :key="index" @click="ChangeHot(index)" :class="{cuHot:index===hotid}">
							<div class="hot_u">
								<i>Top {{index+1}}</i>
								<div class="user_icon"><el-avatar :src="uicon" :size="40" fit="scale-down" @error="errorHandler"></el-avatar></div>
								<div class="user_name">梵高</div>
							</div>
						</li>	
					</ul>
				</div>
				<div class="pic_show">
					<div style="font-size:19px;font-weight:600;width:1215px;text-align:center;color:rgba(112, 95, 146, 0.63);">热 门 分 享 画 作 </div>
					<div>
						<ul>
							<li v-for="(piclist,index) in 9" :key="index" @click="ChangePic(index)" :class="{cuPic:index===picid}">
								<div class="toshow">
									<div class="to_pic">
										<div><img class="sharepic" src="../../assets/img/20.jpg" /></div>
									</div>
									<div class="to_user">
										<div class="to_icon"></div>
										<div class="to_name">梵高</div>
									</div>
								</div>
								
							</li>
						</ul>
					</div>
				</div>
			</div>
		<!-- 内容盒子底部 -->
		</div>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return{
			downshow:true,
			RouterHead:'',
			RouterFoot:'',
			uicon:require('../../assets/img/46.jpg'),
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
					name:'绘画指导',
					head:'Learn'
				},
			],
			bk:require('../../assets/img/48.jpg'),
			pageid:0,
			picid:0,
			hotid:0,
			day: 0,
			hr: 0,
			min: 0,
			sec: 0,
			ts:0,
			msecs:0,
			endtime:'',
			tname:'hahahahaha'

		}
	},
	mounted(){
		this.imgHeight = document.documentElement.clientHeight || document.body.clientHeight;
		window.addEventListener('mousewheel',this.handleScroll)
		console.log("df",this.counts)
		console.log("ms",this.msec)
		this.countdown()
		 
	},
	computed: {
        // 用vuex读取数据(读取的是state.js中的数据)
		// 相当于this.$store.state.Tname(vuex语法糖)
		...mapState({
			Tname:state=>state.loginStore.Tname,
			msec:state=>state.homeStore.msec,
			counts () {
				return this.$store.state.homeStore.counts
			}
		})
		
	},
	methods:{
		...mapMutations({
			// changename:'load_tname',
			changemsec:'start_count',
			changetime:'change_count'

		}),
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
		ChangePic(i){
			this.picid=i
		},
		ChangeHot(i){
			this.hotid=i
		},
		ChangeRouter(){
			this.$router.push({ path: `/${this.RouterHead}/${this.RouterFoot}`,query:{pageid:this.pageid}})
		},
		ToBuy(){
			this.RouterHead='Tobuy'
			this.RouterFoot=''
			this.ChangeRouter()

			
		},
		countdown () {
			var d=new Date();
            if(this.counts==0){
                var t=d.getTime()+3600000;
                this.endtime=t
                var n=new Date(this.endtime);
				var nn=Date.parse(n)
				var dd=Date.parse(d)   
            }
            if(this.counts>0){
                var n=new Date(this.endtime);
				var nn=Date.parse(n)
				var dd=Date.parse(d)

			}
			this.msecs=nn-dd
			this.changemsec(this.msecs)
			console.log("nnn",this.endtime)
			// console.log(this.msecs)
			if(this.msec <0) return;
			let day = parseInt(this.msec  / 1000 / 60 / 60 / 24)
			let hr = parseInt(this.msec / 1000 / 60 / 60 % 24)
			let min = parseInt(this.msec  / 1000 / 60 % 60)
			let sec = parseInt(this.msec / 1000 % 60)
			this.day = day
			this.hr = hr > 9 ? hr : '0' + hr
			this.min = min > 9 ? min : '0' + min
			this.sec = sec > 9 ? sec : '0' + sec
			const that = this
			if(min>=0 && sec>=0){
				//倒计时结束关闭订单
				if(min==0 && sec==0){
					that.changetime(0)
					return 
				}
				else {
					setTimeout(function () {
						that.countdown()
					}, 1000)
				}
			}
			console.log("hao")
			that.ts=that.counts+1
			that.changetime(0)
			
		}


	}
}
</script>
<style src='../../assets/css/homepage.css' scoped>	
</style>
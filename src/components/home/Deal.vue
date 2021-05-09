<template>
  <div>
	  	<div class="background">
			<img :src="bk" class="backimg" />
		</div>
     	<div class="item_fram">
				<div class="paixu">
					<div class="paixucard">
						<ul>
							<li class="paixu_item"><div  class="p_go" @click="Getchoose('人物')">人物类</div></li>
							<li class="paixu_item"><div  class="p_pop" @click="Getchoose('风景')">风景类</div></li>
							<li class="paixu_item"><div  class="p_pop" @click="Getchoose('静物')">静物类</div></li>
							<li class="paixu_item"><div  class="p_end" @click="Getchoose('抽象')">抽象类</div></li>
							<li class="paixu_item"><div  class="p_start" @click="Getchoose('民俗')">民俗类</div></li>
						</ul>
					</div>
					<div class="paixusearch" style="display:flex;margin-left:25px;">
						<div class="paixu_serch"><input v-model="serchcondition" placeholder="输入相关标签"/></div>
						<div class="search_img" @click="Getsearch()"><i class="el-icon-search"></i></div>
						<div class="clear" @click="Clearsearch()" v-show="choosetype!=''||serchcondition!=''"><i class="el-icon-circle-close"></i>清除筛选</div>
						<div class="paixu_back"><router-link to="/Homepage"><i class="el-icon-arrow-left"></i>返回画廊</router-link></div>
					</div>
				</div>
				<div class="card_wrap"  >
					<div class="scenery_auction">
						<div class="deal-box" v-for="(item,index) in Worklist" :key="index">
							<div class="works_card">
								<div class="works_img"><img :src="item.workurl" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
								<div class="work_brief">
									<ul>
										<li>
											<span>*作品名称:</span><div class="wcall" >《<span>{{item.workname}}</span>》</div>
										</li>
										<li>
											<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">{{item.maketime}}</span></div>
										</li>
										<li>
											<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{item.author}}</span></div>
										</li>
										<li>
											<span>*画作类型:</span><div class="wjoin"><span style="margin-left:6px;">{{item.worktype}}</span></div>
										</li>
										<li>
											<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">{{item.tempprice}}</span><span style="margin-left:5px;">RMB</span></div>
										</li>	
										<!-- <li>
											<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{ChangeStamp(item.endtime)}}</span></div>
										</li> -->
									</ul>
									<div  class="join" @click="ToBuy(index)">查看详情</div>
								</div>	
							</div>
						</div>
							
					</div>	
				</div>	
		</div>
		<Tobuy ref="dealbuy"></Tobuy>
  </div>
</template>

<script>
import Tobuy from './Tobuy'
import Rules from '../Dialog/Rules.vue'
import { mapState, mapMutations } from 'vuex'
export default {
	components:{Rules,Tobuy},
	data(){
		return{
			bk:require('../../assets/img/75.jpg'),
			Worklist:[],
			serchcondition:'',
			choosetype:'',
			recordtimer:null,
		}
	},
	computed: {
		...mapState({
			LoginState:state=>state.loginStore.LoginState,
            Loginid:state=>state.loginStore.Loginid,
            Readrule:state=>state.loginStore.Readrule,
            websocktData:state=>state.loginStore.websocktData,
		})
		
    },
	mounted(){
		this.GetWorklist()
	},
	beforeDestroy(){
		clearInterval(this.recordtimer)
	},
	watch:{
		websocktData:{
            handler:function(newval,oldval){
                // console.log("fff",newval)
                if(newval.type=='结束通知'){
                    this.RESETWEB()
                }
            }
        },
	},
	methods: {
		async GetWorklist(){
			var arr=[]
			var queryinfo={
				query:this.serchcondition
			}
			const {data:res}=await this.$http.get("getworklist",{param:queryinfo})
			console.log(res.wlist)
			for (let i = 0; i < res.wlist.length; i++) {
				if(res.wlist[i].owntype=='出售'){
					arr.push(res.wlist[i])
				}
			}
			this.Worklist=JSON.parse(JSON.stringify(arr))
		},
		async Getsearch(){
			var workdata=[]
			var queryinfo={
				query:this.serchcondition
			}
			const {data:res}=await this.$http.get("getworklist",{params:queryinfo})
			for (let i = 0; i < res.wlist.length; i++) {
				if(res.wlist[i].owntype=='出售'){
					workdata.push(res.wlist[i])
				}
			}
			this.Worklist=JSON.parse(JSON.stringify(workdata))
		},
		async Getchoose(type){
			this.choosetype=type
			var queryinfo={
				query:type
			}
			const {data:res}=await this.$http.get("getworklist",{params:queryinfo})
			console.log(res.wlist)
			this.Worklist=res.wlist
			
		},


		ChangeStamp(end){
			var m=end
			var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
            var nowDate = new Date(m).getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
            var dateend = new Date(nowDate + offset_GMT * 60 * 1000  );
			var datenow=new Date();
			let endTime = dateend.getTime()
			let beginTime = datenow.getTime()
			if(endTime>beginTime){
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
				return hours+':'+minutes+':'+seconds
				
				
			}
			else {
				return '00:00:00';
			}
		},

		Clearsearch(){
			this.GetWorklist()
			this.choosetype=''
		},
		ToBuy(i){
			this.$refs.dealbuy.routetype='deal'
			this.$refs.dealbuy.storecontent=true
			this.$refs.dealbuy.WorkData=this.Worklist[i]
		},
		RESETWEB(){
			this.GetWorklist()
		}
		
			
	},
	
}
</script>

<style src='../../assets/css/deal.scss' scoped>

</style>
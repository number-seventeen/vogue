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
								<el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);">{{Loginid==true?'退出登录':'登录'}}</span></router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);">返回首页</span></router-link></el-dropdown-item>
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
              <div class="tag-head">
                <div class="tag-box" :class="[TagName=='first'?'Tagactive':'']" @click="Changetag(1)">我的拍卖({{Worklist.length}})</div>
                <div class="tag-box" :class="[TagName=='second'?'Tagactive':'']" @click="Changetag(2)">我的关注({{StoreData.length}})</div>
              </div>
              <div class="tag-content"  v-show="TagName=='first'" id="mine" >
                <div class="top-content">
                  <div class="sale-img">
                    <img class="sale-image" :src="ChoosedData.workurl" />
                  </div>
                  <div class="sale-info">
                    <div class="sale-name">
                      <span>作品名称:<span>《</span>{{ChoosedData.workname}}<span></span>》</span>
                    </div>
                    <div class="sale-company">
                      <span style="margin-left:-10px;">拍卖行:{{ChoosedData.salecompany}}</span>
                      <span style="margin-left:20px;">开拍时间:{{getTime(ChoosedData.loadtime)}}</span>
                    </div>
                  </div>
                  
                  <div class="sale-progress">
                    <div class="sale-time">
                      <i class="el-icon-alarm-clock"></i>
                      <span>出价倒计时：</span>
                      <span  v-show="Dhours!=0||Dminutes!=0||Dseconds!=0">{{Dhours}}:{{Dminutes}}:{{Dseconds}}</span>
                      <span  v-show="Dhours==0&&Dminutes==0&&Dseconds==0">拍卖已结束</span>
                      <span style="margin-left:10px;">关注人数: {{ToStoreData.length}}</span>
                    </div>
                    <div class="sale-price">
                      <span>起拍价：{{ChoosedData.workprice}} RMB</span>
                      <span style="margin-left:10px;">当前最高价：{{ChoosedData.tempprice}} RMB</span>
                    </div>
                    <div class="sale-serve">
                      <span>拍卖行服务费：10%</span>
                      <span style="margin-left:10px;">本平台服务费：5%</span>
                    </div>
                    <div class="sale-history">
                      <div class="history-head">
                        <span style="margin-left:10px;">出价记录({{SaleData.length}})</span>
                      </div>
                      <div class="history-content">
                        <div class="call-list" v-for="(u,index) in SaleData " :key="index">
                          <el-avatar class="call-icon" icon="el-icon-user-solid"></el-avatar>
                          <span class="call-price">{{u.comment}} RMB</span>
                          <span class="call-tag" v-show="index==(SaleData.length-1)" >领先</span>
                          <span class="call-tag" v-show="index<(SaleData.length-1)">出局</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="bottom-content">
                  <div class="page"><SalePage ref="salepage" :total="Worklist.length"></SalePage></div>
                  <div class="del" @click="DelSale(ChoosedData.workid)"><i class="el-icon-delete"></i></div>
                </div>
              </div>

              <!-- 我的关注 -->
              <div class="tag-content" v-show="TagName=='second'" id="concer">
                <SaleCard ref="salecard"></SaleCard>
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
    <User ref="saleuser"></User>
	</div>
</template>
<script>
import ShareDawer from '../Dialog/ShareDawer.vue';
import SalePage from '../Ponents/SalePage.vue';
import SaleCard from '../Ponents/SaleCard.vue';
import User from '../home/User'
import { mapState, mapMutations } from 'vuex'
export default {
    components:{ShareDawer,SalePage,SaleCard,User},
    computed: {
      ...mapState({
        LoginState:state=>state.loginStore.LoginState,
        Loginid:state=>state.loginStore.Loginid,
        
      })
      
    },
    mounted(){
      this.getsalework()
      this.salecountimer=setInterval(() => {
        this.Watchtime()
      }, 1000);
    },
    watch:{
      activeWork:{
        handler:function(newval){
          console.log("haohao",newval)
            this.getAllSaleData()
        }
      }
    },
    data() {
      return {
        dialogImageUrl: '',
        changeclass:'',
        dialogVisible: false,
        disabled: false,
        activeWork:0,
        ChoosedData:[],//当前选中的拍卖数据
        Worklist:[],//当前用户拥有的总共的拍卖数据
        SaleData:[],//与当前作品拥有出价关系的数据
        StoreData:[],//当前用户收藏的拍卖数据
        ToStoreData:[],//与当前拍卖的作品有收藏关系的数据
        Allwork:[],
        bk:require('../../assets/img/52.jpg'),
        RouterHead:'',
        RouterFoot:'',
        TagName:'first',
        salecountimer:null,
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

        pageid:2,
      };
    },
    beforeDestroy(){
      clearInterval(this.salecountimer)
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
        this.$refs.sharedawer.titles='新建拍卖'
			  this.$refs.sharedawer.sharebox=true
      },
      OpenUser(){
        this.$refs.saleuser.Catchid=this.Loginid
        this.$refs.saleuser.Catchtype='right'
        this.$refs.saleuser.userdialog=true
      },
      Changetag(number){
        console.log("aaaaa",number)
        if(number==1){
          this.TagName='first'
        }
        else if(number==2){
          this.TagName='second'
          console.log("s",this.StoreData)
          this.$refs.salecard.StoreData=this.StoreData
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
        this.$router.push({ path: `/${this.RouterHead}/${this.RouterFoot}`,query:{pageid:this.pageid}})
        },
        Watchtime(){
        var m=this.ChoosedData.endtime
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


      // 删除该条拍卖记录
      async DelSale(workid){
        console.log(workid)
        const {data:delres}=await this.$http.get("deletework?workid="+workid);
        if(delres!='success'){
            return this.$message.error("取消失败")
        }
        else{
          this.$message.error("删除成功")
          this.Worklist.splice(this.activeWork,1)

        }
      },


      //调用数据
      getAllSaleData(){
        console.log("diaoyong")
        this.getsalework()
        this.changeclass=''
      },
      //接口数据逻辑方法
      async getsalework(){
        var queryinfo={
          query:'人物'
        }
        const {data:res}=await this.$http.get("getworklist",{param:queryinfo})
        this.Allwork=JSON.parse(JSON.stringify(res.wlist))
        var salearr=[]
        for (let index = 0; index < res.wlist.length; index++) {
          if(res.wlist[index].owntype=='出售'&&res.wlist[index].ownnerid==1){
            salearr.push(res.wlist[index])
          }
          else if(res.wlist[index].owntype=='分享'){
            
          }	
        }
        var num=Number(this.activeWork)
        this.ChoosedData=JSON.parse(JSON.stringify(salearr[num]))
        this.Worklist=JSON.parse(JSON.stringify(salearr))
        this.getnetsale()
      },


      //获取用户的相关拍卖数据
      async getnetsale(){
        var netarr=[]
        let storearr=[]
        let setarr=[]
        let worknetarr=[]
        let salearr=[]
        let tostore=[]
        var queryWorkInfo={
          workquery:this.ChoosedData.workid
        }
        const {data:res}=await this.$http.get("getnetwork",{params:queryWorkInfo})
        for (let i = 0; i < res.networkdata.length; i++) {
          if(res.networkdata[i].nettype=='出价'){
            netarr.push(res.networkdata[i])
          }	
          else if(res.networkdata[i].nettype=='关注'){
            setarr.push(res.networkdata[i])
          }
        }
        console.log("关注数据",netarr)

        //存入和作品有出价关系的用户
        for (let j = 0; j < netarr.length; j++) {
          const {data:userres}=await this.$http.get("getupdata?id="+netarr[j].netuserid);
          worknetarr=Object.assign(netarr[j],userres)
          salearr.push(worknetarr)
        }
        this.SaleData=JSON.parse(JSON.stringify(salearr))

        //存入和作品有关注关系的用户
        for (let b = 0; b < setarr.length; b++) {
          const {data:storeres}=await this.$http.get("getupdata?id="+setarr[b].netuserid);
          storearr=Object.assign(setarr[b],storeres)
          tostore.push(storearr)
        }
        this.ToStoreData=JSON.parse(JSON.stringify(tostore))
        this.getuserstore()
      },


      //获取用户关注的拍卖
      async getuserstore(){
        var userarr=[]
        var netarr=[]
        var sdata=[]
        var querynetInfo={
          netquery:this.Loginid
        }
        const {data:res}=await this.$http.get("getnetbox",{params:querynetInfo})
        for (let i = 0; i < res.netdata.length; i++) {
          if(res.netdata[i].nettype=='关注'){
            userarr.push(res.netdata[i])
          }
        }
        for (let j = 0; j < this.Allwork.length; j++) {
          for (let a = 0; a < userarr.length; a++) {
            if((this.Allwork[j].workid==userarr[a].networkid)&&this.Allwork[j].owntype=='出售'){
              netarr=Object.assign(this.Allwork[j],userarr[a])
              sdata.push(netarr)
            }
          }
        }
        this.StoreData=JSON.parse(JSON.stringify(sdata))
      }
    },
}
</script>
<style lang="scss" scoped>	
@import '../../assets/css/sale.scss';
.bianhua{
  animation: move 2s ease-in alternate;
}
@keyframes move {
  0%{
    opacity: 1;
  }
  50%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>
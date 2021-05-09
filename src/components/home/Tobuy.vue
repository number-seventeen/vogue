<template>
    <el-dialog
    :visible.sync="storecontent"
    :fullscreen="true"
    :show-close="false"
    @opened="handleopen()"
    >
        <div class="buyrule"> <span class="back" @click="Getback()">《 返回画廊</span><span style="margin-left:300px;">! 为保证公平公正的拍卖过程 请用户在参与拍卖前仔细阅读拍卖规则 若未阅读并同意拍卖规则将不能参与拍卖</span><span class="rules" @click="CheckRule()">查看拍卖规则</span></div>
        <div class="showbox">
            <div class="showtop">
                <div class="imgview"><img :src="WorkData.workurl"  /></div>
                <div class="joinbox">
                    <div class="board">
                        <span style="margin-left:-15px;">当前最高出价：</span>
                        <span>{{maxPrice}}元</span>
                        <span style="margin-left:25px;">出价者：</span>
                        <span>{{maxbelong+100}}号</span>
                    </div>
                    <div class="joincontent">
                        <div class="nowcall" v-for="(item,index) in jonnerlist" :key="index">
                            <div class="usercall">
                                <div class="callnumber">{{item.tempownner+100}}号</div>
                                <div><el-avatar class="callicon" size="large" icon="el-icon-s-custom" @error="errorHandler"></el-avatar></div> 
                            </div>
                            <div class="pricecall">
                                <!-- <div style="font-size:12px;transform:scale(0.8);margin-left:35px;">当前出价</div> -->
                                <div class="parrow"></div>
                                <div class="callprice"><span>{{item.tempprice}}</span><span style="margin-left:2px;">RMB</span></div>
                            </div>
                        </div>    
                    </div>
                    
                    <div class="joinput">
                        <div class="inputboard">
                            <div><input type="number" class="inprice" v-model="addnumber" placeholder="请输入加价金额"/></div>
                            <div class="priceicon">RMB</div>
                            <div class="autobuy"></div>
                            <div class="joinbuy" @click="Tocall()" v-show="this.isEnd==false">参与竞拍</div>
                            <div class="joinbuy" v-show="this.isEnd==true">竞拍已结束</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="showfoot">
                <div class="infos">
                    <div class="showinfo">
                        <div>画作名称：</div>
                        <div>
                            <span>《</span>
                            <span>{{WorkData.workname}}</span>
                            <span>》</span>
                        </div>
                    </div>
                    <div class="showinfo">
                        <div>作者：</div>
                        <div>
                            <span>{{WorkData.author}}</span>
                        </div>
                    </div>
                    <div class="showinfo">
                        <div>创作年份：</div>
                        <div>
                            <span>{{WorkData.maketime}}</span>
                        </div>
                    </div>
                    <div class="showinfo">
                        <div>起拍价格：</div>
                        <div>
                        
                            <span>{{WorkData.workprice}}元</span>
                            
                        </div>
                    </div>
                </div>
                <div class="moreinfo">
                    <span @click="Openinfobox()">查看更多信息</span>
                </div>
                <div class="likeinfo">
                    <div v-show="WorkData.tempmind==false" ><img @click="Changelike()"  class="heart" src="../../assets/img/dislike.png" ref="hearts"/></div>
					<div v-show="WorkData.tempmind==true" ><img @click="Changelike()"  class="heart"  src="../../assets/img/like.png" /></div>
                </div>
            </div>
        </div>
        <Rules ref="rules"></Rules>
        <Infobox ref="infobox"></Infobox>
    </el-dialog>
    
</template>

<script>
import Rules from '../Dialog/Rules.vue'
import Infobox from '../Dialog/Infobox.vue'
import { mapState, mapMutations } from 'vuex'
export default {
    components:{Rules,Infobox},
    computed: {
		...mapState({
			LoginState:state=>state.loginStore.LoginState,
            Loginid:state=>state.loginStore.Loginid,
            Readrule:state=>state.loginStore.Readrule,
            websocktData:state=>state.loginStore.websocktData,
		})
		
    },
    watch:{
        msg:{
            handler:function(newval,oldval){
                console.log("接收到了",newval)
            }
        },
        storecontent:{
            handler:function(newval){
                this.isEnd=false
                if(newval==true){
                    var jonarr=[]
                    console.log("接收接收",this.WorkData)
                    jonarr.push(this.WorkData)
                    this.jonnerlist=JSON.parse(JSON.stringify(jonarr))
                    this.maxPrice=this.jonnerlist[0].tempprice
                    this.maxbelong=this.jonnerlist[0].tempownner
                    this.Getnetlike()
                    this.buytimer=setInterval(() => {
                        this.Watchtime()
                    }, 1000);
                }
            }
        },
        websocktData:{
            handler:function(newval,oldval){
                // console.log("fff",newval)
                if(newval.type=='出价信息'&&newval.workid==this.WorkData.workid){
                    this.Setlist(this.WorkData.workid)
                }
                if(newval.type=='结束通知'){
                    this.RESETWEB()
                }
            }
        },
        
    },
    data(){
        return{
            storecontent:false,
            routetype:'',
            userName:'wang',
            isEnd:false,
            rulecheck:false,//是否阅读规则
            circleUrl: require('../../assets/img/15.jpg'),
            addnumber:null,
            WorkData:[],
            jonnerlist:[],
            NetData:[],
            maxPrice:0,
            maxbelong:0,
            msg:'',
            Dhours:0,
			Dminutes:0,
            Dseconds:0,
            buytimer:null,
        }
    },
    beforeDestroy() { // 离开页面生命周期函数
        clearInterval(this.buytimer)
    },
    methods:{
        handleopen(){
        },
        
        errorHandler() {
            return true
        },
        handleback(){
        },
        CheckRule(){
            this.$refs.rules.RuleDialog=true
        },
        Openinfobox(){
            this.$refs.infobox.workinfo=this.WorkData
            this.$refs.infobox.infodialog=true
        },

        Watchtime(){
            var m=this.WorkData.endtime
            var t=0
            var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
            var nowDate = new Date(m).getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
            var target = new Date(nowDate + offset_GMT * 60 * 1000  );
            console.log("-8的时间",target)
            var dateend=target;
            console.log("ting",dateend)
            var datenow=new Date();
			let timestampend = dateend.getTime()
            let timestampnow = datenow.getTime()
			if(timestampend>timestampnow){
                this.ChangeStamp(timestampnow,timestampend)
            }
            else{
                clearInterval(this.buytimer)
                this.isEnd=true
                this.SendEnduser()
                this.SendEndwork()
                
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
            console.log(this.Dhours,this.Dminutes,this.Dseconds)
        },
        

        Getback(){
            // this.$parent.GetWorklist()
            if(this.routetype=='home'||this.routetype=='deal'){
                this.$parent.GetWorklist()
            }
            else if(this.routetype=='card'){
                console.log("返回过去的作品数据",this.WorkData)
                this.$parent.$parent.$refs.salecard.Resetwork(this.WorkData)
            }
            this.addnumber=null
            this.storecontent=false
        },
        Tocall(){
            if(this.Readrule==true){
                console.log(this.addnumber,this.WorkData)
                this.Changedata()
            }
            else{
                this.$notify({
                    message: '请先阅读并同意拍卖规则才可参拍',
                    position: 'top-left',
                    offset: 40
                }); 
            }
            
        },
        Changelike(){
			if(this.WorkData.tempmind==false){
				this.Setlike()
			}
			else if(this.WorkData.tempmind==true){
				this.Delike()
			}
        },
        changeTime(time){
            var t=0
            var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
            var nowDate = new Date(time).getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
            var target = new Date(nowDate + offset_GMT * 60 * 1000  );
            var date = target;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            console.log("changetimetime",time)
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y+M+D+h+m+s 
        },   
        

        //获取与当前登录用户有关的数据
        async Getnetlike(){
            this.WorkData.tempmind=false
			var likelist=[]
			var querynetInfo={
				netquery:this.Loginid
			}
			const {data:res}=await this.$http.get("getnetbox",{params:querynetInfo})
            this.NetData=JSON.parse(JSON.stringify(res.netdata))
            console.log("这是作品关系表数据",this.WorkData,this.NetData)
            for (let a = 0; a < this.NetData.length; a++) {
				if(this.NetData[a].nettype=='关注'){
                    if(this.WorkData.workid==(this.NetData[a].networkid)){
                        this.WorkData.tempmind=true
                    }
				}	
			}
        },

        
        //向数据库中添加对应的收藏关系
        async Setlike(){
			let form={
				netuserid:this.Loginid,
				networkid:this.WorkData.workid,
				nettype:'关注',
				comment:''
			}
			const {data:res}=await this.$http.post("addnetbox",form)
			if(res!='success'){
				return this.$message.error("关注失败")
			}
			else{
                console.log("关注了吗",this.WorkData.tempmind)
				this.WorkData.tempmind=true
				this.Editwork()
				var querynetInfo={
					netquery:this.Loginid
				}
				const {data:res}=await this.$http.get("getnetbox",{params:querynetInfo})
				this.NetData=JSON.parse(JSON.stringify(res.netdata))

			}
		},
		async Delike(){
			for (let i = 0; i < this.NetData.length; i++) {
				if((this.NetData[i].networkid==this.WorkData.workid)&&this.NetData[i].nettype=='关注'){
					console.log("需要取消的关系ID为：",this.NetData[i].netboxid)
					const {data:delres}=await this.$http.get("deletenetbox?Netboxid="+this.NetData[i].netboxid);
					if(delres!='success'){
						return this.$message.error("取消失败")
					}
					else{
						this.WorkData.tempmind=false
						this.Editwork()
						var querynetInfo={
							netquery:this.Loginid
						}
						const {data:res}=await this.$http.get("getnetbox",{params:querynetInfo})
						this.NetData=JSON.parse(JSON.stringify(res.netdata))
					}
				}
			}
		},

		async Editwork(){
			let form={
				workid:this.WorkData.workid,
				owntype:this.WorkData.owntype,
				worktype:this.WorkData.worktype,
				workname:this.WorkData.workname,
				maketime:this.WorkData.maketime,
				storetotal:this.WorkData.storetotal,
				ideaword:this.WorkData.ideaword,
				loadtime:this.changeTime(this.WorkData.loadtime),
				endtime:this.changeTime(this.WorkData.endtime),
				salecompany:this.WorkData.salecompany,
				author:this.WorkData.author,
				ownnerid:this.WorkData.ownnerid,
				workurl:this.WorkData.workurl,
				workprice:this.WorkData.workprice,
				tempownner:this.WorkData.tempownner,
				tempprice:this.WorkData.tempprice,
                tempstore:false,
                tempmind:false
			}
			const {data:res}=await this.$http.put("editwork",form)
			
		},


        async Changedata(){
            var arr=JSON.parse(JSON.stringify(this.WorkData))
            arr.tempprice=arr.tempprice+Number(this.addnumber)
            arr.tempownner=this.Loginid   
            arr.loadtime=this.changeTime(arr.loadtime)
            arr.endtime=this.changeTime(arr.endtime),
            console.log("传的参数",arr)
            const {data:res}=await this.$http.put("editwork",arr)
            if(res!="success") return ;
            else{
                this.Addsalenet(arr.tempprice)
                this.GetWorksocket()
                // this.getidwork()//根据id查找到油画数据
            }
            this.addnumber=null
        },
        async Setlist(id){
            const {data:res}=await this.$http.get("getworkupdata?workid="+id);
            this.WorkData=res; 
            this.Getnetlike()
            this.jonnerlist.push(this.WorkData)
            console.log("出价记录",this.jonnerlist)
            this.maxPrice=this.jonnerlist[this.jonnerlist.length-1].tempprice
            this.maxbelong=this.jonnerlist[this.jonnerlist.length-1].tempownner
        },
        async Addsalenet(price){
            let form={
                netuserid:this.Loginid,
                networkid:this.WorkData.workid,
                nettype:'出价',
                comment:price.toString()
            }
            const {data:res}=await this.$http.post("addnetbox",form)
        },
        async GetWorksocket(){
            let para='call'+this.WorkData.workid.toString()
			const {data:res}=await this.$http.get("/news/sendAllWebSocket/"+para)
        },

        async SendEnduser(){
            var worksname=this.WorkData.workname
            let form={
                messagetype:'竞拍成功通知',
                messagecontent:'您已成功竞拍到《'+worksname.toString()+'》'+'请点击信息查看详情并填写相关收货地址',
                ownnerid:this.maxbelong,
                wid:this.WorkData.workid
            }
            const {data:res}=await this.$http.post("addmessage",form)
            if(res!='success'){
                return this.$message.error("发送失败")
            }
            
            
        },
        async SendEndwork(){
            this.changework()
            //通知其他用户竞拍已结束更新页面
            let para='endw'+this.WorkData.workid.toString()
			const {data:res}=await this.$http.get("/news/sendAllWebSocket/"+para)
        },
        async changework(){
            let form={
				workid:this.WorkData.workid,
				owntype:"购买",
				worktype:this.WorkData.worktype,
				workname:this.WorkData.workname,
				maketime:this.WorkData.maketime,
				storetotal:this.WorkData.storetotal,
				ideaword:this.WorkData.ideaword,
				loadtime:this.changeTime(this.WorkData.loadtime),
				endtime:this.changeTime(this.WorkData.endtime),
				salecompany:this.WorkData.salecompany,
				author:this.WorkData.author,
				ownnerid:this.maxbelong,
				workurl:this.WorkData.workurl,
				workprice:this.WorkData.workprice,
				tempownner:this.maxbelong,
				tempprice:this.maxPrice,
                tempstore:false,
                tempmind:false
			}
            const {data:editres}=await this.$http.put("editwork",form)
        },
        RESETWEB(){
            this.isEnd=true
            this.$message.info('当前竞拍已结束，将在10秒后关闭页面')
            setTimeout(() => {
                this.storecontent=false
            }, 10000);

        }
        

    },
}
</script>

<style lang="scss"  scoped>
@import '../../assets/css/tobuy.scss';
/deep/ .el-dialog__header{
    display: none;
}
</style>
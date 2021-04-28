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
                            <div class="joinbuy" @click="Tocall()">参与竞拍</div>
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
		})
		
    },
    watch:{
        msg:{
            handler:function(newval,oldval){
                console.log("接收到了",newval)
            }
        }
    },
    data(){
        return{
            storecontent:false,
            routetype:'',
            userName:'wang',
            websocket:null,//websocket传送接口
            rulecheck:false,//是否阅读规则
            circleUrl: require('../../assets/img/15.jpg'),
            addnumber:null,
            WorkData:[],
            jonnerlist:[],
            NetData:[],
            maxPrice:0,
            maxbelong:0,
            msg:'',
        }
    },
    created() { // 页面创建生命周期函数
        console.log("hao")
            this.websocket = new WebSocket("ws://localhost:9000/websocket/"+ this.userName);
            this.initWebSocket()
            
    },
    beforeDestroy() { // 离开页面生命周期函数
            this.onbeforeunload()
    },
    methods:{
        handleopen(){
            console.log("接收接收",this.WorkData)
            // this.websocket = new WebSocket("ws://localhost:9000/websocket/"+ this.userName);
            // this.initWebSocket()
            this.jonnerlist.push(this.WorkData)
            this.maxPrice=this.jonnerlist[0].tempprice
            this.maxbelong=this.jonnerlist[0].tempownner
            this.Getnetlike()
        },
        initWebSocket () {
            // 连接错误
            this.websocket.onerror = this.setErrorMessage
    
            // 连接成功
            this.websocket.onopen = this.setOnopenMessage
    
            // 收到消息的回调
            this.websocket.onmessage = this.setOnmessageMessage
    
            // 连接关闭的回调
            this.websocket.onclose = this.setOncloseMessage
    
            // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = this.onbeforeunload
        },
        setErrorMessage () {
            console.log('Web连接发生错误   状态码：' + this.websocket.readyState)
        },
        setOnopenMessage () {
            console.log('Web连接成功    状态码：' + this.websocket.readyState)
        },
        setOnmessageMessage (event) {
            // 根据服务器推送的消息做自己的业务处理
            // this.$message.success('服务端返回：' + event.data)
            console.log('购买页面的服务端返回：' , event.data)
            let id=Number(event.data)
            this.Setlist(id)
        },
        setOncloseMessage () {
            console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
        },
        onbeforeunload () {
            this.closeWebSocket()
        },
        closeWebSocket () {
            this.websocket.close()
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
        Getback(){
            // this.$parent.GetWorklist()
            if(this.routetype=='home'||this.routetype=='deal'){
                this.$parent.GetWorklist()
            }
            else if(this.routetype=='card'){
                console.log(this.$parent)
                this.$parent.$parent.getAllSaleData()
                this.$parent.$parent.Changetag(2)
            }
            this.WorkData=[]
            this.jonnerlist=[]
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
            var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
			var likelist=[]
			var querynetInfo={
				netquery:this.Loginid
			}
			const {data:res}=await this.$http.get("getnetbox",{params:querynetInfo})
			console.log("这是关系表数据",this.WorkData)
            this.NetData=JSON.parse(JSON.stringify(res.netdata))
            for (let i = 0; i < this.WorkData.length; i++) {
				for (let a = 0; a < this.NetData.length; a++) {
					if((this.WorkData[i].workid==this.NetData[a].networkid)&&this.NetData[a].nettype=='关注'){
						this.WorkData[i].tempmind=true
					}
					else{
						this.WorkData[i].tempmind=false
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
				this.Editwork(true)
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
						this.Editwork(false)
						var querynetInfo={
							netquery:this.Loginid
						}
						const {data:res}=await this.$http.get("getnetbox",{params:querynetInfo})
						this.NetData=JSON.parse(JSON.stringify(res.netdata))
					}
				}
			}
		},

		async Editwork(state){
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


        async Setlist(id){
            const {data:res}=await this.$http.get("getworkupdata?workid="+id);
            this.WorkData=res; 
            this.Getnetlike()
            this.jonnerlist.push(this.WorkData)
            this.maxPrice=this.jonnerlist[0].tempprice
            this.maxbelong=this.jonnerlist[0].tempownner
        },
        async Changedata(){
            var arr=JSON.parse(JSON.stringify(this.WorkData))
            arr.tempprice=arr.tempprice+Number(this.addnumber)
            arr.tempownner=this.Loginid   
            arr.loadtime=this.changeTime(arr.loadtime)
            console.log("传的参数",arr)
            const {data:res}=await this.$http.put("editwork",arr)
            if(res!="success") return ;
            else{
                this.GetWorksocket()
                // this.getidwork()//根据id查找到油画数据
            }
        },
        async GetWorksocket(){
            let para=this.WorkData.workid.toString()
			const {data:res}=await this.$http.get("/news/sendAllWebSocket/"+para)
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
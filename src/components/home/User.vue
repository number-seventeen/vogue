<template>
    <el-dialog
    :visible.sync="userdialog"
    :fullscreen="true"
    :show-close="false"
    :before-close="handleClose"
    @opened="handleopen()"
    custom-class="userbox">
        <div class="background">
            <img :src="bk" class="backimg" />
        </div>
        <div class="content">
            <div class="usernav">
                <div class="Navs" ><div v-show="Catchtype=='right'" class="nlist" :class="{cuNav:index==Navnum}" v-for="(item,index) in navlist " :key="index" @click="ChangeNav(index)"><i :class="item.icon" ></i>{{item.name}}</div> </div>
                <div class="backbox">
                    <span @click="handleClose()"><i class="el-icon-arrow-left"  style="font-weight:600;font-size:12px;" ></i>返回画廊</span>
                </div>
            </div>
            <div class="center">
                <div class="leftcenter">
                    <div class="uinfo">
                        <div class="uicon">
                            <div style="border:1px solid rgb(236, 236, 236); width:90px;height:90px;margin-left:120px; border-radius:50px;">
                                <el-avatar :size="90" :src="usericon" class="icons"></el-avatar>
                                <el-upload
                                    ref="userupload"
                                    class="avatarups"
                                    action="#"
                                    list-type="picture-card"
                                    :limit="1"
                                    :show-file-list="false"
                                    :on-change="getFile" 
                                    :auto-upload="false"
                                    
                                    >
                                    <div slot="trigger" class="editicon" v-show="Catchtype=='right'"><i  class="el-icon-edit-outline "></i></div>
                                </el-upload>
                            </div>
                            
                        </div> 
                        <div class="infos">
                            <div class="uname">{{UserInfo.truename}}</div>
                            <div class="intro">
                                <span>{{UserInfo.breif}}</span>
                            </div>
                            <div class="call">
                                <i class="el-icon-postcard"></i>
                                <span class="fo">用户昵称:</span>{{UserInfo.username}}
                            </div>
                            <div class="email">
                                <i class="el-icon-house"></i>
                                <span class="fo">联系邮箱:</span>{{UserInfo.email}}
                            </div>
                            <div class="workfrom">
                            <i class="el-icon-location-outline"></i>
                                <span class="fo">现居地址:</span>{{UserInfo.address}}
                            </div>
                            <div class="experience">
                                <i class="el-icon-timer"></i>
                                <span class="fo">创作经验:</span>{{UserInfo.workyear}}年
                            </div>
                            
                        </div>  
                       
                        <div class="profileset">
                            <i class="el-icon-setting" style="margin-top:10px;margin-left:10px;font-size:25px;" v-show="Catchtype=='right'"></i>
                            <span style="font-size:17px;margin-top:13px;margin-left:5px;" @click="EditMsg()" v-show="Catchtype=='right'">修改资料</span> 
                        </div> 
                    </div>
                    <div class="life">
                        <div class="historylife" v-show="Catchtype=='right'">历史成交记录</div>
                        <div class="historylife" v-show="Catchtype=='noright'">历史动态</div>
                        <div class="historycont" v-show="Catchtype=='right'">
                            <ul>
                                <li class="hactionlist"  v-for="(deal,index) in dealist" :key="index">
                                    <div class="haction">
                                        <div class="hcont">
                                            <div class="himg" >
                                                <img :src="deal.workurl" style="width:310px;height:220px;" />
                                            </div>
                                        </div>
                                        <div class="htime">
                                            <div style="width:270px;"><span style="font-size:12px;margin-left:3px;">订单创建时间：{{getTime(deal.endtime)}}</span></div>
                                            <div style="width:40px;" >
                                                <!-- <span style="margin-left:0px;">详情</span> -->
                                                <span style="margin-left:14px;" @click="Delorder(index)">删除</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="historycont" v-show="Catchtype=='noright'">
                            <ul>
                                <li class="hactionlist"  v-for="(action,index) in actionlist" :key="index">
                                    <div class="haction">
                                        <div class="hcont">
                                            <div class="himg" >
                                                <img :src="action.workurl" style="width:310px;height:220px;" />
                                            </div>
                                        </div>
                                        <div class="htime">
                                            <div style="width:270px;"><span style="font-size:12px;">上传时间：{{getTime(action.loadtime)}}</span></div>
                                            <div style="width:40px;" >
                                                <span style="margin-left:14px;"></span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Message ref="message"></Message> 
        <CheckUser ref="checkuser"></CheckUser>
    </el-dialog>
</template>

<script>
import Message from '../Dialog/Message.vue'
import CheckUser from '../Dialog/CheckUser.vue'
import Collection from '../Dialog/Collection.vue'
import Golden from '../Dialog/Golden.vue'
import { mapState, mapMutations } from 'vuex'
export default {
    components:{Message,CheckUser,Collection,Golden},
    computed: {
      ...mapState({
        LoginState:state=>state.loginStore.LoginState,
        Loginid:state=>state.loginStore.Loginid,
        websocktData:state=>state.loginStore.websocktData,
      }) 
    },
    data(){
        return{
            userdialog: false,
            bk:require('../../assets/img/52.jpg'),
            fileList:[],
            usericon:'',
            imgFile:'',
            fileName:'',
            proofImage:'',
            Navnum:null,
            upurl:"https://jsonplaceholder.typicode.com/posts/",
            Catchtype:'',
            Catchid:0,
            NetData:[],
            UserInfo:{},
            Messagedata:[],
            navlist:[
                {
                    name:"消息通知",
                    icon:"el-icon-message"
                    
                },
            ],
            actionlist:[],
            dealist:[],
        }
    },
    watch:{
        userdialog:{
            handler:function(){
                if(this.userdialog==true){
                    this.getUserlist()  
                    this.GetMessage()
                }
            }
        },
        websocktData:{
            handler:function(newval,oldval){
                this.RESETWEB(newval)
               
            }
        },
    },
    methods:{
        async getUserlist(){
            console.log("传送的id",this.Catchtype)
            const {data:userres}=await this.$http.get("getupdata?id="+this.Catchid);
            this.usericon=userres.uicon
            this.UserInfo=userres
            
            console.log("查询到了用户信息",this.UserInfo)
            this.getShare()
        },
        async getShare(){
            var actionarr=[]
            var buyarr=[]
            var queryinfo={
            query:'人物'
            }
            const {data:res}=await this.$http.get("getworklist",{param:queryinfo})
            for (let j = 0; j < res.wlist.length; j++) {
                if(res.wlist[j].owntype=='分享'&&res.wlist[j].ownnerid==this.Catchid){
                    actionarr.push(res.wlist[j])
                }
                if(res.wlist[j].owntype=='购买'){
                    buyarr.push(res.wlist[j])
                }
            }
            this.actionlist=JSON.parse(JSON.stringify(actionarr))
            this.dealist=JSON.parse(JSON.stringify(buyarr))
            console.log("分享数据",this.dealist)

        },

        async Delorder(index){
            const confirmResult =await this.$confirm('确认删除该订单吗',{
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'info'
			}).catch(err => err)
			if(confirmResult!='confirm'){//取消
				return;
            }
            else{
                var netarr=[]
                var queryWorkInfo={
                    workquery:this.dealist[index].workid
                }
                console.log(this.dealist[index].workid)
                const {data:res}=await this.$http.get("getnetwork",{params:queryWorkInfo}) 
                this.delnetwork(res.networkdata,this.dealist[index].workid)
            }
        },
        async delnetwork(data,workid){
            console.log("sss",data)
            for (let i = 0; i < data.length; i++) {
                const {data:delres}=await this.$http.get("deletenetbox?Netboxid="+data[i].netboxid);
                if(delres!='success'){
                    console.log("分享板块历史动态删除失败")
                } 
                
            }
            this.delwork(workid)
            
        },
        async delwork(id){
            const {data:workres}=await this.$http.get("deletework?workid="+id)
			if(workres!='success'){
				return this.$message.error("删除失败")
			}
			else{
                this.$message.info("删除成功")
                this.getShare()
			}
        },

        async UpdateUser(params){
            var info=params[0]+','+params[1]
            console.log(typeof(info))
            this.UserInfo.uicon=info
            console.log("传入的用户信息",info)
            const {data:res}=await this.$http.put("edituser",this.UserInfo)
            if(res!="success") return this.$message.error("操作失败")
            else{
                this.$message.info("修改成功")
            }
        },

        async GetMessage(){
            var queryMessageInfo={
                messagequery:this.Loginid
            }
            const {data:res}=await this.$http.get("allmessage",{params:queryMessageInfo})
            this.Messagedata=JSON.parse(JSON.stringify(res.messagedata))
            console.log("信息信息",res.messagedata)
        },
           

        handleopen(){
            
        },
        handleClose() {
            this.userdialog=false
        },
        ChangeNav(index){
            this.Navnum=index
            this.$refs.message.messagelist=this.Messagedata
            this.$refs.message.messagetype=index
            this.$refs.message.ToMessage=true
        },
        EditMsg(){
            this.$refs.checkuser.editform.truename=this.UserInfo.truename
            this.$refs.checkuser.editform.username=this.UserInfo.username
            this.$refs.checkuser.editform.password=this.UserInfo.password
            this.$refs.checkuser.editform.email=this.UserInfo.email
            this.$refs.checkuser.editform.uicon=this.usericon
            this.$refs.checkuser.editform.address=this.UserInfo.address
            this.$refs.checkuser.editform.workyear=this.UserInfo.workyear
            this.$refs.checkuser.editform.breif=this.UserInfo.breif
            this.$refs.checkuser.editform.id=this.UserInfo.id
            this.$refs.checkuser.ToCheck=true
        },
        handleAvatarSuccess(res, file) {
            this.usericon = URL.createObjectURL(file.raw);
            this.$notify({
                title: '',
                message: '上传成功',
                position: 'top-left'
            });
        },
        handleAvatarFail(err, file, fileList){
            this.$notify({
                title: '',
                message: '上传失败',
                position: 'top-left'
            });
        },
        getFile(file, fileList) {
            var _this=this
            this.getBase64(file.raw).then(res => {
                const params = res.split(',')
                if (params.length > 0) {
                    _this.proofImage = params[1]
                }
                // console.log(params, 'params')
                _this.UpdateUser(params)
                _this.usericon=params[0]+','+params[1]
                
                
            })
            
        },
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                const reader = new FileReader()
                let imgResult = ''
                reader.readAsDataURL(file)
                reader.onload = function () {
                imgResult = reader.result
                }
                reader.onerror = function (error) {
                    reject(error)
                }
                reader.onloadend = function () {
                    resolve(imgResult)
                }
            })
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
        
        //接收websocket传过来的消息后进行渲染处理
        RESETWEB(data){
            if(data.type=='结束通知'){
                this.GetMessage()
            }
        }
    }

}
</script>

<style lang="scss" scoped>
@import '../../assets/css/user.scss';
/deep/ .userbox{   
    background: rgba(255, 255, 255, 0);
    .el-dialog__header {
        display: none;
    }
    .el-dialog__body{
        padding: 0px;
        .avatarups{
            height: 10px;
            .el-upload--picture-card{
                width: 0px;
                height: 0px;
                border: none;
                outline: none;
                .el-icon-edit-outline {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
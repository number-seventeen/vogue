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
                                    :on-success="handleAvatarSuccess"
                                    :on-change="handleChange" 
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
                                            <div style="width:250px;"><span style="font-size:12px;">订单创建时间：{{getTime(deal.endtime)}}</span></div>
                                            <div style="width:60px;" >
                                                <span style="margin-left:0px;">详情</span>
                                                <span style="margin-left:9px;">删除</span>
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
                                            <div style="width:250px;"><span style="font-size:12px;">上传时间：{{getTime(action.loadtime)}}</span></div>
                                            <div style="width:60px;" >
                                                <span style="margin-left:0px;">详情</span>
                                                <span style="margin-left:9px;">删除</span>
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
      }) 
    },
    data(){
        return{
            userdialog: false,
            bk:require('../../assets/img/52.jpg'),
            usericon:'',
            Navnum:null,
            upurl:"https://jsonplaceholder.typicode.com/posts/",
            Catchtype:'',
            Catchid:0,
            NetData:[],
            UserInfo:{},
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
                }
            }
        }
    },
    methods:{
        async getUserlist(){
            console.log("传送的id",this.Catchtype)
            const {data:userres}=await this.$http.get("getupdata?id="+this.Catchid);
            this.usericon=userres.uicon
            this.UserInfo=userres
            this.$refs.checkuser.editform.truename=this.UserInfo.truename
            this.$refs.checkuser.editform.username=this.UserInfo.username
            this.$refs.checkuser.editform.password=this.UserInfo.password
            this.$refs.checkuser.editform.email=this.UserInfo.email
            this.$refs.checkuser.editform.uicon=this.UserInfo.uicon
            this.$refs.checkuser.editform.address=this.UserInfo.address
            this.$refs.checkuser.editform.workyear=this.UserInfo.workyear
            this.$refs.checkuser.editform.breif=this.UserInfo.breif
            this.$refs.checkuser.editform.id=this.UserInfo.id
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

        handleopen(){
            
        },
        handleClose() {
            this.userdialog=false
        },
        ChangeNav(index){
            this.Navnum=index
            this.$refs.message.ToMessage=true
            this.$refs.message.messagetype=index
        },
        EditMsg(){
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
        handleChange(file, fileList){
            console.log(file)
            this.usericon=file.url
            if(file.url!=''){
                this.UpdateUser()
            } 
        },

        async UpdateUser(){
            this.UserInfo.uicon=this.usericon
            const {data:res}=await this.$http.put("edituser",this.UserInfo)
            if(res!="success") return this.$message.error("操作失败")
            else{
                this.$message.success("修改成功")
            }
        },

        //转换时间戳
		getTime (time) {
			var date = new Date(time)
			var y = date.getFullYear()
			var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
			var d = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
			return y + '-' + m + '-' + d
		},
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
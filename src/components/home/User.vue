<template>
  <div>
    <div class="background">
			<!-- <img :src="bk" class="backimg" /> -->
	</div>
    <div class="content">
        <div class="usernav">
            <div class="Navs"><div class="nlist" :class="{cuNav:index==Navnum}" v-for="(item,index) in navlist " :key="index" @click="ChangeNav(index)"><i :class="item.icon" ></i>{{item.name}}</div> </div>
            <div class="backbox">
                <router-link to="/Homepage" style="color:rgb(87, 120, 180);font-family:DZF;position:relative;top:12px;left:100px;"><i class="el-icon-arrow-left"  style="font-weight:600;font-size:12px;" />返回画廊</router-link>
            </div>
        </div>
        <div class="center">
            <div class="leftcenter">
                <div class="uinfo">
                    <div class="uicon">
                        <div style="border:1px solid rgb(236, 236, 236); width:90px;height:90px;margin-left:120px; border-radius:50px;">
                            <!-- <el-avatar :size="90" :src="usericon" class="icons"></el-avatar> -->
                            <el-upload
                                ref="userupload"
                                class="avatar-uploader"
                                :action="upurl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :on-change="handlechange" 
                                :on-error="handleAvatarFail"
                            >
                                <el-avatar :size="90" :src="usericon" class="icons"></el-avatar>
                                <div slot="trigger" class="editicon" ><i  class="el-icon-edit-outline "></i></div>
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
                    <div class="response">
                        <div style="text-align:center;margin-top:16px;margin-bottom:12px;font-size:19px;"><i class="el-icon-collection" style="margin-right:5px;"></i>代表作品</div>
                            <div v-for="(resp,index) in resps" :key="index" style="margin-top:12px;text-align:center;font-size:17px;transform:scale(0.92);"><span>《</span> {{resp.name}} <span>》</span></div>
                        </div>
                    <div class="profileset">
                         <i class="el-icon-setting" style="margin-top:10px;margin-left:10px;font-size:25px;"></i>
                             <span style="font-size:17px;margin-top:13px;margin-left:5px;" @click="EditMsg()">修改资料</span> 
                    </div> 
                </div>
                <div class="life">
                    <div class="historylife">历史成交记录</div>
                    <div class="hostoryedit">
                            <!-- <span class="record" style="float:right;"><i class="el-icon-s-operation"></i>编辑</span> -->
                    </div>
                    <div class="historycont">
                        <ul>
                            <li class="hactionlist"  v-for="(action,index) in actionlist" :key="index">
                                <div class="haction">
                                    <div class="hcont">
                                        <div  class="hvideo" v-show="action.type=='video'">
                                            <video :src="action.url" style="width:310px;height:220px;object-fit:fill;"></video>
                                            <!-- <div v-show: style="font-size:45px; width:310px;height:220px;background:gray;opacity:0.3;text-align:center;line-height:220px;margin-top:-226px;"><i class="el-icon-video-play"></i></div> -->
                                        </div>
                                        <div class="himg" v-show="action.type=='img'">
                                            <img :src="action.url" style="width:310px;height:220px;" />
                                        </div>
                                    </div>
                                    <div class="htime">
                                        <div style="width:250px;"><span style="font-size:12px;font-family:DZF;margin-left:5px;">2020年10月25日</span></div>
                                        <div style="width:60px;">
                                            <i class="el-icon-view" style="font-weight:600;margin-left:15px;color: rgb(194, 205, 212);"></i>
                                            <i class="el-icon-delete" style="font-weight:600;margin-left:10px;color: rgb(194, 205, 212);"></i>
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
  </div>
</template>

<script>
import Message from '../Dialog/Message.vue'
import CheckUser from '../Dialog/CheckUser.vue'
import Collection from '../Dialog/Collection.vue'
import Golden from '../Dialog/Golden.vue'
export default {
    components:{Message,CheckUser,Collection,Golden},
    data(){
        return{
            bk:require('../../assets/img/52.jpg'),
            usericon:require('../../assets/img/69.jpg'),
            Navnum:null,
            upurl:"https://jsonplaceholder.typicode.com/posts/",
            queryUserInfo:{
                userquery:"wjq",
            },
            UserInfo:{
                username:'',
				password:'',
				uicon:'',
				truename:'',
				email:'',
				address:'',
				workyear:'',
				breif:'',
            },
            navlist:[
                {
                    name:"消息通知",
                    icon:"el-icon-message"
                    
                },
            ],
            resps:[
                {
                    name:"苹果熟了"
                },
                {
                    name:"彩虹悄然当空"
                },
                {
                    name:"虚拟时光系列"
                },
                {
                    name:"一个铺满黄金的夏天"
                },
            ],
            actionlist:[
                {
                    acid:0,
                    type:"video",
                    url:require("../../assets/img/movie2.mp4")

                },
                {
                    acid:0,
                    type:"img",
                    url:require("../../assets/img/65.jpg")

                },
                {
                    acid:0,
                    type:"video",
                    url:require("../../assets/img/movie2.mp4")
                },
                {
                    acid:0,
                    type:"img",
                    url:require("../../assets/img/61.jpg")
                },
                {
                    acid:0,
                    type:"img",
                    url:require("../../assets/img/62.jpg")
                },
                {
                    acid:0,
                    type:"img",
                    url:require("../../assets/img/65.jpg")
                },
                {
                    acid:0,
                    type:"img",
                    url:require("../../assets/img/65.jpg")
                },

            ]
        }
    },
    mounted(){
       this.getUserlist()  
    },
    methods:{
        async getUserlist(){
            const {data:res}=await this.$http.get("alluser",{params:this.queryUserInfo})
            console.log("返回的res",res)
            this.UserInfo=res.data[0]
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
        handlechange(file, fileList){
            
        },
    }

}
</script>

<style src='../../assets/css/user.css' scoped>

</style>
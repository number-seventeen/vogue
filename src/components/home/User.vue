<template>
  <div>
    <div class="background">
			<!-- <img :src="bk" class="backimg" /> -->
	</div>
    <div class="content">
        <div class="usernav">
            <div class="nlist" v-for="(item,index) in navlist " :key="index"><i :class="item.icon" ></i>{{item.name}}</div>  
            <div><router-link to="/Homepage" style="color:rgb(87, 120, 180);font-family:DZF;position:absolute;margin-top:18px;margin-left:450px;"><i class="el-icon-arrow-left"  style="font-weight:600;font-size:12px;position:absolute;margin-left:-12px;margin-top:2px;" />返回画廊</router-link></div>
        </div>
        <div class="center">
            <div class="leftcenter">

                <div class="uinfo">
                    <div class="uicon">
                        <div style="border:1px solid rgb(236, 236, 236); width:90px;height:90px;margin-left:85px; border-radius:50px;"><el-avatar :size="90" :src="usericon" class="icons"></el-avatar></div>
                        <div class="editicon"><i class="el-icon-edit-outline"></i></div>
                    </div> 
                    <div class="infos">
                        <div class="uname">庞茂琨</div>
                        <div class="intro">
                            <span>庞茂琨，1963年生于重庆，1978年至1981年就读于四川美术学院附中，1981年至1988年就读于四川美术学院油画系并获油画专业硕士学位，现为四川美术学院院长、重庆美术家协会副主席，重庆画院院长，重庆美术馆执行馆长，中国美术家协会理事，中国美术家协会油画艺委会副主任,中国油画学会理事。</span>
                        </div>
                        <div class="call">
                            <i class="el-icon-postcard"></i>
                            <span class="fo">用户昵称:</span>芒果夹心奥利奥
                        </div>
                        <div class="email">
                            <i class="el-icon-house"></i>
                            <span class="fo">联系邮箱:</span>507289940@qq.com
                        </div>
                        <div class="workfrom">
                           <i class="el-icon-location-outline"></i>
                            <span class="fo">画作来源:</span>明日工作室
                        </div>
                        <div class="experience">
                            <i class="el-icon-timer"></i>
                            <span class="fo">创作经验:</span>9年
                        </div>
                        
                    </div>  
                    <div class="response">
                        <div style="text-align:center;margin-top:16px;margin-bottom:12px;font-size:14px;"><i class="el-icon-collection" style="margin-right:5px;"></i>代表作品</div>
                            <div v-for="(resp,index) in resps" :key="index" style="margin-top:6px;text-align:center;font-size:12px;transform:scale(0.92);"><span>《</span> {{resp.name}} <span>》</span></div>
                        </div>
                    <div class="profileset">
                         <i class="el-icon-setting" style="margin-top:10px;margin-left:10px;"></i>
                             <span style="font-size:13px;margin-top:14px;margin-left:5px;">修改资料</span> 
                    </div> 
                </div>
                <div class="life">
                    <div class="historylife">历史动态</div>
                    <div class="hostoryedit">
                            <span class="record" style="float:right;"><i class="el-icon-s-operation"></i>编辑历史动态</span>
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
                                        <div style="width:150px;"><span style="font-size:12px;font-family:DZF;margin-left:5px;">2020年10月25日</span></div>
                                        <div style="width:160px;"><i class="el-icon-arrow-down" style="font-weight:600;margin-left:0px;"></i></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            bk:require('../../assets/img/52.jpg'),
            usericon:require('../../assets/img/69.jpg'),
            navlist:[
                {
                    name:"消息通知",
                    icon:"el-icon-message"

                },
                {
                    name:"实名认证",
                    icon:"el-icon-user"
                },
            
                {
                    name:"我的积分",
                    icon:"el-icon-star-off"
                },
                {
                    name:"我的收藏",
                    icon:"el-icon-collection-tag"
                },
                {
                    name:"荣誉奖杯",
                    icon:"el-icon-trophy"
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
    }

}
</script>

<style src='../../assets/css/user.css' scoped>

</style>
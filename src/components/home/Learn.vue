<template>
    <div>
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
                               <el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);"></span></router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);">返回首页</span></router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/User"><span style="color: rgb(129, 147, 167);">个人中心</span></router-link></el-dropdown-item>
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
                <div class="learnpack">
                    <div class="learnsort">
                        <span style="margin-left:20px; font-size:20px; ">分类</span>
                        <span class="learntag" v-for="(tage,index) in tags" :key="index" @click="ChangeTag(index)" :class="{cutag:index===tagid}">={{tage.name}}=</span>
                    </div>
                    <div class="learnbox" >
    <!-- 文章 -->
                        <div class="article" v-show=" tagname=='article' ">
                            <div class="study" v-for="(learn,index) in articlelist" :key="index" @mouseover="handleview(index)" @mouseout="moveview()" @click="Changelearn(index)" :class="{culearn:index===learnid}" >
                                <div class="titles">---{{learn.title}}---</div>
                                <div class="lcontent" >
                                <img class="lcover" :src="learn.cover" />
                                </div>
                            </div>
                        </div>

    <!-- 视频 -->
                        <div class="video" v-show=" tagname=='video' ">
                            <div class="study" v-for="(learn,index) in videolist" :key="index" @mouseover="handleview(index)" @mouseout="moveview()" @click="Changelearn(index)" :class="{culearn:index===learnid}" >
                                <div class="titles">---{{learn.title}}---</div>
                                <div class="lcontent" >
                                <img class="lcover" :src="learn.cover" />
                                </div>
                            </div>
                        </div>
                        
    <!-- 机构 -->
                        <div class="organize" v-show=" tagname=='organize' ">
                            <div class="study" v-for="(learn,index) in organizelist" :key="index" @mouseover="handleview(index)" @mouseout="moveview()" @click="Changelearn(index)" :class="{culearn:index===learnid}" >
                                <div class="titles">---{{learn.title}}---</div>
                                <div class="lcontent" >
                                <img class="lcover" :src="learn.cover" />
                                </div>
                            </div>
                        </div>

    <!-- 画展 -->
                        <div class="show" v-show=" tagname=='show' ">
                            <div class="study" v-for="(learn,index) in showlist" :key="index" @mouseover="handleview(index)" @mouseout="moveview()" @click="Changelearn(index)" :class="{culearn:index===learnid}" >
                                <div class="titles">---{{learn.title}}---</div>
                                <div class="lcontent" >
                                <img class="lcover" :src="learn.cover" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- 广告栏 -->
                <!-- <div class="learnad">
                    <el-carousel  style="text-align:center;margin-top:5px;">
                        <el-carousel-item v-for="(ad,index) in ads" :key="index">
                            <img :src="ad.url" class="adpic">
                        </el-carousel-item>
                    </el-carousel>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
          RouterHead:'',
          RouterFoot:'',
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
               {
                    name:'动态广场',
                    head:'Ground'
               },
          ],
          pageid:3,
          tagid:0,
          learnid:-1,
          tagname:'article',
          bk:require('../../assets/img/52.jpg'),
          tags:[
               {
               name:'绘画指导文章',
               wordkeys:'article'
               },
               {
               name:'绘画指导视频',
               wordkeys:'video'
               },
               {
               name:'绘画指导机构',
               wordkeys:'organize'
               },
               {
               name:'近期艺术画展',
               wordkeys:'show'
               },

          ],
          ads:[
          {
               url:require('../../assets/img/29.jpg'),
               
          },
               {
               url:require('../../assets/img/28.jpg'),
               
          },
               {
               url:require('../../assets/img/27.jpg'),
               
          },

          ],
          articlelist:[
          {
               title:'素描基础入门',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/36.png'),
               
          },
          {
               title:'油画的调色与上色',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/31.png'),
               
          },
          {
               title:'绘画工具的选择',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/32.png'),
               
          },
          {
               title:'绘画时的光影部分',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/33.png'),
               
          },
          {
               title:'风景写生的技巧',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/34.png'),
               
          },
          {
               title:'像艺术家一样思考',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/35.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/36.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/37.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/39.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/39.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/40.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/37.png'),    
          },

          ],
          videolist:[
          {
               title:'素描基础入门',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/36.png'),
               
          },
          {
               title:'油画的调色与上色',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/31.png'),
               
          },
          {
               title:'绘画工具的选择',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/32.png'),
               
          },
          {
               title:'绘画时的光影部分',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/33.png'),
               
          },
          {
               title:'风景写生的技巧',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/34.png'),
               
          },
          {
               title:'像艺术家一样思考',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/35.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/36.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/37.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/39.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/39.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/40.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/37.png'),    
          },

          ],
          organizelist:[
          {
               title:'素描基础入门',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/36.png'),
               
          },
          {
               title:'油画的调色与上色',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/31.png'),
               
          },
          {
               title:'绘画工具的选择',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/32.png'),
               
          },
          {
               title:'绘画时的光影部分',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/33.png'),
               
          },
          {
               title:'风景写生的技巧',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/34.png'),
               
          },
          {
               title:'像艺术家一样思考',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/35.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/36.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/37.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/39.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/39.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/40.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/37.png'),    
          },

          ],
          showlist:[
          {
               title:'素描基础入门',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/36.png'),
               
          },
          {
               title:'油画的调色与上色',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/31.png'),
               
          },
          {
               title:'绘画工具的选择',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/32.png'),
               
          },
          {
               title:'绘画时的光影部分',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/33.png'),
               
          },
          {
               title:'风景写生的技巧',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/34.png'),
               
          },
          {
               title:'像艺术家一样思考',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/35.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/36.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/37.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/39.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/39.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/40.png'),
               
          },
          {
               title:'简笔画人物教程一',
               wordkeys:'article',
               url:'https://www.021gov.cn/smrm/976.html',
               cover:require('../../assets/img/37.png'),    
          },

          ],
           
        }
    },
    methods:{
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
        ChangeTag(i){
            this.tagid=i
            this.tagname=this.tags[i].wordkeys
        },
        handleview(i){
            this.learnid=i
        },
        moveview(){
            this.learnid=-1
        },
        Changelearn(i){
            this.RouterHead='Load'
            this.RouterFoot=''
            // this.ChangeRouter()
        },
        ChangeRouter(){
			this.$router.push({ path: `/${this.RouterHead}/${this.RouterFoot}`,query:{pageid:this.pageid}})
		},
    }
}
</script>

<style src='../../assets/css/learn.css' scoped>

</style>
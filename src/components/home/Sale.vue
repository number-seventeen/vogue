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
                <el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);">退出登录</span></router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);">返回首页</span></router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/"><span style="color: rgb(129, 147, 167);">个人中心</span></router-link></el-dropdown-item>
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
      <div class="content">
    
        <div class="item_fram">
          <div class="scenery_auction">
                <div class="works_card">
                  <div class="works_img">
                      <div class="history_img">
                          <div class="paimai">
                            <el-upload
                                action="#"
                                list-type="picture"
                                :limit="1"
                                :auto-upload="false">
                                    <span class="new"><i class="el-icon-plus" /></span>
                                    <div slot="file" slot-scope="{file}">
                                        <img
                                            class="el-upload-list__item-thumbnail"
                                            :src="file.url" alt=""/>
                                    
                                        <span class="el-upload-list__item-actions">
                                            <span
                                            class="el-upload-list__item-preview"
                                            @click="handlePictureCardPreview(file)"
                                            >
                                            <i class="el-icon-zoom-in"></i>
                                            </span>
                                            <span
                                            v-if="!disabled"
                                            class="el-upload-list__item-delete"
                                            @click="handleRemove(file)"
                                            >
                                            <i class="el-icon-delete"></i>
                                            </span>
                                        </span>
                                    </div>
                                    
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%"  :src="dialogImageUrl" alt="">
                            </el-dialog>
                          </div>
                      </div>
                      <div class="history_list">
                        <div  class="inform" style="display:flex;">
                          <div style="width:255px;height:200px;">  
                            <ul>
                              <li>
                                <span style="font-size:15px; font-weight:400;font-family:A;font-weight:600; color:rgb(157, 183, 212);">作品名称：</span><input type="text">
                              </li>
                              <li>
                                <span style="font-size:15px; font-weight:400; font-family:A;font-weight:600; color:rgb(157, 183, 212);">画作作者：</span><input type="text">
                              </li>
                              <li>
                                <span style="font-size:15px; font-weight:400; font-family:A;font-weight:600; color:rgb(157, 183, 212);">创作年份：</span><input type="text">
                              </li>
                              <li>
                                <span style="font-size:15px; font-weight:400; font-family:A;font-weight:600; color:rgb(157, 183, 212);">画作类型：</span><input type="text">
                              </li>
                              <li>
                                <span style="font-size:15px; font-weight:400; font-family:A;font-weight:600; color:rgb(157, 183, 212);">起拍价格：</span><input type="text">
                              </li>
        
                            </ul>
                          </div> 
                          <div style="width:190px; text-align:center;padding-top:10px;">
                            <span style="font-size:12px; font-weight:400; font-family:A;font-weight:600; color:rgb(157, 183, 212);">画 作 简 介</span>
                            <textarea 
                              style="border:1px solid rgb(162, 183, 206);opacity:0.5;outline:none;font-weight:600;color: #365888;font-family:A;resize: none;height:152px;width:170px;background: rgb(228, 236, 245);" 
                              maxlength="200"
                            />
                          </div>
                        </div>
                        <div class="info-bottom" style="display:flex;height:40px;">
                          <div style="margin-top:-8px;transform:scale(0.8);height:40px;line-height:45px;margin-left:-18px;">
                            <span style="font-size:12px; font-weight:600; font-family:A; color:#365888">作 品 名 称 请 小 于 1 2 字</span>
                            <span style="font-size:12px; font-weight:600;margin-left:5px; font-family:A;color:#365888">简 介 字 数 请 小 于 2 0 0 字</span>
                          </div> 
                          <div style="width:100px;height:30px;margin-left:30px;"><el-button size="mini" round>开启拍卖</el-button></div>	
                        </div>
                      </div> 
                  </div>
                  <div class="work_brief">
                  
                  </div>
                </div>
          </div>	
        </div>
        <div class="hot">
        
        </div>
        <div class="pic_show">
        </div>
          
      </div>
      <!-- 内容盒子底部 -->
	  </div>
	</div>
</template>
<script>
export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        bk:require('../../assets/img/52.jpg'),
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
        ],
        pageid:2,
      };
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
     
    },



    mounted(){
      // this.pageid=this.$route.query.pageid
	  },
}
</script>
<style src='../../assets/css/sale.css' scoped>	
</style>
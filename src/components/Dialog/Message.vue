<template>
    <el-drawer
        :visible.sync="ToMessage"
        :with-header="false"
        direction="ltr"
        :modal="false"
        size="620px"
        custom-class="UserMessage"
        :append-to-body="true"
        :modal-append-to-body="true"
        >
        <div class="leftcontent">
            <div class="messagebox" v-show="messagetype==0">
                <el-menu
                    :default-openeds='messagemenu'
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="MenueClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-monitor" style="position:relative;top:-3px;"></i>
                            <span style="font-family:'A';font-weight:bold;color:gray;">系统通知 (6)</span>
                        </template>
                        <div class="message-inner">
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                            <el-menu-item index="1-3">选项3</el-menu-item>
                            <el-menu-item index="1-4">选项4</el-menu-item>
                            <el-menu-item index="1-5">选项5</el-menu-item>
                            <el-menu-item index="1-6">选项6</el-menu-item>
                        </div>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-chat-dot-square" style="position:relative;top:-1px;"></i>
                            <span style="font-family:'A';font-weight:bold;color:gray;">动态通知 (7)</span>
                        </template>
                        <div class="message-inner">
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                            <el-menu-item index="2-4">选项4</el-menu-item>
                            <el-menu-item index="2-5">选项5</el-menu-item>
                            <el-menu-item index="2-6">选项6</el-menu-item>
                            <el-menu-item index="2-7">选项7</el-menu-item>
                        </div>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-bank-card" style="position:relative;top:-2px;"></i>
                            <span style="font-family:'A';font-weight:bold;color:gray;">交易通知 (8)</span>
                        </template>
                        <div class="message-inner">
                            <el-menu-item index="3-1">选项1</el-menu-item>
                            <el-menu-item index="3-2">选项2</el-menu-item>
                            <el-menu-item index="3-3">选项3</el-menu-item>
                            <el-menu-item index="3-4">选项4</el-menu-item>
                            <el-menu-item index="3-5">选项5</el-menu-item>
                            <el-menu-item index="3-6">选项6</el-menu-item>
                            <el-menu-item index="3-7">选项7</el-menu-item>
                            <el-menu-item index="3-8">选项8</el-menu-item>
                        </div>
                    </el-submenu>
                </el-menu>
            </div>

            <div class="IDbox" v-show="messagetype==1">
              <div class="id-info">
                   <label>真实姓名:</label>  
                    <input
                        placeholder=""
                        v-model="Tname" />
              </div>
               <div class="id-info">
                   <label>身份证号:</label>  
                    <input
                        placeholder=""
                        v-model.number="Tnumber" 
                    />
              </div>
             
            </div>
                
            <div class="collectbox" v-show="messagetype==2">
                <el-menu
                    :default-openeds='collectmenu'
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="MenueClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-monitor" style="position:relative;top:-3px;"></i>
                            <span style="font-family:'A';font-weight:bold;color:gray;">已收藏的分享 (9)</span>
                        </template>
                        <div class="collectBox"> 
                            <el-col :span="10" v-for="(o, index) in 9" :key="index" style="margin-left:32px;margin-bottom:15px;">
                                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                    <img :src="collectImg" class="image">
                                    <div style="padding: 10px;">
                                        <div>
                                            <span>《丰收》</span>
                                        </div>
                                        <div>
                                            <span>《丰收》</span>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </div>
                    </el-submenu>
                    
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-chat-dot-square" style="position:relative;top:-1px;"></i>
                            <span style="font-family:'A';font-weight:bold;color:gray;">已收藏的拍卖 (6)</span>
                        </template>
                        <div class="collectBox"> 
                            <el-col :span="10" v-for="(o, index) in 9" :key="index" style="margin-left:32px;margin-bottom:15px;">
                                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                    <img :src="collectImg" class="image">
                                    <div style="padding: 10px;">
                                        <div>
                                            <span>《丰收》</span>
                                        </div>
                                        <div>
                                            <span>《丰收》</span>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </div>
                    </el-submenu>
                </el-menu>
            </div>
                
            <div class="goldenbox" v-show="messagetype==3">
                
            </div>

        </div>



        <div class="rightcontent" @click="CloseDrawer()">
            <i class="el-icon-d-arrow-left"></i>
        </div>
    </el-drawer>
</template>

<script>
export default {
    data(){
        return{
            ToMessage:false,
            messagemenu:['1','2','3'],
            collectmenu:['1'],
            messagetype:0,
            collectImg:require('../../assets/img/60.jpg'),
            saleImg:require('../../assets/img/65.jpg'),
            collecttype:0,
            Tname:'',
            Tnumber:null,
        }
    },
    watch:{
        ToMessage:{
            handler:function(){
                if(this.ToMessage==false){
                    this.$parent.Navnum=null
                }
            }
        }
    },
    methods: {
      handleClose(done) {
        done()
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      MenueClose(key, keyPath) {
        console.log(key, keyPath);
      },
      CloseDrawer(){
          this.ToMessage=false
      },
      ChangeCollect(index){
          this.collecttype=index
      }
      
    }
}
</script>

<style lang="scss" scoped>
.leftcontent{
    width: 560px;
    height: 100%;
    float: left;
}
.rightcontent{
    width: 50px;
    height: 100%;
    float: left;
    border-left: 1px solid rgb(219, 219, 219);
}
.el-icon-d-arrow-left{
   position: relative;
   top:44%;
   left: 20px;
   font-size: 35px;
   color: rgb(222, 229, 231);
}
.message-inner{
    height: 210px;
    overflow: auto;
    font-family:A;
}

//实名认证
.id-info{
    color: #5e8ab4;
    font-family: A;
    font-weight: bold;
    font-size: 16px;
    margin-top: 10px;
}

//收藏
.collectbox{
    width: 100%;
    height: 100%;
}

.collectnav{
    font-family: A;
    font-size: 14px;
    color: rgb(155, 188, 207);
    font-weight: bold;
    margin-left: 120px;
}
.collectBox{
    height: 490px;
    overflow: auto;
}
.image {
    width: 100%;
    display: block;
}

</style>
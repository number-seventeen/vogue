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
                            <span style="font-family:'A';font-weight:bold;color:gray;">系统通知 (2)</span>
                        </template>
                        <div class="message-inner">
                            <el-menu-item index="1-1">欢迎注册成为High Light的新用户</el-menu-item>
                            <el-menu-item index="1-2">请及时完善您的个人信息</el-menu-item>
                            
                        </div>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-chat-dot-square" style="position:relative;top:-1px;"></i>
                            <span style="font-family:'A';font-weight:bold;color:gray;">动态通知 (3)</span>
                        </template>
                        <div class="message-inner">
                            <el-menu-item index="2-1">你的动态收到一条评论，快去查看吧</el-menu-item>
                            <el-menu-item index="2-2">你的动态收到一条评论，快去查看吧</el-menu-item>
                            <el-menu-item index="2-3">你的动态收到一条点赞，快去查看吧</el-menu-item>
                        </div>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-bank-card" style="position:relative;top:-2px;"></i>
                            <span style="font-family:'A';font-weight:bold;color:gray;">交易通知 (0)</span>
                        </template>
                        <div class="message-inner">
                            
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
<template>
    <el-drawer
        :visible.sync="ToGolden"
        :with-header="false"
        direction="ltr"
        :modal="false"
        size="620px"
        custom-class="UserMessage"
        :wrapperClosable="false"
        :append-to-body="true"
        :modal-append-to-body="true"
        >
        <div class="leftcontent">
            <el-menu
                :default-openeds='menu'
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
        <div class="rightcontent" @click="CloseDrawer()">
            <i class="el-icon-d-arrow-left"></i>
        </div>
    </el-drawer>
</template>

<script>
export default {
    data(){
        return{
            ToGolden:false,
            menu:['1','2','3']
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
          this.ToGolden=false
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
</style>
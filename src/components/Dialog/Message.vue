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
                            <span style="font-family:'A';font-weight:bold;color:gray;font-size:15px;">系统通知 ({{systemlist.length}})</span>
                        </template>
                        <div class="message-inner">
                            <div class="info" v-for="(item,index) in systemlist" :key="index" >
                                <i class="el-icon-chat-dot-round"></i>
                                <span>{{item.messagecontent | ellipsis}}</span>
                            </div>            
                        </div>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-bank-card" style="position:relative;top:-2px;"></i>
                            <span style="font-family:'A';font-weight:bold;color:gray;font-size:15px;">交易通知 ({{dealist.length}})</span>
                        </template>
                        <div class="message-inner">
                            <div class="info" v-for="(item,index) in dealist" :key="index">
                                <i class="el-icon-chat-dot-round"></i>
                                <span @click="Openinfo(index)">{{item.messagecontent |ellipsis}}</span>
                            </div>
                        </div>
                    </el-submenu>
                </el-menu>
            </div>
                    
            

        </div>



        <div class="rightcontent" @click="CloseDrawer()">
            <i class="el-icon-d-arrow-left"></i>
        </div>
        <Address ref="address"></Address>
    </el-drawer>
</template>

<script>
import Address from '../Dialog/Address'
export default {
    components:{
        Address
    },
    filters: {
		ellipsis: function(value) {
		if (!value) return "";
		if (value.length > 25) {
			return value.slice(0, 25) + "...";
		}
		return value;
		}
	}, 
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
            messagelist:[],
            systemlist:[],//系统通知
            dealist:[]//交易通知

        }
    },
    watch:{
        ToMessage:{
            handler:function(){
                if(this.ToMessage==false){
                    this.$parent.$parent.Navnum=null
                    
                }
                if(this.ToMessage==true){
                    //当抽屉打开后将信息分类型存入list
                    this.DISLIST()
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
        },
        Openinfo(index) {
            this.$refs.address.addressbox=true
            this.$refs.address.addressdata=this.dealist[index]
        },
        DISLIST(){
            console.log(this.messagelist)
            var system=[]
            var deal=[]
            for (let i = 0; i < this.messagelist.length; i++) {
                if(this.messagelist[i].messagetype=='竞拍成功通知'){
                    deal.push(this.messagelist[i])
                }
                else if(this.messagelist[i].messagetype=='评论通知'){
                    system.push(this.messagelist[i])
                } 
            }
            this.systemlist=JSON.parse(JSON.stringify(system))
            this.dealist=JSON.parse(JSON.stringify(deal))
            console.log(this.dealist)
        },
      
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
   color: rgb(190, 190, 174);
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

.info{
    margin-top: 10px;
    width: 500px;
    height: 30px;
    padding-left: 30px;
    margin-left: 10px;
    line-height: 30px;
    font-size: 15px;
    color: gray;
    cursor: pointer;
    border-bottom: 1px dotted rgb(209, 209, 195);
    span{
        letter-spacing: 0.05em;
        margin-left: -7px;
    }
    i{
        position: relative;
        top:-2px;
    }
}

/deep/ .el-submenu__title:hover{
    background: transparent;
}


</style>
<template>
  <el-dialog
    :visible.sync="addressbox"
    width="500px"
    top="15%"
    :before-close="handleClose"
    :modal="false"
    center
    custom-class="infodialog"
    >
    <div class="img"><img :src="imgurl" width="450" height="320" /></div>
    <div class="infos"><span>收货地址：</span><el-input v-model="address"></el-input></div>
    <div class="infos"><span>联系电话：</span><el-input type="number" v-model="telphone"></el-input></div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="addressbox = false">取 消</el-button>
        <el-button type="primary" @click="Sure()">确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
      return {
        addressbox: false,
        addressdata:[],
        imgurl:'',
        address:'',
        telphone:'',
      };
    },
    watch:{
      addressbox:{
        handler:function(newval,oldval){
          if(newval==true){
            this.getworkdata()
          }
        }
      }
    },
    computed: {
      ...mapState({
        LoginState:state=>state.loginStore.LoginState,
        Loginid:state=>state.loginStore.Loginid,
      }) 
    },
    methods: {
      handleClose(done) {
        done();  
      },
      Sure(){
        if(this.address!=''&&this.telphone!=''){
          this.getuserInfo()
        }
      },
      async getuserInfo(){
        const {data:res}=await this.$http.get("getupdata?id="+this.Loginid);
        res.sendaddress=this.address
        res.telphone=this.telphone
        this.submitForm(res)
        console.log(typeof(res.telphone))
            
      },
      async submitForm(data) { 
        const {data:res}=await this.$http.put("edituser",data)
        if(res!="success") return this.$message.error("提交失败")
        else{
          this.$message.info("提交成功")
          this.addressbox=false  
        }  
        
      },
      async getworkdata(){
        const {data:res}=await this.$http.get("getworkupdata?workid="+this.addressdata.wid);
			  this.imgurl=res.workurl
      }
    }
};
</script>

<style lang=scss scoped>
/deep/ .infodialog{
  .el-dialog__body{
    .el-input__inner{
      height: 40px;
      width: 360px;
      border:1px solid  rgb(192, 191, 191);
      font-size: 13px;
    }
    .el-input__inner:focus{
      border: 1px solid rgb(192, 191, 191);
    }
  }
  .el-dialog__footer{
    padding-top: 0px;
    padding-bottom: 10px;
    .el-button{
      border: 1px solid rgb(184, 184, 184);
    }
    .el-button--primary{
      background: white;
      color: gray;
    }
  }
}
.infos{
  margin-bottom: 20px;
  width: 100%; 
  display: flex; 
  span{
    width: 100px;
    height: 40px;
    line-height: 40px;
  }
}
.img{
  margin-bottom: 10px;
}
</style>
<template>
    <el-drawer
        :visible.sync="ToCheck"
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
            <el-form :label-position="labelPosition" ref="updataform" label-width="135px" :model="editform">
                <el-form-item label="个人笔名：">
                    <el-input v-model="editform.truename"></el-input>
                </el-form-item>
                <el-form-item label="个人昵称：">
                    <el-input v-model="editform.username"></el-input>
                </el-form-item>
                <el-form-item label="个人邮箱：">
                    <el-input v-model="editform.email"></el-input>
                </el-form-item>
                <el-form-item label="现居地址：">
                    <el-input v-model="editform.address"></el-input>
                </el-form-item>
                <el-form-item label="创作经验：">
                    <el-input v-model="editform.workyear"></el-input>
                </el-form-item>
                <el-form-item label="用户密码：">
                    <el-input type="password" v-model="editform.password"></el-input>
                </el-form-item>
                <!-- <el-form-item
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :label="'个人作品：'"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                >
                    <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item> -->
                <el-form-item  label="个人简介：">
                </el-form-item>
                <el-form-item >
                    <el-input type="textarea" v-model="editform.breif"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="savebutton" type="primary" @click="submitForm()">保存修改</el-button>
                    <!-- <el-button class="addbutton" @click="addDomain">添加作品</el-button> -->
                    <!-- <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
                </el-form-item>
            </el-form>
        </div>
        <div class="rightcontent" @click="CloseDrawer()">
            <i class="el-icon-d-arrow-left"></i>
        </div>
    </el-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data(){
        return{
            ToCheck:false,
            labelPosition: 'right',
            editform: {
                username:'',
				password:'',
				uicon:'',
				truename:'',
				email:'',
				address:'',
				workyear:'',
                breif:'',
                id:1,
            },
            dynamicValidateForm: {
            domains: [{
                value: ''
            }],
            email: ''
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
            done()
        },
        CloseDrawer(){
            this.ToCheck=false
        },
        submitForm() {
            console.log("头像",this.$parent.usericon)
            this.editform.uicon=this.$parent.usericon
            this.getuserInfo(this.Loginid)
            this.$refs.updataform.validate(async vaild=>{
                if(!vaild) return;
                console.log("资源---",this.editform)
                const {data:res}=await this.$http.put("edituser",this.editform)
                if(res!="success") return this.$message.error("操作失败")
                else{
                    this.$message.success("修改成功")
                    this.$parent.getUserlist() 
                }
            })
            
        },

        async getuserInfo(id){
            const {data:res}=await this.$http.get("getupdata?id="+id);
            // console.log("资源",res)
            this.editform=res;    
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
            this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
        addDomain() {
            this.dynamicValidateForm.domains.push({
            value: '',
            key: Date.now()
            });
        },
      
    }
}
</script>

<style lang="scss" scoped>
.leftcontent{
    width: 560px;
    height: 800px;
    float: left;
    overflow: auto;
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


/deep/ .el-form-item{
    margin-top: 20px;
    .el-form-item__label{
        font-family: A;
        font-weight: bold;
        font-size: 16px;
        color: rgba(135, 162, 196, 0.774) !important;
    }
    .el-input{
        width: 320px;
    }
    .el-button{
        border-radius: 20px;
        border: 1px solid rgb(202, 219, 224);
        background:rgba(250, 254, 255, 0.644);
        outline: none;
        color:rgba(135, 162, 196, 0.774);
        font-family: A;
        font-weight: bold;
        letter-spacing: 0.1em;
    }
    .el-input__inner:focus{
        outline: none;
        border: 1px solid rgb(202, 219, 224);
    }
    .el-input__inner{
        width: 300px;
        border: 1px solid rgb(202, 219, 224);
        height: 40px;
        background:rgba(250, 254, 255, 0.452);
        font-family: A;
        
    }
    .el-textarea__inner:focus{
        outline: none;
        border: 1px solid rgb(202, 219, 224);
    }
    .el-textarea__inner{
        resize: none;
        width: 475px;
        border: 1px solid rgb(202, 219, 224);
        height: 150px;
        background:rgba(250, 254, 255, 0.452);
        color:rgba(135, 162, 196, 0.774);
        font-family: A;
        font-weight: bold;
        font-size: 16px;
        letter-spacing: 0.1em;
    }
    .el-textarea{
        margin-left: -90px;
        margin-top: -10px;
    }
    .savebutton{
        margin-left: 30px;
    }
    .addbutton{
       margin-left: 25px; 
    }
}
</style>
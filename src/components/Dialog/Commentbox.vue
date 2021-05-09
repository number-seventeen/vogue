<template>
  <div class="commentlog">
    <el-dialog
        title="评论区"
        :visible.sync="commentdialog"
        width="50%"
        :modal="false"
        top="32.8%"
        center
        :before-close="handleClose"
        custom-class="commentwarpper"
        @opened="handleopen()">
        <div slot="title">
            <div class="tag-title">评论区</div>
            <div class="send" @click="Sendcomment()"><i class="el-icon-position"></i></div>
        </div>
        <div class="content">
            <div class="usercomment">
                <div v-for="(item,index) in commentData" :key="index">
                    <div class="pinlun">
                        <el-avatar class="user_icon" :src="item.uicon"></el-avatar>
                        <div class="user_name">{{item.username}}</div>
                    </div>
                    <div class="pin_word">{{item.comment}}</div>
                </div>
            </div>
            <div class="inputbox">
                <el-input
                type="textarea"
                resize="none"
                :rows="4"
                placeholder="评论："
                v-model="commentword">
            </el-input>
            </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    computed: {
      ...mapState({
        LoginState:state=>state.loginStore.LoginState,
        Loginid:state=>state.loginStore.Loginid,
      }) 
    },
    data() {
      return {
        commentdialog: false,
        commentword:'',
        WorkData:[],
        commentData:[],
      };
    },
    methods:{
        checksure(){
            this.RuleDialog=false
        },
        handleClose(done) {
            this.Clear()
            done();
        },
        handleopen(){
            this.getnetshare()
        },
        Clear(){
            this.WorkData=[]
            this.commentData=[]
            this.commentword=''
        },
        async getnetshare(){
			var netarr=[]
			let worknetarr=[]
			var queryWorkInfo={
				workquery:this.WorkData.workid
			}
			console.log(this.WorkData.workid)
			const {data:res}=await this.$http.get("getnetwork",{params:queryWorkInfo})
			for (let i = 0; i < res.networkdata.length; i++) {
				if(res.networkdata[i].nettype=='评论'){
					netarr.push(res.networkdata[i])
				}	
			}
			console.log("这是作品关系数据",netarr)
			this.commentData=[]
			for (let j = 0; j < netarr.length; j++) {
				const {data:userres}=await this.$http.get("getupdata?id="+netarr[j].netuserid);
				// console.log("ssss",userres)
				worknetarr=Object.assign(netarr[j],userres)
				this.commentData.push(worknetarr)
			}
        },
         //发送评论
        async Sendcomment(){
            let form={
                netuserid:this.Loginid,
                networkid:this.WorkData.workid,
                nettype:'评论',
                comment:this.commentword
            }
        
            const {data:res}=await this.$http.post("addnetbox",form)
            if(res!='success'){
            return this.$message.error("评论失败")
            }
            else{
            this.$message.success("评论成功")
                this.commentword=''
                this.getnetshare()
                this.addcommentMessage()
            }
        },
        async addcommentMessage(){
            var infos='您于'+this.changeTime(this.WorkData.loadtime)+'上传的动态收到了一条评论'
            let form={
                messagetype:'评论通知',
                messagecontent:infos,
                ownnerid:this.WorkData.ownnerid,
                workid:this.WorkData.workid
            }
            const {data:res}=await this.$http.post("addmessage",form)
            if(res!='success'){
                return this.$message.error("发送失败")
            }
        },
        changeTime(time){
            var t=0
            var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
            var nowDate = new Date(time).getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
            var target = new Date(nowDate + offset_GMT * 60 * 1000  );
            var date = target;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            console.log("changetimetime",time)
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            return Y+M+D 
        },   
    }
}
</script>
<style lang="scss" scoped>
.content{
    overflow: auto;
    width: 100%;
    height: 350px;
}

/deep/ .commentwarpper{
    min-width: 960px;
    background: rgb(243, 243, 239);
    box-shadow: 0 0 20px rgb(153, 149, 149);
    border-radius: 5px;
    .el-dialog__header{
        padding: 0px;
        height: 15px;
        .tag-title{
            font-size: 15px;
            color: rgb(96, 105, 107);
            position: relative;
            top:5px;
        }
        .send{
            position: absolute;
            right: 35px;
            top:6px;
            font-size: 17px;
            cursor: pointer;
            margin-right: 20px;
            color: rgb(142, 153, 156);
            i{
                font-weight: bold;
            }
        }
        .el-dialog__close{
            font-size: 19px;
            font-weight: bold;
            position: relative;
            color: rgb(142, 153, 156);
            top:-11px;
        }
    }
    .el-dialog__body{
        padding: 20px;
        .usercomment{
            width: 917px;
            height: 240px;
            border: 1px solid rgb(206, 205, 205);
            background: rgba(240, 241, 235, 0.589);
            overflow: scroll;
            .user_icon{
                box-shadow: 0 0 5px rgb(178, 188, 209);
                border-radius: 50px;
                width: 37px;
                height: 37px;
                margin-left: 15px;
                
            }
            .pinlun{
                margin-top: 8px;
                width: 100%;
                height: 43px;
                display: flex;
                line-height: 50px;
                // background: pink;
                
                
            }
            .user_name{
                height: 45px;
                font-size: 14px;
                position: relative;
                margin-left: 6px;
                letter-spacing: 0.15em;
                font-family: A;
                font-weight: bold;
                top: -5px;
                color:  rgb(99, 107, 116);
                cursor: pointer;
                
            }
            .pinlun i{
                position: relative;
                top:-5px;
                color: rgb(144, 165, 189);
                font-weight: 600;
            }
            .pin_word{
                width: 890px;
                text-indent: 2px;
                font-family: A;
                overflow:hidden;
                font-size: 13px;
                margin-top: 2px;
                line-height: 20px;
                margin-left: 15px;
                letter-spacing: 0.1em;
                cursor: pointer;
                padding-bottom:5px;
                font-weight: bold;
                border-bottom: 1px dotted rgb(188, 200, 206);
                
            }
        }
        .inputbox{
            margin-top: 10px;
            .el-textarea__inner{
                background: rgba(240, 241, 235, 0.589);
                border: 1px solid rgb(189, 188, 188);
            }
            .el-textarea__inner:focus{
                border: 1px solid rgb(189, 188, 188);
            }
            .el-textarea__inner:hover{
                border: 1px solid rgb(189, 188, 188);
            }
        }
    }

}

</style>
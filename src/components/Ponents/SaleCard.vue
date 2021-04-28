<template>
  <div class="salecards">
    <el-row>
        <el-col :span="7" v-for="(item, index) in StoreData" :key="index" :class="[index%3==0?'side':'center']" >
            <el-card :body-style="{ padding: '8px' }">
                <img :src="item.workurl" class="image">
                <div style="padding-left: 10px;padding-right:10px;padding-top:10px;">
                   <div class="card-info">
                       <span>作品名称: {{item.workname}}</span>
                       <span style="float:right;">作品作者:{{item.author}}</span>
                    </div>
                   <div class="card-time">
                       <span>起拍时间: {{getTime(item.loadtime)}}</span>
                       <span style="float:right;">当前价格: {{item.tempprice}} RMB</span>
                   </div>
                   <div class="card-more">
                       <span class="detail" @click="ToBuy(index)">查看详情</span>
                       <span @click="handlecancel(index)" class="cancel">取消关注</span>
                   </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <Tobuy ref="cardtobuy"></Tobuy>
  </div>
</template>
<script>
import Tobuy from '../home/Tobuy'
export default {
    data() {
        return {
            StoreData:[],
            currentDate: new Date()
        };
    },
    components:{Tobuy},
    methods:{
        //转换时间戳
        getTime (time) {
            var date = new Date(time)
            var y = date.getFullYear()
            var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
            var d = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
            return y + '-' + m + '-' + d
        },
        ToBuy(index){
            this.$refs.cardtobuy.routetype='card'
            this.$refs.cardtobuy.WorkData=this.StoreData[index]
            this.$refs.cardtobuy.storecontent=true
        },
        async handlecancel(i){
            const {data:delres}=await this.$http.get("deletenetbox?Netboxid="+this.StoreData[i].netboxid);
            if(delres!='success'){
                return this.$message.error("取消失败")
            }
            else{
                this.StoreData.splice(i,1)
            }
        }
    }
}
</script>
<style scoped>
.center{
    margin-left: 75px;
}
.el-col{
    margin-bottom: 30px;
}
.el-card{
    background: rgba(255, 255, 255, 0.486);
    box-shadow: 0px 0px 7px #a7adb1;
}
.time {
    font-size: 13px;
    color: #999;
}

.card-info{
    width: 100%;
    color:rgb(173, 187, 202);
    font-family: A;
    font-weight: bold;
    height: 20px;
    line-height: 20px;
    letter-spacing: 0.1em;
}
.card-time{
    width: 100%;
    margin-top:5px;
    color:rgb(173, 187, 202);
    font-family: A;
    font-weight: bold;  
    height: 20px;
    line-height: 20px;
    letter-spacing: 0.02em;
}
.card-more{
    width: 100%;
    padding-left: 1px;
    margin-top:15px;
    color:rgb(173, 187, 202);
    font-family: A;
    font-weight: bold;  
    height: 20px;
    line-height: 20px;
    display: flex;
    cursor: pointer;
    letter-spacing: 0.1em;
}
.cancel{
    flex: 1;
}
.detail{
    flex:4.3;
}


.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    height: 245px;
    display: block;
}

.clearfix:before,.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>


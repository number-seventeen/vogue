<template>
  <div class="salecards">
    <el-row>
        <el-col :span="7" v-for="(o, index) in 9" :key="index" :class="[index%3==0?'side':'center']" >
            <el-card :body-style="{ padding: '8px' }">
                <img src="../../assets/img/52.jpg" class="image">
                <div style="padding-left: 10px;padding-right:10px;padding-top:10px;">
                   <div class="card-info">
                       <span>作品名称: 丰收</span>
                       <span style="float:right;">作品作者:梵高</span>
                    </div>
                   <div class="card-time">
                       <span>起拍时间: 2021-02-04</span>
                       <span style="float:right;">起拍价格: 1,000 RMB</span>
                   </div>
                   <div class="card-more">
                       <span>查看详情</span>
                   </div>
                    
                </div>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  }
}
</script>
<style scoped>
.center{
    margin-left: 75px;
}
.el-col{
    margin-bottom: 52px;
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
    margin-top:15px;
    color:rgb(173, 187, 202);
    font-family: A;
    font-weight: bold;  
    height: 20px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    letter-spacing: 0.1em;

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


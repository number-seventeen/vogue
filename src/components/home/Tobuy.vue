<template>
    <div>
        <div class="buyrule"><router-link to="/Homepage" class="back"><< 返回画廊</router-link><span style="margin-left:300px;">! 为保证公平公正的拍卖过程 请用户在参与拍卖前仔细阅读拍卖规则 若未阅读并同意拍卖规则将不能参与拍卖</span><span class="rules">查看拍卖规则</span></div>
        <div class="showbox">
            <div class="showtop">
                <div class="imgview"><img src="../../assets/img/16.jpg"  /></div>
                <div class="joinbox">
                    <div class="board">
                        <span style="margin-left:-15px;">当前最高出价：</span>
                        <span>1,000,000元</span>
                        <span style="margin-left:25px;">出价者：</span>
                        <span>016号</span>
                    </div>
                    <div class="joincontent">
                        <div class="nowcall">
                            <div class="usercall">
                                <div class="callnumber">0106号</div>
                                <div><el-avatar class="callicon" size="large" icon="el-icon-s-custom" @error="errorHandler"></el-avatar></div> 
                            </div>
                            <div class="pricecall">
                                <!-- <div style="font-size:12px;transform:scale(0.8);margin-left:35px;">当前出价</div> -->
                                <div class="parrow"></div>
                                <div class="callprice"><span>1,000</span><span style="margin-left:2px;">¥</span></div>
                            </div>
                        </div>

                        <div class="nowcall">
                            <div class="usercall">
                                <div class="callnumber">0107号</div>
                                <div><el-avatar class="callicon" size="large" icon="el-icon-s-custom" @error="errorHandler"></el-avatar></div>    
                            </div>
                            <div class="pricecall">
                                <!-- <div style="font-size:12px;transform:scale(0.8);margin-left:35px;">当前出价</div> -->
                                <div class="parrow"></div>
                                <div class="callprice"><span>2,000</span><span style="margin-left:2px;">¥</span></div>
                            </div>
                        </div>

                        <div class="nowcall">
                            <div class="usercall">
                                <div class="callnumber">0109号</div>
                               <div><el-avatar class="callicon" size="large" icon="el-icon-s-custom" @error="errorHandler"></el-avatar></div>   
                            </div>
                            <div class="pricecall">
                                <!-- <div style="font-size:12px;transform:scale(0.8);margin-left:35px;">当前出价</div> -->
                                <div class="parrow"></div>
                                <div class="callprice"><span>2,500</span><span style="margin-left:2px;">¥</span></div>
                            </div>
                        </div>
                        
                        <div class="nowcall">
                            <div class="usercall">
                                <div class="callnumber">0116号</div>
                               <div><el-avatar class="callicon" size="large" icon="el-icon-s-custom" @error="errorHandler"></el-avatar></div> 
                            </div>
                            <div class="pricecall">
                                <!-- <div style="font-size:12px;transform:scale(0.8);margin-left:35px;">当前出价</div> -->
                                <div class="parrow"></div>
                                <div class="callprice"><span>3,000</span><span style="margin-left:2px;">¥</span></div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="joinput">
                        <div class="inputboard">
                            <div><input type="text" class="inprice" placeholder="请输入加价金额"/></div>
                            <div class="priceicon">¥</div>
                            <div class="autobuy"></div>
                            <div class="joinbuy">参与竞拍</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="showfoot">
                <div class="showinfo">
                    <div>画作名称：</div>
                    <div>
                        <span>《</span>
                        <span>群鸦飞舞的稻田</span>
                        <span>》</span>
                    </div>
                </div>
                <div class="showinfo">
                    <div>作者：</div>
                    <div>
                        <span>文森特·梵高</span>
                    </div>
                </div>
                <div class="showinfo">
                    <div>创作年份：</div>
                    <div>
                        <span>2020年9月</span>
                    </div>
                </div>
                <div class="showinfo">
                    <div>起拍价格：</div>
                    <div>
                       
                        <span>300元</span>
                        
                    </div>
                </div>
                <div class="moreinfo">
                    <div>查看更多信息</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            circleUrl: require('../../assets/img/15.jpg'),
        }
    },
    methods:{
        errorHandler() {
            return true
        },
        handleback(){

        },
    },
}
</script>

<style src='../../assets/css/tobuy.css' scoped>

</style>
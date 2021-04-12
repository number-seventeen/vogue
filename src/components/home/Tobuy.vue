<template>
    <div>
        <div class="buyrule"><router-link to="/Homepage" class="back">《 返回画廊</router-link><span style="margin-left:300px;">! 为保证公平公正的拍卖过程 请用户在参与拍卖前仔细阅读拍卖规则 若未阅读并同意拍卖规则将不能参与拍卖</span><span class="rules" @click="CheckRule()">查看拍卖规则</span></div>
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
                        <div class="nowcall" v-for="(item,index) in jonnerlist" :key="index">
                            <div class="usercall">
                                <div class="callnumber">0{{item.playid}}号</div>
                                <div><el-avatar class="callicon" size="large" icon="el-icon-s-custom" @error="errorHandler"></el-avatar></div> 
                            </div>
                            <div class="pricecall">
                                <!-- <div style="font-size:12px;transform:scale(0.8);margin-left:35px;">当前出价</div> -->
                                <div class="parrow"></div>
                                <div class="callprice"><span>{{item.playprice}}</span><span style="margin-left:2px;">¥</span></div>
                            </div>
                        </div>    
                    </div>
                    
                    <div class="joinput">
                        <div class="inputboard">
                            <div><input type="number" class="inprice" v-model="addnumber" placeholder="请输入加价金额"/></div>
                            <div class="priceicon">¥</div>
                            <div class="autobuy"></div>
                            <div class="joinbuy" @click="Tocall()">参与竞拍</div>
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
        <Rules ref="rules"></Rules>
    </div>
</template>

<script>
import Rules from '../Dialog/Rules.vue'
export default {
    components:{Rules},
    data(){
        return{
            userName:'wang',
            websocket:null,
            circleUrl: require('../../assets/img/15.jpg'),
            addnumber:null,
            jonnerlist:[
                {
                    playid:160,
                    playprice:1000000,
                },
                {
                    playid:161,
                    playprice:1000500,
                },
                {
                    playid:162,
                    playprice:1001000,
                },
                {
                    playid:163,
                    playprice:1001500,
                },
                {
                    playid:164,
                    playprice:1002000,
                },
            ],
        }
    },
    created() { // 页面创建生命周期函数
        console.log("hao")
            this.websocket = new WebSocket("ws://localhost:9000/websocket/"+ this.userName);
            this.initWebSocket()
    },
    beforeDestroy() { // 离开页面生命周期函数
            this.onbeforeunload()
    },
    methods:{
        initWebSocket () {
            // 连接错误
            this.websocket.onerror = this.setErrorMessage
    
            // 连接成功
            this.websocket.onopen = this.setOnopenMessage
    
            // 收到消息的回调
            this.websocket.onmessage = this.setOnmessageMessage
    
            // 连接关闭的回调
            this.websocket.onclose = this.setOncloseMessage
    
            // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = this.onbeforeunload
        },
        setErrorMessage () {
            console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
        },
        setOnopenMessage () {
            console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
        },
        setOnmessageMessage (event) {
            // 根据服务器推送的消息做自己的业务处理
            console.log('服务端返回：' + event.data)
        },
        setOncloseMessage () {
            console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
        },
        onbeforeunload () {
            this.closeWebSocket()
        },
        closeWebSocket () {
            this.websocket.close()
        },

        errorHandler() {
            return true
        },
        handleback(){
        },
        CheckRule(){
            this.$refs.rules.RuleDialog=true
        },
        Tocall(){
            let param={
                playid:160,
                playprice:this.jonnerlist[this.jonnerlist.length-1].playprice+this.addnumber, 
            }
            this.jonnerlist.push(param)
            console.log("hhhh",typeof(this.jonnerlist[this.jonnerlist.length-1].playprice))
            this.addnumber=null
            this.GetWorklist()
        },
        async GetWorklist(){
			var queryinfo={
				query:'人物'
			}
			const {data:res}=await this.$http.get("/news/sendAllWebSocket")
		}
        

    },
}
</script>

<style src='../../assets/css/tobuy.css' scoped>

</style>
<template>
  <div id="app">
    <transition :name="transitionName"> 
      <router-view v-if="isRouterShow"/>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data(){
    return{
      transitionName:'',
      isRouterShow: true,
      websocket:null,//websocket传送接口,
      userName:'王嘉琪'
      
    }
  },
  computed: {
		...mapState({
			LoginState:state=>state.loginStore.LoginState,
      Loginid:state=>state.loginStore.Loginid,
      	
		})	
	},
  beforeDestroy() { // 离开页面生命周期函数
    this.onbeforeunload()
  },
  
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  },
  created() {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('store')) {
          this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
          sessionStorage.setItem('store', JSON.stringify(this.$store.state))
      })

      //实时通信
      this.websocket = new WebSocket("ws://localhost:9000/websocket/"+ this.userName);
      this.initWebSocket()
  },
  methods:{
    async reload () {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
    },
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
          console.log('Web连接发生错误   状态码：' + this.websocket.readyState)
      },
      setOnopenMessage () {
          console.log('Web连接成功    状态码：' + this.websocket.readyState)
      },
      setOnmessageMessage (event) {
          // 根据服务器推送的消息做自己的业务处理
          console.log('websockt页面的服务端返回：' , event.data)
          var Str=event.data
          var apatt = /call/; 
          var bpatt= /endw/;
          var cpatt =/juge/;
          if(apatt.test(Str)==true){ //true
            var id = Str.substring(4)
            let param={
              type:'出价信息',
              workid:Number(id),
              userid:0,
            }
            this.$store.dispatch('ChangeWebdata',param)
          }
          if(bpatt.test(Str)==true){
            var id = Str.substring(4)
            let param={
              type:'结束通知',
              workid:0,
              userid:Number(id),
            }
            this.$store.dispatch('ChangeWebdata',param)
          }  
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
  }

}
</script>

<style>
@import './assets/common/font/font.css';
@import "./assets/css/dialog.scss";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  
}
html{
  min-width: 1920px;
  min-height: 1080px;
}
body{
  margin: 0;
  overflow: hidden; 
}

input::-webkit-outer-spin-button,

input::-webkit-inner-spin-button { -webkit-appearance: none; }

input[type="number"]{ -moz-appearance: textfield; }

::-webkit-scrollbar {
     width: 0 !important;
}
::-webkit-scrollbar {
     width: 0 !important;height: 0;
}
.learnad .el-carousel__button{
	background: rgb(52, 26, 77);
}

.slide{
	width: 700px;
	height: 500px;
}
.inner .el-carousel__container{
    height:500px !important;
}
.learnad .el-carousel__container{
    height:680px !important;
}

.paimai .el-upload-list--picture .el-upload-list__item{
  height: 290px;
  width:450px;
  border:none;
}
.paimai .el-upload-list{
  margin-top:-8px;
}



/* 页面跳转动画 */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 1200ms;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}





/* 注册页面radio样式 */
.chooseblong .el-radio__inner{
	border: 1px solid #bda5c8;
}
.chooseblong .el-radio__label{
  font-size: 16px;
}
.chooseblong .el-radio__input.is-checked .el-radio__inner{
    border-color: #f6edfa;
    background: #3f4347;
}
.chooseblong .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner{
      box-shadow: 0 0 0px rgb(156, 69, 69);
}
.chooseblong .el-radio__input.is-checked+.el-radio__label{
  color: #e7dcec;
}

.h_list .el-collapse-item__wrap{
  background: rgba(245, 245, 245, 0.39);
  padding: 20px;
  border-bottom: 1px solid rgb(204, 204, 187);
}
.h_list .el-collapse-item__content{
  padding-bottom: 0;
}

.el-form-item__label{
	color: white !important;
}

</style>

<template>
  <div id="app">
    <transition :name="transitionName"> 
      <router-view v-if="isRouterShow"/>
    </transition>
  </div>
</template>

<script>
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
      isRouterShow: true
    }
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
  },
  methods:{
    async reload () {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
    }
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
::-webkit-scrollbar {
     width: 2 !important;
}
::-webkit-scrollbar {
     width: 2 !important;height: 0;
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
.h_list .el-collapse-item__header{
  font-size: 15px;
  font-weight: bold;
  color: #9bb0be;
  background: rgba(245, 245, 245, 0.39);
  padding-left: 20px;
  border-bottom: 1px solid rgb(204, 204, 187);
}
.h_list .el-collapse-item__wrap{
  background: rgba(245, 245, 245, 0.39);
  padding: 20px;
  border-bottom: 1px solid rgb(204, 204, 187);
}
.h_list .el-collapse-item__content{
  padding-bottom: 0;
}

</style>

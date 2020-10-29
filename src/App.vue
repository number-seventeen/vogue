<template>
  <div id="app">
    <transition :name="transitionName"> 
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName:'',
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

}
</script>

<style>
@import './assets/common/font/font.css';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  
}
body{
  margin: 0;
  min-width: 1439px;
  overflow: auto;
  height: 100%;
  
}
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
.add .el-upload-list--picture .el-upload-list__item{
    width:275px;
    height: 190px;
    border:none;
    margin-bottom: 10px;
}
.paimai .el-upload-list--picture .el-upload-list__item{
  height: 290px;
  width:450px;
  border:none;
}
.paimai .el-upload-list{
  margin-top:-8px;
}
.add .el-upload-list{
  margin-top:-30px;
}
/* .show .el-dialog__header {
  background: #494949;
} 
.show .el-dialog__body{
  background: #494949;
}
.show .el-dialog__headerbtn .el-dialog__close{
	color: rgb(167, 167, 167);
} */



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
.chooseblong .el-radio__input.is-checked .el-radio__inner{
    border-color: #724c85;
    background: #724c85;
}
.chooseblong .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner{
      box-shadow: 0 0 0px white;
}
.chooseblong .el-radio__input.is-checked+.el-radio__label{
  color: #724c85;
}
</style>

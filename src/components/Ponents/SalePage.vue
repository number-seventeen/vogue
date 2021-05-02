<template>
  <div  class="salepages">
    <el-pagination
        small
        prev-text="返回上一页"
        next-text="前往下一页"
        layout="prev, next"
        :total="total"
        :page-size="1"
        @current-change="handleCurrentChange"
        :currentpage="cupage"
        :hide-on-single-page="true">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return{
      cupage:1,
    }
  },
  props:{
    total:{
      required:true,
    }
  },
  methods:{
    handleCurrentChange(val) {
      this.$parent.activeWork=val-1
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-pagination button:hover{
  color:rgb(44, 54, 66);
}
/deep/ .btn-prev{
  span{
    cursor: pointer;
    font-size: 15px;
    font-family: A;
    font-weight: bold;
    color: rgba(89, 127, 170, 0.781);
    position: relative;
    left: -20px;
  }
  
}
/deep/ .btn-next{
  span{
    cursor: pointer;
    font-size: 15px;
    font-family: A;
    font-weight: bold;
    color: rgba(89, 127, 170, 0.781);
    position: relative;
    left: -15px;
  }
  
}
</style>
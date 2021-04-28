<template>
  <div  class="salepages">
    <el-pagination
        small
        layout="prev, pager, next"
        :total="1"
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
</style>
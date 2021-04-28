<template>
    <el-dialog
        :visible.sync="infodialog"
        width="960px"
        :modal="false"
        :before-close="handleClose"
        @opened="handleopen()"
        custom-class="infoboxs"
        >
        <el-table
        :data="tabledata"
        style="width: 100%">
        <el-table-column
            prop="workname"
            label="作品名称"
            width="160"
            align="center">
        </el-table-column>
        <el-table-column
            prop="author"
            label="作品作者"
            width="130"
            align="center">
        </el-table-column>
        <el-table-column
            prop="workprice"
            label="起拍价格"
            width="180"
            align="center">
        </el-table-column>
        <el-table-column
            prop="salecompany"
            label="拍卖行"
            width="180"
            align="center">
        </el-table-column>
        
        <el-table-column
            prop="worktype"
            label="作品类型"
            width="120"
            align="center">
        </el-table-column>

        <el-table-column
            prop="maketime"
            label="创作年份"
            width="160"
            align="center">
        </el-table-column>

        </el-table>
        
    </el-dialog>
</template>

<script>
export default {
    data() {
      return {
        infodialog: false,
        workinfo:[],
        tabledata:[]
      };
    },
    methods: {
      handleClose(done) {
        done();  
      },
      handleopen(){
          this.tabledata=[]
          this.tabledata.push(this.workinfo)
          console.log(this.workinfo)
      }
      
    }
}
</script>

<style lang="scss" scoped>
/deep/ .infoboxs{
    position: absolute;
    top:10px;
    left: 245px;
    .el-dialog__header{
        display: none;
    }
    
}
</style>
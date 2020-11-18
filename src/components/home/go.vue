<template>
  <div class="on">
        <div class="centers" style="position:absolute;z-index:1;">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="svgs"> 
                <g class="topsbox" > 
                    <circle  v-for="(item,index) in top.length" :key="'top'+index" :cx="top[index].x" :cy="top[index].y" r="2"  stroke-width="2" fill="none" />
             
                </g>
                <g class="rightsbox"  > 
                    <circle  v-for="(item,index) in right.length" :key="'right'+index" :cx="right[index].x" :cy="right[index].y" r="2"  stroke-width="2" fill="none" />
             
                </g>
                <g class="tablesbox" > 
                    <circle  v-for="(item,index) in table.length" :key="'table'+index" :cx="table[index].x" :cy="table[index].y" r="20"  stroke-width="2" fill="gray" @click="t(index)" />
                    <line v-for="(item,index) in right.length" :key="'hen'+index"  :x1="tsnode[index].x" :y1="tsnode[index].y" :x2="rightsort[index].x" :y2="rightsort[index].y"  style="stroke:#BBBBBB;stroke-width:1"/> 
                    <line v-for="(item,index) in top.length" :key="'su'+index"  :x1="topsort[index].x" :y1="topsort[index].y" :x2="lenode[index].x" :y2="lenode[index].y"  style="stroke:#BBBBBB;stroke-width:1"/>     
                </g>
                <!-- <g class="connect">
                    <polyline class="actionline" v-for="(item,index) in point.length" :key="index" :points="point[index].path" fill='none' stroke='yellow' stroke-width='2' /> 
                </g> -->
                <g class="animotion">
                    <polyline class="actionline" v-for="(item,index) in point.length" :key="index" :points="point[index].path" fill='none' stroke='purple' stroke-width='4' /> 
                </g>

            </svg> 
        </div>



        <div class="title">
            <div class="ticon"></div>
        </div>
        <div class="top-left-box">
            <!-- 左侧盒子 -->
            <div class="insert-top-list">
                <!-- 上行 -->
                <div class="insert-item" v-for="(item,index) in 4" :key="index" ref="insertItem">
                    <!-- 行中的盒子 -->
                    <div class="insert">
                        <div class="in"></div>
                        <!-- 真正的内容 -->
                    </div>
                    <!-- 撑容器 -->
                </div>
            </div>
            <div class="insert-bottom-list">
                <!-- 上行 -->
                <div class="insert-item" v-for="(item,index) in 4" :key="index">
                    <!-- 行中的盒子 -->
                    <div class="insert">
                        <div class="in"></div>
                        <!-- 真正的内容 -->
                    </div>
                    <!-- 撑容器 -->
                </div>
            </div>
            
        </div>
        <div class="top-right-box">
            <div class="top-right-con">
                <div class="con-top">
                    <div class="left-control">
                        <input type="number" v-model="inner" placeholder="shuru">
                    </div>
                    <div class="right-control">
                        <input type="number" v-model="out" placeholder="shuchu">
                    </div>
                </div>
                <div class="con-bottom">
                
                </div>
            </div>
        </div>

        <div class="right-box">
            <div class="out-left-box">
                <div class="out-left-list">
                    <!-- 上行 -->
                    <div class="out-item" v-for="(item,index) in 4" :key="index">
                        <!-- 行中的盒子 -->
                        <div class="out">
                            <div class="ou">hhhhh</div>
                            <!-- 真正的内容 -->
                        </div>
                        <!-- 撑容器 -->
                    </div>
                </div>   
            </div>
            <div class="out-right-box">
                <div class="out-right-list">
                    <!-- 上行 -->
                    <div class="out-item" v-for="(item,index) in 4" :key="index">
                        <!-- 行中的盒子 -->
                        <div class="out">
                            <div class="ou"></div>
                            <!-- 真正的内容 -->
                        </div>
                        <!-- 撑容器 -->
                    </div>
                </div>   
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
          margin:0,
          top:[],
          right:[],
          table:[],
          screenWidth: document.body.clientWidth,
          screenHeight: document.body.clientHeight,
          timer:null,
          topsort:[],
          rightsort:[],
          tsnode:[],
          lenode:[],
          demopoint:[],
          point:[],
          inner:null,
          out:null,
          whichon:[],
          
        }
    },
    mounted(){
        setTimeout(() => {
           this.draw()
        }, 100);
        const that = this
        window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
           
        })()
    }
         
    },
    watch:{
        screenWidth(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            if(!this.timer){
                // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                this.timer = true
                let that = this   
                that.clear()
                setTimeout(function(){
                    // 打印screenWidth变化的值
                    that.draw()
                    that.REON()
                    that.timer = false
                },100)
                
            }
        }
    },
    methods:{
        draw(){
            this.top=[]
            this.right=[]
            this.table=[]
            this.topsort=[]
            this.rightsort=[]
            this.tsnode=[]
            this.lenode=[]
            // 顶部盒子的连接点
            var topbox=document.getElementsByClassName("insert-item")
            var toplen=document.getElementsByClassName("insert-item").length
            for (let i = 0; i < toplen; i++) {
              
              if(i>=0&&i<toplen/2){
                var cx=topbox[i].getBoundingClientRect().x+(topbox[i].clientWidth*(1/12))
                var cy=topbox[i].getBoundingClientRect().y+topbox[i].clientHeight
                this.top.push({x:cx,y:cy,id:i+1})
                this.topsort.push({x:cx,y:cy})
                
              }
              else if(i<toplen&&i>=toplen/2){
                var cx=topbox[i].getBoundingClientRect().x+topbox[i].clientWidth/2
                var cy=topbox[i].getBoundingClientRect().y+topbox[i].clientHeight
                this.top.push({x:cx,y:cy,id:i+1})
                this.topsort.push({x:cx,y:cy})  
              }
                
            }
            //将顶部盒子连接点重新排序方便画表格
             this.topsort.sort(this.Sort('x')) 

            //右侧盒子的连接点
            var rightbox=document.getElementsByClassName("out-item")
            var rightlen=document.getElementsByClassName("out-item").length
            for (let i = 0; i < rightlen; i++) {
                //左盒子的连接点
              if(i>=0&&i<rightlen/2){
               var cx=rightbox[i].getBoundingClientRect().x
                var cy=rightbox[i].getBoundingClientRect().y+rightbox[i].clientHeight/2
                this.right.push({x:cx,y:cy,id:i+1})
                this.rightsort.push({x:cx,y:cy})
                
              }
              else if(i<rightlen&&i>=rightlen/2){
                var cx=rightbox[i].getBoundingClientRect().x
                var cy=rightbox[i].getBoundingClientRect().y+(rightbox[i].clientHeight*(10.5/12))
                this.right.push({x:cx,y:cy,id:i+1})
                this.rightsort.push({x:cx,y:cy})
              }
                
            }
            this.rightsort.sort(this.Sort('y')) 
            
            //中间矩阵表格
            for(let i = 0; i < rightlen; i++){  
                var my=this.rightsort[i].y
                for (let j = 0; j < toplen; j++) {
                    var cx=this.topsort[j].x
                    this.table.push({x:cx,y:my})  
                }
            }


            for (let i = 0; i < rightlen; i++) {
                var sx=this.top[0].x
                var sy=this.rightsort[i].y
                this.tsnode.push({x:sx,y:sy})
            }
            
            for (let i = 0; i < toplen; i++) {
                var lx=this.topsort[i].x
                var ey=this.right[toplen-1].y
                this.lenode.push({x:lx,y:ey})
            }

            
        },

        clear(){
            this.top=[]
            this.right=[]
            this.table=[]
            this.topsort=[]
            this.rightsort=[]
            this.tsnode=[]
            this.lsnode=[]
            this.lenode=[]
        },
        drawline(){
            this.demopoint=[]//暂时装每次输入的路径点
            //起点
            
                
            for (let i = 0; i < toplen; i++) {
                var sx=this.top[i].x
                var sy=this.top[i].y
                this.demopoint.push(sx,sy)
                for (let j = 0; j < rightlen; j++) {
                    var c1x=this.top[i].x
                    
                }
                
            }
                
                       
        },


        t(i){
            this.demopoint=[]
            this.whichon.push(i)
            this.top.forEach(item => {
               if(item.x==this.table[i].x){
                   this.demopoint.push(item.x,item.y)
               }
           });
           this.demopoint.push(this.table[i].x,this.table[i].y)
           this.right.forEach(item => {
               if(item.y==this.table[i].y){
                   this.demopoint.push(item.x,item.y)
               }
           });
           this.point.push({path:this.demopoint})



        },
        Sort(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
        REON(){
            this.point=[]
            console.log(this.whichon)
            for (let n = 0; n < this.whichon.length; n++) {
                this.demopoint=[]
                var i=this.whichon[n]
                this.top.forEach(item => {
                    if(item.x==this.table[i].x){
                        this.demopoint.push(item.x,item.y)
                    }
                });
                this.demopoint.push(this.table[i].x,this.table[i].y)
                this.right.forEach(item => {
                    if(item.y==this.table[i].y){
                        this.demopoint.push(item.x,item.y)
                    }
                });
                this.point.push({path:this.demopoint})
                
            }
        }
    }
}

</script>

<style>
.top-left-box{
    width: 55%; 
    float: left;
    margin-left: 6%;
    z-index: 10;
    
}
.insert-top-list{
    width: 100%;
    position: relative;
    
   
   
}
.insert-bottom-list{
    width: 100%;
    position: relative;
    margin-top: 4.2%;
    margin-left: 3.5%;
   
    
}

.insert-item{
    width: 21%;
    border: 1px solid red;
    display: inline-block;
    
    position: relative;
    margin-right: 3.5%;  
}
.insert-item:nth-child(4n + 4){
     margin-right: 0;  
}
.insert{
    width: 100%;
    position: relative;
    padding-bottom: 56.25%;
    
}
.in{
    width: 100%;
    height: 100%;
    position: absolute;
   
}

.top-right-box{
    width: 31%;
    margin-left: 3.5%;
    border: 1px solid gray;
    float: left;
    z-index: 10;

}
.top-right-con{
    width: 100%;
}
.con-top{
    width: 100%;
    padding-bottom: 30%;
    display: flex;
    

}
.con-bottom{
    width: 100%;
    padding-bottom: 12%;
   
}


.right-box{
    display: flex;
    width: 31%;
    float: right;
    margin-right: 4.5%;
    margin-top: 2.2%;   
}
.out-left-box{
    width: 37%;  
    margin-left: 19%;  
}
.out-right-box{
    width: 37%; 
    margin-left: 6.5%;
    margin-top: 5.5%;
    
}

.out-left-list{
    width: 100%;
    position: relative;  
}
.out-right-list{
    width: 100%;
    position: relative;
}


.out-item{
    width: 100%;
    border: 1px solid red;
    position: relative;
    margin-bottom: 16%;
    
    
}
.out-item:nth-child(4n + 4){
     margin-bottom: 0;  
}
.out{
    width: 100%;
    position: relative;
    padding-bottom: 56.25%;
}
.ou{
    width: 100%;
    height: 100%;
    position: absolute;
   
}
.centers{
    width: 100%;
    height: 100%;
}
.title{
    width: 100%;
    position: relative;
    box-shadow: 0 0 2px rgb(185, 184, 184);
}
.ticon{
   padding-bottom: 5%;
}
.on{
    width: 100%;
   
    background: rgb(252, 239, 223);
}


.animotion{
    stroke-dasharray:3000;
    stroke-dashoffset:3000;
    animation: dash 3s ease-in-out infinite;
}
@keyframes dash{
    to{
     stroke-dashoffset:0;   
    }
}
</style>
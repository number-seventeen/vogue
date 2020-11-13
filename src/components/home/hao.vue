<template>
  <div class="con">
            <div class="centers" style="position:absolute;z-index:1;">
                <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g class="topsbox"> 
                        <circle  v-for="(item,index) in top.length" :key="'topc'+index" :cx="top[index].x" :cy="top[index].y" r="2"  stroke-width="2" fill="black" />
                        <line v-for="(item,index) in top.length" :key="'top'+index"  :x1="top[index].x" :y1="top[index].y"  :x2="topnode[index].x" :y2="topnode[index].y"  style="stroke:#BBBBBB;stroke-width:2"/>   

                        <circle  v-for="(item,index) in topm.length" :key="'topmc'+index" :cx="topm[index].x" :cy="topm[index].y" r="2"  stroke-width="2" fill="black" />
                        <line v-for="(item,index) in topm.length" :key="'topm'+index"  :x1="topm[index].x" :y1="topm[index].y"  :x2="top[index].x" :y2="top[index].y"  style="stroke:#BBBBBB;stroke-width:2"/>   
                        
                    </g>
                    <g class="tables">
                        <circle v-for="(item,index) in table.length" :key="'a'+index" :cx="table[index].x" :cy="table[index].y" r="2"  stroke-width="2" fill="black" />
                        <line v-for="(item,index) in tsline.length" :key="'su'+index"  :x1="tsline[index].snodex" :y1="tsline[index].snodey" :x2="teline[index].enodex" :y2="teline[index].enodey"  style="stroke:#BBBBBB;stroke-width:2"/>   

                        <line v-for="(item,index) in tsline.length" :key="'hen'+index"  :x1="lsline[index].snodex" :y1="lsline[index].snodey" :x2="left[index].x" :y2="left[index].y"  style="stroke:#BBBBBB;stroke-width:2"/>   
                    </g>
                    <g class="leftsbox">
                        <circle  v-for="(item,index) in left.length" :key="index" :cx="left[index].x" :cy="left[index].y" r="2"  stroke-width="2" fill="black" />
                    </g>
                <!-- 画连接线 -->
                    <g class="hh">
                        <polyline class="actionline" v-for="(item,index) in point.length" :key="index" :points="point[index].points" fill='none' stroke='blue' stroke-width='6' /> 
                        <circle @click="go(index)" class="vv" v-for="(item,index) in listx.length" :key="'intersection'+index" :cx="listx[index].x" :cy="listx[index].y" r="6"  stroke-width="2" fill="gray"  />
                    </g>
                   
                </svg>
            </div>
            <div class="clo" >
                <div class="clos">
                    <div class="on"> 
                        <div v-for="(clos,index) in 4" :key="index" class="box" :class="{cudraw:index==num}"></div>
                    </div>
                    <div class="down"> 
                        <div v-for="(clos,index) in 4" :key="index" class="box" :class="{cudraw:index==num}"></div>
                    </div>
                </div>
                <div class="control">
                   <input type="number" v-model="inner" placeholder="输入" />
                   <input type="number" v-model="out" placeholder="输出" style="margin-top:10px;"/>
                   <div @click=" Drawstart" style="border:1px solid white;color:white;width:100px;margin-top:20px;text-align:center;">确定</div>   
                </div>       
            </div>   

            <div class="lu" >
                <div class="lus">
                    <div class="lone"> 
                        <div v-for="(clos,index) in 4" :key="index" class="boxs" :class="{cudraw:index==num}"></div>
                    </div>
                    <div class="ltwo"> 
                        <div v-for="(clos,index) in 4" :key="index" class="boxs" :class="{cudraw:index==num}"></div>
                    </div>
                </div>
                       
            </div>  
             

            
           
  </div>
</template>

<script>
export default {
    data(){
        return{
            sx:50,
            sy:40,
            num:0,
            table:[],
            left:[],
            top:[],
            topm:[],
            tsline:[],
            teline:[],
            lsline:[],
            topnode:[],
            point:[],
            inner: null,
            out:null,
            demopoint:[],
            rgbs:null,
            list:[],
            listx:[],
            positions:'',
           




        }
    },
    mounted(){
        this.draw()
    },
    watch:{
        // rgbs:{
        //     immediate:false,
        //     handler: function(newval,oldval){
        //       if(newval==oldval){
        //           this.rgb()
        //       }
                
        //     }
        // }
    },
    methods:{

        draw(){
            
            var elx=document.getElementsByClassName("box")
            var elsey=document.getElementsByClassName("boxs")
            var topbox=document.getElementsByClassName("box").length
            var leftbox=document.getElementsByClassName("boxs").length
            // 右侧盒子的左边框中心点
            for (let i = 0; i < elsey.length; i++) {
                var ly=elsey[i].getBoundingClientRect().y+70
                var lx=elsey[i].getBoundingClientRect().x
                this.left.push({x:lx,y:ly}) 
                this.left.sort(this.drawline('y'))        
            }
            for (let i = 0; i < this.left.length; i++) {
                var t=this.left
                t[i]['leftid']=i+1
                this.left=t     
            }
           


            // 顶部盒子非中心点
            for (let i = 0; i < topbox; i++) {
                var lx=elx[i].getBoundingClientRect().x-20
                var ly=elx[i].getBoundingClientRect().y+70
                this.top.push({x:lx,y:ly,topid:i+1})   
            }
            // 中间的表格框
            for(let i = 0; i < leftbox; i++){  
                var my=this.left[i].y
                for (let i = 0; i < topbox/2; i++) {
                    var a1x=elx[i].getBoundingClientRect().x-20
                    var a1mx=(elx[i].clientWidth/2)+elx[i].getBoundingClientRect().x
                    this.list.push({x:a1mx,y:my})//盒子的中点
                    this.table.push({x:a1x,y:my})
                    this.table.push({x:a1mx,y:my})
                   
                }

            }
           
            //表格竖线
            // 每一竖的起点
            for (let i = 0; i<topbox; i++) {
                var snodex=this.table[i].x
                var snodey=this.table[i].y
                // console.log(snodex,snodey)
                this.tsline.push({snodex:snodex,snodey:snodey})
        
            }
            // 每一竖的终点
            for (let i = this.table.length-1; i>(this.table.length-topbox-1); i--) {
                var enodex=this.table[i].x
                var enodey=this.table[i].y
                // console.log(enodex,enodey)
                this.teline.unshift({enodex:enodex,enodey:enodey})
                
        
                
            }
            //表格横线
            // 每一横的起点   
            for (let i =0; i<topbox; i++) {
                var snodex=this.table[0].x
                var snodey=this.left[i].y
                // // console.log(snodex,snodey)
                this.lsline.push({snodex:snodex,snodey:snodey})
               
                     
            }
            //顶部和table连接点
            for (let i = 0; i < topbox; i++) {
                var x=elx[i].getBoundingClientRect().x-20 
                var y=this.tsline[i].snodey
                this.topnode.push({x:x,y:y})    
            }


            //顶部盒子的左边框中心点
            for (let i = 0; i < topbox; i++) {
                var tmx=elx[i].getBoundingClientRect().x
                var tmy=elx[i].getBoundingClientRect().y+70
                this.topm.push({x:tmx,y:tmy,topmid:i+1})
            }   
        },

        //给左侧盒子重新排序
        drawline(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },

        Drawstart(){
            //根据输入设置路径点
            this.demopoint=[]//暂时装每次输入的路径点
            //起点
            this.topm.forEach(item => {
                if(item.topmid==this.inner){
                    this.sx=item.x
                    this.sy=item.y
                    this.demopoint.push(this.sx,this.sy)
                   
                }
                
            });

            //第一个必须的转点
            this.top.forEach(item => {
                if(item.topid==this.inner){
                    var c1x=item.x
                    var c1y=item.y
                    this.demopoint.push(c1x,c1y)
                }
            });
            
            //终点
           
            this.demopoint.push(this.demopoint[2],this.left[0].y)  
            //顶部盒子要比第一排多一个转折点  
            //设置顶部盒子第二排的起始点
            if(this.inner>this.top.length/2){
                var len=this.top.length/2+1
                var m=this.inner-len
                var c2x=this.list[m].x
                var c2y=this.list[m].y
                this.demopoint.push(c2x,c2y)
                var c3x= this.demopoint[6]
                var c3y=this.left[this.out-1].y
                this.demopoint.push(c3x,c3y)
            }

            //设置顶部盒子第一排的转折点
            if(this.inner<=this.top.length/2){
                var c3x= this.demopoint[4]
                var c3y=this.left[this.out-1].y
                this.demopoint.push(c3x,c3y)
            }

            //线的终点
            this.demopoint.push(this.left[this.out-1].x,this.left[this.out-1].y)   
            this.point.push({points:this.demopoint})


            
            //放置盒子与线的交点
            for (let i = 0; i < this.point.length; i++) {
                var len=this.point[i].points.length
                this.listx.push({x:this.point[i].points[len-4],y:this.point[i].points[len-3]})
                
            }



            //给线赋颜色 
           console.log(this.point)
            for (let i = 0; i < this.point.length; i++) {
                var mx=this.point[i].points[0] 
                var my=this.point[i].points[1] 
                var s=this.point.length
                if(mx==this.sx&&my==this.sy&&s!=1){
                    // console.log(i)
                    setTimeout(() => {
                        var m=document.getElementsByClassName("actionline")[i].getAttribute("stroke") 
                        document.getElementsByClassName("actionline")[s-1].setAttribute("stroke",m) 
                    },10); 
                    break;   
                }
                else{
                    // console.log(mx,my,this.sx,this.sy)
                    this.Makergb()
                    var t='rgb'+this.rgbs
                    setTimeout(() => {
                        document.getElementsByClassName("actionline")[s-1].setAttribute("stroke",t) 
                    },10);  
                }
            }

           
                
            
        },
        Makergb(){//rgb颜色随机
			var r = Math.floor(Math.random()*256);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
			var rgb = '('+r+','+g+','+b+')';
			this.rgbs=rgb
        },
        go(i){
            console.log(this.listx[i].x,this.listx[i].y)


        }
       
        
       
    }
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
	-webkit-appearance: none !important;
	margin: 0;
    
}
input{
    outline: none;
    cursor: pointer;
}

.clo{
    width: 1880px;
    margin-left: 40px;
    height: 320px;
    margin-top: 20px;
    cursor: pointer;
    float: left;
    display: flex;
   
}
.control{
    width:570px ;
    height: 300px;
    background: rgb(196, 156, 233);
    margin-left: 30px;
    z-index: 10;
}
.clos{
     width:1220px;
     height: 320px; 
      z-index: 10;
     /* background: chartreuse; */
}
.on{
    width:1220px;
    height: 140px;
    display: flex;
     z-index: 10;
    /* background: cadetblue; */
   
}
.down{
    width:1220px;
    height: 140px;
    display: flex;
    /* background: cadetblue; */
    margin-top: 20px;
     z-index: 10;
}
.box{
    width: 265px;
    height: 140px;
    background: plum;
    margin-left: 40px;
     z-index: 10;
}
.boxe{
    width: 265px;
    height: 140px;
    background: rgb(240, 212, 240);
    margin-left: 40px;
     z-index: 10;
}





.lu{
    width: 570px;
    height: 740px;
    /* background: cornsilk; */
    cursor: pointer;
    float:right;
    margin-right: 60px;

   
}
.lus{
     width:550px;
     display: flex;
     height: 740px; 
      z-index: 10;
     /* background: chartreuse; */
}
.lone{
    width:265px;
    height: 640px;
    /* background: cadetblue; */
    margin-right:40px;
    margin-top: 80px;
     z-index: 10;
}
.ltwo{
    width:265px;
    height: 640px;
    margin-right: 40px;
     z-index: 10;
}
.boxs{
    width: 265px;
    height: 140px;
    background: plum;
    margin-bottom:20px;
     z-index: 10;
   
}


.hh{
    stroke-dasharray:3000;
    stroke-dashoffset:3000;
    animation: dash 4.5s ease-in-out infinite;
}
@keyframes dash{
    to{
     stroke-dashoffset:0;   
    }
}
body{
    padding: 0;
    margin: 0;
}
.con{
    width: 1920px;
    height: 1080px; 
    
}
</style>
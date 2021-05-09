<template>
  <div class="drawers">
    <el-drawer
        :visible.sync="sharebox"
        direction="ltr"
        :before-close="handleClose"
        :modal="false"
        size="580px"
        :withHeader="false"
        custom-class="sharebox">
        <div class="titles">{{titles}}</div>
        <div class="hot">
            <div class="add-img">
                <div class="add">
                    <el-upload
                    action="#"
                    list-type="picture"
                    
                    :limit="1"
                    :auto-upload="false"
                    :on-change="handleChange"
                    >
                        <span class="new"><i class="el-icon-plus" /></span>
                        <div slot="file" slot-scope="{file}">
                            <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""/>
                        
                            <span class="el-upload-list__item-actions">
                                <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                                >
                                <i class="el-icon-zoom-in"></i>
                                </span>
                                <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleRemove(file)"
                                >
                                <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>	
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" custom-class="predialog" :modal="false" :modal-append-to-body="false">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>   
            </div>	

            <div class="share_info">
                <ul v-show="titles=='新建分享'">
                    <li>
                        <span style="font-size:19px; font-weight:600;">添加留言：</span>
                    </li>
                    <li>
                        <textarea class="sharetext" v-model="ideaword" style="resize: none;"/>
                    </li>
                    <li>
                        <div class="submit" @click="Addsharework"><p style="font-size:25px; margin:0;">上传</p></div>
                    </li>
                </ul>
                <ul v-show="titles=='新建拍卖'">
                    <li>
                        <span style="font-size:19px; font-weight:600;">作品名称：</span><input v-model="workname" type="text">
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">画作作者：</span><input v-model="author" type="text">
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">创作年份：</span><input v-model="maketime" type="number">
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">起拍价格：</span><input v-model="workprice" type="number">
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">截止时间：</span>
                        <el-date-picker
                            v-model="endtime"
                            type="datetime"
                            default-time="23:59:59"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                           :picker-options="pickerOptions"
                        >
                        </el-date-picker>
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">画作类型：</span>
                        <el-select v-model="value" placeholder="请选择类型" >
                            <el-option
                            v-for="item in Worktype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">画作简介：</span>
                    </li>
                    <li>
                        <textarea v-model="ideaword" class="saletext" style="resize: none;"/>
                    </li>
                    <li>
                        <div class="submit" @click="Addsalework()"><p style="font-size:25px; margin:0;">上传</p></div>
                    </li>
                </ul>
            </div>        
        </div>
        <div class="backbox" @click="Closedrawer()">
            <i class="el-icon-minus"></i>
        </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    computed: {
		...mapState({
			LoginState:state=>state.loginStore.LoginState,
			Loginid:state=>state.loginStore.Loginid,
			
		})	
	},
    data(){
        return{
            sharebox:false,
            imageUrl:'', 
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            proofImage:''
,            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
                    // return date.getTime() <= Date.now();    //禁用今天以及以前的日期
                }
            },
            titles:'',
            ideaword:'',
            endtime:'',
            workname:'',
            author:'',
            maketime:'',
            workprice:null,
            Worktype: [
                {
                    value: '人物',
                    label: '人物'
                }, 
                {
                    value: '风景',
                    label: '风景'
                }, 
                {
                    value: '静物',
                    label: '静物'
                }, 
                {
                    value: '建筑',
                    label: '建筑'
                }
            ],
            value: ''//作品绘画类型值
        }
    },
    methods:{
        handleClose(done) {
			done();
        },
        Closedrawer(){
            this.sharebox=false
        },
        handleRemove(file) { 
			console.log(file);
        },
		handlePictureCardPreview(file) {
            console.log("visivisi",file.url)
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;	
        },
        handleChange(file){
            console.log(file)
            var _this=this
            this.getBase64(file.raw).then(res => {
                const params = res.split(',')
                if (params.length > 0) {
                    _this.proofImage = params[1]
                }
                // console.log(params, 'params')
                _this.Sendurl(params)
                _this.imageUrl=params[0]+','+params[1] 
            })


        },
        Sendurl(params){
            var urlinfo=params[0]+','+params[1] 
            this.imageUrl=urlinfo
            console.log(this.imageUrl)
        },
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                const reader = new FileReader()
                let imgResult = ''
                reader.readAsDataURL(file)
                reader.onload = function () {
                imgResult = reader.result
                }
                reader.onerror = function (error) {
                    reject(error)
                }
                reader.onloadend = function () {
                    resolve(imgResult)
                }
            })
        },


        changeTime(time){
            var t=0
            var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
            var nowDate = new Date(time).getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
            var target = new Date(nowDate + offset_GMT * 60 * 1000  );
            var date = target;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y+M+D+h+m+s 
        },  
        
        async Addsharework(){
            console.log(this.imageUrl)
            var date=new Date()
            var time=date.getTime()
            console.log(this.workname)
            let form={
				owntype:'分享',
				worktype:'',
				workname:'',
				maketime:'',
				storetotal:0,
				ideaword:this.ideaword,
				loadtime:this.changeTime(time),
				endtime:this.changeTime(time),
				salecompany:'',
				author:'',
				ownnerid:this.Loginid,
				workurl:this.imageUrl,
				workprice:0,
				tempownner:this.Loginid,
				tempprice:0,
				tempstore:false,
				tempmind:false
            }
            
            console.log("拍卖作品参数",form)
            const {data:res}=await this.$http.put("addworklist",form)
            if(res!='success'){
				return this.$message.error("发布失败")
			}
			else{
                this.$message.success("发布成功")
                this.sharebox=false
			}
        },
        async Addsalework(){
            var date=new Date()
            var time=date.getTime()
            console.log(this.workname)
            let form={
				owntype:'出售',
				worktype:this.value,
				workname:this.workname,
				maketime:this.maketime,
				storetotal:0,
				ideaword:this.ideaword,
				loadtime:this.changeTime(time),
				endtime:this.endtime,
				salecompany:'星宇',
				author:this.author,
				ownnerid:this.Loginid,
				workurl:this.imageUrl,
				workprice:this.workprice,
				tempownner:this.Loginid,
				tempprice:this.workprice,
				tempstore:false,
				tempmind:false
            }
            
            console.log("拍卖作品参数",form)
            const {data:res}=await this.$http.put("addworklist",form)
            if(res!='success'){
				return this.$message.error("发布失败")
			}
			else{
                this.$message.success("发布成功")
                this.$parent.getAllSaleData()
                this.sharebox=false
			}
            
        }
    },
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__wrapper{
    margin-top: 55px;
    margin-left: 140px;
}
.name{
	width: 170px;
	height: 20px;
	overflow: hidden;
}

.new{
    font-size: 75px;
	margin-left:190px;
	margin-top: 70px;
	position: absolute;
    color:#a9bee2a1;
   
}
.titles{
    width: 530px;
    text-align: center;
    position: absolute;
    top:12px;
    font-family: A;
    font-weight: bold;
    font-size: 22px;
    color: #a9bee2a1;
}
.hot{
	width: 490px;
	margin-top: 45px;
	height: 800px;
	box-shadow: 0 0 5px rgba(114, 115, 116, 0.644);
    float: left;
	border-radius: 10px;
    margin-left:25px ;	
}
.backbox{
    background: rgba(246, 247, 236, 0.452);
	border-radius: 0px 50px 50px 0px;
	box-shadow: 0 0 7px rgba(179, 178, 170, 0.644);
    line-height: 64px;
    padding-left: 15px;
	height: 60px;
	color: rgba(129, 159, 190, 0.644);
	font-size: 19px;
	margin-top: 430px;
	letter-spacing: 0.1em;
	cursor: pointer;
    width: 55px;
    float: left;
    margin-left: 1px;
    i{
        font-family: A;
	    font-weight: bold;
    }
}

.add-img{
	width: 460px;
	height: 300px;
	margin-left: 15px;
	margin-top: 15px;
	margin-bottom: 20px;
	box-shadow: 0 0 5px rgba(90, 120, 170, 0.63);
	border-radius: 2px;
	
}
.share_info{
    width: 350px;
    height: 130px;
    margin-left: 20px;
	color: rgb(157, 183, 212);
	font-family: A;
	margin-top: -7px;
}
.share_info ul{
	padding: 0;
	margin: 0;
}
.share_info li{
	margin-top: 10px;
}
.share_info input{
    border:1px solid rgb(178, 193, 211);
	height: 30px;
	width: 200px;
	outline:none ;
	background: rgba(244, 250, 255, 0.623);
	opacity: 0.5;
	caret-color: rgb(87, 112, 141);
	padding-left:8px ;
	color:rgb(62, 97, 136);
	font-family: A;
	font-weight: 600;
	border-radius: 8px;
    font-size: 15px;
    letter-spacing: 0.1em;
} 
.share_info .saletext{
	width: 442px;
	height: 75px;
	opacity: 0.5;
	border-radius: 5px;
	letter-spacing: 0.1em;
	outline: none;
    padding-left: 8px;
    padding-top: 7px;
	border:1px solid rgb(178, 193, 211);
	caret-color: rgb(87, 112, 141);
	color:rgb(62, 97, 136);
	background: rgba(244, 250, 255, 0.623);
	font-family: A;
	font-weight: 600;
    font-size: 16px;
}
.share_info .sharetext{
	width: 435px;
	height: 200px;
	opacity: 0.5;
	border-radius: 5px;
	letter-spacing: 0.1em;
	outline: none;
	padding: 8px;
	border:1px solid rgb(178, 193, 211);
	caret-color: rgb(87, 112, 141);
	color:rgb(62, 97, 136);
	background: rgba(244, 250, 255, 0.623);
	font-family: A;
	font-weight: 600;
    font-size: 16px;
}
.submit{
	cursor: pointer;
	text-align: center;
	margin-left: 135px;
	margin-top: 25px;
	width: 180px;
    height: 40px;
    line-height: 40px;
	border-radius: 5px;
	box-shadow: 0 0 5px rgb(82, 113, 148);
	opacity: 0.7;
	font-size:13px;
	color: rgb(94, 122, 155);
}
.el-upload-list__item-thumbnail{
	width: 435px;
	height: 270px;
    opacity: 0.6;
}
.el-upload-list__item-preview{
    font-size: 45px;
    position: absolute;
    left: 205px;
    top: 110px;
    z-index: 10;
}
li{
    list-style: none;
}
/deep/ .el-select {
    width: 210px;
    margin-left: -5px;
    .el-input.is-focus .el-input__inner{
        border:1px solid rgb(178, 193, 211);
        outline: none;
    }
    .el-input__inner:focus{
        border:1px solid rgb(178, 193, 211);
        outline: none; 
    }
    .el-input{
        opacity: 0.5;
        .el-input__inner{
            padding: 8px;
            border:1px solid rgb(178, 193, 211);  
            font-family: A;
            font-weight: 600;
            font-size: 15px;
            letter-spacing: 0.1em;
            background: rgba(244, 250, 255, 0.623);
            border-radius: 8px;
            color:rgb(62, 97, 136);
        }
    }
    
}
.el-select-dropdown.el-popper{
    border: none;
    li{
        color: rgba(62, 96, 136, 0.527);
        font-family: A;
        font-weight: bold;
        font-size: 16px;
        &:hover{
            background: #1b929600;
            color: rgba(62, 96, 136, 0.966);
        }
        &.hover{
            background: #17c3cf00;
        }
    }
}

//日期选择器
/deep/ .el-date-editor{
    width: 210px;
    margin-left: -5px;
    .el-input.is-focus .el-input__inner{
        border:1px solid rgb(178, 193, 211);
        outline: none;
    }
    .el-input__inner:focus{
        border:1px solid rgb(178, 193, 211);
        outline: none; 
    }
    .el-input__inner{
        cursor: pointer;
        padding: 8px;
        border:1px solid rgba(178, 193, 211, 0.548);  
        font-family: A;
        font-weight: 600;
        font-size: 15px;
        letter-spacing: 0.1em;
        background: rgba(244, 250, 255, 0.253);
        border-radius: 8px;
        color:rgba(143, 168, 197, 0.932);
    }
    .el-input__prefix{
        display: none;
    }
}


</style>
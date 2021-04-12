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
                    :auto-upload="false">
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
                        <textarea class="sharetext" style="resize: none;"/>
                    </li>
                    <li>
                        <div class="submit"><p style="font-size:25px; margin:0;">上传</p></div>
                    </li>
                </ul>
                <ul v-show="titles=='新建拍卖'">
                    <li>
                        <span style="font-size:19px; font-weight:600;">作品名称：</span><input :v-model="Workinfo.workname" type="text">
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">画作作者：</span><input :v-model="Workinfo.author" type="text">
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">创作年份：</span><input :v-model="Workinfo.maketime" type="number">
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">起拍价格：</span><input :v-model="Workinfo.workprice" type="number">
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">开拍时间：</span>
                        <el-date-picker
                            v-model="startime"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp"
                        >
                        </el-date-picker>
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">画作类型：</span>
                        <el-select v-model="value" placeholder="请选择类型" >
                            <el-option
                            v-for="item in Workinfo.Worktype"
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
                        <textarea  class="saletext" style="resize: none;"/>
                    </li>
                    <li>
                        <div class="submit"><p style="font-size:25px; margin:0;">上传</p></div>
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
export default {
    data(){
        return{
            sharebox:false,
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            titles:'',
            startime:'',
            Workinfo:{
                workname:'',
                author:'',
                maketime:null,
                workprice:null,
                Worktype: [
                    {
                        value: '选项1',
                        label: '人物'
                    }, 
                    {
                        value: '选项2',
                        label: '风景'
                    }, 
                    {
                        value: '选项3',
                        label: '静物'
                    }, 
                    {
                        value: '选项4',
                        label: '建筑'
                    }
                ]
            },
            value: ''
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
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;	
		},
		handleDownload(file) {
			console.log(file);
		},
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
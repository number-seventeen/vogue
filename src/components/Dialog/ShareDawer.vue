<template>
  <div class="drawers">
    <el-drawer
        :visible.sync="sharebox"
        direction="ltr"
        :before-close="handleClose"
        :modal="false"
        size="540px"
        :withHeader="false"
        custom-class="sharebox">
        <div class="titles">新建分享</div>
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
                <ul>
                    <li>
                        <span style="font-size:19px; font-weight:600;">作品名称：</span><input type="text">
                    
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">画作作者：</span><input type="text">
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">创作年份：</span><input type="text">
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">画作类型：</span><input type="text">
                    </li>
                    <li>
                        <span style="font-size:19px; font-weight:600;">画作简介：</span>
                    </li>
                    <li>
                        <textarea style="resize: none;"/>
                    </li>
                    <li>
                        <div class="submit"><p style="font-size:25px; margin:0;">上传</p></div>
                    </li>
                </ul>
            </div>        
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
        }
    },
    methods:{
        handleClose(done) {
			done();
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
.el-dialog__wrapper{
    margin-left: 200px;
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
    width: 100%;
    text-align: center;
    position: absolute;
    top:20px;
    font-family: A;
    font-weight: bold;
    font-size: 22px;
    color: #a9bee2a1;
}
.hot{
	width: 490px;
	margin-top: 65px;
	height: 820px;
	box-shadow: 0 0 5px rgba(114, 115, 116, 0.644);
	float: left;
	border-radius: 10px;
    margin-left:25px ;
    
		
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
    width: 290px;
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
	width: 170px;
	outline:none ;
	background: rgba(244, 250, 255, 0.623);
	opacity: 0.5;
	caret-color: rgb(87, 112, 141);
	padding-left:4px ;
	color:rgb(62, 97, 136);
	font-family: A;
	font-weight: 600;
	border-radius: 8px;
    font-size: 15px;
} 
.share_info textarea{
	width: 400px;
	height: 150px;
	opacity: 0.5;
	border-radius: 5px;
	letter-spacing: 0.1em;
	outline: none;
	padding-left: 4px;
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
	margin-left: 102px;
	margin-top: 35px;
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
</style>
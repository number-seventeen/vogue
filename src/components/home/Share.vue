<template>
	<div class="main">
		<div class="background">
			<img :src="bk" class="backimg" />
		</div>
		<div>
			<div class="main_head">
				<div class="appname">
					<div>
						<!-- <img src="../../assets/img/star.png" style="width:245px;height:70px;margin:7px 0 0px 10px;" class="mainlogo"/> -->
						High Light
					</div>
					<!-- <p class="note">心有瑰宝 绚丽灿烂 唯有艺术是生动的永恒 </p> -->
				<!-- 星夜来自于梵高知名度最高作品之一的星夜，漫舞是将画家在绘画时画笔在挥动时的状态比喻成跳舞-->
				</div>
				<div class="set" >
					<el-col :span="12" style="line-height: 45px;"> 
						<el-dropdown trigger="click">
							<span class="el-dropdown-link" style="font-size:30px; letter-spacing:0.1em;">设置</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item ><router-link to="/">退出登录</router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/">返回首页</router-link></el-dropdown-item>
								<el-dropdown-item ><router-link to="/">个人中心</router-link></el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
				</div>

			</div>
			<div class="items_nav">
					<ul class="item_nav">
						<li class="navlist" v-for="(nlist,index) in navs" :key="index" @click="ChangeCu(index)" :class="{cupage:index===pageid}">
							{{nlist.name}}
						</li>
					</ul>	
			</div>
			<div class="content">
		
				<div class="item_fram">
					<div class="scenery_auction">
								<div class="works_card">
									<div class="works_img">
										<div class="history_img"><img src="../../assets/img/09.jpg" style="width:450px;height:340px;"/></div>
										<div class="history_list">
											<div class="list_title">
												历史分享
											</div>
											<div class="h_list">
												<ul>
													<li><div class="name">
														<span>《</span>
														群鸦飞舞的稻田
														<span>》</span>
														</div>
														<div style="width:170px;"><span>上传时间：2020年1月29日</span></div>
														<el-col :span="12" style="width:60px;height:20px; margin-top:-1px; margin-left:20px;">
															<el-dropdown trigger="click" style="width:60px;height:20px;">
																<span class="el-dropdown-link" style="font-size:12px; letter-spacing:0.1em;color:rgba(90, 120, 170, 0.63);" >更多详情</span>
																<el-dropdown-menu slot="dropdown">
																	<el-dropdown-item ><router-link to="/">查看详情</router-link></el-dropdown-item>
																	<el-dropdown-item ><router-link to="/">删除</router-link></el-dropdown-item>
																	
																</el-dropdown-menu>
															</el-dropdown>
														</el-col>
													</li>
													<li><div class="name">
														<span>《</span>
														群鸦飞舞的稻田
														<span>》</span>
														</div>
														<div style="width:170px;"><span>上传时间：2020年3月29日</span></div>
														<el-col :span="12" style="width:60px;height:20px; margin-top:-1px; margin-left:20px;">
															<el-dropdown trigger="click" style="width:60px;height:20px;">
																<span class="el-dropdown-link" style="font-size:12px; letter-spacing:0.1em;color:rgba(90, 120, 170, 0.63);" >更多详情</span>
																<el-dropdown-menu slot="dropdown">
																	<el-dropdown-item ><router-link to="/">查看详情</router-link></el-dropdown-item>
																	<el-dropdown-item ><router-link to="/">删除</router-link></el-dropdown-item>
																	
																</el-dropdown-menu>
															</el-dropdown>
														</el-col>
													</li>
													<li><div class="name">
														<span>《</span>
														群鸦飞舞的稻田
														<span>》</span>
														</div>
														<div style="width:170px;"><span>上传时间：2020年3月29日</span></div>
														<el-col :span="12" style="width:60px;height:20px; margin-top:-1px; margin-left:20px;">
															<el-dropdown trigger="click" style="width:60px;height:20px;">
																<span class="el-dropdown-link" style="font-size:12px; letter-spacing:0.1em;color:rgba(90, 120, 170, 0.63);" >更多详情</span>
																<el-dropdown-menu slot="dropdown">
																	<el-dropdown-item ><router-link to="/">查看详情</router-link></el-dropdown-item>
																	<el-dropdown-item ><router-link to="/">删除</router-link></el-dropdown-item>
																	
																</el-dropdown-menu>
															</el-dropdown>
														</el-col>
													</li>
													
												</ul>
											</div>
										</div>
									</div>
									<div class="work_brief">
										<ul>
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>
											</li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>
											</li>
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div> 
											</li>
											
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>  
											</li>
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>  
											</li>
											<li>
												<div class="pinlun">
													<div class="user_icon"></div>
													<div class="user_name">梵高</div>
													<div class="pin_word">精细的描绘，深厚的绘画功底，很久之前就喜欢大师的作品，收藏价值高</div>
												</div>  
											</li>
										</ul>
										<!-- <div  class="join" >上传</div> -->
									</div>
								</div>
					</div>	
				</div>
				<div class="hot">
					<div class="add-img">
						<!-- 上传图片组件 -->
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
							<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
						</div>
						<!-- 上传图片组件 -->
					</div>	
					<div class="share_info">
						<ul>
							<li>
								<span style="font-size:15px; font-weight:600;">作品名称：</span><input type="text">
							
							</li>
							<li>
								<span style="font-size:15px; font-weight:600;">画作作者：</span><input type="text">
							</li>
							<li>
								<span style="font-size:15px; font-weight:600;">创作年份：</span><input type="text">
							</li>
							<li>
								<span style="font-size:15px; font-weight:600;">画作类型：</span><input type="text">
							</li>
							<li>
								<span style="font-size:15px; font-weight:600;">画作简介：</span>
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
				<div class="pic_show">
				</div>
					
			</div>
			<!-- 内容盒子底部 -->
		</div>
	</div>
</template>
<script>
export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
		disabled: false,
		bk:require('../../assets/img/48.jpg'),
		RouterHead:'',
		RouterFoot:'',
		navs:[
			{
				name:'艺术之廊',
				head:'Homepage'
			},
			{
				name:'分享画作',
				head:'Share'
			},
			{
				name:'拍卖画作',
				head:'Sale'
			},
			{
				name:'绘画指导',
				head:'Learn'
			},
		],
		pageid:1,
      };
    },
    methods: {
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
		ChangeCu(i){
			this.pageid=i
			for (let indes = 0; indes < this.navs.length; indes++) {
				if(indes==i){
					this.RouterHead=this.navs[i].head
					this.RouterFoot=''
				}
				
			}
			this.ChangeRouter()
		},
		ChangeRouter(){
			this.$router.push({ path: `/${this.RouterHead}/${this.RouterFoot}`,query:{pageid:this.pageid}})
		},

	},


	mounted(){
		// this.pageid=this.$route.query.pageid
	},
}
</script>
<style src='../../assets/css/share.css' scoped>	
</style>
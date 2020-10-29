<template>
	<div class="main">
		<div class="background">
			<img :src="bk" class="backimg" />
		</div>
		<div class="rcontent" style="z-index:10;">
			<div class="head">
				<div class="appname">
					<!-- <img src="../../assets/img/star.png" style="width:275px;height:90px;margin:-10px 0 0px 10px;" class="mainlogo"/> -->
					High Light
				</div>
				<!-- <p class="note">人间烟火冷漠 唯有理想炽热</p> -->
				<!-- 星夜来自于梵高知名度最高作品之一的星夜，漫舞是将画家在绘画时画笔在挥动时的状态比喻成跳舞-->
				<div class="login">
					<div class="navs" v-for="(inav,index) in indexnav" :key="index" :class="{cuinav:index==navid}" @click="Changeindex(index)" @mouseover="Changeinav(index)" @mouseout="moveinav()">{{inav.name}}</div>
				</div>
			</div>

			<div class="show">
				<!-- <div class="abouts">
					<div class="about one">high light意为高光，在艺术领域是为艺术作品提亮的一种手法。意为提高作品的立体感让作品更加饱满和亮眼</div>
					<div class="about two">如果您热爱艺术并想要展示您的艺术作品，或者想要学习、欣赏、购买更多的画作，欢迎您加入high light！</div>
					<div class="about three">-了解更多关于high light的使用tips-</div>
				</div> -->
					<div class="rigister_box">
						<div class="register_pic">
							<span style="font-family: DZF;margin-top:8px;">加入</span><span style="margin-left:10px;">high light</span>
						</div>
						<div class="form_box">
							<form>
								<div class="usericon"><el-avatar :src="uicon" :size="50" fit="scale-down" @error="errorHandler"></el-avatar></div>
								<div><label style="font-size: 15px;">用户昵称:</label><input type="text" name="userName" v-model="userName" autocomplete="off"></div>
								<div><label style="font-size: 15px;">登录密码:</label><input type="text" name="password" v-model="password" autocomplete="off"></div>
								<div><label style="font-size: 15px;">确认密码:</label><input type="text" name="supassword" v-model="supassword" autocomplete="off"></div>
								<div class="chooseblong" style="cursor: pointer; display:flex; width:260px;height:40px;">
									<el-radio-group v-model="blong">
										<el-radio label="个人用户"></el-radio>
										<el-radio label="工作室"></el-radio>
									</el-radio-group>
								</div>				
								<div class="input_botton" @click="Rsuc()" :class="{joins:rtrue==true}">注册</div>
							</form>
						</div>
					</div>
				
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			RouterHead:'',
			RouterFoot:'',
			navid:5,
			rtrue:false,
			logindialog:false,
			bk:require('../../assets/img/41.jpg'),
			uicon:require('../../assets/img/uicon.png'),
			indexnav:[
			    {
				   RouterHead:'#',
				   name:'返回首页'
				},
		   ],

		   blong:'',
		   userName:'',
		   password:'',
		   supassword:'',

		}
	},
	watch:{
            password:function(){
                if(this.password!=this.password.replace(/[\W]/g,'')){
					this.$message({
						message: '密码请设置为字母加数字!',
						type: 'warning',
						duration:1500,
					});
					this.password=this.password.replace(/[\W]/g,'')
					return false	
				};
			},
			supassword:function(){
				this.supassword=this.supassword.replace(/[\W]/g,'');
			}
    }, 
	methods:{
		Changeinav(i){
			this.navid=i
		},
		moveinav(){
			this.navid=5
		},
		Changeindex(i){
			this.RouterHead=this.indexnav[0].RouterHead
			this.RouterFoot=''
			this.ChangeRouter()
		},
		Rsuc(){
			this.rtrue=true
			if (!this.userName) {
				
				this.$message({
					message: '请设置用户昵称!',
					type: 'warning',
					duration:1500,
				});
				return false
			}

			if (!this.password) {
				this.$message({
					message: '请设置登录密码!',
					type: 'warning',
					duration:1500,
				});
				return false
			}
			if(this.password.length<=8){
					this.$message({
						message: '密码长度应为8～12!',
						type: 'warning',
						duration:1500,
					});
					this.password=this.password.replace(/[\W]/g,'')
					return false	
			};
			if (!this.supassword) {
				this.$message({
					message: '请设置确认密码!',
					type: 'warning',
					duration:1500,
				});
			}
			if (this.supassword!=this.password) {
				this.$message({
					message: '登录密码与确认密码不相同！',
					type: 'warning',
					duration:1500,
				});
				return false
			}
			if (!this.blong) {
				this.$message({
					message: '请选择用户类别!',
					type: 'warning',
					duration:1500,
				});
				return false
			}
			this.$message({
				message: '注册成功   登录探索更多灵感吧!',
				duration:3000,
			});
			this.RouterHead='#'
			this.RouterFoot=''
			this.logindialog=true
			this.ChangeRouter()
		},
		ChangeRouter(){
			this.$router.push({ path: `/${this.RouterHead}/${this.RouterFoot}`,query:{pageid:this.pageid,logindialog:this.logindialog}})
		},
		errorHandler() {
        	return true
      	},
	}
}
</script>
<style src='../../assets/css/register.css' scoped>

</style>

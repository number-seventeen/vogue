
<template >	
	<div class="main">
		<div class="background">
			<img :src="bk" class="backimg" />
		</div>
		<div class="icontent" style="z-index:10;">
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
			<div class="show" v-show="logindialog" :class="{out:this.isout==true}">
					<div class="login_box"  v-show='showbox=="loginbox" '>
						<div class="login_pic">
							login
						</div>
						<div class="flogin_box">
								<div><label style="font-size: 17px;">用户昵称:</label><input type="text" name="uname" v-model="userName" autocomplete="off"></div>
								<div><label style="font-size: 17px;">登录密码:</label><input type="password" name="pwd" v-model="password" autocomplete="off"></div>				
								<div class="login_botton" @click="submit()"  style="color:#686669;font-size:13px;font-family:A;">登录</div>
						</div>
						<div class="pwd_forgot">
							<div><router-link to="/"><span style="color:white;font-weight:600;">忘记密码</span></router-link></div>
						</div>
					</div>

					<!-- 注册盒子 -->
					<div class="rigister_box" v-show=' showbox=="registerbox" '>
						<div class="register_pic">
							<span style="margin-left:10px;">register</span>
						</div>
						<div class="form_box">
							<form>
								<!-- <div class="usericon"><el-avatar :src="uicon" :size="50" fit="scale-down" @error="errorHandler"></el-avatar></div> -->
								<div><label style="font-size: 17px;">用户昵称:</label><input type="text" name="userName" v-model="userName" autocomplete="off"></div>
								<div><label style="font-size: 17px;">登录密码:</label><input type="text" name="password" v-model="password" autocomplete="off"></div>
								<div><label style="font-size: 17px;">确认密码:</label><input type="text" name="supassword" v-model="supassword" autocomplete="off"></div>
								<div class="chooseblong" style="cursor: pointer; display:flex; width:260px;height:40px;">
									<el-radio-group v-model="blong">
										<el-radio label="个人用户"></el-radio>
										<el-radio label="工作室"></el-radio>
									</el-radio-group>
								</div>				
								<div class="input_botton" @click="Rsuc()" :class="{joins:rtrue==true}" style="color:#554b4b;font-size:13px;font-family:A;">注册</div>
							</form>
						</div>
					</div>

					<div class="abouts" v-show='showbox=="registerbox" '>
						<div class="about one">high light意为高光，在艺术领域是为艺术作品提亮的一种手法。意为提高作品的立体感让作品更加饱满和亮眼</div>
						<div class="about two">如果您热爱艺术并想要展示您的艺术作品，或者想要学习、欣赏、购买更多的画作，欢迎您加入high light！</div>
						<div class="about three">-点击了解更多关于high light的使用tips-</div>
					</div>
				
					<div class="close" ><i class="el-icon-arrow-down" @click="movelogin()" /></div>
			</div>


			
			<div class="footer">
				<div class="connect">
					<ul>
						<li style="font-size: 13px; margin-right: 10px;">Copyright©high light  all rights reserved</li>
						<li style="margin-right: 10px;">TEL: 400-732-580</li>
						<li style="margin-right: 10px;">QQ: 362806921</li>
						<li style="margin-right: 10px;">EMIL: high light@163.com</li>
					</ul>		
				</div>
				<div style="font-family:A;">地址: 四川省成都市金堂县西南交通大学希望学院</div>
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
			islogin:false,
			logindialog:false,
			isout:false,
			bk:require('../../assets/img/70.jpg'),
			userName:'',
			password:'',
			blong:'',
			supassword:'',
			rtrue:false,
			showbox:'noshow',
            pic:[
               {
                   url:require('../../assets/img/04.jpg'),
                   
               },
                {
                   url:require('../../assets/img/05.jpg'),
                   
               },
                {
                   url:require('../../assets/img/06.jpg'),
                   
               },
                {
                   url:require('../../assets/img/03.jpg'),
                   
               },

           ],
		   indexnav:[
			    {
				   RouterHead:'',
				   name:'登录'
				},
			    {
				   RouterHead:'Register',
				   name:'注册'

				},
				{
				   RouterHead:'Homepage',
				   name:'画廊'
				},
		   ]
		  
		   
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
			if(i==2){
				this.RouterHead=this.indexnav[i].RouterHead
				this.RouterFoot=''
				this.ChangeRouter()
				// this.$loading.show()
			}
			if(i==0){
				this.logindialog=true
				this.showbox='loginbox'
			}
			if(i==1){
				this.logindialog=true
				this.showbox='registerbox'
			}
		},
		ChangeRouter(){
			this.$router.push({ path: `/${this.RouterHead}/${this.RouterFoot}`,query:{pageid:this.pageid,islogin:this.islogin}})
		},
		movelogin(){
			this.isout=true
			setTimeout(() => {
				this.end()
			}, 1500);
		},
		end(){
			this.isout=false
			this.logindialog=false
		},
		submit(){
			if (!this.userName) {
				this.$message({
					message: '请输入用户昵称!',
					type: 'warning',
					duration:1500,
				});
				return false
			}
			if (!this.password) {
				this.$message({
					message: '请输入密码!',
					type: 'warning',
					duration:1500,
				});
				return false
			}
			this.islogin=true
			this.RouterHead='Homepage'
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
		},
		// errorHandler() {
    //     	return true
    // },
	},
	
	mounted(){
		// this.logindialog=this.$route.query.logindialog
	}
	
	

}
</script>
<style src="../../assets/css/index.scss" scoped>

</style>


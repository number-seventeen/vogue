
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

			<div class="show">
				<!-- <div class="abouts">
					<div class="about one">high light意为高光，在艺术领域是为艺术作品提亮的一种手法。意为提高作品的立体感让作品更加饱满和亮眼</div>
					<div class="about two">如果您热爱艺术并想要展示您的艺术作品，或者想要学习、欣赏、购买更多的画作，欢迎您加入high light！</div>
					<div class="about three">-了解更多关于high light的使用tips-</div>
				</div> -->
					<div class="rigister_box" v-show="logindialog" :class="{out:isout==true}">
						<div class="close"><i class="el-icon-close" @click="movelogin()"  /></div>
						<div class="register_pic">
							login
						</div>
						<div class="form_box">
								<div><label style="font-size: 15px;">用户昵称:</label><input type="text" name="uname" v-model="userName" autocomplete="off"></div>
								<div><label style="font-size: 15px;">登录密码:</label><input type="password" name="pwd" v-model="password" autocomplete="off"></div>				
								<div style="margin-left:65px;"><input type="submit" value="登录" style="width: 100px; height: 25px; color: #464343;" class="input_botton" @click="submit()"></div>
						</div>
						<div class="pwd_forgot">
							<div><router-link to="/"><span style="color:whitesmoke;font-weight:500;">忘记密码</span></router-link></div>
						</div>
					</div>
					<!-- <span slot="footer" class="dialog-footer">
						<el-button @click="logindialog = false">登录</el-button>
					</span> -->
				
			</div>
			<div class="company">
				<!-- <div class="server">腾讯云服务</div>
				<div class="server">阿里巴巴</div>
				<div class="server">暴雪娱乐</div> -->
			</div>
			<footer>
				<div class="connect">
					<ul>
						<li style="font-size: 13px; margin-right: 10px;">Copyright©high light  all rights reserved</li>
						<li style="margin-right: 10px;">TEL: 400-732-580</li>
						<li style="margin-right: 10px;">QQ: 362806921</li>
						<li style="margin-right: 10px;">EMIL: high light@163.com</li>
					</ul>		
				</div>
				<div style="font-family:A;">地址: 四川省成都市金堂县西南交通大学希望学院</div>
			</footer>
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
			logindialog:false,
			isout:false,
			bk:require('../../assets/img/47.jpg'),
			userName:'',
		   	password:'',
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
	methods:{
		Changeinav(i){
			this.navid=i
		},
		moveinav(){
			this.navid=5
		},
		Changeindex(i){
			if(i>0){
				this.RouterHead=this.indexnav[i].RouterHead
				this.RouterFoot=''
				this.ChangeRouter()
				// this.$loading.show()
			}
			if(i==0){
				this.logindialog=true
			}
		},
		ChangeRouter(){
			this.$router.push({ path: `/${this.RouterHead}/${this.RouterFoot}`,query:{pageid:this.pageid}})
		},
		movelogin(){
			this.isout=true
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
			this.RouterHead='Homepage'
			this.RouterFoot=''
			this.ChangeRouter()
		}
	},
	mounted(){
		this.logindialog=this.$route.query.logindialog
	}
	
	

}
</script>
<style src="../../assets/css/index.scss" scoped>

</style>


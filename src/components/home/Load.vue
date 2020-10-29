<template>
	<div class="main" :style ="note">
		<div class="rigister_box">
			<div class="register_pic">
				<p>login</p>
			</div>
			<div class="form_box">
				<form action="">
					<label style="font-size: 15px;">用户昵称:</label><input type="text" name="FirstName" ><br>
					<label style="font-size: 15px;">登录密码:</label><input type="password" name="LastName" ><br>				
					<router-link to="/Homepage"><input type="submit" value="登录" style="width: 100px; height: 25px; color: #6c7fbe;  opacity: 0.3;" class="input_botton"></router-link>
				</form>
			</div>
			<div class="pwd_forgot">
				<a href="" style="font-size: 10px; margin-top:0px; margin-left:190px; padding: 0;">忘记密码
				</a>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			note: {
			backgroundImage: "url(" + require("../../assets/img/26.jpg") + ")",
			backgroundRepeat: "no-repeat",
			backgroundSize:"cover",
			}
		}
	}
}
</script>
<style src='../../assets/css/load.css' scoped>

</style>
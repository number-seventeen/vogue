<template>
  <div>
	  	<div class="background">
			<img :src="bk" class="backimg" />
		</div>
     	<div class="item_fram">
				<div class="paixu">
					<div>
						<ul>
								<li class="paixu_item"><div  class="p_person">人物类</div></li>
								<li class="paixu_item"><div  class="p_view">风景类</div></li>
								<li class="paixu_item"><div  class="p_build">建筑类</div></li>
								<li class="paixu_item"><div  class="p_stay">静物类</div></li>
								<li class="paixu_item"><div  class="p_cold">冷色调</div></li>
								<li class="paixu_item"><div  class="p_warm">暖色调</div></li>
								<li class="paixu_item"><div  class="p_coustom">民俗类</div></li>
								<li class="paixu_item"><div  class="p_history">历史类</div></li>
						</ul>
					</div>
					<div style="display:flex;margin-left:25px;">
						<div class="paixu_serch"><input placeholder="输入相关标签"/></div>
						<div class="search_img"><img src="../../assets/img/search.png" style="width:25px; height:25px; margin:4px 0px 0px 6px;"/></div>
						<div class="paixu_back"><router-link to="/Homepage">返回画廊</router-link></div>
					</div>
				</div>
				<div class="card_wrap"  >
					<div class="pic_show">
                        <!-- <div style="font-size:19px;font-weight:600;width:1215px;text-align:center;color:rgba(112, 95, 146, 0.63);">热 门 分 享 画 作 </div> -->
                        <div>
                            <ul>
                                <li v-for="(shareimg,index) in shareimgs" :key="index" @click="ChangePic(index)" :class="{cuPic:index===picid}">
                                    <div class="toshow">
                                        <div class="to_pic">
                                            <div><img class="sharepic" :src="shareimg.url" /></div>
                                        </div>
                                        <div class="to_user">
                                            <div class="to_icon"></div>
                                            <div class="to_name">梵高</div>
                                        </div>
                                    </div>	
                                </li>
                            </ul>
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
            bk:require('../../assets/img/48.jpg'),
            picid:0,
            shareimgs:[
				{
					url:require('../../assets/img/41.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/42.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/43.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/52.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/53.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/57.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/60.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/61.jpg'),
					like:100,

				},
				{
					url:require('../../assets/img/69.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/68.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/68.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/68.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/68.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/68.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/68.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/68.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/68.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/68.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/68.jpg'),
					like:100,
				},
				{
					url:require('../../assets/img/68.jpg'),
					like:100,
				},

				
			]
		}
	},
	methods: {
		
			
	}
}
</script>

<style src='../../assets/css/shareground.scss' scoped>

</style>
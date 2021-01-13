<template>
  <div>
	  	<div class="background">
			<img :src="bk" class="backimg" />
		</div>
     	<div class="item_fram">
				<div class="paixu">
					<div>
						<ul>
								<li class="paixu_item"><div  class="p_go">最受欢迎</div></li>
								<li class="paixu_item"><div  class="p_pop">最受欢迎</div></li>
								<li class="paixu_item"><div  class="p_pop">最受欢迎</div></li>
								<li class="paixu_item"><div  class="p_end">即将结束</div></li>
								<li class="paixu_item"><div  class="p_start">默认排序</div></li>
								<li class="paixu_item"><div  class="p_up">年代升序</div></li>
								<li class="paixu_item"><div  class="p_down">年代降序</div></li>
								<li class="paixu_item"><div  class="p_down">年代降序</div></li>
								<li class="paixu_item"><div  class="p_down">年代降序</div></li>
								<li class="paixu_item"><div  class="p_down">年代降序</div></li>
						</ul>
					</div>
					<div style="display:flex;margin-left:25px;">
						<div class="paixu_serch"><input placeholder="输入相关标签"/></div>
						<div class="search_img"><img src="../../assets/img/search.png" style="width:25px; height:25px; margin:4px 0px 0px 6px;"/></div>
						<div class="paixu_back"><router-link to="/Homepage">返回画廊</router-link></div>
					</div>
				</div>
				<div class="card_wrap"  >
					<div class="scenery_auction">
						<ul>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"><img src="../../assets/img/19.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"> <img src="../../assets/img/18.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"> <img src="../../assets/img/17.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"> <img src="../../assets/img/19.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"> <img src="../../assets/img/17.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"> <img src="../../assets/img/19.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"> <img src="../../assets/img/19.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"> <img src="../../assets/img/18.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"> <img src="../../assets/img/17.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"> <img src="../../assets/img/17.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"> <img src="../../assets/img/17.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>
							<li class="deal-box">
								<div class="works_card">
									<div class="point"></div>
									<div class="works_img"> <img src="../../assets/img/17.jpg" style="width:300px; height:190px; margin:10px 0px 0px 10px;"/></div>
									<div class="work_brief">
										<ul>
											<li>
												<span>*作品名称:</span><div class="wcall" >《<span>群鸦飞舞的稻田</span>》</div>
											</li>
											<li>
												<span>*创作年份:</span><div class="wtime"><span style="margin-left:6px;">2020.03.18</span></div>
											</li>
											<li>
												<span>*画家姓名:</span><div class="wname"><span style="margin-left:6px;">{{Tname}}</span></div>
											</li>
											<li>
												<span>*参与人数:</span><div class="wjoin"><span style="margin-left:6px;">{{counts}}</span></div>
											</li>
											<li>
												<span>*剩余时间:</span><div class="wrest"><span style="margin-left:6px;">{{hr}}:{{min}}:{{sec}}</span></div>
											</li>
											<li>
												<span>*当前价格:</span><div class="wprice"><span style="margin-left:6px;">2,000</span><span style="margin-left:5px;">RMB</span></div>
											</li>	
										</ul>
										<div  class="join" @click="ToBuy()">查看详情</div>
									</div>	
								</div>
							</li>

						</ul>	
					</div>	
				</div>	
		</div>
  </div>
</template>

<script>
export default {
	data(){
		return{
			bk:require('../../assets/img/62.jpg'),
		}
	},
	methods: {
		
			
	}
}
</script>

<style src='../../assets/css/deal.scss' scoped>

</style>
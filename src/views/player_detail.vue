<template>
	<div class="playerDetail">
	<!-- @top-status-change="handleTopChange" -->
	
		<div class="pd_top">
			<img :src="pd_power.icon|headUrl" >
			<h3>{{pd_power.level}}级</h3>
			<p>{{this.daqu|getAreaName}}<span>{{pd_dw.return}}</span></p>
			<p>战斗力：{{pd_power.power_value}} <span>赞：{{pd_power.praise_num}}</span></p>
		</div>
		<mt-loadmore :top-method="loadTop"  ref="loadmore"  >
		<div class="panta">
			<ul>
				<li @click="dome()">
					<img src="../assets/kill3.jpg" >
					<p>三杀：{{kill.triple_kills}}</p>
				</li>
				<li>
					<img src="../assets/kill4.jpg" >
					<p>四杀：{{kill.quadra_kills}}</p>
				</li>
				<li>
					<img src="../assets/kill5.jpg" >
					<p>五杀：{{kill.penta_kills}}</p>
				</li>
				<li>
					<img src="../assets/killicon1.jpg" >
					<p>总击杀：{{kill.kills_total}}</p>
				</li>
				<li>
					<img src="../assets/killicon2.jpg" >
					<p>MVP：{{Number(killmvp.total_match_mvps)+Number(killmvp.total_rank_mvps)}}</p>
				</li>
				<li>
					<img src="../assets/killicon3.jpg" >
					<p>超神：{{kill.god_like_num}}</p>
				</li>
			</ul>
		</div>
		<div class="zj_xq">
			<ul>
				<!-- 循环战斗信息 -->
				<li v-for="combat in combatList" @click="goToWar(combat)">
					<img :src="'http://cdn.tgp.qq.com/pallas/images/champions_id/'+combat.champion_id+'.png'" >
					<dl>
						<h3 :class="combatColor(combat.win)">{{combat.win|getWarWin}}</h3>
						<p :data-class="combat.game_type">{{combat.game_type|getWarModel}}</p>
						<span>{{combat.battle_time.substr(0,10)}}</span>
					</dl>
					<div class="heng"></div>
				</li>
			</ul>
		</div>
			<!-- <div slot="top" class="mint-loadmore-top">
			    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
			    <span v-show="topStatus === 'loading'" style="display:block"></span>
			</div> -->
		</mt-loadmore>
	</div>
</template>
<script>
	// import Vue from 'vue'
	import ajax from 'axios'
	//过滤头部内容，头像，比赛模式
	import {headUrl,getAreaName,getWarModel,getWarWin} from '../filters'
	import {mapActions} from 'vuex'
	//使用mint-ui
	// import { InfiniteScroll } from 'mint-ui'
	// Vue.use(InfiniteScroll)
	export default {
		created(){
			this.shuaxin();
			this.$parent.ifFoot = false;
			this.$parent.$refs.head.style.backgroundColor = "rgba(0,0,0,0)";
			//监听函数，首次加载一次
			this.getWarjilu();
		},
		data(){
			return{
				//传过来的参数
					//玩家ID
				pdId:this.$route.params.pdId,
				daqu:this.$route.params.daqu,
				duanwei:this.$route.params.duanwei,
				dwdj:this.$route.params.dwdj,
				pd_dw:'',
				pd_power:'',
				kill:'',
				killmvp:'',
				//比赛记录
				combatList:[],
				//h3颜色
				h3Color:false,
				//加载页数
				page:0,
				flag:true,
				dis:'display:none;'
			}
		},
		//在此路由跳转之前
		beforeRouteLeave(to, from, next){
            // console.log('beforeRouteLeave this.dis==='+this.dis);
            next(false);
            document. removeEventListener('scroll',this.shijian);
            next(true);
        },
		methods:{
			...mapActions(['setTitle']),
			loadTop() {
			  // ...// 加载更多数据
			  this.shuaxin();
			  this.getWarjilu();
			  this.$refs.loadmore.onTopLoaded();
			},
			//段位,战斗力获赞数
			shuaxin(){
				ajax.get('/api/GetTierQueue?tier='+this.duanwei+'&queue='+this.dwdj).then(res=>{
					this.pd_dw = res.data.data[0];
					// console.log(res.data.data);
				},err=>{
					console.log(err);
				});
				// 战斗力获赞数
				ajax.get('/api/UserHotInfo?qquin='+this.pdId+'&vaid='+this.daqu).then(res=>{
					this.pd_power = res.data.data[0];
					console.log(res.data.data);
					//头部名变成英雄名字
					this.topname()
				},err=>{
					console.log(err);
				});
				//三杀，五杀
				ajax.get('/api/UserExtInfo?qquin='+this.pdId+'&vaid='+this.daqu).then(res=>{
					this.kill = res.data.data[1];
					this.killmvp = res.data.data[2];
					// console.log(res.data.data);
				},err=>{
					console.log(err);
				});
				
			},
			//比赛记录独立函数，方便后续加载
			getWarjilu:function () {
				//比赛记录
				ajax.get('/api/CombatList?qquin='+this.pdId+'&vaid='+this.daqu+'&p='+this.page).then(res=>{
					//合并数组
					this.combatList = this.combatList.concat(res.data.data[0].battle_list);
					// console.log(this.combatList);
				},err=>{
					console.log(err);
				});
			},
			// 跳转
			goToWar(iam){
				document. removeEventListener('scroll',this.shijian);
				this.$router.push({
					name:'gameXq',
					params: { 
						pdId: this.pdId ,
						daqu: this.daqu,
						gameId:iam.game_id
					}
				})
			},
			//胜利失败改变颜色
			combatColor(val){
				var style = '';
				if(val=='1'){
					style = 'co_green';
				}
				return style;
			},
			//头部显示召唤师名字
			topname(){
				this.setTitle(this.pd_power.name);
			},
			//滑到底部加载=============、-=-==
			dome(){
				// 获得头部的高度
				var footer = document.querySelector('.header').offsetHeight;
				var pd_top = document.querySelector('.pd_top').offsetHeight;
				//获取scrollTop值
				var top = document.body.scrollTop||document.documentElement.scrollTop;
            	//获取包含对象的高度
            	var scrollHeight = document.body.scrollHeight;
            	//获取可视区域高度
            	var offsetHeight = document.body.offsetHeight;
            	// console.log(scrollHeight,'鼠标位置'+Number(top+offsetHeight+footer*2.3));
            	if(top+offsetHeight+footer*2.3>scrollHeight){
            		this.page++;
            		// console.log(this.page);
                	this.flag = false;
            	}
            	//========头部样式===
            	if(top>pd_top-footer){
            		this.$parent.$refs.head.style.backgroundColor = "#40a6fb";
            	}else{
            		this.$parent.$refs.head.style.backgroundColor = "rgba(0,0,0,0)";
            	}
			},
			shijian(){
				if(this.flag){
					this.dome();
					// this.dis = "display:block"
					setTimeout((function(){
						this.flag = true;
					}).bind(this),1000);
				}
			},
			//mint ui用法有bug,被pass
			// loadMore(){
			// 	this.loading = true;
			// 	this.dis = 'display:block';
			// 	setTimeout(() => {
			// 	    // let last = this.list[this.list.length - 1];
			// 	    // for (let i = 1; i <= 10; i++) {
			// 	    //   this.list.push(last + i);
			// 	    // }
			// 	    this.page++;
			// 	    console.log(this.page);
			// 	    this.loading = false;
			// 	    this.dis = 'display:none';
			// 	}, 2500);
			// }
		},
		mounted(){
			document.addEventListener('scroll',this.shijian);
		},
		watch: {//检测page变化调用加载函数
			"page" : function () {
				this.getWarjilu();
			},
		},
		filters:{
			getAreaName,
			headUrl,
			//匹配排位
			getWarModel,
			//胜利失败
			getWarWin,
		}
	}
</script>
<style type="text/css" lang='less'>
	body{
		height: 11.34rem;
		.mint-loadmore-text{
			font-size: .3rem;
		}
	}
	.pd_top{
		width: 100%;
		height: 4.43rem;
		background-image: url(../assets/pdtbg.jpg);
		background-size: cover;
		margin-top:-.87rem;
		color:#fff;
		/*position: fixed;*/
		img{
			/*display: block;*/
			width: 1.28rem;
			border-radius: 100%;
			margin-top: 1.34rem;
		}
		h3{
			font-size: .3rem;
			line-height: .3rem;
			padding-bottom: .3rem;
		}
		p{
			font-size: .24rem;
			line-height: .24rem;
			padding-bottom: .15rem;
			span{
				padding-left: .25rem;
			}
		}
	}
	.panta{
		height: 3.82rem;
		border-bottom: solid 1px #e1e1e1;
		ul{
			li{
				width: 33.33%;
				float:left;
				height: 1.91rem;
				img{
					width: .7rem;
					display: block;
					margin: 0 auto;
					padding-bottom: .3rem;
					padding-top: .44rem;
				}
				p{
					font-size: .22rem;
				}
			}
		}
	}
	.zj_xq{
		ul{
			li{
				width: 100%;
				height:1.65rem;
				overflow:hidden;
				position: relative;
				img{
					width: 1rem;
					display: block;
					float: left;
					margin-top: .46rem;
					margin-left: .4rem;
					margin-right: .35rem;
					border-radius: 100%;
				}
				dl{
					float:left;
					h3{
						font-size: .3rem;
						color: #f00;
						line-height:.3rem;
						text-align: left;
						margin-top: .56rem;
						padding-bottom: .2rem;
						&.co_green{
							color: #10b4ea;
						}
					}
					p{
						font-size: .24rem;
						color: #666;
					}
					span{
						font-size: .22rem;
						color:#888;
						position: absolute;
						top:.7rem;
						left:5.7rem;
					}
				}
				.heng{
					float:left;
					width:100%;
					height:1px;
					background-color:#e1e1e1;
					margin-top: 0.17rem;
					margin-left: .5rem;
				}
			}
		}
	}
</style>
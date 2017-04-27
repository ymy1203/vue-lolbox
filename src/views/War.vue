<template>
	<div>
		<div class="war_title">
			<p>开始时间：{{startime.substr(10,6)}}</p>
			<!-- 时间变成分钟，取整 -->
			<p>总时长:{{(Number(battle.duration)/60).toFixed(0)}}分钟</p>
			<p>模式：{{battle.game_type|getWarModel}}</p>
		</div>
		<div class="win_top">
			<dl>
				<dt>获胜方</dt>
				<dd class="dd1"></dd>
				<dd class="dd2"></dd>
				<dd class="dd3"></dd>
			</dl>
		</div>
		<div class="win_list">
			<ul>
				<li v-for="(gamer,index) in gamers" v-if="gamer.win==1" >
					<!-- 点击英雄头像，套转到英雄详情 -->
					<dl class="heroImg" @click="toHeroDetail(gamer)">
						<img :src="gamer.champion_id|heroUrl">
						<dt>LV{{gamer.level}}</dt>
					</dl>
					<dl class="zbei"> 
						<dt @click="toPlayer(gamer)">{{gamer.name}}</dt>
						<dd>
							<i><img :src="gamer.item0|wuqiUrl"></i>
							<i><img :src="gamer.item1|wuqiUrl"></i>
							<i><img :src="gamer.item2|wuqiUrl"></i>
							<i><img :src="gamer.item3|wuqiUrl"></i>
							<i><img :src="gamer.item4|wuqiUrl"></i>
							<i><img :src="gamer.item5|wuqiUrl"></i>
							<i><img :src="gamer.item6|wuqiUrl"></i>
						</dd>
						<!-- 击杀，失望，助攻 -->
						<p>{{gamer.champions_killed}}/{{gamer.num_deaths}}/{{gamer.assists}}</p>
						<span @click="showWarDetail(index)"><img src="../assets/jianheise.png" :style="trans"></span>
					</dl>
					<dl class="wDetial" v-show="isCur===index">
						<dd>
							<p>补兵：{{gamer.minions_killed}}</p>
							<p>插/反眼：{{gamer.ward_placed}}/{{gamer.ward_killed}}</p>
							<p>推塔：{{gamer.turrets_killed}}</p>
						</dd>
						<dd>
							<p>击杀龙次数：{{gamer.super_monster_killed}}</p>
							<p>最大连杀：{{gamer.largest_killing_spree}}</p>
							<p>最大多杀：{{gamer.largest_multi_kill}}</p>
						</dd>
						<dd>
							<p>金钱：{{gamer.gold_earned}}</p>
							<p>输出伤害：{{gamer.total_damage_dealt}}</p>
							<p>承受伤害：{{gamer.total_damage_taken}}</p>
						</dd>
						<dd>给对方英雄造成的总伤害：{{gamer.total_damage_dealt_to_champions}}</dd>
						<dd>给对方英雄造成的总物理伤害：{{gamer.physical_damage_dealt_to_champions}}</dd>
						<dd>给对方英雄造成的总魔法伤害：{{gamer.magic_damage_dealt_to_champions}}</dd>
					</dl>
				</li>
			</ul>
		</div>
		<div class="win_top">
			<dl>
				<dt class="sbf">失败方</dt>
				<dd class="dd1"></dd>
				<dd class="dd2"></dd>
				<dd class="dd3"></dd>
			</dl>
		</div>
		<div class="win_list">
			<ul>
				<li v-for="(gamer,index) in gamers" v-if="gamer.win==2">
					<dl class="heroImg" @click="toHeroDetail(gamer)">
						<img :src="gamer.champion_id|heroUrl">
						<dt>LV{{gamer.level}}</dt>
					</dl>
					<dl class="zbei"> 
						<dt @click="toPlayer(gamer)">{{gamer.name}}</dt>
						<dd>
							<i><img :src="gamer.item0|wuqiUrl"></i>
							<i><img :src="gamer.item1|wuqiUrl"></i>
							<i><img :src="gamer.item2|wuqiUrl"></i>
							<i><img :src="gamer.item3|wuqiUrl"></i>
							<i><img :src="gamer.item4|wuqiUrl"></i>
							<i><img :src="gamer.item5|wuqiUrl"></i>
							<i><img :src="gamer.item6|wuqiUrl"></i>
						</dd>
						<p>{{gamer.champions_killed}}/{{gamer.num_deaths}}/{{gamer.assists}}</p>
						<span @click="showWarDetail(index)"><img src="../assets/jianheise.png" :style="trans"></span>
					</dl>
					<dl class="wDetial" v-show="isCur===index">
						<dd>
							<p>补兵：{{gamer.minions_killed}}</p>
							<p>插/反眼：{{gamer.ward_placed}}/{{gamer.ward_killed}}</p>
							<p>推塔：{{gamer.turrets_killed}}</p>
						</dd>
						<dd>
							<p>击杀龙次数：{{gamer.super_monster_killed}}</p>
							<p>最大连杀：{{gamer.largest_killing_spree}}</p>
							<p>最大多杀：{{gamer.largest_multi_kill}}</p>
						</dd>
						<dd>
							<p>金钱：{{gamer.gold_earned}}</p>
							<p>输出伤害：{{gamer.total_damage_dealt}}</p>
							<p>承受伤害：{{gamer.total_damage_taken}}</p>
						</dd>
						<dd>给对方英雄造成的总伤害：{{gamer.total_damage_dealt_to_champions}}</dd>
						<dd>给对方英雄造成的总物理伤害：{{gamer.physical_damage_dealt_to_champions}}</dd>
						<dd>给对方英雄造成的总魔法伤害：{{gamer.magic_damage_dealt_to_champions}}</dd>
					</dl>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import ajax from 'axios'
	import {getWarModel,heroUrl,wuqiUrl} from '../filters'
	import {mapActions} from 'vuex'
	export default{
		created(){
			document. removeEventListener('scroll',this.shijian);
			this.setTitle('对战详情');
			this.now();
			//有头部，颜色
			this.$parent.$refs.head.style.backgroundColor = "#40a6fb";
		},
		data(){
			return{

				//传过来的参数
				pdId:this.$route.params.pdId,
				daqu:this.$route.params.daqu,
				gameId:this.$route.params.gameId,
				//
				battle:'',
				//开始时间
				startime:'',
				//游戏人物
				gamers:'',
				//\
				trans:"transform:rotate(0deg);",
				//详细信息默认隐藏
				// wdShow:false,
				isCur: '',
				// gamer:0
			}
		},
		methods:{
			//vuex方法
			...mapActions(['setTitle']),
			now(){
				ajax.get('/api/GameDetail?qquin='+this.pdId+'&vaid='+this.daqu+'&gameid='+this.gameId).then(res=>{
					this.battle = res.data.data[0].battle;
					this.startime = this.battle.start_time;
					this.gamers = this.battle.gamer_records;
					console.log(res.data.data[0].battle);
					// this.gamer?1:0;
				},err=>{
					console.log(err);
				})
			},
			//点击事件，跳转到玩家详情页面
			toPlayer(am){
				// console.log(this.daqu);
				//或得玩家段位信息,传到上一个页面
				ajax.get('/api/UserHotInfo?qquin='+am.qquin+'&vaid='+this.daqu).then(res=>{
					// console.log(res.data.data);
					//段位
					var tier = res.data.data[0].tier;
					//段位级别
					var queue = res.data.data[0].queue;
					this.$router.push({
						name:'player_history',
						params: { 
							pdId: am.qquin,
							daqu: this.daqu,
							duanwei: tier,
							dwdj: queue,
						}
					});
				});
			},
			// 点击英雄头像，套转到英雄详情
			toHeroDetail(am){
				console.log(am);
				this.$router.push({
					name:'hero_history',
					params: { heroId: am.champion_id }
				});
			},
			//战斗详细信息
			showWarDetail(index){
				// console.log(0===0);
				if(this.isCur===index){
					this.isCur='';
					// this.trans="transform:rotate(0deg);"
				}else{
					this.isCur=index;
					// this.trans="transform:rotate(180deg);"
				}
				
			}
		},
		filters:{
			getWarModel,
			heroUrl,
			//武器
			wuqiUrl
		}
	}
</script>
<style type="text/css" lang="less">
	.war_title{
		height: .8rem;
		font-size: .28rem;
		color: #3d3d3d;
		background-color: #f0f0f0;
		overflow:hidden;
		p{
			float:left;
			line-height:.8rem;
			padding-left: .16rem;
			padding-right: .36rem;
		} 
	}
	.win_top{
		dl{
			width: 100%;
			height:.93rem;
			border-bottom: solid 1px #e1e1e1;
			position: relative;
			dt{
				width: 1.44rem;
				height: .55rem;
				background-color: #f90;
				font-size:.28rem;
				color:#fff;
				line-height:.55rem;
				left: .18rem;
				position:absolute;
				top:.18rem;
			}
			dt.sbf{
				background-color: #f00;
			}
			dd{
				width: .4rem;
				height: .4rem;
				position:absolute;
				top:.29rem;
				// background: red;
				background-size:cover;
			}
			dd.dd1{
				left:5.58rem;
				background-image:url(../assets/zb1.jpg);
			}
			dd.dd2{
				left: 6.17rem;
				background-image:url(../assets/zb2.jpg);
			}
			dd.dd3{
				left: 6.8rem;
				background-image:url(../assets/zb3.jpg);
			}
		}
	}
	.win_list{
		ul{
			li{
				width:100%;
				// height: 4.9rem;
				margin-bottom: .09rem;
				overflow:hidden;
				.heroImg{
					float: left;
					margin-left: .19rem;
					margin-right: .24rem;
					img{
						width:1.25rem;
						height:1.26rem;
						display:block;
						margin-top: .09rem;
					}
					dt{
						width:1.23rem;
						height: .53rem;
						border: solid 1px #23a723;
						font-size:.24rem;
						line-height: .55rem;
					}
				}
				.zbei{
					float:left;
					text-align: left;
					position:relative;
					width: 5.75rem;
					height:1.88rem;
					border-bottom:solid 1px #e1e1e1;
					dt{
						font-size:.3rem;
						line-height:.3rem;
						margin-top: .35rem;
						padding-left: 0.08rem;
						margin-bottom: .5rem;
					}
					dd{
						padding-left: .12rem;
						overflow:hidden;
						i{
							width:.5rem;
							height:.5rem;
							border:solid 1px #e1e1e1;
							display:block;
							float: left;
							margin-right: .1rem;
							background-image:url(../assets/zb_null.jpg);
							background-size:cover;
						}
						img{
							width:.5rem;
							height:.5rem;
							display:block;
							float: left;
						}
					}
					p{
						font-size:.24rem;
						color:#a5a5a5;
						position:absolute;
						top:.8rem;
						left:4.45rem;
						font-family:Simhei;
					}
					span{
						position:absolute;
						top:.67rem;
						left:4.5rem;
						width:1rem;
						height:1rem;
						text-align:right;
						img{
							transition:transform 0.5s
						}
					}
				}
				.wDetial{
					// display:none;
					float:left;
					height:3rem;
					width:100%;
					font-size:.26rem;
					background-color:#f6f6f6;
					color: #a9a9a9;
					padding-left: .3rem;
					dd{
						overflow:hidden;
						line-height:.5rem;
						text-align:left;
						p{
							float:left;
							width: 33%;
						}
					}
				}
			}
		}
	}
</style>
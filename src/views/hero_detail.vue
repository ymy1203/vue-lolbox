<template>
	<div class="detail">
		<!-- <div class="heroimg" :style="'background-image:url('+skins(heroSkill.key,'000')+')'"> -->
		<div class="heroimg" :style="'background-image:url(http://cdn.tgp.qq.com/pallas/images/skins/original/'+heroSkill.key+'-000.jpg'">
			<div class="hero_property">
				<p class="h_name">{{heroSkill.name}}</p>
				<p class="h_lu" v-for="job in hsTags">{{job|getHeroJob}}</p>
				<p class="h_ad">攻：{{hsInfo.attack}}</p>
				<p class="h_ap">法：{{hsInfo.magic}}</p>
				<p class="h_fy">防：{{hsInfo.defense}}</p>
				<p class="h_difficulty">操作：{{hsInfo.difficulty}}</p>
			</div>
		</div>
		<!-- 页签 -->
		<div class="pages">
			<li @click="jn_click"><p :class="show?'page_color':''">技能详情</p></li>
			<li @click="pf_click"><p :class="show?'':'page_color'">皮肤欣赏</p></li>
		</div>
		<!-- 左部 -->
		<div class="skill_left" v-if="show">
			<!-- 技能介绍 -->
			<div class="skills">
				<div class="skill_tilte">
					<span></span>
					<p>技能介绍</p>
				</div>
			</div>
			<!-- 技能详情 -->
			<div class="qwer">
				<ul>
					<li>
						<img :src="'http://ossweb-img.qq.com/images/lol/img/passive/'+bdImg.full">
						<dl>
							<!-- 被动name -->
							<dt><p>{{hsPassive.name}}</p></dt>
							<dd v-html="hsPassive.description">{{hsPassive.description}}</dd>
						</dl>
					</li>
					<li v-for="qwer in hsSpells">
						<img :src="'http://ossweb-img.qq.com/images/lol/img/spell/'+qwer.image.full">
						<dl>
							<!-- qwer -->
							<dt><p>{{qwer.name}}</p></dt>
							<dd v-html="qwer.tooltip">{{qwer.tooltip}}</dd>
						</dl>
					</li>
				</ul>
			</div>
			<!-- 技能加点推荐 -->
			<div class="skills">
				<div class="skill_tilte">
					<span></span>
					<p>技能加点推荐</p>
				</div>
			</div>
			<div class="jiadian" v-for="(item,key) in hsTrait">
				<p>{{key|getHeroLine}}：{{item['add-point']}}</p>
			</div>
		</div>
		<!-- 右部皮肤部分 -->
		<div class="pf_right" v-else>
			<div class="skill_tilte">
				<span></span>
				<p>点击皮肤可以观看介绍视频哦</p>
			</div>
			<ul>
				<li v-for="skin in hsSkins" @click="toskinVideo(skin)">
					<img :src="'http://cdn.tgp.qq.com/pallas/images/skins/original/'+heroSkill.key+'-'+skin.id+'.jpg'">
					<p>{{skin.name}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import ajax from 'axios'
	import {getHeroJob,getHeroLine} from '../filters'
	import {mapActions} from 'vuex'
	export default{
		created(){
			this.jiazai();
			this.show = true;
			this.$parent.ifFoot = false;
		},
		data(){
			return{
				heroId:this.$route.params.heroId,
				heroSkill:'',
				//基础属性
				hsInfo:'',
				//被动
				hsPassive:'',
				//qwer
				hsSpells:'',
				//技能加点推荐
				hsTrait:'',
				//职业
				hsTags:'',
				//皮肤
				hsSkins:'',
				//显示与隐藏
				show:'true',
				hide:'false',
				//被动图片
				bdImg:'',
				//英雄名字
				Hname:'',
			}
		},
		methods:{
			...mapActions(['setTitle']),
			//ajax数据
			jiazai:function(){
				ajax.get('/api/GetChampionDetail?champion_id='+this.heroId).then(res=>{
					this.heroSkill = res.data.data[0];
					this.hsInfo = res.data.data[0].info;
					this.hsPassive = res.data.data[0].passive;
					this.bdImg = res.data.data[0].passive.image;
					this.hsSpells = res.data.data[0].spells;
					this.hsTrait = res.data.data[0].trait;
					this.hsTags = res.data.data[0].tags;
					this.hsSkins = res.data.data[0].skins;
					this.Hname = res.data.data[0].name;
					console.log(res.data.data[0]);
					//英雄名字的方法
					this.topname();
				},err=>{
					console.log(err);
				})
			},
			jn_click(){
				this.show = true;
				// this.hide = false;
			},
			pf_click(){
				this.show = false;
				// this.hide = true;
			},
			//头部名字
			topname(){
				this.setTitle(this.Hname);
			},
			//皮肤介绍视频
			toskinVideo(am){
				location.href = am.displayUrl;
			}
		},
		//过滤
		filters:{
			getHeroJob,
			getHeroLine,
		}
	}
</script>
<style type="text/css" lang="less">
	.heroimg{
		width: 100%;
		height: 3.71rem;
		// background-image: url(../assets/annixq.jpg);
		background-size: cover;
		position: relative;
	}
	.hero_property{
		width: 100%;
		height:.81rem;
		background-color:rgba(0,0,0,0.5);
		position:absolute;
		bottom: 0;
		font-size:.3rem;
		color:#fff;
		line-height:0.81rem;
		p{
			float:left;
			padding-left: .1rem;
			padding-right: .1rem;
		}
	}
	.pages{
		width: 100%;
		height: .83rem;
		font-size:.28rem;
		li{
			width: 50%;
			float: left;
			line-height:.79rem;
		}
		p{
			width: 2.27rem;
			margin: 0 auto;
		}
		.page_color{
			color:#40a6fb;
			border-bottom: solid .04rem #40a6fb;
		}
	}
	.skill_tilte{
		width: 100%;
		height:.86rem;
		font-size:.3rem;
		color:#333;
		line-height:.86rem;
		background-color:#f0f0f0;
		position:relative;
		span{
			position:absolute;
			width: .38rem;
			height:.38rem;
			top:.24rem;
			left:.13rem;
			background-image:url(../assets/skill.jpg);
			background-size:cover;
		}
		p{
			text-align: left;
			padding-left: .67rem;
		}
	}
	// 技能详情
	.qwer{
		ul{
			li{
				width: 100%;
				// height:2.58rem;
				overflow:hidden;
				border-bottom:solid 1px #f0f0f0;
				img{
					width:1.4rem;
					float:left;
					margin:.75rem .22rem 0.2rem .2rem;
				}
				dl{
					float:left;
					width: 5.6rem;
					text-align:left;
					dt{
						font-size:.3rem;
						height:.75rem;
						p{
							padding-top: .14rem;
						}
					}
					dd{
						font-size:.24rem;
						color:#666;
						line-height:.38rem;
						padding-bottom: .2rem;
					}
				}
			}
		}
	}
	//.技能加点
	.jiadian{
		text-align:left;
		padding-top: .08rem;
		p{
			font-size:.3rem;
			line-height:.54rem;
			color:#a4a4a4;
			padding-left: .32rem;
		}
	}
	//英雄皮肤
	.pf_right{
		ul{
			background-color:#f0f0f0;
			li{
				img{
					width: 7.23rem;
					padding-left: .14rem;
					display: block;
				}
				p{
					height: .83rem;
					line-height:.83rem;
					font-size:.3rem;
				}
			}
		}
	}
</style>
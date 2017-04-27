<template>
	<div>
		<div class="header" ref="head" v-if="ifHead">
			<i class="go_1" @click="retreat()">
				<img src="../assets/fanhui.png">
			</i>
			<p>{{title}}</p>
		</div>
			<router-view></router-view>
		<div class="footer" ref="foot" v-if="ifFoot">
			<ul>
				<li @click="toNews">
					<img src="../assets/new1.png" v-if="Imgshow1">
					<img src="../assets/new.png" v-else>
					<router-link :class="this.aStyle1" to="/index/news">咨询</router-link>
				</li>
				<li @click="toPlayers">
					<img src="../assets/player1.png" v-if="Imgshow2">
					<img src="../assets/player.png" v-else>
					<router-link :class="this.aStyle2" to="/index/players">玩家</router-link>
				</li>
				<li @click="toHeros">
					<img src="../assets/hero1.png" class="f_40img" v-if="Imgshow3">
					<img src="../assets/hero.png" class="f_40img" v-else>
					<router-link :class="this.aStyle3" to="/index/heroes">英雄</router-link>
				</li>
				<li @click="toVideo">
					<img src="../assets/video1.png" class="f_40img" v-if="Imgshow4">
					<img src="../assets/video.png" class="f_40img" v-else>
					<router-link :class="this.aStyle4" to="/index/video">视频</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapGetters} from 'vuex'

	export default {
		computed:{
			...mapGetters(['title'])
		},
		data(){
			return{
				//头部显示，隐藏
				ifHead:true,
				ifFoot:true,
				//尾部样式
				Imgshow1:false,
				Imgshow2:true,
				Imgshow3:true,
				Imgshow4:true,
				aStyle1:'ascolor',
				aStyle2:'',
				aStyle3:'',
				aStyle4:'',
			}
		},
		methods:{
			retreat(){
				this.$router.go(-1);
				// this.$refs.head.style.backgroundColor = "#40a6fb";
				// this.$refs.foot.style.display = "block";
				
			},
			//li的跳转,样式的改变
			toNews(){
				this.$router.push({
					path:'news'
				});
				this.aStyle1 = 'ascolor';
				this.aStyle2 = '';
				this.aStyle3 = '';
				this.aStyle4 = '';
				this.Imgshow1= false;
				this.Imgshow2= true;
				this.Imgshow3= true;
				this.Imgshow4= true;
			},
			toPlayers(){
				this.$router.push({
					path:'players'
				});
				this.aStyle1 = '';
				this.aStyle2 = 'ascolor';
				this.aStyle3 = '';
				this.aStyle4 = '';
				this.Imgshow1= true;
				this.Imgshow2= false;
				this.Imgshow3= true;
				this.Imgshow4= true;
			},
			toHeros(){
				this.$router.push({
					path:'heroes'
				});
				this.aStyle1 = '';
				this.aStyle2 = '';
				this.aStyle3 = 'ascolor';
				this.aStyle4 = '';
				this.Imgshow1= true;
				this.Imgshow2= true;
				this.Imgshow3= false;
				this.Imgshow4= true;
			},
			toVideo(){
				this.$router.push({
					path:'video'
				});
				this.aStyle1 = '';
				this.aStyle2 = '';
				this.aStyle3 = '';
				this.aStyle4 = 'ascolor';
				this.Imgshow1= true;
				this.Imgshow2= true;
				this.Imgshow3= true;
				this.Imgshow4= false;
			}
		}
	}
</script>
<style lang="less">
	*{
		margin: 0;
		padding:0;
		border:0;
	}
	li{
		list-style: none;
	}
	a{
		color:#000;
		text-decoration: none;
	}
	.header{
		height: .87rem;
		width: 100%;
		background: #40a6fb;
		z-index: 9;
		position:fixed;
		left:0;
		top:0;
		overflow:hidden;
		// text-align:center;
		.go_1{
			float:left;
			width: 0.8rem;
			height: 0.87rem;
			img{
				display:block;
				width: .2rem;
				margin-left: .3rem;
				margin-top: 0.3em;
			}
		}
		p{
			float:left;
			width: 5.98rem;
			font-size:0.36rem;
			color:#fff;
			margin-top: .2rem;
			text-align:center;
			font-weight:100;
		}
	}
	.footer{
		height: 0.98rem;
		font-size: 0.2rem;
		position: fixed;
		left:0;
		bottom:0;
		background:#fff;
		box-shadow: 10px 10px 10px 10px #ccc;
		ul{
			overflow: hidden;
			li{	
				float: left;
				width: 1.875rem;
				text-align: center;
				img{
					width:0.36rem;
					height: .4rem;
					display: block;
					margin:0 auto;
					padding-top: 0.15rem;
					padding-bottom: 0.1rem;
					// display:none;
				}
				img.nowpoit{
					display:block;
				}
				img.f_40img{
					width: .4rem;
				}
				a{
					text-decoration:none;
					color: #6c6c6c;
				}
				a.ascolor{
					color:#40a6fb;
				}
			}
		}
	}
</style>
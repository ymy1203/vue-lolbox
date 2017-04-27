<template>
	<div class="playerss">
		<div class="inputs">
			<input type="text" placeholder="搜索召唤师" v-model="manName">
			<div class="submit" @click ="sousuo">
				<img src="../assets/soso.jpg">	
				<p>搜索</p>
			</div>
		</div>
		<div class="nr-noen" v-if="show">
			<img src="../assets/none.jpg">
			<p>暂时木有内容呀~</p>
		</div>
		<div class="summoner">
			<ul>
				<li v-for="player in players" @click="goToDetail(player)">
					<!-- 把图片的id用|符与方法名隔开=>把图片的id传入到方法内 -->
					<img :src="player.icon_id|headUrl">
					<dl>
						<dt>{{player.name}}</dt>
						<dd>
							<p>{{player.area_id|getAreaName}}</p>
							<p>等级{{player.level}}</p>
						</dd>
					</dl>
					<div class="heng"></div>	
				</li>
			</ul>
		</div>		
	</div>
</template>
<script>
	import {getAreaName,headUrl}  from '../filters'
	import {mapActions} from 'vuex'
	export default{
		created(){
			this.setTitle('搜索');
			// this.$parent.$refs.foot.style.display = "block";
			this.$parent.$refs.head.style.backgroundColor = "#40a6fb";
			this.$parent.ifFoot = true;
		},
		data(){
			return{
				manName:'',
				players:'',
				show:'false'
			}
		},
		methods:{
			...mapActions(['setTitle']),
			sousuo(){
				this.ajax.get('/api/UserArea?keyword='+this.manName).then(res=>{
					console.log(res);
					this.players = res.data.data;
					// 暂时木有内容呀,显示-隐藏命令
					if(this.players.length == 0){
						this.show = true;
					}else{
						this.show = false;
					}
				},err=>{
					console.log(err);
				});
				// console.log(this.players.length);
			},
			//跳转页面，挂参数
			goToDetail(that){
				this.$router.push({
					//目标页面
					name:'player_history',
					params: { 
						//玩家唯一ID
						pdId: that.qquin,
						//大区代号
						daqu: that.area_id,
						//段位代号
						duanwei: that.tier,
						//级别
						dwdj: that.queue,
					}
				});
			}
		},
		filters:{
			getAreaName,
			headUrl
		}
	}
</script>
<style type="text/css" lang="less">
	.inputs{
		height:1.07rem;
		width: 100%;
		background-color: #40a6fb;
		position:relative;
		input{
			display:block;
			width: 6.24rem;
			height: .69rem;
			position: absolute;
			top: .2rem;
			left:.45rem;
			border-radius: .1rem;
			font-size:.34rem;
			color:#787878;
			padding-left: .36rem;
		}
		.submit{
			height: .69rem;
			width: 1.01rem;
			position:absolute;
			top:.2rem;
			left:6.04rem;
			line-height: .69rem;
			img{
				width:0.23rem;
				float:left;
				margin-top: .23rem;
				padding-right: .1rem;
			}
			p{
				font-size:0.24rem;
				float:left;
				color:#40a6fb;
			}
		}
	}
	.nr-noen{
		// display: none;
		margin-top: 3rem;
		img{
			width: 1.5rem;
		}
		p{
			font-size:0.18rem;
			color:#666;
		}
	}
	.summoner{
		ul{
			li{
				width: 100%;
				height:1.65rem;
				overflow:hidden;
				img{
					width:1rem;
					float:left;
					margin-top: .46rem;
					margin-left: .4rem;
					margin-right: .35rem;
					border-radius: 100%;
				}
				dl{
					float:left;
					dt{
						font-size:.3rem;
						line-height:.3rem;
						text-align: left;
						margin-top: .56rem;
						padding-bottom: .2rem
					}
					dd{
						overflow:hidden;
						p{
							float:left;
							font-size:.22rem;
							color:#8c8c8c;
							padding-right: .3rem;
						}
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
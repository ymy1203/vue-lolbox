<template>
	<div class="cl_heros">
		<ul>
			<li v-for="hero in championList" @click="toDetail" :id="hero.id">
				<img :src="hero.id|heroUrl">
				<dl>
					<dt>{{hero.title}}</dt>
					<dd>{{hero.cname}}（{{hero.ename}}）</dd>
				</dl>
			</li>
		</ul>
	</div>
</template>
<script>
//引入过滤
import {heroUrl} from '../filters'
import {mapGetters,mapActions} from 'vuex'
export default{

	created(){//页面加载开始执行
		this.setTitle('英雄列表');
		this.setChampionList();
		this.$parent.ifFoot = true;
	},
	data(){
		return{
			heros:'',
		}
	},
	computed:{
		...mapGetters(['championList'])
	},
	methods:{
			//强大的vuex
		...mapActions(['setChampionList','setTitle']),
		//点击跳转
		toDetail(a){
			// console.log(a.currentTarget.id);
			var hId = a.currentTarget.id;
			//用push
			this.$router.push({
				// path:'detail/:heroId',
				name:'hero_history',
				params: { heroId: hId }
			});
		}
	},
	//过滤
	filters:{
		heroUrl
	}
}

</script>
<style type="text/css" lang="less">
	.cl_heros{
		padding-top: .32rem;
		ul{
			overflow: hidden;
			li{
				width: 50%;
				height: 1.25rem;
				float: left;
				overflow:hidden;
				margin-bottom: .25rem;
				img{
					float:left;
					width: 1.15rem;
					margin-right: .15rem;
					margin-left: .3rem;
					border-radius:100%;
				}
				dl{
					float:left;
					width: 2.1rem;
					dt{
						font-size: .3rem;
						line-height: 0.3rem;
						text-align: left;
						margin-top: .22rem;
					}
					dd{
						margin-top: .1rem;
						text-align:left;
						font-size:.26rem;
						color: #303030;
					}
				}
			}
		}
	}
</style>
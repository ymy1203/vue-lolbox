<template>
	<div class="videos">
		<ul>
			<li v-for="item in videoList">
				<a :href="item.url">
					<img :src="item.img">
					<p>{{item.title}}</p>
					<dl>
						<dt>{{item.createdate.slice(0,10)}}</dt>
						<dd>{{item.comments}}次播放</dd>
					</dl>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
	import {videoList} from '../data/videolist'
	import {mapActions} from 'vuex'
	export default{
		created(){
			this.setTitle('最新视频');
			// this.$parent.$refs.foot.style.display = "block";
		},
		data(){
			return{
				videoList
			}
		},
		methods:{
			...mapActions(['setTitle']),
		}
	}
</script>
<style type="text/css" lang="less">
	.videos{
		ul{
			padding-left: .3rem;
			li{
				margin-top: .15rem;
				height: 3.25rem;
				float: left;
				width:50%;
				padding-right: .3rem;
				box-sizing: border-box;
				img{
					width: 3.31rem;
					height:2.19rem;
					display: block;
				}
				p{
					font-size: .24rem;
					color:#333;
					height:.6rem;
					text-align: left;
					width:3.31rem;
					padding-top: .15rem;
					padding-bottom: .15rem;
				}
				dl{
					width:3.31rem;
					font-size:.18rem;
					line-height:.18rem;
					dt{
						float:left;
						color:#a1a1a1;
					}
					dd{
						float:right;
						color:#40a6fb;
					}
				}
			}
		}
	}
</style>
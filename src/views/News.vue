<template>
	<div class="news">
		<div class="banner">
			<!-- <img src="../assets/baner-1.jpg"> -->
			<swiper :options="swiperOption">
				<swiper-slide v-for="item in bannerNews">
					<a :href="item.article_url">
						<img width="100%" height="20%" :src="item.image_url_big">
					</a>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<div class="allzhixun">
		<!-- :bottom-method="loadBottom"   :bottom-all-loaded="allLoaded" -->
			<mt-loadmore :top-method="loadTop"  ref="loadmore" @top-status-change="handleTopChange" >
			<ul>
				<li v-for="(item,index) in newsList" v-if="index<10*page">
					<a :href="item.article_url">
						<img :src="item.image_url_small">
					</a>
					<dl>
						<h3><a :href="item.article_url">{{item.title}}</a></h3>
						<dt><a :href="item.article_url">{{item.summary}}</a></dt>
						<dd>
							<p>{{item.insert_date.slice(0,10)}}</p>
							<span>{{(item.pv/10000).toFixed(0)}}万订阅</span>
						</dd>
					</dl>
				</li>
			</ul>
				<div slot="top" class="mint-loadmore-top">
			      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
			      <span v-show="topStatus === 'loading'" style="display:block"></span>
			    </div>
			</mt-loadmore>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { swiper , swiperSlide} from 'vue-awesome-swiper'
	import {bannerNews} from '../data/banner'
	import {newsList} from '../data/newslist'
	import {mapActions} from 'vuex'

	export default {
		created(){
			this.setTitle('资讯');
			},
		data(){
			return{
				swiperOption:{
					autoplay:3000,
					pagination:'.swiper-pagination',
					paginationClickable:true
				},
				bannerNews,
				newsList,
				//page,下拉加载时每次初显得次数
				page:3,
				//mint ui
				topStatus: '',
			}
		},
		methods:{
			...mapActions(['setTitle']),
			loadTop() {
			  // ...// 加载更多数据
			  // this.page++;
			  this.$refs.loadmore.onTopLoaded();
			},
			//下拉加载
			// loadBottom(){
			// 	this.page++;
			// },
			// allLoaded(){
			// 		this.page++;
			// 	console.log("allLoaded");
			// },
			//自定义下拉时的样式
			handleTopChange(status) {
		        this.topStatus = status;
		    },
		},
		components: {
			swiper,
			swiperSlide
		}
	}
</script>
<style lang="less">
	.banner{
		width: 100%;
		height: 3.7rem;
		img{
			display: block;
			width: 100%;
			height: 3.7rem;
		}
		.swiper-pagination-bullet{
			width: .14rem;
			height:0.14rem;
			background:#d9d9d9;
			opacity: 1;
		}
		.swiper-pagination-bullet-active{
			background:#40a6fb;
		}
	}
	.allzhixun{
		.mint-loadmore-top{
			position: relative;
			// height: 1.5rem;
			span{
				font-size: 0.3rem;
				position: absolute;
				display: inline-block;
			    -webkit-transition: .2s linear;
			    transition: .2s linear;
			    vertical-align: middle;
			}
			span.rotate{
				transform:rotate(180deg)!important;
				transition:all 0.5s;
			}
		}
		li{
			height:1.5rem;
			border-bottom: solid 1px #f0f0f0;
			img{
				float: left;
				width:1.5rem;
				height:1.3rem;
				margin-left: 0.11rem;
				margin-top: 0.1rem;
				padding-right: .2rem;
			}
			dl{
				padding-top: 0.1rem;
				width:70%;
				float: left;
				h3{
					font-size: 0.28rem;
					text-align: left;
					line-height: .3rem;
					font-weight: 400;
					color:#000;
				}
				dt{
					font-size:0.24rem;
					color: #000;
					padding-top: .1rem;
					padding-bottom: .1rem;
					height:.45rem;
					text-align:left;
					a{
						height:.45rem;
					}
					// font-family:Simsun;
				}
				dd{
					font-size:0.24rem;
					line-height:.33rem;
					font-weight:200;
					margin-top: .1rem;
					p{
						float:left;
						padding-right: .5rem;
					}
					span{
						float:left;
						color:#40a6fb;
					}
				}
			}
		}
	}
</style>
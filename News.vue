<template>
	<div>
		<h3>这是咨询页面</h3>
		<div>
			<swiper :options="swiperOption">
				<swiper-slide v-for="item in bannerNews">
					<a :href="item.article_url">
						<img width="100%" height="20%" :src="item.image_url_big" >
					</a>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>	
			<!-- <swiper :options="swiperOption">
				<swiper-slide v-for="item in bannerNews">
					<a :href="item.article_url"><img height="20%" width="100%" :src="item.image_url_big"></a>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper> -->
		</div>
		<input type="text" v-model="name">
		<button @click="jump">按钮</button>
		<div v-for="player in players">
			<img :src="player.icon_id|headUrl" >
			<p>姓名：{{player.name}}</p>
			<p>大区：{{player.area_id|getAreaName}}</p>
			<p>等级：{{player.level}}</p>
		</div>
		
	</div>
</template>
<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import {bannerNews} from '../data/banner'
	import {newsList} from '../data/newslist'
	import {getAreaName,headUrl} from '../filters'
	// import axios from 'axios'
	export default {
		created(){
			this.$parent.title='资讯';
		},
		data(){
			return {
				swiperOption:{
					autoplay:3000,
					loop:true,
					autoplayDisableOnInteraction:false,
					pagination:'.swiper-pagination',
					paginationClickable:true
				},
				bannerNews,
				newsList,
				name:'',
				players:[]
			}
		},
		methods:{
			jump(){
				this.ajax.get('/api/UserArea?keyword='+this.name).then(res=>{
					this.players = res.data.data;
				},err=>{
					console.log(err);
				})
			}
		},
		components:{
			swiper,
			swiperSlide
		},
		filters:{
			getAreaName,
			headUrl
		}
	}
	// import {newsList} from '../data/newslist'
	// import {bannerNews} from '../data/banner'
	// export default {
	// 	data(){
	// 		return {
	// 			swiperOption:{
	// 				pagination:'.swiper-pagination',
	// 				paginationClickable:true,
	// 				autoplay:3000
	// 			},
	// 			newsList,
	// 			bannerNews
	// 		}
	// 	},
	// 	components:{
	// 		swiper,
	// 		swiperSlide
	// 	}
	// }

</script>
<style lang="less">
	.swiper-pagination-bullet {
	    width: 8px;
	    height: 8px;
	    display: inline-block;
	    border-radius: 100%;
	    background: #fff;
	    opacity: 0.2;
	}
</style>
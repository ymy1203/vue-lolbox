<template>
	<div>
		<div class="bg">
			<!-- <img src="../assets/index_bg.jpg" class="land_bg"> -->
			<img src="../assets/logo.png" class="logo">
			<p>Vue-英雄联盟助手</p>
			<router-link to="/index/news" class="router">进入</router-link>
		</div>
	</div>
</template>

<style type="text/css" lang = "less">
	*{
		margin: 0;
		padding:0;
		border:0;
	}
	.bg{
		width: 100%;
		height: 13.34rem;
		background-image: url(../assets/index_bg.jpg);
		background-size:100% 100%;
		position: absolute;
		top:0;
		left:0;
		.logo{
			display: block;
			width: 4.9rem;
			padding-top: 6.38rem;
			padding-left:1.3rem ;
		}
		p{
			margin-top:.5rem;
			font-size: 0.6rem;
			color: #fff;
			font-weight: 700;
		}
		.router{
			width: 2.19rem;
			height: 0.66rem;
			line-height: 0.66rem;
			background: #40a6fb;
			text-align: center;
			display: block;
			font-size: .33rem;
			color: #fff;
			text-decoration: none;
			border-radius: .1rem;
			margin:0 auto;
			margin-top:.87rem;
		}
	}
</style>
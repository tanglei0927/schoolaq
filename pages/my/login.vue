<template>
	<view class="login_page">
		<h3>安全员登录</h3>
		<view class="inputbox">
			<input type="text" value="请输入账号" />
		</view>
		<view class="inputbox">
			<input type="text" value="请输入密码" />
		</view>
		<button type="primary">登录</button>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
.login_page{
	height: 100%;
	background: #fff;
	// background: #F0AD4E;
	h3{
		padding: 50rpx 20rpx 20rpx 20rpx;
		background: linear-gradient(#FF6C00, #F0AD4E);
		font-size: 50rpx;
	}
	.inputbox{
		padding: 40rpx 0rpx;
		margin: auto;
		width: 95%;
		border-bottom: 1px solid #ccc;
	}
	button{
		width: 95%;
		border-radius: 80rpx;
		background: #FF6C00;
		margin-top: 40rpx;
	}
}
</style>

<template>
	<view class="login_page">
		<h3>安全员登录</h3>
		<view class="inputbox">
			<input type="text"v-model="form.account"  placeholder="请输入账号" />
		</view>
		<view class="inputbox">
			<input type="password" v-model="form.password" placeholder="请输入密码" />
		</view>
		<button type="primary" @click="login()">登录</button>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				form:{
					account:"",
					password:""
				}
			}
		},
		methods:{
			login(){
				if(!this.form.account){
					uni.showToast({
						icon:"none",
						title:"请输入账号"
					})
				}else if(!this.form.password){
					uni.showToast({
						icon:"none",
						title:"请输入密码"
					})
				}else{
					this.$http.post("securityUser/login",this.form).then(res=>{
						if(res.code==100){
							uni.showToast({
								icon:"success",
								title:"登录成功"
							})
							let userInfo=res.info
							userInfo=JSON.stringify(userInfo)
							uni.setStorageSync("userInfo",userInfo)
							setTimeout(()=>{
								uni.switchTab({
									url:"../index/index"
								})
							},2000)
						}else if(res.code==250){
							uni.showToast({
								icon:'none',
								title:res.msg
							})
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.login_page{
	height: 100%;
	background: #fff;
	// background: #F0AD4E;
	h3{
		padding: 50rpx 20rpx 20rpx 20rpx;
		background: linear-gradient(#FF6C00, #fff);
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

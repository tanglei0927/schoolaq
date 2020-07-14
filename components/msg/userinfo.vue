<template>
	<view class="userinfopage">
		<view class="cl">
			<text class="txt">头像</text>
			<view class="touxiang">
				<image :src="imgurl+'file/readFile/'+form.photo" mode="widthFix"></image>
			</view>
		</view>
		<view class="cl">
			<text>姓名</text>
			<text>{{form.name}}</text>
		</view>
		<view class="cl">
			<text>性别</text>
			<text>{{form.sex==1?'男':'女'}}</text>
		</view>
		<view class="cl">
			<text>身份证号</text>
			<text>{{form.idCard}}</text>
		</view>
		<view class="cl">
			<text>出生日期</text>
			<text>{{form.birthday}}</text>
		</view>
		<view class="cl">
			<text>文化程度</text>
			<text>{{form.education}}</text>
		</view>
		<view class="cl">
			<text>负责学校</text>
			<text>{{form.schoolName}}</text>
		</view>
		<view class="cl">
			<text>职位</text>
			<text>安全员</text>
		</view>
		<button type="primary" @click="logOut()">退出登录</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				form:{},
				userInfo:{},
				imgurl:''
			}
		},
		onLoad(){
			let userInfo=uni.getStorageSync('userInfo')
			this.userInfo=JSON.parse(userInfo)
			this.init()
			this.imgurl=this.$imgurl
		},
		methods:{
			init(){
				this.$http.post('mgSecurity/detail',{
					id:this.userInfo.id
				}).then(res=>{
					if(res.code==100){
						this.form=res.info
					}
				})
			},
			logOut(){
				uni.removeStorageSync('userInfo')
				setTimeout(()=>{
					uni.navigateTo({
						url:"../../pages/my/login"
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.userinfopage{
		padding: 0 20rpx;
		background: #fff;
		padding-bottom: 120rpx;
		>view{
			padding: 40rpx 0;
			border-bottom: 1px solid #ccc;
			text:first-child{
				float: left;
				color: #ccc;
				width: 220rpx;
			}
			.txt{
				line-height: 125rpx;
			}
			.touxiang{
				float: left;
				width: 125rpx;
				height: 125rpx;
				border-radius: 50%;
				overflow: hidden;
				border: 2px solid #fff;
				box-shadow: 0px 0px 10px 3px #ccc;
				image{
					width: 100%;
				}
			}
		}
	}
	button{
		background: #FF6C00;
		position: fixed;
		bottom: 0;
		width: 100%;
		left:0;
	}
</style>

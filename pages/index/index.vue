<template>
	<view class="index_page">
		<!-- 头部 -->
		<view class="cl headers">
			<image src="../../static/img/sy_001bj.png" mode="widthFix"></image>
			<view class="msgbox">
				<view class="teacher" @click="goRouter()">
					<image class="teachericon" src="../../static/img/sy_007.png" mode="widthFix"></image>
					<text v-if="isLogin">{{form.teacher}}</text>
					<text v-else>请登录</text>
				</view>
				<view class="weather">
					<view class="tit">
						<text class="num">10℃</text>
						<text class="msg">多云转晴</text>
					</view>
					<view class="times">
						<view>
							2020年1月13日
						</view>
						<view>
							冬月三十 周二
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 班车列表 -->
		<view class="bus_list">
			<view class="box">
				<view class="tits cl">
					<text class="time">早</text>
					<text>预计：28人</text>
				</view>
				<view class="status cl">
					<image class="bjimg" src="../../static/img/right.png" mode="widthFix"></image>
					<image class="car" :style="'left:'+width1+'px'" @touchend="touchEnd()" @click="lookDetail()" @touchmove="touchStart($event,0)" src="../../static/img/sy_006.png" mode="widthFix"></image>
				</view>
				<view class="businfo cl">
					<view>
						<image src="../../static/img/sy_004.png" mode="widthFix"></image>
						<text>现代世贸中心</text>
					</view>
					<view>
						<image src="../../static/img/sy_005.png" mode="widthFix"></image>
						<text>现代世贸中心</text>
					</view>
				</view>
			</view>
			
			<view class="box">
				<view class="tits cl">
					<text class="time">平一</text>
					<text>预计：28人</text>
				</view>
				<view class="status cl">
					<image class="bjimg" src="../../static/img/left.png" mode="widthFix"></image>
					<image class="car" style="right: ;" src="../../static/img/sy_006left.png" mode="widthFix"></image>
				</view>
				<view class="businfo cl">
					<view>
						<image src="../../static/img/sy_004.png" mode="widthFix"></image>
						<text>现代世贸中心</text>
					</view>
					<view>
						<image src="../../static/img/sy_005.png" mode="widthFix"></image>
						<text>现代世贸中心</text>
					</view>
				</view>
			</view>
			
			<view class="box">
				<view class="tits cl">
					<text class="time">平二</text>
					<text>预计：28人</text>
				</view>
				<view class="status cl">
					<image class="bjimg" src="../../static/img/left.png" mode="widthFix"></image>
					<image class="car" src="../../static/img/sy_006left.png" mode="widthFix"></image>
				</view>
				<view class="businfo cl">
					<view>
						<image src="../../static/img/sy_004.png" mode="widthFix"></image>
						<text>现代世贸中心</text>
					</view>
					<view>
						<image src="../../static/img/sy_005.png" mode="widthFix"></image>
						<text>现代世贸中心</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footerbox">
			<image src="../../static/img/sy_002.png" mode="widthFix" @click="goInfo(2)"></image>
			<image src="../../static/img/sy_003.png" mode="widthFix" @click="goInfo(1)"></image>
			<image src="../../static/img/sy_001.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {		
		data() {
			return {
				title: 'Hello',
				form:{
					teacher:'苹果老师'
				},
				isLogin:true,
				widths:[10,0],
				width1:0,
				flag:false
			}
		},
		watch:{
			widths:function (oldval,newval){
				console.log(oldval)
			},
			deep:true
		},
		onLoad() {
			uni.authorize({
				scope:'userInfo'
			})
		},
		methods: {
			getuserinfo(){
				// uni.getUserInfo({
				// 	success:(res)=>{
				// 		console.log(res)
				// 	},
				// 	fail:(err)=>{
				// 		console.log(err)
				// 	}
				// })
				// wx.login({
				// 	success:(res)=>{
				// 		console.log(res)
				// 	}
				// }) 
			},
			goRouter(){
				if(this.isLogin){
					//查看个人资料
					// this.goInfo(2)
					uni.navigateTo({
						url:"../../components/msg/userinfo"
					})
				}else{
					//登陆
					uni.navigateTo({
						url:"../my/login"
					})
				}
				
			},
			lookDetail(){
				console.log("点击")
				this.flag=false
				// this.widths[0]=10
				//运行当中===>线路详情
				uni.navigateTo({
					url:"../../components/msg/linedetails"
				})
			},
			touchStart(e,index){
				console.log("拖动小车")
				this.flag=true
				// console.log(e)
				let page=e.touches[0].pageX
				// console.log(page)
				// console.log(index)
				switch(index){
					case 0:
					// this.widths[index]=page
					this.width1=page
					// console.log(this.widths[0])
				}
				
			},
			touchEnd(){
				if(this.flag){
					console.log("查看线路安全报告")
					uni.navigateTo({
						url:"../../components/msg/security"
					})
				}
				
			},
			goInfo(index){
				switch(index){
					case 1:
						// 行程记录
						uni.navigateTo({
							url:"../../components/msg/Itineraryrecord"
						})
						break
					case 2:
						this.goRouter()
						break
				}
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.index_page{
		width: 100%;
		height: 516rpx;
		background: #fff;
		// background:url(../../static/img/sy_001bj.png);
		>image{
			width: 100%;
		}
		.headers{
			position: relative;
		}
		.msgbox{
			position: absolute;
			top: 40rpx;
			padding: 0 30rpx;
			.teachericon{
				width: 30rpx;
				margin-right: 10rpx;
				margin-top: 5rpx;
			}
			.teacher{
				padding: 0 30rpx;
				margin: 34rpx 0;
				border-radius: 20rpx;
				background: #fa5617;
				color: #fff;
				line-height:50rpx ;
			}
		}		
	}
	.bus_list{
		padding:0 30rpx;
		.box{
			padding: 30rpx 0;
			background: #fff;
			border-radius:20rpx;
			margin-bottom:20rpx ;
			.tits{
				padding: 30rpx;
				text:nth-child(1){
					float: left;
					padding: 0 22rpx;
					border-left: 2px solid #ec6400;
					font-size: 30rpx;
					font-weight: bold;
				}
				text:nth-child(2){
					float: right;
					padding: 0 22rpx;
					background: #f0f0f0;
					border-radius: 20rpx;
					font-size: 28rpx;
				}
			}
			.status{
				// overflow: hidden;
				position: relative;
				margin-bottom: 30rpx;
				.bjimg{
					width: 100%;
				}
				
			}
			.car{
				width: 150rpx;
				position: absolute;
				top: -15rpx;
				left: 0;
			}
			.businfo{
				>view{
					float: left;
					width: 50%;
					font-size: 28rpx;
					margin: 10rpx 0;
					padding: 0 29rpx;
					box-sizing: border-box;
					image{
						width: 80rpx;
						margin-right: 20rpx;
					}
				}
			}
		}		
	}
	.footerbox{
		background: #fff;
		padding: 40rpx 0;
		image{
			width: 210rpx;
			margin-left: 30rpx;
		}
	}
</style>

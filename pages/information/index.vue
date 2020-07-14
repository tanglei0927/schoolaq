<template>
	<view class="information">
		<view class="titles cl">
			<view class="tous cl" @click="goTs()">
				<image src="../../static/img/xxzx_004.png" mode="widthFix"></image>
				<text>{{tsCount}}未处理</text>
			</view>
			<view class="qinj cl" @click="goLeave()">
				<image src="../../static/img/xxzx_005.png" mode="widthFix"></image>
				<text>{{qjCount}}未处理</text>
			</view>
		</view>
		<!-- 通知列表 -->
		<view class="list_box footerbox"v-if="!isNone">
			<view class="box cl" v-for="(item,index) in Msglist" @click="msgDetial(item)">
				<view class="img">
					<image :src="iconList[(item.type*1)-1]" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<h3>
						<text>{{item.type==1?'家长投诉':(item.type==2?'请假':(item.type==3?'回复':(item.type==4?'':'系统群发')))}}</text>
						<text>{{item.createTime}}</text>
					</h3>
					<text>{{item.content}}</text>
				</view>
			</view>
			
		</view>
		
		<!-- 悬浮框 -->
		<view class="fixed" @click="goGroup()">
			<image src="../../static/img/xxzx_001.png" mode="widthFix"></image>
		</view>
		
		<!-- 无通知提示 -->
		<view class="nonebox" v-show="isNone">
			<image src="../../static/img/xxzx_008.png" mode="widthFix"></image>
			<h3>无通知信息</h3>
		</view>
		<image src="" mode=""></image>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				isNone:false,//无通知消息：true
				iconList:[
					'../../static/img/xxzx_002.png',//投诉  1
					'../../static/img/xxzx_012.png',//请假  2
					'../../static/img/xxzx_009.png',//回复  3
					'../../static/img/xxzx_011.png',
					// '../../static/img/xxzx_011.png',
					'../../static/img/xxzx_003.png',//学校  2
				],
				userInfo:{},
				Msglist:[],
				qjCount:0,
				tsCount:0,
			}
		},
		onShow(){
			let userInfo=uni.getStorageSync("userInfo")
			if(userInfo){
				this.userInfo=JSON.parse(userInfo)
			}
			this.getMsgList()
		},
		methods:{
			goLeave(){
				//今日请假
				uni.navigateTo({
					url:"../../components/leave/index"
				})
			},
			goGroup(){
				//群发
				uni.navigateTo({
					url:"../../components/msg/groupsend?id="+this.userInfo.id
				})
			},
			goTs(){
				//投诉
				uni.navigateTo({
					url:"../../components/complaint/index"
				})
			},
			getMsgList(){
				this.$http.post("sMessage/list",{
					id:this.userInfo.id,
					type:''
				}).then(res=>{
					if(res.code==100){
						// this.Msglist=res.info
						let list=res.info
						this.qjCount=0
						this.tsCount=0
						// state:0未读，1已读  2：已回复
						list.forEach((item,index)=>{
							item.createTime=this.$untils.getDate(item.createTime)
							if(item.type==1&&item.state==0){
								this.tsCount++
							}
							if(item.type==2&&item.state==0){
								this.qjCount++
							}
						})
						this.Msglist=list
					}
				})
			},
			msgDetial(item){
				//查看信息详情
				if(item.type==1){
					uni.navigateTo({
						url:"../../components/complaint/info?id="+item.id
					})
				}else{
					uni.navigateTo({
						url:"../../components/leave/info?id="+item.id
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.information{		
		.titles{
			padding: 30rpx;
			background: #fff;
			>view{
				float: left;
				position: relative;
				width: 330rpx;
				image{
					width: 100%;
				}
				text{
					position: absolute;
					right: 10rpx;
					bottom: 30rpx;
					padding: 5rpx 30rpx;
					border-radius: 20rpx;
					color: #fff;
					font-size: 24rpx;
				}
			}
			.qinj{
				margin-left: 28rpx;
				text{
					background: #26a2c6;
				}
			}
			.tous{
				text{
					background: #43a047;
				}
			}
		}
	}
	.list_box{
		padding: 0 30rpx;
		background: #fff;
		// padding-bottom: 50rpx;
		border-bottom: 1px solid #ccc;
		.box{
			padding: 25rpx 0;
			border-bottom: 1px solid #ccc;
			.img{
				float: left;
				width: 90rpx;
				margin-right: 20rpx;
				margin-top: 15rpx;
				image{
					width: 100%;
				}
			}
			.textbox{
				float: left;
				width: 580rpx;
				font-size: 28rpx;
				// font-weight: ;
				line-height:60rpx;
				h3{
					width: 100%;
					text:nth-child(2){
						float: right;
						font-weight: normal;
						color: #ccc;
					}
				}
				>text{
					color: #646464;
				}
			}
		}
		.box:last-child{
			border: 0;
		}
	}
	.fixed{
		position: fixed;
		right: 30rpx;
		bottom: 100rpx;
		width: 102rpx;
		height: 202rpx;
		image{
			width: 100%;
		}
	}
	.nonebox{
		text-align: center;
		image{
			width: 300rpx;
			margin: auto;
			margin-top: 160rpx;
			margin-bottom: 20rpx;
		}
	}
</style>

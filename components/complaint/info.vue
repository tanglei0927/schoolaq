<template>
	<view class="info_page">
		<view class="title">
			投诉信息
		</view>
		<text>{{details.createTime}}</text>
		<view class="msg">
			{{details.content}}
		</view>
		<view class="box">
			<view class="tit">
				投诉人信息
			</view>
			<view class="">
				光谷第二小学，李小彭，线路1
			</view>
		</view>
		<view class="box">
			<view class="tit">
				投诉回复
			</view>
			<textarea value="" placeholder="请输入投诉回复内容" />
		</view>
		<button>回复</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:null,
				details:{}
			}
		},
		onLoad(e){
			this.id=e.id
		},
		onShow(){
			this.getMsgDetails()
		},
		methods:{
			getMsgDetails(){
				this.$http.post("sMessage/getComplaintDetail",{
					id:this.id
				}).then(res=>{
					if(res.code==100){
						this.details=res.info
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info_page{
		>view{
			background: #fff;
			padding:20rpx 30rpx;
			font-size: 28rpx;
		}
		
		.title{
			text-align: center;
			line-height:85rpx ;
			font-size: 36rpx;
			font-weight: bold;
		}
		>text{
			color: #ccc;
			line-height: 54rpx;
			width: 100%;
			background: #fff;
			display: block;
			box-sizing: border-box;
			padding: 0 20rpx;
		}
		.msg{
			line-height: 58rpx;
		}
	}
	button:after{
		border: 0;
	}
	button{
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius:0;
		background: #ff6d00;
		color: #fff;
	}
	.box{
		margin-top: 30rpx;
		// padding: 20rpx;
		textarea{
			width: 100%;
			padding: 20rpx;
			border: 1px solid #ccc;
			background: #eee;
			border-radius: 10rpx;
			margin-top: 20rpx;
			height: 300rpx;
			box-sizing: border-box;
		}
	}
</style>

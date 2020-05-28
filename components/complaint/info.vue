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
				{{details.grade?details.grade+"年级":''}}{{details.clazz?details.clazz+'班，':''}}
				{{details.name?details.name+'，':''}}{{details.lineName?details.lineName:''}}
			</view>
		</view>
		<view class="box">
			<view class="tit">
				投诉回复 
				<text v-if="details.newsVoReply.examine">{{details.newsVoReply.examine==0?'审核不通过':(details.newsVoReply.examine==1?'审核通过':'审核中')}}</text>
			</view>
			<textarea value="" v-model="content" placeholder="请输入投诉回复内容" />
		</view>
		<button @click="reply()">回复</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:null,
				details:{},
				content:""
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
						if(this.details.newsVoReply){
							this.content=this.details.newsVoReply.content
						}else{
							this.content=""
						}
					}
				})
			},
			reply(){
				let url=""
				let data={}
				if(this.details.state==1||this.details.state==0){
					// 回复
					url="sMessage/addReply"
				}else{
					// 修改回复的内容
					url="sMessage/updateReply"
					data.id=this.details.newsVoReply.id
				}
				data.replyId=this.details.id			
				data.content=this.content
				if(data.content){						
					this.$http.post(url,data).then(res=>{
						if(res.code==100){
							uni.showToast({
								icon:"success",
								title:"回复成功"
							})
							this.getMsgDetails()
						}else{
							uni.showToast({
								icon:"none",
								title:res.msg
							})
						}
					})				
				}else{
					uni.showToast({
						icon:"none",
						title:'请输入回复内容！'
					})
				}
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

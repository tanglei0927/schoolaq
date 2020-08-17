<template>
	<view class="info_page">
		<view class="title">
			详情
		</view>
		<text>{{details.createTime}}</text>
		<view class="msg">
			<!-- 您管理的线路xxx(起点)--yy(终点)，有xxx(孩子名)请假，共提交请假z天，请假y车次！该车次未来上车人数为gg（实际减1）,此信息不作为最终确定人数。 -->
			{{details.content}}
		</view>
		<view class="imgs">
			<image v-for="(item,index) in photos" :src="item" @click="lookImg(item)" mode="widthFix"></image>
		</view>
		<button @click="goBack()">确认</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:null,
				details:{},
				content:"",
				photos:[]
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
				this.$http.post("sMessage/getLeaveApplyDetail",{
					id:this.id
				}).then(res=>{
					if(res.code==100){
						this.details=res.info
						if(this.details.newsVoReply){
							this.content=this.details.newsVoReply.content
						}else{
							this.content=""
						}
						let imgList=this.details.photos
						this.photos=[]
						if(imgList.length>0){
							imgList.forEach((item,index)=>{
								this.photos.push(this.$imgurl+'file/downloadOss/'+item)
							})
						}							
					}
				})
			},
			goBack(){
				uni.navigateBack({
					
				})
			},
			lookImg(url){
				uni.previewImage({
					current:url,
					urls:this.photos
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.info_page{
		padding:0 30rpx;
		font-size: 28rpx;
		.title{
			text-align: center;
			line-height:85rpx ;
			font-size: 36rpx;
			font-weight: bold;
		}
		>text{
			color: #ccc;
			line-height: 54rpx;
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
	.imgs{
		image{
			width: 200rpx;
			margin: 20rpx;
		}
	}
</style>

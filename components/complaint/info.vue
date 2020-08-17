<template>
	<view class="info_page">
		<view class="title">
			投诉信息
		</view>
		<text>{{details.createTime}}</text>
		<view class="msg">
			{{details.content}}
		</view>
		<view class="tsimgs">
			<image v-for="(item,index) in photos" :src="item" @click="lookImg(item,photos)" mode="widthFix"></image>
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
		<view class="imgsbox cl" v-if="details.newsVoReply.examine==1">
			<h3><text>回复附图</text></h3>
			<image v-for="(item,index) in photos1" class="hfimgs" :src="item" @click="lookImg(item,photos1)" mode="widthFix"></image>
		</view>
		<view class="imgsbox cl" v-else>
			<h3><text>回复附图</text>
			<text class="count">已选择({{imgList.length}}/3)</text>
			</h3>
			<view class="imgs cl">
				<view class="box cl" v-for="(item,index) in imgList">
					<image :src="imgurl+'file/downloadOss/'+item" mode=""></image>
					<image @click="deleteImg(index)" class="deleteimg" src="../../static/img/dele.png" mode="widthFix"></image>
				</view>
				<!-- 添加图片 -->
				<image @click="uploadImg()" class="addimg" src="../../static/img/addimg.png" mode="widthFix"></image>
			</view>
		</view>
		<button @click="reply()" v-if="details.newsVoReply.examine!=1">回复</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:null,
				details:{},
				content:"",
				imgurl:'',
				imgList:[],
				photos:[],
				photos1:[]
			}
		},
		onLoad(e){
			this.id=e.id
			this.imgurl=this.$imgurl
			this.getMsgDetails()
		},
		onShow(){
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
						let imgList=this.details.photos
						this.photos=[]
						if(imgList.length>0){
							imgList.forEach((item,index)=>{
								this.photos.push(this.imgurl+'file/downloadOss/'+item)
							})
						}
						let imgList2=this.details.newsVoReply.photos
						this.photos1=[]
						if(imgList2.length>0){
							imgList2.forEach((item,index)=>{
								this.photos1.push(this.imgurl+'file/downloadOss/'+item)
							})
						}
						this.imgList=imgList2
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
				data.photos=this.imgList
				if(data.content){						
					this.$http.post(url,data).then(res=>{
						if(res.code==100){
							uni.showToast({
								icon:"success",
								title:"回复成功"
							})
							this.getMsgDetails()
							uni.navigateBack({
								
							})
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
			},
			uploadImg(){
				// 上传图片
				var that=this
				var count=1
				console.log("上传图片")
				// console.log(this.upImgList)
				console.log(this.imgList)
				if(that.imgList.length<3){
					uni.chooseImage({
						fail:function(){
							uni.hideLoading()
							uni.showToast({
								icon:'none',
								title:'上传失败'
							})
						},
						success: async (val)=>{
							console.log("成功")
							console.log(val)
							var list=[]
							list=val.tempFilePaths
							uni.showLoading({
								title:"正在上传中"
							})
							var token=''
							var userInfo=uni.getStorageSync('userinfo')
							if(userInfo){
								userInfo=JSON.parse(userInfo)
								token=userInfo.token
							}
							list.forEach(async (item,index)=>{									
										console.log("上传")
										console.log(item)
									// const src =await that.compressImageHandler(item)								
									const src=item
									console.log(JSON.stringify(src))									
									uni.uploadFile({
										url:that.$imgurl+'file/uploadOSS',
										header:{
											 'Content-type':'multipart/form-data'
										},
										filePath:src,
										name:'file',
										success:function(res){
											console.log("已上传数量"+that.imgList.length)
											console.log(res)
											var data=res.data											
											data=JSON.parse(data)
											if(data.code==100){
												if(that.imgList.length<3){
													console.log('上传成功'+index)
													console.log(data.info)
													that.imgList.push(data.info)
													if(index==list.length-1){
														uni.hideLoading()
													}											
												}else{
													if(count==1){
														uni.showToast({
															title:'图片上传数量已到',
															icon:'none',
															success:function(){
																setTimeout(()=>{
																	uni.hideToast()												
																},2000)
															}
														})
														count++
													}
												}
											}else{
												uni.showToast({
													icon:"none",
													title:"上传失败"
												})
											}
										},
										fail:function(err){
											console.log("上传失败"+index)
											console.log(err)
											uni.showToast({
												title:'上传失败',
												icon:'none',
												success:function(){
													setTimeout(()=>{
														uni.hideToast()
													},2000)
												}
											})
										}
									})
								
							})
							
						}
					})
				}else{
					//上传数量达到上限
					uni.showToast({
						title:'图片最多上传3张',
						icon:'none',
						success:function(){
							setTimeout(()=>{
								uni.hideToast()
							},2000)
						}
					})
				}
			},
			deleteImg(index){
				// 删除上传的图片
				this.imgList.splice(index,1)
			},
			lookImg(url,list){					
				uni.previewImage({
					current:url,
					urls:list
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
		// position: absolute;
		// bottom: 0;
		// left: 0;
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
	.tsimgs{
		image{
			width: 200rpx;
			margin: 16rpx;
		}
	}
	.imgsbox{
		margin-top: 20rpx;
		padding: 0 20rpx;
		h3{
			padding-top: 20rpx;
			>text{
				border-left: 2px solid #FF6C00;
				padding-left: 20rpx;
			}
			.count{
				float: right;
				font-size: 14px;
				color: #666;
				border: 0;
			}
		}		
		.imgs{
			.box{
				width: 180rpx;
				height: 180rpx;
				// overflow: hidden;
				margin: 10rpx;
				float: left;
				position: relative;
				image{
					width: 100%;
					height: 100%;
				}
				.deleteimg{
					position: absolute;
					top: -20rpx;
					right: -20rpx;
					width: 40rpx;					
				}
			}
			.addimg{
				width: 150rpx;
				margin-top: 30rpx;
			}
		}
	}
	.hfimgs{
		width: 200rpx;
		margin: 20rpx;
	}
</style>

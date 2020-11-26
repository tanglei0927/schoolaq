<template>
	<view class="sendbox">
		<view class="msgbox">
			<view class="tit">编辑信息</view>
			<textarea value="" v-model="content" placeholder="请输入群发内容(最多500字)" />
		</view>
		<view class="imgsbox">
			<h3><text>图片</text>
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
		<view class="groupbox">
			<view class="tit cl">
				<text>选择接收群体</text>				
			</view>
			<view class="xlbox">
				<xfl-select
					:list="lineStrlist"
					:clearable="false"
					:showItemNum="5" 
					:listShow="false"
					:isCanInput="false"  
					:style_Container="'height: 50px; font-size: 16px;'"
					:placeholder = "'请选择线路'"
					:initValue="selectValue"
					:selectHideType="'hideAll'"
					@change="selectChange"
				>
				</xfl-select>				
			</view>
			<Buslist :list="list1" />
			<!-- <Buslist :list="list1" /> -->
		</view>
		<button type="default" @click="isOk()">发送</button>
	</view>
</template>

<script>
	import Buslist from '../common/buslist.vue'
	import xflSelect from '../common/xfl-select/xfl-select.vue';
	export default{
		components:{
			Buslist,xflSelect
		},
		data(){
			return{
				list1:[],
				selectValue:"",
				lineStrlist:[],
				lineList:[],
				id:null,
				lineId:null,
				content:"",
				imgList:[],
				imgurl:''
			}
		},
		onLoad(e){
			this.id=e.id
			this.getLines()
			this.imgurl=this.$imgurl
		},
		methods:{
			getLines(){
				this.$http.post("sLine/securityLineQuery",{
					id:this.id
				}).then(res=>{
					if(res.code==100){
						let list=res.info
						this.lineList=[]
						this.lineStrlist=[]
						list.forEach((item,index)=>{
							this.lineList.push(item)
							this.lineStrlist.push(item.name)
						})
						this.selectValue=this.lineStrlist[0]
						this.lineId=this.lineList[0].lineId
						// this.getSite()
					}
				})
			},
			selectChange(val){
				console.log(val)
				let index=val.index
				this.lineId=this.lineList[index].lineId
				// this.getSite()
			},
			getSite(){
				// 获取线路站点
				
			},
			isOk(){
				console.log(this.content)
				console.log(this.lineId)
				if(!this.content){
					uni.showToast({
						icon:"none",
						title:"请输入消息内容"
					})
				}else if(!this.lineId){
					uni.showToast({
						icon:"none",
						title:"请选择线路"
					})
				}else{
					uni.showLoading({
						icon:'loading',
						title:'正在发送'
					})
					this.$http.post("sMessage/sendGroupMsg",{
						securityId:this.id,
						lineId:this.lineId,
						content:this.content,
						photos:this.imgList
					}).then(res=>{
						if(res.code==100){
							uni.hideLoading()
							uni.showToast({
								icon:"success",
								title:"发送成功！"
							})
							uni.navigateBack({
								
							})
						}else if(res.code==250){
							uni.showToast({
								icon:"none",
								title:res.msg
							})
						}
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
										url:that.$imgurl+'file/uploadOSS',//uploadFile
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
				// this.upImgList.splice(index,1)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.sendbox{
		.msgbox{
			padding: 20rpx;
			margin-bottom: 20rpx;
		}
		>view{
			background: #FFFFFF;
		}
		textarea{
			height: 300rpx;
			width: 100%;
			border: 1px solid #CCCCCC;
			background: #eee;
			border-radius: 10rpx;
			padding: 10rpx;
			box-sizing: border-box;
		}
		
	}
	.groupbox{
		padding-top: 20rpx;
		.tit{
			margin-left: 20rpx;
			margin-bottom: 20rpx;
			height: inherit;
			border: 0;
			padding-left: 0;
			text{
				padding-left: 30rpx;
				border-left: 2px solid #FF6C00;
			}
			view{
				display: inline-block;
				width: 400rpx;
				margin-left: 70rpx;
			}
		}
	}
	button{
		background: #FF6C00;
		color: #fff;
	}
	button:after{
		border: 0;
	}
	.xlbox{
		padding: 10rpx 30rpx;
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
</style>

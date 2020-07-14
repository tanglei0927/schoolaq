<template>
	<view class="details">
		<view class="carbox">
			<view class="tits cl">
				<text class="time">{{form.type==1?'早':'晚'}}</text>
				<text>预计：{{form.expectCount}}人</text>
			</view>
			<view class="status cl">
				<image class="bjimg" src="../../static/img/right.png" mode="widthFix"></image>
				<image class="car" src="../../static/img/sy_006.png" mode="widthFix"></image>
			</view>
			<view class="businfo cl">
				<view>
					<image src="../../static/img/sy_004.png" mode="widthFix"></image>
					<text>{{form.startSiteName}}</text>
				</view>
				<view>
					<image src="../../static/img/sy_005.png" mode="widthFix"></image>
					<text>{{form.endSiteName}}</text>
				</view>
			</view>
			<view class="cl infos">
				<text>发车时间：{{form.startTime}}</text>
				<text>预计到达：{{form.endTime}}</text>
				<view class="cl">
					<text>车内人数：{{form.count}}</text>
					<switch @change="switch2Change" />
				</view>
			</view>			
		</view>
		<view class="txbox">
			<view class="tit">
				车内人数
			</view>
			<view class="box cl">
				<view v-for="(item,index) in form.childrenVos" :class="item.isTake==1?'checktx tx':'tx'" @click="lookDetails(item)" v-if="isAll?(item.isTake==0):true">					
					<image :src="imgurl+'eaOss/download/'+item.photo" mode="widthFix"></image>
				</view>				
			</view>
		</view>
		<button class="footerbtn" type="primary" @click="goreport()">填写运行报告</button>
		
		<view class="shadow" v-if="show">
			<view class="box">
				<view class="tx">
					<image :src="imgurl+'eaOss/download/'+childPhoto" mode="widthFix"></image>
				</view>
				<view>
					姓名：{{childInfo.childrenName}}
				</view>
				<view>班级：{{childInfo.grade}}年级{{childInfo.clazz}}班</view>
				<view>上车时间：{{childInfo.boardTime?childInfo.boardTime:''}}</view>
				<view>下车时间：{{childInfo.takeTime?childInfo.takeTime:''}}</view>
				<!-- <view>
					<text>是否听话：</text>
					<switch checked="true" @change="changeSwitch" />
				</view> -->
				<view>
					<radio-group @change="radioChange" v-model="childInfo.status">
						<label class="radio"><radio :value="0" :checked="childInfo.status==0?true:false" />没问题</label>
						<label class="radio"><radio :value="1" :checked="childInfo.status==1?true:false" />打闹离座</label>
						<label class="radio"><radio :value="2" :checked="childInfo.status==2?true:false" />危品携带</label>
						<label class="radio"><radio :value="3" :checked="childInfo.status==3?true:false" />其他</label>
					</radio-group>
				</view>
				<p>其他说明：</p>
				<textarea value="" v-model="childInfo.otherReson" placeholder="请输入" />
				<button type="primary" @click="submitInfo()">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:false,
				id:null,
				form:{},
				isAll:false,
				childInfo:{},
				childPhoto:'',
				imgurl:''
			}
		},
		onLoad(e){
			this.id=e.id
			this.getInfo()
			this.imgurl=this.$imgurl
		},
		methods:{
			switch2Change(val){
				console.log(val)
				let list=this.form.childrenVos
				this.isAll=val.detail.value
				if(this.isAll){
					// 车内人数
					let count=0
					list.forEach((item,index)=>{
						if(item.isTake==0){
							count++
						}
					})
					this.form.count=count
				}else{
					// 所有
					this.form.count=list.length
				}
			},
			goreport(){
				uni.navigateTo({
					url:"report?lineRecordId="+this.form.lineRecordId
				})
			},
			changeSwitch(){
				
			},
			getInfo(){
				this.$http.post("sLine/lineDetail",{
					lineId:this.id
				}).then(res=>{
					if(res.code==100){
						this.form=res.info
					}else if(res.code==250){
						uni.showToast({
							icon:"none",
							title:res.msg
						})
						setTimeout(()=>{
							uni.navigateBack({
								
							})
						},2000)
					}
				})
			},
			lookDetails(item){
				// 学生乘车记录详情
				this.$http.post("sRidingRecord/presentationDetail",{
					ridingRedordId:item.ridingRecordId
				}).then(res=>{
					if(res.code==100){
						this.show=true
						this.childInfo=res.info
						this.childPhoto=item.photo
						if(!this.childInfo.status){
							this.childInfo.status=0
						}
					}
				})
			},
			submitInfo(){
				// 提交学生乘车情况
				let data=this.childInfo
				this.$http.post("sRidingRecord/presentation",data).then(res=>{
					if(res.code==100){
						// uni.showToast({
						// 	icon:"success",
						// 	title:"提交成功！"
						// })
						this.show=false
					}else{
						uni.showToast({
							icon:"none",
							title:res.msg
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.carbox{
		width: 700rpx;
		margin:20rpx auto;
		background: #fff;
		border-radius: 20rpx;
		border: 1px solid #ccc;
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
		.infos{
			padding:20rpx;
			border-top: 1px solid #ccc;
			line-height: 80rpx;
			text{
				float: left;
			}
			switch{
				float: left;
				margin-left: 40rpx;
			}
			text:nth-child(2){
				float: right;
			}
		}
	}
	.footerbtn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.txbox{
		padding: 20rpx 10rpx;
		background: #fff;
		padding-bottom: 100rpx;
		.tit{
			margin-left: 20rpx;
		}
		.checktx{
			filter: grayscale(1);
		}
		.tx{
			margin: 20rpx;
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;		
			overflow: hidden;
			float: left;
			position: relative;
			border: 1px solid #eee;
			image{
				width: 100%;
			}
			view{
				background: rgba(255,255,255,.8);
				position: absolute;
				top: 0;
				right: 0;
				bottom:0;
				left: 0;
				margin: auto;
			}
		}
	}
	>button{
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
	}
	button{
		background: #FF6C00;
	}
	.shadow{
		position:fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background: rgba(0,0,0,.5);
		z-index: 1000000;
		.box{
			border-radius: 20rpx;
			background: #fff;
			width: 560rpx;
			margin: auto;
			margin-top: 100rpx;
			padding: 40rpx;
			line-height: 60rpx;
			.tx{
				width: 126rpx;
				height: 126rpx;
				margin: auto;
				border-radius: 50%;
				overflow: hidden;
				margin-bottom: 30rpx;
				border:1px solid #ccc;
			}
			
			image{
				width: 100%;
			}
			button{
				margin-top: 30rpx;
				border-radius: 50rpx;
			}
			textarea{
				background: #eee;
				height: 200rpx;
				width: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
			}
		}
	}
</style>

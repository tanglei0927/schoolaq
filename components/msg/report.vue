<template>
	<view class="report">
		<view class="">
			<view class="tit">
				司机行为监督
			</view>
		</view>
		<view class="cl">
			<text class="txt">紧急情况</text>
			<Select :status="form.urgentStart" :index="1" @changeVal="changeVal" />
		</view>
		<view class="cl">
			<text class="txt">急刹情况</text>
			<Select :status="form.brakes" :index="2" @changeVal="changeVal" />
		</view>
		<view class="cl">
			<text class="txt">急打方向</text>
			<Select :status="form.rushDirection" :index="3" @changeVal="changeVal" />
		</view>
		<view class="cl">
			<text class="txt">激烈驾驶</text>
			<Select :status="form.drasticDriving" :index="4" @changeVal="changeVal" />
			<h4>（原则上30公里以内速度）</h4>
		</view>
		<view class="cl">
			<text class="txt">开车过程中打电话</text>
			<Select :status="form.drivingCalling" :index="5" @changeVal="changeVal" />
		</view>
		<view class="cl">
			<text class="txt">开车过程中抽烟</text>
			<Select :status="form.drivingSmoking" :index="6" @changeVal="changeVal" />
		</view>
		<button type="primary" @click="submitInfo()">结束行程</button>
		
		<!-- 通知 -->
		<view class="shadow" v-if="show">
			<view class="box">
				<h3>通知</h3>
				<view>发车时间：{{info.startTime?info.startTime:''}}</view>
				<view>到达时间：{{info.endTime?info.endTime:''}}</view>
				<view>上车：{{info.alreadyNumber?info.alreadyNumber:0}}人</view>
				<view>下车：{{info.takeNumber?info.takeNumber:0}}人</view>
				<view>滞留：{{info.inNumber?info.inNumber:0}}人</view>
				<button type="primary" @click="isOk()">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Select from "../common/select.vue"
	export default{
		components:{
			Select
		},
		data(){
			return{
				val1:1,
				show:true,
				form:{
					lineRecordId:null,//行车记录ID
					securityId:null,//安全员
					urgentStart:0,//急启情况 0：没有
					brakes:0,//急刹车
					rushDirection:0,//急打方向
					drasticDriving:0,//激烈行驶
					drivingCalling:0,//打电话
					drivingSmoking:0,//抽烟
				},
				info:{}
			}			
		},
		onLoad(opt){
			this.form.lineRecordId=opt.lineRecordId
			let userInfo=uni.getStorageSync('userInfo')
			userInfo=JSON.parse(userInfo)
			this.form.securityId=userInfo.id
			this.getInfo()
		},
		methods:{
			changeVal(val){
				console.log(val)
				let index=val.index
				switch(index){
					case 1:
						this.form.urgentStart=val.val
						break;
					case 2:
						this.form.brakes=val.val
						break;
					case 3:
						this.form.rushDirection=val.val
						break;
					case 4:
						this.form.drasticDriving=val.val
						break;
					case 5:
						this.form.drivingCalling=val.val
						break;
					case 6:
						this.form.drivingSmoking=val.val
						break;
				}
			},
			getInfo(){
				this.$http.post("operatorReport/endOperation",{
					lineRecordId:this.form.lineRecordId,
					securityId:this.form.securityId
				}).then(res=>{
					if(res.code==100){
						this.info=res.info
					}else if(res.code==250){
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
				})
			},
			isOk(){
				this.show=false
			},
			submitInfo(){
				this.$http.post("operatorReport/addOperationReport",this.form).then(res=>{
					if(res.code==100){
						uni.showToast({
							icon:"success",
							title:"报告填写成功！"
						})
						setTimeout(()=>{
							uni.switchTab({
								url:"../../pages/index/index"
							})
						},2000)
					}else if(res.code==250){
						uni.showToast({
							icon:"none",
							title:res.msg
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.report{
		padding: 0 20rpx;
		background: #fff;
		>view{
			// position: relative;
			padding:20rpx 0;
			border-bottom: 1px solid #ccc;
			Select{
				float: right;
			}
			h4{
				color:#ccc;
				font-size: 30rpx;
			}
		}
		>button{
			width: 100%;
			position: fixed;
			bottom: 0;
			left:0 ;
		}
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
			margin-top: 200rpx;
			padding: 40rpx;
			line-height: 74rpx;
			h3{
				text-align: center;
				font-weight: bold;
				line-height: 60rpx;
			}
			button{
				margin-top: 30rpx;
				border-radius: 50rpx;
			}
		}
	}
</style>

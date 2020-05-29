<template>
	<view class="page">
		<!-- <Rili /> -->
		<view class="cl">
			<wCalendar
				ref="calendar"
				:lunar="true" 
				:disabledBefore="false" 
				:disabledAfter="true" 
				@confirm="getResult">
			</wCalendar>
		</view>
		 
		<view class="jilu">
			<h3>行程记录</h3>
			<view v-if="recordList.length==0" class="nonebox">
				{{time}},无行程
			</view>
			<view v-else class="boxlist">
				<view class="box" v-for="(item,index) in recordList" @click="lookDetails(item.id)">
					<view class="tit">
						{{item.lineName}}
					</view>
					<view class="times">
						<text>出发：{{item.startTime}}</text>
						<text>到达：{{item.endTime}}</text>
					</view>
					<image src="../../static/img/left.png" mode="widthFix"></image>
					<view class="businfo cl">
						<view>
							<image src="../../static/img/sy_004.png" mode="widthFix"></image>
							<text>{{item.startSite}}</text>
						</view>
						
						<view>
							<image src="../../static/img/sy_005.png" mode="widthFix"></image>
							<text>{{item.endSite}}</text>
						</view>
					</view>
				</view>
			</view>
			<button type="primary">返回</button>
		</view>
		
	</view>
</template>

<script>
	// import Rili from "../common/dark-calendar/dark-calendar.vue"
	import wCalendar from "../common/w-calendar/w-calendar.vue";
	export default{
		components:{
			// Rili,
			wCalendar
		},
		data(){
			return{
				result:{},
				time:null,
				id:null,
				recordList:[]
			}
		},
		mounted(){
			this.$refs.calendar.show();
		},
		onLoad(e){
			this.id=e.id
			console.log(e.id)
			let date=new Date()
			let dateStr=""
			dateStr=date.getFullYear()+"-"
			let month=date.getMonth()+1
			month=month<10?"0"+month:month
			dateStr+=month+"-"
			let day=date.getDate()
			day=day<10?"0"+day:day
			dateStr+=day
			this.time=dateStr
			this.getRecord()
		},
		methods:{
			getResult(val){
				console.log(val)
				this.time=val.fullDate
				this.getRecord()
				// this.result=val;
				// this.$refs.calendar.show();
			},
			getRecord(){
				// 获取行程记录
				this.$http.post("sRidingRecord/list",{
					securityId:this.id,
					fromTime:this.time,
					toTime:this.time
				}).then(res=>{
					if(res.code==100){
						this.recordList=res.info
					}
				})
			},
			lookDetails(id){
				uni.navigateTo({
					url:"details?id="+id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		// height: ;
	}
	.jilu{
		padding: 20rpx;
		position: relative;
		padding-bottom:100rpx ;
		h3{
			line-height: 100rpx;
			
		}
		.box{
			background: #fff;
			padding: 20rpx 0;
			border-radius: 10rpx;
			border: 1px solid #ccc;
			margin-bottom: 30rpx;
			position: relative;
			font-size: 30rpx;
			.tit{
				margin-left: 20rpx;
			}
			.times{
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				background: #eee;
				padding: 5rpx 0rpx;
				border-radius: 30rpx;
				text{
					margin: 0 20rpx;
				}
			}
			>image{
				width: 100%;
			}
		}
		button{
			background: #FF6C00;
			border-radius: 0;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
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
	.nonebox{
		// width: 90%;
		margin: auto;
		padding: 30rpx 0;
		text-align: center;
		color: #ccc;
		border: 1px solid #eee;
		border-radius: 20rpx;
		background-color: #fff;
	}
</style>

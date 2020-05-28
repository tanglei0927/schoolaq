<template>
	<view class="">
		<view class="list_box">
			<view class="box cl" v-for="(item,index) in Msglist" @click="goDetails(item.id)">
				<view class="img">
					<image src="../../static/img/xxzx_012.png" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<h3>
						<image v-if="item.state==0" src="../../static/img/weidu.png" mode="widthFix"></image>
						<text>请假信息</text>
						<text class="times">{{item.createTime}}</text>
					</h3>
					<text>{{item.content}}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				Msglist:[],
				userInfo:{},			
				
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
			goDetails(id){
				uni.navigateTo({
					url:"./info?id="+id
				})
			},
			getMsgList(){
				this.$http.post("sMessage/list",{
					id:this.userInfo.id,
					type:2
				}).then(res=>{
					if(res.code==100){
						let list=res.info
						list.forEach((item,index)=>{
							item.createTime=this.$untils.getDate(item.createTime)
						})
						this.Msglist=list
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
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
					.times{
						float: right;
						font-weight: normal;
						color: #ccc;
					}
					image{
						width: 80rpx;
						margin-right: 20rpx;
					}
				}
				>text{
					display: inline-block;
					width: 100%;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					color: #646464;
				}
			}
		}
		.box:last-child{
			border: 0;
		}
	}
</style>

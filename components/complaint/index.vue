<template>
	<view class="">
		<view class="list_box">
			<view class="box cl" v-for="(item,index) in Msglist" @click="goDetails(item.id)">
				<view class="img">
					<image src="../../static/img/xxzx_009.png" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<h3>
						<view class="statusbox">
							<image :src="item.state==0?iconList[0]:(item.state==3?iconList[2]:iconList[1])" mode="widthFix"></image>
							<text>{{item.state==0?'未读':(item.state==3?'已回复':(item.state==2?'未通过':(item.state==4?'审核中':'未回复')))}}</text>
						</view>
						<text>投诉信息</text>
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
				// state:0未读，1已读  2：已回复
				iconList:[
					'../../static/img/weide001.png',//未读
					'../../static/img/xxzx_006.png',//已读，未回复
					'../../static/img/xxzx_007.png',//已回复
				]
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
					type:1
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
		.statusbox{
			float:left;
			position: relative;
			image{
				width: 80rpx;
				// position: absolute;			
			}
			text{
				position: absolute;
				top: 0;
				color: #fff;
				left: 0;
				width: 80rpx;
				text-align: center;
				font-size: 10px;
				line-height: 50rpx;
				// padding:  0 10rpx;
			}
		}
	}
	
</style>

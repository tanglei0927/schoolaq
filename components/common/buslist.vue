<template>
	<view class="box">
		<view class="grouplist cl" :style="'width:'+(list.length*150-80)+'rpx'">
			<view class="li cl" v-for="(item,index) in list">
				<view class="cl"> 
					<i :class="checkList.indexOf(index)!=-1?'check':''">
						<em></em>
					</i>
					<text>{{item}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:[
			'list'
		],
		data(){
			return{
				boxWidth:100,
				checkList:[0,2]
			}
		},
		mounted(){
			// let listLen=this.$props.list.length
			// console.log(lis\)
			// this.boxWidth=listLen*140
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		width: 750rpx;
		overflow-y: hidden;
		overflow-x: scroll;
	}
	.grouplist{
		margin-top: 30rpx;
		
		.li:first-child{
			width: 30rpx;
			padding-left: 15rpx;
		.li:last-child{
			padding-right: 15rpx;
		}
		}
		.li{
			float: left;
			position: relative;
			border-top: 30rpx solid #007AFF;
			width: 150rpx;
			height: 500rpx;
			>view{
				position: absolute;
				right: 15rpx;
				top: -38rpx;
				width: 20rpx;
				z-index: 1000;
				i{
					display: inline-block;
					width: 30rpx;
					height: 30rpx;
					border-radius: 50%;
					border:1px solid #ccc;
					background: #fff;
				}
				.check{
					border-color: #FF6C00;
					text-align: center;
					position: relative;
					em{
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						margin: auto;
						height: 20rpx;
						width: 20rpx;
						background: #FF6C00;
						border-radius: 50%;
					}
				}
				.check+text{
					color: #FF6C00;
				}
			}
		}
	}
</style>

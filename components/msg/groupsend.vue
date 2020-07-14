<template>
	<view class="sendbox">
		<view class="msgbox">
			<view class="tit">编辑信息</view>
			<textarea value="" v-model="content" placeholder="请输入群发内容(最多500字)" />
		</view>
		<view class="groupbox">
			<view class="tit cl">
				<text>选择接收群体</text>
				<view class="">					
					<xfl-select
						:list="lineStrlist"
						:clearable="false"
						:showItemNum="5" 
						:listShow="false"
						:isCanInput="true"  
						:style_Container="'height: 50px; font-size: 16px;'"
						:placeholder = "'请选择线路'"
						:initValue="selectValue"
						:selectHideType="'hideAll'"
						@change="selectChange"
					>
					</xfl-select>				
				</view>
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
				content:""
			}
		},
		onLoad(e){
			this.id=e.id
			this.getLines()
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
				this.lineId=this.lineList[index].id
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
					this.$http.post("sMessage/sendGroupMsg",{
						securityId:this.id,
						lineId:this.lineId,
						content:this.content
					}).then(res=>{
						if(res.code==100){
							uni.showToast({
								icon:"success",
								title:"发送成功！"
							})
						}
					})
				}
				
			}
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
</style>

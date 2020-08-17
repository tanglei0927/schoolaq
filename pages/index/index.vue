<template>
	<view class="index_page">
		<!-- 头部 -->
		<view class="cl headers">
			<image src="../../static/img/sy_001bj.png" mode="widthFix"></image>
			<view class="msgbox">
				<view class="teacher" @click="goRouter()">
					<image class="teachericon" src="../../static/img/sy_007.png" mode="widthFix"></image>
					<text v-if="isLogin">{{form.name?form.name:''}}老师</text>
					<text v-else>请登录</text>
				</view>
				<view class="weather">
					<!-- <view class="tit">
						<text class="num">10℃</text>
						<text class="msg">多云转晴</text>
					</view> -->
					<view class="times">
						<view class="num">
							{{date}} {{day}}
						</view>
						<view class="msg">
							{{datenl}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="sxts">~下拉可刷新~</view>
		<view class="xltit" @click="shadow=true">
			<text>选择线路</text>
			<image src="../../static/img/wd_018.png" mode="widthFix"></image>
		</view>
		<!-- 班车列表 -->
		<view class="bus_list" v-if="lineList.length>0">
			<view class="box" v-for="(item,index) in lineList">
				<view class="tits cl">
					<text class="time">{{item.name}}({{item.type==1?'早':'晚'}})</text>
					<text>预计：{{item.expectNumber}}人</text>
				</view>
				<view class="status cl">
					<image :class="item.status==1?'bjimg':'norun bjimg'" src="../../static/img/right.png" mode="widthFix"></image>
					 <!-- @touchend="touchEnd(item)" @touchmove="touchStart($event,index)" -->
					<image :class="item.status==1?'runcar car':'car'" :style="'left:'+widthList[index]+'px'" @click="touchEnd(item)"  src="../../static/img/sy_006.png" mode="widthFix"></image>
				</view>
				<view class="businfo cl">
					<view>
						<image src="../../static/img/sy_004.png" mode="widthFix"></image>
						<text>{{item.startSiteName}}</text>
					</view>
					<view>
						<image src="../../static/img/sy_005.png" mode="widthFix"></image>
						<text>{{item.endSiteName}}</text>
					</view>
				</view>
			</view>		
		</view>
		<view class="linenone" v-else>
			<image src="../../static/img/xxzx_003.png" mode="widthFix"></image>
			<view class="">
				暂无线路
			</view>
		</view>
		<view class="footerbox">
			<image src="../../static/img/sy_002.png" mode="widthFix" @click="goInfo(2)"></image>
			<image src="../../static/img/sy_003.png" mode="widthFix" @click="goInfo(1)"></image>
			<!-- <image src="../../static/img/sy_001.png" mode="widthFix"></image> -->
		</view>
		<!-- 选择线路弹框 -->
		<view class="shadow" v-show="shadow">
			<view class="box">
				<h3>
					<text>选择线路</text>
					<image src="../../static/img/gb.png" @click="shadow=false" mode="widthFix"></image>
				</h3>
				<view class="searchbox cl">
					<input type="text" value="" v-model="searchStr" placeholder="请输入线路名称" />
					<image src="../../static/img/sousuo.png" @click="searchLine()" mode="widthFix"></image>
				</view>
				<view class="linelist" v-if="searchList.length>0">
					<view v-for="(item,index) in searchList" @click="checkLine(item.lineId)" :class="CheckNum==item.lineId?'check':''">
						{{item.lineName}}
					</view>					
				</view>
				<view class="nonebox" v-else>
					<image src="../../static/img/xxzx_008.png" mode="widthFix"></image>
					<view>未搜索到线路</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import showCalendar from "../../components/unitls/getday.js"
	export default {		
		data() {
			return {
				title: 'Hello',
				form:{
					teacher:'苹果老师'
				},
				isLogin:true,
				widths:[10,0],
				width1:0,
				flag:false,
				lineList:[],//默认线路
				shadow:false,
				searchStr:"",
				searchList:[],//搜索出来的线路列表
				CheckNum:0,
				widthList:[0],
				xlFlag:false,
				date:'',
				day:null,
				datenl:'',
				dayList:['周日','周一','周二','周三','周四','周五','周六']
			}
		},
		watch:{
			widths:function (oldval,newval){
				console.log(oldval)
			},
			widthList:function (oldval,newval){
				this.widthList=newval
			},
			deep:true
		},
		onLoad() {
			uni.authorize({
				scope:'userInfo'
			})
			let date=new Date()
			let dateStr=""
			dateStr=date.getFullYear()+"年"
			dateStr+=(date.getMonth()+1)+"月"
			dateStr+=date.getDate()+"日"
			this.date=dateStr
			let day=null
			day=date.getDay()
			this.day=this.dayList[day]
			this.datenl=showCalendar()
		},
		onShow(){
			let userInfo=uni.getStorageSync("userInfo")
			if(userInfo){
				this.form=JSON.parse(userInfo)
				this.isLogin=true
			}else{
				this.form={}
				this.isLogin=false
				uni.showToast({
					icon:"none",
					title:"您还没有登录，请先登录!"
				})
				setTimeout(()=>{
					uni.navigateTo({
						url:"../my/login"
					})
				},2000)
			}
			this.getLineQuery()
		},
		methods: {
			getuserinfo(){
				
			},
			goRouter(){
				if(this.isLogin){
					//查看个人资料
					// this.goInfo(2)
					uni.navigateTo({
						url:"../../components/msg/userinfo"
					})
				}else{
					//登陆
					uni.navigateTo({
						url:"../my/login"
					})
				}
				
			},
			lookDetail(item){
				console.log("点击")
				this.flag=false
				uni.navigateTo({
					url:"../../components/msg/linedetails?id="+item.lineId
				})
			},
			touchStart(e,index){
				console.log("拖动小车")
				this.flag=true
				console.log(e)
				let page=e.touches[0].pageX
				this.widthList[index]=page
				
			},
			touchEnd(item){
				console.log(item)
				if(item.status){
					// 线路开启状态
					// this.lookDetail(item)				
					this.$http.post('operatorReport/haveBoardReport',{
						lineId:item.lineId
					}).then(res=>{
						if(res.code==100){
							// 没有填写报告 去填写报告
							uni.navigateTo({
								url:"../../components/msg/security?id="+this.form.id+"&lineId="+item.lineId
							})
						}else if(res.code==250){
							uni.showToast({
								icon:"none",
								title:res.msg
							})
						}else if(res.code==450){
							// 已经填写报告
							this.lookDetail(item)
						}
					})
				}else{
					// 线路结束状态
					uni.showToast({
						icon:"none",
						title:"线路还没有开启，请在车载设备上开启线路"
					})
					// if(this.flag){
					// 	console.log("查看线路安全报告")
					// 	uni.navigateTo({
					// 		url:"../../components/msg/security?id="+this.form.id+"&lineId="+item.lineId
					// 	})
					// }
				}
				
				
			},
			goInfo(index){
				switch(index){
					case 1:
						// 行程记录
						uni.navigateTo({
							url:"../../components/msg/Itineraryrecord?id="+this.form.id
						})
						break
					case 2:
						this.goRouter()
						break
				}
			},
			// 获取安全员默认的线路
			getLineQuery(){
				this.xlFlag=false
				this.$http.post("sLine/securityLineQuery",{
					id:this.form.id
				}).then(res=>{
					if(res.code==100){
						this.lineList=res.info
						let list=res.info
						list.forEach((item,index)=>{
							this.widthList[index]=0
						})
						setTimeout(()=>{
							this.xlFlag=true
						},2000)
						uni.stopPullDownRefresh()
					}
				})				
			},
			searchLine(){
				// 搜索线路
				this.$http.post("sLine/lineList",{
					name:this.searchStr,
					id:this.form.id
				}).then(res=>{
					if(res.code==100){
						this.searchList=res.info
					}
				})
			},
			checkLine(id){
				this.CheckNum=id
				// 设置线路默认的安全员、安全员选择线路
				uni.showLoading({
					icon:"loading",
					title:"正在设置"
				})
				this.$http.post("sLine/updateLine",{
					id:this.form.id,
					lineId:id
				}).then(res=>{
					if(res.code==100){						
						setTimeout(()=>{
							uni.hideLoading()
							uni.showToast({
								icon:"success",
								title:"设置成功"
							})
							this.shadow=false
							this.getLineQuery()
						},1000)		
					}
				})
			},
		},
		onPullDownRefresh:function(){
			let that=this
			if(this.xlFlag){
				uni.startPullDownRefresh({
					success:()=>{						
						that.getLineQuery()
					}
				})
			}else{
				console.log("取消下拉刷新")
				uni.stopPullDownRefresh()
			}
			
		}
	}
</script>
 
<style lang="scss" scoped>
	.index_page{
		width: 100%;
		height: 516rpx;
		background: #fff;
		// background:url(../../static/img/sy_001bj.png);
		>image{
			width: 100%;
		}
		.headers{
			position: relative;
			image{
				width: 100%;
			}
		}
		.msgbox{
			position: absolute;
			top: 40rpx;
			padding: 0 30rpx;
			.teachericon{
				width: 30rpx;
				margin-right: 10rpx;
				margin-top: 5rpx;
			}
			.teacher{
				padding: 0 30rpx;
				margin: 34rpx 0;
				border-radius: 20rpx;
				background: #fa5617;
				color: #fff;
				line-height:50rpx ;
			}
		}	
		.xltit{
			padding: 10rpx 30rpx;
			background: #fff;
			margin-bottom: 0;
			border:0;
			text{
				border-left: 2px solid #FF6C00;
				padding-left: 20rpx;
			}
			image{
				width: 20rpx;
				float: right;
			}
		}
	}
	.bus_list{
		padding:0 30rpx;
		.box{
			padding: 30rpx 0;
			background: #fff;
			border-radius:20rpx;
			margin:10rpx 0;
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
				.norun{
					filter: grayscale(1);
				}
			}
			.car{
				width: 150rpx;
				position: absolute;
				top: -15rpx;
				left: 0;
			}
			.runcar{
				// left: 60px !important;
				right: 0;
				margin: auto;
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
		}		
	}
	.linenone{
		background: #fff;
		text-align: center;
		padding: 50rpx 0;
		margin-bottom: 20rpx;
		image{
			width: 30%;			
		}
		view{
			line-height: 80rpx;
			color: #ccc;
		}
	}
	.footerbox{
		background: #fff;
		padding: 40rpx 0;
		image{
			width: 250rpx;
			margin-left: 83rpx;
		}
	}
	.shadow{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		background: rgba(0,0,0,.5);
		.box{
			width: 660rpx;
			height: 800rpx;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			margin: auto;
			background: #fff;
			border-radius: 20rpx;
			padding: 20rpx;
			h3{
				line-height: 60rpx;
				text-align: center;
				border-bottom: 1px solid #eee;
				image{
					width: 40rpx;
					float:right;
				}
			}
			.searchbox{
				margin-top: 20rpx;
				input{
					float: left;
					width: 80%;
					height: 30rpx;
					line-height: 30rpx;
					border: 1px solid #eee;
					border-radius: 30rpx;
					padding: 5rpx 10rpx;
					margin-left: 20rpx;
				}
				image{
					width: 40rpx;
					float: left;
					margin-left: 20rpx;
					
				}
			}
			.linelist{
				height: 620rpx;
				// overflow: hidden;
				overflow-x: hidden;
				overflow-y: scroll;
				padding: 20rpx;
				view{
					line-height: 60rpx;
					border-bottom:1px solid #eee ;
					padding: 0 10rpx;
					// border-bottom-left-radius:20rpx ;
					// border-top-right-radius:20rpx ;
				}
				.check{
					// background: #FF6C00;
					color: #FF6C00;
					border-bottom: 2px solid #FF6C00;
				}
			}
			.nonebox{
				text-align: center;
				image{
					width: 200rpx;
					margin-top: 40rpx;
				}
				view{
					line-height: 60rpx;
					color: #ccc;
				}
			}
		}
	}
	.headers .weather{
		.num{
			font-size: 16px !important;
			line-height: 60rpx;
		}
		.msg{
			font-size: 14px;
			color: #FF6C00;
			margin-bottom: 10rpx;
		}
		.times{
			border-bottom: 1px solid #ccc;
		}
	}
	.sxts{
		color: #ccc;
		text-align: center;
		font-size: 12px;
	}
</style>

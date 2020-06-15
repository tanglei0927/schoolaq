<template>
	<view class="report">
		<view class="">
			<view class="tit">
				车况
			</view>
			<view class="driver">
				<xfl-select
					:list="carStr"
					:clearable="false"
					:showItemNum="5" 
					:listShow="false"
					:isCanInput="true"  
					:style_Container="'height: 50px; font-size: 16px;'"
					:placeholder = "'请选择车辆'"
					:initValue="selectValue"
					:selectHideType="'hideAll'"
					@change="selectChangeCar"
				>
				</xfl-select>
			</view>
		</view>
		<view class="cl">
			<text class="txt">刹车情况检查</text>
			<Select :status="form.brake" :index="1" @changeVal="changeVal" />
		</view>
		<view class="cl">
			<text class="txt">车灯情况检查</text>
			<Select :status="form.lamp"  :index="2" @changeVal="changeVal" />
			<h4>（前照、刹车、转向、防雾、示廊，报警）</h4>
		</view>
		<view class="cl">
			<text class="txt">轮胎检查</text>
			<Select :status="form.tire"  :index="3" @changeVal="changeVal" />
			<h4>（花纹深度在合理范围内）</h4>
		</view>
		<view class="cl">
			<text class="txt">雨刮检查</text>
			<Select :status="form.rainBrake" :index="4" @changeVal="changeVal" />
			<h4>（能刮干净，不影响视线）</h4>
		</view>
		<view class="cl">
			<text class="txt">后视镜检查</text>
			<Select :status="form.mirror" :index="5" @changeVal="changeVal" />
			<h4>（无遮挡、破损、视线好）</h4>
		</view>
		<view class="cl">
			<text class="txt">车上是否有不安全的物品</text>
			<Select :status="form.unsafeIterms" :index="6" @changeVal="changeVal" />
			<h4>（利器、易爆、易燃等）</h4>
		</view>
		<view class="cl">
			<text class="txt">救生锤</text>
			<Select :status="form.lifesavingHammer" :index="7" @changeVal="changeVal" />
			<h4>（至少3个，标志清除，可徒手启用）</h4>
		</view>
		<view class="cl">
			<text class="txt">灭火器</text>
			<Select :status="form.fireExtinguisher" :index="8" @changeVal="changeVal" />
			<h4>（2个，前后各一个，有效）</h4>
		</view>
		<view class="cl">
			<text class="txt">安全门</text>
			<Select :status="form.emergencyDoor" :index="9" @changeVal="changeVal" />
			<h4>（可徒手开取）</h4>
		</view>
		<view class="driverbox cl" style="margin-top: 20rpx;">
			<view class="tit">
				司机安全
			</view>
			<view class="driver">
				<xfl-select
					:list="driverStr"
					:clearable="false"
					:showItemNum="5" 
					:listShow="false"
					:isCanInput="true"  
					:style_Container="'height: 50px; font-size: 16px;'"
					:placeholder = "'请选择司机'"
					:initValue="selectDriver"
					:selectHideType="'hideAll'"
					@change="selectChange"
				>
				</xfl-select>
			</view>
		</view>
		<view class="cl">
			<text class="txt">饮酒检查</text>
			<Select :status="form.isDrinkWine" :index="10" @changeVal="changeVal" />
		</view>
		<view class="cl">
			<text class="txt">鞋子检查</text>
			<Select :status="form.shoes" :index="11" @changeVal="changeVal" />
			<h4>（是否违规脱靴或高跟鞋等）</h4>
		</view>
		<view class="cl">
			<text class="txt">疲劳情况检查</text>
			<Select :status="form.fatigue" :index="12" @changeVal="changeVal" />
		</view>
		<view class="cl">
			<text class="txt">情绪情况检查</text>
			<Select :status="form.emotion" :index="13" @changeVal="changeVal" />
		</view>
		<view class="cl">
			<text class="txt">驾驶经验</text>
			<Select :status="form.drivingExperience" :index="14" @changeVal="changeVal" />
		</view>
	<!-- 	<view class="cl">
			<text class="txt">驾照是否过期</text>
			<Select :status="form.unsafeIterms" />
		</view> -->
		<view class="cl">
			<text class="txt">健康情况检查</text>
			<Select :status="form.healthy"  :index="15" @changeVal="changeVal" />
		</view>
		<button type="primary" @click="openBus()">开启</button>
		
		<!-- 通知 -->
		<view class="shadow" v-show="false">
			<view class="box">
				<h3>通知</h3>
				<view>发车时间：8：00</view>
				<view>到达时间：8:30</view>
				<view>上车28人</view>
				<view>下车：28人</view>
				<view>滞留：0人</view>
				<button type="primary">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Select from "../common/select.vue"
	import  xflSelect from"../common/xfl-select/xfl-select.vue"
	export default{
		components:{
			Select,xflSelect
		},
		data(){
			return{
				val1:1,		
				id:null,
				driverList:[],//司机列表
				driverStr:[],
				carStr:[],
				carList:[],
				selectValue:'',
				selectDriver:'',
				form:{
					securityId:null,//安全员id
					brake:0,//刹车情况   0合格  1不合格
					lamp:0,//车灯  
					tire:0,//轮胎位置
					rainBrake:0,//雨刹
					mirror:0,//后视镜
					unsafeIterms:0,//不安全物品
					lifesavingHammer:0,//救生锤
					fireExtinguisher:0,//灭火器
					emergencyDoor:0,//安全门
					isDrinkWine:0,//是否饮酒
					shoes:0,//鞋子
					fatigue:0,//疲劳驾驶
					emotion:0,//情绪
					drivingExperience:0,//是否有驾驶经验
					healthy:0,//健康状况
					healthy:0,//健康状况
					driverId:null,//司机id
					driverName:null,//司机名称
					lineId:null,//线路id
				}
			}			
		},
		onLoad(e){
			console.log(e)
			this.form.securityId=e.id
			this.form.lineId=e.lineId
			this.getDriverList()
			this.getCarList()
		},
		watch:{
			driverStr:{
				handler(newVal,oldVal){
					console.log("list")
					console.log(newVal)
				}
			},
			deep:true
		},
		methods:{
			getMr(){
				// 获取默认的司机和校车
				this.$http.post('sLine/linesimpl',{
					lineId:this.form.lineId
				}).then(res=>{
					if(res.code==100){
						this.selectDriver=res.info.driverSimple.name
						this.selectValue=res.info.vehicleSimple.licenseId
						this.form.driverId=res.info.driverSimple.id
						this.form.driverName=this.selectDriver
						this.form.vehicleId=res.info.driverSimple.id
						this.form.vehicleCard=this.selectValue
					}
				})
			},
			getDriverList(){
				// 司机列表
				let that=this
				this.$http.post("operatorReport/listDriver",{
					securityId:	this.form.securityId
				}).then(res=>{
					if(res.code==100){
						// this.driverList=res.info
						let list=res.info
						that.driverList=[]
						that.driverStr=[]
						list.forEach((item,index)=>{
							that.driverStr.push(item.name)
							that.driverList.push(item)
						})
					}
				})
			},
			getCarList(){
				let that=this
				this.$http.post("operatorReport/listVehicle",{
					securityId:	this.form.securityId
				}).then(res=>{
					if(res.code==100){
						// this.driverList=res.info
						let list=res.info
						that.carList=[]
						that.carStr=[]
						list.forEach((item,index)=>{
							that.carStr.push(item.licenseId)
							that.carList.push(item)
						})
					}
				})
			},
			changeVal(val){
				console.log("切换")
				console.log(val)
				let index=val.index
				switch(index){
					case 1:
						this.form.brake=val.val
						break;
					case 2:
						this.form.lamp=val.val
						break;
					case 3:
						this.form.tire=val.val
						break;
					case 4:
						this.form.rainBrake=val.val
						break;
					case 5:
						this.form.mirror=val.val
						break;
					case 6:
						this.form.unsafeIterms=val.val
						break;
					case 7:
						this.form.lifesavingHammer=val.val
						break;
					case 8:
						this.form.fireExtinguisher=val.val
						break;
					case 9:
						this.form.emergencyDoor=val.val
						break;
					case 10:
						this.form.isDrinkWine=val.val
						break;
					case 11:
						this.form.shoes=val.val
						break;
					case 12:
						this.form.fatigue=val.val
						break;
					case 13:
						this.form.emotion=val.val
						break;
					case 14:
						this.form.drivingExperience=val.val
						break;
					case 15:
						this.form.healthy=val.val
						break;
				}				
			},
			selectChange(val){
				// 选择司机
				this.form.driverId=this.driverList[val.index].id
				this.form.driverName=val.newVal
				// console.log(val)
			},
			selectChangeCar(val){
				// 车辆
				this.form.vehicleId=this.carList[val.index].id
				this.form.vehicleCard=val.newVal
			},
			openBus(){
				// 开启
				console.log(this.form)
				if(!this.form.driverId||!this.form.vehicleId){
					uni.showToast({
						icon:"none",
						title:"请选择司机和车辆"
					})
				}else{
					// 添加安全报告
					this.$http.post("operatorReport/addBoardReport",this.form).then(res=>{
						if(res.code==100){
							uni.showToast({
								icon:"success",
								title:"填写成功！"
							})
							setTimeout(()=>{
								uni.navigateBack({
									
								})
							},2000)
						}
					})
				}
			},
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
			// position: fixed;
			// bottom: 0;
			// left:0 ;
			margin-top: 40rpx;
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

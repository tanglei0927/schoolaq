(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0ff3":function(t,n,e){},2710:function(t,n,e){"use strict";var i,o=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.shadow=!0},t.e1=function(n){t.shadow=!1})},s=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return i}))},"3c35":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=o(e("1780"));function o(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{title:"Hello",form:{teacher:"苹果老师"},isLogin:!0,widths:[10,0],width1:0,flag:!1,lineList:[],shadow:!1,searchStr:"",searchList:[],CheckNum:0,widthList:[0],xlFlag:!1,date:"",day:null,datenl:"",dayList:["周日","周一","周二","周三","周四","周五","周六"]}},watch:{widths:function(t,n){console.log(t)},widthList:function(t,n){this.widthList=n},deep:!0},onLoad:function(){t.authorize({scope:"userInfo"});var n=new Date,e="";e=n.getFullYear()+"年",e+=n.getMonth()+1+"月",e+=n.getDate()+"日",this.date=e;var o=null;o=n.getDay(),this.day=this.dayList[o],this.datenl=(0,i.default)()},onShow:function(){var n=t.getStorageSync("userInfo");n?(this.form=JSON.parse(n),this.isLogin=!0):(this.form={},this.isLogin=!1,t.showToast({icon:"none",title:"您还没有登录，请先登录!"}),setTimeout((function(){t.navigateTo({url:"../my/login"})}),2e3)),this.getLineQuery()},methods:{getuserinfo:function(){},goRouter:function(){this.isLogin?t.navigateTo({url:"../../components/msg/userinfo"}):t.navigateTo({url:"../my/login"})},lookDetail:function(n){console.log("点击"),this.flag=!1,t.navigateTo({url:"../../components/msg/linedetails?id="+n.lineId})},touchStart:function(t,n){console.log("拖动小车"),this.flag=!0,console.log(t);var e=t.touches[0].pageX;this.widthList[n]=e},touchEnd:function(n){var e=this;console.log(n),n.status?this.$http.post("operatorReport/haveBoardReport",{lineId:n.lineId}).then((function(i){100==i.code?t.navigateTo({url:"../../components/msg/security?id="+e.form.id+"&lineId="+n.lineId}):250==i.code?t.showToast({icon:"none",title:i.msg}):450==i.code&&e.lookDetail(n)})):t.showToast({icon:"none",title:"线路还没有开启，请在车载设备上开启线路"})},goInfo:function(n){switch(n){case 1:t.navigateTo({url:"../../components/msg/Itineraryrecord?id="+this.form.id});break;case 2:this.goRouter();break}},getLineQuery:function(){var n=this;this.xlFlag=!1,this.$http.post("sLine/securityLineQuery",{id:this.form.id}).then((function(e){if(100==e.code){n.lineList=e.info;var i=e.info;i.forEach((function(t,e){n.widthList[e]=0})),setTimeout((function(){n.xlFlag=!0}),2e3),t.stopPullDownRefresh()}}))},searchLine:function(){var t=this;this.$http.post("sLine/lineList",{name:this.searchStr,id:this.form.id}).then((function(n){100==n.code&&(t.searchList=n.info)}))},checkLine:function(n){var e=this;this.CheckNum=n,t.showLoading({icon:"loading",title:"正在设置"}),this.$http.post("sLine/updateLine",{id:this.form.id,lineId:n}).then((function(n){100==n.code&&setTimeout((function(){t.hideLoading(),t.showToast({icon:"success",title:"设置成功"}),e.shadow=!1,e.getLineQuery()}),1e3)}))}},onPullDownRefresh:function(){var n=this;this.xlFlag?t.startPullDownRefresh({success:function(){n.getLineQuery()}}):(console.log("取消下拉刷新"),t.stopPullDownRefresh())}};n.default=s}).call(this,e("543d")["default"])},c204:function(t,n,e){"use strict";(function(t){e("8d3f");i(e("66fd"));var n=i(e("e33c"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},d72b:function(t,n,e){"use strict";e.r(n);var i=e("3c35"),o=e.n(i);for(var s in i)"default"!==s&&function(t){e.d(n,t,(function(){return i[t]}))}(s);n["default"]=o.a},e33c:function(t,n,e){"use strict";e.r(n);var i=e("2710"),o=e("d72b");for(var s in o)"default"!==s&&function(t){e.d(n,t,(function(){return o[t]}))}(s);e("f2ff");var a,c=e("f0c5"),u=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"4c2b5bce",null,!1,i["a"],a);n["default"]=u.exports},f2ff:function(t,n,e){"use strict";var i=e("0ff3"),o=e.n(i);o.a}},[["c204","common/runtime","common/vendor"]]]);
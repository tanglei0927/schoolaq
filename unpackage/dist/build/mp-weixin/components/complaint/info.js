(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/complaint/info"],{"09f7":function(t,n,o){"use strict";var e=o("4c8c"),i=o.n(e);i.a},4541:function(t,n,o){"use strict";(function(t){o("f9a0");e(o("66fd"));var n=e(o("875f"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("543d")["createPage"])},"4c8c":function(t,n,o){},"4ea0":function(t,n,o){"use strict";var e;o.d(n,"b",(function(){return i})),o.d(n,"c",(function(){return s})),o.d(n,"a",(function(){return e}));var i=function(){var t=this,n=t.$createElement;t._self._c},s=[]},"58e1":function(t,n,o){"use strict";o.r(n);var e=o("6054"),i=o.n(e);for(var s in e)"default"!==s&&function(t){o.d(n,t,(function(){return e[t]}))}(s);n["default"]=i.a},6054:function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=i(o("a34a"));function i(t){return t&&t.__esModule?t:{default:t}}function s(t,n,o,e,i,s,c){try{var a=t[s](c),l=a.value}catch(u){return void o(u)}a.done?n(l):Promise.resolve(l).then(e,i)}function c(t){return function(){var n=this,o=arguments;return new Promise((function(e,i){var c=t.apply(n,o);function a(t){s(c,e,i,a,l,"next",t)}function l(t){s(c,e,i,a,l,"throw",t)}a(void 0)}))}}var a={data:function(){return{id:null,details:{},content:"",imgurl:"",imgList:[],photos:[],photos1:[]}},onLoad:function(t){this.id=t.id,this.imgurl=this.$imgurl,this.getMsgDetails()},onShow:function(){},methods:{getMsgDetails:function(){var t=this;this.$http.post("sMessage/getComplaintDetail",{id:this.id}).then((function(n){if(100==n.code){t.details=n.info,t.details.newsVoReply?t.content=t.details.newsVoReply.content:t.content="";var o=t.details.photos;console.log(t.details),t.photos=[],o&&o.length>0&&o.forEach((function(n,o){t.photos.push(t.imgurl+"file/downloadOss/"+n)})),console.log(111111);var e=t.details.newsVoReply.photos;console.log(e),t.photos1=[],e.length>0&&e.forEach((function(n,o){t.photos1.push(t.imgurl+"file/downloadOss/"+n)})),t.imgList=e}}))},reply:function(){var n=this,o="",e={};this.details.newsVoReply?(o="sMessage/updateReply",e.id=this.details.newsVoReply.id):o="sMessage/addReply",e.replyId=this.details.id,e.content=this.content,e.photos=this.imgList,e.content?this.$http.post(o,e).then((function(o){100==o.code?(t.showToast({icon:"success",title:"回复成功"}),n.getMsgDetails(),t.navigateBack({})):t.showToast({icon:"none",title:o.msg})})):t.showToast({icon:"none",title:"请输入回复内容！"})},uploadImg:function(){var n=this,o=1;console.log("上传图片"),console.log(this.imgList),n.imgList.length<3?t.chooseImage({fail:function(){t.hideLoading(),t.showToast({icon:"none",title:"上传失败"})},success:function(){var i=c(e.default.mark((function i(s){var a,l;return e.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:console.log("成功"),console.log(s),a=[],a=s.tempFilePaths,t.showLoading({title:"正在上传中"}),"",l=t.getStorageSync("userinfo"),l&&(l=JSON.parse(l),l.token),a.forEach(function(){var i=c(e.default.mark((function i(s,c){var l;return e.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("上传"),console.log(s),l=s,console.log(JSON.stringify(l)),t.uploadFile({url:n.$imgurl+"file/uploadOSS",header:{"Content-type":"multipart/form-data"},filePath:l,name:"file",success:function(e){console.log("已上传数量"+n.imgList.length),console.log(e);var i=e.data;i=JSON.parse(i),100==i.code?n.imgList.length<3?(console.log("上传成功"+c),console.log(i.info),n.imgList.push(i.info),c==a.length-1&&t.hideLoading()):1==o&&(t.showToast({title:"图片上传数量已到",icon:"none",success:function(){setTimeout((function(){t.hideToast()}),2e3)}}),o++):t.showToast({icon:"none",title:"上传失败"})},fail:function(n){console.log("上传失败"+c),console.log(n),t.showToast({title:"上传失败",icon:"none",success:function(){setTimeout((function(){t.hideToast()}),2e3)}})}});case 5:case"end":return e.stop()}}),i)})));return function(t,n){return i.apply(this,arguments)}}());case 9:case"end":return i.stop()}}),i)})));function s(t){return i.apply(this,arguments)}return s}()}):t.showToast({title:"图片最多上传3张",icon:"none",success:function(){setTimeout((function(){t.hideToast()}),2e3)}})},deleteImg:function(t){this.imgList.splice(t,1)},lookImg:function(n,o){t.previewImage({current:n,urls:o})}}};n.default=a}).call(this,o("543d")["default"])},"875f":function(t,n,o){"use strict";o.r(n);var e=o("4ea0"),i=o("58e1");for(var s in i)"default"!==s&&function(t){o.d(n,t,(function(){return i[t]}))}(s);o("09f7");var c,a=o("f0c5"),l=Object(a["a"])(i["default"],e["b"],e["c"],!1,null,"f8c199d6",null,!1,e["a"],c);n["default"]=l.exports}},[["4541","common/runtime","common/vendor"]]]);
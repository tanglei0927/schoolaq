(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/msg/details"],{"35bd":function(t,n,e){},"397f":function(t,n,e){"use strict";var o=e("35bd"),i=e.n(o);i.a},4599:function(t,n,e){"use strict";(function(t){e("8d3f");o(e("66fd"));var n=o(e("b971"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"9b13":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){e.e("components/common/select").then(function(){return resolve(e("27de"))}.bind(null,e)).catch(e.oe)},i={components:{Select:o},data:function(){return{val1:1,id:null,form:{},action:{}}},onLoad:function(t){this.id=t.id,this.getList()},methods:{getList:function(){var t=this;this.$http.post("operatorReport/detailBoardReport",{lineRecordId:this.id}).then((function(n){100==n.code&&(t.form=n.info)})),this.$http.post("operatorReport/detailOperationReport",{lineRecordId:this.id}).then((function(n){100==n.code&&(t.action=n.info)}))},goBack:function(){t.navigateBack({})}}};n.default=i}).call(this,e("543d")["default"])},a9bb:function(t,n,e){"use strict";e.r(n);var o=e("9b13"),i=e.n(o);for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);n["default"]=i.a},b73e:function(t,n,e){"use strict";var o,i=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return o}))},b971:function(t,n,e){"use strict";e.r(n);var o=e("b73e"),i=e("a9bb");for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);e("397f");var r,u=e("f0c5"),a=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"235d90a0",null,!1,o["a"],r);n["default"]=a.exports}},[["4599","common/runtime","common/vendor"]]]);
(function(e){function t(t){for(var r,i,s=t[0],u=t[1],c=t[2],p=0,f=[];p<s.length;p++)i=s[p],a[i]&&f.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(t);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var u=n[s];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var l=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("c21b"),a=n.n(r);a.a},"41a6":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],i={name:"app"},s=i,u=(n("034f"),n("2877")),c=Object(u["a"])(s,a,o,!1,null,null,null);c.options.__file="App.vue";var l=c.exports,p=n("5c96"),f=n.n(p);n("c69f");r["default"].use(f.a);var m=n("8c4f"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("div",{staticClass:"add-page"},[n("el-button",{attrs:{type:"primary",plain:""},on:{click:e.addPage}},[e._v("新增小程序")])],1),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,stripe:"","default-sort":{prop:"index",order:"descending"}}},[n("el-table-column",{attrs:{prop:"appid",label:"小程序id","header-align":"center"}}),n("el-table-column",{attrs:{prop:"appname",label:"小程序名称","header-align":"center"}}),n("el-table-column",{attrs:{label:"图片",width:"200","header-align":"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("img",{attrs:{src:e.row.img,alt:"",width:"180"}})]}}])}),n("el-table-column",{attrs:{prop:"index",label:"排序",width:"200","header-align":"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-input-number",{on:{change:function(n){e.indexChange(t.$index,t.row)}},model:{value:t.row.index,callback:function(n){e.$set(t.row,"index",n)},expression:"scope.row.index"}})]}}])}),n("el-table-column",{attrs:{fixed:"right",label:"上架",width:"180","header-align":"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(n){e.changeSwitch(t.row)}},model:{value:t.row.isShow,callback:function(n){e.$set(t.row,"isShow",n)},expression:"scope.row.isShow"}})]}}])}),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180","header-align":"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){e.update(t.row)}}},[e._v("编辑")]),n("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(n){e.remove(t.row)}}},[e._v("删除")])]}}])})],1)],1)},h=[],w=(n("55dd"),n("96cf"),n("3040")),b={name:"home",data:function(){return{tableData:[]}},beforeMount:function(){var e=Object(w["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.get("http://www.rrdtjj.top/mp",null);case 2:t=e.sent,this.$data.tableData=t.data.data;case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),methods:{addPage:function(){this.$store.dispatch("setProgram",{}),this.$router.push("/mp/view/add")},update:function(e){this.$store.dispatch("setProgram",e),this.$router.push("/mp/view/update")},remove:function(){var e=Object(w["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.delete("http://www.rrdtjj.top/mp/"+t._id,null);case 2:return n=e.sent,e.next=5,this.$api.get("http://www.rrdtjj.top/mp",null);case 5:n=e.sent,this.$data.tableData=n.data.data;case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),changeSwitch:function(){var e=Object(w["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.put("http://www.rrdtjj.top/mp/show/"+t._id,{isShow:t.isShow});case 2:e.sent;case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),indexChange:function(){var e=Object(w["a"])(regeneratorRuntime.mark(function e(t,n){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.put("http://www.rrdtjj.top/mp/sort/"+n._id,{index:n.index});case 2:e.sent,this.$data.tableData=this.$data.tableData.sort(this.compare);case 4:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),compare:function(e,t){return e.index<t.index?-1:e.index>t.index?1:0}}},g=b,v=Object(u["a"])(g,d,h,!1,null,null,null);v.options.__file="Home.vue";var x=v.exports,k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"item"},[n("el-form",{ref:"form",attrs:{model:e.form,"label-width":"150px"}},[n("el-form-item",{attrs:{label:"小程序id"}},[n("el-input",{model:{value:e.form.appid,callback:function(t){e.$set(e.form,"appid",t)},expression:"form.appid"}})],1),n("el-form-item",{attrs:{label:"小程序名称"}},[n("el-input",{model:{value:e.form.appname,callback:function(t){e.$set(e.form,"appname",t)},expression:"form.appname"}})],1),n("el-form-item",{attrs:{label:"是否在banner上显示"}},[n("el-switch",{model:{value:e.form.isBanner,callback:function(t){e.$set(e.form,"isBanner",t)},expression:"form.isBanner"}})],1),n("el-form-item",{attrs:{label:"上传图片"}},[n("el-upload",{attrs:{enctype:"multipart/form-data",action:"http://www.rrdtjj.top/mp/upload",name:"imageFile","on-success":e.handleAvatarSuccess}},[e.imageUrl?n("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),n("el-form-item",{attrs:{label:"小程序简介"}},[n("el-input",{attrs:{type:"textarea"},model:{value:e.form.intro,callback:function(t){e.$set(e.form,"intro",t)},expression:"form.intro"}})],1),n("el-form-item",{attrs:{label:"玩耍人数"}},[n("el-input",{model:{value:e.form.play_numbers,callback:function(t){e.$set(e.form,"play_numbers",t)},expression:"form.play_numbers"}})],1),n("el-form-item",{attrs:{label:"path 参数"}},[n("el-input",{attrs:{type:"textarea"},model:{value:e.form.path,callback:function(t){e.$set(e.form,"path",t)},expression:"form.path"}})],1),n("el-form-item",{attrs:{label:"extra 参数"}},[n("el-input",{attrs:{type:"textarea"},model:{value:e.form.extra,callback:function(t){e.$set(e.form,"extra",t)},expression:"form.extra"}})],1),n("el-form-item",[n("el-input",{attrs:{type:"hidden"},model:{value:e.form._id,callback:function(t){e.$set(e.form,"_id",t)},expression:"form._id"}})],1),n("div",{staticClass:"submit-btn"},[n("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"danger"},on:{click:e.cancel}},[e._v("取消")]),n("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:e.save}},[e._v("保存")])],1)],1)],1)},y=[],$={name:"home",data:function(){return{form:{},imageUrl:""}},beforeMount:function(){this.$data.form=this.$store.state.program,this.$data.imageUrl=this.$store.state.program.img},methods:{handleAvatarSuccess:function(e,t){this.$data.imageUrl=URL.createObjectURL(t.raw),this.$data.form.img="http://www.rrdtjj.top/uploads/"+e.filename},cancel:function(){this.$router.back(-1)},save:function(){var e=Object(w["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t="http://www.rrdtjj.top",n="put",this.$data.form._id?t+="/mp/"+this.$data.form._id:(t+="/mp/",n="post"),e.next=5,this.$api.request(n,t,this.$data.form);case 5:e.sent,this.$router.back(-1);case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}},_=$,j=(n("ca47"),Object(u["a"])(_,k,y,!1,null,null,null));j.options.__file="Item.vue";var S=j.exports;r["default"].use(m["a"]);var P=new m["a"]({mode:"history",routes:[{path:"/mp/view/",name:"home",component:x},{path:"/mp/view/add",name:"add",component:S},{path:"/mp/view/update",name:"update",component:S}]}),O=n("2f62");r["default"].use(O["a"]);var R,C=new O["a"].Store({state:{program:{}},mutations:{setProgram:function(e,t){e.program=t}},actions:{setProgram:function(e,t){e.commit("setProgram",t)}}}),T=n("bc3a"),M=n.n(T),U={},D=M.a.CancelToken;M.a.interceptors.request.use(function(e){return U[e.url]?(U[e.url]("操作取消"),U[e.url]=R):U[e.url]=R,e},function(e){return Promise.reject(e)}),M.a.interceptors.response.use(function(e){return e},function(e){if(e&&e.response)switch(e.response.status){case 400:e.message="错误请求";break;case 401:e.message="未授权，请重新登录";break;case 403:e.message="拒绝访问";break;case 404:e.message="请求错误,未找到该资源";break;case 405:e.message="请求方法未允许";break;case 408:e.message="请求超时";break;case 500:e.message="服务器端出错";break;case 501:e.message="网络未实现";break;case 502:e.message="网络错误";break;case 503:e.message="服务不可用";break;case 504:e.message="网络超时";break;case 505:e.message="http版本不支持该请求";break;default:e.message="连接错误".concat(e.response.status)}else e.message="连接到服务器失败";return message.err(e.message),Promise.resolve(e.response)}),M.a.defaults.headers={"X-Requested-With":"XMLHttpRequest"},M.a.defaults.timeout=1e4;var q={get:function(e,t){return new Promise(function(n,r){M()({method:"get",url:e,params:t,cancelToken:new D(function(e){R=e})}).then(function(e){n(e)})})},post:function(e,t){return new Promise(function(n,r){M()({method:"post",url:e,data:t,cancelToken:new D(function(e){R=e})}).then(function(e){n(e)})})},put:function(e,t){return new Promise(function(n,r){M()({method:"put",url:e,data:t,cancelToken:new D(function(e){R=e})}).then(function(e){n(e)})})},delete:function(e,t){return new Promise(function(n,r){M()({method:"delete",url:e,data:t,cancelToken:new D(function(e){R=e})}).then(function(e){n(e)})})},request:function(e,t,n){return new Promise(function(r,a){M()({method:e,url:t,data:n,cancelToken:new D(function(e){R=e})}).then(function(e){r(e)})})}};r["default"].prototype.$api=q,r["default"].config.productionTip=!1,new r["default"]({router:P,store:C,render:function(e){return e(l)}}).$mount("#app")},c21b:function(e,t,n){},c69f:function(e,t,n){},ca47:function(e,t,n){"use strict";var r=n("41a6"),a=n.n(r);a.a}});
//# sourceMappingURL=app.9af17152.js.map
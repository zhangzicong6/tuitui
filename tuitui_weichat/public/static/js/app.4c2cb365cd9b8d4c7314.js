webpackJsonp([1],{NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=s("VU/8")({name:"App"},i,!1,function(t){s("r4zD")},null,null).exports,n=s("/ocq"),l=s("NYxO");a.default.use(l.a);var c=new l.a.Store({state:{isAddSwitch:!1,isEditSwitch:!1,isUpdateLinksSwitch:!1,goodsData:{},pagesData:{pagename:"请输入单页名称",class:"请输入class"},goodsListData:{},isUpdateGoodsSwitch:!1},mutations:{changeAddSwitch:function(t,e){t.isAddSwitch=e},changeEditSwitch:function(t,e){t.isEditSwitch=e},changeUpdateLinksSwitch:function(t,e){t.isUpdateLinksSwitch=e},changeUpdateGoodsSwitch:function(t,e){t.isUpdateGoodsSwitch=e},setGoodsData:function(t,e){t.goodsData=e||{}},setPagesData:function(t,e){t.pagesData=e||{}},setGoodsListData:function(t,e){t.goodsListData=e||{}}}}),r=s("mtWM"),d=s.n(r),u={props:{str:String,method:String},data:function(){return{form:{updateAt:"",pagename:"",class:""}}},mounted:function(){this.form=c.state.pagesData},methods:{close:function(){c.commit(this.method,!1)},save:function(){var t=this,e=c.state.isAddSwitch,s=c.state.isEditSwitch;1==e&&0==s&&(this.form.pagename&&this.form.class?d()({url:"/add_page",method:"get",withCredentials:!1,params:{pagename:this.form.pagename,class:this.form.class}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),t.$emit("edit"),c.commit(t.method,!1)):t.$message.error(e.data.err)}):this.$message.error("输入有误，请重新输入")),0==e&&1==s&&(this.form.pagename&&this.form.class?d()({url:"/update_page",method:"get",withCredentials:!1,params:{id:this.row._id,pagename:this.form.pagename,class:this.form.class}}).then(function(e){e.data.success&&(t.$message({type:"success",message:e.data.success}),t.$emit("edit"),c.commit(t.method,!1))}):this.$message.error("输入有误，请重新输入"))}}},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"add"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v(t._s(t.str)+"爆款单页")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"page"},[s("el-form-item",{staticStyle:{},attrs:{rules:[{required:!0,message:"单页名称不能为空"}],label:"单页名称",prop:"pagename"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.pagename,callback:function(e){t.$set(t.form,"pagename",e)},expression:"form.pagename"}})],1),t._v(" "),s("el-form-item",{staticStyle:{},attrs:{rules:[{required:!0,message:"class不能为空"}],label:"class",prop:"class"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.class,callback:function(e){t.$set(t.form,"class",e)},expression:"form.class"}})],1)],1),t._v(" "),s("div",{staticClass:"save"},[s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.save}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var p=s("VU/8")(u,m,!1,function(t){s("Xkg3")},"data-v-75bed614",null).exports,h=s("TQvf"),f=(new(s.n(h).a)(".copyBtn"),{computed:{isUpdateSwitch:function(){return c.state.isUpdateSwitch},isAddSwitch:function(){return c.state.isAddSwitch},isEditSwitch:function(){return c.state.isEditSwitch}},components:{Page:p},data:function(){return{tableData:[],addStr:"新增",editStr:"修改",addMethod:"changeAddSwitch",editMethod:"changeEditSwitch",copyTxt:"http://www.rrdtjj.top/top10.html?class="}},mounted:function(){this.showPage()},methods:{addPage:function(){c.commit("changeAddSwitch",!0)},copy:function(){this.$message({type:"success",message:"复制成功"})},edit:function(){this.showPage()},isShow:function(t){this.isModal=t},addGoods:function(t,e){c.commit("setGoodsData",e),this.$router.push("/addLinks")},showGoods:function(t,e){c.commit("setGoodsData",e),this.$router.push("/showGoods")},editPage:function(t,e){c.commit("changeEditSwitch",!0),c.state.pagesData=e},showPage:function(){var t=this;d()({url:"/show_page",method:"get",withCredentials:!1}).then(function(e){if(e.data.success){for(var s=e.data.data,a=0;a<s.length;a++)s[a].updateAt=s[a].updateAt.substring(0,10);t.tableData=s}else t.$message.error(e.data.err)})}}}),v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("div",{staticClass:"add-page"},[s("el-button",{attrs:{type:"primary",plain:""},on:{click:t.addPage}},[t._v("新增爆款单页")])],1),t._v(" "),s("div",{staticClass:"lists"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[s("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"pagename",label:"单页名称",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"visited",width:"120",label:"浏览人数"}}),t._v(" "),s("el-table-column",{attrs:{prop:"copied",width:"120",label:"复制口令人数"}}),t._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{staticClass:"copyBtn",attrs:{size:"small",type:"success","data-clipboard-text":t.copyTxt+e.row.class},on:{click:t.copy}},[t._v("复制链接")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.addGoods(e.$index,e.row)}}},[t._v("添加商品链接")]),t._v(" "),s("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(s){t.editPage(e.$index,e.row)}}},[t._v("修改单页名称")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.showGoods(e.$index,e.row)}}},[t._v("商品信息")])]}}])})],1)],1),t._v(" "),t.isAddSwitch?s("div",{staticClass:"modal"},[s("page",{attrs:{str:t.addStr,method:t.addMethod},on:{edit:t.edit}})],1):t._e(),t._v(" "),t.isEditSwitch?s("div",{staticClass:"modal"},[s("page",{attrs:{str:t.editStr,method:t.editMethod},on:{edit:t.edit}})],1):t._e()])},staticRenderFns:[]};var g=s("VU/8")(f,v,!1,function(t){s("QD3d")},"data-v-e0e3f62a",null).exports,w={props:{row:Object},data:function(){return{form:{updateAt:"",title:"",links:""}}},mounted:function(){this.form=this.row},methods:{close:function(){c.commit("changeUpdateLinksSwitch",!1)},save:function(){var t=this;console.log(this.row),this.form.title&&this.form.links?d()({url:"/fetchlink?action=edit_links",method:"get",withCredentials:!1,params:{title:this.form.title,links:this.form.links,id:this.row._id,class:this.row.class}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),d()({url:"/top10/get_one",method:"POST",withCredentials:!1,data:{key:t.form.title,class:t.row.class,url:t.form.links}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={}}),t.$emit("edit"),c.commit("changeUpdateLinksSwitch",!1)):t.$message.error(e.data.err)}):this.$message.error("输入有误，请重新输入")}}},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v("链接修改")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"page"},[s("el-form-item",{staticStyle:{},attrs:{label:"标题",prop:"title"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{staticStyle:{},attrs:{label:"链接",prop:"links"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.links,callback:function(e){t.$set(t.form,"links",e)},expression:"form.links"}})],1)],1),t._v(" "),s("div",{staticClass:"save"},[s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.save}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var k={computed:{isUpdateLinksSwitch:function(){return c.state.isUpdateLinksSwitch}},components:{updateLinks:s("VU/8")(w,_,!1,function(t){s("O22m")},"data-v-64707d6c",null).exports},data:function(){return{row:{},form:{},linkslist:[],row1:{}}},mounted:function(){this.row=c.state.goodsData,this.form.pagename=this.row.pagename,this.showLinks()},methods:{edit:function(){this.showLinks()},addGoods:function(){var t=this,e=this.$refs.links.$refs.input.value,s=this.$refs.title.$refs.input.value;""!=e&&""!=s&&d()({url:"/fetchlink/save_links",method:"POST",withCredentials:!1,data:{links:e,class:this.row.class,title:s}}).then(function(a){a.data.success?(t.$message({type:"success",message:a.data.success}),t.showLinks(),d()({url:"/top10/get_one",method:"POST",withCredentials:!1,data:{key:s,class:t.row.class,url:e}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={}})):t.$message.error(a.data.err)})},deleteLinks:function(t,e){var s=this;d()({url:"/fetchlink?action=delete_links",method:"get",withCredentials:!1,params:{class:e.class,id:e._id}}).then(function(t){t.data.success&&(1==t.data.result.length?(s.$message({type:"success",message:"已删除最后一条数据"}),s.linkslist=[]):(s.$message({type:"success",message:t.data.success}),s.showLinks()))})},updateLink:function(t,e){this.row1=e,c.commit("changeUpdateLinksSwitch",!0)},showLinks:function(){var t=this;d()({url:"/fetchlink?action=show_links",method:"get",withCredentials:!1,params:{class:this.row.class}}).then(function(e){if(e.data.success){for(var s=e.data.data,a=0;a<s.length;a++)s[a].updateAt=s[a].updateAt.substring(0,10);t.linkslist=s}else t.$message.error(e.data.err)})},close:function(){this.$router.push("/")}}},b={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update-page"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v("添加商品")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"pagename"},[s("el-form-item",{staticStyle:{},attrs:{label:"单页名称",prop:"pagename"}},[t._v("\n                "+t._s(t.row.pagename)+"\n            ")])],1),t._v(" "),s("div",{staticClass:"goods-detail"},[s("el-form-item",{staticStyle:{float:"left"},attrs:{label:"商品名称",prop:"title"}},[s("el-input",{ref:"title",staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{staticStyle:{float:"left"},attrs:{label:"商品链接",prop:"links"}},[s("el-input",{ref:"links",staticStyle:{width:"400px"},attrs:{prop:"links"},model:{value:t.form.links,callback:function(e){t.$set(t.form,"links",e)},expression:"form.links"}})],1),t._v(" "),s("el-button",{staticStyle:{width:"100px",float:"left","margin-left":"10px"},attrs:{plain:"",type:"success"},on:{click:t.addGoods}},[t._v("添加")]),t._v(" "),s("div",{staticStyle:{clear:"both"}}),t._v(" "),s("div",{staticClass:"left"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.linkslist,border:""}},[s("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),s("el-table-column",{attrs:{prop:"links",width:"500",label:"链接"}}),t._v(" "),s("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.updateLink(e.$index,e.row)}}},[t._v("修改链接")]),t._v(" "),s("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(s){t.deleteLinks(e.$index,e.row)}}},[t._v("删除链接")])]}}])})],1)],1)],1)]),t._v(" "),t.isUpdateLinksSwitch?s("div",{staticClass:"modal"},[s("update-links",{attrs:{row:t.row1},on:{edit:t.edit}})],1):t._e()],1)},staticRenderFns:[]};var S=s("VU/8")(k,b,!1,function(t){s("URwE")},"data-v-ad4189ac",null).exports,y={data:function(){return{form:{pagename:"",title:"",token:""},imageUrl:"",pictUrl:""}},mounted:function(){this.form=c.state.goodsListData},methods:{handleAvatarSuccess:function(t,e){this.imageUrl=URL.createObjectURL(e.raw),this.pictUrl=t.filename,console.log(this.pictUrl)},cancel:function(){c.commit("changeUpdateGoodsSwitch",!1)},saveGood:function(){var t=this;d()({url:"/goodsinfo?action=update_goods",method:"get",withCredentials:!1,params:{class:this.form.class,id:this.form._id,pictUrl:"http://www.rrdtjj.top/uploads/"+this.pictUrl,title:this.form.title,token:this.form.token}}).then(function(e){e.data.success?t.$message({type:"success",message:"商品信息修改成功"}):t.$message.error(e.data.err)}),c.commit("changeUpdateGoodsSwitch",!1)}}},$={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update-goods"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"goods-desc"},[s("el-form-item",{attrs:{rules:[{required:!0}],label:"图片",prop:"imageFile"}},[s("el-upload",{attrs:{enctype:"multipart/form-data",action:"http://localhost:3000/goodsinfo/upload",name:"imageFile","on-success":t.handleAvatarSuccess}},[t.imageUrl?s("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),s("el-form-item",{attrs:{rules:[{required:!0,message:"商品名称不能为空"}],label:"商品名称",prop:"title"}},[s("el-input",{staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{attrs:{rules:[{required:!0,message:"淘口令不能为空"}],label:"淘口令",prop:"token"}},[s("el-input",{staticStyle:{width:"400px"},attrs:{prop:"token"},model:{value:t.form.token,callback:function(e){t.$set(t.form,"token",e)},expression:"form.token"}})],1),t._v(" "),s("div",{staticClass:"submit-btn"},[s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"danger"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.saveGood}},[t._v("保存")])],1)],1)])],1)},staticRenderFns:[]};var C={computed:{isUpdateGoodsSwitch:function(){return c.state.isUpdateGoodsSwitch}},components:{updateGoods:s("VU/8")(y,$,!1,function(t){s("heMt")},"data-v-b8a94cf8",null).exports},data:function(){return{row:{},goodslist:[]}},mounted:function(){this.row=c.state.goodsData,this.showInfo(this.row)},methods:{removeGoods:function(t){this.goodslist.splice(t,1)},close:function(){this.$router.push("/")},updateInfo:function(t,e){c.state.isUpdateGoodsSwitch=!0,c.commit("setGoodsListData",e)},deleteOne:function(t,e){var s=this;d()({url:"/goodsinfo?action=delete_one",method:"get",withCredentials:!1,params:{class:e.class,id:e._id}}).then(function(t){t.data.success&&(1==t.data.result.length?(s.$message({type:"success",message:"已删除最后一条数据"}),s.goodslist=[]):(s.$message({type:"success",message:t.data.success}),s.showInfo(s.row)))})},showInfo:function(t){var e=this;d()({url:"/goodsinfo?action=show_goods",method:"get",withCredentials:!1,params:{class:t.class}}).then(function(t){if(t.data.success){for(var s=t.data.data,a=0;a<s.length;a++)s[a].updateAt=s[a].updateAt.substring(0,10);e.goodslist=s}})}}},x={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update-page"},[s("el-form",{ref:"form",attrs:{"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v("商品信息展示")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"pagename"},[s("el-form-item",{staticStyle:{},attrs:{label:"单页名称",prop:"pagename"}},[t._v("\n                "+t._s(t.row.pagename)+"\n            ")])],1),t._v(" "),s("div",{staticClass:"goods-detail"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.goodslist,border:""}},[s("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),s("el-table-column",{attrs:{prop:"token",width:"150",label:"淘口令"}}),t._v(" "),s("el-table-column",{attrs:{prop:"pictUrl",width:"477",label:"图片地址"}}),t._v(" "),s("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.updateInfo(e.$index,e.row)}}},[t._v("修改商品信息")]),t._v(" "),s("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(s){t.deleteOne(e.$index,e.row)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),t.isUpdateGoodsSwitch?s("div",{staticClass:"goods-update"},[s("update-goods")],1):t._e()])],1)},staticRenderFns:[]};var U=s("VU/8")(C,x,!1,function(t){s("jSvE")},"data-v-9d13bd32",null).exports;a.default.use(n.a);var L=new n.a({mode:"history",routes:[{path:"/",component:g,meta:{title:"首页"}},{path:"/addLinks",component:S,meta:{title:"添加商品链接"}},{path:"/showGoods",component:U,meta:{title:"详细商品信息"}}]}),G=s("zL8q"),A=s.n(G);s("tvR6");d.a.defaults.withCredentials=!0,a.default.config.productionTip=!1,a.default.use(A.a),new a.default({el:"#app",router:L,components:{App:o},template:"<App/>"})},O22m:function(t,e){},QD3d:function(t,e){},URwE:function(t,e){},Xkg3:function(t,e){},heMt:function(t,e){},jSvE:function(t,e){},r4zD:function(t,e){},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.4c2cb365cd9b8d4c7314.js.map
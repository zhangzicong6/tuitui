webpackJsonp([1],{"47Mu":function(t,e){},N6Cc:function(t,e){},NGzF:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=a("VU/8")({name:"App"},i,!1,function(t){a("r4zD")},null,null).exports,n=a("/ocq"),l=a("NYxO");s.default.use(l.a);var r=new l.a.Store({state:{isAddSwitch:!1,isEditSwitch:!1,isUpdateLinksSwitch:!1,goodsData:{},pagesData:{pagename:"请输入单页名称",class:"请输入class"},goodsListData:{},isUpdateGoodsSwitch:!1},mutations:{changeAddSwitch:function(t,e){t.isAddSwitch=e},changeEditSwitch:function(t,e){t.isEditSwitch=e},changeUpdateLinksSwitch:function(t,e){t.isUpdateLinksSwitch=e},changeUpdateGoodsSwitch:function(t,e){t.isUpdateGoodsSwitch=e},setGoodsData:function(t,e){t.goodsData=e||{}},setPagesData:function(t,e){t.pagesData=e||{}},setGoodsListData:function(t,e){t.goodsListData=e||{}}}}),c=a("mtWM"),d=a.n(c),u={props:{str:String,method:String,classSwitch:Boolean},data:function(){return{form:{updateAt:"",pagename:"",class:""},classShow:!0}},mounted:function(){this.form=r.state.pagesData,this.classShow=this.classSwitch},methods:{close:function(){r.commit(this.method,!1)},save:function(){var t=this,e=r.state.isAddSwitch,a=r.state.isEditSwitch;1==e&&0==a&&(this.form.pagename&&this.form.class?d()({url:"/add_page",method:"get",withCredentials:!1,params:{pagename:this.form.pagename,class:this.form.class}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),t.$emit("edit"),r.commit(t.method,!1)):t.$message.error(e.data.err)}):this.$message.error("输入有误，请重新输入")),0==e&&1==a&&(this.form.pagename&&this.form.class?d()({url:"/update_page",method:"get",withCredentials:!1,params:{id:this.form._id,pagename:this.form.pagename,class:this.form.class}}).then(function(e){e.data.success&&(t.$message({type:"success",message:e.data.success}),t.$emit("edit"),r.commit(t.method,!1),console.log(t.method))}):this.$message.error("输入有误，请重新输入"))}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"add"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("div",{staticClass:"header"},[a("h3",[t._v(t._s(t.str)+"爆款单页")]),t._v(" "),a("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),a("div",{staticClass:"page"},[a("el-form-item",{staticStyle:{},attrs:{rules:[{required:!0,message:"单页名称不能为空"}],label:"单页名称",prop:"pagename"}},[a("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.pagename,callback:function(e){t.$set(t.form,"pagename",e)},expression:"form.pagename"}})],1),t._v(" "),a("el-form-item",{staticStyle:{},attrs:{rules:[{required:!0,message:"class不能为空"}],label:"class",prop:"class"}},[a("el-input",{staticStyle:{width:"300px",float:"none"},attrs:{disabled:!t.classShow},model:{value:t.form.class,callback:function(e){t.$set(t.form,"class",e)},expression:"form.class"}})],1),t._v(" "),t.classShow?a("span",{staticClass:"tip"},[t._v("————class请谨慎填写，不能修改————")]):t._e()],1),t._v(" "),a("div",{staticClass:"save"},[a("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.save}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var p=a("VU/8")(u,m,!1,function(t){a("NXHp")},"data-v-3ff5ed54",null).exports,f=a("TQvf"),h=a.n(f),v=(new h.a(".copyBtn"),{computed:{isUpdateSwitch:function(){return r.state.isUpdateSwitch},isAddSwitch:function(){return r.state.isAddSwitch},isEditSwitch:function(){return r.state.isEditSwitch}},components:{Page:p},data:function(){return{activeIndex:"1",tableData:[],addStr:"新增",editStr:"修改",addMethod:"changeAddSwitch",editMethod:"changeEditSwitch",copyTxt:"http://www.rrdtjj.top/top10.html?class=",classSwitch1:!0,classSwitch2:!1}},mounted:function(){this.showPage()},methods:{addPage:function(){r.commit("changeAddSwitch",!0)},copy:function(){this.$message({type:"success",message:"复制成功"})},edit:function(){this.showPage()},isShow:function(t){this.isModal=t},addGoods:function(t,e){r.commit("setGoodsData",e);var a=e.class,s=e.pagename,i=new Date;i.setTime(i.getTime()+864e5),window.document.cookie="classname="+a+";path=/;expires="+i.toGMTString(),window.document.cookie="pagename="+s+";path=/;expires="+i.toGMTString(),this.$router.push("/baokuan/addLinks")},showGoods:function(t,e){r.commit("setGoodsData",e);var a=e.class,s=e.pagename,i=new Date;i.setTime(i.getTime()+864e5),window.document.cookie="classname="+a+";path=/;expires="+i.toGMTString(),window.document.cookie="pagename="+s+";path=/;expires="+i.toGMTString(),this.$router.push("/baokuan/showGoods")},editPage:function(t,e){r.commit("changeEditSwitch",!0),r.state.pagesData=e},showPage:function(){var t=this;d()({url:"/show_page",method:"get",withCredentials:!1}).then(function(e){if(e.data.success){for(var a=e.data.data,s=0;s<a.length;s++)a[s].updateAt=a[s].updateAt.substring(0,10);t.tableData=a}else t.$message.error(e.data.err)})}}}),g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"baokuan"},[a("div",{staticClass:"add-page"},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:t.addPage}},[t._v("新增爆款单页")])],1),t._v(" "),a("div",{staticClass:"lists"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pagename",label:"单页名称",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"visited",width:"120",label:"浏览人数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"copied",width:"120",label:"复制口令人数"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"copyBtn",attrs:{size:"small",type:"success","data-clipboard-text":t.copyTxt+e.row.class},on:{click:t.copy}},[t._v("复制链接")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){t.addGoods(e.$index,e.row)}}},[t._v("添加商品链接")]),t._v(" "),a("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(a){t.editPage(e.$index,e.row)}}},[t._v("修改单页名称")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){t.showGoods(e.$index,e.row)}}},[t._v("商品信息")])]}}])})],1)],1),t._v(" "),t.isAddSwitch?a("div",{staticClass:"modal"},[a("page",{attrs:{str:t.addStr,method:t.addMethod,classSwitch:t.classSwitch1},on:{edit:t.edit}})],1):t._e(),t._v(" "),t.isEditSwitch?a("div",{staticClass:"modal"},[a("page",{attrs:{str:t.editStr,method:t.editMethod,classSwitch:t.classSwitch2},on:{edit:t.edit}})],1):t._e()])},staticRenderFns:[]};var w=a("VU/8")(v,g,!1,function(t){a("xtgp")},"data-v-a45bacb8",null).exports,_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"add-message"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"name",label:"二维码名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"content",label:"关注后回复内容"}}),t._v(" "),a("el-table-column",{attrs:{prop:"gonghao",label:"公号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"qr_code_url",label:"二维码"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{attrs:{src:t.qr_code_url}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.update(e.row)}}},[t._v("修改")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){delete e.row}}},[t._v("删除")])]}}])})],1),t._v(" "),a("el-form",{attrs:{"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"二维码名称",prop:"name"}},[a("el-input",{staticStyle:{width:"100px"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"关注回复内容",prop:"content"}},[a("el-input",{staticStyle:{width:"500px"},attrs:{type:"textarea"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"选择公号",prop:"gonghao"}},[a("el-checkbox-group",{model:{value:t.gonghao,callback:function(e){t.gonghao=e},expression:"gonghao"}},t._l(t.gonghaoList,function(e,s){return a("el-checkbox",{key:s,attrs:{label:e.gonghao,name:"codes"}},[t._v(t._s(e.name))])}))],1),t._v(" "),a("el-form-item",{attrs:{size:"large"}},[a("el-button",{attrs:{type:"primary"},on:{click:t.create}},[t._v("立即生成")])],1),t._v(" "),a("el-form-item",{attrs:{label:"二维码图片"}},[a("img",{attrs:{src:t.qr_code_url}})])],1)],1)},staticRenderFns:[]};var b=a("VU/8")({data:function(){return{name:"",content:"",gonghao:"",qr_code_url:"",gonghaoList:[]}},mounted:function(){},methods:{create:function(){},getGonghaoList:function(){}}},_,!1,function(t){a("bG58")},"data-v-d746f10e",null).exports,k=(new h.a(".copyBtn"),{data:function(){return{form:{},imgUrl:"",dialogVisible:!1,links:"",items:[]}},mounted:function(){this.getId()},methods:{handleAvatarSuccess:function(t,e){this.imgUrl="http://test.oorggt.top/images/tuiguang/"+t.filename,this.form.avator=this.imgUrl},create:function(){var t=this;d()({url:"/tuiguang/novel/add",method:"post",withCredentials:!0,data:{id:this.form.id,title:this.form.title,headline:this.form.headline,gonghao:this.form.gonghao,author:this.form.author,avator:this.form.avator,content:this.form.content,linkUrl:this.form.linkUrl,statisticsUrl:this.form.statisticsUrl}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.dialogVisible=!0,t.links=e.data.links,t.items.push(t.form),t.form={},t.imgUrl=""})},reset:function(){this.form={}},deleteOne:function(){var t=this;d()({url:"/tuiguang/novel/delete_one",method:"post",data:{id:this.form.deleteId}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form.deleteId=""})},copy:function(){this.$message({type:"success",message:"复制成功"}),this.dialogVisible=!1},handleClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})},getId:function(){var t=this;d()({url:"/tuiguang/novel/show_id",method:"get"}).then(function(e){t.items=e.data.data})}}}),S={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"novel-link"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"已有id"}},t._l(t.items,function(e){return a("span",{key:e},[t._v(" -- "+t._s(e.id)+" ")])})),t._v(" "),a("el-form-item",{attrs:{label:"id"}},[a("el-input",{staticStyle:{width:"100px"},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"页面标题"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"文章标题"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.headline,callback:function(e){t.$set(t.form,"headline",e)},expression:"form.headline"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公号名称"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.gonghao,callback:function(e){t.$set(t.form,"gonghao",e)},expression:"form.gonghao"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公号描述"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.author,callback:function(e){t.$set(t.form,"author",e)},expression:"form.author"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"图片",prop:"imageFile"}},[a("el-upload",{attrs:{"show-file-list":!1,enctype:"multipart/form-data",name:"imageFile",action:"http://test.oorggt.top/tuiguang/novel/upload","on-success":t.handleAvatarSuccess}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),t.imgUrl?a("img",{attrs:{src:t.imgUrl,alt:"",width:"200"}}):t._e()],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"文章内容",prop:"content"}},[a("el-input",{staticStyle:{width:"500px"},attrs:{type:"textarea"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"跳转链接"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.linkUrl,callback:function(e){t.$set(t.form,"linkUrl",e)},expression:"form.linkUrl"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"统计链接"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.statisticsUrl,callback:function(e){t.$set(t.form,"statisticsUrl",e)},expression:"form.statisticsUrl"}})],1),t._v(" "),a("el-form-item",{attrs:{size:"large"}},[a("el-button",{attrs:{type:"primary"},on:{click:t.create}},[t._v("立即创建")]),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:t.reset}},[t._v("重置")])],1),t._v(" "),a("el-form-item",{attrs:{label:"删除id"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.deleteId,callback:function(e){t.$set(t.form,"deleteId",e)},expression:"form.deleteId"}})],1),t._v(" "),a("el-form-item",{attrs:{size:"large"}},[a("el-button",{attrs:{type:"danger"},on:{click:t.deleteOne}},[t._v("立即删除")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",[t._v(t._s(t.links))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{staticClass:"copyBtn",attrs:{"data-clipboard-text":t.links,type:"primary"},on:{click:t.copy}},[t._v("复制链接")])],1)])],1)},staticRenderFns:[]};var y={components:{baokuan:w,qrCode:b,novelLink:a("VU/8")(k,S,!1,function(t){a("d+uL")},"data-v-5f363e3f",null).exports},data:function(){return{activeIndex:"1"}},mounted:function(){},methods:{aaa:function(t,e){this.activeIndex=t}}},x={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("el-menu",{attrs:{"default-active":t.activeIndex,mode:"horizontal"},on:{select:t.aaa}},[a("el-menu-item",{attrs:{index:"1"}},[t._v("爆款单页")]),t._v(" "),a("el-menu-item",{attrs:{index:"3"}},[t._v("小说链接")])],1),t._v(" "),a("div",{staticClass:"wrapper"},["1"==t.activeIndex?a("baokuan"):t._e(),t._v(" "),"3"==t.activeIndex?a("novel-link"):t._e()],1)],1)},staticRenderFns:[]};var $=a("VU/8")(y,x,!1,function(t){a("N6Cc")},"data-v-d5f5fb7a",null).exports,C={props:{row:Object},data:function(){return{form:{updateAt:"",title:"",links:""}}},mounted:function(){this.form=this.row},methods:{close:function(){r.commit("changeUpdateLinksSwitch",!1)},save:function(){var t=this;console.log(this.row),this.form.title&&this.form.links?d()({url:"/fetchlink?action=edit_links",method:"get",withCredentials:!1,params:{title:this.form.title,links:this.form.links,id:this.row._id,class:this.row.class}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),d()({url:"/top10/get_one",method:"POST",withCredentials:!1,data:{key:t.form.title,class:t.row.class,url:t.form.links}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={}}),t.$emit("edit"),r.commit("changeUpdateLinksSwitch",!1)):t.$message.error(e.data.err)}):this.$message.error("输入有误，请重新输入")}}},U={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"update"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("div",{staticClass:"header"},[a("h3",[t._v("链接修改")]),t._v(" "),a("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),a("div",{staticClass:"page"},[a("el-form-item",{staticStyle:{},attrs:{label:"标题",prop:"title"}},[a("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{staticStyle:{},attrs:{label:"链接",prop:"links"}},[a("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.links,callback:function(e){t.$set(t.form,"links",e)},expression:"form.links"}})],1)],1),t._v(" "),a("div",{staticClass:"save"},[a("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.save}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var G=a("VU/8")(C,U,!1,function(t){a("tTXE")},"data-v-0b49c57c",null).exports;window.onbeforeunload=function(){window.location.href="/"};var L={computed:{isUpdateLinksSwitch:function(){return r.state.isUpdateLinksSwitch}},components:{updateLinks:G},data:function(){return{row:{},form:{},linkslist:[],row1:{}}},mounted:function(){function t(t){for(var e=window.document.cookie.split("; "),a=0;a<e.length;a++){var s=e[a].split("=");if(t==s[0])return unescape(s[1])}return null}this.row=r.state.goodsData,this.form.pagename=this.row.pagename;var e=t("classname"),a=t("pagename");this.row.class=e,this.row.pagename=a,this.showLinks()},methods:{edit:function(){this.showLinks()},addGoods:function(){var t=this,e=this.$refs.links.$refs.input.value,a=this.$refs.title.$refs.input.value;""!=e&&""!=a&&d()({url:"/fetchlink/save_links",method:"POST",withCredentials:!1,data:{links:e,class:this.row.class,title:a}}).then(function(s){s.data.success?(t.$message({type:"success",message:s.data.success}),t.showLinks(),d()({url:"/top10/get_one",method:"POST",withCredentials:!1,data:{key:a,class:t.row.class,url:e}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={}})):t.$message.error(s.data.err)})},deleteLinks:function(t,e){var a=this;d()({url:"/fetchlink?action=delete_links",method:"get",withCredentials:!1,params:{class:e.class,id:e._id}}).then(function(t){t.data.success&&(1==t.data.result.length?(a.$message({type:"success",message:"已删除最后一条数据"}),a.linkslist=[]):(a.$message({type:"success",message:t.data.success}),a.showLinks()))})},updateLink:function(t,e){this.row1=e,r.commit("changeUpdateLinksSwitch",!0)},showLinks:function(){var t=this;d()({url:"/fetchlink?action=show_links",method:"get",withCredentials:!1,params:{class:this.row.class}}).then(function(e){if(e.data.success){for(var a=e.data.data,s=0;s<a.length;s++)a[s].updateAt=a[s].updateAt.substring(0,10);t.linkslist=a}else t.$message.error(e.data.err)})},close:function(){this.$router.push("/baokuan")}}},A={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"update-page"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("div",{staticClass:"header"},[a("h3",[t._v("添加商品")]),t._v(" "),a("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),a("div",{staticClass:"pagename"},[a("el-form-item",{staticStyle:{},attrs:{label:"单页名称",prop:"pagename"}},[t._v("\n                "+t._s(t.row.pagename)+"\n            ")])],1),t._v(" "),a("div",{staticClass:"goods-detail"},[a("el-form-item",{staticStyle:{float:"left"},attrs:{label:"商品名称",prop:"title"}},[a("el-input",{ref:"title",staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{staticStyle:{float:"left"},attrs:{label:"商品链接",prop:"links"}},[a("el-input",{ref:"links",staticStyle:{width:"400px"},attrs:{prop:"links"},model:{value:t.form.links,callback:function(e){t.$set(t.form,"links",e)},expression:"form.links"}})],1),t._v(" "),a("el-button",{staticStyle:{width:"100px",float:"left","margin-left":"10px"},attrs:{plain:"",type:"success"},on:{click:t.addGoods}},[t._v("添加")]),t._v(" "),a("div",{staticStyle:{clear:"both"}}),t._v(" "),a("div",{staticClass:"left"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.linkslist,border:""}},[a("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"links",width:"500",label:"链接"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){t.updateLink(e.$index,e.row)}}},[t._v("修改链接")]),t._v(" "),a("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(a){t.deleteLinks(e.$index,e.row)}}},[t._v("删除链接")])]}}])})],1)],1)],1)]),t._v(" "),t.isUpdateLinksSwitch?a("div",{staticClass:"modal"},[a("update-links",{attrs:{row:t.row1},on:{edit:t.edit}})],1):t._e()],1)},staticRenderFns:[]};var D=a("VU/8")(L,A,!1,function(t){a("tk+/")},"data-v-7dcb6580",null).exports,z={data:function(){return{form:{pagename:"",title:"",token:""},imageUrl:"",pictUrl:""}},mounted:function(){this.form=r.state.goodsListData},methods:{handleAvatarSuccess:function(t,e){this.imageUrl=URL.createObjectURL(e.raw),this.pictUrl=t.filename},cancel:function(){r.commit("changeUpdateGoodsSwitch",!1)},saveGood:function(){var t=this;""==this.pictUrl&&(this.pictUrl=this.form.pictUrl),d()({url:"/goodsinfo?action=update_goods",method:"get",withCredentials:!1,params:{class:this.form.class,id:this.form._id,pictUrl:"/uploads/"+this.pictUrl,title:this.form.title,token:this.form.token}}).then(function(e){e.data.success?(t.$message({type:"success",message:"商品信息修改成功"}),t.$emit("edit"),r.commit("changeUpdateGoodsSwitch",!1)):t.$message.error(e.data.err)})}}},E={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"update-goods"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("div",{staticClass:"goods-desc"},[a("el-form-item",{attrs:{rules:[{required:!0}],label:"图片",prop:"imageFile"}},[a("el-upload",{attrs:{enctype:"multipart/form-data",action:"http://www.rrdtjj.top/goodsinfo/upload",name:"imageFile","on-success":t.handleAvatarSuccess}},[t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),a("el-form-item",{attrs:{rules:[{required:!0,message:"商品名称不能为空"}],label:"商品名称",prop:"title"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{attrs:{rules:[{required:!0,message:"淘口令不能为空"}],label:"淘口令",prop:"token"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{prop:"token"},model:{value:t.form.token,callback:function(e){t.$set(t.form,"token",e)},expression:"form.token"}})],1),t._v(" "),a("div",{staticClass:"submit-btn"},[a("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"danger"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),a("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.saveGood}},[t._v("保存")])],1)],1)])],1)},staticRenderFns:[]};var I=a("VU/8")(z,E,!1,function(t){a("NGzF")},"data-v-39c765d4",null).exports;window.onbeforeunload=function(){window.location.href="/"};var T={computed:{isUpdateGoodsSwitch:function(){return r.state.isUpdateGoodsSwitch}},components:{updateGoods:I},data:function(){return{row:{},goodslist:[]}},mounted:function(){function t(t){for(var e=window.document.cookie.split("; "),a=0;a<e.length;a++){var s=e[a].split("=");if(t==s[0])return unescape(s[1])}return null}this.row=r.state.goodsData;var e=t("classname"),a=t("pagename");this.row.class=e,this.row.pagename=a,this.showInfo(this.row)},methods:{removeGoods:function(t){this.goodslist.splice(t,1)},edit:function(){this.showInfo(this.row),console.log(this.row)},close:function(){this.$router.push("/baokuan")},updateInfo:function(t,e){r.state.isUpdateGoodsSwitch=!0,r.commit("setGoodsListData",e)},deleteOne:function(t,e){var a=this;d()({url:"/goodsinfo?action=delete_one",method:"get",withCredentials:!1,params:{class:e.class,id:e._id}}).then(function(t){t.data.success&&(console.log(t.data),1==t.data.result.length?(a.$message({type:"success",message:"已删除最后一条数据"}),a.goodslist=[]):(a.$message({type:"success",message:t.data.success}),a.showInfo(a.row)))})},showInfo:function(t){var e=this;d()({url:"/goodsinfo?action=show_goods",method:"get",withCredentials:!1,params:{class:t.class}}).then(function(t){if(t.data.success){for(var a=t.data.data,s=0;s<a.length;s++)a[s].updateAt=a[s].updateAt.substring(0,10);e.goodslist=a}else e.$message.error(t.data.err)})}}},F={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"update-page"},[a("el-form",{ref:"form",attrs:{"label-width":"80px"}},[a("div",{staticClass:"header"},[a("h3",[t._v("商品信息展示")]),t._v(" "),a("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),a("div",{staticClass:"pagename"},[a("el-form-item",{staticStyle:{},attrs:{label:"单页名称",prop:"pagename"}},[t._v("\n                "+t._s(t.row.pagename)+"\n            ")])],1),t._v(" "),a("div",{staticClass:"goods-detail"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.goodslist,border:""}},[a("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"token",width:"150",label:"淘口令"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pictUrl",width:"477",label:"图片地址"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){t.updateInfo(e.$index,e.row)}}},[t._v("修改商品信息")]),t._v(" "),a("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(a){t.deleteOne(e.$index,e.row)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),t.isUpdateGoodsSwitch?a("div",{staticClass:"goods-update"},[a("update-goods",{on:{edit:t.edit}})],1):t._e()])],1)},staticRenderFns:[]};var V=a("VU/8")(T,F,!1,function(t){a("47Mu")},"data-v-b89526d2",null).exports;s.default.use(n.a);var R=new n.a({mode:"history",routes:[{path:"/baokuan",component:$,meta:{title:"首页"}},{path:"/baokuan/addLinks",component:D,meta:{title:"添加商品链接"}},{path:"/baokuan/showGoods",component:V,meta:{title:"详细商品信息"}}]}),M=a("zL8q"),P=a.n(M);a("tvR6");d.a.defaults.withCredentials=!0,s.default.config.productionTip=!1,s.default.use(P.a),new s.default({el:"#app",router:R,components:{App:o},template:"<App/>"})},NXHp:function(t,e){},bG58:function(t,e){},"d+uL":function(t,e){},r4zD:function(t,e){},tTXE:function(t,e){},"tk+/":function(t,e){},tvR6:function(t,e){},xtgp:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.186fdc94bcbc77699abf.js.map
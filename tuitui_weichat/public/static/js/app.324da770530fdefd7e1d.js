webpackJsonp([1],{"3hmV":function(t,e){},"47Mu":function(t,e){},N6Cc:function(t,e){},NGzF:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=s("VU/8")({name:"App"},i,!1,function(t){s("r4zD")},null,null).exports,l=s("/ocq"),n=s("NYxO");a.default.use(n.a);var r=new n.a.Store({state:{isAddSwitch:!1,isEditSwitch:!1,isUpdateLinksSwitch:!1,goodsData:{},pagesData:{pagename:"请输入单页名称",class:"请输入class"},goodsListData:{},isUpdateGoodsSwitch:!1},mutations:{changeAddSwitch:function(t,e){t.isAddSwitch=e},changeEditSwitch:function(t,e){t.isEditSwitch=e},changeUpdateLinksSwitch:function(t,e){t.isUpdateLinksSwitch=e},changeUpdateGoodsSwitch:function(t,e){t.isUpdateGoodsSwitch=e},setGoodsData:function(t,e){t.goodsData=e||{}},setPagesData:function(t,e){t.pagesData=e||{}},setGoodsListData:function(t,e){t.goodsListData=e||{}}}}),c=s("mtWM"),d=s.n(c),m={props:{str:String,method:String,classSwitch:Boolean},data:function(){return{form:{updateAt:"",pagename:"",class:""},classShow:!0}},mounted:function(){this.form=r.state.pagesData,this.classShow=this.classSwitch},methods:{close:function(){r.commit(this.method,!1)},save:function(){var t=this,e=r.state.isAddSwitch,s=r.state.isEditSwitch;1==e&&0==s&&(this.form.pagename&&this.form.class?d()({url:"/add_page",method:"get",withCredentials:!1,params:{pagename:this.form.pagename,class:this.form.class}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),t.$emit("edit"),r.commit(t.method,!1)):t.$message.error(e.data.err)}):this.$message.error("输入有误，请重新输入")),0==e&&1==s&&(this.form.pagename&&this.form.class?d()({url:"/update_page",method:"get",withCredentials:!1,params:{id:this.form._id,pagename:this.form.pagename,class:this.form.class}}).then(function(e){e.data.success&&(t.$message({type:"success",message:e.data.success}),t.$emit("edit"),r.commit(t.method,!1),console.log(t.method))}):this.$message.error("输入有误，请重新输入"))}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"add"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v(t._s(t.str)+"爆款单页")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"page"},[s("el-form-item",{staticStyle:{},attrs:{rules:[{required:!0,message:"单页名称不能为空"}],label:"单页名称",prop:"pagename"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.pagename,callback:function(e){t.$set(t.form,"pagename",e)},expression:"form.pagename"}})],1),t._v(" "),s("el-form-item",{staticStyle:{},attrs:{rules:[{required:!0,message:"class不能为空"}],label:"class",prop:"class"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},attrs:{disabled:!t.classShow},model:{value:t.form.class,callback:function(e){t.$set(t.form,"class",e)},expression:"form.class"}})],1),t._v(" "),t.classShow?s("span",{staticClass:"tip"},[t._v("————class请谨慎填写，不能修改————")]):t._e()],1),t._v(" "),s("div",{staticClass:"save"},[s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.save}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var p=s("VU/8")(m,u,!1,function(t){s("NXHp")},"data-v-3ff5ed54",null).exports,f=s("TQvf"),h=s.n(f),v=(new h.a(".copyBtn"),{computed:{isUpdateSwitch:function(){return r.state.isUpdateSwitch},isAddSwitch:function(){return r.state.isAddSwitch},isEditSwitch:function(){return r.state.isEditSwitch}},components:{Page:p},data:function(){return{activeIndex:"1",tableData:[],addStr:"新增",editStr:"修改",addMethod:"changeAddSwitch",editMethod:"changeEditSwitch",copyTxt:"http://www.rrdtjj.top/top10.html?class=",classSwitch1:!0,classSwitch2:!1}},mounted:function(){this.showPage()},methods:{addPage:function(){r.commit("changeAddSwitch",!0)},copy:function(){this.$message({type:"success",message:"复制成功"})},edit:function(){this.showPage()},isShow:function(t){this.isModal=t},addGoods:function(t,e){r.commit("setGoodsData",e);var s=e.class,a=e.pagename,i=new Date;i.setTime(i.getTime()+864e5),window.document.cookie="classname="+s+";path=/;expires="+i.toGMTString(),window.document.cookie="pagename="+a+";path=/;expires="+i.toGMTString(),this.$router.push("/baokuan/addLinks")},showGoods:function(t,e){r.commit("setGoodsData",e);var s=e.class,a=e.pagename,i=new Date;i.setTime(i.getTime()+864e5),window.document.cookie="classname="+s+";path=/;expires="+i.toGMTString(),window.document.cookie="pagename="+a+";path=/;expires="+i.toGMTString(),this.$router.push("/baokuan/showGoods")},editPage:function(t,e){r.commit("changeEditSwitch",!0),r.state.pagesData=e},showPage:function(){var t=this;d()({url:"/show_page",method:"get",withCredentials:!1}).then(function(e){if(e.data.success){for(var s=e.data.data,a=0;a<s.length;a++)s[a].updateAt=s[a].updateAt.substring(0,10);t.tableData=s}else t.$message.error(e.data.err)})}}}),g={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"baokuan"},[s("div",{staticClass:"add-page"},[s("el-button",{attrs:{type:"primary",plain:""},on:{click:t.addPage}},[t._v("新增爆款单页")])],1),t._v(" "),s("div",{staticClass:"lists"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[s("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"pagename",label:"单页名称",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"visited",width:"120",label:"浏览人数"}}),t._v(" "),s("el-table-column",{attrs:{prop:"copied",width:"120",label:"复制口令人数"}}),t._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{staticClass:"copyBtn",attrs:{size:"small",type:"success","data-clipboard-text":t.copyTxt+e.row.class},on:{click:t.copy}},[t._v("复制链接")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.addGoods(e.$index,e.row)}}},[t._v("添加商品链接")]),t._v(" "),s("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(s){t.editPage(e.$index,e.row)}}},[t._v("修改单页名称")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.showGoods(e.$index,e.row)}}},[t._v("商品信息")])]}}])})],1)],1),t._v(" "),t.isAddSwitch?s("div",{staticClass:"modal"},[s("page",{attrs:{str:t.addStr,method:t.addMethod,classSwitch:t.classSwitch1},on:{edit:t.edit}})],1):t._e(),t._v(" "),t.isEditSwitch?s("div",{staticClass:"modal"},[s("page",{attrs:{str:t.editStr,method:t.editMethod,classSwitch:t.classSwitch2},on:{edit:t.edit}})],1):t._e()])},staticRenderFns:[]};var w=s("VU/8")(v,g,!1,function(t){s("xtgp")},"data-v-a45bacb8",null).exports,_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"novel-link"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",size:"mini"}},[s("el-form-item",{attrs:{label:"id"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"页面标题"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"文章标题"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.headline,callback:function(e){t.$set(t.form,"headline",e)},expression:"form.headline"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"公号名称"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.gonghao,callback:function(e){t.$set(t.form,"gonghao",e)},expression:"form.gonghao"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"公号描述"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.author,callback:function(e){t.$set(t.form,"author",e)},expression:"form.author"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"图片",prop:"imageFile"}},[s("el-upload",{attrs:{"show-file-list":!1,enctype:"multipart/form-data",name:"imageFile",action:"http://crm.rrdtjj.top/message/upload","on-success":t.handleAvatarSuccess}},[s("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),t.imgUrl?s("img",{attrs:{src:t.imgUrl,alt:"",width:"200"}}):t._e()],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"文章内容",prop:"content"}},[s("el-input",{staticStyle:{width:"500px"},attrs:{type:"textarea"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"跳转链接"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.linkUrl,callback:function(e){t.$set(t.form,"linkUrl",e)},expression:"form.linkUrl"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"统计链接"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.statisticsUrl,callback:function(e){t.$set(t.form,"statisticsUrl",e)},expression:"form.statisticsUrl"}})],1),t._v(" "),s("el-form-item",{attrs:{size:"large"}},[s("el-button",{attrs:{type:"primary"},on:{click:t.onCreate}},[t._v("立即创建")]),t._v(" "),s("el-button",{attrs:{type:"danger"},on:{click:t.reset}},[t._v("重置")])],1)],1)],1)},staticRenderFns:[]};var b=s("VU/8")({data:function(){return{}},mounted:function(){},methods:{}},_,!1,function(t){s("ycTe")},"data-v-4c090cb7",null).exports,k=(new h.a(".copyBtn"),{data:function(){return{form:{},imgUrl:"",dialogVisible:!1,links:""}},methods:{handleAvatarSuccess:function(t,e){this.imgUrl="http://www.rrdtjj.top/images/tuiguang/"+t.filename,this.form.avator=this.imgUrl},create:function(){var t=this;d()({url:"/tuiguang/novel/add",method:"post",withCredentials:!0,data:{id:this.form.id,title:this.form.title,headline:this.form.headline,gonghao:this.form.gonghao,author:this.form.author,avator:this.form.avator,content:this.form.content,linkUrl:this.form.linkUrl,statisticsUrl:this.form.statisticsUrl}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.dialogVisible=!0,t.links=e.data.links,t.form={}})},reset:function(){this.form={}},deleteOne:function(){var t=this;d()({url:"/tuiguang/novel/delete_one",method:"post",data:{id:this.form.deleteId}}).then(function(e){t.$message({type:"success",message:e.data.message})})},copy:function(){this.$message({type:"success",message:"复制成功"}),this.dialogVisible=!1},handleClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})}}}),S={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"novel-link"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",size:"mini"}},[s("el-form-item",{attrs:{label:"id"}},[s("el-input",{staticStyle:{width:"100px"},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"页面标题"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"文章标题"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.headline,callback:function(e){t.$set(t.form,"headline",e)},expression:"form.headline"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"公号名称"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.gonghao,callback:function(e){t.$set(t.form,"gonghao",e)},expression:"form.gonghao"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"公号描述"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.author,callback:function(e){t.$set(t.form,"author",e)},expression:"form.author"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"图片",prop:"imageFile"}},[s("el-upload",{attrs:{"show-file-list":!1,enctype:"multipart/form-data",name:"imageFile",action:"http://www.rrdtjj.top/tuiguang/novel/upload","on-success":t.handleAvatarSuccess}},[s("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),t.imgUrl?s("img",{attrs:{src:t.imgUrl,alt:"",width:"200"}}):t._e()],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"文章内容",prop:"content"}},[s("el-input",{staticStyle:{width:"500px"},attrs:{type:"textarea"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"跳转链接"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.linkUrl,callback:function(e){t.$set(t.form,"linkUrl",e)},expression:"form.linkUrl"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"统计链接"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.statisticsUrl,callback:function(e){t.$set(t.form,"statisticsUrl",e)},expression:"form.statisticsUrl"}})],1),t._v(" "),s("el-form-item",{attrs:{size:"large"}},[s("el-button",{attrs:{type:"primary"},on:{click:t.create}},[t._v("立即创建")]),t._v(" "),s("el-button",{attrs:{type:"danger"},on:{click:t.reset}},[t._v("重置")])],1),t._v(" "),s("el-form-item",{attrs:{label:"删除id"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.deleteId,callback:function(e){t.$set(t.form,"deleteId",e)},expression:"form.deleteId"}})],1),t._v(" "),s("el-form-item",{attrs:{size:"large"}},[s("el-button",{attrs:{type:"danger"},on:{click:t.deleteOne}},[t._v("立即删除")])],1)],1),t._v(" "),s("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[s("span",[t._v(t._s(t.links))]),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{staticClass:"copyBtn",attrs:{"data-clipboard-text":t.links,type:"primary"},on:{click:t.copy}},[t._v("复制链接")])],1)])],1)},staticRenderFns:[]};var y={components:{baokuan:w,qrCode:b,novelLink:s("VU/8")(k,S,!1,function(t){s("3hmV")},"data-v-1ec1fc1d",null).exports},data:function(){return{activeIndex:"1"}},mounted:function(){},methods:{aaa:function(t,e){this.activeIndex=t}}},x={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("el-menu",{attrs:{"default-active":t.activeIndex,mode:"horizontal"},on:{select:t.aaa}},[s("el-menu-item",{attrs:{index:"1"}},[t._v("爆款单页")]),t._v(" "),s("el-menu-item",{attrs:{index:"3"}},[t._v("小说链接")])],1),t._v(" "),s("div",{staticClass:"wrapper"},["1"==t.activeIndex?s("baokuan"):t._e(),t._v(" "),"3"==t.activeIndex?s("novel-link"):t._e()],1)],1)},staticRenderFns:[]};var $=s("VU/8")(y,x,!1,function(t){s("N6Cc")},"data-v-d5f5fb7a",null).exports,U={props:{row:Object},data:function(){return{form:{updateAt:"",title:"",links:""}}},mounted:function(){this.form=this.row},methods:{close:function(){r.commit("changeUpdateLinksSwitch",!1)},save:function(){var t=this;console.log(this.row),this.form.title&&this.form.links?d()({url:"/fetchlink?action=edit_links",method:"get",withCredentials:!1,params:{title:this.form.title,links:this.form.links,id:this.row._id,class:this.row.class}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),d()({url:"/top10/get_one",method:"POST",withCredentials:!1,data:{key:t.form.title,class:t.row.class,url:t.form.links}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={}}),t.$emit("edit"),r.commit("changeUpdateLinksSwitch",!1)):t.$message.error(e.data.err)}):this.$message.error("输入有误，请重新输入")}}},C={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v("链接修改")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"page"},[s("el-form-item",{staticStyle:{},attrs:{label:"标题",prop:"title"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{staticStyle:{},attrs:{label:"链接",prop:"links"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.links,callback:function(e){t.$set(t.form,"links",e)},expression:"form.links"}})],1)],1),t._v(" "),s("div",{staticClass:"save"},[s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.save}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var G=s("VU/8")(U,C,!1,function(t){s("tTXE")},"data-v-0b49c57c",null).exports;window.onbeforeunload=function(){window.location.href="/"};var L={computed:{isUpdateLinksSwitch:function(){return r.state.isUpdateLinksSwitch}},components:{updateLinks:G},data:function(){return{row:{},form:{},linkslist:[],row1:{}}},mounted:function(){function t(t){for(var e=window.document.cookie.split("; "),s=0;s<e.length;s++){var a=e[s].split("=");if(t==a[0])return unescape(a[1])}return null}this.row=r.state.goodsData,this.form.pagename=this.row.pagename;var e=t("classname"),s=t("pagename");this.row.class=e,this.row.pagename=s,this.showLinks()},methods:{edit:function(){this.showLinks()},addGoods:function(){var t=this,e=this.$refs.links.$refs.input.value,s=this.$refs.title.$refs.input.value;""!=e&&""!=s&&d()({url:"/fetchlink/save_links",method:"POST",withCredentials:!1,data:{links:e,class:this.row.class,title:s}}).then(function(a){a.data.success?(t.$message({type:"success",message:a.data.success}),t.showLinks(),d()({url:"/top10/get_one",method:"POST",withCredentials:!1,data:{key:s,class:t.row.class,url:e}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={}})):t.$message.error(a.data.err)})},deleteLinks:function(t,e){var s=this;d()({url:"/fetchlink?action=delete_links",method:"get",withCredentials:!1,params:{class:e.class,id:e._id}}).then(function(t){t.data.success&&(1==t.data.result.length?(s.$message({type:"success",message:"已删除最后一条数据"}),s.linkslist=[]):(s.$message({type:"success",message:t.data.success}),s.showLinks()))})},updateLink:function(t,e){this.row1=e,r.commit("changeUpdateLinksSwitch",!0)},showLinks:function(){var t=this;d()({url:"/fetchlink?action=show_links",method:"get",withCredentials:!1,params:{class:this.row.class}}).then(function(e){if(e.data.success){for(var s=e.data.data,a=0;a<s.length;a++)s[a].updateAt=s[a].updateAt.substring(0,10);t.linkslist=s}else t.$message.error(e.data.err)})},close:function(){this.$router.push("/baokuan")}}},A={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update-page"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v("添加商品")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"pagename"},[s("el-form-item",{staticStyle:{},attrs:{label:"单页名称",prop:"pagename"}},[t._v("\n                "+t._s(t.row.pagename)+"\n            ")])],1),t._v(" "),s("div",{staticClass:"goods-detail"},[s("el-form-item",{staticStyle:{float:"left"},attrs:{label:"商品名称",prop:"title"}},[s("el-input",{ref:"title",staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{staticStyle:{float:"left"},attrs:{label:"商品链接",prop:"links"}},[s("el-input",{ref:"links",staticStyle:{width:"400px"},attrs:{prop:"links"},model:{value:t.form.links,callback:function(e){t.$set(t.form,"links",e)},expression:"form.links"}})],1),t._v(" "),s("el-button",{staticStyle:{width:"100px",float:"left","margin-left":"10px"},attrs:{plain:"",type:"success"},on:{click:t.addGoods}},[t._v("添加")]),t._v(" "),s("div",{staticStyle:{clear:"both"}}),t._v(" "),s("div",{staticClass:"left"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.linkslist,border:""}},[s("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),s("el-table-column",{attrs:{prop:"links",width:"500",label:"链接"}}),t._v(" "),s("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.updateLink(e.$index,e.row)}}},[t._v("修改链接")]),t._v(" "),s("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(s){t.deleteLinks(e.$index,e.row)}}},[t._v("删除链接")])]}}])})],1)],1)],1)]),t._v(" "),t.isUpdateLinksSwitch?s("div",{staticClass:"modal"},[s("update-links",{attrs:{row:t.row1},on:{edit:t.edit}})],1):t._e()],1)},staticRenderFns:[]};var D=s("VU/8")(L,A,!1,function(t){s("tk+/")},"data-v-7dcb6580",null).exports,z={data:function(){return{form:{pagename:"",title:"",token:""},imageUrl:"",pictUrl:""}},mounted:function(){this.form=r.state.goodsListData},methods:{handleAvatarSuccess:function(t,e){this.imageUrl=URL.createObjectURL(e.raw),this.pictUrl=t.filename},cancel:function(){r.commit("changeUpdateGoodsSwitch",!1)},saveGood:function(){var t=this;""==this.pictUrl&&(this.pictUrl=this.form.pictUrl),d()({url:"/goodsinfo?action=update_goods",method:"get",withCredentials:!1,params:{class:this.form.class,id:this.form._id,pictUrl:"/uploads/"+this.pictUrl,title:this.form.title,token:this.form.token}}).then(function(e){e.data.success?(t.$message({type:"success",message:"商品信息修改成功"}),t.$emit("edit"),r.commit("changeUpdateGoodsSwitch",!1)):t.$message.error(e.data.err)})}}},E={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update-goods"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"goods-desc"},[s("el-form-item",{attrs:{rules:[{required:!0}],label:"图片",prop:"imageFile"}},[s("el-upload",{attrs:{enctype:"multipart/form-data",action:"http://www.rrdtjj.top/goodsinfo/upload",name:"imageFile","on-success":t.handleAvatarSuccess}},[t.imageUrl?s("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),s("el-form-item",{attrs:{rules:[{required:!0,message:"商品名称不能为空"}],label:"商品名称",prop:"title"}},[s("el-input",{staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{attrs:{rules:[{required:!0,message:"淘口令不能为空"}],label:"淘口令",prop:"token"}},[s("el-input",{staticStyle:{width:"400px"},attrs:{prop:"token"},model:{value:t.form.token,callback:function(e){t.$set(t.form,"token",e)},expression:"form.token"}})],1),t._v(" "),s("div",{staticClass:"submit-btn"},[s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"danger"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.saveGood}},[t._v("保存")])],1)],1)])],1)},staticRenderFns:[]};var T=s("VU/8")(z,E,!1,function(t){s("NGzF")},"data-v-39c765d4",null).exports;window.onbeforeunload=function(){window.location.href="/"};var F={computed:{isUpdateGoodsSwitch:function(){return r.state.isUpdateGoodsSwitch}},components:{updateGoods:T},data:function(){return{row:{},goodslist:[]}},mounted:function(){function t(t){for(var e=window.document.cookie.split("; "),s=0;s<e.length;s++){var a=e[s].split("=");if(t==a[0])return unescape(a[1])}return null}this.row=r.state.goodsData;var e=t("classname"),s=t("pagename");this.row.class=e,this.row.pagename=s,this.showInfo(this.row)},methods:{removeGoods:function(t){this.goodslist.splice(t,1)},edit:function(){this.showInfo(this.row),console.log(this.row)},close:function(){this.$router.push("/baokuan")},updateInfo:function(t,e){r.state.isUpdateGoodsSwitch=!0,r.commit("setGoodsListData",e)},deleteOne:function(t,e){var s=this;d()({url:"/goodsinfo?action=delete_one",method:"get",withCredentials:!1,params:{class:e.class,id:e._id}}).then(function(t){t.data.success&&(console.log(t.data),1==t.data.result.length?(s.$message({type:"success",message:"已删除最后一条数据"}),s.goodslist=[]):(s.$message({type:"success",message:t.data.success}),s.showInfo(s.row)))})},showInfo:function(t){var e=this;d()({url:"/goodsinfo?action=show_goods",method:"get",withCredentials:!1,params:{class:t.class}}).then(function(t){if(t.data.success){for(var s=t.data.data,a=0;a<s.length;a++)s[a].updateAt=s[a].updateAt.substring(0,10);e.goodslist=s}else e.$message.error(t.data.err)})}}},V={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update-page"},[s("el-form",{ref:"form",attrs:{"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v("商品信息展示")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"pagename"},[s("el-form-item",{staticStyle:{},attrs:{label:"单页名称",prop:"pagename"}},[t._v("\n                "+t._s(t.row.pagename)+"\n            ")])],1),t._v(" "),s("div",{staticClass:"goods-detail"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.goodslist,border:""}},[s("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),s("el-table-column",{attrs:{prop:"token",width:"150",label:"淘口令"}}),t._v(" "),s("el-table-column",{attrs:{prop:"pictUrl",width:"477",label:"图片地址"}}),t._v(" "),s("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.updateInfo(e.$index,e.row)}}},[t._v("修改商品信息")]),t._v(" "),s("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(s){t.deleteOne(e.$index,e.row)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),t.isUpdateGoodsSwitch?s("div",{staticClass:"goods-update"},[s("update-goods",{on:{edit:t.edit}})],1):t._e()])],1)},staticRenderFns:[]};var I=s("VU/8")(F,V,!1,function(t){s("47Mu")},"data-v-b89526d2",null).exports;a.default.use(l.a);var R=new l.a({mode:"history",routes:[{path:"/baokuan",component:$,meta:{title:"首页"}},{path:"/baokuan/addLinks",component:D,meta:{title:"添加商品链接"}},{path:"/baokuan/showGoods",component:I,meta:{title:"详细商品信息"}}]}),j=s("zL8q"),M=s.n(j);s("tvR6");d.a.defaults.withCredentials=!0,a.default.config.productionTip=!1,a.default.use(M.a),new a.default({el:"#app",router:R,components:{App:o},template:"<App/>"})},NXHp:function(t,e){},r4zD:function(t,e){},tTXE:function(t,e){},"tk+/":function(t,e){},tvR6:function(t,e){},xtgp:function(t,e){},ycTe:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.324da770530fdefd7e1d.js.map
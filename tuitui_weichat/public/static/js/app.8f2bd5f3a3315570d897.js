webpackJsonp([1],{"47Mu":function(t,e){},EhKd:function(t,e){},IqRh:function(t,e){},NGzF:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=a("VU/8")({name:"App"},i,!1,function(t){a("r4zD")},null,null).exports,n=a("/ocq"),l=a("NYxO");s.default.use(l.a);var r=new l.a.Store({state:{isAddSwitch:!1,isEditSwitch:!1,isUpdateLinksSwitch:!1,goodsData:{},pagesData:{pagename:"请输入单页名称",class:"请输入class"},goodsListData:{},isUpdateGoodsSwitch:!1},mutations:{changeAddSwitch:function(t,e){t.isAddSwitch=e},changeEditSwitch:function(t,e){t.isEditSwitch=e},changeUpdateLinksSwitch:function(t,e){t.isUpdateLinksSwitch=e},changeUpdateGoodsSwitch:function(t,e){t.isUpdateGoodsSwitch=e},setGoodsData:function(t,e){t.goodsData=e||{}},setPagesData:function(t,e){t.pagesData=e||{}},setGoodsListData:function(t,e){t.goodsListData=e||{}}}}),c=a("mtWM"),d=a.n(c),m={props:{str:String,method:String,classSwitch:Boolean},data:function(){return{form:{updateAt:"",pagename:"",class:""},classShow:!0}},mounted:function(){this.form=r.state.pagesData,this.classShow=this.classSwitch},methods:{close:function(){r.commit(this.method,!1)},save:function(){var t=this,e=r.state.isAddSwitch,a=r.state.isEditSwitch;1==e&&0==a&&(this.form.pagename&&this.form.class?d()({url:"/add_page",method:"get",withCredentials:!1,params:{pagename:this.form.pagename,class:this.form.class}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),t.$emit("edit"),r.commit(t.method,!1)):t.$message.error(e.data.err)}):this.$message.error("输入有误，请重新输入")),0==e&&1==a&&(this.form.pagename&&this.form.class?d()({url:"/update_page",method:"get",withCredentials:!1,params:{id:this.form._id,pagename:this.form.pagename,class:this.form.class}}).then(function(e){e.data.success&&(t.$message({type:"success",message:e.data.success}),t.$emit("edit"),r.commit(t.method,!1),console.log(t.method))}):this.$message.error("输入有误，请重新输入"))}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"add"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("div",{staticClass:"header"},[a("h3",[t._v(t._s(t.str)+"爆款单页")]),t._v(" "),a("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),a("div",{staticClass:"page"},[a("el-form-item",{staticStyle:{},attrs:{rules:[{required:!0,message:"单页名称不能为空"}],label:"单页名称",prop:"pagename"}},[a("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.pagename,callback:function(e){t.$set(t.form,"pagename",e)},expression:"form.pagename"}})],1),t._v(" "),a("el-form-item",{staticStyle:{},attrs:{rules:[{required:!0,message:"class不能为空"}],label:"class",prop:"class"}},[a("el-input",{staticStyle:{width:"300px",float:"none"},attrs:{disabled:!t.classShow},model:{value:t.form.class,callback:function(e){t.$set(t.form,"class",e)},expression:"form.class"}})],1),t._v(" "),t.classShow?a("span",{staticClass:"tip"},[t._v("————class请谨慎填写，不能修改————")]):t._e()],1),t._v(" "),a("div",{staticClass:"save"},[a("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.save}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var p=a("VU/8")(m,u,!1,function(t){a("NXHp")},"data-v-3ff5ed54",null).exports,f=a("TQvf"),h=a.n(f),v=(new h.a(".copyBtn"),{computed:{isUpdateSwitch:function(){return r.state.isUpdateSwitch},isAddSwitch:function(){return r.state.isAddSwitch},isEditSwitch:function(){return r.state.isEditSwitch}},components:{Page:p},data:function(){return{activeIndex:"1",tableData:[],addStr:"新增",editStr:"修改",addMethod:"changeAddSwitch",editMethod:"changeEditSwitch",copyTxt:"http://www.rrdtjj.top/top10.html?class=",classSwitch1:!0,classSwitch2:!1}},mounted:function(){this.showPage()},methods:{addPage:function(){r.commit("changeAddSwitch",!0)},copy:function(){this.$message({type:"success",message:"复制成功"})},edit:function(){this.showPage()},isShow:function(t){this.isModal=t},addGoods:function(t,e){r.commit("setGoodsData",e);var a=e.class,s=e.pagename,i=new Date;i.setTime(i.getTime()+864e5),window.document.cookie="classname="+a+";path=/;expires="+i.toGMTString(),window.document.cookie="pagename="+s+";path=/;expires="+i.toGMTString(),this.$router.push("/baokuan/addLinks")},showGoods:function(t,e){r.commit("setGoodsData",e);var a=e.class,s=e.pagename,i=new Date;i.setTime(i.getTime()+864e5),window.document.cookie="classname="+a+";path=/;expires="+i.toGMTString(),window.document.cookie="pagename="+s+";path=/;expires="+i.toGMTString(),this.$router.push("/baokuan/showGoods")},editPage:function(t,e){r.commit("changeEditSwitch",!0),r.state.pagesData=e},showPage:function(){var t=this;d()({url:"/show_page",method:"get",withCredentials:!1}).then(function(e){if(e.data.success){for(var a=e.data.data,s=0;s<a.length;s++)a[s].updateAt=a[s].updateAt.substring(0,10);t.tableData=a}else t.$message.error(e.data.err)})}}}),g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"baokuan"},[a("div",{staticClass:"add-page"},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:t.addPage}},[t._v("新增爆款单页")])],1),t._v(" "),a("div",{staticClass:"lists"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pagename",label:"单页名称",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"visited",width:"120",label:"浏览人数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"copied",width:"120",label:"复制口令人数"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"copyBtn",attrs:{size:"small",type:"success","data-clipboard-text":t.copyTxt+e.row.class},on:{click:t.copy}},[t._v("复制链接")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){t.addGoods(e.$index,e.row)}}},[t._v("添加商品链接")]),t._v(" "),a("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(a){t.editPage(e.$index,e.row)}}},[t._v("修改单页名称")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){t.showGoods(e.$index,e.row)}}},[t._v("商品信息")])]}}])})],1)],1),t._v(" "),t.isAddSwitch?a("div",{staticClass:"modal"},[a("page",{attrs:{str:t.addStr,method:t.addMethod,classSwitch:t.classSwitch1},on:{edit:t.edit}})],1):t._e(),t._v(" "),t.isEditSwitch?a("div",{staticClass:"modal"},[a("page",{attrs:{str:t.editStr,method:t.editMethod,classSwitch:t.classSwitch2},on:{edit:t.edit}})],1):t._e()])},staticRenderFns:[]};var w=a("VU/8")(v,g,!1,function(t){a("xtgp")},"data-v-a45bacb8",null).exports,_={data:function(){return{name:"",content:"",gonghao:"",code:"",qr_code_url:"",gonghaoList:[],tableData:[],isUpdate:!1,isShow:!1}},mounted:function(){this.showList(),this.getGonghaoList()},methods:{add:function(){this.isShow=!0},cancel:function(){this.name=this.content=this.code="",this.isShow=!1},create:function(){var t=this;d()({url:"/qr_code/create",method:"post",data:{name:this.name,content:this.content,code:this.code}}).then(function(e){""==e.data.data?t.$message.error("创建失败"):(t.$message({type:"success",message:"创建成功"}),t.showList(),t.name=t.content=t.code="",t.isShow=!1)})},getGonghaoList:function(){var t=this;d()({url:"/qr_code/get_code",method:"get"}).then(function(e){t.gonghaoList=e.data.codes})},showList:function(){var t=this;d()({url:"/qr_code/show",method:"get"}).then(function(e){for(var a=e.data.codes,s=e.data.data,i=0,o=a.length;i<o;i++)for(var n=0,l=s.length;n<l;n++)a[i].code==s[n].code&&(s[n].gonghao=a[i].name);t.tableData=s})},update:function(t){console.log(t),this.isUpdate=!0,this.name=t.name,this.content=t.content,this.code=t.code,this.qr_code_url=t.qr_code_url,this.isShow=!0},deleteOne:function(t){var e=this;d()({url:"/qr_code/deleteOne",method:"post",data:{id:t._id}}).then(function(t){e.$message({type:"success",message:t.data.success}),""==t.data.data?e.tableData=[]:e.showList()})},save:function(){var t=this;d()({url:"/qr_code/update",method:"post",data:{name:this.name,content:this.content,code:this.code}}).then(function(e){console.log(e.data.data),""==e.data.data?t.$message.error("修改失败"):(t.$message({type:"success",message:"修改成功"}),t.showList(),t.name=t.content=t.code="",t.isShow=!1)})}}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"add-message"},[t.isShow?t._e():a("el-button",{staticStyle:{"margin-bottom":"30px"},attrs:{type:"primary"},on:{click:function(e){t.add()}}},[t._v("新增小说二维码")]),t._v(" "),t.isShow?t._e():a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"name",label:"二维码名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"content",label:"关注后回复内容"}}),t._v(" "),a("el-table-column",{attrs:{prop:"gonghao",label:"公号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"qr_code_url",label:"二维码",width:"120"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"qr_img",attrs:{src:t.row.qr_code_url}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.update(e.row)}}},[t._v("修改")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){t.deleteOne(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.isShow?a("div",{staticClass:"wrapper"},[a("h3",{staticClass:"wrap-title"},[t._v("添加/修改二维码")]),t._v(" "),a("el-form",{attrs:{"label-width":"120px",size:"mini"}},[a("el-form-item",{attrs:{label:"二维码名称",prop:"name"}},[a("el-input",{staticStyle:{width:"300px"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"关注回复内容",prop:"content"}},[a("el-input",{staticStyle:{width:"300px"},attrs:{type:"textarea",rows:"5"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"选择公号"}},[a("el-radio-group",{model:{value:t.code,callback:function(e){t.code=e},expression:"code"}},t._l(t.gonghaoList,function(e,s){return a("el-radio",{key:s,staticStyle:{margin:"10px"},attrs:{label:e.code}},[t._v(t._s(e.name))])}))],1),t._v(" "),a("el-form-item",{attrs:{size:"large"}},[t.isUpdate?a("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("保存")]):a("el-button",{attrs:{type:"primary"},on:{click:t.create}},[t._v("立即生成")]),t._v(" "),a("el-button",{attrs:{type:"info"},on:{click:t.cancel}},[t._v("取消")])],1)],1)],1):t._e()],1)},staticRenderFns:[]};var k=a("VU/8")(_,b,!1,function(t){a("OOt1")},"data-v-120f1e27",null).exports,y=(new h.a(".copyBtn"),{data:function(){return{form:{type:0,pageTitle:"冒死推荐，多看一本是一本",articleTit:" 女人最多能承受多少厘米",desc:"一个陪你过夜的小说站"},imgUrl:"",isShow:!1,tableData:[],isUpdate:!1}},mounted:function(){this.show()},methods:{add:function(){this.isShow=!0},handleAvatarSuccess:function(t,e){this.imgUrl="http://www.rrdtjj.top/images/tuiguang/"+t.filename,this.form.picurl=this.imgUrl},create:function(){var t=this;this.$confirm("小哥哥/小姐姐，确定要创建一条新的链接嘛?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d()({url:"/tuiguang/novel/add",method:"post",data:{type:t.form.type,id:t.form.id,pageTitle:t.form.pageTitle,articleTit:t.form.articleTit,name:t.form.name,desc:t.form.desc,picurl:t.form.picurl,capter1:t.form.capter1,capter2:t.form.capter2,linkUrl:t.form.linkUrl,statisticsUrl1:t.form.statisticsUrl1,statisticsUrl2:t.form.statisticsUrl2,channel:t.form.channel,tokenCodes:t.form.tokenCodes,remarks:t.form.remarks}}).then(function(e){e.data.err?t.$message.error(e.data.err):(t.$message({type:"success",message:e.data.message}),t.form={type:0,pageTitle:"冒死推荐，多看一本是一本",articleTit:" 女人最多能承受多少厘米",desc:"一个陪你过夜的小说站"},t.imgUrl="",t.isShow=!1,t.show())})}).catch(function(){})},reset:function(){var t=this;this.$confirm("兄弟/妹子，你可想好了，确定要清空已经填好的信息吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.form={type:0,pageTitle:"冒死推荐，多看一本是一本",articleTit:" 女人最多能承受多少厘米",desc:"一个陪你过夜的小说站"}}).catch(function(){})},deleteOne:function(t){var e=this;this.$confirm("小哥哥/小姐姐，你真的不要我了吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d()({url:"/tuiguang/novel/delete_one",method:"post",data:{id:t.id}}).then(function(t){e.$message({type:"success",message:t.data.message}),e.show()})}).catch(function(){e.$message({type:"info",message:"你们还是爱我的，么么哒~~~"})})},copy:function(){this.$message({type:"success",message:"复制成功"})},show:function(){var t=this;d()({url:"/tuiguang/novel/show",method:"get"}).then(function(e){t.tableData=e.data.data})},update:function(t){this.form=t,this.isUpdate=this.isShow=!0,this.imgUrl=this.form.picurl},cancel:function(){this.isShow=this.isUpdate=!1,this.form={type:0,pageTitle:"冒死推荐，多看一本是一本",articleTit:" 女人最多能承受多少厘米",desc:"一个陪你过夜的小说站"},this.imgUrl=""},save:function(){var t=this;this.$confirm("小哥哥/小姐姐，你们要把握变得更加漂亮吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d()({url:"/tuiguang/novel/update",method:"post",data:{_id:t.form._id,type:t.form.type,id:t.form.id,pageTitle:t.form.pageTitle,articleTit:t.form.articleTit,name:t.form.name,desc:t.form.desc,picurl:t.form.picurl,capter1:t.form.capter1,capter2:t.form.capter2,linkUrl:t.form.linkUrl,statisticsUrl1:t.form.statisticsUrl1,statisticsUrl2:t.form.statisticsUrl2,tokenCodes:t.form.tokenCodes,channel:t.form.channel,remarks:t.form.remarks}}).then(function(e){t.$message({type:"success",message:e.data.success}),t.form={type:0,pageTitle:"冒死推荐，多看一本是一本",articleTit:" 女人最多能承受多少厘米",desc:"一个陪你过夜的小说站"},t.imgUrl="",t.isShow=t.isUpdate=!1})}).catch(function(){})}}}),S={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"novel-link"},[t.isShow?t._e():a("el-button",{staticStyle:{"margin-bottom":"30px"},attrs:{type:"primary"},on:{click:function(e){t.add()}}},[t._v("新增小说链接")]),t._v(" "),t.isShow?t._e():a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"id",label:"id",width:"60"}}),t._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"type",label:"类型",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(0==e.row.type?"微跳":1==e.row.type?"非微调单页":"非微调多页")+"\n            ")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"公号",width:1==t.type?"160":"80"}}),t._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"picurl",label:"图片",width:"200"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"beauty",attrs:{src:t.row.picurl}})]}}])}),t._v(" "),a("el-table-column",{attrs:{"header-align":"center",prop:"channel",label:"渠道",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{"header-align":"center",prop:"remarks",label:"备注"}}),t._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"复制链接",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.type?a("el-button",{staticClass:"copyBtn",attrs:{"data-clipboard-text":"http://www.nyzda.top/tuiguang/weitiao/"+e.row.id,type:"success",size:"small"},on:{click:t.copy}},[t._v("微跳")]):t._e(),t._v(" "),1==e.row.type?a("el-button",{staticClass:"copyBtn",attrs:{"data-clipboard-text":"http://www.nyzda.top/tuiguang/singlepage/"+e.row.id,type:"success",size:"small"},on:{click:t.copy}},[t._v("非微调单页")]):t._e(),t._v(" "),2==e.row.type?a("el-button",{staticClass:"copyBtn",attrs:{"data-clipboard-text":"http://www.nyzda.top/tuiguang/multipage/"+e.row.id,type:"success",size:"small"},on:{click:t.copy}},[t._v("非微调多页")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.update(e.row)}}},[t._v("修改")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){t.deleteOne(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.isShow?a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"类型"}},[a("el-radio-group",{model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},[a("el-radio",{attrs:{label:0}},[t._v("微跳")]),t._v(" "),a("el-radio",{attrs:{label:1}},[t._v("非微调单页")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("非微调多页")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"id"}},[a("el-input",{staticStyle:{width:"100px"},attrs:{disabled:t.isUpdate},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"页面标题"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.pageTitle,callback:function(e){t.$set(t.form,"pageTitle",e)},expression:"form.pageTitle"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"文章标题"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.articleTit,callback:function(e){t.$set(t.form,"articleTit",e)},expression:"form.articleTit"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公号名称"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公号描述"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc",e)},expression:"form.desc"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"图片",prop:"imageFile"}},[a("el-upload",{attrs:{"show-file-list":!1,enctype:"multipart/form-data",name:"imageFile",action:"http://www.rrdtjj.top/tuiguang/novel/upload","on-success":t.handleAvatarSuccess}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),t.imgUrl?a("img",{staticClass:"b_img",attrs:{src:t.imgUrl,alt:"",width:"200"}}):t._e()],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"文章内容",prop:"content"}},[a("el-input",{staticStyle:{width:"500px"},attrs:{type:"textarea"},model:{value:t.form.capter1,callback:function(e){t.$set(t.form,"capter1",e)},expression:"form.capter1"}})],1),t._v(" "),2==t.form.type?a("el-form-item",{attrs:{label:"文章内容(第二章)",prop:"content"}},[a("el-input",{staticStyle:{width:"500px"},attrs:{type:"textarea"},model:{value:t.form.capter2,callback:function(e){t.$set(t.form,"capter2",e)},expression:"form.capter2"}})],1):t._e(),t._v(" "),0==t.form.type?a("el-form-item",{attrs:{label:"跳转链接"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.linkUrl,callback:function(e){t.$set(t.form,"linkUrl",e)},expression:"form.linkUrl"}})],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"统计链接"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.statisticsUrl1,callback:function(e){t.$set(t.form,"statisticsUrl1",e)},expression:"form.statisticsUrl1"}})],1),t._v(" "),2==t.form.type?a("el-form-item",{attrs:{label:"统计链接(第二章)"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.statisticsUrl2,callback:function(e){t.$set(t.form,"statisticsUrl2",e)},expression:"form.statisticsUrl2"}})],1):t._e(),t._v(" "),1!=t.form.type?a("el-form-item",{attrs:{label:"口令代码"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.tokenCodes,callback:function(e){t.$set(t.form,"tokenCodes",e)},expression:"form.tokenCodes"}})],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"渠道"}},[a("el-input",{staticStyle:{width:"150px"},model:{value:t.form.channel,callback:function(e){t.$set(t.form,"channel",e)},expression:"form.channel"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{staticStyle:{width:"500px"},model:{value:t.form.remarks,callback:function(e){t.$set(t.form,"remarks",e)},expression:"form.remarks"}})],1),t._v(" "),a("el-form-item",{attrs:{size:"large"}},[t.isUpdate?a("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("保 存")]):a("el-button",{attrs:{type:"primary"},on:{click:t.create}},[t._v("立即创建")]),t._v(" "),t.isUpdate?t._e():a("el-button",{attrs:{type:"info"},on:{click:t.reset}},[t._v("重 置")]),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:t.cancel}},[t._v("取 消")])],1)],1):t._e()],1)},staticRenderFns:[]};var x={data:function(){return{form:{links:[]},tableData:[],link:"",isShow:!1,isUpdate:!1,domain_name:""}},mounted:function(){this.showList()},methods:{add:function(){this.isShow=!0},update:function(t){this.isShow=!0,this.isUpdate=!0,this.form=t},update_domain:function(){var t=this;""==this.domain_name?this.$message.error("域名不能为空，请重新填写！！！"):this.$confirm("确定修改域名吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d()({url:"/transfer/update_links",method:"get",params:{domain_name:t.domain_name}}).then(function(e){t.$message({type:"success",message:e.data.success}),t.domain_name="",t.showList()})}).catch(function(){t.$message({type:"info",message:"你们还是爱我的，么么哒~~~"})})},deleteOne:function(t){var e=this;this.$confirm("小哥哥/小姐姐，你真的不要我了吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d()({url:"/transfer/delete",method:"get",params:{id:t._id}}).then(function(t){e.$message({type:"success",message:t.data.success}),e.showList()})}).catch(function(){e.$message({type:"info",message:"你们还是爱我的，么么哒~~~"})})},deleteLink:function(t){this.form.links.splice(t,1)},addOne:function(){""==this.link?this.$message.error("链接不能为空"):(this.form.links.push(this.link),this.link="")},save:function(){var t=this;d()({url:"/transfer/update",method:"post",data:{_id:this.form._id,id:this.form.id,title:this.form.title,links:this.form.links}}).then(function(e){console.log(1111),e.data.success?(t.$message({type:"success",message:e.data.success}),t.isShow=t.isUpdate=!1,t.form={links:[]},t.showList()):t.$message.error(e.data.err)})},create:function(){var t=this;d()({url:"/transfer/create",method:"post",data:{id:this.form.id,title:this.form.title,links:this.form.links}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),t.showList(),t.form={links:[]},t.isShow=!1):t.$message.error(e.data.err)})},cancel:function(){this.form={links:[]},this.isUpdate=!1,this.isShow=!1},showList:function(){var t=this;d()({url:"/transfer",method:"get"}).then(function(e){t.tableData=e.data.messages})}}},$={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"random-links"},[t.isShow?t._e():a("div",[a("el-input",{staticStyle:{width:"300px"},model:{value:t.domain_name,callback:function(e){t.domain_name=e},expression:"domain_name"}}),t._v(" "),a("el-button",{staticClass:"damain-name",attrs:{type:"primary"},on:{click:function(e){t.update_domain()}}},[t._v("修改域名")]),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:function(e){t.add()}}},[t._v("添加新链接")]),t._v(" "),a("el-table",{staticClass:"wrapper",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"url"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v("http://www.nyzda.top/transfer/"+t._s(e.row.id))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"title"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){t.update(e.row)}}},[t._v("修改")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){t.deleteOne(e.row)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),t.isShow?a("div",{staticClass:"form-con"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"",prop:"id"}},[a("h2",[t._v("添加/修改链接")])]),t._v(" "),a("el-form-item",{attrs:{label:"id",prop:"id"}},[a("el-input",{ref:"id",staticStyle:{width:"200px"},attrs:{prop:"id"},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"title",prop:"title"}},[a("el-input",{ref:"title",staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"link",prop:"link"}},[a("el-input",{ref:"link",staticStyle:{width:"600px"},attrs:{prop:"link"},model:{value:t.link,callback:function(e){t.link=e},expression:"link"}}),t._v(" "),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:t.addOne}},[t._v("添加")])],1),t._v(" "),a("el-form-item",{attrs:{label:"links",prop:"links"}},[a("ul",t._l(t.form.links,function(e,s){return a("li",{key:s},[a("span",[t._v(t._s(e))]),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.deleteLink(s)}}},[t._v("X")])],1)}))]),t._v(" "),a("el-form-item",{attrs:{prop:"links"}},[t.isUpdate?a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.save()}}},[t._v("保存")]):a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.create()}}},[t._v("创建")]),t._v(" "),a("el-button",{attrs:{type:"info"},on:{click:function(e){t.cancel()}}},[t._v("取消")])],1)],1)],1):t._e()])},staticRenderFns:[]};var U={components:{baokuan:w,qrCode:k,novelLink:a("VU/8")(y,S,!1,function(t){a("EhKd")},"data-v-b54c4140",null).exports,randomLinks:a("VU/8")(x,$,!1,function(t){a("IqRh")},"data-v-56d6b054",null).exports},data:function(){return{activeIndex:"1"}},mounted:function(){},methods:{aaa:function(t,e){this.activeIndex=t}}},C={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("el-menu",{attrs:{"default-active":t.activeIndex,mode:"horizontal"},on:{select:t.aaa}},[a("el-menu-item",{attrs:{index:"1"}},[t._v("爆款单页")]),t._v(" "),a("el-menu-item",{attrs:{index:"2"}},[t._v("小说二维码")]),t._v(" "),a("el-menu-item",{attrs:{index:"3"}},[t._v("小说链接")]),t._v(" "),a("el-menu-item",{attrs:{index:"4"}},[t._v("随机链接")])],1),t._v(" "),a("div",{staticClass:"wrapper"},["1"==t.activeIndex?a("baokuan"):t._e(),t._v(" "),"2"==t.activeIndex?a("qr-code"):t._e(),t._v(" "),"3"==t.activeIndex?a("novel-link"):t._e(),t._v(" "),"4"==t.activeIndex?a("random-links"):t._e()],1)],1)},staticRenderFns:[]};var T=a("VU/8")(U,C,!1,function(t){a("lSTC")},"data-v-333d7eda",null).exports,L={props:{row:Object},data:function(){return{form:{updateAt:"",title:"",links:""}}},mounted:function(){this.form=this.row},methods:{close:function(){r.commit("changeUpdateLinksSwitch",!1)},save:function(){var t=this;console.log(this.row),this.form.title&&this.form.links?d()({url:"/fetchlink?action=edit_links",method:"get",withCredentials:!1,params:{title:this.form.title,links:this.form.links,id:this.row._id,class:this.row.class}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),d()({url:"/top10/get_one",method:"POST",withCredentials:!1,data:{key:t.form.title,class:t.row.class,url:t.form.links}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={}}),t.$emit("edit"),r.commit("changeUpdateLinksSwitch",!1)):t.$message.error(e.data.err)}):this.$message.error("输入有误，请重新输入")}}},D={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"update"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("div",{staticClass:"header"},[a("h3",[t._v("链接修改")]),t._v(" "),a("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),a("div",{staticClass:"page"},[a("el-form-item",{staticStyle:{},attrs:{label:"标题",prop:"title"}},[a("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{staticStyle:{},attrs:{label:"链接",prop:"links"}},[a("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.links,callback:function(e){t.$set(t.form,"links",e)},expression:"form.links"}})],1)],1),t._v(" "),a("div",{staticClass:"save"},[a("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.save}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var G=a("VU/8")(L,D,!1,function(t){a("tTXE")},"data-v-0b49c57c",null).exports;window.onbeforeunload=function(){window.location.href="/"};var z={computed:{isUpdateLinksSwitch:function(){return r.state.isUpdateLinksSwitch}},components:{updateLinks:G},data:function(){return{row:{},form:{},linkslist:[],row1:{}}},mounted:function(){function t(t){for(var e=window.document.cookie.split("; "),a=0;a<e.length;a++){var s=e[a].split("=");if(t==s[0])return unescape(s[1])}return null}this.row=r.state.goodsData,this.form.pagename=this.row.pagename;var e=t("classname"),a=t("pagename");this.row.class=e,this.row.pagename=a,this.showLinks()},methods:{edit:function(){this.showLinks()},addGoods:function(){var t=this,e=this.$refs.links.$refs.input.value,a=this.$refs.title.$refs.input.value;""!=e&&""!=a&&d()({url:"/fetchlink/save_links",method:"POST",withCredentials:!1,data:{links:e,class:this.row.class,title:a}}).then(function(s){s.data.success?(t.$message({type:"success",message:s.data.success}),t.showLinks(),d()({url:"/top10/get_one",method:"POST",withCredentials:!1,data:{key:a,class:t.row.class,url:e}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={}})):t.$message.error(s.data.err)})},deleteLinks:function(t,e){var a=this;d()({url:"/fetchlink?action=delete_links",method:"get",withCredentials:!1,params:{class:e.class,id:e._id}}).then(function(t){t.data.success&&(1==t.data.result.length?(a.$message({type:"success",message:"已删除最后一条数据"}),a.linkslist=[]):(a.$message({type:"success",message:t.data.success}),a.showLinks()))})},updateLink:function(t,e){this.row1=e,r.commit("changeUpdateLinksSwitch",!0)},showLinks:function(){var t=this;d()({url:"/fetchlink?action=show_links",method:"get",withCredentials:!1,params:{class:this.row.class}}).then(function(e){if(e.data.success){for(var a=e.data.data,s=0;s<a.length;s++)a[s].updateAt=a[s].updateAt.substring(0,10);t.linkslist=a}else t.$message.error(e.data.err)})},close:function(){this.$router.push("/baokuan")}}},A={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"update-page"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("div",{staticClass:"header"},[a("h3",[t._v("添加商品")]),t._v(" "),a("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),a("div",{staticClass:"pagename"},[a("el-form-item",{staticStyle:{},attrs:{label:"单页名称",prop:"pagename"}},[t._v("\n                "+t._s(t.row.pagename)+"\n            ")])],1),t._v(" "),a("div",{staticClass:"goods-detail"},[a("el-form-item",{staticStyle:{float:"left"},attrs:{label:"商品名称",prop:"title"}},[a("el-input",{ref:"title",staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{staticStyle:{float:"left"},attrs:{label:"商品链接",prop:"links"}},[a("el-input",{ref:"links",staticStyle:{width:"400px"},attrs:{prop:"links"},model:{value:t.form.links,callback:function(e){t.$set(t.form,"links",e)},expression:"form.links"}})],1),t._v(" "),a("el-button",{staticStyle:{width:"100px",float:"left","margin-left":"10px"},attrs:{plain:"",type:"success"},on:{click:t.addGoods}},[t._v("添加")]),t._v(" "),a("div",{staticStyle:{clear:"both"}}),t._v(" "),a("div",{staticClass:"left"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.linkslist,border:""}},[a("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"links",width:"500",label:"链接"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){t.updateLink(e.$index,e.row)}}},[t._v("修改链接")]),t._v(" "),a("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(a){t.deleteLinks(e.$index,e.row)}}},[t._v("删除链接")])]}}])})],1)],1)],1)]),t._v(" "),t.isUpdateLinksSwitch?a("div",{staticClass:"modal"},[a("update-links",{attrs:{row:t.row1},on:{edit:t.edit}})],1):t._e()],1)},staticRenderFns:[]};var E=a("VU/8")(z,A,!1,function(t){a("tk+/")},"data-v-7dcb6580",null).exports,q={data:function(){return{form:{pagename:"",title:"",token:""},imageUrl:"",pictUrl:""}},mounted:function(){this.form=r.state.goodsListData},methods:{handleAvatarSuccess:function(t,e){this.imageUrl=URL.createObjectURL(e.raw),this.pictUrl=t.filename},cancel:function(){r.commit("changeUpdateGoodsSwitch",!1)},saveGood:function(){var t=this;""==this.pictUrl&&(this.pictUrl=this.form.pictUrl),d()({url:"/goodsinfo?action=update_goods",method:"get",withCredentials:!1,params:{class:this.form.class,id:this.form._id,pictUrl:"/uploads/"+this.pictUrl,title:this.form.title,token:this.form.token}}).then(function(e){e.data.success?(t.$message({type:"success",message:"商品信息修改成功"}),t.$emit("edit"),r.commit("changeUpdateGoodsSwitch",!1)):t.$message.error(e.data.err)})}}},O={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"update-goods"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("div",{staticClass:"goods-desc"},[a("el-form-item",{attrs:{rules:[{required:!0}],label:"图片",prop:"imageFile"}},[a("el-upload",{attrs:{enctype:"multipart/form-data",action:"http://www.rrdtjj.top/goodsinfo/upload",name:"imageFile","on-success":t.handleAvatarSuccess}},[t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),a("el-form-item",{attrs:{rules:[{required:!0,message:"商品名称不能为空"}],label:"商品名称",prop:"title"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{attrs:{rules:[{required:!0,message:"淘口令不能为空"}],label:"淘口令",prop:"token"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{prop:"token"},model:{value:t.form.token,callback:function(e){t.$set(t.form,"token",e)},expression:"form.token"}})],1),t._v(" "),a("div",{staticClass:"submit-btn"},[a("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"danger"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),a("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.saveGood}},[t._v("保存")])],1)],1)])],1)},staticRenderFns:[]};var B=a("VU/8")(q,O,!1,function(t){a("NGzF")},"data-v-39c765d4",null).exports;window.onbeforeunload=function(){window.location.href="/"};var F={computed:{isUpdateGoodsSwitch:function(){return r.state.isUpdateGoodsSwitch}},components:{updateGoods:B},data:function(){return{row:{},goodslist:[]}},mounted:function(){function t(t){for(var e=window.document.cookie.split("; "),a=0;a<e.length;a++){var s=e[a].split("=");if(t==s[0])return unescape(s[1])}return null}this.row=r.state.goodsData;var e=t("classname"),a=t("pagename");this.row.class=e,this.row.pagename=a,this.showInfo(this.row)},methods:{removeGoods:function(t){this.goodslist.splice(t,1)},edit:function(){this.showInfo(this.row),console.log(this.row)},close:function(){this.$router.push("/baokuan")},updateInfo:function(t,e){r.state.isUpdateGoodsSwitch=!0,r.commit("setGoodsListData",e)},deleteOne:function(t,e){var a=this;d()({url:"/goodsinfo?action=delete_one",method:"get",withCredentials:!1,params:{class:e.class,id:e._id}}).then(function(t){t.data.success&&(console.log(t.data),1==t.data.result.length?(a.$message({type:"success",message:"已删除最后一条数据"}),a.goodslist=[]):(a.$message({type:"success",message:t.data.success}),a.showInfo(a.row)))})},showInfo:function(t){var e=this;d()({url:"/goodsinfo?action=show_goods",method:"get",withCredentials:!1,params:{class:t.class}}).then(function(t){if(t.data.success){for(var a=t.data.data,s=0;s<a.length;s++)a[s].updateAt=a[s].updateAt.substring(0,10);e.goodslist=a}else e.$message.error(t.data.err)})}}},R={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"update-page"},[a("el-form",{ref:"form",attrs:{"label-width":"80px"}},[a("div",{staticClass:"header"},[a("h3",[t._v("商品信息展示")]),t._v(" "),a("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),a("div",{staticClass:"pagename"},[a("el-form-item",{staticStyle:{},attrs:{label:"单页名称",prop:"pagename"}},[t._v("\n                "+t._s(t.row.pagename)+"\n            ")])],1),t._v(" "),a("div",{staticClass:"goods-detail"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.goodslist,border:""}},[a("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"token",width:"150",label:"淘口令"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pictUrl",width:"477",label:"图片地址"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){t.updateInfo(e.$index,e.row)}}},[t._v("修改商品信息")]),t._v(" "),a("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(a){t.deleteOne(e.$index,e.row)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),t.isUpdateGoodsSwitch?a("div",{staticClass:"goods-update"},[a("update-goods",{on:{edit:t.edit}})],1):t._e()])],1)},staticRenderFns:[]};var I=a("VU/8")(F,R,!1,function(t){a("47Mu")},"data-v-b89526d2",null).exports;s.default.use(n.a);var M=new n.a({mode:"history",routes:[{path:"/baokuan",component:T,meta:{title:"首页"}},{path:"/baokuan/addLinks",component:E,meta:{title:"添加商品链接"}},{path:"/baokuan/showGoods",component:I,meta:{title:"详细商品信息"}}]}),P=a("zL8q"),j=a.n(P);a("tvR6");d.a.defaults.withCredentials=!0,s.default.config.productionTip=!1,s.default.use(j.a),new s.default({el:"#app",router:M,components:{App:o},template:"<App/>"})},NXHp:function(t,e){},OOt1:function(t,e){},lSTC:function(t,e){},r4zD:function(t,e){},tTXE:function(t,e){},"tk+/":function(t,e){},tvR6:function(t,e){},xtgp:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.8f2bd5f3a3315570d897.js.map
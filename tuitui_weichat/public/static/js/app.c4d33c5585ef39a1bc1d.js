webpackJsonp([1],{"0Ldl":function(t,e){},"47Mu":function(t,e){},NGzF:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=s("VU/8")({name:"App"},i,!1,function(t){s("r4zD")},null,null).exports,n=s("/ocq"),l=s("NYxO");a.default.use(l.a);var r=new l.a.Store({state:{isAddSwitch:!1,isEditSwitch:!1,isUpdateLinksSwitch:!1,goodsData:{},pagesData:{pagename:"请输入单页名称",class:"请输入class"},goodsListData:{},isUpdateGoodsSwitch:!1},mutations:{changeAddSwitch:function(t,e){t.isAddSwitch=e},changeEditSwitch:function(t,e){t.isEditSwitch=e},changeUpdateLinksSwitch:function(t,e){t.isUpdateLinksSwitch=e},changeUpdateGoodsSwitch:function(t,e){t.isUpdateGoodsSwitch=e},setGoodsData:function(t,e){t.goodsData=e||{}},setPagesData:function(t,e){t.pagesData=e||{}},setGoodsListData:function(t,e){t.goodsListData=e||{}}}}),c=s("mtWM"),d=s.n(c),m={props:{str:String,method:String,classSwitch:Boolean},data:function(){return{form:{updateAt:"",pagename:"",class:""},classShow:!0}},mounted:function(){this.form=r.state.pagesData,this.classShow=this.classSwitch},methods:{close:function(){r.commit(this.method,!1)},save:function(){var t=this,e=r.state.isAddSwitch,s=r.state.isEditSwitch;1==e&&0==s&&(this.form.pagename&&this.form.class?d()({url:"/add_page",method:"get",withCredentials:!1,params:{pagename:this.form.pagename,class:this.form.class}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),t.$emit("edit"),r.commit(t.method,!1)):t.$message.error(e.data.err)}):this.$message.error("输入有误，请重新输入")),0==e&&1==s&&(this.form.pagename&&this.form.class?d()({url:"/update_page",method:"get",withCredentials:!1,params:{id:this.form._id,pagename:this.form.pagename,class:this.form.class}}).then(function(e){e.data.success&&(t.$message({type:"success",message:e.data.success}),t.$emit("edit"),r.commit(t.method,!1),console.log(t.method))}):this.$message.error("输入有误，请重新输入"))}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"add"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v(t._s(t.str)+"爆款单页")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"page"},[s("el-form-item",{staticStyle:{},attrs:{rules:[{required:!0,message:"单页名称不能为空"}],label:"单页名称",prop:"pagename"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.pagename,callback:function(e){t.$set(t.form,"pagename",e)},expression:"form.pagename"}})],1),t._v(" "),s("el-form-item",{staticStyle:{},attrs:{rules:[{required:!0,message:"class不能为空"}],label:"class",prop:"class"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},attrs:{disabled:!t.classShow},model:{value:t.form.class,callback:function(e){t.$set(t.form,"class",e)},expression:"form.class"}})],1),t._v(" "),t.classShow?s("span",{staticClass:"tip"},[t._v("————class请谨慎填写，不能修改————")]):t._e()],1),t._v(" "),s("div",{staticClass:"save"},[s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.save}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var p=s("VU/8")(m,u,!1,function(t){s("NXHp")},"data-v-3ff5ed54",null).exports,h=s("TQvf"),f=s.n(h),v=(new f.a(".copyBtn"),{computed:{isUpdateSwitch:function(){return r.state.isUpdateSwitch},isAddSwitch:function(){return r.state.isAddSwitch},isEditSwitch:function(){return r.state.isEditSwitch}},components:{Page:p},data:function(){return{activeIndex:"1",tableData:[],addStr:"新增",editStr:"修改",addMethod:"changeAddSwitch",editMethod:"changeEditSwitch",copyTxt:"http://www.rrdtjj.top/top10.html?class=",classSwitch1:!0,classSwitch2:!1}},mounted:function(){this.showPage()},methods:{addPage:function(){r.commit("changeAddSwitch",!0)},copy:function(){this.$message({type:"success",message:"复制成功"})},edit:function(){this.showPage()},isShow:function(t){this.isModal=t},addGoods:function(t,e){r.commit("setGoodsData",e);var s=e.class,a=e.pagename,i=new Date;i.setTime(i.getTime()+864e5),window.document.cookie="classname="+s+";path=/;expires="+i.toGMTString(),window.document.cookie="pagename="+a+";path=/;expires="+i.toGMTString(),this.$router.push("/baokuan/addLinks")},showGoods:function(t,e){r.commit("setGoodsData",e);var s=e.class,a=e.pagename,i=new Date;i.setTime(i.getTime()+864e5),window.document.cookie="classname="+s+";path=/;expires="+i.toGMTString(),window.document.cookie="pagename="+a+";path=/;expires="+i.toGMTString(),this.$router.push("/baokuan/showGoods")},editPage:function(t,e){r.commit("changeEditSwitch",!0),r.state.pagesData=e},showPage:function(){var t=this;d()({url:"/show_page",method:"get",withCredentials:!1}).then(function(e){if(e.data.success){for(var s=e.data.data,a=0;a<s.length;a++)s[a].updateAt=s[a].updateAt.substring(0,10);t.tableData=s}else t.$message.error(e.data.err)})}}}),g={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"baokuan"},[s("div",{staticClass:"add-page"},[s("el-button",{attrs:{type:"primary",plain:""},on:{click:t.addPage}},[t._v("新增爆款单页")])],1),t._v(" "),s("div",{staticClass:"lists"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[s("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"pagename",label:"单页名称",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"visited",width:"120",label:"浏览人数"}}),t._v(" "),s("el-table-column",{attrs:{prop:"copied",width:"120",label:"复制口令人数"}}),t._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{staticClass:"copyBtn",attrs:{size:"small",type:"success","data-clipboard-text":t.copyTxt+e.row.class},on:{click:t.copy}},[t._v("复制链接")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.addGoods(e.$index,e.row)}}},[t._v("添加商品链接")]),t._v(" "),s("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(s){t.editPage(e.$index,e.row)}}},[t._v("修改单页名称")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.showGoods(e.$index,e.row)}}},[t._v("商品信息")])]}}])})],1)],1),t._v(" "),t.isAddSwitch?s("div",{staticClass:"modal"},[s("page",{attrs:{str:t.addStr,method:t.addMethod,classSwitch:t.classSwitch1},on:{edit:t.edit}})],1):t._e(),t._v(" "),t.isEditSwitch?s("div",{staticClass:"modal"},[s("page",{attrs:{str:t.editStr,method:t.editMethod,classSwitch:t.classSwitch2},on:{edit:t.edit}})],1):t._e()])},staticRenderFns:[]};var w=s("VU/8")(v,g,!1,function(t){s("xtgp")},"data-v-a45bacb8",null).exports,_={data:function(){return{name:"",content:"",gonghao:"",code:"",qr_code_url:"",gonghaoList:[],tableData:[],isUpdate:!1,isShow:!1}},mounted:function(){this.showList(),this.getGonghaoList()},methods:{add:function(){this.isShow=!0},cancel:function(){this.name=this.content=this.code="",this.isShow=!1},create:function(){var t=this;d()({url:"/qr_code/create",method:"post",data:{name:this.name,content:this.content,code:this.code}}).then(function(e){""==e.data.data?t.$message.error("创建失败"):(t.$message({type:"success",message:"创建成功"}),t.showList(),t.name=t.content=t.code="",t.isShow=!1)})},getGonghaoList:function(){var t=this;d()({url:"/qr_code/get_code",method:"get"}).then(function(e){t.gonghaoList=e.data.codes})},showList:function(){var t=this;d()({url:"/qr_code/show",method:"get"}).then(function(e){for(var s=e.data.codes,a=e.data.data,i=0,o=s.length;i<o;i++)for(var n=0,l=a.length;n<l;n++)s[i].code==a[n].code&&(a[n].gonghao=s[i].name);t.tableData=a})},update:function(t){console.log(t),this.isUpdate=!0,this.name=t.name,this.content=t.content,this.code=t.code,this.qr_code_url=t.qr_code_url,this.isShow=!0},deleteOne:function(t){var e=this;d()({url:"/qr_code/deleteOne",method:"post",data:{id:t._id}}).then(function(t){e.$message({type:"success",message:t.data.success}),""==t.data.data?e.tableData=[]:e.showList()})},save:function(){var t=this;d()({url:"/qr_code/update",method:"post",data:{name:this.name,content:this.content,code:this.code}}).then(function(e){console.log(e.data.data),""==e.data.data?t.$message.error("修改失败"):(t.$message({type:"success",message:"修改成功"}),t.showList(),t.name=t.content=t.code="",t.isShow=!1)})}}},b={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"add-message"},[t.isShow?t._e():s("el-button",{staticStyle:{"margin-bottom":"30px"},attrs:{type:"primary"},on:{click:function(e){t.add()}}},[t._v("新增小说二维码")]),t._v(" "),t.isShow?t._e():s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[s("el-table-column",{attrs:{prop:"name",label:"二维码名称"}}),t._v(" "),s("el-table-column",{attrs:{prop:"content",label:"关注后回复内容"}}),t._v(" "),s("el-table-column",{attrs:{prop:"gonghao",label:"公号"}}),t._v(" "),s("el-table-column",{attrs:{prop:"qr_code_url",label:"二维码",width:"120"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("img",{staticClass:"qr_img",attrs:{src:t.row.qr_code_url}})]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(s){t.update(e.row)}}},[t._v("修改")]),t._v(" "),s("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(s){t.deleteOne(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.isShow?s("div",{staticClass:"wrapper"},[s("h3",{staticClass:"wrap-title"},[t._v("添加/修改二维码")]),t._v(" "),s("el-form",{attrs:{"label-width":"120px",size:"mini"}},[s("el-form-item",{attrs:{label:"二维码名称",prop:"name"}},[s("el-input",{staticStyle:{width:"300px"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"关注回复内容",prop:"content"}},[s("el-input",{staticStyle:{width:"300px"},attrs:{type:"textarea",rows:"5"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"选择公号"}},[s("el-radio-group",{model:{value:t.code,callback:function(e){t.code=e},expression:"code"}},t._l(t.gonghaoList,function(e,a){return s("el-radio",{key:a,staticStyle:{margin:"10px"},attrs:{label:e.code}},[t._v(t._s(e.name))])}))],1),t._v(" "),s("el-form-item",{attrs:{size:"large"}},[t.isUpdate?s("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("保存")]):s("el-button",{attrs:{type:"primary"},on:{click:t.create}},[t._v("立即生成")]),t._v(" "),s("el-button",{attrs:{type:"info"},on:{click:t.cancel}},[t._v("取消")])],1)],1)],1):t._e()],1)},staticRenderFns:[]};var k=s("VU/8")(_,b,!1,function(t){s("OOt1")},"data-v-120f1e27",null).exports,y=(new f.a(".copyBtn"),{data:function(){return{form:{},imgUrl:"",isShow:!1,tableData:[],isUpdate:!1,ad_imgUrl:""}},mounted:function(){this.show()},methods:{add:function(){this.isShow=!0},handleAvatarSuccess:function(t,e){this.imgUrl="http://www.rrdtjj.top/images/tuiguang/"+t.filename,this.form.avator=this.imgUrl},imgUpload:function(t,e){this.ad_imgUrl="http://www.rrdtjj.top/images/tuiguang/"+t.filename,this.form.ad_img=this.ad_imgUrl},create:function(){var t=this;d()({url:"/tuiguang/novel/add",method:"post",data:{type:this.form.type,id:this.form.id,title:this.form.title,headline:this.form.headline,gonghao:this.form.gonghao,author:this.form.author,avator:this.form.avator,content:this.form.content,linkUrl:this.form.linkUrl,ad_img:this.form.ad_img,statisticsUrl:this.form.statisticsUrl}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={},t.imgUrl=t.ad_imgUrl="",t.isShow=!1,t.show()})},reset:function(){this.form={}},deleteOne:function(t){var e=this,s=this;d()({url:"/tuiguang/novel/delete_one",method:"post",data:{id:t.id}}).then(function(t){s.$message({type:"success",message:t.data.message}),e.show()})},copy:function(){this.$message({type:"success",message:"复制成功"})},show:function(){var t=this;d()({url:"/tuiguang/novel/show",method:"get"}).then(function(e){t.tableData=e.data.data})},update:function(t){this.form=t,this.isUpdate=this.isShow=!0,this.imgUrl=this.form.avator},cancel:function(){this.isShow=this.isUpdate=!1,this.form={},this.imgUrl=this.ad_imgUrl=""},save:function(){var t=this;d()({url:"/tuiguang/novel/update",method:"post",data:{_id:this.form._id,type:this.form.type,id:this.form.id,title:this.form.title,headline:this.form.headline,gonghao:this.form.gonghao,author:this.form.author,avator:this.form.avator,content:this.form.content,linkUrl:this.form.linkUrl,ad_img:this.form.ad_img,statisticsUrl:this.form.statisticsUrl}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={},t.imgUrl=t.ad_imgUrl="",t.isShow=t.isUpdate=!1})}}}),S={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"novel-link"},[t.isShow?t._e():s("el-button",{staticStyle:{"margin-bottom":"30px"},attrs:{type:"primary"},on:{click:function(e){t.add()}}},[t._v("新增小说链接")]),t._v(" "),t.isShow?t._e():s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[s("el-table-column",{attrs:{prop:"type",label:"类型",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(1==e.row.type?"跳转":"非微跳")+"\n            ")]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"id",label:"id",width:"80"}}),t._v(" "),s("el-table-column",{attrs:{prop:"headline",label:"文章标题",width:"180"}}),t._v(" "),s("el-table-column",{attrs:{prop:"gonghao",label:"公号",width:"180"}}),t._v(" "),s("el-table-column",{attrs:{prop:"avator",label:"图片",width:"200"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("img",{staticClass:"beauty",attrs:{src:t.row.avator}})]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{staticClass:"copyBtn",attrs:{"data-clipboard-text":1==e.row.type?"http://www.jswoge.top/tuiguang/novel/"+e.row.id:"http://www.jswoge.top/tuiguang/unjump/"+e.row.id,type:"success",size:"small"},on:{click:t.copy}},[t._v("复制链接")]),t._v(" "),s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(s){t.update(e.row)}}},[t._v("修改")]),t._v(" "),s("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(s){t.deleteOne(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.isShow?s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",size:"mini"}},[s("el-form-item",{attrs:{label:"是否跳转"}},[s("el-switch",{attrs:{disabled:t.isUpdate,"active-color":"#13ce66"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"id"}},[s("el-input",{staticStyle:{width:"100px"},attrs:{disabled:t.isUpdate},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"页面标题"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"文章标题"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.headline,callback:function(e){t.$set(t.form,"headline",e)},expression:"form.headline"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"公号名称"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.gonghao,callback:function(e){t.$set(t.form,"gonghao",e)},expression:"form.gonghao"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"公号描述"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.author,callback:function(e){t.$set(t.form,"author",e)},expression:"form.author"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"图片",prop:"imageFile"}},[s("el-upload",{attrs:{"show-file-list":!1,enctype:"multipart/form-data",name:"imageFile",action:"http://www.rrdtjj.top/tuiguang/novel/upload","on-success":t.handleAvatarSuccess}},[s("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),t.imgUrl?s("img",{staticClass:"b_img",attrs:{src:t.imgUrl,alt:"",width:"200"}}):t._e()],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"文章内容",prop:"content"}},[s("el-input",{staticStyle:{width:"500px"},attrs:{type:"textarea"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1),t._v(" "),t.form.type?s("el-form-item",{attrs:{label:"跳转链接"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.linkUrl,callback:function(e){t.$set(t.form,"linkUrl",e)},expression:"form.linkUrl"}})],1):s("el-form-item",{attrs:{label:"广告图片",prop:"ad_img"}},[s("el-upload",{attrs:{"show-file-list":!1,enctype:"multipart/form-data",name:"ad_img",action:"http://www.rrdtjj.top/tuiguang/novel/upload_ad","on-success":t.imgUpload}},[s("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),t.ad_imgUrl?s("img",{staticClass:"b_img",attrs:{src:t.ad_imgUrl,alt:"",width:"200"}}):t._e()],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"统计链接"}},[s("el-input",{staticStyle:{width:"500px"},model:{value:t.form.statisticsUrl,callback:function(e){t.$set(t.form,"statisticsUrl",e)},expression:"form.statisticsUrl"}})],1),t._v(" "),s("el-form-item",{attrs:{size:"large"}},[t.isUpdate?s("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("保存")]):s("el-button",{attrs:{type:"primary"},on:{click:t.create}},[t._v("立即创建")]),t._v(" "),t.isUpdate?t._e():s("el-button",{attrs:{type:"info"},on:{click:t.reset}},[t._v("重置")]),t._v(" "),s("el-button",{attrs:{type:"danger"},on:{click:t.cancel}},[t._v("取 消")])],1)],1):t._e()],1)},staticRenderFns:[]};var x={data:function(){return{form:{links:[]},tableData:[],link:"",isShow:!1,isUpdate:!1}},mounted:function(){this.showList()},methods:{add:function(){this.isShow=!0},update:function(t){this.isShow=!0,this.isUpdate=!0,this.form=t},deleteOne:function(t){var e=this;d()({url:"/transfer/delete",method:"get",params:{id:t._id}}).then(function(t){e.$message({type:"success",message:t.data.success}),e.showList()})},deleteLink:function(t){this.form.links.splice(t,1)},addOne:function(){""==this.link?this.$message.error("链接不能为空"):(this.form.links.push(this.link),this.link="")},save:function(){var t=this;d()({url:"/transfer/update",method:"post",data:{_id:this.form._id,id:this.form.id,title:this.form.title,links:this.form.links}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),t.isShow=t.isUpdate=!1,t.showList(),t.form=""):t.$message.error(e.data.err)})},create:function(){var t=this;d()({url:"/transfer/create",method:"post",data:{id:this.form.id,title:this.form.title,links:this.form.links}}).then(function(e){e.data.success?t.$message({type:"success",message:e.data.success}):t.$message.error(e.data.err)}),this.form={},this.isShow=!1},cancel:function(){this.form={},this.isUpdate=!1,this.isShow=!1},showList:function(){var t=this;d()({url:"/transfer",method:"get"}).then(function(e){t.tableData=e.data.messages})}}},U={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"random-links"},[t.isShow?s("div",{staticClass:"form-con"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"",prop:"id"}},[s("h2",[t._v("添加/修改链接")])]),t._v(" "),s("el-form-item",{attrs:{label:"id",prop:"id"}},[s("el-input",{ref:"id",staticStyle:{width:"200px"},attrs:{prop:"id"},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"title",prop:"title"}},[s("el-input",{ref:"title",staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"link",prop:"link"}},[s("el-input",{ref:"link",staticStyle:{width:"600px"},attrs:{prop:"link"},model:{value:t.link,callback:function(e){t.link=e},expression:"link"}}),t._v(" "),s("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:t.addOne}},[t._v("添加")])],1),t._v(" "),s("el-form-item",{attrs:{label:"links",prop:"links"}},[s("ul",t._l(t.form.links,function(e,a){return s("li",{key:a},[s("span",[t._v(t._s(e))]),t._v(" "),s("el-button",{attrs:{type:"danger"},on:{click:function(e){t.deleteLink(a)}}},[t._v("X")])],1)}))]),t._v(" "),s("el-form-item",{attrs:{prop:"links"}},[t.isUpdate?s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.save()}}},[t._v("保存")]):s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.create()}}},[t._v("创建")]),t._v(" "),s("el-button",{attrs:{type:"info"},on:{click:function(e){t.cancel()}}},[t._v("取消")])],1)],1)],1):s("div",[s("el-button",{attrs:{type:"success"},on:{click:function(e){t.add()}}},[t._v("添加新链接")]),t._v(" "),s("el-table",{staticClass:"wrapper",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[s("el-table-column",{attrs:{prop:"id",label:"url"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v("http://www.baidu.com/"+t._s(e.row.id))])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"title",label:"title"}}),t._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.update(e.row)}}},[t._v("修改")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(s){t.deleteOne(e.row)}}},[t._v("删除")])]}}])})],1)],1)])},staticRenderFns:[]};var $={components:{baokuan:w,qrCode:k,novelLink:s("VU/8")(y,S,!1,function(t){s("iUzQ")},"data-v-0e5955e8",null).exports,randomLinks:s("VU/8")(x,U,!1,function(t){s("0Ldl")},"data-v-4a366d06",null).exports},data:function(){return{activeIndex:"1"}},mounted:function(){},methods:{aaa:function(t,e){this.activeIndex=t}}},C={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("el-menu",{attrs:{"default-active":t.activeIndex,mode:"horizontal"},on:{select:t.aaa}},[s("el-menu-item",{attrs:{index:"1"}},[t._v("爆款单页")]),t._v(" "),s("el-menu-item",{attrs:{index:"2"}},[t._v("小说二维码")]),t._v(" "),s("el-menu-item",{attrs:{index:"3"}},[t._v("小说链接")]),t._v(" "),s("el-menu-item",{attrs:{index:"4"}},[t._v("随机链接")])],1),t._v(" "),s("div",{staticClass:"wrapper"},["1"==t.activeIndex?s("baokuan"):t._e(),t._v(" "),"2"==t.activeIndex?s("qr-code"):t._e(),t._v(" "),"3"==t.activeIndex?s("novel-link"):t._e(),t._v(" "),"4"==t.activeIndex?s("random-links"):t._e()],1)],1)},staticRenderFns:[]};var L=s("VU/8")($,C,!1,function(t){s("lSTC")},"data-v-333d7eda",null).exports,D={props:{row:Object},data:function(){return{form:{updateAt:"",title:"",links:""}}},mounted:function(){this.form=this.row},methods:{close:function(){r.commit("changeUpdateLinksSwitch",!1)},save:function(){var t=this;console.log(this.row),this.form.title&&this.form.links?d()({url:"/fetchlink?action=edit_links",method:"get",withCredentials:!1,params:{title:this.form.title,links:this.form.links,id:this.row._id,class:this.row.class}}).then(function(e){e.data.success?(t.$message({type:"success",message:e.data.success}),d()({url:"/top10/get_one",method:"POST",withCredentials:!1,data:{key:t.form.title,class:t.row.class,url:t.form.links}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={}}),t.$emit("edit"),r.commit("changeUpdateLinksSwitch",!1)):t.$message.error(e.data.err)}):this.$message.error("输入有误，请重新输入")}}},G={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v("链接修改")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"page"},[s("el-form-item",{staticStyle:{},attrs:{label:"标题",prop:"title"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{staticStyle:{},attrs:{label:"链接",prop:"links"}},[s("el-input",{staticStyle:{width:"300px",float:"none"},model:{value:t.form.links,callback:function(e){t.$set(t.form,"links",e)},expression:"form.links"}})],1)],1),t._v(" "),s("div",{staticClass:"save"},[s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.save}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var z=s("VU/8")(D,G,!1,function(t){s("tTXE")},"data-v-0b49c57c",null).exports;window.onbeforeunload=function(){window.location.href="/"};var A={computed:{isUpdateLinksSwitch:function(){return r.state.isUpdateLinksSwitch}},components:{updateLinks:z},data:function(){return{row:{},form:{},linkslist:[],row1:{}}},mounted:function(){function t(t){for(var e=window.document.cookie.split("; "),s=0;s<e.length;s++){var a=e[s].split("=");if(t==a[0])return unescape(a[1])}return null}this.row=r.state.goodsData,this.form.pagename=this.row.pagename;var e=t("classname"),s=t("pagename");this.row.class=e,this.row.pagename=s,this.showLinks()},methods:{edit:function(){this.showLinks()},addGoods:function(){var t=this,e=this.$refs.links.$refs.input.value,s=this.$refs.title.$refs.input.value;""!=e&&""!=s&&d()({url:"/fetchlink/save_links",method:"POST",withCredentials:!1,data:{links:e,class:this.row.class,title:s}}).then(function(a){a.data.success?(t.$message({type:"success",message:a.data.success}),t.showLinks(),d()({url:"/top10/get_one",method:"POST",withCredentials:!1,data:{key:s,class:t.row.class,url:e}}).then(function(e){t.$message({type:"success",message:e.data.message}),t.form={}})):t.$message.error(a.data.err)})},deleteLinks:function(t,e){var s=this;d()({url:"/fetchlink?action=delete_links",method:"get",withCredentials:!1,params:{class:e.class,id:e._id}}).then(function(t){t.data.success&&(1==t.data.result.length?(s.$message({type:"success",message:"已删除最后一条数据"}),s.linkslist=[]):(s.$message({type:"success",message:t.data.success}),s.showLinks()))})},updateLink:function(t,e){this.row1=e,r.commit("changeUpdateLinksSwitch",!0)},showLinks:function(){var t=this;d()({url:"/fetchlink?action=show_links",method:"get",withCredentials:!1,params:{class:this.row.class}}).then(function(e){if(e.data.success){for(var s=e.data.data,a=0;a<s.length;a++)s[a].updateAt=s[a].updateAt.substring(0,10);t.linkslist=s}else t.$message.error(e.data.err)})},close:function(){this.$router.push("/baokuan")}}},E={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update-page"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v("添加商品")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"pagename"},[s("el-form-item",{staticStyle:{},attrs:{label:"单页名称",prop:"pagename"}},[t._v("\n                "+t._s(t.row.pagename)+"\n            ")])],1),t._v(" "),s("div",{staticClass:"goods-detail"},[s("el-form-item",{staticStyle:{float:"left"},attrs:{label:"商品名称",prop:"title"}},[s("el-input",{ref:"title",staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{staticStyle:{float:"left"},attrs:{label:"商品链接",prop:"links"}},[s("el-input",{ref:"links",staticStyle:{width:"400px"},attrs:{prop:"links"},model:{value:t.form.links,callback:function(e){t.$set(t.form,"links",e)},expression:"form.links"}})],1),t._v(" "),s("el-button",{staticStyle:{width:"100px",float:"left","margin-left":"10px"},attrs:{plain:"",type:"success"},on:{click:t.addGoods}},[t._v("添加")]),t._v(" "),s("div",{staticStyle:{clear:"both"}}),t._v(" "),s("div",{staticClass:"left"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.linkslist,border:""}},[s("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),s("el-table-column",{attrs:{prop:"links",width:"500",label:"链接"}}),t._v(" "),s("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.updateLink(e.$index,e.row)}}},[t._v("修改链接")]),t._v(" "),s("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(s){t.deleteLinks(e.$index,e.row)}}},[t._v("删除链接")])]}}])})],1)],1)],1)]),t._v(" "),t.isUpdateLinksSwitch?s("div",{staticClass:"modal"},[s("update-links",{attrs:{row:t.row1},on:{edit:t.edit}})],1):t._e()],1)},staticRenderFns:[]};var O=s("VU/8")(A,E,!1,function(t){s("tk+/")},"data-v-7dcb6580",null).exports,q={data:function(){return{form:{pagename:"",title:"",token:""},imageUrl:"",pictUrl:""}},mounted:function(){this.form=r.state.goodsListData},methods:{handleAvatarSuccess:function(t,e){this.imageUrl=URL.createObjectURL(e.raw),this.pictUrl=t.filename},cancel:function(){r.commit("changeUpdateGoodsSwitch",!1)},saveGood:function(){var t=this;""==this.pictUrl&&(this.pictUrl=this.form.pictUrl),d()({url:"/goodsinfo?action=update_goods",method:"get",withCredentials:!1,params:{class:this.form.class,id:this.form._id,pictUrl:"/uploads/"+this.pictUrl,title:this.form.title,token:this.form.token}}).then(function(e){e.data.success?(t.$message({type:"success",message:"商品信息修改成功"}),t.$emit("edit"),r.commit("changeUpdateGoodsSwitch",!1)):t.$message.error(e.data.err)})}}},T={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update-goods"},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[s("div",{staticClass:"goods-desc"},[s("el-form-item",{attrs:{rules:[{required:!0}],label:"图片",prop:"imageFile"}},[s("el-upload",{attrs:{enctype:"multipart/form-data",action:"http://www.rrdtjj.top/goodsinfo/upload",name:"imageFile","on-success":t.handleAvatarSuccess}},[t.imageUrl?s("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),s("el-form-item",{attrs:{rules:[{required:!0,message:"商品名称不能为空"}],label:"商品名称",prop:"title"}},[s("el-input",{staticStyle:{width:"400px"},attrs:{prop:"title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{attrs:{rules:[{required:!0,message:"淘口令不能为空"}],label:"淘口令",prop:"token"}},[s("el-input",{staticStyle:{width:"400px"},attrs:{prop:"token"},model:{value:t.form.token,callback:function(e){t.$set(t.form,"token",e)},expression:"form.token"}})],1),t._v(" "),s("div",{staticClass:"submit-btn"},[s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"danger"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),s("el-button",{staticStyle:{width:"150px"},attrs:{plain:"",type:"success"},on:{click:t.saveGood}},[t._v("保存")])],1)],1)])],1)},staticRenderFns:[]};var j=s("VU/8")(q,T,!1,function(t){s("NGzF")},"data-v-39c765d4",null).exports;window.onbeforeunload=function(){window.location.href="/"};var F={computed:{isUpdateGoodsSwitch:function(){return r.state.isUpdateGoodsSwitch}},components:{updateGoods:j},data:function(){return{row:{},goodslist:[]}},mounted:function(){function t(t){for(var e=window.document.cookie.split("; "),s=0;s<e.length;s++){var a=e[s].split("=");if(t==a[0])return unescape(a[1])}return null}this.row=r.state.goodsData;var e=t("classname"),s=t("pagename");this.row.class=e,this.row.pagename=s,this.showInfo(this.row)},methods:{removeGoods:function(t){this.goodslist.splice(t,1)},edit:function(){this.showInfo(this.row),console.log(this.row)},close:function(){this.$router.push("/baokuan")},updateInfo:function(t,e){r.state.isUpdateGoodsSwitch=!0,r.commit("setGoodsListData",e)},deleteOne:function(t,e){var s=this;d()({url:"/goodsinfo?action=delete_one",method:"get",withCredentials:!1,params:{class:e.class,id:e._id}}).then(function(t){t.data.success&&(console.log(t.data),1==t.data.result.length?(s.$message({type:"success",message:"已删除最后一条数据"}),s.goodslist=[]):(s.$message({type:"success",message:t.data.success}),s.showInfo(s.row)))})},showInfo:function(t){var e=this;d()({url:"/goodsinfo?action=show_goods",method:"get",withCredentials:!1,params:{class:t.class}}).then(function(t){if(t.data.success){for(var s=t.data.data,a=0;a<s.length;a++)s[a].updateAt=s[a].updateAt.substring(0,10);e.goodslist=s}else e.$message.error(t.data.err)})}}},R={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"update-page"},[s("el-form",{ref:"form",attrs:{"label-width":"80px"}},[s("div",{staticClass:"header"},[s("h3",[t._v("商品信息展示")]),t._v(" "),s("div",{staticClass:"close",on:{click:t.close}},[t._v("×")])]),t._v(" "),s("div",{staticClass:"pagename"},[s("el-form-item",{staticStyle:{},attrs:{label:"单页名称",prop:"pagename"}},[t._v("\n                "+t._s(t.row.pagename)+"\n            ")])],1),t._v(" "),s("div",{staticClass:"goods-detail"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.goodslist,border:""}},[s("el-table-column",{attrs:{prop:"updateAt",label:"日期",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),s("el-table-column",{attrs:{prop:"token",width:"150",label:"淘口令"}}),t._v(" "),s("el-table-column",{attrs:{prop:"pictUrl",width:"477",label:"图片地址"}}),t._v(" "),s("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.updateInfo(e.$index,e.row)}}},[t._v("修改商品信息")]),t._v(" "),s("el-button",{staticStyle:{float:"none"},attrs:{size:"small",type:"danger"},on:{click:function(s){t.deleteOne(e.$index,e.row)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),t.isUpdateGoodsSwitch?s("div",{staticClass:"goods-update"},[s("update-goods",{on:{edit:t.edit}})],1):t._e()])],1)},staticRenderFns:[]};var I=s("VU/8")(F,R,!1,function(t){s("47Mu")},"data-v-b89526d2",null).exports;a.default.use(n.a);var M=new n.a({mode:"history",routes:[{path:"/baokuan",component:L,meta:{title:"首页"}},{path:"/baokuan/addLinks",component:O,meta:{title:"添加商品链接"}},{path:"/baokuan/showGoods",component:I,meta:{title:"详细商品信息"}}]}),P=s("zL8q"),V=s.n(P);s("tvR6");d.a.defaults.withCredentials=!0,a.default.config.productionTip=!1,a.default.use(V.a),new a.default({el:"#app",router:M,components:{App:o},template:"<App/>"})},NXHp:function(t,e){},OOt1:function(t,e){},iUzQ:function(t,e){},lSTC:function(t,e){},r4zD:function(t,e){},tTXE:function(t,e){},"tk+/":function(t,e){},tvR6:function(t,e){},xtgp:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.c4d33c5585ef39a1bc1d.js.map
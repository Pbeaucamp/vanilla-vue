(function(e){function t(t){for(var s,n,i=t[0],c=t[1],l=t[2],d=0,m=[];d<i.length;d++)n=i[d],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&m.push(r[n][0]),r[n]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);u&&u(t);while(m.length)m.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],s=!0,i=1;i<a.length;i++){var c=a[i];0!==r[c]&&(s=!1)}s&&(o.splice(t--,1),e=n(n.s=a[0]))}return e}var s={},r={app:0},o=[];function n(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=s,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(a,s,function(t){return e[t]}.bind(null,s));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=c;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"11e3":function(e,t,a){"use strict";a("c03a")},"22bc":function(e,t,a){e.exports=a.p+"img/icon_vanilla.1c9b3430.png"},"294d":function(e,t,a){"use strict";a("9ea8")},"3db6":function(e,t,a){e.exports=a.p+"img/vanilla_white.34deb758.png"},4396:function(e,t,a){e.exports=a.p+"img/BPMConseil.0f4f5753.png"},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{staticClass:"grey lighten-4"},[e.loaded?a("div",[a("Navbar"),a("v-main",{staticClass:"mx-4 mb-4 pb-15"},[a("router-view")],1),e._l(e.snackbars.data,(function(t,s){return a("v-snackbar",{key:t.id,style:"bottom: "+(4*s+1)+"em",attrs:{right:"",rounded:"pill",color:t.color,timeout:"5000"},scopedSlots:e._u([{key:"action",fn:function(s){var r=s.attrs;return[a("v-btn",e._b({attrs:{icon:"",text:""},on:{click:function(a){return e.removeSnackbar(t)}}},"v-btn",r,!1),[a("v-icon",[e._v(" mdi-close-circle ")])],1)]}}],null,!0),model:{value:t.aff,callback:function(a){e.$set(t,"aff",a)},expression:"snackbar.aff"}},[e._v(" "+e._s(t.text)+" ")])})),a("Footer")],2):e._e(),e.loaded||""==e.groups.selected?a("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:e.dialogGroup,callback:function(t){e.dialogGroup=t},expression:"dialogGroup"}},[a("v-card",[a("v-card-title",[a("h2",{staticClass:"subheading grey--text"},[e._v("Choisir un groupe")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-select",{staticClass:"mx-2",attrs:{items:this.groups.data,label:"Groupes",outlined:""},model:{value:e.group,callback:function(t){e.group=t},expression:"group"}})],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"mr-4",attrs:{outlined:"",color:"success"},on:{click:e.selectGroup}},[e._v("Confirmer")])],1)],1)],1):a("div",[a("v-overlay",{attrs:{opacity:"1",value:"true"}},[e.loadingCircular?a("v-progress-circular",{attrs:{indeterminate:"",size:"100"}},[e._v(" "+e._s(e.loadingMsg)+" ")]):a("div",{staticClass:"ma-5"},[e._v(" "+e._s(e.loadingMsg)+" ")])],1)],1)],1)},o=[],n=a("5530"),i=(a("b0c0"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("nav",[s("v-app-bar",{staticClass:"indigo",attrs:{flat:""}},[s("v-app-bar-nav-icon",{staticClass:"white--text",on:{click:function(t){e.drawer=!e.drawer}}}),s("v-toolbar-title",{staticClass:"text-uppercase white--text"},[s("span",{staticClass:"font-weight-light"},[e._v("VANILLA")]),s("span",[e._v(" METADATA")])]),s("v-spacer"),s("v-btn",{staticClass:"mx-3",attrs:{text:"",rounded:"",target:"_blank",rel:"noopener noreferrer",href:"https://semaphore-vanilla.data4citizen.com/vanilla"}},[s("v-img",{attrs:{contain:"","max-height":"100","max-width":"120",src:a("3db6")}}),s("v-icon",{staticClass:"ml-1 mt-1",attrs:{medium:"",color:"white"}},[e._v("mdi-open-in-new")])],1)],1),s("v-navigation-drawer",{staticClass:"indigo",attrs:{app:"",temporary:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[s("v-layout",{attrs:{column:"","align-center":""}},[s("v-flex",{staticClass:"mt-5"},[s("v-avatar",{attrs:{size:"100"}},[s("img",{attrs:{src:a("22bc")}})])],1)],1),s("v-list",e._l(e.links,(function(t){return s("v-list-item",{key:t.text,attrs:{to:t.route}},[s("v-list-item-action",[s("v-icon",{staticClass:"white--text"},[e._v(e._s(t.icon))])],1),s("v-list-item-content",[s("v-list-item-title",{staticClass:"white--text"},[e._v(e._s(t.text))])],1)],1)})),1)],1)],1)}),c=[],l={name:"Navbar",data:function(){return{drawer:!1,links:[{icon:"mdi-view-dashboard",text:"Dashboard",route:"/"}]}}},u=l,d=a("2877"),m=a("6544"),v=a.n(m),p=a("40dc"),f=a("5bc1"),g=a("8212"),h=a("8336"),b=a("0e8f"),y=a("132d"),S=a("adda"),C=a("a722"),k=a("8860"),x=a("da13"),_=a("1800"),E=a("5d23"),N=a("f774"),T=a("2fa4"),L=a("2a7f"),w=Object(d["a"])(u,i,c,!1,null,null,null),q=w.exports;v()(w,{VAppBar:p["a"],VAppBarNavIcon:f["a"],VAvatar:g["a"],VBtn:h["a"],VFlex:b["a"],VIcon:y["a"],VImg:S["a"],VLayout:C["a"],VList:k["a"],VListItem:x["a"],VListItemAction:_["a"],VListItemContent:E["a"],VListItemTitle:E["b"],VNavigationDrawer:N["a"],VSpacer:T["a"],VToolbarTitle:L["a"]});var R=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-footer",{attrs:{id:"dashboard-core-footer",height:"60",absolute:"",padless:""}},[s("v-container",[s("v-row",{attrs:{align:"center","no-gutters":""}},[s("v-col",{staticClass:"text-center mb-sm-0 mb-5",attrs:{cols:"auto"}},[s("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.bottom_redirect_btn.visible,expression:"$store.state.bottom_redirect_btn.visible"}],attrs:{icon:"",color:"primary"},on:{click:function(t){return e.$store.dispatch("clickBottomBtn")}}},[s("v-icon",{attrs:{size:"24px"}},[e._v("mdi-step-backward")])],1)],1),s("v-col",{staticClass:"text-center mb-sm-0 mb-5",attrs:{cols:"auto"}},[s("v-btn",{attrs:{icon:"",color:"primary",to:"/"}},[s("v-icon",{attrs:{size:"24px"}},[e._v("mdi-home")])],1)],1),s("v-col",{staticClass:"text-center mb-sm-0 mb-5",attrs:{cols:"auto"}},[s("v-btn",{attrs:{text:"",rounded:"",target:"_blank",rel:"noopener noreferrer",href:"https://semaphore-vanilla.data4citizen.com/vanilla"}},[s("v-img",{attrs:{"max-height":"24","max-width":"90",src:a("f9c4")}})],1)],1),s("v-col",{staticClass:"text-center mb-sm-0 mb-5",attrs:{cols:"auto"}},[s("v-btn",{staticClass:"ma-0",attrs:{text:"",rounded:"",target:"_blank",rel:"noopener noreferrer",href:"http://www.bpm-conseil.com/fr"}},[s("v-img",{attrs:{"max-height":"24","max-width":"90",src:a("4396")}})],1)],1),s("v-spacer",{staticClass:"hidden-sm-and-down"}),s("v-col",{attrs:{cols:"12",md:"auto"}},[s("div",{staticClass:"body-1 font-weight-light pt-6 pt-md-0 text-center"},[e._v(" Copyright © BPM-Conseil, 2013 - "+e._s((new Date).getFullYear())+". ")])])],1)],1)],1)},A=[],O={name:"Footer"},Q=O,V=(a("294d"),a("62ad")),D=a("a523"),P=a("553a"),M=a("0fd9"),j=Object(d["a"])(Q,R,A,!1,null,null,null),B=j.exports;v()(j,{VBtn:h["a"],VCol:V["a"],VContainer:D["a"],VFooter:P["a"],VIcon:y["a"],VImg:S["a"],VRow:M["a"],VSpacer:T["a"]});var U=a("2f62"),I={name:"App",components:{Navbar:q,Footer:B},data:function(){return{loaded:!1,loadingMsg:"Loading...",loadingCircular:!0,group:"",dialogGroup:!0}},computed:Object(n["a"])({},Object(U["e"])(["snackbars","groups"])),beforeMount:function(){this.$store.dispatch("getUserGroups",{userLogin:s["a"].$keycloak.tokenParsed.preferred_username})},methods:{removeSnackbar:function(e){this.$store.dispatch("removeSnackbar",e)},selectGroup:function(){""!=this.group&&(this.$store.commit("SELECT_GROUP",this.group),this.dialogGroup=!1,this.loadMetadatas())},loadMetadatas:function(){var e=this;this.$store.commit("SELECT_REPOSITORY","Vanilla"),this.$store.dispatch("getMetadata").then((function(){e.loaded=!0})).catch((function(e){console.log("error getting metadatas : "+e)}))}},watch:{$route:{immediate:!0,handler:function(e){document.title=e.name+" | Vanilla Metadata"||!1}}}},G=I,$=a("7496"),K=a("b0af"),F=a("99d9"),Y=a("169a"),z=a("f6c4"),J=a("a797"),H=a("490a"),W=a("b974"),X=a("2db4"),Z=Object(d["a"])(G,r,o,!1,null,null,null),ee=Z.exports;v()(Z,{VApp:$["a"],VBtn:h["a"],VCard:K["a"],VCardActions:F["a"],VCardText:F["b"],VCardTitle:F["c"],VContainer:D["a"],VDialog:Y["a"],VIcon:y["a"],VMain:z["a"],VOverlay:J["a"],VProgressCircular:H["a"],VRow:M["a"],VSelect:W["a"],VSnackbar:X["a"],VSpacer:T["a"]});var te=a("8c4f"),ae=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dashboard"},[a("h1",{staticClass:"subheading grey--text"},[e._v("Dashboard")]),a("v-container",{staticClass:"my-5"},[a("List"),a("v-row",{attrs:{wrap:""}},[a("v-col",{attrs:{cols:"12",sm:"12",md:"4",lg:"4",xl:"4"}},[a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"500",disabled:!e.tablesLoaded,loading:e.tablesLoading}},[a("v-sheet",{staticClass:"pa-4 primary lighten-1"},[a("v-text-field",{attrs:{label:"Rechercher une table ou une colonne",dark:"",flat:"","solo-inverted":"","hide-details":"",clearable:"","clear-icon":"mdi-close-circle-outline"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),a("v-checkbox",{attrs:{dark:"","hide-details":"",label:"Recherche sensible à la casse"},model:{value:e.caseSensitive,callback:function(t){e.caseSensitive=t},expression:"caseSensitive"}})],1),a("v-card-text",[a("v-treeview",{attrs:{items:e.localTables,"item-key":"id","return-object":"",search:e.search,filter:e.filter,hoverable:"","open-on-click":"",rounded:"",selectable:"","selected-color":"primary","expand-icon":"","on-icon":"mdi-chevron-triple-left","off-icon":"mdi-chevron-triple-right","indeterminate-icon":"mdi-chevron-triple-right"},scopedSlots:e._u([{key:"prepend",fn:function(t){var s=t.item,r=t.open;return[s.file?a("v-icon",[e._v(" "+e._s(e.files[s.file])+" ")]):a("v-icon",[e._v(" "+e._s(r?"mdi-folder-open":"mdi-folder")+" ")])]}}]),model:{value:e.selectedColumns,callback:function(t){e.selectedColumns=t},expression:"selectedColumns"}})],1)],1)],1),a("v-col",{attrs:{cols:"12",sm:"12",md:"8",lg:"8",xl:"8"}},[a("v-card",[e.queryResult.length>0&&e.affResult?a("v-data-table",{staticClass:"elevation-1",attrs:{flat:"",headers:e.resultHeaders,items:e.queryResult,"hide-default-footer":e.queryResult.length<10,search:e.search,"footer-props":{"items-per-page-text":"Résultats par page","page-text":"{0} à {1} sur {2}"},"no-results-text":"Aucun résultat."},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-container",[a("v-row",{staticClass:"ma-2"},[a("h1",{staticClass:"subheading grey--text"},[e._v("Résultats de la requête")]),a("v-spacer"),e.affResult?a("v-btn",{staticClass:"white--text",attrs:{color:"primary lighten-1",depressed:""},on:{click:function(t){e.affResult=!1}}},[a("span",{staticClass:"mr-1"},[e._v(" Requête ")]),a("v-icon",[e._v(" mdi-database-settings ")])],1):e._e()],1)],1)]},proxy:!0}],null,!1,790611349)}):a("v-data-table",{staticClass:"elevation-1",attrs:{flat:"",headers:e.headers,items:e.selectedColumns,"hide-default-footer":e.selectedColumns.length<10,search:e.search,"footer-props":{"items-per-page-text":"Colonnes par page","page-text":"{0} à {1} sur {2}"},"no-results-text":"Aucun résultat."},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-container",[e.affResult?e._e():a("v-row",[a("v-col",{staticClass:"mx-4",attrs:{cols:"12",sm:"12",md:"12",xl:"5"}},[a("h1",{staticClass:"subheading grey--text"},[e._v("Création de requête")])]),a("v-spacer"),a("v-col",{staticClass:"mt-3 text-right",attrs:{cols:"12",sm:"12",md:"12",xl:"6"}},[a("v-row",{attrs:{justify:"end"}},[a("v-col",{staticClass:"pr-1 mx-1 pt-0 ",attrs:{sm:"3",md:"3",xl:"3"}},[e.queryResult.length>0&&!e.affResult?a("v-btn",{staticClass:"white--text",attrs:{color:"primary lighten-1",depressed:""},on:{click:function(t){e.affResult=!0}}},[a("span",{staticClass:"mr-1"},[e._v(" Résultats ")]),a("v-icon",[e._v(" mdi-clipboard-text-outline ")])],1):e._e()],1),a("v-col",{staticClass:"pr-1 mx-1 pt-0 ",attrs:{sm:"3",md:"3",xl:"3"}},[a("v-btn",{staticClass:"white--text",attrs:{loading:e.loadingQueryResult,color:"primary darken-1",depressed:""},on:{click:e.executeQuery}},[a("span",{staticClass:"mr-1"},[e._v(" Exécuter ")]),a("v-icon",[e._v(" mdi-database-search ")])],1)],1),a("v-col",{staticClass:"pl-1 ml-1 mx-0 pt-0 ",attrs:{sm:"4",md:"4",xl:"4"}},[a("v-btn",{staticClass:"white--text",attrs:{color:"green darken-1",depressed:""},on:{click:function(t){e.dialogSaveQuery=!0}}},[a("span",{staticClass:"mr-1"},[e._v(" Sauvegarder ")]),a("v-icon",[e._v(" mdi-content-save ")])],1)],1),a("v-col",{staticClass:"pl-1 ml-1 mx-0 pt-0",attrs:{sm:"3",md:"2",xl:"2"}},[a("v-btn",{staticClass:"white--text px-2",attrs:{color:"green lighten-1",loading:e.loadSQL,depressed:""},on:{click:e.getSQL}},[a("span",{staticClass:"mr-1"},[e._v("SQL")]),a("v-icon",[e._v(" mdi-file-document-multiple-outline ")])],1)],1),a("v-col",{staticClass:"pl-0 ml-1 mx-0 pt-0",attrs:{md:"4",xl:"3"}},[a("v-btn",{staticClass:"white--text px-2",attrs:{color:"orange lighten-1",depressed:""},on:{click:function(t){e.selectedColumns=[]}}},[a("span",{staticClass:"mr-1"},[e._v("Réinitialiser")]),a("v-icon",[e._v(" mdi-close-box-multiple-outline ")])],1)],1),a("v-col",{staticClass:"pl-1 ml-1 mx-0 pt-0 ",attrs:{md:"4",xl:"3"}},[a("v-btn",{staticClass:"white--text px-2",attrs:{color:"green darken-1",loading:e.loadSaved,depressed:""},on:{click:e.getSaved}},[a("span",{staticClass:"mr-1"},[e._v("Charger")]),a("v-icon",[e._v(" mdi-cloud-download-outline ")])],1)],1)],1)],1),a("v-row",{},[a("v-col",{attrs:{md:""}},[a("v-spacer")],1),a("v-col",{attrs:{md:""}},[a("v-spacer")],1),a("v-col",{staticClass:"ml-1"},[a("v-checkbox",{attrs:{label:"Distincte"},model:{value:e.queryDistinct,callback:function(t){e.queryDistinct=t},expression:"queryDistinct"}})],1),a("v-col",{staticClass:"mr-3"},[a("v-text-field",{staticClass:"ml-2",attrs:{label:"Limite",type:"number"},model:{value:e.queryLimit,callback:function(t){e.queryLimit=t},expression:"queryLimit"}})],1)],1)],1)],1)]},proxy:!0}])})],1)],1)],1),a("v-row",{attrs:{justify:"center"}},[a("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:e.dialogSaveQuery,callback:function(t){e.dialogSaveQuery=t},expression:"dialogSaveQuery"}},[a("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-card",[a("v-card-title",[a("h2",{staticClass:"subheading grey--text"},[e._v("Sauvegarder une requête")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{rules:e.nameRules,label:"Nom",required:""},model:{value:e.queryName,callback:function(t){e.queryName=t},expression:"queryName"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Description"},model:{value:e.queryDescription,callback:function(t){e.queryDescription=t},expression:"queryDescription"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"mr-4",attrs:{color:"error",outlined:""},on:{click:e.reset}},[e._v(" Annuler ")]),a("v-btn",{staticClass:"mr-4",attrs:{disabled:!e.valid,loading:e.loadingSaveQuery,outlined:"",color:"success"},on:{click:e.validate}},[e._v("Confirmer")])],1)],1)],1)],1)],1),a("v-row",{attrs:{justify:"center"}},[a("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:e.affSQL,callback:function(t){e.affSQL=t},expression:"affSQL"}},[a("v-card",[a("v-card-title",[a("h2",{staticClass:"subheading grey--text"},[e._v("Requête SQL :")])]),a("v-card-text",[e._v(" "+e._s(e.querySQL)+" ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"mr-4",attrs:{color:"primary darken-1",outlined:""},on:{click:function(t){e.affSQL=!1}}},[e._v(" Fermer ")])],1)],1)],1)],1),a("v-row",{attrs:{justify:"center"}},[a("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:e.affSaved,callback:function(t){e.affSaved=t},expression:"affSaved"}},[a("v-card",[a("v-card-title",[a("h2",{staticClass:"subheading grey--text"},[e._v("Requêtes sauvegardées :")])]),a("v-card-text",[a("v-select",{staticClass:"mx-2",attrs:{items:e.savedQueries,label:"Choisir une requête",outlined:""},model:{value:e.selectedSavedQuery,callback:function(t){e.selectedSavedQuery=t},expression:"selectedSavedQuery"}})],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"mr-4",attrs:{color:"green darken-1",outlined:""},on:{click:function(t){e.affSaved=!1}}},[e._v(" Charger ")]),a("v-btn",{staticClass:"mr-4",attrs:{color:"primary darken-1",outlined:""},on:{click:function(t){e.affSaved=!1}}},[e._v(" Fermer ")])],1)],1)],1)],1)],1)],1)},se=[],re=a("b85c"),oe=(a("d3b7"),a("3ca3"),a("10d1"),a("ddb0"),a("fb6a"),a("7db0"),a("a434"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-col",{staticClass:"d-flex"},[a("v-layout",[a("v-select",{staticClass:"mx-2",attrs:{items:this.metadatas.data,label:"Metadata",outlined:""},model:{value:e.metadata,callback:function(t){e.metadata=t},expression:"metadata"}}),a("v-select",{staticClass:"mx-2",attrs:{disabled:""==e.metadata&&!e.loadModel,items:this.models.data,label:"Business model",outlined:"",loading:e.loadModel},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}}),a("v-select",{staticClass:"mx-2",attrs:{disabled:""==e.model,items:this.packages.data,label:"Business package",outlined:"",loading:e.loadPackages},model:{value:e.bPackage,callback:function(t){e.bPackage=t},expression:"bPackage"}})],1)],1)}),ne=[],ie={data:function(){return{metadata:"",model:"",bPackage:"",loadModel:!1,loadPackages:!1}},computed:Object(n["a"])({},Object(U["e"])(["metadatas","models","packages","Tables"])),methods:Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(U["b"])(["getBusinessModels","getBusinessPackages"])),Object(U["d"])(["SELECT_METADATA","SELECT_MODEL","SELECT_PACKAGE","SET_MODELS","SET_PACKAGES","SET_TABLES"])),{},{getModels:function(){var e=this;this.loadModel=!0,this.model="",this.bPackage="",this.SELECT_METADATA(this.metadata),this.SELECT_MODEL(""),this.SELECT_PACKAGE(""),this.SET_MODELS([]),this.SET_PACKAGES([]),this.SET_TABLES([]),this.getBusinessModels(this.metadata).then((function(){e.loadModel=!1})).catch((function(){e.loadModel=!1}))},getPackages:function(){var e=this;this.loadPackages=!0,this.SELECT_MODEL(this.model),this.SELECT_PACKAGE(""),this.SET_PACKAGES([]),this.SET_TABLES([]),this.getBusinessPackages({metadataName:this.metadata,modelName:this.model}).then((function(){e.loadPackages=!1})).catch((function(){e.loadPackages=!1}))}}),watch:{metadata:function(){""!=this.metadata&&this.getModels()},model:function(){""!=this.model&&this.getPackages()},bPackage:function(){""!=this.bPackage&&this.SELECT_PACKAGE(this.bPackage)}}},ce=ie,le=(a("11e3"),Object(d["a"])(ce,oe,ne,!1,null,"46e49599",null)),ue=le.exports;v()(le,{VCol:V["a"],VLayout:C["a"],VSelect:W["a"]});var de={name:"Dashboard",components:{List:ue},data:function(){return{selectedSavedQuery:"",affSaved:!1,loadSaved:!1,affSQL:!1,loadSQL:!1,loadingQueryResult:!1,affResult:!1,queryDistinct:!1,queryLimit:0,loadingSaveQuery:!1,valid:!0,nameRules:[function(e){return!!e||"Le nom est requis"}],dialogSaveQuery:!1,queryName:"",queryDescription:"",itemKeys:new WeakMap,currentItemKey:0,localTables:[],headers:[{sortable:!1},{text:"Champ",align:"start",value:"name",sortable:!1},{text:"Aggrégation ",value:"agg",sortable:!1},{text:"Position",value:"pos",sortable:!1}],activeColumn:[],selectedColumns:[],search:"",caseSensitive:!1,files:{txt:"mdi-file-document-outline"},tablesLoaded:!1,tablesLoading:!1}},computed:Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(U["e"])(["metadatas","models","packages","tables","queryResult","querySQL","savedQueries"])),Object(U["c"])(["repositoryName","groupName"])),{},{filter:function(){return this.caseSensitive?function(e,t,a){return e[a].indexOf(t)>-1}:void 0},items:function(){var e=[];return e},resultHeaders:function(){if(""!=this.queryResult){var e,t=[],a=Object(re["a"])(this.selectedColumns);try{for(a.s();!(e=a.n()).done;){var s=e.value;t.push({text:s.name,value:s.parent+":"+s.name})}}catch(r){a.e(r)}finally{a.f()}return t}return[]}}),methods:Object(n["a"])(Object(n["a"])({},Object(U["b"])(["getTables","getColumns","addNewSavedQuery","getQueryResult","getTablesAndColumns","getQuerySQL","getSavedQueries"])),{},{getSaved:function(){var e=this;this.loadSaved=!0,this.getSavedQueries({metadataName:this.metadatas.selected,modelName:this.models.selected,packageName:this.packages.selected}).then((function(){e.loadSaved=!1,e.affSaved=!0})).catch((function(){e.loadSaved=!1}))},getSQL:function(){var e=this;this.loadSQL=!0;var t,a="",s=Object(re["a"])(this.selectedColumns);try{for(s.s();!(t=s.n()).done;){var r=t.value;a+=r.parent+":"+r.name+","}}catch(n){s.e(n)}finally{s.f()}var o={metadataName:this.metadatas.selected,modelName:this.models.selected,packageName:this.packages.selected,columns:a,queryName:this.queryName,queryDescription:this.queryDescription,queryLimit:this.queryLimit,queryDistinct:this.queryDistinct};this.getQuerySQL(o).then((function(){e.loadSQL=!1,e.affSQL=!0})).catch((function(){e.loadSQL=!1}))},executeQuery:function(){var e=this;this.loadingQueryResult=!0;var t,a="",s=Object(re["a"])(this.selectedColumns);try{for(s.s();!(t=s.n()).done;){var r=t.value;a+=r.parent+":"+r.name+","}}catch(n){s.e(n)}finally{s.f()}var o={metadataName:this.metadatas.selected,modelName:this.models.selected,packageName:this.packages.selected,columns:a,queryName:this.queryName,queryDescription:this.queryDescription,queryLimit:this.queryLimit,queryDistinct:this.queryDistinct};this.getQueryResult(o).then((function(){e.loadingQueryResult=!1,e.affResult=!0})).catch((function(){e.loadingQueryResult=!1}))},validate:function(){this.$refs.form.validate()&&this.selectedColumns.length>0&&this.saveQuery()},reset:function(){this.$refs.form.reset(),this.dialogSaveQuery=!1},saveQuery:function(){var e=this;this.loadingSaveQuery=!0;var t,a="",s=Object(re["a"])(this.selectedColumns);try{for(s.s();!(t=s.n()).done;){var r=t.value;a+=r.parent+":"+r.name+","}}catch(n){s.e(n)}finally{s.f()}a=a.slice(0,-1);var o={repositoryName:this.repositoryName,groupName:this.groupName,metadataName:this.metadatas.selected,modelName:this.models.selected,packageName:this.packages.selected,columns:a,queryName:this.queryName,queryDescription:this.queryDescription,queryLimit:this.queryLimit,queryDistinct:this.queryDistinct};this.addNewSavedQuery(o).then((function(){e.loadingSaveQuery=!1})).catch((function(){e.loadingSaveQuery=!1}))},mySuperAlert:function(){alert(this.activeColumn)},addColumn:function(){var e=this;void 0==this.selectedColumns.find((function(t){return t.name==e.activeColumn[0]}))&&this.selectedColumns.push({name:this.activeColumn[0]})},removeColumn:function(){var e=this,t=this.selectedColumns.find((function(t){return t.name==e.activeColumn[0]}));void 0!=t&&this.selectedColumns.splice(this.selectedColumns.indexOf(t),1)}}),watch:{packages:{handler:function(){var e=this;""!=this.packages.selected?(this.tablesLoading=!0,this.getTablesAndColumns({metadataName:this.metadatas.selected,modelName:this.models.selected,packageName:this.packages.selected}).then((function(){e.tablesLoaded=!0,e.tablesLoading=!1,e.localTables=e.tables.data}))):this.tablesLoaded=!1},deep:!0},selectedColumns:{handler:function(){for(var e=0;e<this.selectedColumns.length;e++)this.selectedColumns[e].pos=e+1;this.$store.commit("SET_QUERYRESULT",[]),this.affResult=!1},deep:!0},queryDistinct:{handler:function(){this.$store.commit("SET_QUERYRESULT",[]),this.affResult=!1}}}},me=de,ve=a("ac7c"),pe=a("8fea"),fe=a("4bd4"),ge=a("8dd9"),he=a("8654"),be=a("eb2a"),ye=Object(d["a"])(me,ae,se,!1,null,null,null),Se=ye.exports;v()(ye,{VBtn:h["a"],VCard:K["a"],VCardActions:F["a"],VCardText:F["b"],VCardTitle:F["c"],VCheckbox:ve["a"],VCol:V["a"],VContainer:D["a"],VDataTable:pe["a"],VDialog:Y["a"],VForm:fe["a"],VIcon:y["a"],VRow:M["a"],VSelect:W["a"],VSheet:ge["a"],VSpacer:T["a"],VTextField:he["a"],VTreeview:be["a"]});var Ce=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},ke=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",[e._v("Error 404 : Page not found")])])}],xe={name:"NotFound"},_e=xe,Ee=Object(d["a"])(_e,Ce,ke,!1,null,null,null),Ne=Ee.exports;s["a"].use(te["a"]);var Te=[{path:"/",name:"Dashboard",component:Se},{path:"*",component:Ne}],Le=new te["a"]({mode:"history",routes:Te}),we=Le,qe=(a("9911"),a("159b"),a("b64b"),a("ac1f"),a("1276"),a("bc3a")),Re=a.n(qe),Ae=a("7dc5");Re.a.defaults.baseURL=Ae.baseURL,Re.a.defaults.headers.common["X-Gravitee-Api-Key"]="f3510842-ef9b-4ee7-8877-4d59b5d63907",s["a"].use(U["a"]);var Oe=new U["a"].Store({state:{savedQueries:[],querySQL:"",queryResult:[],repositories:{name:"Référentiels",data:[],selected:""},repositoryName:"",groups:{name:"Groupes",data:[],selected:""},groupName:"",metadatas:{name:"Metadatas",data:[],selected:""},models:{name:"Business Models",data:[],selected:""},packages:{name:"Business Packages",data:[],selected:""},tables:{name:"Business Tables ",data:[],columns:[],selected:"",idCount:0},snackbars:{id:0,data:[]},bottom_redirect_btn:{visible:!1,link:""}},mutations:{ADD_SNACKBAR:function(e,t){e.snackbars.data.push(t)},REMOVE_SNACKBAR:function(e,t){e.snackbars.data.splice(t,1)},SET_BOTTOM_REDIRECT_BTN:function(e,t){e.bottom_redirect_btn=t},SET_REPOSITORYNAME:function(e,t){e.repositoryName=t},SET_GROUPS:function(e,t){e.groups.data=t},SET_METADATAS:function(e,t){e.metadatas.data=t},SET_MODELS:function(e,t){e.models.data=t},SET_PACKAGES:function(e,t){e.packages.data=t},SET_TABLES:function(e,t){e.tables.data=t},SELECT_REPOSITORY:function(e,t){e.repositories.selected=t},SELECT_GROUP:function(e,t){e.groups.selected=t},SELECT_METADATA:function(e,t){e.metadatas.selected=t},SELECT_MODEL:function(e,t){e.models.selected=t},SELECT_PACKAGE:function(e,t){e.packages.selected=t},INC_ID:function(e){e.tables.idCount++},SET_QUERYRESULT:function(e,t){e.queryResult=t},SET_QUERYSQL:function(e,t){e.querySQL=t},SET_SAVEDQUERIES:function(e,t){e.savedQueries=t}},actions:{setBottomBtn:function(e,t){var a=e.commit;a("SET_BOTTOM_REDIRECT_BTN",t)},clickBottomBtn:function(e){var t=e.commit,a=e.state;""!=a.bottom_redirect_btn.link&&(we.push(a.bottom_redirect_btn.link),t("SET_BOTTOM_REDIRECT_BTN",{visible:!1,link:""}))},addSnackbar:function(e,t){var a=e.state,s=e.commit,r=e.dispatch;t.id=a.snackbars.id,a.snackbars.id++,s("ADD_SNACKBAR",t),setTimeout((function(e){e("removeSnackbar",t)}),5e3,r)},removeSnackbar:function(e,t){var a=e.state,s=e.commit,r=a.snackbars.data.indexOf(t);-1!=r&&s("REMOVE_SNACKBAR",r)},getGroups:function(e){var t=e.commit;return new Promise((function(e,a){Re.a.get("/groups").then((function(a){if("success"==a.data.status){var s=[];a.data.result.forEach((function(e){return s.push(e.name)})),t("SET_GROUPS",s)}e()})).catch((function(e){e.reponse?console.log("Unable to retrieve groups message : "+e.response.data.message):console.log("Unable to retrieve groups : "+e),a(e)}))}))},getUserGroups:function(e,t){var a=e.commit,s=t.userLogin;return new Promise((function(e,t){Re.a.get("/user/".concat(s,"/groups")).then((function(t){if("success"==t.data.status){var s=[];t.data.result.forEach((function(e){return s.push(e.name)})),a("SET_GROUPS",s)}e()})).catch((function(e){e.reponse?console.log("Unable to retrieve groups message : "+e.response.data.message):console.log("Unable to retrieve groups : "+e),t(e)}))}))},getMetadata:function(e){var t=e.commit,a=e.getters,s=e.dispatch;return new Promise((function(e,r){Re.a.get("/metadatas",{params:{repositoryName:a.repositoryName,groupName:a.groupName}}).then((function(a){"success"==a.data.status&&t("SET_METADATAS",a.data.result),e()})).catch((function(e){e.reponse?console.log("Unable to retrieve metadatas message : "+e.response.data.message):console.log("Unable to retrieve metadatas : "+e),s("addSnackbar",{id:0,aff:!0,text:"Erreur lors de la récupération des Metadatas.",color:"error"}),r(e)}))}))},getBusinessModels:function(e,t){var a=e.commit,s=e.getters,r=e.dispatch;return new Promise((function(e,o){Re.a.get("/models",{params:{repositoryName:s.repositoryName,groupName:s.groupName,metadataName:t}}).then((function(t){"success"==t.data.status&&a("SET_MODELS",t.data.result),e()})).catch((function(e){e.reponse?console.log("Unable to retrieve models message : "+e.response.data.message):console.log("Unable to retrieve models : "+e),r("addSnackbar",{id:0,aff:!0,text:"Erreur lors de la récupération des Business Models.",color:"error"}),o(e)}))}))},getBusinessPackages:function(e,t){var a=e.commit,s=e.getters,r=e.dispatch,o=t.metadataName,n=t.modelName;return new Promise((function(e,t){Re.a.get("/packages",{params:{repositoryName:s.repositoryName,groupName:s.groupName,metadataName:o,modelName:n}}).then((function(t){"success"==t.data.status&&a("SET_PACKAGES",t.data.result),e()})).catch((function(e){e.reponse?console.log("Unable to retrieve packages message : "+e.response.data.message):console.log("Unable to retrieve packages : "+e),r("addSnackbar",{id:0,aff:!0,text:"Erreur lors de la récupération des Business Packages.",color:"error"}),t(e)}))}))},getTablesAndColumns:function(e,t){var a=e.dispatch,s=e.getters,r=e.commit,o=t.metadataName,n=t.modelName,i=t.packageName;return new Promise((function(e,t){Re.a.get("/tables/columns",{params:{repositoryName:s.repositoryName,groupName:s.groupName,metadataName:o,modelName:n,packageName:i}}).then((function(t){if("success"==t.data.status){var s=[];t.data.result.forEach((function(e){a("getTableNewID").then((function(t){var r,o=[],n=Object(re["a"])(e[Object.keys(e)[0]]);try{var i=function(){var t=r.value;a("getTableNewID").then((function(a){o.push({id:a,name:t,parent:Object.keys(e)[0]+"",agg:"NONE",pos:0,file:"txt"})}))};for(n.s();!(r=n.n()).done;)i()}catch(c){n.e(c)}finally{n.f()}s.push({id:t,name:Object.keys(e)[0],children:o})}))})),r("SET_TABLES",s)}e()})).catch((function(e){e.reponse?console.log("Unable to retrieve tables message : "+e.response.data.message):console.log("Unable to retrieve tables : "+e),a("addSnackbar",{id:0,aff:!0,text:"Erreur lors de la récupération des Tables.",color:"error"}),t(e)}))}))},getTables:function(e,t){var a=e.commit,s=e.getters,r=e.dispatch,o=t.metadataName,n=t.modelName,i=t.packageName;return new Promise((function(e,t){Re.a.get("/tables",{params:{repositoryName:s.repositoryName,groupName:s.groupName,metadataName:o,modelName:n,packageName:i}}).then((function(t){if("success"==t.data.status){var s=[];t.data.result.forEach((function(e){r("getTableNewID").then((function(t){s.push({id:t,name:e,children:[]})}))})),a("SET_TABLES",s)}e()})).catch((function(e){e.reponse?console.log("Unable to retrieve tables message : "+e.response.data.message):console.log("Unable to retrieve tables : "+e),r("addSnackbar",{id:0,aff:!0,text:"Erreur lors de la récupération des Tables.",color:"error"}),t(e)}))}))},getColumns:function(e,t){var a=e.commit,s=e.getters,r=e.dispatch,o=t.metadataName,n=t.modelName,i=t.packageName,c=t.tableName;return new Promise((function(e,t){Re.a.get("/columns",{params:{repositoryName:s.repositoryName,groupName:s.groupName,metadataName:o,modelName:n,packageName:i,tableName:c}}).then((function(t){if("success"==t.data.status){var o=s.tables,n=o.find((function(e){return e.name==c}));t.data.result.forEach((function(e){r("getTableNewID").then((function(t){n.children.push({id:t,name:e,file:"txt"})}))}))}a("SET_TABLES",o),e()})).catch((function(e){e.reponse?console.log("Unable to retrieve columns message : "+e.response.data.message):console.log("Unable to retrieve columns : "+e),r("addSnackbar",{id:0,aff:!0,text:"Erreur lors de la récupération des colonnes.",color:"error"}),t(e)}))}))},addNewSavedQuery:function(e,t){var a=e.dispatch;return new Promise((function(e,s){Re.a.post("/query/save",t,{}).then((function(t){"success"===t.data.status&&(a("addSnackbar",{id:0,aff:!0,text:"La requête a été sauvegardée.",color:"success"}),e("Query successfully saved !"))})).catch((function(e){e.response?console.log("Error saving query : "+e.response.data.message):console.log("Error saving query : "+e),s("Error saving query")}))}))},getQueryResult:function(e,t){var a=e.commit,s=e.getters,r=t.metadataName,o=t.modelName,n=t.packageName,i=t.columns,c=t.queryLimit,l=t.queryDistinct;return new Promise((function(e,t){Re.a.get("/query/result",{params:{repositoryName:s.repositoryName,groupName:s.groupName,metadataName:r,modelName:o,packageName:n,columns:i,queryLimit:c,queryDistinct:l}}).then((function(t){if("success"===t.data.status){var s=[],r=i.split(","),o=t.data.result.substring(1,t.data.result.length-2).split("], ");o.forEach((function(e){for(var t=new Object,a=e.substring(1).split(", "),o=0;o<r.length;o++)t[r[o]]=a[o];s.push(t)})),a("SET_QUERYRESULT",s),e()}})).catch((function(e){e.response?console.log("Error getting query result : "+e.response.data.message):console.log("Error getting query result : "+e),t("Error saving query")}))}))},getQuerySQL:function(e,t){var a=e.commit,s=e.getters,r=t.metadataName,o=t.modelName,n=t.packageName,i=t.columns,c=t.queryLimit,l=t.queryDistinct;return new Promise((function(e,t){Re.a.get("/query/sql",{params:{repositoryName:s.repositoryName,groupName:s.groupName,metadataName:r,modelName:o,packageName:n,columns:i,queryLimit:c,queryDistinct:l}}).then((function(t){"success"===t.data.status&&(a("SET_QUERYSQL",t.data.result),e())})).catch((function(e){e.response?console.log("Error getting query SQL : "+e.response.data.message):console.log("Error getting query SQL : "+e),t("Error saving query")}))}))},getSavedQueries:function(e,t){var a=e.commit,s=e.getters,r=t.metadataName,o=t.modelName,n=t.packageName;return new Promise((function(e,t){Re.a.get("/query/saved",{params:{repositoryName:s.repositoryName,groupName:s.groupName,metadataName:r,modelName:o,packageName:n}}).then((function(t){"success"===t.data.status&&(a("SET_SAVEDQUERIES",t.data.result),e())})).catch((function(e){e.response?console.log("Error getting saved queries : "+e.response.data.message):console.log("Error getting saved queries : "+e),t("Error saving query")}))}))},getTableNewID:function(e){var t=e.state,a=e.commit,s=t.tables.idCount;return a("INC_ID"),new Promise((function(e){e(s)}))}},getters:{repositoryName:function(e){return e.repositories.selected},groupName:function(e){return e.groups.selected},tables:function(e){return e.tables.data}},modules:{}}),Qe=a("f309");s["a"].use(Qe["a"]);var Ve=new Qe["a"]({}),De=a("68ad"),Pe=a.n(De),Me={url:"https://semaphore-keycloak2.data4citizen.com/auth/",realm:"Vanilla7",clientId:"metadata"},je=Pe()(Me),Be={install:function(e){e.$keycloak=je}};Be.install=function(e){e.$keycloak=je,Object.defineProperties(e.prototype,{$keycloak:{get:function(){return je}}})},s["a"].use(Be);var Ue=Be;s["a"].config.productionTip=!1,s["a"].use(Ue),s["a"].$keycloak.init({onLoad:"login-required",checkLoginIframe:!1}).then((function(){new s["a"]({router:we,store:Oe,vuetify:Ve,render:function(e){return e(ee)}}).$mount("#app")}))},"7dc5":function(e){e.exports=JSON.parse('{"baseURL":"https://semaphore-gravitee-gateway.data4citizen.com/vanilla-api"}')},"9ea8":function(e,t,a){},c03a:function(e,t,a){},f9c4:function(e,t,a){e.exports=a.p+"img/vanilla.6e506a77.png"}});
//# sourceMappingURL=app.e1017d5c.js.map
(function(e){function t(t){for(var n,r,i=t[0],c=t[1],u=t[2],l=0,d=[];l<i.length;l++)r=i[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);p&&p(t);while(d.length)d.shift()();return s.push.apply(s,u||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],n=!0,r=1;r<a.length;r++){var i=a[r];0!==o[i]&&(n=!1)}n&&(s.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},r={app:0},o={app:0},s=[];function i(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"37d1f1d8","chunk-2d2383f8":"43592765"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(e){var t=[],a={about:1};r[e]?t.push(r[e]):0!==r[e]&&a[e]&&t.push(r[e]=new Promise((function(t,a){for(var n="css/"+({about:"about"}[e]||e)+"."+{about:"9c3b7a33","chunk-2d2383f8":"31d6cfe0"}[e]+".css",o=c.p+n,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var u=s[i],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===n||l===o))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){u=d[i],l=u.getAttribute("data-href");if(l===n||l===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var n=t&&t.target&&t.target.src||o,s=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=n,delete r[e],p.parentNode.removeChild(p),a(s)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){r[e]=0})));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var s=new Promise((function(t,a){n=o[e]=[t,a]}));t.push(n[2]=s);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=i(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(p);var a=o[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",d.name="ChunkLoadError",d.type=n,d.request=r,a[1](d)}o[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var p=l;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"22bc":function(e,t,a){e.exports=a.p+"img/icon_vanilla.1c9b3430.png"},"294d":function(e,t,a){"use strict";a("9ea8")},"3db6":function(e,t,a){e.exports=a.p+"img/vanilla_white.34deb758.png"},4396:function(e,t,a){e.exports=a.p+"img/BPMConseil.0f4f5753.png"},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{staticClass:"grey lighten-4"},[e.loaded?a("div",[a("Navbar"),a("v-main",{staticClass:"mx-4 pb-15"},[a("router-view")],1),a("Footer")],1):a("div",[a("v-overlay",{attrs:{opacity:"1",value:"true"}},[e.loadingCircular?a("v-progress-circular",{attrs:{indeterminate:"",size:"100"}},[e._v(" "+e._s(e.loadingMsg)+" ")]):a("div",{staticClass:"ma-5"},[e._v(" "+e._s(e.loadingMsg)+" ")])],1)],1)])},o=[],s=a("b85c"),i=(a("d3b7"),a("820e"),a("3ca3"),a("ddb0"),a("7db0"),a("b0c0"),a("a434"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",[n("v-app-bar",{staticClass:"indigo",attrs:{flat:""}},[n("v-app-bar-nav-icon",{staticClass:"white--text",on:{click:function(t){e.drawer=!e.drawer}}}),n("v-toolbar-title",{staticClass:"text-uppercase white--text"},[n("span",{staticClass:"font-weight-light"},[e._v("VANILLA")]),n("span",[e._v(" PORTAIL")])]),n("v-spacer"),n("v-toolbar-title",{staticClass:"text-uppercase white--text"},[n("span",{staticClass:"font-weight-light"},[e._v("Connecté en tant que : ")]),n("span",[e._v(" "+e._s(e.name()))])]),n("v-spacer"),n("v-btn",{staticClass:"mx-3",attrs:{dark:"",text:"",rounded:""},on:{click:e.logout}},[e._v("Déconnexion")]),n("v-btn",{staticClass:"mx-3",attrs:{text:"",rounded:"",target:"_blank",rel:"noopener noreferrer",href:"https://semaphore-vanilla.data4citizen.com/vanilla"}},[n("v-img",{attrs:{contain:"","max-height":"100","max-width":"120",src:a("3db6")}}),n("v-icon",{staticClass:"ml-1 mt-1",attrs:{medium:"",color:"white"}},[e._v("mdi-open-in-new")])],1)],1),n("v-navigation-drawer",{staticClass:"indigo",attrs:{app:"",temporary:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-layout",{attrs:{column:"","align-center":""}},[n("v-flex",{staticClass:"mt-5"},[n("v-avatar",{attrs:{size:"100"}},[n("img",{attrs:{src:a("22bc")}})])],1)],1),n("v-list",e._l(e.links,(function(t){return n("v-list-item",{key:t.text,attrs:{to:t.route}},[n("v-list-item-action",[n("v-icon",{staticClass:"white--text"},[e._v(e._s(t.icon))])],1),n("v-list-item-content",[n("v-list-item-title",{staticClass:"white--text"},[e._v(e._s(t.text))])],1)],1)})),1)],1)],1)}),c=[],u={name:"Navbar",data:function(){return{drawer:!1,links:[{icon:"mdi-chart-bell-curve",text:"Charts",route:"/"}]}},methods:{logout:function(){n["a"].$keycloak.logout({redirectUri:window.location.origin})},name:function(){return n["a"].$keycloak.tokenParsed.preferred_username}}},l=u,d=a("2877"),p=a("6544"),f=a.n(p),m=a("40dc"),g=a("5bc1"),h=a("8212"),v=a("8336"),b=a("0e8f"),y=a("132d"),w=a("adda"),k=a("a722"),E=a("8860"),x=a("da13"),C=a("1800"),_=a("5d23"),I=a("f774"),T=a("2fa4"),L=a("2a7f"),O=Object(d["a"])(l,i,c,!1,null,null,null),P=O.exports;f()(O,{VAppBar:m["a"],VAppBarNavIcon:g["a"],VAvatar:h["a"],VBtn:v["a"],VFlex:b["a"],VIcon:y["a"],VImg:w["a"],VLayout:k["a"],VList:E["a"],VListItem:x["a"],VListItemAction:C["a"],VListItemContent:_["a"],VListItemTitle:_["b"],VNavigationDrawer:I["a"],VSpacer:T["a"],VToolbarTitle:L["a"]});var S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-footer",{attrs:{id:"dashboard-core-footer",height:"60",absolute:"",padless:""}},[n("v-container",[n("v-row",{attrs:{align:"left","no-gutters":""}},[n("v-col",{staticClass:"text-center mb-sm-0 mb-5",attrs:{cols:"auto"}},[n("v-btn",{attrs:{icon:"",color:"primary",to:"/"}},[n("v-icon",{attrs:{size:"24px"}},[e._v("mdi-home")])],1)],1),n("v-col",{staticClass:"text-center mb-sm-0 mb-5",attrs:{cols:"auto"}},[n("v-btn",{attrs:{text:"",rounded:"",target:"_blank",rel:"noopener noreferrer",href:"https://semaphore-vanilla.data4citizen.com/vanilla"}},[n("v-img",{attrs:{"max-height":"24","max-width":"90",src:a("f9c4")}})],1)],1),n("v-col",{staticClass:"text-center mb-sm-0 mb-5",attrs:{cols:"auto"}},[n("v-btn",{staticClass:"ma-0",attrs:{text:"",rounded:"",target:"_blank",rel:"noopener noreferrer",href:"http://www.bpm-conseil.com/fr"}},[n("v-img",{attrs:{"max-height":"24","max-width":"90",src:a("4396")}})],1)],1),n("v-spacer",{staticClass:"hidden-sm-and-down"}),n("v-col",{attrs:{cols:"12",md:"auto"}},[n("div",{staticClass:"body-1 font-weight-light pt-6 pt-md-0 text-center"},[e._v(" Copyright © BPM-Conseil, 2013 - "+e._s((new Date).getFullYear())+". ")])])],1)],1)],1)},U=[],V={name:"Footer"},R=V,$=(a("294d"),a("62ad")),A=a("a523"),j=a("553a"),N=a("0fd9"),D=Object(d["a"])(R,S,U,!1,null,null,null),F=D.exports;f()(D,{VBtn:v["a"],VCol:$["a"],VContainer:A["a"],VFooter:j["a"],VIcon:y["a"],VImg:w["a"],VRow:N["a"],VSpacer:T["a"]});var M={name:"App",components:{Navbar:P,Footer:F},props:["keycloak"],data:function(){return{loaded:!1,loadingMsg:"Loading...",loadingCircular:!0}},beforeMount:function(){var e=this;this.manageKeycloakUser().then((function(){e.appLoadData()}))},methods:{appLoadData:function(){var e=this,t=n["a"].$keycloak.tokenParsed.preferred_username;this.$store.dispatch("getUser",t).then((function(){e.$store.dispatch("getGroups").then((function(){e.$store.dispatch("getRepositories",t).then((function(){e.loaded=!0}))}))})).catch((function(){e.loadingMsg="Impossible d'établir la connexion au serveur, veuillez rafraichir la page ou contacter l'administrateur.",e.loadingCircular=!1}))},manageKeycloakUser:function(){var e=this,t=n["a"].$keycloak.tokenParsed.preferred_username,a=n["a"].$keycloak.tokenParsed.groups;return new Promise((function(r){e.$store.dispatch("getAllGroups").then((function(o){var i=o;e.$store.dispatch("getUserGroups",{userLogin:t}).then((function(n){var o,c=n,u=[],l=Object(s["a"])(a);try{var d=function(){var a=o.value;p=c.find((function(e){return e.name==a})),void 0==p?u.push(e.$store.dispatch("addUserToGroup",{userLogin:t,group:i.find((function(e){return e.name==a}))})):c.splice(c.indexOf(p),1)};for(l.s();!(o=l.n()).done;){var p;d()}}catch(h){l.e(h)}finally{l.f()}if(c.length>0){var f,m=Object(s["a"])(c);try{for(m.s();!(f=m.n()).done;){var g=f.value;u.push(e.$store.dispatch("removeUserFromGroup",{userLogin:t,group:g}))}}catch(h){m.e(h)}finally{m.f()}}Promise.allSettled(u).then((function(){r()}))})).catch((function(o){if("User not found."==o){var c={name:t,login:t,password:"Default",mail:n["a"].$keycloak.tokenParsed.email},u=[];e.$store.dispatch("addUser",c).then((function(){var n,o=Object(s["a"])(a);try{var c=function(){var a=n.value;u.push(e.$store.dispatch("addUserToGroup",{userLogin:t,group:i.find((function(e){return e.name==a}))}))};for(o.s();!(n=o.n()).done;)c()}catch(l){o.e(l)}finally{o.f()}Promise.allSettled(u).then((function(){r()}))}))}}))}))}))}}},G=M,H=a("7496"),z=a("f6c4"),B=a("a797"),q=a("490a"),K=Object(d["a"])(G,r,o,!1,null,null,null),J=K.exports;f()(K,{VApp:H["a"],VMain:z["a"],VOverlay:B["a"],VProgressCircular:q["a"]});a("25f0"),a("fb6a");var Y=a("8c4f");n["a"].use(Y["a"]);var X=[{path:"/",name:"Home",component:function(){return a.e("about").then(a.bind(null,"bb51"))},meta:{isAuthenticated:!0}},{path:"/unauthorized",name:"Unauthorized",meta:{isAuthenticated:!1},component:function(){return a.e("chunk-2d2383f8").then(a.bind(null,"ff24"))}}],Q=new Y["a"]({routes:X});Q.beforeEach((function(e,t,a){if(e.meta.isAuthenticated){var r=window.location.toString();n["a"].$keycloak.authenticated?n["a"].$keycloak.hasResourceRole("acces-portail")?n["a"].$keycloak.updateToken(70).then((function(){a()})).catch((function(e){console.error(e)})):a({name:"Unauthorized"}):n["a"].$keycloak.login({redirectUri:r.slice(0,-1)+e.path})}else a()}));var W=Q,Z=a("1da1"),ee=(a("96cf"),a("159b"),a("99af"),a("caad"),a("2532"),a("2f62")),te=a("bc3a"),ae=a.n(te),ne=a("7dc5");ae.a.defaults.baseURL=ne.baseURL,ae.a.defaults.headers.common["X-Gravitee-Api-Key"]="f3510842-ef9b-4ee7-8877-4d59b5d63907",n["a"].use(ee["a"]);var re=new ee["a"].Store({state:{users:{name:"Utilisateurs",data:[]},groups:{name:"Groupes",data:[]},repositories:{name:"Repositories",data:[]},items:{name:"Items",data:[]},temps:{name:"Temps",data:[]}},mutations:{FETCH_USERS:function(e,t){e.users.data=t},FETCH_GROUPS:function(e,t){e.groups.data=t},FETCH_REPOSITORIES:function(e,t){e.repositories.data=t},FETCH_ITEMS:function(e,t){e.items.data=t},FETCH_TEMPS:function(e,t){e.temps.data=t}},actions:{getRepositories:function(e,t){return Object(Z["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e.commit,r=[],a.next=4,ae.a.get("/user/".concat(t,"/repositories")).then((function(e){e.data.result.forEach((function(e){r.some((function(t){return t.id==e.id}))||r.push(e)}))})).catch((function(e){console.log("Error retrieving repositories : "+e.response.data.message)}));case 4:n("FETCH_REPOSITORIES",r);case 5:case"end":return a.stop()}}),a)})))()},getGroups:function(e){return Object(Z["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.commit,n=e.getters,r=n.users,t.next=4,ae.a.get("/user/".concat(r[0].name,"/groups")).then((function(e){a("FETCH_GROUPS",e.data.result)})).catch((function(e){console.log("Error retrieving groups : "+e.response.data.message)}));case 4:case"end":return t.stop()}}),t)})))()},getItems:function(e,t){var a,n,r=e.getters,o=t.repoName,s=t.groupName,i=t.dirID,c=r.groups,u=r.repositories;console.log(c,u),c.forEach((function(e){e.name==s&&(a=e.id)})),u.forEach((function(e){e.name==o&&(n=e.id)})),console.log(a,n),ae.a.get("/Items?repoID=".concat(n,"&grpID=").concat(a,"&dirID=").concat(i.id)).then((function(e){var t=e.data.result;t.forEach((function(e){"DIRECTORY"==e.type&&(e.children=[])})),i.children=t})).catch((function(e){console.log("Error retrieving items : "+e.response.data.message)}))},getAllItems:function(e,t){var a,n,r=e.commit,o=e.getters,s=t.repoName,i=t.groupName,c=o.groups,u=o.repositories;c.forEach((function(e){e.name===i&&(a=e.id)})),u.forEach((function(e){e.name==s&&(n=e.id)})),console.log(a,n),ae.a.get("/AllItems?repoID=".concat(n,"&grpID=").concat(a)).then((function(e){r("FETCH_ITEMS",e.data.result)})).catch((function(e){console.log("Error retrieving items : "+e.response.data.message)}))},getItemsRoot:function(e,t){var a,n,r,o=e.commit,s=e.getters,i=t.repoName,c=t.groupName,u=s.groups,l=s.repositories;u.forEach((function(e){e.name===c&&(a=e.id)})),l.forEach((function(e){e.name==i&&(n=e.id)})),console.log(a,n),ae.a.get("/Items?repoID=".concat(n,"&grpID=").concat(a)).then((function(e){r=e.data.result,r.forEach((function(e){"DIRECTORY"==e.type&&(e.children=[])})),o("FETCH_ITEMS",e.data.result)})).catch((function(e){console.log("Error retrieving items : "+e.response.data.message)}))},getTemps:function(e,t){var a=e.commit,n=t.repoName,r=t.groupName,o={repoName:n,groupName:r};a("FETCH_TEMPS",o)},getUser:function(e,t){var a=e.commit;console.log(t);var n=[{name:t}];console.log(n),a("FETCH_USERS",n)},addUserToGroup:function(e,t){var a=e.state,n=t.userLogin,r=t.group,o={userLogin:n,groupID:r.id};return new Promise((function(e,t){ae.a.post("/user/group/add",o,{}).then((function(t){"success"===t.data.status&&(a.groups.data.push(r.name),e("L'utilisateur ".concat(n," a été ajouté au groupe ").concat(r.name,".")))})).catch((function(e){e.response&&console.log("Error adding user ".concat(n," to ").concat(r.name,"  : ")+e.response.data.message),t("Erreur lors de l'ajout de ".concat(n," à ").concat(r.name,"."))}))}))},removeUserFromGroup:function(e,t){var a=e.state,n=t.userLogin,r=t.group,o={userLogin:n,groupID:r.id};return new Promise((function(e,t){ae.a.post("/user/group/remove",o,{}).then((function(t){-1!=a.groups.data.indexOf(r.name)&&a.groups.data.splice(a.groups.data.indexOf(r.name),1),"success"===t.data.status&&e("L'utilisateur ".concat(n," a été retiré du groupe ").concat(r.name,"."))})).catch((function(e){e.response&&console.log("Erreur lors du retrait de l'utilisateur ".concat(n," du groupe ").concat(r.name,"  : ")+e.response.data.message),t("Erreur lors du retrait de l'utilisateur ".concat(n," du groupe ").concat(r.name,"."))}))}))},addUser:function(e,t){var a=e.state;return new Promise((function(e,n){a.userLogin=t.login,ae.a.post("/user/create",t,{}).then((function(a){"success"===a.data.status&&e("L'utilisateur ".concat(t.login," a été crée."))})).catch((function(e){e.response?console.log("Error adding user ".concat(t.login," : ").concat(e.response.data.message)):console.log("Error adding user ".concat(t.login," : ").concat(e)),n("Erreur lors de la création de l'utilisateur ".concat(t.login,"."))}))}))},getUserGroups:function(e,t){var a=e.state,n=t.userLogin;return new Promise((function(e,t){ae.a.get("/user/".concat(n,"/groups")).then((function(t){if("success"==t.data.status){var r=[];t.data.result.forEach((function(e){return r.push(e.name)})),a.userLogin=n}e(t.data.result)})).catch((function(e){e.response?e.response.data.message.includes("User not found.")&&t("User not found."):console.log("Unable to retrieve groups : "+e),t(e)}))}))},getAllGroups:function(e){var t=e.commit;return new Promise((function(e,a){ae.a.get("/groups").then((function(a){"success"==a.data.status&&t("SET_GROUPS",[]),e(a.data.result)})).catch((function(e){e.reponse?console.log("Unable to retrieve groups message : "+e.response.data.message):console.log("Unable to retrieve groups : "+e),a(e)}))}))}},getters:{users:function(e){return e.users.data},groups:function(e){return e.groups.data},repositories:function(e){return e.repositories.data},items:function(e){return e.items.data},temps:function(e){return e.temps.data}},modules:{}}),oe=a("f309");n["a"].use(oe["a"]);var se=new oe["a"]({}),ie=a("68ad"),ce=a.n(ie),ue={url:"https://semaphore-keycloak2.data4citizen.com/auth/",realm:"Vanilla7",clientId:"portail"},le=ce()(ue),de={install:function(e){e.$keycloak=le}};de.install=function(e){e.$keycloak=le,Object.defineProperties(e.prototype,{$keycloak:{get:function(){return le}}})},n["a"].use(de);var pe=de;n["a"].config.productionTip=!1,n["a"].use(pe),n["a"].$keycloak.init({onLoad:"login-required",checkLoginIframe:!1}).then((function(){new n["a"]({router:W,store:re,vuetify:se,render:function(e){return e(J)}}).$mount("#app")}))},"7dc5":function(e){e.exports=JSON.parse('{"baseURL":"https://semaphore-gravitee-gateway.data4citizen.com/vanilla-api"}')},"9ea8":function(e,t,a){},f9c4:function(e,t,a){e.exports=a.p+"img/vanilla.6e506a77.png"}});
//# sourceMappingURL=app.61b5b82a.js.map
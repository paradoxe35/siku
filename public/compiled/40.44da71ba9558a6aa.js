(window.webpackJsonp=window.webpackJsonp||[]).push([[40,11,48],{112:function(e,t,n){"use strict";n.r(t),n.d(t,"slim",(function(){return i}));var r=n(279),a=n.n(r),c=n(6);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new a.a(l({select:e,searchPlaceholder:Object(c.a)({en:"Search",fr:"Recherche"})},t))}},268:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return g})),n.d(t,"d",(function(){return h})),n.d(t,"e",(function(){return y})),n.d(t,"c",(function(){return O})),n.d(t,"g",(function(){return j})),n.d(t,"f",(function(){return E}));var r=n(0),a=n.n(r),c=n(265),o=n(3),l=n(112),u=n(269),i=n(760),s=n(50);function m(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||b(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t,n,r,a,c,o){try{var l=e[c](o),u=l.value}catch(e){return void n(e)}l.done?t(u):Promise.resolve(u).then(r,a)}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw c}}return n}(e,t)||b(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=Object(c.useState)(e),n=d(t,2),r=n[0],a=n[1],l=Object(c.useState)(null),u=d(l,2),i=u[0],s=u[1],m=Object(c.useState)(null),f=d(m,2),b=f[0],v=f[1],p=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],c=arguments.length>4&&void 0!==arguments[4]&&arguments[4];return s(null),a(!0),Object(o.a)(e,t,n,r).then((function(e){return v(e.data),e})).catch((function(e){return s(e),c&&a(!1),Promise.reject(e)})).finally((function(){!c&&a(!1)}))};return{fetchLoading:r,error:i,datas:b,fetchAPi:p,ApiRequest:o.a}},g=function(){var e=Object(c.useRef)(null),t=d(Object(c.useState)(!1),2);return{parentElemt:e,fullLoading:t[0],setFullLoading:t[1]}},h=function(e,t){var n=d(Object(c.useState)(e||{}),2),r=n[0],a=n[1];Object(c.useEffect)((function(){a(e||{})}),[e]);var o=Object(c.useCallback)((function(e){var n=e.page;r.meta&&r.meta.current_page!=n&&t&&t(n)}),[r]);return[r,a,o]},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=Object(c.useState)(e),n=d(t,2),r=n[0],a=n[1],o=Object(c.useCallback)((function(e){a(e)}),[a]);return{phone:r,setPhone:a,onPhoneValueChange:o}},O=function(){var e=Object(c.useRef)(null),t=d(Object(c.useState)(!1),2),n=t[0],r=t[1],o=d(Object(c.useState)(null),2),l=o[0],u=o[1],i=Object(c.useCallback)(function(){var t,n=(t=a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:u(n),e.current&&$(e.current).modal("show");case 2:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,a){var c=t.apply(e,n);function o(e){f(c,r,a,o,l,"next",e)}function l(e){f(c,r,a,o,l,"throw",e)}o(void 0)}))});return function(e){return n.apply(this,arguments)}}(),[e.current,u]);return{modalConfirm:e,deletionLoading:n,setDeletionLoading:r,deletionId:l,setDeletionId:u,handleDelete:i,closeModal:function(){$(e.current).modal("hide"),r(!1),u(null)}}},j=function(e){var t=Object(i.a)().t,n=Object(u.c)((function(e){return e.eventTemplates})),r=n.ids,a=n.entities,o=function(){var e=Object(c.useRef)(null),t=Object(c.useRef)(null);return{templatesEl:e,slimInstance:t,getSlim:function(){return null===t.current&&(t.current=Object(l.slim)(e.current,{showSearch:!1})),t.current}}}(),f=o.getSlim,d=o.templatesEl,b=Object(u.b)();return Object(c.useEffect)((function(){return b(Object(s.d)(e)),function(){f().destroy()}}),[]),Object(c.useEffect)((function(){var e=f(),n=r.map((function(e){var t=a[e];return{text:t.name,value:t.id,selected:!1}}));e.setData([{text:t("Choisissez un modèle"),value:"#",selected:!0}].concat(m(n)))}),[r]),{templatesEl:d,ids:r,entities:a,getSlim:f}},E=function(){var e=d(Object(c.useState)([]),2),t=e[0],n=e[1];return{services:t,onChangeServices:Object(c.useCallback)((function(e){n(e)}),[n])}}},270:function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return u}));var r=n(265),a=n.n(r);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(e){var t=e.loading,n=void 0!==t&&t,r=e.label,c=void 0===r?null:r,o=e.type,l=void 0===o?"button":o,u=e.disabled,i=void 0!==u&&u,s=e.onClick,m=void 0===s?null:s,f=e.color,d=void 0===f?"default":f,b=e.textColor,v=void 0===b?"":b;return a.a.createElement("button",{type:l,onClick:m,className:"btn btn-".concat(d," ").concat(v," btn-sm d-inline-flex align-content-center"),disabled:n||i},a.a.createElement("span",null,c||""),n&&a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{className:"mx-1"}),a.a.createElement("spinning-dots",{style:{width:"20px"}})))},u=function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e);return delete t.loading,a.a.createElement("button",t,a.a.createElement("div",{className:"d-inline-flex align-content-center"},a.a.createElement("span",null,e.label),e.loading&&a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{className:"mx-1"}),a.a.createElement("spinning-dots",{style:{width:"20px"}}))))}},273:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(265),a=n.n(r),c=n(268),o=n(277),l=function(e){var t=e.loading,n=void 0!==t&&t,l=e.children,u=Object(c.b)(),i=u.fullLoading,s=u.setFullLoading;return Object(r.useEffect)((function(){s(n)}),[n]),a.a.createElement("div",{style:{position:"relative"}},i&&a.a.createElement(o.a,null),l)}},282:function(e,t,n){"use strict";var r=n(265),a=n.n(r),c=n(760),o=n(270),l=n(276),u=Object(r.forwardRef)((function(e,t){var n=Object(c.a)().t;return Object(l.createPortal)(a.a.createElement("div",{className:"modal fade",ref:t,tabIndex:-1,role:"dialog","aria-hidden":"true"},a.a.createElement("div",{className:"modal-dialog modal-dialog-scrollable modal-dialog-centered ".concat(e.size||"modal-sm"),role:"document"},a.a.createElement("div",{className:"modal-content"},a.a.createElement("div",{className:"modal-body"},e.children," ",e.message||n("Êtes-vous sûr ?")),e.footer||a.a.createElement("div",{className:"modal-footer"},a.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm","data-dismiss":"modal"},e.closeText||n("Non")),a.a.createElement(o.b,{label:e.confirmText||n("Ouais"),loading:e.loading,disabled:e.disabledBtn,onClick:e.onConfirm}))))),document.body)}));t.a=u},495:function(e,t,n){"use strict";n.r(t),n.d(t,"AlertLowBalance",(function(){return O}));var r=n(265),a=n.n(r),c=n(760),o=n(268),l=n(269),u=n(270);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var s=function(e){var t=Object(r.useRef)(null);return Object(r.useEffect)((function(){var e=$(t.current);e.length&&e.on("focus blur",(function(e){$(this).parents(".form-group").toggleClass("focused","focus"===e.type)})).trigger("blur")}),[]),a.a.createElement("input",i({ref:t,className:"form-control"},e))},m=n(7),f=n(49),d=n(282),b=n(273);function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw c}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var g=function(e){return isNaN(e)||!(+e>0)},h=function(e){var t=e.onClick,n=Object(c.a)().t;return a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{className:"p-1 ml-4 bg-secondary clickable-a d-inline-block",onClick:t},a.a.createElement("img",{src:"/img/svg/icons8-edit.svg",height:"15",width:"15",alt:n("Editer")})))},y=function(e){var t=e.cancel,n=e.setDatas,l=e.datas,i=e.userAuth.email,d=Object(c.a)().t,b=v(Object(r.useState)(""),2),p=b[0],y=b[1],O=v(Object(r.useState)(l),2),j=O[0],E=O[1],w=Object(r.useCallback)((function(){return l?E(l):t()}),[t,l]),N=Object(o.a)(),S=N.fetchAPi,C=N.fetchLoading,x=Object(r.useCallback)((function(){g(p)||S("post",f.q.historyLowBalance,{amount:"".concat(p)},!0).then((function(e){var t=e.data;n(t),E(t)}))}),[p,n,E]),P=a.a.createElement("div",{className:"card-body"},a.a.createElement("div",{className:"form-group"},a.a.createElement("label",{htmlFor:"amount",className:"form-control-label text-sm"},d("Quand ma balance est en dessous")),a.a.createElement("div",{className:"input-group input-group-merge"},a.a.createElement("div",{className:"input-group-prepend"},a.a.createElement("span",{className:"input-group-text"},m.a)),a.a.createElement(s,{autoComplete:"off",onChange:function(e){var t=e.target.value;return y(t)},className:"form-control",type:"number",value:p,id:"amount"}))),a.a.createElement("div",{className:"form-group"},a.a.createElement("label",{htmlFor:"eemail",className:"form-control-label text-sm"},d("Envoyer une alerte e-mail à")),a.a.createElement(s,{className:"form-control form-control-sm",disabled:!0,type:"text",defaultValue:i,id:"eemail"})),a.a.createElement("div",null,a.a.createElement(u.b,{onClick:w,color:"secondary",textColor:"text-default",label:d("Annuler")}),a.a.createElement(u.b,{onClick:x,disabled:g(p),label:d("Enregistrer"),loading:C}))),A=Object(r.useCallback)((function(){E(null),y((function(e){return l?l.amount:e}))}),[]),k=a.a.createElement("div",{className:"card-body"},a.a.createElement("p",{className:"text-sm"},d("Quand ma balance est en dessous")," ",a.a.createElement("b",{className:"font-weight-600"},m.a+(l?l.amount:"")),a.a.createElement(h,{onClick:A})),a.a.createElement("p",{className:"text-sm"},d("Envoyer une alerte e-mail à")," ",a.a.createElement("b",{className:"font-weight-600"},i)));return a.a.createElement("div",{className:"row mt-2"},a.a.createElement("div",{className:"col-lg-5"},a.a.createElement("div",{className:"card shadow-none border border-sm border-darken-1"},j?k:P)))},O=function(e){var t=e.user,n=Object(c.a)().t,l=Object(o.a)(!0),u=l.fetchAPi,i=l.fetchLoading,s=l.ApiRequest,m=v(Object(r.useState)(!1),2),p=m[0],g=m[1],h=v(Object(r.useState)(null),2),O=h[0],j=h[1],E=Object(o.c)(),w=E.setDeletionLoading,N=E.closeModal,S=E.modalConfirm,C=E.handleDelete,x=E.deletionLoading;Object(r.useEffect)((function(){u("get",f.q.historyLowBalance,{},!0).then((function(e){var t=e.data;200===e.status&&(j(t),g(!0))}))}),[]);var P=Object(r.useCallback)((function(){w(!0),s("delete",f.q.historyLowBalance,{},!0).finally((function(){return N()})).then((function(){j(null),g(!1)}))}),[]);return a.a.createElement(b.a,{loading:i},a.a.createElement("div",{className:"d-flex"},a.a.createElement("h4",null,n("Activer les alertes de solde faible")," "),a.a.createElement("label",{className:"custom-toggle ml-2"},a.a.createElement("input",{type:"checkbox",checked:p,onChange:function(e){var t=e.target.checked;!t&&O?C(O.id):g(t)}}),a.a.createElement("span",{className:"custom-toggle-slider rounded-circle"}))),a.a.createElement("p",{className:"text-muted text-sm"},n("Recevez un e-mail lorsque votre solde passe en dessous d'un seuil"),"."),p&&a.a.createElement(y,{userAuth:t,datas:O,setDatas:j,cancel:function(){return g(!1)}}),!!O&&p&&a.a.createElement(d.a,{message:a.a.createElement(a.a.Fragment,null,a.a.createElement("h3",{className:"mb-2"},n("Désactiver les alertes de solde faible?")," "),a.a.createElement("p",{className:"my-0"},n("Il est important de savoir quand votre solde est bas"),". ",n("Si vous êtes à court de fonds, votre service peut être interrompu"),".")),confirmText:n("Désactiver"),closeText:n("Annuler"),loading:x,onConfirm:P,ref:S}))};t.default=function(){var e=Object(l.c)((function(e){return e.userAuth}));return a.a.createElement(O,{user:e})}},740:function(e,t,n){"use strict";n.r(t);var r=n(495),a=n(265),c=n.n(a),o=n(760);t.default=function(){Object(o.a)().t;return c.a.createElement(c.a.Fragment,null,c.a.createElement(r.AlertLowBalance,{user:window.customer}))}}}]);
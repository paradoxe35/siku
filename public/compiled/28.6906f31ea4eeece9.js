(window.webpackJsonp=window.webpackJsonp||[]).push([[28,11],{112:function(e,t,n){"use strict";n.r(t),n.d(t,"slim",(function(){return u}));var r=n(278),a=n.n(r),c=n(6);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new a.a(l({select:e,searchPlaceholder:Object(c.a)({en:"Search",fr:"Recherche"})},t))}},246:function(e,t,n){"use strict";n.r(t),n.d(t,"Init",(function(){return r}));n(247),n(188);var r=function(){return $(".dropify").dropify()}},267:function(e,t,n){"use strict";n.d(t,"a",(function(){return v})),n.d(t,"b",(function(){return y})),n.d(t,"d",(function(){return g})),n.d(t,"e",(function(){return h})),n.d(t,"c",(function(){return O})),n.d(t,"g",(function(){return E})),n.d(t,"f",(function(){return j}));var r=n(0),a=n.n(r),c=n(264),o=n(3),l=n(112),i=n(268),u=n(757),s=n(50);function f(e){return function(e){if(Array.isArray(e))return p(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||b(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t,n,r,a,c,o){try{var l=e[c](o),i=l.value}catch(e){return void n(e)}l.done?t(i):Promise.resolve(i).then(r,a)}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw c}}return n}(e,t)||b(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=Object(c.useState)(e),n=m(t,2),r=n[0],a=n[1],l=Object(c.useState)(null),i=m(l,2),u=i[0],s=i[1],f=Object(c.useState)(null),d=m(f,2),b=d[0],p=d[1],v=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],c=arguments.length>4&&void 0!==arguments[4]&&arguments[4];return s(null),a(!0),Object(o.a)(e,t,n,r).then((function(e){return p(e.data),e})).catch((function(e){return s(e),c&&a(!1),Promise.reject(e)})).finally((function(){!c&&a(!1)}))};return{fetchLoading:r,error:u,datas:b,fetchAPi:v,ApiRequest:o.a}},y=function(){var e=Object(c.useRef)(null),t=m(Object(c.useState)(!1),2);return{parentElemt:e,fullLoading:t[0],setFullLoading:t[1]}},g=function(e,t){var n=m(Object(c.useState)(e||{}),2),r=n[0],a=n[1];Object(c.useEffect)((function(){a(e||{})}),[e]);var o=Object(c.useCallback)((function(e){var n=e.page;r.meta&&r.meta.current_page!=n&&t&&t(n)}),[r]);return[r,a,o]},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=Object(c.useState)(e),n=m(t,2),r=n[0],a=n[1],o=Object(c.useCallback)((function(e){a(e)}),[a]);return{phone:r,setPhone:a,onPhoneValueChange:o}},O=function(){var e=Object(c.useRef)(null),t=m(Object(c.useState)(!1),2),n=t[0],r=t[1],o=m(Object(c.useState)(null),2),l=o[0],i=o[1],u=Object(c.useCallback)(function(){var t,n=(t=a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:i(n),e.current&&$(e.current).modal("show");case 2:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,a){var c=t.apply(e,n);function o(e){d(c,r,a,o,l,"next",e)}function l(e){d(c,r,a,o,l,"throw",e)}o(void 0)}))});return function(e){return n.apply(this,arguments)}}(),[e.current,i]);return{modalConfirm:e,deletionLoading:n,setDeletionLoading:r,deletionId:l,setDeletionId:i,handleDelete:u,closeModal:function(){$(e.current).modal("hide"),r(!1),i(null)}}},E=function(e){var t=Object(u.a)().t,n=Object(i.c)((function(e){return e.eventTemplates})),r=n.ids,a=n.entities,o=function(){var e=Object(c.useRef)(null),t=Object(c.useRef)(null);return{templatesEl:e,slimInstance:t,getSlim:function(){return null===t.current&&(t.current=Object(l.slim)(e.current,{showSearch:!1})),t.current}}}(),d=o.getSlim,m=o.templatesEl,b=Object(i.b)();return Object(c.useEffect)((function(){return b(Object(s.d)(e)),function(){d().destroy()}}),[]),Object(c.useEffect)((function(){var e=d(),n=r.map((function(e){var t=a[e];return{text:t.name,value:t.id,selected:!1}}));e.setData([{text:t("Choisissez un modèle"),value:"#",selected:!0}].concat(f(n)))}),[r]),{templatesEl:m,ids:r,entities:a,getSlim:d}},j=function(){var e=m(Object(c.useState)([]),2),t=e[0],n=e[1];return{services:t,onChangeServices:Object(c.useCallback)((function(e){n(e)}),[n])}}},269:function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return i}));var r=n(264),a=n.n(r);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(e){var t=e.loading,n=void 0!==t&&t,r=e.label,c=void 0===r?null:r,o=e.type,l=void 0===o?"button":o,i=e.disabled,u=void 0!==i&&i,s=e.onClick,f=void 0===s?null:s,d=e.color,m=void 0===d?"default":d,b=e.textColor,p=void 0===b?"":b;return a.a.createElement("button",{type:l,onClick:f,className:"btn btn-".concat(m," ").concat(p," btn-sm d-inline-flex align-content-center"),disabled:n||u},a.a.createElement("span",null,c||""),n&&a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{className:"mx-1"}),a.a.createElement("spinning-dots",{style:{width:"20px"}})))},i=function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e);return delete t.loading,a.a.createElement("button",t,a.a.createElement("div",{className:"d-inline-flex align-content-center"},a.a.createElement("span",null,e.label),e.loading&&a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{className:"mx-1"}),a.a.createElement("spinning-dots",{style:{width:"20px"}}))))}},272:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(264),a=n.n(r),c=n(267),o=n(276),l=function(e){var t=e.loading,n=void 0!==t&&t,l=e.children,i=Object(c.b)(),u=i.fullLoading,s=i.setFullLoading;return Object(r.useEffect)((function(){s(n)}),[n]),a.a.createElement("div",{style:{position:"relative"}},u&&a.a.createElement(o.a,null),l)}},273:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(264),a=n.n(r),c=n(274),o=n.n(c),l=function(e){var t=e.listData,n=e.getDataPaginator;return a.a.createElement(a.a.Fragment,null,t.meta&&t.meta.total>t.meta.per_page&&a.a.createElement(o.a,{buttonIcons:!0,prevButtonIcon:"ni ni-bold-left",nextButtonIcon:"ni ni-bold-right",changePage:n,data:t}))}},279:function(e,t,n){"use strict";var r=n(264),a=n.n(r);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o=Object(r.memo)((function(e){var t=e.name,n=void 0===t?null:t,o=e.label,l=void 0===o?"":o,i=e.onChange,u=void 0===i?null:i,s=e.defaultChecked,f=e.checked,d=e.disabled,m=void 0===d?null:d,b=Math.random(),p=Object(r.useRef)(null);return Object(r.useEffect)((function(){p.current&&(p.current.checked=!!f)}),[f]),Object(r.useEffect)((function(){p.current&&(p.current.checked=!!s)}),[]),a.a.createElement("div",{className:"custom-control custom-checkbox"},a.a.createElement("input",c({type:"checkbox"},e,{defaultChecked:s,ref:p,disabled:m,className:"custom-control-input",name:n,onChange:u,id:n+b})),a.a.createElement("label",{className:"custom-control-label",htmlFor:n+b},l))}));t.a=o},280:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(264),a=n.n(r);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=Object(r.forwardRef)((function(e,t){var n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e);return delete n.children,a.a.createElement("div",{className:"form-group"},a.a.createElement("label",{className:"form-control-label"},e.children),a.a.createElement("div",{className:"input-group input-group-merge"},a.a.createElement("input",c({ref:t},n,{type:e.type||"text",className:e.className||"form-control"}))))}))},282:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var r=n(264),a=n.n(r);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw c}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var l=function(e){var t=e.tabs,n=void 0===t?[]:t,o=e.defaultv,l=void 0===o?null:o,i=e.selected,u=void 0===i?null:i,s=c(Object(r.useState)(l),2),f=s[0],d=s[1];return Object(r.useEffect)((function(){u&&u(f)}),[f]),a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"btn-group btn-group-toggle","data-toggle":"buttons"},n.map((function(e,t){return a.a.createElement("label",{key:t,className:"btn btn-secondary ".concat(l==e.key?"active":""),onClick:function(){return d(e.key)}},a.a.createElement("input",{type:"radio",name:"options",autoComplete:"off",defaultChecked:l==e.key}),e.name)}))))},i=n(272),u=n(273),s=n(267),f=n(757);function d(e){return function(e){if(Array.isArray(e))return g(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||y(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw c}}return n}(e,t)||y(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){if(e){if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var h=function(e){var t=e.children,n=e.url,c=e.tabs,o=void 0===c?null:c,m=e.selectedTab,p=void 0===m?null:m,y=Object(f.a)().t,g=Object(s.a)(),h=g.fetchAPi,O=g.fetchLoading,E=v(Object(s.d)(null,(function(e){h("get",n+"?page="+e+"&filter="+S.current,{},!0).then((function(e){var t=e.data;return w(t)}))})),3),j=E[0],w=E[1],P=E[2],S=Object(r.useRef)(null),N=Object(r.useCallback)((function(e){h("get",n+"?filter="+e,{},!0).finally((function(){w({}),S.current=e})).then((function(e){var t=e.data;return w(t)}))}),[S.current]);var k={updated:function(e){w((function(t){var n=b({},t);return n.data=t.data.map((function(t){return t.id==e.id?e:t})),n}))},deleted:function(e){w((function(t){var n=b({},t);return n.data=t.data.filter((function(t){return t.id!==e})),n}))},added:function(e){w((function(t){var n=b({},t);return n.data=[e].concat(d(t.data)),n}))}};return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"mb-3"},a.a.createElement(l,{tabs:o||[{key:"active",name:y("Actifs")},{key:"trash",name:y("Corbeille")}],selected:N,defaultv:p||"active"})),a.a.createElement(i.a,{loading:O},a.a.createElement("div",{className:"table-responsive"},t(j,S.current,k))),a.a.createElement("div",{className:"my-2"},a.a.createElement(u.a,{listData:j,getDataPaginator:P})))}},284:function(e,t,n){"use strict";n(285);var r=n(244);t.a=r.default},432:function(e,t,n){"use strict";var r=n(264),a=n.n(r);t.a=function(e){var t=e.children;return a.a.createElement("div",{className:"text-xs text-muted mt-3 mb-2"},t)}},746:function(e,t,n){"use strict";n.r(t);var r=n(7),a=n(14),c=n(269),o=n(279),l=n(280),i=n(282),u=n(284),s=n(267),f=n(49),d=n(264),m=n.n(d),b=n(757),p=n(244),v=n(246),y=n(432),g=function(e){var t=e.id,n=e.modified,a=Object(b.a)().t,o=Object(s.a)(),l=o.fetchAPi,i=o.fetchLoading,u=function(e){l("patch",f.p.agentsIndex+"/"+t+"?status="+e,{},!0).then((function(e){var t=e.data.data;return n.updated(t)}))};return m.a.createElement(m.a.Fragment,null,m.a.createElement("div",{className:"dropdown"},m.a.createElement(c.a,{type:"button",className:"btn btn-primary btn-sm dropdown-toggle","data-toggle":"dropdown",loading:i,"aria-haspopup":"true",label:a("Plus"),"aria-expanded":"false"}),m.a.createElement("div",{className:"dropdown-menu shadow-lg"},m.a.createElement("a",{onClick:function(){return u("online")},className:"dropdown-item clickable-a"},a("En ligne")),m.a.createElement("a",{onClick:function(){return u("offline")},className:"dropdown-item clickable-a"},a("Hors ligne")),m.a.createElement("div",{className:"dropdown-divider"}),m.a.createElement("a",{onClick:function(){Object(r.b)()&&l("delete",f.p.agentsIndex+"/"+t,{},!0).then((function(e){var t=e.data.data;return n.deleted(t.id)}))},className:"dropdown-item text-danger clickable-a"},a("Supprimer définitivement")))))},h=function(){var e=Object(b.a)().t,t=Object(d.useRef)(null);return Object(d.useEffect)((function(){window.addEventListener("added-agent",(function(e){var n=e.detail;return t.current&&t.current.added(n)}))}),[]),m.a.createElement(m.a.Fragment,null,m.a.createElement(i.a,{tabs:[],selectedTab:"all",url:f.p.agentsIndex},(function(n,r,a){return t.current=a,m.a.createElement("table",{className:"table table-hover"},m.a.createElement("thead",null,m.a.createElement("tr",null,m.a.createElement("th",{scope:"col"},e("Image")," "),m.a.createElement("th",{scope:"col"},e("ID")," "),m.a.createElement("th",{scope:"col"},e("Nom")," "),m.a.createElement("th",{scope:"col"},e("Email")),m.a.createElement("th",{scope:"col"},e("Phone")),m.a.createElement("th",{scope:"col"},e("Role")),m.a.createElement("th",{scope:"col"},e("Status")),m.a.createElement("th",{scope:"col"},e("Créé à")),m.a.createElement("th",{scope:"col"}))),m.a.createElement("tbody",null,(n.data||[]).map((function(e){return m.a.createElement("tr",{key:e.id},m.a.createElement("td",null,m.a.createElement("span",{className:"avatar rounded-circle mr-3"},m.a.createElement("img",{alt:e.name,className:"img-cover-full",src:e.imageUrl}))),m.a.createElement("td",null,e.id),m.a.createElement("td",null,e.name),m.a.createElement("td",null,e.email),m.a.createElement("td",null,e.phone),m.a.createElement("td",null,e.role),m.a.createElement("td",null,e.status),m.a.createElement("td",null,e.created_at),m.a.createElement("td",null,m.a.createElement(g,{id:e.id,modified:a})))}))))})))},O=function(){var e=Object(b.a)().t,t=Object(s.e)(),n=t.phone,r=t.onPhoneValueChange,i=Object(s.a)(),g=i.fetchAPi,h=i.fetchLoading;Object(d.useEffect)((function(){Object(v.Init)()}),[]);return m.a.createElement(m.a.Fragment,null,m.a.createElement("form",{method:"post",autoComplete:"off",onSubmit:function(e){e.preventDefault();var t=e.target;if(Object(p.isValidPhoneNumber)(n)){var r=Object(p.parsePhoneNumber)(n),c=new FormData(t);c.append("phone",r.number),g("post",f.p.agentsStore,c,!0).then((function(e){var n,r=e.data,c=r.message,o=r.item;a.a.success(c),window.dispatchEvent(new CustomEvent("added-agent",{detail:o})),n=t,Array.from(n.querySelectorAll("input")).forEach((function(e){return e.value=""}))}))}}},m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-lg-6"},m.a.createElement(l.a,{type:"text",name:"name",required:!0},e("Nom"))),m.a.createElement("div",{className:"col-lg-6"},m.a.createElement(l.a,{type:"email",name:"email",required:!0},e("Email")," "))),m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-lg-6"},m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,e("Téléphone")),m.a.createElement(u.a,{value:n,className:"form-control",placeholder:e("Numéro de téléphone"),onChange:r}))),m.a.createElement("div",{className:"col-lg-6"},m.a.createElement(l.a,{type:"text",placeholder:e("Rôle"),name:"role",defaultValue:"agent",required:!0},e("Rôle")))),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,e("Image")),m.a.createElement("input",{type:"file",className:"dropify",accept:"image/*","data-allowed-file-extensions":"jpg jepg png gif",name:"image","data-max-file-size":"5M"})),m.a.createElement("div",{className:"mb-2"},m.a.createElement(y.a,null,e("En ligne")," | ",e("Hors ligne")),m.a.createElement(o.a,{defaultChecked:!0,label:e("Status"),name:"status"})),m.a.createElement(c.b,{type:"submit",loading:h,label:e("Enregistrer"),disabled:!Object(p.isValidPhoneNumber)(n)})))};t.default=function(){return m.a.createElement(m.a.Fragment,null,m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-lg-6 mb-3"},m.a.createElement(O,null)),m.a.createElement("div",{className:"col-lg-6 mb-3"},m.a.createElement(h,null))))}}}]);
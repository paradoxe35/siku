(window.webpackJsonp=window.webpackJsonp||[]).push([[31,46],{218:function(e,t,n){"use strict";n.r(t),n.d(t,"slim",(function(){return u}));var r=n(243),a=n.n(r);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new a.a(c({select:e},t))}},236:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return y})),n.d(t,"d",(function(){return g})),n.d(t,"e",(function(){return O})),n.d(t,"c",(function(){return h})),n.d(t,"g",(function(){return j})),n.d(t,"f",(function(){return E}));var r=n(0),a=n.n(r),o=n(233),c=n(4),i=n(218),u=n(237),l=n(677),s=n(48);function f(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||m(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t,n,r,a,o,c){try{var i=e[o](c),u=i.value}catch(e){return void n(e)}i.done?t(u):Promise.resolve(u).then(r,a)}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||m(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=Object(o.useState)(e),n=b(t,2),r=n[0],a=n[1],i=Object(o.useState)(null),u=b(i,2),l=u[0],s=u[1],f=Object(o.useState)(null),d=b(f,2),m=d[0],v=d[1],p=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];return s(null),a(!0),Object(c.a)(e,t,n,r).then((function(e){return v(e.data),e})).catch((function(e){return s(e),o&&a(!1),Promise.reject(e)})).finally((function(){!o&&a(!1)}))};return{fetchLoading:r,error:l,datas:m,fetchAPi:p,ApiRequest:c.a}},y=function(){var e=Object(o.useRef)(null),t=b(Object(o.useState)(!1),2);return{parentElemt:e,fullLoading:t[0],setFullLoading:t[1]}},g=function(e,t){var n=b(Object(o.useState)(e),2),r=n[0],a=n[1];Object(o.useEffect)((function(){a(e)}),[e]);var c=Object(o.useCallback)((function(e){var n=e.page;r.meta&&r.meta.current_page!=n&&t&&t(n)}),[r]);return[r,a,c]},O=function(){var e=b(Object(o.useState)(""),2),t=e[0],n=e[1],r=Object(o.useCallback)((function(e){n(e)}),[n]);return{phone:t,setPhone:n,onPhoneValueChange:r}},h=function(){var e=Object(o.useRef)(null),t=b(Object(o.useState)(!1),2),n=t[0],r=t[1],c=b(Object(o.useState)(null),2),i=c[0],u=c[1],l=Object(o.useCallback)(function(){var t,n=(t=a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:u(n),e.current&&$(e.current).modal("show");case 2:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function c(e){d(o,r,a,c,i,"next",e)}function i(e){d(o,r,a,c,i,"throw",e)}c(void 0)}))});return function(e){return n.apply(this,arguments)}}(),[e.current,u]);return{modalConfirm:e,deletionLoading:n,setDeletionLoading:r,deletionId:i,setDeletionId:u,handleDelete:l,closeModal:function(){$(e.current).modal("hide"),r(!1),u(null)}}},j=function(e){var t=Object(l.a)().t,n=Object(u.c)((function(e){return e.eventTemplates})),r=n.ids,a=n.entities,c=function(){var e=Object(o.useRef)(null),t=Object(o.useRef)(null);return{templatesEl:e,slimInstance:t,getSlim:function(){return null===t.current&&(t.current=Object(i.slim)(e.current,{showSearch:!1})),t.current}}}(),d=c.getSlim,b=c.templatesEl,m=Object(u.b)();return Object(o.useEffect)((function(){return m(Object(s.d)(e)),function(){d().destroy()}}),[]),Object(o.useEffect)((function(){var e=d(),n=r.map((function(e){var t=a[e];return{text:t.name,value:t.id,selected:!1}}));e.setData([{text:t("Choisissez un modèle"),value:"#",selected:!0}].concat(f(n)))}),[r]),{templatesEl:b,ids:r,entities:a,getSlim:d}},E=function(){var e=b(Object(o.useState)([]),2),t=e[0],n=e[1];return{services:t,onChangeServices:Object(o.useCallback)((function(e){n(e)}),[n])}}},238:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return u}));var r=n(233),a=n.n(r);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=function(e){var t=e.loading,n=void 0!==t&&t,r=e.label,o=void 0===r?"":r,c=e.type,i=void 0===c?"button":c,u=e.disabled,l=void 0!==u&&u,s=e.onClick,f=void 0===s?null:s,d=e.color,b=void 0===d?"default":d,m=e.textColor,v=void 0===m?"":m;return a.a.createElement("button",{type:i,onClick:f,className:"btn btn-".concat(b," ").concat(v," btn-sm d-inline-flex align-content-center"),disabled:n||l},a.a.createElement("span",null,o),n&&a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{className:"mx-1"}),a.a.createElement("spinning-dots",{style:{width:"20px"}})))},u=function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e);return delete t.loading,a.a.createElement("button",t,a.a.createElement("div",{className:"d-inline-flex align-content-center"},a.a.createElement("span",null,e.label),e.loading&&a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{className:"mx-1"}),a.a.createElement("spinning-dots",{style:{width:"20px"}}))))}},398:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(233),a=n.n(r),o=n(677);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var u=function(e){var t=e.children,n=Object(o.a)().t,i=c(Object(r.useState)(!1),2),u=i[0],l=i[1];return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null,a.a.createElement("div",{className:"mb-3"},a.a.createElement("b",{className:"mr-3"},n("Besoin d'aide ?"),": "),a.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:function(){return l((function(e){return!e}))}},n(u?"Cacher":"Afficher"))),!u||t))}},399:function(e,t,n){"use strict";var r=n(233),a=n.n(r);t.a=function(){return a.a.createElement("div",{className:"my-3"})}},669:function(e,t,n){"use strict";n.r(t);var r=n(233),a=n.n(r),o=n(677),c=n(183),i=n.n(c),u=n(565),l=(n(567),n(3)),s=n(414),f=n.n(s),d=n(398),b=function(){var e=Object(o.a)().t,t="\n        - ".concat(e("Personnaliser l'apparence de vos images QR code, qui contiendront les codes d'invitations d'invités"),". <br>\n        - ").concat(e("L'image QR Code contiendra le code d'invité encodé et le contenu du code peut être décodé rapidement après avoir été lu par un lecteur de code-barres, un téléphone mobile, un smartphone, ou encore une webcam"),". <br>\n        - ").concat(e("Nous fournissons une application mobile en connexe pour le décodage et la validation de codes ou image QR Code de vos invités, et qui servira à authentifier leurs invitations"),". <br>\n        - ").concat(e("Si vous n'êtes pas intéressé, sachez que c'est facultatif"),". <br>\n        - ").concat(e("Après avoir effectué vos modifications, n'oubliez pas de cliquer sur le bouton Enregistrer"),". <br>\n    ");return a.a.createElement(a.a.Fragment,null,a.a.createElement(d.a,null,f()(l.c.show(null,t,!0,"bulb-61","primary"))))},m=n(399),v=n(182),p=n(47),y=n(238),g=n(32),O=n(12),h=n(237),j=n(103),E=n(236);function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return S(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return S(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var C=function(e){var t=e.onDataImage,n=e.onSaveComponent,c=Object(o.a)().t,i=Object(h.c)((function(e){return e.eventQrcodeLogoUrl})),l=w(Object(r.useState)(i||p.r.qrcodeImage),2),s=l[0],f=l[1],d=Object(r.useRef)(null),b=Object(r.useCallback)((function(){t(d.current.getCroppedCanvas().toDataURL())}),[]),m=Object(v.b)(b,250,null),y=Object(r.useCallback)((function(e){d.current=e}),[]),g=Object(r.useMemo)((function(){return{height:400,width:"100%"}}),[]);return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"col"},a.a.createElement("button",{type:"button",className:"btn btn-sm btn-secondary text-primary btn-open-file mb-3"},a.a.createElement("span",null,c("Ajouter Image")),a.a.createElement("input",{type:"file",onChange:function(e){var t;e.preventDefault(),e.dataTransfer?t=e.dataTransfer.files:e.target&&(t=e.target.files);var n=new FileReader;n.onload=function(){f(n.result)},n.readAsDataURL(t[0])},accept:"image/x-png,image/gif,image/jpeg"}))),a.a.createElement("div",{className:"col-auto"},n)),a.a.createElement(u.a,{src:s,viewMode:1,crossOrigin:"anonymous",guides:!0,minCropBoxHeight:10,minCropBoxWidth:10,background:!1,responsive:!0,autoCropArea:1,checkOrientation:!1,style:g,initialAspectRatio:1,checkCrossOrigin:!1,crop:m,onInitialized:y}))};t.default=function(){var e=Object(o.a)().t,t=Object(r.useRef)(null),n=w(Object(r.useState)(""),2),c=n[0],u=n[1],l=Object(h.b)(),s=Object(r.useRef)(null),f=Object(r.useMemo)((function(){return document.querySelector("meta[name=site-name]").getAttribute("content")}),[]),d=Object(r.useCallback)((function(e){s.current||u(e)}),[u]);Object(r.useEffect)((function(){s.current=null;var e=t.current,n=e.parentElement.getBoundingClientRect().width;return e.style.maxWidth=n/1.1+"px",e.style.maxHeight=n/1.1+"px",new i.a({canvas:e,content:f,width:2e3,logo:{src:c}}).toCanvas(),function(){s.current=!0}}),[c]);var v=Object(E.a)(),S=v.fetchLoading,A=v.fetchAPi;return a.a.createElement(a.a.Fragment,null,a.a.createElement(b,null),a.a.createElement("div",{className:"row justify-content-start"},a.a.createElement("div",{className:"col-lg-6"},a.a.createElement(m.a,null),a.a.createElement("div",{className:"text-center"},a.a.createElement("div",{className:"text-xs text-muted mt-3 mb-2"},e("Les images de QR code auront la forme ci-dessus lors de l'envoi de vos invitations"),".")),a.a.createElement("canvas",{ref:t,style:{overflow:"hidden"}})),a.a.createElement("div",{className:"col-lg-6"},a.a.createElement(m.a,null),a.a.createElement(C,{onSaveComponent:a.a.createElement(y.b,{loading:S,onClick:function(){A("put",p.r.setQrlogo,{data_url:c},!0).then((function(e){var t=e.data.logo_path;g.a.sussess(Object(O.a)({fr:"Enregisté",en:"saved"})),l(Object(j.b)(t))}))},label:e("Enregistrer")}),onDataImage:d}))))}}}]);
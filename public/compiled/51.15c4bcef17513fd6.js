(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{251:function(e,t,n){"use strict";n.d(t,"a",(function(){return g})),n.d(t,"h",(function(){return y})),n.d(t,"j",(function(){return E})),n.d(t,"i",(function(){return w})),n.d(t,"m",(function(){return O})),n.d(t,"l",(function(){return j})),n.d(t,"k",(function(){return S})),n.d(t,"c",(function(){return N})),n.d(t,"b",(function(){return x})),n.d(t,"g",(function(){return k})),n.d(t,"f",(function(){return C})),n.d(t,"d",(function(){return A})),n.d(t,"e",(function(){return F}));var r=n(0),a=n.n(r),o=n(240),c=n.n(o),l=n(695),i=n(12),u=n(32),s=n(48);function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t,n,r,a,o,c){try{var l=e[o](c),i=l.value}catch(e){return void n(e)}l.done?t(i):Promise.resolve(i).then(r,a)}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var c,l=e[Symbol.iterator]();!(r=(c=l.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var g=["{name}","{code}"],y=function(e){return window.SmsCounter.count(e)},E=function(){var e=v(Object(o.useState)(s.q.sms),2),t=e[0],n=e[1];return{handleSection:Object(o.useCallback)((function(e){var t=e.target.value;n(t)}),[n]),section:t}},w=function(){var e=Object(o.useRef)(null),t=v(Object(o.useState)(!1),2),n=t[0],r=t[1],c=v(Object(o.useState)(null),2),l=c[0],i=c[1],u=Object(o.useCallback)(function(){var t,n=(t=a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:i(n),e.current&&$(e.current).modal("show");case 2:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function c(e){b(o,r,a,c,l,"next",e)}function l(e){b(o,r,a,c,l,"throw",e)}c(void 0)}))});return function(e){return n.apply(this,arguments)}}(),[e.current,i]);return{modalConfirm:e,deletionLoading:n,setDeletionLoading:r,deletionId:l,setDeletionId:i,handleDelete:u,closeModal:function(){$(e.current).modal("hide"),r(!1),i(null)}}},O=function(e,t){var n=t.filter((function(t){return e.sms.indexOf(t)<0}));return n.length&&u.a.error(n.join(", ")+Object(i.a)({fr:" est / sont requis dans vos modèles sms text",en:"is / are required in your text sms templates"})),!n.length},j=function(e,t){var n=t.filter((function(t){return e.mail.indexOf(t)<0}));return n.length&&u.a.error(n.join(", ")+Object(i.a)({fr:" est / sont requis dans vos modèles mail text",en:"is / are required in your text mail templates"})),!n.length},S=function(e,t){var n=j(e,t);return O(e,t)&&n},N=function(e){var t=e.item,n=e.onDelete,r=e.canShown,a=void 0===r?null:r,o=Object(l.a)().t,i=E(),u=i.handleSection,s=i.section;return c.a.createElement(c.a.Fragment,null,t.show?c.a.createElement("div",{className:"row mt-3",onClick:function(e){return e.stopPropagation()}},c.a.createElement("div",{className:"col"},c.a.createElement(A,{onChange:u,icon:!1,name:"template_view-"+t.id,canShown:a})),c.a.createElement("div",{className:"col-auto"},n&&c.a.createElement("button",{type:"button",onClick:function(e){e.stopPropagation(),n(t.id)},className:"btn btn-secondary btn-sm text-danger"},o("Supprimer")))):"",c.a.createElement("p",{className:"text-sm mb-0",style:{cursor:"default"},onClick:function(e){return e.stopPropagation()}},t.show?k(s,t.text):k(s,t.text).slice(0,101)+"..."))},x={Ul:function(e){var t=e.children;return c.a.createElement("div",{className:"list-group list-group-flush"},t)},Li:function(e){var t=e.data,n=e.children,r=v(Object(o.useState)([]),2),a=r[0],i=r[1];Object(l.a)().t;Object(o.useEffect)((function(){i(t.map((function(e){return d(d({},e),{},{show:!1})})))}),[t]);return c.a.createElement(c.a.Fragment,null,a.map((function(e){return c.a.createElement("a",{key:String(e.id),onClick:function(t){return n=e.id,void i((function(e){return e.map((function(e){return d(d({},e),{},{show:n===e.id&&!e.show})}))}));var n},className:"list-group-item clickable-a clickable-list flex-column align-items-start py-4 px-4"},n(e))})))}},k=function(e,t){switch(e){case s.q.sms:return t.sms;case s.q.mail:return t.mail;default:return""}},C=function(e,t,n){var r={sms:"",mail:""};switch(e){case s.q.sms:r={sms:n,mail:t.mail};break;case s.q.mail:r={sms:t.sms,mail:n}}return d({},r)},q=function(e){var t=e.section,n=Object(l.a)().t;return c.a.createElement("ul",{id:"sms-counter",className:t!=s.q.sms?"d-none":""},c.a.createElement("li",null,n("sms"),": ",c.a.createElement("span",{className:"messages"})),c.a.createElement("li",null,n("Par sms"),": ",c.a.createElement("span",{className:"per_message"})))},P=function(e){var t=e.src,n=e.alt;return c.a.createElement("img",{src:t,className:"checkbox-icon",alt:n,width:"20",height:"20"})},D=function(e,t){return null===e||"object"===m(e)&&e.includes(t)},A=function(e){var t=e.onChange,n=e.icon,r=void 0===n||n,a=e.name,o=void 0===a?"message_view":a,i=e.canShown,u=void 0===i?null:i,m=Object(l.a)().t;return c.a.createElement("div",{className:"mb-3"},D(u,s.q.sms)&&c.a.createElement("div",{className:"custom-control custom-radio custom-control-inline"},c.a.createElement("input",{type:"radio",id:o+"-sms",defaultChecked:!0,onChange:t,name:o,value:s.q.sms,className:"custom-control-input"}),c.a.createElement("label",{className:"custom-control-label",htmlFor:o+"-sms"},r&&c.a.createElement(P,{src:"/img/svg/sms.svg",alt:"SMS"})," ",m("SMS"))),D(u,s.q.mail)&&c.a.createElement("div",{className:"custom-control custom-radio custom-control-inline"},c.a.createElement("input",{type:"radio",id:o+"-mail",onChange:t,name:o,value:s.q.mail,className:"custom-control-input"}),c.a.createElement("label",{className:"custom-control-label",htmlFor:o+"-mail"},r&&c.a.createElement(P,{src:"/img/svg/mail.svg",alt:"Mail"}),"  ",m("Mail"))))},F=function(e){var t=e.handleSection,n=e.section,r=e.handleTextChange,a=e.handleKeyUp,i=e.textValue,u=e.name,s=Object(l.a)().t;return Object(o.useEffect)((function(){var e=setTimeout((function(){$("#message").countSms("#sms-counter")}),500);return function(){clearTimeout(e)}}),[]),c.a.createElement(c.a.Fragment,null,c.a.createElement(A,{onChange:t}),c.a.createElement("div",{className:"form-group"},c.a.createElement(q,{section:n}),c.a.createElement("div",{className:"input-group input-group-merge"},c.a.createElement("textarea",{required:!0,id:"message",onChange:r,onKeyUp:a,value:k(n,i),placeholder:s("Entrez votre modèle texte ici")+"...",is:"textarea-autogrow",name:u,className:"form-control text-default",rows:8}))))}},684:function(e,t,n){"use strict";n.r(t);var r=n(251),a=n(48),o=n(240),c=n.n(o),l=n(421),i=n(695);t.default=function(){var e=Object(i.a)().t;return c.a.createElement(l.a,{tabs:[{key:"active",name:e("Actifs")}],selectedTab:"active",url:a.r.validators},(function(e){return c.a.createElement("div",{style:a.p},c.a.createElement(r.b.Ul,null,c.a.createElement(r.b.Li,{data:e.data||[]},(function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"row mb-1"},c.a.createElement("div",{className:"col"},c.a.createElement("h4",{className:"mb-1"},e.username),c.a.createElement("h4",{className:"mb-1"},c.a.createElement("small",null,e.name),c.a.createElement("br",null),c.a.createElement("small",null,e.phone)))))}))))}))}}}]);
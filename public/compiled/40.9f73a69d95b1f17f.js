(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{254:function(e,t,n){"use strict";var a=n(240),r=n.n(a);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var o=Object(a.memo)((function(e){var t=e.name,n=void 0===t?null:t,o=e.label,l=void 0===o?"":o,i=e.onChange,u=void 0===i?null:i,s=e.defaultChecked,m=e.checked,d=e.disabled,f=void 0===d?null:d,b=Math.random(),v=Object(a.useRef)(null);return Object(a.useEffect)((function(){v.current&&(v.current.checked=!!m)}),[m]),Object(a.useEffect)((function(){v.current&&(v.current.checked=!!s)}),[]),r.a.createElement("div",{className:"custom-control custom-checkbox"},r.a.createElement("input",c({type:"checkbox"},e,{defaultChecked:s,ref:v,disabled:f,className:"custom-control-input",name:n,onChange:u,id:n+b})),r.a.createElement("label",{className:"custom-control-label",htmlFor:n+b},l))}));t.a=o},256:function(e,t,n){"use strict";var a=n(240),r=n.n(a),c=n(717),o=n(245),l=n(247),i=Object(a.forwardRef)((function(e,t){var n=Object(c.a)().t;return Object(l.createPortal)(r.a.createElement("div",{className:"modal fade",ref:t,tabIndex:-1,role:"dialog","aria-hidden":"true"},r.a.createElement("div",{className:"modal-dialog modal-dialog-scrollable modal-dialog-centered ".concat(e.size||"modal-sm"),role:"document"},r.a.createElement("div",{className:"modal-content"},r.a.createElement("div",{className:"modal-body"},e.children," ",e.message||n("Êtes-vous sûr ?")),e.footer||r.a.createElement("div",{className:"modal-footer"},r.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm","data-dismiss":"modal"},e.closeText||n("Non")),r.a.createElement(o.b,{label:e.confirmText||n("Ouais"),loading:e.loading,disabled:e.disabledBtn,onClick:e.onConfirm}))))),document.body)}));t.a=i},260:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(240),r=n.n(a),c=function(e){var t=e.message;return r.a.createElement("div",{className:"row justify-content-center my-3"},r.a.createElement("div",{className:"col-md-4 col-12"},r.a.createElement("img",{src:"/img/svg/empty_x.svg"})),r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"text-center"},r.a.createElement("span",{className:"text-muted"},r.a.createElement("small",null,t)))))}},409:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(240),r=n.n(a),c=n(717);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],a=!0,r=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(a=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,c=e}finally{try{a||null==l.return||l.return()}finally{if(r)throw c}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var i=function(e){var t=e.children,n=Object(c.a)().t,l=o(Object(a.useState)(!1),2),i=l[0],u=l[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("div",{className:"mb-3"},r.a.createElement("b",{className:"mr-3"},n("Besoin d'aide ?"),": "),r.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:function(){return u((function(e){return!e}))}},n(i?"Cacher":"Afficher"))),!i||t))}},410:function(e,t,n){"use strict";var a=n(240),r=n.n(a);t.a=function(){return r.a.createElement("div",{className:"my-3"})}},709:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(240),o=n.n(c),l=n(717),i=n(2),u=n(432),s=n.n(u),m=n(409),d=function(){var e=Object(l.a)().t,t="\n        - ".concat(e("Enregistrer vos modèles message et personnaliser les selon vos type invités"),". <br>\n        - <b>{name}, {code}, {url}</b> : ").concat(e("ces trois clés seront remplacés aux informations relatives à l'invité"),", <br>\n        ").concat(e("d'où le")," <b>{name}</b> ").concat(e("sera traduit comme le nom de l'invité,")," <b>{code}</b>\n        ").concat(e("son code d'invitation pour l'événement,")," <b>{url}</b>\n        ").concat(e("un lien content son code au format qrcode mais celui-ci est optionnel"),".<br>\n        - ").concat(e("Cela dit, vous n'aurez pas à les modifier, ecrivez simplement vos modèles en y tenant compte"),". <br>\n        - ").concat(e("Un modèle message vous est proposé par défaut, vous pouvez commencer sur cette base"),". <br>\n    ");return o.a.createElement(o.a.Fragment,null,o.a.createElement(m.a,null,s()(i.c.show(null,t,!0,"bulb-61","primary"))))},f=n(7),b=n(245),v=n(244),p=n(49),g=n(48),h=n(260),y=n(410),E=n(256),j=n(259),O=n(243),w=n(12),N=n(255),x=n(254);function S(e,t,n,a,r,c,o){try{var l=e[c](o),i=l.value}catch(e){return void n(e)}l.done?t(i):Promise.resolve(i).then(a,r)}function k(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],a=!0,r=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(a=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,c=e}finally{try{a||null==l.return||l.return()}finally{if(r)throw c}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return C(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var A=w.b.getState().workingEvent.event_date,I={en:"Dear brother/sister {name},\nI want to express my wish to see you on my special wedding day, which will be on ".concat(A," at the Les Victorieux room, and this is why I am sending you this message. I look forward to seeing you on the day I tie the knot because the ceremony will be a little less complete without you. I love you!\nYour invitation code is: {code}.\n{url} use this link, if you want your code in picture.").trim(),fr:"Cher frère / sœur {name},\nje veux vous exprimer mon souhait de vous voir le jour de mon mariage spécial, qui sera au date du ".concat(A," à la salle Les Victorieux, et c'est pourquoi je vous envoie ce message. J'ai hâte de vous voir le jour où je me marierai car la cérémonie sera un peu moins complète sans vous. Je t'aime!\nVotre code d'invitation est: {code}.\n{url} utiliser ce lien, si vous voulez votre code en image.").trim()},T="description",F="name",q="sms_total",z="per_sms",M="text_sms",_="text_mail",D="global",L=function(){var e=Object(v.c)((function(e){return e.productTemplateEdit})),t=Object(v.b)(),n=Object(j.j)(),a=n.section,r=n.handleSection,l=Object(c.useMemo)((function(){return Object(f.a)(I)}),[I,f.a]),i=k(Object(c.useState)(e.sms?e:{sms:l,mail:l}),2),u=i[0],s=i[1],m=Object(c.useRef)(u);Object(c.useEffect)((function(){m.current=u}),[u]);var d=Object(c.useCallback)((function(e){var t=e.target.value;s((function(e){return Object(j.f)(a,e,t)}))}),[s,j.f,a]),b=Object(c.useCallback)((function(){t(Object(p.g)(m.current))}),[u,t,p.g]);return Object(c.useEffect)((function(){b()}),[]),o.a.createElement(o.a.Fragment,null,o.a.createElement(j.e,{section:a,handleTextChange:d,handleKeyUp:b,textValue:u,name:T,handleSection:r}))},R=function(){var e=Object(l.a)().t,t=Object(c.useRef)(null),n=Object(v.b)(),a=Object(v.c)((function(e){return e.productTemplateEdit})).templatename;return Object(c.useEffect)((function(){return t.current&&(t.current.value=a),function(){n(Object(p.f)(t.current.value))}}),[]),o.a.createElement("div",{className:"form-group"},o.a.createElement("div",{className:"input-group input-group-merge"},o.a.createElement("input",{ref:t,className:"form-control",name:F,placeholder:e("Mom du modèle"),type:"text",required:!0})))},P=function(){var e=j.a,t=Object(l.a)().t,n=Object(v.b)(),a=Object(c.useRef)(null),i=Object(O.a)(),u=i.fetchAPi,s=i.fetchLoading,m=Object(v.c)((function(e){return e.productTemplateEdit})),d=function(){var t,c=(t=r.a.mark((function t(c){var o,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(c.preventDefault(),Object(j.k)(m,e)){t.next=3;break}return t.abrupt("return");case 3:o=Object(j.h)(m.sms),(l=new FormData(a.current)).append(z,o.per_message.toString()),l.append(q,o.messages.toString()),l.append(M,m.sms),l.append(_,m.mail),u("post",g.p.eventTemplatesStore,l,!0).then((function(e){var t=e.data.data;return n(Object(p.a)(t))})).finally((function(){a.current.querySelector("[name=".concat(F,"]")).value=""}));case 10:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(a,r){var c=t.apply(e,n);function o(e){S(c,a,r,o,l,"next",e)}function l(e){S(c,a,r,o,l,"throw",e)}o(void 0)}))});return function(e){return c.apply(this,arguments)}}();return o.a.createElement("form",{ref:a,method:"post",onSubmit:d,autoComplete:"off"},o.a.createElement(R,null),o.a.createElement(L,null),o.a.createElement("div",{className:"is-global mb-2"},o.a.createElement("div",{className:"text-xs text-muted mt-3 mb-2"},t("Cochez cette case si vous souhaitez l'enregistrer en tant que modèle global pour vos événements"),"."),o.a.createElement(x.a,{name:D,label:t("Global")})),o.a.createElement(b.b,{loading:s,type:"submit",label:t("Enregistrer")}))},U=function(){var e=Object(l.a)().t,t=Object(v.c)((function(e){return e.eventTemplates})),n=t.ids,a=t.entities,r=t.loading,i=Object(v.b)();Object(c.useEffect)((function(){i(Object(p.d)(g.p.eventTemplates))}),[]);var u=Object(j.i)(),s=u.deletionId,m=u.setDeletionLoading,d=u.modalConfirm,f=u.closeModal,b=u.handleDelete,y=u.deletionLoading,w=Object(O.a)().ApiRequest,x=Object(c.useCallback)((function(){s&&(m(!0),w("delete",g.p.eventTemplates+"/"+s,{},!0).finally((function(){return f()})).then((function(){return i(Object(p.b)(s))})))}),[s]),S=n.map((function(e){return a[e]}));return o.a.createElement(o.a.Fragment,null,o.a.createElement(N.a,{loading:r==g.a.pending},r==g.a.idle&&n.length?o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{style:g.n},o.a.createElement(j.b.Ul,null,o.a.createElement(j.b.Li,{data:S},(function(t){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"d-flex w-100 justify-content-between"},o.a.createElement("h4",{className:"mb-1"},t.name),o.a.createElement("small",null,t.global&&o.a.createElement("span",null,"(",e("Global"),") "),e("SMS")," ",t.sms)),o.a.createElement(j.c,{item:t,onDelete:b}))})))),o.a.createElement(E.a,{loading:y,onConfirm:x,ref:d})):"",r!=g.a.idle||n.length?"":o.a.createElement("div",{className:"mt-5"},o.a.createElement(h.a,{message:e("Aucun modèle enregistré!")}))))};t.default=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(d,null),o.a.createElement("div",{className:"row justify-content-start"},o.a.createElement("div",{className:"col-lg-7"},o.a.createElement(y.a,null),o.a.createElement(P,null)),o.a.createElement("div",{className:"col-lg-5"},o.a.createElement(y.a,null),o.a.createElement(U,null))))}}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{227:function(e,t,n){"use strict";n.r(t),n.d(t,"init",(function(){return h}));var o=n(233),r=n.n(o),a=n(677),i=n(242),s=n(247),u=n(47),l=n(438);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],o=!0,r=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(o=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{o||null==s.return||s.return()}finally{if(r)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var m=Object(o.lazy)((function(){return Promise.all([n.e(0),n.e(10),n.e(43)]).then(n.bind(null,569))})),v=Object(o.lazy)((function(){return Promise.all([n.e(0),n.e(10),n.e(44)]).then(n.bind(null,570))})),p=Object(o.lazy)((function(){return Promise.all([n.e(0),n.e(3),n.e(13),n.e(17),n.e(38)]).then(n.bind(null,571))})),f=function(){var e=Object(a.a)().t,t=c(Object(o.useState)("Overview"),2),n=t[0],i=t[1],d=Object(o.useRef)(null),f=c(Object(o.useState)(!1),2),h=f[0],y=f[1],g=Object(o.useMemo)((function(){return{Absent:r.a.createElement(m,{setLoading:y}),Attended:r.a.createElement(v,{setLoading:y}),Overview:r.a.createElement(p,{setLoading:y})}}),[y]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"d-flex justify-content-between"},r.a.createElement("ul",{className:"nav nav-pills mt-3"},r.a.createElement("li",{className:"nav-item mr-2 mr-md-0"},r.a.createElement("a",{className:"nav-link clickable-a py-1 px-2 active",onClick:function(){return i("Overview")},"data-toggle":"tab"},r.a.createElement("span",null,e("Aperçu")))),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link clickable-a py-1 px-2",onClick:function(){return i("Attended")},"data-toggle":"tab"},r.a.createElement("span",null,e("Présent")))),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link clickable-a py-1 px-2",onClick:function(){return i("Absent")},"data-toggle":"tab"},r.a.createElement("span",null,e("Absent"))))),r.a.createElement("div",null,r.a.createElement(l.a,{onClick:function(){var e=document.querySelector("html").lang;window.location.href=u.r.eventReportDownload+"?locale="+e},alt:e("Télécharger Rapport")}))),r.a.createElement("div",{className:"mt-3"},r.a.createElement("div",{ref:d},r.a.createElement(o.Suspense,{fallback:r.a.createElement(s.a,{parent:d.current})},g[n]),h&&r.a.createElement(s.a,{parent:d.current}))))},h=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return Object(i.a)(r.a.createElement(f,null),e,t,n)}},242:function(e,t,n){"use strict";n.d(t,"a",(function(){return S}));var o=n(233),r=n.n(o),a=n(394),i=n(495),s={"Changer de numéro de téléphone":"Change phone number","Numéro de téléphone":"Phone number",Enregistrer:"Save",actif:"active",inactif:"inactive",Utilisateur:"User","Date d'événement":"Event date","Invités":"Guests","Montant présumé par rapport au nombre de vos invités":"Amount assumed in relation to the number of your guests",Continuer:"Continue","Votre Balance(le montant prêt à l'usage)":"Your Balance (the amount ready for use)",Balance:"Balance","Ajouter fonds":"Add funds","Nom d'événement":"Event Name","Nom D'événement":"Event Name","Nombre d'invité présumé":"Number of assumed guests","Créé":"Created",Salut:"Hi","Vous avez aucun événement pour le moment":"You have no event for the moment","Cliquez sur le bouton ci dessus pour en créer":"Click on the button above to create one","Mes Événements":"My Events","Nouveau Événement":"New Event",Profil:"Profile","Créer":"Create","Nombre d'Invitations":"Number of Invitations","Le montant est calculé par rapport à votre pays":"The amount is calculated in relation to your country","qui est le pays enregistré par défaut à votre compte utilisateur":"which is the country registered by default to your user account",Invitations:"Invitations",Montant:"Amount","Payez maintenant":"Pay now","Votre Paiement a bien été validé avec succès":"Your Payment has been successfully validated","Contactez nous pour une autre méthode de paiement":"Contact us for another payment method","Apres avoir completer le paiement selon aux instructions qui vous seront données, Un code de validation de paiement vous sera envoyé":"After completing the payment according to the instructions you will be given, a payment validation code will be sent to you","Code paiement":"Payment code",Valider:"Validate","Complétez votre paiement avec PayPal":"Complete your payment with PayPal","Montant à payer":"Amount to be paid",Editer:"Edit","Quand ma balance est en dessous":"When my balance falls below","Envoyer une alerte e-mail à":"Send an email alert to",Annuler:"Cancel","Recevez un e-mail lorsque votre solde passe en dessous d'un seuil":"Receive an email when your balance drops below a threshold","Désactiver les alertes de solde faible?":"Turn off low balance alerts?","Il est important de savoir quand votre solde est bas. Si vous êtes à court de fonds, votre service peut être interrompu":"It is important to know when your balance is low. If you run out of funds, your service may be interrupted","Désactiver":"Disable","Id Paiement":"Payment Id",Date:"Date","Méthode de paiement":"Method of payment","Code de devise":"Currency code","Montant consommé":"Amount consumed","Événement":"Event","Historique vide":"Empty history","Sélectionnez un mois":"Select a month","Historique de paiement":"Payment history","Historique d'utilisation":"Usage history","Télécharger Rapport":"Download Report","Alertes de solde faible":"Low balance alerts","Créé avec succès !":"Successfully Created!",Supprimer:"Remove","Aucun invité enregistré!":"No guest registered!","Déjà enregistrés":"Already registered","Enregistrez les invités qui seront commun(global) dans tous vos événements":"Record the guests who will be common (global) in your all events","Nom de l'invité":"Guest name","Numéro de téléphone de l'invité":"Guest phone number","Email de l'invité":"Guest email","(Optionnel)":"(Optional)",Optionnel:"Optional","Cocher cette case si vous souhaitez que le code d'invitation en image Qr code soit inclus dans le message":"Check this box if you want the invitation code in image Qr code to be included in the message","QR code Image":"QR code Image","Sélectionner les services qui seront utilisés à l'envoi du message":"Select the services that will be used when sending the message","Envoi en cours...":"Sending in progress...",Envoyer:"Send","Envoyé":"Send","Non Envoyé":"Not Send","Entrez le nombre d'invités qui seront autorisés utiliser cette invitation":"Enter the number of guests who will be allowed to use this invitation","Choisissez un de vos modèles enregistrés comme message d'envoi, vous pouvez également le modifier à votre guise":"Choose one of your saved models as a send message, you can also modify it as you wish","Autorisés":"Authorized","Modifier le text":"Edit text","Voir le text":"Preview text","Cochez cette case si vous souhaitez enregistrer l'invité et envoyer le message en même temps":"Check this box if you want to save the guest and send the message at the same time","Enregister et envoyer":"Save and send",Fermer:"Close","Êtes-vous sûr ?":"Are you sure ?","Tout envoyer":"Send all","Tout supprimer":"Delete all","Tout afficher":"Show all","Aucun Invité enregistré!":"No Registered Guests!","Enregistrer invité":"Save guest","Importer invités communs":"Import common guests","Enregistrez vos invités, vous pouvez enregistrer et envoyer l'invitation en même temps":"Register your guests, you can save and send the invitation at the same time","Pour d'autres informations, veuillez suivre les instructions ci-dessous ou contactez-nous":"For further information, please follow the instructions below or contact us","Avant d'enregistrer, veuillez estimer le prix qui sera consommé pour votre invité, pour la bonne gestion de votre fonds":"Before registering, please estimate the price that will be consumed for your guest, for the good management of your fund","Invités communs":"Common guests","Tout sélectionner":"Select all",Inclure:"Include","Choisissez un de vos modèles enregistrés comme message d'envoi pour les invités":"Choose one of your saved templates as a send message for guests","Invitations Envoyés":"Invitations Sent","Envois échoués":"Failed shipments","Dans l'attente":"Waiting","Personnaliser l'apparence de vos images QR code, qui contiendront les codes d'invitations d'invités":"Customize the appearance of your QR code images, which will contain guest invitation codes","L'image QR Code contiendra le code d'invité encodé et le contenu du code peut être décodé rapidement après avoir été lu par un lecteur de code-barres, un téléphone mobile, un smartphone, ou encore une webcam":"The QR Code image will contain the encoded guest code and the content of the code can be quickly decoded after being read by a barcode reader, mobile phone, smartphone, or even a webcam","Nous fournissons une application mobile en connexe pour le décodage et la validation de codes ou image QR Code de vos invités, et qui servira à authentifier leurs invitations":"We provide a related mobile application for decoding and validating codes or QR Code images of your guests, which will be used to authenticate their invitations.","Si vous n'êtes pas intéressé, sachez que c'est facultatif":"If you are not interested, know that it is optional","Après avoir effectué vos modifications, n'oubliez pas de cliquer sur le bouton Enregistrer":"After making your changes, don't forget to click on the Save button","Ajouter Image":"Add Image","Les images de QR code auront la forme ci-dessus lors de l'envoi de vos invitations":"QR code images will have the above form when sending your invitations","Enregistrer vos modèles message et personnaliser les selon vos type invités":"Save your message templates and customize them according to your type of guests","ces trois clés seront remplacés aux informations relatives à l'invité":"these three keys will be replaced with the information relating to the guest","sera traduit comme le nom de l'invité,":"will be translated as the name of the guest,","son code d'invitation pour l'événement,":"their invitation code for the event,","d'où le":"hence the","un lien content son code au format qrcode mais celui-ci est optionnel":"a link contains its code in qrcode format but this one is optional","Cela dit, vous n'aurez pas à les modifier, ecrivez simplement vos modèles en y tenant compte":"That said, you won't have to modify them, just write your models with them in mind","Un modèle message vous est proposé par défaut, vous pouvez commencer sur cette base":"A message template is proposed to you by default, you can start on this basis","Par sms":"Per SMS","Entrez votre modèle texte ici":"Enter your text template here","Mom du modèle":"Template name","Aucun modèle enregistré!":"No registered template!","Modèles":"Templates","Envoi et Invités":"Sending and Guests","Invitations présentées":"Presented invitations","Aperçu":"Overview","Présent":"Present",Absent:"Absent","Validé par":"Validated by","Validé à":"Validated at",Modifier:"Edit","Enregistrer les modifications":"Save Changes","Nom d'utilisateur":"Username","Ce numéro sera utilisé lors de l'envoi de la notification si bien sûr vous cochez la case ci-dessous":"This number will be used when sending the notification if of course you check the box below","1 SMS vous sera facturé à l'envoi de la notification":"1 SMS will be charged when sending the notification","Aucun utilisateur enregistré!":"No registered user!","Une erreur s'est produite. Veuillez réessayer en actualisant la page":"An error has occurred. Please try again by refreshing the page",Afficher:"Show","Besoin d'aide":"Need help",Cacher:"Hide",Non:"No",Ouais:"Ok","Page non trouvée":"Page not found","Besoin d'aide ?":"Need help ?","Estimer Prix":"Estimate Price",Indisponible:"Unavailable","Choisissez un modèle":"Choose a model","Activer les alertes de solde faible":"Enable low balance alerts","Il est important de savoir quand votre solde est bas":"It is important to know when your balance is low","Si vous êtes à court de fonds, votre service peut être interrompu":"If you run out of funds, your service may be interrupted","Résumé":"Summary","Hey! Souhaitez-vous parler des Tarification, paiement, du support ou de n'importe quel autre":"Hey! Would you like to talk about Pricing, Payment, Support or any other",Paiement:"Payment",Tarification:"Pricing","Autre Chose":"Something else","Envoyer un message":"Send a message","Hey, voulez-vous que cette discussion soit une priorité":"Hey, do you want this discussion to be a priority",Oui:"Yes","En ligne":"Online","Une fois cette discussion terminée, elle sera supprimée dans deux heures":"Once this discussion is complete, it will be deleted in two hours","Comment puis-je vous aider ?":"How can I help you ?","Revenez à votre dernière discussion":"Go back to your last discussion","Votre fichier ne doit pas dépasser plus de 5MG":"Votre fichier ne doit pas dépasser plus de 5MG","Votre discussion de chat est vide, veuillez commencer par un texte":"Your chat discussion is empty, please start with a text","Votre Paiement a bien été approuvé avec succès":"Your Payment has been successfully approved","Cochez cette case si vous souhaitez l'enregistrer en tant que modèle global pour vos événements":"Check this box if you want to save it as a global template for your events"},u=function(e){a.a.use(i.e).init({resources:{en:{translation:s}},lng:e,interpolation:{escapeValue:!1}})},l=n(47),c=n(237),d=n(10),m=n(677);function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=g(e);if(t){var r=g(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return y(this,n)}}function y(e,t){return!t||"object"!==v(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(i,e);var t,n,o,a=h(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=a.call(this,e)).state={hasError:!1},t}return t=i,o=[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}],(n=[{key:"componentDidCatch",value:function(e,t){console.log(e,t)}},{key:"render",value:function(){return this.state.hasError?r.a.createElement("div",{className:"row justify-content-center my-3"},r.a.createElement("div",{className:"col-md-4 col-12 text-danger text-center text-lg"},r.a.createElement("i",{className:"ni ni-user-run text-lg"})),r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"text-center"},r.a.createElement("span",{className:"text-muted"},r.a.createElement("small",null,this.props.message))))):this.props.children}}])&&p(t.prototype,n),o&&p(t,o),i}(r.a.Component),w=function(e){var t=e.children,n=e.message,o=void 0===n?null:n,a=Object(m.a)().t;return r.a.createElement(b,{message:o||a("Une erreur s'est produite. Veuillez réessayer en actualisant la page")},t)},E=function(e){var t=e.children;return r.a.createElement(c.a,{store:d.b},r.a.createElement(w,null,t))},C=n(240),S=function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return u(n),Object(l.v)(o),Object(l.u)(n),Object(C.render)(r.a.createElement(E,null,e),t),function(){return Object(C.unmountComponentAtNode)(t)}}},247:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n(233),r=n.n(o),a=function(e){var t=e.parent,n=e.showLoader,o=void 0===n||n,a=e.children;return t&&(t.style.position="relative"),r.a.createElement("div",{className:"loading-ntf-abs"},r.a.createElement("div",{className:"uil-ring-css-abs"},o&&r.a.createElement("spinning-dots",{style:{width:"30px",strokeWidth:"4px",color:"#5e72e4"}}),!o&&a))}},438:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n(233),r=n.n(o),a=function(e){var t=e.width,n=void 0===t?"25px":t,o=e.height,a=void 0===o?"15px":o,i=e.onClick,s=e.alt;return r.a.createElement("button",{type:"button",onClick:i,className:"btn btn-secondary btn-sm"},r.a.createElement("img",{style:{width:n,height:a},src:"/img/svg/down-arrow.svg",alt:s}))}}}]);
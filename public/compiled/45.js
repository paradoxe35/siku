(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[45],{

/***/ "./asset/js/controllers/Customer/Settings/Index.jsx":
/*!**********************************************************!*\
  !*** ./asset/js/controllers/Customer/Settings/Index.jsx ***!
  \**********************************************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var _js_react_init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/js/react/init */ \"./asset/js/react/init.js\");\n/* harmony import */ var _js_react_components_Datetime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/js/react/components/Datetime */ \"./asset/js/react/components/Datetime.jsx\");\n/* harmony import */ var _js_react_components_Buttons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/js/react/components/Buttons */ \"./asset/js/react/components/Buttons.jsx\");\n/* harmony import */ var _js_functions_notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/js/functions/notifier */ \"./asset/js/functions/notifier.js\");\n/* harmony import */ var _js_functions_localize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/js/functions/localize */ \"./asset/js/functions/localize.js\");\n/* harmony import */ var _js_react_vars__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/js/react/vars */ \"./asset/js/react/vars.js\");\n/* harmony import */ var _js_react_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/js/react/hooks */ \"./asset/js/react/hooks.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _js_store_features_EventSlice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/js/store/features/EventSlice */ \"./asset/js/store/features/EventSlice.js\");\n/* harmony import */ var _js_modules_turbolinks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/js/modules/turbolinks */ \"./asset/js/modules/turbolinks.js\");\n//@ts-check\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar CustomerSettings = function CustomerSettings() {\n  var _useTranslation = Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__[\"useTranslation\"])(),\n      t = _useTranslation.t;\n\n  var _useFetch = Object(_js_react_hooks__WEBPACK_IMPORTED_MODULE_8__[\"useFetch\"])(),\n      fetchAPi = _useFetch.fetchAPi,\n      loading = _useFetch.fetchLoading;\n\n  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__[\"useDispatch\"])();\n  /**\r\n   * @type { { name:string, is_public: boolean, event_date:string } }\r\n   */\n  // @ts-ignore\n\n  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__[\"useSelector\"])(function (s) {\n    return s.workingEvent;\n  }),\n      name = _useSelector.name,\n      is_public = _useSelector.is_public,\n      event_date = _useSelector.event_date;\n\n  var handleSubmit = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(function (e) {\n    e.preventDefault(); // @ts-ignore\n\n    var form = new FormData(e.target);\n    fetchAPi('put', _js_react_vars__WEBPACK_IMPORTED_MODULE_7__[\"URLS\"].eventUpdate, form, true).then(function (_ref) {\n      var data = _ref.data;\n      dispatch(Object(_js_store_features_EventSlice__WEBPACK_IMPORTED_MODULE_10__[\"setCurrentEvent\"])(data));\n      _js_functions_notifier__WEBPACK_IMPORTED_MODULE_5__[\"Notifier\"].sussess(Object(_js_functions_localize__WEBPACK_IMPORTED_MODULE_6__[\"Localize\"])({\n        fr: 'Modifications enregistrées',\n        en: 'Saved changes'\n      }));\n      _js_modules_turbolinks__WEBPACK_IMPORTED_MODULE_11__[\"TurbolinksApp\"].isc.visit(_js_react_vars__WEBPACK_IMPORTED_MODULE_7__[\"URLS\"].eventSettingsRoute, {\n        action: 'replace'\n      });\n    });\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h5\", {\n    className: \"my-4\"\n  }, t('Modifier')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col-lg-6\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n    method: \"post\",\n    onSubmit: handleSubmit,\n    autoComplete: \"off\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"form-group\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"input-group input-group-merge\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    className: \"form-control\",\n    defaultValue: name,\n    name: \"event_name\",\n    placeholder: t('Nom D\\'événement'),\n    type: \"text\",\n    required: true\n  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col-md-6\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"form-group\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_js_react_components_Datetime__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    locale: \"fr\",\n    dateFormat: \"YYYY-MM-DD\",\n    defaultValue: event_date,\n    inputProps: {\n      placeholder: t(\"Date d'événement\"),\n      className: \"form-control\",\n      name: \"event_date\",\n      required: true\n    }\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"row mb-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col-md-6\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"custom-control custom-checkbox\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"checkbox\",\n    defaultChecked: is_public,\n    name: \"is_public\",\n    className: \"custom-control-input\",\n    id: \"customCheck1\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    className: \"custom-control-label text-muted\",\n    htmlFor: \"customCheck1\"\n  }, t('Public'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_js_react_components_Buttons__WEBPACK_IMPORTED_MODULE_4__[\"DefaultButton\"], {\n    label: t('Enregistrer les modifications'),\n    loading: loading,\n    type: \"submit\"\n  })))));\n};\n/**\r\n * @param { HTMLElement|Element } element \r\n * @param { string } locale \r\n * @param { Object } urls \r\n */\n\n\nvar init = function init(element, locale) {\n  var urls = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  return Object(_js_react_init__WEBPACK_IMPORTED_MODULE_2__[\"InitReact\"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CustomerSettings, null), element, locale, urls);\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldC9qcy9jb250cm9sbGVycy9DdXN0b21lci9TZXR0aW5ncy9JbmRleC5qc3g/MjE2YiJdLCJuYW1lcyI6WyJDdXN0b21lclNldHRpbmdzIiwidXNlVHJhbnNsYXRpb24iLCJ0IiwidXNlRmV0Y2giLCJmZXRjaEFQaSIsImxvYWRpbmciLCJkaXNwYXRjaCIsInVzZURpc3BhdGNoIiwidXNlU2VsZWN0b3IiLCJzIiwibmFtZSIsImlzX3B1YmxpYyIsImV2ZW50X2RhdGUiLCJoYW5kbGVTdWJtaXQiLCJ1c2VDYWxsYmFjayIsImUiLCJmb3JtIiwiVVJMUyIsImRhdGEiLCJzZXRDdXJyZW50RXZlbnQiLCJOb3RpZmllciIsIkxvY2FsaXplIiwiZnIiLCJlbiIsIlR1cmJvbGlua3NBcHAiLCJhY3Rpb24iLCJwbGFjZWhvbGRlciIsImNsYXNzTmFtZSIsInJlcXVpcmVkIiwiaW5pdCIsInVybHMiLCJJbml0UmVhY3QiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsSUFBTUEsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixHQUFNO0FBQUEsd0JBQ2JDLG9FQURhO0FBQUEsTUFDbkJDLENBRG1COztBQUFBLGtCQUVpQkMsZ0VBRmpCO0FBQUEsTUFFbkJDLFFBRm1CO0FBQUEsTUFFS0MsT0FGTDs7QUFHM0IsTUFBTUMsUUFBUSxHQUFHQywrREFBakI7QUFDQTs7O0FBR0E7O0FBUDJCLHFCQVFhQywrREFBVyxDQUFDLGFBQUM7QUFBQSxXQUFJQyxDQUFDLENBQUw7QUFSMUIsR0FRd0IsQ0FSeEI7QUFBQSxNQVFuQkMsSUFSbUI7QUFBQSxNQVFiQyxTQVJhO0FBQUEsTUFRRkMsVUFSRTs7QUFVM0IsTUFBTUMsWUFBWSxHQUFHQyx5REFBVyxDQUFDLGFBQU87QUFDcENDLEtBQUMsQ0FEbUMsY0FDcENBLEdBRG9DLENBRXBDOztBQUNBLFFBQU1DLElBQUksR0FBRyxhQUFhRCxDQUFDLENBQTNCLE1BQWEsQ0FBYjtBQUNBWCxZQUFRLFFBQVFhLG1EQUFJLENBQVosbUJBQVJiLElBQVEsQ0FBUkEsTUFDVSxnQkFBYztBQUFBLFVBQVhjLElBQVcsUUFBWEEsSUFBVztBQUNoQlosY0FBUSxDQUFDYSxzRkFBZSxDQUF4QmIsSUFBd0IsQ0FBaEIsQ0FBUkE7QUFDQWMscUVBQVEsQ0FBUkEsUUFBaUJDLHVFQUFRLENBQUM7QUFDdEJDLFVBQUUsRUFEb0I7QUFFdEJDLFVBQUUsRUFBRTtBQUZrQixPQUFELENBQXpCSDtBQUlBSSwyRUFBYSxDQUFiQSxVQUF3QlAsbURBQUksQ0FBNUJPLG9CQUFpRDtBQUFFQyxjQUFNLEVBQUU7QUFBVixPQUFqREQ7QUFQUnBCO0FBSjRCLEtBQWhDLEVBQWdDLENBQWhDO0FBY0Esc0JBQU8scUlBQ0g7QUFBSSxhQUFTLEVBQUM7QUFBZCxLQUFzQkYsQ0FBQyxDQURwQixVQUNvQixDQUF2QixDQURHLGVBRUg7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDSTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNJO0FBQU0sVUFBTSxFQUFaO0FBQW9CLFlBQVEsRUFBNUI7QUFBNEMsZ0JBQVksRUFBQztBQUF6RCxrQkFDSTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNJO0FBQUssYUFBUyxFQUFDO0FBQWYsa0JBQ0k7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDSTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNJO0FBQU8sYUFBUyxFQUFoQjtBQUFnQyxnQkFBWSxFQUE1QztBQUFvRCxRQUFJLEVBQXhEO0FBQ0ksZUFBVyxFQUFFQSxDQUFDLENBRGxCLGtCQUNrQixDQURsQjtBQUN3QyxRQUFJLEVBRDVDO0FBQ29ELFlBQVE7QUFENUQsSUFESixDQURKLENBREosQ0FESixDQURKLGVBV0k7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDSTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNJO0FBQUssYUFBUyxFQUFDO0FBQWYsa0JBQ0k7QUFBVSxVQUFNLEVBQWhCO0FBQ0ksY0FBVSxFQURkO0FBRUksZ0JBQVksRUFGaEI7QUFHSSxjQUFVLEVBQUU7QUFDUndCLGlCQUFXLEVBQUV4QixDQUFDLENBRE4sa0JBQ00sQ0FETjtBQUVSeUIsZUFBUyxFQUZEO0FBRW1CakIsVUFBSSxFQUZ2QjtBQUV1Q2tCLGNBQVEsRUFBRTtBQUZqRDtBQUhoQixJQURKLENBREosQ0FESixDQVhKLGVBd0JJO0FBQUssYUFBUyxFQUFDO0FBQWYsa0JBQ0k7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDSTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNJO0FBQU8sUUFBSSxFQUFYO0FBQXVCLGtCQUFjLEVBQXJDO0FBQWtELFFBQUksRUFBdEQ7QUFBbUUsYUFBUyxFQUE1RTtBQUFvRyxNQUFFLEVBQUM7QUFBdkcsSUFESixlQUVJO0FBQU8sYUFBUyxFQUFoQjtBQUFtRCxXQUFPLEVBQUM7QUFBM0QsS0FDSzFCLENBQUMsQ0E3QnRCLFFBNkJzQixDQUROLENBRkosQ0FESixDQURKLENBeEJKLGVBa0NJO0FBQWUsU0FBSyxFQUFFQSxDQUFDLENBQXZCLCtCQUF1QixDQUF2QjtBQUEwRCxXQUFPLEVBQWpFO0FBQTRFLFFBQUksRUFBQztBQUFqRixJQWxDSixDQURKLENBREosQ0FGRyxDQUFQO0FBeEJKO0FBcUVBOzs7Ozs7O0FBS08sSUFBTTJCLElBQUksR0FBRyxTQUFQQSxJQUFPO0FBQUEsTUFBa0JDLElBQWxCO0FBQUEsU0FDaEJDLGdFQUFTLGVBQUMsNkVBQUQsSUFBQyxDQUFELG1CQURPLElBQ1AsQ0FETztBQUFiIiwiZmlsZSI6Ii4vYXNzZXQvanMvY29udHJvbGxlcnMvQ3VzdG9tZXIvU2V0dGluZ3MvSW5kZXguanN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9AdHMtY2hlY2tcclxuaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50LCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB1c2VUcmFuc2xhdGlvbiB9IGZyb20gXCJyZWFjdC1pMThuZXh0XCI7XHJcbmltcG9ydCB7IEluaXRSZWFjdCB9IGZyb20gJ0AvanMvcmVhY3QvaW5pdCc7XHJcbmltcG9ydCBEYXRldGltZSBmcm9tICdAL2pzL3JlYWN0L2NvbXBvbmVudHMvRGF0ZXRpbWUnO1xyXG5pbXBvcnQgeyBEZWZhdWx0QnV0dG9uIH0gZnJvbSAnQC9qcy9yZWFjdC9jb21wb25lbnRzL0J1dHRvbnMnO1xyXG5pbXBvcnQgeyBOb3RpZmllciB9IGZyb20gJ0AvanMvZnVuY3Rpb25zL25vdGlmaWVyJztcclxuaW1wb3J0IHsgTG9jYWxpemUgfSBmcm9tICdAL2pzL2Z1bmN0aW9ucy9sb2NhbGl6ZSc7XHJcbmltcG9ydCB7IFVSTFMgfSBmcm9tICdAL2pzL3JlYWN0L3ZhcnMnO1xyXG5pbXBvcnQgeyB1c2VGZXRjaCB9IGZyb20gJ0AvanMvcmVhY3QvaG9va3MnO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgc2V0Q3VycmVudEV2ZW50IH0gZnJvbSAnQC9qcy9zdG9yZS9mZWF0dXJlcy9FdmVudFNsaWNlJztcclxuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFR1cmJvbGlua3NBcHAgfSBmcm9tICdAL2pzL21vZHVsZXMvdHVyYm9saW5rcyc7XHJcblxyXG5cclxuY29uc3QgQ3VzdG9tZXJTZXR0aW5ncyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgdCB9ID0gdXNlVHJhbnNsYXRpb24oKVxyXG4gICAgY29uc3QgeyBmZXRjaEFQaSwgZmV0Y2hMb2FkaW5nOiBsb2FkaW5nIH0gPSB1c2VGZXRjaCgpXHJcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKClcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgeyB7IG5hbWU6c3RyaW5nLCBpc19wdWJsaWM6IGJvb2xlYW4sIGV2ZW50X2RhdGU6c3RyaW5nIH0gfVxyXG4gICAgICovXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCB7IG5hbWUsIGlzX3B1YmxpYywgZXZlbnRfZGF0ZSB9ID0gdXNlU2VsZWN0b3IocyA9PiBzLndvcmtpbmdFdmVudClcclxuXHJcbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSB1c2VDYWxsYmFjaygoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKGUudGFyZ2V0KVxyXG4gICAgICAgIGZldGNoQVBpKCdwdXQnLCBVUkxTLmV2ZW50VXBkYXRlLCBmb3JtLCB0cnVlKVxyXG4gICAgICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNldEN1cnJlbnRFdmVudChkYXRhKSlcclxuICAgICAgICAgICAgICAgIE5vdGlmaWVyLnN1c3Nlc3MoTG9jYWxpemUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZyOiAnTW9kaWZpY2F0aW9ucyBlbnJlZ2lzdHLDqWVzJyxcclxuICAgICAgICAgICAgICAgICAgICBlbjogJ1NhdmVkIGNoYW5nZXMnXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIFR1cmJvbGlua3NBcHAuaXNjLnZpc2l0KFVSTFMuZXZlbnRTZXR0aW5nc1JvdXRlLCB7IGFjdGlvbjogJ3JlcGxhY2UnIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LCBbXSlcclxuICAgIHJldHVybiA8PlxyXG4gICAgICAgIDxoNSBjbGFzc05hbWU9XCJteS00XCI+e3QoJ01vZGlmaWVyJyl9PC9oNT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy02XCI+XHJcbiAgICAgICAgICAgICAgICA8Zm9ybSBtZXRob2Q9XCJwb3N0XCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gYXV0b0NvbXBsZXRlPVwib2ZmXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgaW5wdXQtZ3JvdXAtbWVyZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIGRlZmF1bHRWYWx1ZT17bmFtZX0gbmFtZT1cImV2ZW50X25hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ05vbSBEXFwnw6l2w6luZW1lbnQnKX0gdHlwZT1cInRleHRcIiByZXF1aXJlZCAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEYXRldGltZSBsb2NhbGU9J2ZyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0PVwiWVlZWS1NTS1ERFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZXZlbnRfZGF0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHQoXCJEYXRlIGQnw6l2w6luZW1lbnRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sXCIsIG5hbWU6IFwiZXZlbnRfZGF0ZVwiLCByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IG1iLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdXN0b20tY29udHJvbCBjdXN0b20tY2hlY2tib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgZGVmYXVsdENoZWNrZWQ9e2lzX3B1YmxpY30gbmFtZT1cImlzX3B1YmxpY1wiIGNsYXNzTmFtZT1cImN1c3RvbS1jb250cm9sLWlucHV0XCIgaWQ9XCJjdXN0b21DaGVjazFcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjdXN0b20tY29udHJvbC1sYWJlbCB0ZXh0LW11dGVkXCIgaHRtbEZvcj1cImN1c3RvbUNoZWNrMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dCgnUHVibGljJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8RGVmYXVsdEJ1dHRvbiBsYWJlbD17dCgnRW5yZWdpc3RyZXIgbGVzIG1vZGlmaWNhdGlvbnMnKX0gbG9hZGluZz17bG9hZGluZ30gdHlwZT1cInN1Ym1pdFwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC8+XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyBIVE1MRWxlbWVudHxFbGVtZW50IH0gZWxlbWVudCBcclxuICogQHBhcmFtIHsgc3RyaW5nIH0gbG9jYWxlIFxyXG4gKiBAcGFyYW0geyBPYmplY3QgfSB1cmxzIFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGluaXQgPSAoZWxlbWVudCwgbG9jYWxlLCB1cmxzID0ge30pID0+XHJcbiAgICBJbml0UmVhY3QoPEN1c3RvbWVyU2V0dGluZ3MgLz4sIGVsZW1lbnQsIGxvY2FsZSwgdXJscyk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./asset/js/controllers/Customer/Settings/Index.jsx\n");

/***/ }),

/***/ "./asset/js/react/components/ErrorBoundary.jsx":
/*!*****************************************************!*\
  !*** ./asset/js/react/components/ErrorBoundary.jsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\nfunction _typeof(obj) {\n  \"@babel/helpers - typeof\";\n\n  if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") {\n    _typeof = function _typeof(obj) {\n      return typeof obj;\n    };\n  } else {\n    _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n    };\n  }\n\n  return _typeof(obj);\n}\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) _setPrototypeOf(subClass, superClass);\n}\n\nfunction _setPrototypeOf(o, p) {\n  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nfunction _createSuper(Derived) {\n  var hasNativeReflectConstruct = _isNativeReflectConstruct();\n\n  return function _createSuperInternal() {\n    var Super = _getPrototypeOf(Derived),\n        result;\n\n    if (hasNativeReflectConstruct) {\n      var NewTarget = _getPrototypeOf(this).constructor;\n\n      result = Reflect.construct(Super, arguments, NewTarget);\n    } else {\n      result = Super.apply(this, arguments);\n    }\n\n    return _possibleConstructorReturn(this, result);\n  };\n}\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return _assertThisInitialized(self);\n}\n\nfunction _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nfunction _isNativeReflectConstruct() {\n  if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n  if (Reflect.construct.sham) return false;\n  if (typeof Proxy === \"function\") return true;\n\n  try {\n    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));\n    return true;\n  } catch (e) {\n    return false;\n  }\n}\n\nfunction _getPrototypeOf(o) {\n  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n} //@ts-check\n\n\n\n\n\nvar ErrorBoundaryComponent = /*#__PURE__*/function (_React$Component) {\n  _inherits(ErrorBoundaryComponent, _React$Component);\n\n  var _super = _createSuper(ErrorBoundaryComponent);\n\n  function ErrorBoundaryComponent(props) {\n    var _this;\n\n    _classCallCheck(this, ErrorBoundaryComponent);\n\n    _this = _super.call(this, props);\n    _this.state = {\n      hasError: false\n    };\n    return _this;\n  }\n\n  _createClass(ErrorBoundaryComponent, [{\n    key: \"componentDidCatch\",\n    value: function componentDidCatch(error, errorInfo) {\n      console.log(error, errorInfo);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      if (this.state.hasError) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"row justify-content-center my-3\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"col-md-4 col-12 text-danger text-center text-lg\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n          className: \"ni ni-user-run text-lg\"\n        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"col-12\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"text-center\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n          className: \"text-muted\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"small\", null, this.props.message)))));\n      }\n\n      return this.props.children;\n    }\n  }], [{\n    key: \"getDerivedStateFromError\",\n    value: function getDerivedStateFromError(error) {\n      // Update state so the next render will show the fallback UI.\n      return {\n        hasError: true\n      };\n    }\n  }]);\n\n  return ErrorBoundaryComponent;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nvar ErrorBoundary = function ErrorBoundary(_ref) {\n  var children = _ref.children,\n      _ref$message = _ref.message,\n      message = _ref$message === void 0 ? null : _ref$message;\n\n  var _useTranslation = Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__[\"useTranslation\"])(),\n      t = _useTranslation.t;\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBoundaryComponent, {\n    message: message || t(\"Une erreur s'est produite. Veuillez réessayer en réactualisant la page\")\n  }, children);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ErrorBoundary);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldC9qcy9yZWFjdC9jb21wb25lbnRzL0Vycm9yQm91bmRhcnkuanN4PzEzMWMiXSwibmFtZXMiOlsiRXJyb3JCb3VuZGFyeUNvbXBvbmVudCIsImhhc0Vycm9yIiwiZXJyb3IiLCJlcnJvckluZm8iLCJjb25zb2xlIiwiUmVhY3QiLCJDb21wb25lbnQiLCJFcnJvckJvdW5kYXJ5IiwiY2hpbGRyZW4iLCJtZXNzYWdlIiwidXNlVHJhbnNsYXRpb24iLCJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFBOzs7QUFDQTtBQUNBOztJQUVNQSxzQjs7Ozs7QUFDRix5Q0FBbUI7QUFBQTs7QUFBQTs7QUFDZjtBQUNBLGtCQUFhO0FBQUVDLGNBQVEsRUFBRTtBQUFaLEtBQWI7QUFGZTtBQUdsQjs7OztzQ0FPaUJDLEssRUFBT0MsUyxFQUFXO0FBQ2hDQyxhQUFPLENBQVBBO0FBQ0g7Ozs2QkFFUTtBQUNMLFVBQUksV0FBSixVQUF5QjtBQUNyQiw0QkFBTztBQUFLLG1CQUFTLEVBQUM7QUFBZix3QkFDSDtBQUFLLG1CQUFTLEVBQUM7QUFBZix3QkFDSTtBQUFHLG1CQUFTLEVBQUM7QUFBYixVQURKLENBREcsZUFJSDtBQUFLLG1CQUFTLEVBQUM7QUFBZix3QkFDSTtBQUFLLG1CQUFTLEVBQUM7QUFBZix3QkFDSTtBQUFNLG1CQUFTLEVBQUM7QUFBaEIsd0JBQ0ksMEVBQVEsV0FQeEIsT0FPZ0IsQ0FESixDQURKLENBREosQ0FKRyxDQUFQO0FBWUg7O0FBQ0QsYUFBTyxXQUFQO0FBQ0g7Ozs2Q0F6QitCRixLLEVBQU87QUFDbkM7QUFDQSxhQUFPO0FBQUVELGdCQUFRLEVBQUU7QUFBWixPQUFQO0FBQ0g7Ozs7RUFUZ0NJLDRDQUFLLENBQUNDLFM7O0FBa0MzQyxJQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLE9BQWtDO0FBQUEsTUFBL0JDLFFBQStCLFFBQS9CQSxRQUErQjtBQUFBLDBCQUFyQkMsT0FBcUI7QUFBQSxNQUFyQkEsT0FBcUIsNkJBQVgsSUFBVzs7QUFBQSx3QkFDdENDLG9FQURzQztBQUFBLE1BQzVDQyxDQUQ0Qzs7QUFFcEQsc0JBQU87QUFBd0IsV0FBTyxFQUNsQ0YsT0FBTyxJQUFJRSxDQUFDO0FBRFQsS0FBUCxRQUFPLENBQVA7QUFGSjs7QUFTQSIsImZpbGUiOiIuL2Fzc2V0L2pzL3JlYWN0L2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qc3guanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0B0cy1jaGVja1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAncmVhY3QtaTE4bmV4dCc7XHJcblxyXG5jbGFzcyBFcnJvckJvdW5kYXJ5Q29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IGhhc0Vycm9yOiBmYWxzZSB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3IpIHtcclxuICAgICAgICAvLyBVcGRhdGUgc3RhdGUgc28gdGhlIG5leHQgcmVuZGVyIHdpbGwgc2hvdyB0aGUgZmFsbGJhY2sgVUkuXHJcbiAgICAgICAgcmV0dXJuIHsgaGFzRXJyb3I6IHRydWUgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRDYXRjaChlcnJvciwgZXJyb3JJbmZvKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IsIGVycm9ySW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG15LTNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTQgY29sLTEyIHRleHQtZGFuZ2VyIHRleHQtY2VudGVyIHRleHQtbGdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJuaSBuaS11c2VyLXJ1biB0ZXh0LWxnXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1tdXRlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPnt0aGlzLnByb3BzLm1lc3NhZ2V9PC9zbWFsbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IEVycm9yQm91bmRhcnkgPSAoeyBjaGlsZHJlbiwgbWVzc2FnZSA9IG51bGwgfSkgPT4ge1xyXG4gICAgY29uc3QgeyB0IH0gPSB1c2VUcmFuc2xhdGlvbigpXHJcbiAgICByZXR1cm4gPEVycm9yQm91bmRhcnlDb21wb25lbnQgbWVzc2FnZT17XHJcbiAgICAgICAgbWVzc2FnZSB8fCB0KFwiVW5lIGVycmV1ciBzJ2VzdCBwcm9kdWl0ZS4gVmV1aWxsZXogcsOpZXNzYXllciBlbiByw6lhY3R1YWxpc2FudCBsYSBwYWdlXCIpXHJcbiAgICB9PlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvRXJyb3JCb3VuZGFyeUNvbXBvbmVudD5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXJyb3JCb3VuZGFyeSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./asset/js/react/components/ErrorBoundary.jsx\n");

/***/ }),

/***/ "./asset/js/react/components/ReduxProvider.jsx":
/*!*****************************************************!*\
  !*** ./asset/js/react/components/ReduxProvider.jsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _js_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @js/store */ \"./asset/js/store/index.js\");\n/* harmony import */ var _ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ErrorBoundary */ \"./asset/js/react/components/ErrorBoundary.jsx\");\n//@ts-check\n\n\n\n\n\nvar ReduxProvider = function ReduxProvider(_ref) {\n  var children = _ref.children;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"Provider\"], {\n    store: _js_store__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null, children));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ReduxProvider);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldC9qcy9yZWFjdC9jb21wb25lbnRzL1JlZHV4UHJvdmlkZXIuanN4P2RjNjQiXSwibmFtZXMiOlsiUmVkdXhQcm92aWRlciIsImNoaWxkcmVuIiwic3RvcmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQjtBQUFBLE1BQUdDLFFBQUg7QUFBQSxzQkFBa0I7QUFBVSxTQUFLLEVBQUVDLGlEQUFLQTtBQUF0QixrQkFDcEMseUhBRGtCLFFBQ2xCLENBRG9DLENBQWxCO0FBQXRCOztBQU1BIiwiZmlsZSI6Ii4vYXNzZXQvanMvcmVhY3QvY29tcG9uZW50cy9SZWR1eFByb3ZpZGVyLmpzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vQHRzLWNoZWNrXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuaW1wb3J0IHN0b3JlIGZyb20gJ0Bqcy9zdG9yZSdcclxuaW1wb3J0IEVycm9yQm91bmRhcnkgZnJvbSAnLi9FcnJvckJvdW5kYXJ5J1xyXG5cclxuY29uc3QgUmVkdXhQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgPEVycm9yQm91bmRhcnk+XHJcbiAgICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9FcnJvckJvdW5kYXJ5PlxyXG48L1Byb3ZpZGVyPlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVkdXhQcm92aWRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./asset/js/react/components/ReduxProvider.jsx\n");

/***/ }),

/***/ "./asset/js/react/i18n.js":
/*!********************************!*\
  !*** ./asset/js/react/i18n.js ***!
  \********************************/
/*! exports provided: i18nReactInit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"i18nReactInit\", function() { return i18nReactInit; });\n/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ \"./node_modules/i18next/dist/esm/i18next.js\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var _translation_en__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translation/en */ \"./asset/js/react/translation/en.js\");\n//@ts-check\n\n\n\nvar i18nReactInit = function i18nReactInit(locale) {\n  i18next__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(react_i18next__WEBPACK_IMPORTED_MODULE_1__[\"initReactI18next\"]).init({\n    resources: {\n      en: {\n        translation: _translation_en__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n      }\n    },\n    lng: locale,\n    interpolation: {\n      escapeValue: false\n    }\n  });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldC9qcy9yZWFjdC9pMThuLmpzPzBlYjYiXSwibmFtZXMiOlsiaTE4blJlYWN0SW5pdCIsImkxOG4iLCJyZXNvdXJjZXMiLCJlbiIsInRyYW5zbGF0aW9uIiwibG5nIiwiaW50ZXJwb2xhdGlvbiIsImVzY2FwZVZhbHVlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHTyxJQUFNQSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLFNBQVk7QUFDckNDLGlEQUFJLENBQUpBLHlFQUVVO0FBQ0ZDLGFBQVMsRUFBRTtBQUNQQyxRQUFFLEVBQUU7QUFDQUMsbUJBQVcsRUFBRUQsdURBQUVBO0FBRGY7QUFERyxLQURUO0FBTUZFLE9BQUcsRUFORDtBQU9GQyxpQkFBYSxFQUFFO0FBQ1hDLGlCQUFXLEVBQUU7QUFERjtBQVBiLEdBRlZOO0FBREciLCJmaWxlIjoiLi9hc3NldC9qcy9yZWFjdC9pMThuLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9AdHMtY2hlY2tcclxuaW1wb3J0IGkxOG4gZnJvbSBcImkxOG5leHRcIjtcclxuaW1wb3J0IHsgaW5pdFJlYWN0STE4bmV4dCB9IGZyb20gXCJyZWFjdC1pMThuZXh0XCI7XHJcbmltcG9ydCBlbiBmcm9tIFwiLi90cmFuc2xhdGlvbi9lblwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBpMThuUmVhY3RJbml0ID0gKGxvY2FsZSkgPT4ge1xyXG4gICAgaTE4blxyXG4gICAgICAgIC51c2UoaW5pdFJlYWN0STE4bmV4dClcclxuICAgICAgICAuaW5pdCh7XHJcbiAgICAgICAgICAgIHJlc291cmNlczoge1xyXG4gICAgICAgICAgICAgICAgZW46IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogZW5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbG5nOiBsb2NhbGUsXHJcbiAgICAgICAgICAgIGludGVycG9sYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVzY2FwZVZhbHVlOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./asset/js/react/i18n.js\n");

/***/ }),

/***/ "./asset/js/react/init.js":
/*!********************************!*\
  !*** ./asset/js/react/init.js ***!
  \********************************/
/*! exports provided: InitReact */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InitReact\", function() { return InitReact; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_react_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/js/react/i18n */ \"./asset/js/react/i18n.js\");\n/* harmony import */ var _js_react_vars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/js/react/vars */ \"./asset/js/react/vars.js\");\n/* harmony import */ var _js_react_components_ReduxProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/js/react/components/ReduxProvider */ \"./asset/js/react/components/ReduxProvider.jsx\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);\n//@ts-check\n\n\n\n\n\n/**\r\n * \r\n * @param { JSX.Element } App \r\n * @param { HTMLElement|Element } element \r\n * @param { string } locale \r\n * @param { Object } urls \r\n */\n\nvar InitReact = function InitReact(App, element, locale) {\n  var urls = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n  Object(_js_react_i18n__WEBPACK_IMPORTED_MODULE_1__[\"i18nReactInit\"])(locale);\n  Object(_js_react_vars__WEBPACK_IMPORTED_MODULE_2__[\"setURLS\"])(urls);\n  Object(_js_react_vars__WEBPACK_IMPORTED_MODULE_2__[\"setLang\"])(locale);\n  Object(react_dom__WEBPACK_IMPORTED_MODULE_4__[\"render\"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_js_react_components_ReduxProvider__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null, App), element);\n  return function () {\n    return Object(react_dom__WEBPACK_IMPORTED_MODULE_4__[\"unmountComponentAtNode\"])(element);\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldC9qcy9yZWFjdC9pbml0LmpzPzdhY2IiXSwibmFtZXMiOlsiSW5pdFJlYWN0IiwidXJscyIsImkxOG5SZWFjdEluaXQiLCJzZXRVUkxTIiwic2V0TGFuZyIsInJlbmRlciIsInVubW91bnRDb21wb25lbnRBdE5vZGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7OztBQU9PLElBQU1BLFNBQVMsR0FBRyxTQUFaQSxTQUFZLHVCQUFxQztBQUFBLE1BQWRDLElBQWMsdUVBQVAsRUFBTztBQUMxREMsc0VBQWEsQ0FBYkEsTUFBYSxDQUFiQTtBQUNBQyxnRUFBTyxDQUFQQSxJQUFPLENBQVBBO0FBQ0FDLGdFQUFPLENBQVBBLE1BQU8sQ0FBUEE7QUFDQUMsMERBQU0sZUFDRiw2SUFERSxHQUNGLENBREUsRUFBTkEsT0FBTSxDQUFOQTtBQUlBLFNBQU87QUFBQSxXQUFNQyx3RUFBc0IsQ0FBNUIsT0FBNEIsQ0FBNUI7QUFBUDtBQVJHIiwiZmlsZSI6Ii4vYXNzZXQvanMvcmVhY3QvaW5pdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vQHRzLWNoZWNrXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgaTE4blJlYWN0SW5pdCB9IGZyb20gJ0AvanMvcmVhY3QvaTE4bic7XHJcbmltcG9ydCB7IHNldFVSTFMsIHNldExhbmcgfSBmcm9tICdAL2pzL3JlYWN0L3ZhcnMnO1xyXG5pbXBvcnQgUmVkdXhQcm92aWRlciBmcm9tICdAL2pzL3JlYWN0L2NvbXBvbmVudHMvUmVkdXhQcm92aWRlcic7XHJcbmltcG9ydCB7IHJlbmRlciwgdW5tb3VudENvbXBvbmVudEF0Tm9kZSB9IGZyb20gJ3JlYWN0LWRvbSdcclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHsgSlNYLkVsZW1lbnQgfSBBcHAgXHJcbiAqIEBwYXJhbSB7IEhUTUxFbGVtZW50fEVsZW1lbnQgfSBlbGVtZW50IFxyXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBsb2NhbGUgXHJcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHVybHMgXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgSW5pdFJlYWN0ID0gKEFwcCwgZWxlbWVudCwgbG9jYWxlLCB1cmxzID0ge30pID0+IHtcclxuICAgIGkxOG5SZWFjdEluaXQobG9jYWxlKVxyXG4gICAgc2V0VVJMUyh1cmxzKVxyXG4gICAgc2V0TGFuZyhsb2NhbGUpXHJcbiAgICByZW5kZXIoKFxyXG4gICAgICAgIDxSZWR1eFByb3ZpZGVyPlxyXG4gICAgICAgICAgICB7QXBwfVxyXG4gICAgICAgIDwvUmVkdXhQcm92aWRlcj4pLCBlbGVtZW50KVxyXG4gICAgcmV0dXJuICgpID0+IHVubW91bnRDb21wb25lbnRBdE5vZGUoZWxlbWVudClcclxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./asset/js/react/init.js\n");

/***/ }),

/***/ "./asset/js/react/translation/en.js":
/*!******************************************!*\
  !*** ./asset/js/react/translation/en.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldC9qcy9yZWFjdC90cmFuc2xhdGlvbi9lbi5qcz85ZjliIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEiLCJmaWxlIjoiLi9hc3NldC9qcy9yZWFjdC90cmFuc2xhdGlvbi9lbi5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHt9Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./asset/js/react/translation/en.js\n");

/***/ })

}]);
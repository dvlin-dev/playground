/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/styles */ \"@mui/material/styles\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/CssBaseline */ \"@mui/material/CssBaseline\");\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _state_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/state/store */ \"./src/state/store.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_state_store__WEBPACK_IMPORTED_MODULE_4__]);\n_state_store__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\nfunction App({ Component, pageProps, router }) {\n    const { themeMode, setCurrentConversationId } = (0,_state_store__WEBPACK_IMPORTED_MODULE_4__.useAppStore)();\n    // 创建主题\n    const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.createTheme)({\n        palette: {\n            mode: themeMode\n        }\n    });\n    // 处理URL参数，类似于原始Python代码中的on_load函数\n    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(()=>{\n        if (router.query.conversation_id) {\n            setCurrentConversationId(router.query.conversation_id);\n        } else {\n            setCurrentConversationId(\"\");\n        }\n    }, [\n        router.query,\n        setCurrentConversationId\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.ThemeProvider, {\n        theme: theme,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_3___default()), {}, void 0, false, {\n                fileName: \"/Users/zhangbaolin/code/me/playground/A2A/demo/ui-ts/src/pages/_app.tsx\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/zhangbaolin/code/me/playground/A2A/demo/ui-ts/src/pages/_app.tsx\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/zhangbaolin/code/me/playground/A2A/demo/ui-ts/src/pages/_app.tsx\",\n        lineNumber: 28,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUVvQztBQUNkO0FBQ1I7QUFDVjtBQUVuQixTQUFTSyxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFQyxNQUFNLEVBQVk7SUFDcEUsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLHdCQUF3QixFQUFFLEdBQUdQLHlEQUFXQTtJQUUzRCxPQUFPO0lBQ1AsTUFBTVEsUUFBUVYsaUVBQVdBLENBQUM7UUFDeEJXLFNBQVM7WUFDUEMsTUFBTUo7UUFDUjtJQUNGO0lBRUEsbUNBQW1DO0lBQ25DTCxnREFBU0EsQ0FBQztRQUNSLElBQUlJLE9BQU9NLEtBQUssQ0FBQ0MsZUFBZSxFQUFFO1lBQ2hDTCx5QkFBeUJGLE9BQU9NLEtBQUssQ0FBQ0MsZUFBZTtRQUN2RCxPQUFPO1lBQ0xMLHlCQUF5QjtRQUMzQjtJQUNGLEdBQUc7UUFBQ0YsT0FBT00sS0FBSztRQUFFSjtLQUF5QjtJQUUzQyxxQkFDRSw4REFBQ1YsK0RBQWFBO1FBQUNXLE9BQU9BOzswQkFDcEIsOERBQUNULGtFQUFXQTs7Ozs7MEJBQ1osOERBQUNJO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7OztBQUc5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2EyYS10eXBlc2NyaXB0LWV4YW1wbGUtdWkvLi9zcmMvcGFnZXMvX2FwcC50c3g/ZjlkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ0Avc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyLCBjcmVhdGVUaGVtZSB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwvc3R5bGVzJztcbmltcG9ydCBDc3NCYXNlbGluZSBmcm9tICdAbXVpL21hdGVyaWFsL0Nzc0Jhc2VsaW5lJztcbmltcG9ydCB7IHVzZUFwcFN0b3JlIH0gZnJvbSAnQC9zdGF0ZS9zdG9yZSc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzLCByb3V0ZXIgfTogQXBwUHJvcHMpIHtcbiAgY29uc3QgeyB0aGVtZU1vZGUsIHNldEN1cnJlbnRDb252ZXJzYXRpb25JZCB9ID0gdXNlQXBwU3RvcmUoKTtcbiAgXG4gIC8vIOWIm+W7uuS4u+mimFxuICBjb25zdCB0aGVtZSA9IGNyZWF0ZVRoZW1lKHtcbiAgICBwYWxldHRlOiB7XG4gICAgICBtb2RlOiB0aGVtZU1vZGUsXG4gICAgfSxcbiAgfSk7XG5cbiAgLy8g5aSE55CGVVJM5Y+C5pWw77yM57G75Ly85LqO5Y6f5aeLUHl0aG9u5Luj56CB5Lit55qEb25fbG9hZOWHveaVsFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChyb3V0ZXIucXVlcnkuY29udmVyc2F0aW9uX2lkKSB7XG4gICAgICBzZXRDdXJyZW50Q29udmVyc2F0aW9uSWQocm91dGVyLnF1ZXJ5LmNvbnZlcnNhdGlvbl9pZCBhcyBzdHJpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRDdXJyZW50Q29udmVyc2F0aW9uSWQoJycpO1xuICAgIH1cbiAgfSwgW3JvdXRlci5xdWVyeSwgc2V0Q3VycmVudENvbnZlcnNhdGlvbklkXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8VGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgPENzc0Jhc2VsaW5lIC8+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9UaGVtZVByb3ZpZGVyPlxuICApO1xufSAiXSwibmFtZXMiOlsiVGhlbWVQcm92aWRlciIsImNyZWF0ZVRoZW1lIiwiQ3NzQmFzZWxpbmUiLCJ1c2VBcHBTdG9yZSIsInVzZUVmZmVjdCIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInJvdXRlciIsInRoZW1lTW9kZSIsInNldEN1cnJlbnRDb252ZXJzYXRpb25JZCIsInRoZW1lIiwicGFsZXR0ZSIsIm1vZGUiLCJxdWVyeSIsImNvbnZlcnNhdGlvbl9pZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/state/store.ts":
/*!****************************!*\
  !*** ./src/state/store.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useAppStore: () => (/* binding */ useAppStore)\n/* harmony export */ });\n/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ \"zustand\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__]);\nzustand__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n// 创建存储\nconst useAppStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)((set)=>({\n        // 主题模式\n        themeMode: \"light\",\n        setThemeMode: (mode)=>set({\n                themeMode: mode\n            }),\n        // 当前会话ID\n        currentConversationId: \"\",\n        setCurrentConversationId: (id)=>set({\n                currentConversationId: id\n            }),\n        // 轮询状态\n        isPolling: false,\n        setPolling: (isPolling)=>set({\n                isPolling\n            }),\n        // 会话列表\n        conversations: [],\n        setConversations: (conversations)=>set({\n                conversations\n            }),\n        // 代理列表\n        agents: [],\n        setAgents: (agents)=>set({\n                agents\n            }),\n        // 当前选中的代理\n        selectedAgentId: \"\",\n        setSelectedAgentId: (id)=>set({\n                selectedAgentId: id\n            })\n    }));\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3RhdGUvc3RvcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBaUM7QUErQmpDLE9BQU87QUFDQSxNQUFNQyxjQUFjRCwrQ0FBTUEsQ0FBVyxDQUFDRSxNQUFTO1FBQ3BELE9BQU87UUFDUEMsV0FBVztRQUNYQyxjQUFjLENBQUNDLE9BQVNILElBQUk7Z0JBQUVDLFdBQVdFO1lBQUs7UUFFOUMsU0FBUztRQUNUQyx1QkFBdUI7UUFDdkJDLDBCQUEwQixDQUFDQyxLQUFPTixJQUFJO2dCQUFFSSx1QkFBdUJFO1lBQUc7UUFFbEUsT0FBTztRQUNQQyxXQUFXO1FBQ1hDLFlBQVksQ0FBQ0QsWUFBY1AsSUFBSTtnQkFBRU87WUFBVTtRQUUzQyxPQUFPO1FBQ1BFLGVBQWUsRUFBRTtRQUNqQkMsa0JBQWtCLENBQUNELGdCQUFrQlQsSUFBSTtnQkFBRVM7WUFBYztRQUV6RCxPQUFPO1FBQ1BFLFFBQVEsRUFBRTtRQUNWQyxXQUFXLENBQUNELFNBQVdYLElBQUk7Z0JBQUVXO1lBQU87UUFFcEMsVUFBVTtRQUNWRSxpQkFBaUI7UUFDakJDLG9CQUFvQixDQUFDUixLQUFPTixJQUFJO2dCQUFFYSxpQkFBaUJQO1lBQUc7SUFDeEQsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL2EyYS10eXBlc2NyaXB0LWV4YW1wbGUtdWkvLi9zcmMvc3RhdGUvc3RvcmUudHM/NDk2YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGUgfSBmcm9tICd6dXN0YW5kJztcblxuLy8g54q25oCB57G75Z6L5a6a5LmJ77yM5a+55bqUUHl0aG9u55qEQXBwU3RhdGVcbmV4cG9ydCB0eXBlIFRoZW1lTW9kZSA9ICdsaWdodCcgfCAnZGFyayc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwU3RhdGUge1xuICAvLyDkuLvpopjmqKHlvI9cbiAgdGhlbWVNb2RlOiBUaGVtZU1vZGU7XG4gIHNldFRoZW1lTW9kZTogKG1vZGU6IFRoZW1lTW9kZSkgPT4gdm9pZDtcbiAgXG4gIC8vIOW9k+WJjeS8muivnUlEXG4gIGN1cnJlbnRDb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBzZXRDdXJyZW50Q29udmVyc2F0aW9uSWQ6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICBcbiAgLy8g6L2u6K+i54q25oCBXG4gIGlzUG9sbGluZzogYm9vbGVhbjtcbiAgc2V0UG9sbGluZzogKGlzUG9sbGluZzogYm9vbGVhbikgPT4gdm9pZDtcbiAgXG4gIC8vIOS8muivneWIl+ihqFxuICBjb252ZXJzYXRpb25zOiBBcnJheTx7aWQ6IHN0cmluZywgbmFtZTogc3RyaW5nfT47XG4gIHNldENvbnZlcnNhdGlvbnM6IChjb252ZXJzYXRpb25zOiBBcnJheTx7aWQ6IHN0cmluZywgbmFtZTogc3RyaW5nfT4pID0+IHZvaWQ7XG4gIFxuICAvLyDku6PnkIbliJfooahcbiAgYWdlbnRzOiBBcnJheTx7aWQ6IHN0cmluZywgbmFtZTogc3RyaW5nfT47XG4gIHNldEFnZW50czogKGFnZW50czogQXJyYXk8e2lkOiBzdHJpbmcsIG5hbWU6IHN0cmluZ30+KSA9PiB2b2lkO1xuICBcbiAgLy8g5b2T5YmN6YCJ5Lit55qE5Luj55CGXG4gIHNlbGVjdGVkQWdlbnRJZDogc3RyaW5nO1xuICBzZXRTZWxlY3RlZEFnZW50SWQ6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG4vLyDliJvlu7rlrZjlgqhcbmV4cG9ydCBjb25zdCB1c2VBcHBTdG9yZSA9IGNyZWF0ZTxBcHBTdGF0ZT4oKHNldCkgPT4gKHtcbiAgLy8g5Li76aKY5qih5byPXG4gIHRoZW1lTW9kZTogJ2xpZ2h0JyxcbiAgc2V0VGhlbWVNb2RlOiAobW9kZSkgPT4gc2V0KHsgdGhlbWVNb2RlOiBtb2RlIH0pLFxuICBcbiAgLy8g5b2T5YmN5Lya6K+dSURcbiAgY3VycmVudENvbnZlcnNhdGlvbklkOiAnJyxcbiAgc2V0Q3VycmVudENvbnZlcnNhdGlvbklkOiAoaWQpID0+IHNldCh7IGN1cnJlbnRDb252ZXJzYXRpb25JZDogaWQgfSksXG4gIFxuICAvLyDova7or6LnirbmgIFcbiAgaXNQb2xsaW5nOiBmYWxzZSxcbiAgc2V0UG9sbGluZzogKGlzUG9sbGluZykgPT4gc2V0KHsgaXNQb2xsaW5nIH0pLFxuICBcbiAgLy8g5Lya6K+d5YiX6KGoXG4gIGNvbnZlcnNhdGlvbnM6IFtdLFxuICBzZXRDb252ZXJzYXRpb25zOiAoY29udmVyc2F0aW9ucykgPT4gc2V0KHsgY29udmVyc2F0aW9ucyB9KSxcbiAgXG4gIC8vIOS7o+eQhuWIl+ihqFxuICBhZ2VudHM6IFtdLFxuICBzZXRBZ2VudHM6IChhZ2VudHMpID0+IHNldCh7IGFnZW50cyB9KSxcbiAgXG4gIC8vIOW9k+WJjemAieS4reeahOS7o+eQhlxuICBzZWxlY3RlZEFnZW50SWQ6ICcnLFxuICBzZXRTZWxlY3RlZEFnZW50SWQ6IChpZCkgPT4gc2V0KHsgc2VsZWN0ZWRBZ2VudElkOiBpZCB9KSxcbn0pKTsgIl0sIm5hbWVzIjpbImNyZWF0ZSIsInVzZUFwcFN0b3JlIiwic2V0IiwidGhlbWVNb2RlIiwic2V0VGhlbWVNb2RlIiwibW9kZSIsImN1cnJlbnRDb252ZXJzYXRpb25JZCIsInNldEN1cnJlbnRDb252ZXJzYXRpb25JZCIsImlkIiwiaXNQb2xsaW5nIiwic2V0UG9sbGluZyIsImNvbnZlcnNhdGlvbnMiLCJzZXRDb252ZXJzYXRpb25zIiwiYWdlbnRzIiwic2V0QWdlbnRzIiwic2VsZWN0ZWRBZ2VudElkIiwic2V0U2VsZWN0ZWRBZ2VudElkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/state/store.ts\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "@mui/material/CssBaseline":
/*!********************************************!*\
  !*** external "@mui/material/CssBaseline" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/CssBaseline");

/***/ }),

/***/ "@mui/material/styles":
/*!***************************************!*\
  !*** external "@mui/material/styles" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/styles");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "zustand":
/*!**************************!*\
  !*** external "zustand" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = import("zustand");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();
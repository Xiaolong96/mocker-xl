(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1104:function(e,t,r){"use strict";r.r(t);r(241);var n=r(174),a=(r(620),r(654)),c=(r(621),r(655)),o=(r(570),r(571)),u=r(0),i=r.n(u),s=r(587),p=r(622);r(809);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function m(e,t,r,n,a,c,o){try{var u=e[c](o),i=u.value}catch(s){return void r(s)}u.done?t(i):Promise.resolve(i).then(n,a)}function f(e){return function(){var t=this,r=arguments;return new Promise(function(n,a){var c=e.apply(t,r);function o(e){m(c,n,a,o,u,"next",e)}function u(e){m(c,n,a,o,u,"throw",e)}o(void 0)})}}t.default=a.a.create({})(function(e){var t=function(){var t=f(regeneratorRuntime.mark(function t(r){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:r.preventDefault(),e.form.validateFields(function(){var t=f(regeneratorRuntime.mark(function t(r,n){var a,c,u,i,s;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r){t.next=14;break}return a=n.baseUrl,c=n.desc,u=n.name,i=n.target,s={baseUrl:"/".concat(a),desc:c||u,name:u,proxy:{target:i?"http://".concat(i):""}},t.prev=4,t.next=7,Object(p.c)(s);case 7:t.sent&&(o.a.success("\u9879\u76ee\u521b\u5efa\u6210\u529f"),e.history.push("/")),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(4);case 14:case"end":return t.stop()}},t,null,[[4,11]])}));return function(e,r){return t.apply(this,arguments)}}());case 2:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),r=e.form.getFieldDecorator;return i.a.createElement("div",{className:"project-create"},i.a.createElement("div",{className:"project-create-header"},i.a.createElement(s.a,null),i.a.createElement("div",{className:"header-info"},i.a.createElement("h2",null,"\u521b\u5efa\u9879\u76ee"),i.a.createElement("p",null,"\u5feb\u6765\u521b\u5efa\u4e00\u4e2a\u4ee4\u4eba\u6109\u5feb\u7684\u9879\u76ee\u5427\uff5e"))),i.a.createElement("div",{className:"project-create-content"},i.a.createElement(a.a,l({layout:"vertical",onSubmit:t},{},{className:"project-create-form"}),i.a.createElement(a.a.Item,{label:"\u9879\u76ee\u540d\u79f0"},r("name",{rules:[{required:!0,message:"\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a"},{pattern:/^[\u4e00-\u9fa5a-zA-Z0-9\-_.]{0,30}$/,message:"\u4ec5\u652f\u6301\u6c49\u5b57\u3001\u82f1\u6587\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u4e0b\u5212\u7ebf(_)\u3001\u8fde\u5b57\u7b26(-)\u3001\u70b9(.)"}]})(i.a.createElement(c.a,{maxLength:30,placeholder:"project"}))),i.a.createElement(a.a.Item,{label:"\u9879\u76ee\u57fa\u7840URL"},r("baseUrl",{rules:[{required:!0,message:"\u57fa\u7840URL\u4e0d\u80fd\u4e3a\u7a7a"},{pattern:/^[a-zA-Z]*$/,message:"\u683c\u5f0f\u4e3a\u5927\u5c0f\u5199\u82f1\u6587\u5b57\u6bcd"}]})(i.a.createElement(c.a,{addonBefore:"/",maxLength:30,placeholder:"example"}))),i.a.createElement(a.a.Item,{label:"\u9879\u76ee\u4ee3\u7406URL"},r("target",{rules:[{pattern:/^((https?:\/\/)?(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/,message:"\u683c\u5f0f\u4e0d\u6b63\u786e"}]})(i.a.createElement(c.a,{addonBefore:"http://",maxLength:255,placeholder:"www.abc.com"}))),i.a.createElement(a.a.Item,{label:"\u9879\u76ee\u63cf\u8ff0"},r("desc")(i.a.createElement(c.a,{maxLength:255,placeholder:"\u4e0d\u586b\u9ed8\u8ba4\u4e3a\u9879\u76ee\u540d"}))),i.a.createElement(a.a.Item,{className:"ta-c"},i.a.createElement(n.a,{type:"primary",htmlType:"submit"},"\u521b\u5efa")))))})},578:function(e,t,r){"use strict";r.d(t,"a",function(){return p});r(623);var n=r(625),a=(r(570),r(571)),c=r(624);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var i={200:"\u670d\u52a1\u5668\u6210\u529f\u8fd4\u56de\u8bf7\u6c42\u7684\u6570\u636e\u3002",201:"\u65e0\u6570\u636e",202:"\u4e00\u4e2a\u8bf7\u6c42\u5df2\u7ecf\u8fdb\u5165\u540e\u53f0\u6392\u961f\uff08\u5f02\u6b65\u4efb\u52a1\uff09\u3002",204:"\u5220\u9664\u6570\u636e\u6210\u529f\u3002",400:"\u53d1\u51fa\u7684\u8bf7\u6c42\u6709\u9519\u8bef\uff0c\u670d\u52a1\u5668\u6ca1\u6709\u8fdb\u884c\u65b0\u5efa\u6216\u4fee\u6539\u6570\u636e\u7684\u64cd\u4f5c\u3002",401:"\u7528\u6237\u6ca1\u6709\u6743\u9650\uff08\u4ee4\u724c\u3001\u7528\u6237\u540d\u3001\u5bc6\u7801\u9519\u8bef\uff09\u3002",403:"\u7528\u6237\u6ca1\u6709\u8bbf\u95ee\u6743\u9650",404:"\u53d1\u51fa\u7684\u8bf7\u6c42\u9488\u5bf9\u7684\u662f\u4e0d\u5b58\u5728\u7684\u8bb0\u5f55\uff0c\u670d\u52a1\u5668\u6ca1\u6709\u8fdb\u884c\u64cd\u4f5c\u3002",405:"\u65b9\u6cd5\u4e0d\u88ab\u5141\u8bb8",406:"\u8bf7\u6c42\u7684\u683c\u5f0f\u4e0d\u53ef\u5f97\u3002",410:"\u8bf7\u6c42\u7684\u8d44\u6e90\u88ab\u6c38\u4e45\u5220\u9664\uff0c\u4e14\u4e0d\u4f1a\u518d\u5f97\u5230\u7684\u3002",422:"\u5f53\u521b\u5efa\u4e00\u4e2a\u5bf9\u8c61\u65f6\uff0c\u53d1\u751f\u4e00\u4e2a\u9a8c\u8bc1\u9519\u8bef\u3002",500:"\u670d\u52a1\u5668\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u3002",502:"\u7f51\u5173\u9519\u8bef\u3002",503:"\u670d\u52a1\u4e0d\u53ef\u7528\uff0c\u670d\u52a1\u5668\u6682\u65f6\u8fc7\u8f7d\u6216\u7ef4\u62a4\u3002",504:"\u7f51\u5173\u8d85\u65f6\u3002"},s=r.n(c).a.create({baseURL:"",timeout:1e4,headers:{"Content-Type":"application/json"}});s.interceptors.request.use(function(e){return e},function(e){return Promise.reject(e)}),s.interceptors.response.use(function(e){var t=e.data;if(200!=t.code){var r=t.msg||t.message||"";return a.a.warning(r),Promise.reject(t)}return t},function(e){if(e&&e.response){var t=e.response.status;null!==i[t]?n.a.warning({placement:"topRight",duration:2,message:"\u63d0\u793a",description:"\u63a5\u53e3\uff1a".concat(e.response.data.path,"\uff0c").concat(e.response.data.message)}):n.a.warning({placement:"topRight",duration:2,message:"\u63d0\u793a",description:e})}return Promise.reject(e)});function p(e){var t=e.url;if(("GET"===e.method||"DELETE"===e.method||"PUT"===e.method)&&e.data){var r=[];Object.keys(e.data).map(function(t,n){r.push("".concat(t,"=").concat(encodeURIComponent(e.data[t])))});var n=r.join("&");t="".concat(t,"?").concat(n)}var a=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach(function(t){u(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},e,{url:t});return s.request(a)}},587:function(e,t,r){"use strict";var n=r(0),a=r.n(n);r(588);t.a=function(e){var t=function(){var e=Math.floor(100*Math.random())+155,t=Math.floor(100*Math.random())+115,r=Math.floor(100*Math.random())+115;return"rgb(".concat(e,",").concat(t,",").concat(r,")")},r=function(){return"".concat(Math.floor(100*Math.random()),"%")},c=function(){return"-".concat(Math.floor(60*Math.random()),"px")},o=Object(n.useMemo)(function(){for(var e=[],n=0;n<10;n++)e.push(n);return a.a.createElement(a.a.Fragment,null,e.map(function(e){var n=Math.floor(60*Math.random());return a.a.createElement("span",{key:e,className:"decorate",style:{background:t(),width:n,height:n,marginTop:c(),marginLeft:c(),top:r(),left:r()}})}))},[]);return a.a.createElement("div",{className:"spots"},o)}},588:function(e,t,r){},622:function(e,t,r){"use strict";r.d(t,"c",function(){return o}),r.d(t,"b",function(){return u}),r.d(t,"d",function(){return i}),r.d(t,"e",function(){return s}),r.d(t,"a",function(){return p});var n=r(578);function a(e,t,r,n,a,c,o){try{var u=e[c](o),i=u.value}catch(s){return void r(s)}u.done?t(i):Promise.resolve(i).then(n,a)}function c(e){return function(){var t=this,r=arguments;return new Promise(function(n,c){var o=e.apply(t,r);function u(e){a(o,n,c,u,i,"next",e)}function i(e){a(o,n,c,u,i,"throw",e)}u(void 0)})}}var o=function(){var e=c(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(n.a)({url:"/project/create",method:"POST",data:t});case 2:return r=e.sent,e.abrupt("return",r&&r.data);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=c(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(n.a)({url:"/project/list",method:"GET"});case 2:return t=e.sent,e.abrupt("return",t&&t.data);case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),i=function(){var e=c(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(n.a)({url:"/project/query",method:"GET",data:t});case 2:return r=e.sent,e.abrupt("return",r&&r.data);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),s=function(){var e=c(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(n.a)({url:"/project/update",method:"POST",data:t});case 2:return r=e.sent,e.abrupt("return",r&&r.data);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=c(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(n.a)({url:"/project/delete",method:"DELETE",data:t});case 2:return r=e.sent,e.abrupt("return",r&&r.data);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},809:function(e,t,r){}}]);
//# sourceMappingURL=9.3f1b98ef.chunk.js.map
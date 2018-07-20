!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);const n=r(1),o=r(2);e.default=((t,e)=>{const r=o.database().ref(t);async function a(t){if(!t)return!1;const{id:n,task:o}=t;if(await new Promise(t=>r.child("current").transaction(e=>{const r=e||n;return t(r),r}))!=n)return!1;const a={current:null};try{await e(o),a[`tasks/${n}`]=null}catch(t){console.log("ERROR",t),a[`tasks/${n}/_error`]=function(t){let e="Error to process the task";return"[object Error]"===Object.prototype.toString.call(t)?e=t.message:"[object String]"===Object.prototype.toString.call(t)?e=t:void 0!==t&&null!==t&&(e=JSON.stringify(t)),{message:e,stack:t.stack||null}}(t)}return await r.update(a),!0}async function i(){return await a(await r.child("tasks").orderByChild("_error").equalTo(null).limitToFirst(1).once("value").then(t=>t.val()).then(t=>{if(!t)return null;const e=Object.keys(t).pop();return{id:e,task:t[e]}}))}return{onCreateTask:n.database.ref(`/${t}/tasks/{id}`).onCreate(i),onFinishTask:n.database.ref(`/${t}/current`).onDelete(i),onRetryTask:n.database.ref(`/${t}/tasks/{id}/_error`).onDelete(i)}})},function(t,e){t.exports=firebase-functions},function(t,e){t.exports=firebase-admin}]);
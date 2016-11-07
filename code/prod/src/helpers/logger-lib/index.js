!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Library",[],t):"object"==typeof exports?exports.Library=t():e.Library=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=r(o),u=n(3),s=r(u),a=n(4),l=r(a),c=function(){var e=function(e,t){console.log("input"),console.log(e);var n=e.messageContent,r=e.messageLevel,o=e.messageOutput,u=e,a=i["default"].validate.messageLength(n);a?" ":i["default"].error["throw"]("Message is too long!");var c=i["default"].format.message(n,r);switch(u.messageContent=c,o){case"console":s["default"].log(c,r,t);break;case"file":var f=i["default"].validate.environment();"node"===f?l["default"].log(u,t):i["default"].error["throw"]("Log to file has to be called processed by Node.JS");break;case"stream":break;default:t?t("Sorry, the logger did not recognise this messageOutput"):" ",i["default"].error["throw"]("Sorry, the logger did not recognise this messageOutput")}};return{log:e}}();t["default"]=c,e.exports=t["default"]},function(e,t,n){(function(t){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(){var e={stringInBytes:function(e){for(var t=e.length,n=e.length-1;n>=0;n--){var r=e.charCodeAt(n);r>127&&r<=2047?t++:r>2047&&r<=65535&&(t+=2),r>=56320&&r<=57343&&n--}return t}},r={date:function(){var e=new Date,t=e.getDate(),n=e.getMonth()+1,r=e.getFullYear(),o=t+"/"+n+"/"+r;return o},time:function(){var e=new Date,t=e.getHours(),r=e.getMinutes(),o=e.getSeconds().toString();console.log("undefined"==typeof o?"undefined":n(o)),console.log(o),1===o.length&&(o="0"+o.toString());var i=t+":"+r+":"+o;return i}},o={messageLength:function s(e){"number"==typeof e&&(e=e.toString());var s=e.length;return s<=1e3==1},environment:function(){var e=function(){try{return this===window}catch(e){return!1}},n=function(){return"undefined"!=t.versions.node};return e()?"browser":n()?"node":void 0}},i={message:function(e,t){var n=r.date()+" - "+r.time(),o=void 0;return o="#{"+n+"} ",o=o+"[#{"+t+"}] ",o=o+"#{"+e+"}"}},u={"throw":function(e){throw e}};return{check:e,define:r,validate:o,format:i,error:u}}();e.exports=r}).call(t,n(2))},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(c===setTimeout)return setTimeout(e,0);if((c===n||!c)&&setTimeout)return c=setTimeout,setTimeout(e,0);try{return c(e,0)}catch(t){try{return c.call(null,e,0)}catch(t){return c.call(this,e,0)}}}function i(e){if(f===clearTimeout)return clearTimeout(e);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function u(){v&&d&&(v=!1,d.length?h=d.concat(h):p=-1,h.length&&s())}function s(){if(!v){var e=o(u);v=!0;for(var t=h.length;t;){for(d=h,h=[];++p<t;)d&&d[p].run();p=-1,t=h.length}d=null,v=!1,i(e)}}function a(e,t){this.fun=e,this.array=t}function l(){}var c,f,g=e.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:n}catch(e){c=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(e){f=r}}();var d,h=[],v=!1,p=-1;g.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new a(e,t)),1!==h.length||v||o(s)},a.prototype.run=function(){this.fun.apply(null,this.array)},g.title="browser",g.browser=!0,g.env={},g.argv=[],g.version="",g.versions={},g.on=l,g.addListener=l,g.once=l,g.off=l,g.removeListener=l,g.removeAllListeners=l,g.emit=l,g.binding=function(e){throw new Error("process.binding is not supported")},g.cwd=function(){return"/"},g.chdir=function(e){throw new Error("process.chdir is not supported")},g.umask=function(){return 0}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var o=n(1),i=r(o),u=function(){var e=function(e,t,n){var r={messageContent:e},o="%c"+e;switch(t){case"debug":console.debug(o,"color: grey"),n?n(r):" ";break;case"info":console.info(o,"color: green"),n?n(r):" ";break;case"error":console.error(o,"color: red"),n?n(r):" ";break;default:n?n("Sorry, the logger did not recognise this messageLevel in the console.log messageOutput type"):" ",i["default"].error["throw"]("Sorry, the logger did not recognise this messageLevel in the console.log messageOutput type")}};return{log:e}}();e.exports=u},function(e,t,n){(function(t){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var o=n(1),i=r(o),u=n(5),s=n(6),a=function(){var e=function(e,n){var r=function(e){return"win32"===t.platform?e+"\r\n":e+"\n"},o=function(e,t){u.writeFile(e,t,function(e){return e?console.log(e):void console.log("A new log file was saved!!")})},a=function(e,t){u.appendFile(e,t,function(e){return e?console.log(e):void console.log("The log file was appended!")})},l=e.messageContent,c=e.messageLocationLookIn,f=i["default"].check.stringInBytes(l),g=void 0,d=void 0;d=e.messageLocationPath?e.messageLocationPath+"/":"","driveRoot"==c?(g="/","undefined"!=d&&(g+=d)):"projectRoot"==c&&(g="./","undefined"!=d&&(g+=d)),u.existsSync(g)||u.mkdirSync(g);var h=u.readdirSync(g),v=[];for(var p in h)".txt"===s.extname(h[p])&&h[p].includes("log")&&(v.push(h[p]),console.log("I am copying to the logArray: ",h[p]));console.log("logArra22y:"),console.log(v);var m=v.length,y=".txt",b=m+1,w="log"+y,x=void 0,T=void 0,S=r(l);if(0===v.length?(b="",T=w):1===v.length?(w="log"+y,T="log."+b+y,x=g+w):(w="log."+m+y,T="log."+b+y,x=g+w),console.log("aaaaaaaaaaa"),console.log(x),0!=m){var L=u.statSync(x),A=L.size;console.log(A,f),A+f<5e3?(g=x,a(g,S)):(g+=T,o(g,S))}else g+=T,o(g,S);"."===g.charAt(0)&&(g=g.slice(1,g.length));var k={messageContent:l,writePath:c+g};console.log(k.writePath),n?n(k):" "};return{log:e}}();e.exports=a}).call(t,n(2))},function(e,t){},function(e,t,n){(function(e){function n(e,t){for(var n=0,r=e.length-1;r>=0;r--){var o=e[r];"."===o?e.splice(r,1):".."===o?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}function r(e,t){if(e.filter)return e.filter(t);for(var n=[],r=0;r<e.length;r++)t(e[r],r,e)&&n.push(e[r]);return n}var o=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,i=function(e){return o.exec(e).slice(1)};t.resolve=function(){for(var t="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var u=i>=0?arguments[i]:e.cwd();if("string"!=typeof u)throw new TypeError("Arguments to path.resolve must be strings");u&&(t=u+"/"+t,o="/"===u.charAt(0))}return t=n(r(t.split("/"),function(e){return!!e}),!o).join("/"),(o?"/":"")+t||"."},t.normalize=function(e){var o=t.isAbsolute(e),i="/"===u(e,-1);return e=n(r(e.split("/"),function(e){return!!e}),!o).join("/"),e||o||(e="."),e&&i&&(e+="/"),(o?"/":"")+e},t.isAbsolute=function(e){return"/"===e.charAt(0)},t.join=function(){var e=Array.prototype.slice.call(arguments,0);return t.normalize(r(e,function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},t.relative=function(e,n){function r(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=t.resolve(e).substr(1),n=t.resolve(n).substr(1);for(var o=r(e.split("/")),i=r(n.split("/")),u=Math.min(o.length,i.length),s=u,a=0;a<u;a++)if(o[a]!==i[a]){s=a;break}for(var l=[],a=s;a<o.length;a++)l.push("..");return l=l.concat(i.slice(s)),l.join("/")},t.sep="/",t.delimiter=":",t.dirname=function(e){var t=i(e),n=t[0],r=t[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},t.basename=function(e,t){var n=i(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},t.extname=function(e){return i(e)[3]};var u="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)}}).call(t,n(2))}])});
//# sourceMappingURL=Library.min.js.map
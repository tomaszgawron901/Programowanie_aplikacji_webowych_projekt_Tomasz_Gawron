!function(e){var t={};function s(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(i,r,function(t){return e[t]}.bind(null,r));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=11)}([function(e,t,s){"use strict";e.exports={BINARY_TYPES:["nodebuffer","arraybuffer","fragments"],GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),EMPTY_BUFFER:Buffer.alloc(0),NOOP:()=>{}}},function(e,t,s){"use strict";const i=s(17),r=s(18),n=s(4),{kStatusCode:o,NOOP:a}=s(0),h=Buffer.from([0,0,255,255]),c=Buffer.from([0]),l=Symbol("permessage-deflate"),d=Symbol("total-length"),f=Symbol("callback"),u=Symbol("buffers"),_=Symbol("error");let p;function m(e){this[u].push(e),this[d]+=e.length}function g(e){this[d]+=e.length,this[l]._maxPayload<1||this[d]<=this[l]._maxPayload?this[u].push(e):(this[_]=new RangeError("Max payload size exceeded"),this[_][o]=1009,this.removeListener("data",g),this.reset())}function y(e){this[l]._inflate=null,e[o]=1007,this[f](e)}e.exports=class{constructor(e,t,s){if(this._maxPayload=0|s,this._options=e||{},this._threshold=void 0!==this._options.threshold?this._options.threshold:1024,this._isServer=!!t,this._deflate=null,this._inflate=null,this.params=null,!p){const e=void 0!==this._options.concurrencyLimit?this._options.concurrencyLimit:10;p=new i({concurrency:e})}}static get extensionName(){return"permessage-deflate"}offer(){const e={};return this._options.serverNoContextTakeover&&(e.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(e.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(e.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?e.client_max_window_bits=this._options.clientMaxWindowBits:null==this._options.clientMaxWindowBits&&(e.client_max_window_bits=!0),e}accept(e){return e=this.normalizeParams(e),this.params=this._isServer?this.acceptAsServer(e):this.acceptAsClient(e),this.params}cleanup(){this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate&&(this._deflate.close(),this._deflate=null)}acceptAsServer(e){const t=this._options,s=e.find(e=>!(!1===t.serverNoContextTakeover&&e.server_no_context_takeover||e.server_max_window_bits&&(!1===t.serverMaxWindowBits||"number"==typeof t.serverMaxWindowBits&&t.serverMaxWindowBits>e.server_max_window_bits)||"number"==typeof t.clientMaxWindowBits&&!e.client_max_window_bits));if(!s)throw new Error("None of the extension offers can be accepted");return t.serverNoContextTakeover&&(s.server_no_context_takeover=!0),t.clientNoContextTakeover&&(s.client_no_context_takeover=!0),"number"==typeof t.serverMaxWindowBits&&(s.server_max_window_bits=t.serverMaxWindowBits),"number"==typeof t.clientMaxWindowBits?s.client_max_window_bits=t.clientMaxWindowBits:!0!==s.client_max_window_bits&&!1!==t.clientMaxWindowBits||delete s.client_max_window_bits,s}acceptAsClient(e){const t=e[0];if(!1===this._options.clientNoContextTakeover&&t.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(t.client_max_window_bits){if(!1===this._options.clientMaxWindowBits||"number"==typeof this._options.clientMaxWindowBits&&t.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"')}else"number"==typeof this._options.clientMaxWindowBits&&(t.client_max_window_bits=this._options.clientMaxWindowBits);return t}normalizeParams(e){return e.forEach(e=>{Object.keys(e).forEach(t=>{var s=e[t];if(s.length>1)throw new Error(`Parameter "${t}" must have only a single value`);if(s=s[0],"client_max_window_bits"===t){if(!0!==s){const e=+s;if(!Number.isInteger(e)||e<8||e>15)throw new TypeError(`Invalid value for parameter "${t}": ${s}`);s=e}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${t}": ${s}`)}else if("server_max_window_bits"===t){const e=+s;if(!Number.isInteger(e)||e<8||e>15)throw new TypeError(`Invalid value for parameter "${t}": ${s}`);s=e}else{if("client_no_context_takeover"!==t&&"server_no_context_takeover"!==t)throw new Error(`Unknown parameter "${t}"`);if(!0!==s)throw new TypeError(`Invalid value for parameter "${t}": ${s}`)}e[t]=s})}),e}decompress(e,t,s){p.push(i=>{this._decompress(e,t,(e,t)=>{i(),s(e,t)})})}compress(e,t,s){p.push(i=>{this._compress(e,t,(e,t)=>{i(),s(e,t)})})}_decompress(e,t,s){const i=this._isServer?"client":"server";if(!this._inflate){const e=i+"_max_window_bits",t="number"!=typeof this.params[e]?r.Z_DEFAULT_WINDOWBITS:this.params[e];this._inflate=r.createInflateRaw(Object.assign({},this._options.zlibInflateOptions,{windowBits:t})),this._inflate[l]=this,this._inflate[d]=0,this._inflate[u]=[],this._inflate.on("error",y),this._inflate.on("data",g)}this._inflate[f]=s,this._inflate.write(e),t&&this._inflate.write(h),this._inflate.flush(()=>{const e=this._inflate[_];if(e)return this._inflate.close(),this._inflate=null,void s(e);const r=n.concat(this._inflate[u],this._inflate[d]);t&&this.params[i+"_no_context_takeover"]?(this._inflate.close(),this._inflate=null):(this._inflate[d]=0,this._inflate[u]=[]),s(null,r)})}_compress(e,t,s){if(!e||0===e.length)return void process.nextTick(s,null,c);const i=this._isServer?"server":"client";if(!this._deflate){const e=i+"_max_window_bits",t="number"!=typeof this.params[e]?r.Z_DEFAULT_WINDOWBITS:this.params[e];this._deflate=r.createDeflateRaw(Object.assign({},this._options.zlibDeflateOptions,{windowBits:t})),this._deflate[d]=0,this._deflate[u]=[],this._deflate.on("error",a),this._deflate.on("data",m)}this._deflate.write(e),this._deflate.flush(r.Z_SYNC_FLUSH,()=>{if(this._deflate){var e=n.concat(this._deflate[u],this._deflate[d]);t&&(e=e.slice(0,e.length-4)),t&&this.params[i+"_no_context_takeover"]?(this._deflate.close(),this._deflate=null):(this._deflate[d]=0,this._deflate[u]=[]),s(null,e)}})}}},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("crypto")},function(e,t,s){"use strict";const{EMPTY_BUFFER:i}=s(0);function r(e,t){if(0===e.length)return i;if(1===e.length)return e[0];const s=Buffer.allocUnsafe(t);for(var r=0,n=0;n<e.length;n++){const t=e[n];t.copy(s,r),r+=t.length}return s}function n(e,t,s,i,r){for(var n=0;n<r;n++)s[i+n]=e[n]^t[3&n]}function o(e,t){const s=e.length;for(var i=0;i<s;i++)e[i]^=t[3&i]}function a(e){return e.byteLength===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}function h(e){return h.readOnly=!0,Buffer.isBuffer(e)?e:(e instanceof ArrayBuffer?t=Buffer.from(e):ArrayBuffer.isView(e)?t=function(e){const t=Buffer.from(e.buffer);if(e.byteLength!==e.buffer.byteLength)return t.slice(e.byteOffset,e.byteOffset+e.byteLength);return t}(e):(t=Buffer.from(e),h.readOnly=!1),t);var t}try{const t=s(!function(){var e=new Error("Cannot find module 'bufferutil'");throw e.code="MODULE_NOT_FOUND",e}()),i=t.BufferUtil||t;e.exports={concat:r,mask(e,t,s,r,o){o<48?n(e,t,s,r,o):i.mask(e,t,s,r,o)},toArrayBuffer:a,toBuffer:h,unmask(e,t){e.length<32?o(e,t):i.unmask(e,t)}}}catch(t){e.exports={concat:r,mask:n,toArrayBuffer:a,toBuffer:h,unmask:o}}},function(e,t,s){"use strict";const i=s(6),r=s(3),n=s(13),o=s(2),a=s(14),h=s(15),c=s(16),l=s(1),d=s(19),f=s(7),u=s(8),_=s(10),{BINARY_TYPES:p,EMPTY_BUFFER:m,GUID:g,kStatusCode:y,kWebSocket:v,NOOP:b}=s(0),w=["CONNECTING","OPEN","CLOSING","CLOSED"],x=[8,13];class S extends i{constructor(e,t,s){super(),this.readyState=S.CONNECTING,this.protocol="",this._binaryType=p[0],this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage="",this._closeTimer=null,this._closeCode=1006,this._extensions={},this._receiver=null,this._sender=null,this._socket=null,null!==e?(this._isServer=!1,this._redirects=0,Array.isArray(t)?t=t.join(", "):"object"==typeof t&&null!==t&&(s=t,t=void 0),function e(t,s,i,a){const h=Object.assign({protocolVersion:x[1],maxPayload:104857600,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10},a,{createConnection:void 0,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:void 0,auth:void 0,host:void 0,path:void 0,port:void 0});if(!x.includes(h.protocolVersion))throw new RangeError(`Unsupported protocol version: ${h.protocolVersion} (supported versions: ${x.join(", ")})`);var d;"object"==typeof s&&void 0!==s.href?(d=s,t.url=s.href):(d=c.URL?new c.URL(s):c.parse(s),t.url=s);const u="ws+unix:"===d.protocol;if(!(d.host||u&&d.pathname))throw new Error("Invalid URL: "+t.url);const _="wss:"===d.protocol||"https:"===d.protocol,p=_?443:80,m=r.randomBytes(16).toString("base64"),y=_?n.get:o.get,v=d.search?`${d.pathname||"/"}${d.search}`:d.pathname||"/";var b;h.createConnection=_?E:k,h.defaultPort=h.defaultPort||p,h.port=d.port||p,h.host=d.hostname.startsWith("[")?d.hostname.slice(1,-1):d.hostname,h.headers=Object.assign({"Sec-WebSocket-Version":h.protocolVersion,"Sec-WebSocket-Key":m,Connection:"Upgrade",Upgrade:"websocket"},h.headers),h.path=v,h.timeout=h.handshakeTimeout,h.perMessageDeflate&&(b=new l(!0!==h.perMessageDeflate?h.perMessageDeflate:{},!1,h.maxPayload),h.headers["Sec-WebSocket-Extensions"]=f.format({[l.extensionName]:b.offer()}));i&&(h.headers["Sec-WebSocket-Protocol"]=i);h.origin&&(h.protocolVersion<13?h.headers["Sec-WebSocket-Origin"]=h.origin:h.headers.Origin=h.origin);d.auth?h.auth=d.auth:(d.username||d.password)&&(h.auth=`${d.username}:${d.password}`);if(u){const e=v.split(":");h.socketPath=e[0],h.path=e[1]}var w=t._req=y(h);h.timeout&&w.on("timeout",()=>{O(t,w,"Opening handshake has timed out")});w.on("error",e=>{t._req.aborted||(w=t._req=null,t.readyState=S.CLOSING,t.emit("error",e),t.emitClose())}),w.on("response",r=>{const n=r.headers.location,o=r.statusCode;if(n&&h.followRedirects&&o>=300&&o<400){if(++t._redirects>h.maxRedirects)return void O(t,w,"Maximum redirects exceeded");w.abort();const r=c.URL?new c.URL(n,s):c.resolve(s,n);e(t,r,i,a)}else t.emit("unexpected-response",w,r)||O(t,w,"Unexpected server response: "+r.statusCode)}),w.on("upgrade",(e,s,n)=>{if(t.emit("upgrade",e),t.readyState!==S.CONNECTING)return;w=t._req=null;const o=r.createHash("sha1").update(m+g).digest("base64");if(e.headers["sec-websocket-accept"]!==o)return void O(t,s,"Invalid Sec-WebSocket-Accept header");const a=e.headers["sec-websocket-protocol"],c=(i||"").split(/, */);var d;if(!i&&a?d="Server sent a subprotocol but none was requested":i&&!a?d="Server sent no subprotocol":a&&!c.includes(a)&&(d="Server sent an invalid subprotocol"),d)O(t,s,d);else{if(a&&(t.protocol=a),b)try{const s=f.parse(e.headers["sec-websocket-extensions"]);s[l.extensionName]&&(b.accept(s[l.extensionName]),t._extensions[l.extensionName]=b)}catch(e){return void O(t,s,"Invalid Sec-WebSocket-Extensions header")}t.setSocket(s,n,h.maxPayload)}})}(this,e,t,s)):this._isServer=!0}get CONNECTING(){return S.CONNECTING}get CLOSING(){return S.CLOSING}get CLOSED(){return S.CLOSED}get OPEN(){return S.OPEN}get binaryType(){return this._binaryType}set binaryType(e){p.includes(e)&&(this._binaryType=e,this._receiver&&(this._receiver._binaryType=e))}get bufferedAmount(){return this._socket?(this._socket.bufferSize||0)+this._sender._bufferedBytes:0}get extensions(){return Object.keys(this._extensions).join()}setSocket(e,t,s){const i=new u(this._binaryType,this._extensions,s);this._sender=new _(e,this._extensions),this._receiver=i,this._socket=e,i[v]=this,e[v]=this,i.on("conclude",L),i.on("drain",C),i.on("error",N),i.on("message",T),i.on("ping",P),i.on("pong",U),e.setTimeout(0),e.setNoDelay(),t.length>0&&e.unshift(t),e.on("close",M),e.on("data",I),e.on("end",R),e.on("error",W),this.readyState=S.OPEN,this.emit("open")}emitClose(){this.readyState=S.CLOSED,this._socket?(this._extensions[l.extensionName]&&this._extensions[l.extensionName].cleanup(),this._receiver.removeAllListeners(),this.emit("close",this._closeCode,this._closeMessage)):this.emit("close",this._closeCode,this._closeMessage)}close(e,t){if(this.readyState!==S.CLOSED){if(this.readyState===S.CONNECTING){const e="WebSocket was closed before the connection was established";return O(this,this._req,e)}this.readyState!==S.CLOSING?(this.readyState=S.CLOSING,this._sender.close(e,t,!this._isServer,e=>{e||(this._closeFrameSent=!0,this._closeFrameReceived&&this._socket.end())}),this._closeTimer=setTimeout(this._socket.destroy.bind(this._socket),3e4)):this._closeFrameSent&&this._closeFrameReceived&&this._socket.end()}}ping(e,t,s){if("function"==typeof e?(s=e,e=t=void 0):"function"==typeof t&&(s=t,t=void 0),this.readyState!==S.OPEN){const e=new Error(`WebSocket is not open: readyState ${this.readyState} (${w[this.readyState]})`);if(s)return s(e);throw e}"number"==typeof e&&(e=e.toString()),void 0===t&&(t=!this._isServer),this._sender.ping(e||m,t,s)}pong(e,t,s){if("function"==typeof e?(s=e,e=t=void 0):"function"==typeof t&&(s=t,t=void 0),this.readyState!==S.OPEN){const e=new Error(`WebSocket is not open: readyState ${this.readyState} (${w[this.readyState]})`);if(s)return s(e);throw e}"number"==typeof e&&(e=e.toString()),void 0===t&&(t=!this._isServer),this._sender.pong(e||m,t,s)}send(e,t,s){if("function"==typeof t&&(s=t,t={}),this.readyState!==S.OPEN){const e=new Error(`WebSocket is not open: readyState ${this.readyState} (${w[this.readyState]})`);if(s)return s(e);throw e}"number"==typeof e&&(e=e.toString());const i=Object.assign({binary:"string"!=typeof e,mask:!this._isServer,compress:!0,fin:!0},t);this._extensions[l.extensionName]||(i.compress=!1),this._sender.send(e||m,i,s)}terminate(){if(this.readyState!==S.CLOSED){if(this.readyState===S.CONNECTING){const e="WebSocket was closed before the connection was established";return O(this,this._req,e)}this._socket&&(this.readyState=S.CLOSING,this._socket.destroy())}}}function k(e){return e.protocolVersion&&(e.path=e.socketPath),a.connect(e)}function E(e){return e.path=void 0,e.servername=e.servername||e.host,h.connect(e)}function O(e,t,s){e.readyState=S.CLOSING;const i=new Error(s);Error.captureStackTrace(i,O),t.setHeader?(t.abort(),t.once("abort",e.emitClose.bind(e)),e.emit("error",i)):(t.destroy(i),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function L(e,t){const s=this[v];s._socket.removeListener("data",I),s._socket.resume(),s._closeFrameReceived=!0,s._closeMessage=t,s._closeCode=e,1005===e?s.close():s.close(e,t)}function C(){this[v]._socket.resume()}function N(e){const t=this[v];t._socket.removeListener("data",I),t.readyState=S.CLOSING,t._closeCode=e[y],t.emit("error",e),t._socket.destroy()}function B(){this[v].emitClose()}function T(e){this[v].emit("message",e)}function P(e){const t=this[v];t.pong(e,!t._isServer,b),t.emit("ping",e)}function U(e){this[v].emit("pong",e)}function M(){const e=this[v];this.removeListener("close",M),this.removeListener("end",R),e.readyState=S.CLOSING,e._socket.read(),e._receiver.end(),this.removeListener("data",I),this[v]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",B),e._receiver.on("finish",B))}function I(e){this[v]._receiver.write(e)||this.pause()}function R(){const e=this[v];e.readyState=S.CLOSING,e._receiver.end(),this.end()}function W(){const e=this[v];this.removeListener("error",W),this.on("error",b),e.readyState=S.CLOSING,this.destroy()}w.forEach((e,t)=>{S[e]=t}),["open","error","close","message"].forEach(e=>{Object.defineProperty(S.prototype,"on"+e,{get(){const t=this.listeners(e);for(var s=0;s<t.length;s++)if(t[s]._listener)return t[s]._listener},set(t){const s=this.listeners(e);for(var i=0;i<s.length;i++)s[i]._listener&&this.removeListener(e,s[i]);this.addEventListener(e,t)}})}),S.prototype.addEventListener=d.addEventListener,S.prototype.removeEventListener=d.removeEventListener,e.exports=S},function(e,t){e.exports=require("events")},function(e,t,s){"use strict";const i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function r(e,t,s){Object.prototype.hasOwnProperty.call(e,t)?e[t].push(s):e[t]=[s]}e.exports={format:function(e){return Object.keys(e).map(t=>{var s=e[t];return Array.isArray(s)||(s=[s]),s.map(e=>[t].concat(Object.keys(e).map(t=>{var s=e[t];return Array.isArray(s)||(s=[s]),s.map(e=>!0===e?t:`${t}=${e}`).join("; ")})).join("; ")).join(", ")}).join(", ")},parse:function(e){const t={};if(void 0===e||""===e)return t;for(var s,n,o={},a=!1,h=!1,c=!1,l=-1,d=-1,f=0;f<e.length;f++){const _=e.charCodeAt(f);if(void 0===s)if(-1===d&&1===i[_])-1===l&&(l=f);else if(32===_||9===_)-1===d&&-1!==l&&(d=f);else{if(59!==_&&44!==_)throw new SyntaxError("Unexpected character at index "+f);{if(-1===l)throw new SyntaxError("Unexpected character at index "+f);-1===d&&(d=f);const i=e.slice(l,d);44===_?(r(t,i,o),o={}):s=i,l=d=-1}}else if(void 0===n)if(-1===d&&1===i[_])-1===l&&(l=f);else if(32===_||9===_)-1===d&&-1!==l&&(d=f);else if(59===_||44===_){if(-1===l)throw new SyntaxError("Unexpected character at index "+f);-1===d&&(d=f),r(o,e.slice(l,d),!0),44===_&&(r(t,s,o),o={},s=void 0),l=d=-1}else{if(61!==_||-1===l||-1!==d)throw new SyntaxError("Unexpected character at index "+f);n=e.slice(l,f),l=d=-1}else if(h){if(1!==i[_])throw new SyntaxError("Unexpected character at index "+f);-1===l?l=f:a||(a=!0),h=!1}else if(c)if(1===i[_])-1===l&&(l=f);else if(34===_&&-1!==l)c=!1,d=f;else{if(92!==_)throw new SyntaxError("Unexpected character at index "+f);h=!0}else if(34===_&&61===e.charCodeAt(f-1))c=!0;else if(-1===d&&1===i[_])-1===l&&(l=f);else if(-1===l||32!==_&&9!==_){if(59!==_&&44!==_)throw new SyntaxError("Unexpected character at index "+f);if(-1===l)throw new SyntaxError("Unexpected character at index "+f);-1===d&&(d=f);var u=e.slice(l,d);a&&(u=u.replace(/\\/g,""),a=!1),r(o,n,u),44===_&&(r(t,s,o),o={},s=void 0),n=void 0,l=d=-1}else-1===d&&(d=f)}if(-1===l||c)throw new SyntaxError("Unexpected end of input");-1===d&&(d=f);const _=e.slice(l,d);return void 0===s?r(t,_,{}):(void 0===n?r(o,_,!0):r(o,n,a?_.replace(/\\/g,""):_),r(t,s,o)),t}}},function(e,t,s){"use strict";const{Writable:i}=s(20),r=s(1),{BINARY_TYPES:n,EMPTY_BUFFER:o,kStatusCode:a,kWebSocket:h}=s(0),{concat:c,toArrayBuffer:l,unmask:d}=s(4),{isValidStatusCode:f,isValidUTF8:u}=s(9);function _(e,t,s,i){const r=new e(s?"Invalid WebSocket frame: "+t:t);return Error.captureStackTrace(r,_),r[a]=i,r}e.exports=class extends i{constructor(e,t,s){super(),this._binaryType=e||n[0],this[h]=void 0,this._extensions=t||{},this._maxPayload=0|s,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._state=0,this._loop=!1}_write(e,t,s){if(8===this._opcode&&0==this._state)return s();this._bufferedBytes+=e.length,this._buffers.push(e),this.startLoop(s)}consume(e){if(this._bufferedBytes-=e,e===this._buffers[0].length)return this._buffers.shift();if(e<this._buffers[0].length){const t=this._buffers[0];return this._buffers[0]=t.slice(e),t.slice(0,e)}const t=Buffer.allocUnsafe(e);do{const s=this._buffers[0];e>=s.length?this._buffers.shift().copy(t,t.length-e):(s.copy(t,t.length-e,0,e),this._buffers[0]=s.slice(e)),e-=s.length}while(e>0);return t}startLoop(e){var t;this._loop=!0;do{switch(this._state){case 0:t=this.getInfo();break;case 1:t=this.getPayloadLength16();break;case 2:t=this.getPayloadLength64();break;case 3:this.getMask();break;case 4:t=this.getData(e);break;default:return void(this._loop=!1)}}while(this._loop);e(t)}getInfo(){if(this._bufferedBytes<2)return void(this._loop=!1);const e=this.consume(2);if(0!=(48&e[0]))return this._loop=!1,_(RangeError,"RSV2 and RSV3 must be clear",!0,1002);const t=64==(64&e[0]);if(t&&!this._extensions[r.extensionName])return this._loop=!1,_(RangeError,"RSV1 must be clear",!0,1002);if(this._fin=128==(128&e[0]),this._opcode=15&e[0],this._payloadLength=127&e[1],0===this._opcode){if(t)return this._loop=!1,_(RangeError,"RSV1 must be clear",!0,1002);if(!this._fragmented)return this._loop=!1,_(RangeError,"invalid opcode 0",!0,1002);this._opcode=this._fragmented}else if(1===this._opcode||2===this._opcode){if(this._fragmented)return this._loop=!1,_(RangeError,"invalid opcode "+this._opcode,!0,1002);this._compressed=t}else{if(!(this._opcode>7&&this._opcode<11))return this._loop=!1,_(RangeError,"invalid opcode "+this._opcode,!0,1002);if(!this._fin)return this._loop=!1,_(RangeError,"FIN must be set",!0,1002);if(t)return this._loop=!1,_(RangeError,"RSV1 must be clear",!0,1002);if(this._payloadLength>125)return this._loop=!1,_(RangeError,"invalid payload length "+this._payloadLength,!0,1002)}if(this._fin||this._fragmented||(this._fragmented=this._opcode),this._masked=128==(128&e[1]),126===this._payloadLength)this._state=1;else{if(127!==this._payloadLength)return this.haveLength();this._state=2}}getPayloadLength16(){if(!(this._bufferedBytes<2))return this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength();this._loop=!1}getPayloadLength64(){if(this._bufferedBytes<8)return void(this._loop=!1);const e=this.consume(8),t=e.readUInt32BE(0);return t>Math.pow(2,21)-1?(this._loop=!1,_(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009)):(this._payloadLength=t*Math.pow(2,32)+e.readUInt32BE(4),this.haveLength())}haveLength(){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0))return this._loop=!1,_(RangeError,"Max payload size exceeded",!1,1009);this._masked?this._state=3:this._state=4}getMask(){this._bufferedBytes<4?this._loop=!1:(this._mask=this.consume(4),this._state=4)}getData(e){var t=o;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength)return void(this._loop=!1);t=this.consume(this._payloadLength),this._masked&&d(t,this._mask)}return this._opcode>7?this.controlMessage(t):this._compressed?(this._state=5,void this.decompress(t,e)):(t.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(t)),this.dataMessage())}decompress(e,t){this._extensions[r.extensionName].decompress(e,this._fin,(e,s)=>{if(e)return t(e);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0)return t(_(RangeError,"Max payload size exceeded",!1,1009));this._fragments.push(s)}const i=this.dataMessage();if(i)return t(i);this.startLoop(t)})}dataMessage(){if(this._fin){const t=this._messageLength,s=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],2===this._opcode){var e;e="nodebuffer"===this._binaryType?c(s,t):"arraybuffer"===this._binaryType?l(c(s,t)):s,this.emit("message",e)}else{const e=c(s,t);if(!u(e))return this._loop=!1,_(Error,"invalid UTF-8 sequence",!0,1007);this.emit("message",e.toString())}}this._state=0}controlMessage(e){if(8===this._opcode)if(this._loop=!1,0===e.length)this.emit("conclude",1005,""),this.end();else{if(1===e.length)return _(RangeError,"invalid payload length 1",!0,1002);{const t=e.readUInt16BE(0);if(!f(t))return _(RangeError,"invalid status code "+t,!0,1002);const s=e.slice(2);if(!u(s))return _(Error,"invalid UTF-8 sequence",!0,1007);this.emit("conclude",t,s.toString()),this.end()}}else 9===this._opcode?this.emit("ping",e):this.emit("pong",e);this._state=0}}},function(e,t,s){"use strict";try{const e=s(!function(){var e=new Error("Cannot find module 'utf-8-validate'");throw e.code="MODULE_NOT_FOUND",e}());t.isValidUTF8="object"==typeof e?e.Validation.isValidUTF8:e}catch(e){t.isValidUTF8=()=>!0}t.isValidStatusCode=e=>e>=1e3&&e<=1013&&1004!==e&&1005!==e&&1006!==e||e>=3e3&&e<=4999},function(e,t,s){"use strict";const{randomBytes:i}=s(3),r=s(1),{EMPTY_BUFFER:n}=s(0),{isValidStatusCode:o}=s(9),{mask:a,toBuffer:h}=s(4);class c{constructor(e,t){this._extensions=t||{},this._socket=e,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._deflating=!1,this._queue=[]}static frame(e,t){const s=t.mask&&t.readOnly;var r=t.mask?6:2,n=e.length;e.length>=65536?(r+=8,n=127):e.length>125&&(r+=2,n=126);const o=Buffer.allocUnsafe(s?e.length+r:r);if(o[0]=t.fin?128|t.opcode:t.opcode,t.rsv1&&(o[0]|=64),o[1]=n,126===n?o.writeUInt16BE(e.length,2):127===n&&(o.writeUInt32BE(0,2),o.writeUInt32BE(e.length,6)),!t.mask)return[o,e];const h=i(4);return o[1]|=128,o[r-4]=h[0],o[r-3]=h[1],o[r-2]=h[2],o[r-1]=h[3],s?(a(e,h,o,r,e.length),[o]):(a(e,h,e,0,e.length),[o,e])}close(e,t,s,i){var r;if(void 0===e)r=n;else{if("number"!=typeof e||!o(e))throw new TypeError("First argument must be a valid error code number");void 0===t||""===t?(r=Buffer.allocUnsafe(2)).writeUInt16BE(e,0):((r=Buffer.allocUnsafe(2+Buffer.byteLength(t))).writeUInt16BE(e,0),r.write(t,2))}this._deflating?this.enqueue([this.doClose,r,s,i]):this.doClose(r,s,i)}doClose(e,t,s){this.sendFrame(c.frame(e,{fin:!0,rsv1:!1,opcode:8,mask:t,readOnly:!1}),s)}ping(e,t,s){const i=h(e);this._deflating?this.enqueue([this.doPing,i,t,h.readOnly,s]):this.doPing(i,t,h.readOnly,s)}doPing(e,t,s,i){this.sendFrame(c.frame(e,{fin:!0,rsv1:!1,opcode:9,mask:t,readOnly:s}),i)}pong(e,t,s){const i=h(e);this._deflating?this.enqueue([this.doPong,i,t,h.readOnly,s]):this.doPong(i,t,h.readOnly,s)}doPong(e,t,s,i){this.sendFrame(c.frame(e,{fin:!0,rsv1:!1,opcode:10,mask:t,readOnly:s}),i)}send(e,t,s){const i=h(e),n=this._extensions[r.extensionName];var o=t.binary?2:1,a=t.compress;if(this._firstFragment?(this._firstFragment=!1,a&&n&&(a=i.length>=n._threshold),this._compress=a):(a=!1,o=0),t.fin&&(this._firstFragment=!0),n){const e={fin:t.fin,rsv1:a,opcode:o,mask:t.mask,readOnly:h.readOnly};this._deflating?this.enqueue([this.dispatch,i,this._compress,e,s]):this.dispatch(i,this._compress,e,s)}else this.sendFrame(c.frame(i,{fin:t.fin,rsv1:!1,opcode:o,mask:t.mask,readOnly:h.readOnly}),s)}dispatch(e,t,s,i){if(!t)return void this.sendFrame(c.frame(e,s),i);const n=this._extensions[r.extensionName];this._deflating=!0,n.compress(e,s.fin,(e,t)=>{this._deflating=!1,s.readOnly=!1,this.sendFrame(c.frame(t,s),i),this.dequeue()})}dequeue(){for(;!this._deflating&&this._queue.length;){const e=this._queue.shift();this._bufferedBytes-=e[1].length,e[0].apply(this,e.slice(1))}}enqueue(e){this._bufferedBytes+=e[1].length,this._queue.push(e)}sendFrame(e,t){2===e.length?(this._socket.cork(),this._socket.write(e[0]),this._socket.write(e[1],t),this._socket.uncork()):this._socket.write(e[0],t)}}e.exports=c},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(2),r=s(12),n=i.createServer((e,t)=>{t.end("I'm connected")});new r.Server({server:n}).on("connection",(function(e){e.on("message",(function(e){console.log("received: %s",e)})),e.send("something")})),n.listen(8080)},function(e,t,s){"use strict";const i=s(5);i.Server=s(21),i.Receiver=s(8),i.Sender=s(10),e.exports=i},function(e,t){e.exports=require("https")},function(e,t){e.exports=require("net")},function(e,t){e.exports=require("tls")},function(e,t){e.exports=require("url")},function(e,t,s){"use strict";function i(e){if(!(this instanceof i))return new i(e);e=e||{},this.concurrency=e.concurrency||1/0,this.pending=0,this.jobs=[],this.cbs=[],this._done=r.bind(this)}function r(){this.pending--,this._run()}["push","unshift","splice"].forEach((function(e){i.prototype[e]=function(){var t=Array.prototype[e].apply(this.jobs,arguments);return this._run(),t}})),Object.defineProperty(i.prototype,"length",{get:function(){return this.pending+this.jobs.length}}),i.prototype._run=function(){if(this.pending!==this.concurrency){if(this.jobs.length){var e=this.jobs.shift();this.pending++,e(this._done),this._run()}if(0===this.pending)for(;0!==this.cbs.length;){var t=this.cbs.pop();process.nextTick(t)}}},i.prototype.onDone=function(e){"function"==typeof e&&(this.cbs.push(e),this._run())},e.exports=i},function(e,t){e.exports=require("zlib")},function(e,t,s){"use strict";class i{constructor(e,t){this.target=t,this.type=e}}class r extends i{constructor(e,t){super("message",t),this.data=e}}class n extends i{constructor(e,t,s){super("close",s),this.wasClean=s._closeFrameReceived&&s._closeFrameSent,this.reason=t,this.code=e}}class o extends i{constructor(e){super("open",e)}}class a extends i{constructor(e,t){super("error",t),this.message=e.message,this.error=e}}const h={addEventListener(e,t){function s(e){t.call(this,new r(e,this))}function i(e,s){t.call(this,new n(e,s,this))}function h(e){t.call(this,new a(e,this))}function c(){t.call(this,new o(this))}"function"==typeof t&&("message"===e?(s._listener=t,this.on(e,s)):"close"===e?(i._listener=t,this.on(e,i)):"error"===e?(h._listener=t,this.on(e,h)):"open"===e?(c._listener=t,this.on(e,c)):this.on(e,t))},removeEventListener(e,t){const s=this.listeners(e);for(var i=0;i<s.length;i++)s[i]!==t&&s[i]._listener!==t||this.removeListener(e,s[i])}};e.exports=h},function(e,t){e.exports=require("stream")},function(e,t,s){"use strict";const i=s(6),r=s(3),n=s(2),o=s(1),a=s(7),h=s(5),{GUID:c}=s(0),l=/^[+/0-9A-Za-z]{22}==$/;function d(e){e.emit("close")}function f(){this.destroy()}function u(e,t,s,i){e.writable&&(s=s||n.STATUS_CODES[t],i=Object.assign({Connection:"close","Content-type":"text/html","Content-Length":Buffer.byteLength(s)},i),e.write(`HTTP/1.1 ${t} ${n.STATUS_CODES[t]}\r\n`+Object.keys(i).map(e=>`${e}: ${i[e]}`).join("\r\n")+"\r\n\r\n"+s)),e.removeListener("error",f),e.destroy()}e.exports=class extends i{constructor(e,t){if(super(),null==(e=Object.assign({maxPayload:104857600,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null},e)).port&&!e.server&&!e.noServer)throw new TypeError('One of the "port", "server", or "noServer" options must be specified');null!=e.port?(this._server=n.createServer((e,t)=>{const s=n.STATUS_CODES[426];t.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),t.end(s)}),this._server.listen(e.port,e.host,e.backlog,t)):e.server&&(this._server=e.server),this._server&&(this._removeListeners=function(e,t){for(const s of Object.keys(t))e.on(s,t[s]);return function(){for(const s of Object.keys(t))e.removeListener(s,t[s])}}(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(e,t,s)=>{this.handleUpgrade(e,t,s,t=>{this.emit("connection",t,e)})}})),!0===e.perMessageDeflate&&(e.perMessageDeflate={}),e.clientTracking&&(this.clients=new Set),this.options=e}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(e){if(e&&this.once("close",e),this.clients)for(const e of this.clients)e.terminate();const t=this._server;t&&(this._removeListeners(),this._removeListeners=this._server=null,null!=this.options.port)?t.close(()=>this.emit("close")):process.nextTick(d,this)}shouldHandle(e){if(this.options.path){const t=e.url.indexOf("?");if((-1!==t?e.url.slice(0,t):e.url)!==this.options.path)return!1}return!0}handleUpgrade(e,t,s,i){t.on("error",f);const r=void 0!==e.headers["sec-websocket-key"]&&e.headers["sec-websocket-key"].trim(),n=+e.headers["sec-websocket-version"],h={};if("GET"!==e.method||"websocket"!==e.headers.upgrade.toLowerCase()||!r||!l.test(r)||8!==n&&13!==n||!this.shouldHandle(e))return u(t,400);if(this.options.perMessageDeflate){const s=new o(this.options.perMessageDeflate,!0,this.options.maxPayload);try{const t=a.parse(e.headers["sec-websocket-extensions"]);t[o.extensionName]&&(s.accept(t[o.extensionName]),h[o.extensionName]=s)}catch(e){return u(t,400)}}if(this.options.verifyClient){const o={origin:e.headers[""+(8===n?"sec-websocket-origin":"origin")],secure:!(!e.connection.authorized&&!e.connection.encrypted),req:e};if(2===this.options.verifyClient.length)return void this.options.verifyClient(o,(n,o,a,c)=>{if(!n)return u(t,o||401,a,c);this.completeUpgrade(r,h,e,t,s,i)});if(!this.options.verifyClient(o))return u(t,401)}this.completeUpgrade(r,h,e,t,s,i)}completeUpgrade(e,t,s,i,n,l){if(!i.readable||!i.writable)return i.destroy();const d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade","Sec-WebSocket-Accept: "+r.createHash("sha1").update(e+c).digest("base64")],u=new h(null);var _=s.headers["sec-websocket-protocol"];if(_&&(_=_.trim().split(/ *, */),(_=this.options.handleProtocols?this.options.handleProtocols(_,s):_[0])&&(d.push("Sec-WebSocket-Protocol: "+_),u.protocol=_)),t[o.extensionName]){const e=t[o.extensionName].params,s=a.format({[o.extensionName]:[e]});d.push("Sec-WebSocket-Extensions: "+s),u._extensions=t}this.emit("headers",d,s),i.write(d.concat("\r\n").join("\r\n")),i.removeListener("error",f),u.setSocket(i,n,this.options.maxPayload),this.clients&&(this.clients.add(u),u.on("close",()=>this.clients.delete(u))),l(u)}}}]);
//# sourceMappingURL=server.js.map
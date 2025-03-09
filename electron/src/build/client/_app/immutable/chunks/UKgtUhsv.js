import{a as Q,t as Ie,c as he}from"./DCngfxLn.js";import{p as W,a7 as Ce,b as C,ad as Oe,z as Me,a as Z,o as pe,g as i,n as $,A as be,v as P,x as F,h as w,k as Ne}from"./CVfhQmyV.js";import{_ as ve,f as V,M as ge,s as ee,a as B,g as O,u as G,b as K,c as X,h as ke,p as ye,i as De,C as Le}from"./C_ugDeei.js";import{p as l,a as j,b as te,r as ne,s as xe}from"./mPLQjtID.js";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var d={CLOSING:"mdc-snackbar--closing",OPEN:"mdc-snackbar--open",OPENING:"mdc-snackbar--opening"},M={ACTION_SELECTOR:".mdc-snackbar__action",ARIA_LIVE_LABEL_TEXT_ATTR:"data-mdc-snackbar-label-text",CLOSED_EVENT:"MDCSnackbar:closed",CLOSING_EVENT:"MDCSnackbar:closing",DISMISS_SELECTOR:".mdc-snackbar__dismiss",LABEL_SELECTOR:".mdc-snackbar__label",OPENED_EVENT:"MDCSnackbar:opened",OPENING_EVENT:"MDCSnackbar:opening",REASON_ACTION:"action",REASON_DISMISS:"dismiss",SURFACE_SELECTOR:".mdc-snackbar__surface"},u={DEFAULT_AUTO_DISMISS_TIMEOUT_MS:5e3,INDETERMINATE:-1,MAX_AUTO_DISMISS_TIMEOUT_MS:1e4,MIN_AUTO_DISMISS_TIMEOUT_MS:4e3,SNACKBAR_ANIMATION_CLOSE_TIME_MS:75,SNACKBAR_ANIMATION_OPEN_TIME_MS:150,ARIA_LIVE_DELAY_MS:1e3};/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var Re=u.ARIA_LIVE_DELAY_MS,q=M.ARIA_LIVE_LABEL_TEXT_ATTR;function Ue(o,e){e===void 0&&(e=o);var n=o.getAttribute("aria-live"),a=e.textContent.trim();if(!(!a||!n)){o.setAttribute("aria-live","off"),e.textContent="";var c=document.createElement("span");c.setAttribute("style","display: inline-block; width: 0; height: 1px;"),c.textContent=" ",e.appendChild(c),e.setAttribute(q,a),setTimeout(function(){o.setAttribute("aria-live",n),e.removeAttribute(q),e.textContent=a},Re)}}/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var z=d.OPENING,Y=d.OPEN,H=d.CLOSING,Pe=M.REASON_ACTION,k=M.REASON_DISMISS,Fe=function(o){ve(e,o);function e(n){var a=o.call(this,V(V({},e.defaultAdapter),n))||this;return a.opened=!1,a.animationFrame=0,a.animationTimer=0,a.autoDismissTimer=0,a.autoDismissTimeoutMs=u.DEFAULT_AUTO_DISMISS_TIMEOUT_MS,a.closeOnEscape=!0,a}return Object.defineProperty(e,"cssClasses",{get:function(){return d},enumerable:!1,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return M},enumerable:!1,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return u},enumerable:!1,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},announce:function(){},notifyClosed:function(){},notifyClosing:function(){},notifyOpened:function(){},notifyOpening:function(){},removeClass:function(){}}},enumerable:!1,configurable:!0}),e.prototype.destroy=function(){this.clearAutoDismissTimer(),cancelAnimationFrame(this.animationFrame),this.animationFrame=0,clearTimeout(this.animationTimer),this.animationTimer=0,this.adapter.removeClass(z),this.adapter.removeClass(Y),this.adapter.removeClass(H)},e.prototype.open=function(){var n=this;this.clearAutoDismissTimer(),this.opened=!0,this.adapter.notifyOpening(),this.adapter.removeClass(H),this.adapter.addClass(z),this.adapter.announce(),this.runNextAnimationFrame(function(){n.adapter.addClass(Y),n.animationTimer=setTimeout(function(){var a=n.getTimeoutMs();n.handleAnimationTimerEnd(),n.adapter.notifyOpened(),a!==u.INDETERMINATE&&(n.autoDismissTimer=setTimeout(function(){n.close(k)},a))},u.SNACKBAR_ANIMATION_OPEN_TIME_MS)})},e.prototype.close=function(n){var a=this;n===void 0&&(n=""),this.opened&&(cancelAnimationFrame(this.animationFrame),this.animationFrame=0,this.clearAutoDismissTimer(),this.opened=!1,this.adapter.notifyClosing(n),this.adapter.addClass(d.CLOSING),this.adapter.removeClass(d.OPEN),this.adapter.removeClass(d.OPENING),clearTimeout(this.animationTimer),this.animationTimer=setTimeout(function(){a.handleAnimationTimerEnd(),a.adapter.notifyClosed(n)},u.SNACKBAR_ANIMATION_CLOSE_TIME_MS))},e.prototype.isOpen=function(){return this.opened},e.prototype.getTimeoutMs=function(){return this.autoDismissTimeoutMs},e.prototype.setTimeoutMs=function(n){var a=u.MIN_AUTO_DISMISS_TIMEOUT_MS,c=u.MAX_AUTO_DISMISS_TIMEOUT_MS,m=u.INDETERMINATE;if(n===u.INDETERMINATE||n<=c&&n>=a)this.autoDismissTimeoutMs=n;else throw new Error(`
        timeoutMs must be an integer in the range `+a+"–"+c+`
        (or `+m+" to disable), but got '"+n+"'")},e.prototype.getCloseOnEscape=function(){return this.closeOnEscape},e.prototype.setCloseOnEscape=function(n){this.closeOnEscape=n},e.prototype.handleKeyDown=function(n){var a=n.key==="Escape"||n.keyCode===27;a&&this.getCloseOnEscape()&&this.close(k)},e.prototype.handleActionButtonClick=function(n){this.close(Pe)},e.prototype.handleActionIconClick=function(n){this.close(k)},e.prototype.clearAutoDismissTimer=function(){clearTimeout(this.autoDismissTimer),this.autoDismissTimer=0},e.prototype.handleAnimationTimerEnd=function(){this.animationTimer=0,this.adapter.removeClass(d.OPENING),this.adapter.removeClass(d.CLOSING)},e.prototype.runNextAnimationFrame=function(n){var a=this;cancelAnimationFrame(this.animationFrame),this.animationFrame=requestAnimationFrame(function(){a.animationFrame=0,clearTimeout(a.animationTimer),a.animationTimer=setTimeout(n,0)})},e}(ge);let J=Promise.resolve();var we=Ie("<aside><div><!></div></aside>");function Xe(o,e){W(e,!0);const{closest:n}=De;let a=()=>{};function c(t){return t===a}let m=l(e,"use",19,()=>[]),y=l(e,"class",3,""),A=l(e,"leading",3,!1),S=l(e,"timeoutMs",3,5e3),D=l(e,"closeOnEscape",3,!0),p=l(e,"labelText",3,a),b=l(e,"actionButtonText",3,a),ae=l(e,"surface$use",19,()=>[]),ie=l(e,"surface$class",3,""),L=ne(e,["$$slots","$$events","$$legacy","use","class","variant","leading","timeoutMs","closeOnEscape","labelText","actionButtonText","surface$use","surface$class","children"]),N,s=be(void 0),_=j({}),v,x=new Promise(t=>v=t);Ce("SMUI:label:context","snackbar"),C(()=>{i(s)&&i(s).getTimeoutMs()!==S()&&i(s).setTimeoutMs(S())}),C(()=>{i(s)&&i(s).getCloseOnEscape()!==D()&&i(s).setCloseOnEscape(D())}),C(()=>{i(s)&&!c(p())&&I().textContent!==p()&&(I().textContent=p())}),C(()=>{i(s)&&!c(b())&&g().textContent!==b()&&(g().textContent=b())}),Oe(()=>(pe(s,j(new Fe({addClass:se,announce:()=>Ue(I()),notifyClosed:t=>O(f(),"SMUISnackbarClosed",t?{reason:t}:{}),notifyClosing:t=>O(f(),"SMUISnackbarClosing",t?{reason:t}:{}),notifyOpened:()=>O(f(),"SMUISnackbarOpened"),notifyOpening:()=>O(f(),"SMUISnackbarOpening"),removeClass:re}))),i(s).init(),()=>{var t;(t=i(s))==null||t.destroy()}));function se(t){_[t]||(_[t]=!0)}function re(t){(!(t in _)||_[t])&&(_[t]=!1)}function oe(t){const r=t.target;i(s)&&(n(r,".mdc-snackbar__action")?i(s).handleActionButtonClick(t):n(r,".mdc-snackbar__dismiss")&&i(s).handleActionIconClick(t))}function ce(){v(),x=new Promise(t=>v=t)}function ue(){J=J.then(()=>{var t;return(t=i(s))==null||t.open(),x})}function le(){var t;return(t=i(s))==null?void 0:t.open()}function de(t){var r;return(r=i(s))==null?void 0:r.close(t)}function me(){if(i(s)==null)throw new Error("Instance is undefined.");return i(s).isOpen()}function I(){return f().querySelector(".mdc-snackbar__label")??document.createElement("div")}function g(){return f().querySelector(".mdc-snackbar__action")??document.createElement("button")}function f(){return N}var T=we();const fe=w(()=>ke(L,["surface$"]));var _e=t=>{var r;i(s)&&i(s).handleKeyDown(t),(r=e.onkeydown)==null||r.call(e,t)},Te=t=>{var r;ce(),(r=e.onSMUISnackbarClosed)==null||r.call(e,t)};let R;var h=P(T);const Ee=w(()=>ye(L,"surface$"));var Ae=t=>{var r;oe(t),(r=e.surface$onclick)==null||r.call(e,t)};let U;var Se=P(h);return ee(Se,()=>e.children??$),F(h),B(h,(t,r)=>{var E;return(E=G)==null?void 0:E(t,r)},ae),F(T),te(T,t=>N=t,()=>N),B(T,(t,r)=>{var E;return(E=G)==null?void 0:E(t,r)},m),Me(()=>{R=K(T,R,{class:X({[y()]:!0,"mdc-snackbar":!0,"mdc-snackbar--stacked":e.variant==="stacked","mdc-snackbar--leading":A(),..._}),...i(fe),onkeydown:_e,onSMUISnackbarClosed:Te}),U=K(h,U,{class:X({[ie()]:!0,"mdc-snackbar__surface":!0}),role:"status","aria-relevant":"additions",...i(Ee),onclick:Ae})}),Q(o,T),Z({open:ue,forceOpen:le,close:de,isOpen:me,getLabelElement:I,getActionButtonElement:g,getElement:f})}function je(o,e){W(e,!0);let n=ne(e,["$$slots","$$events","$$legacy","children"]),a;function c(){return a.getElement()}return te(Le(o,xe({_smuiClass:"mdc-snackbar__actions",_smuiProps:{"aria-atomic":"true"},_smuiContexts:{"SMUI:button:context":"snackbar:actions","SMUI:icon-button:context":"snackbar:actions","SMUI:label:context":void 0},tag:"div"},()=>n,{children:(m,y)=>{var A=he(),S=Ne(A);ee(S,()=>e.children??$),Q(m,A)},$$slots:{default:!0}})),m=>a=m,()=>a),Z({getElement:c})}export{je as A,Xe as S};

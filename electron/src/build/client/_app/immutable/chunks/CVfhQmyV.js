var Zn=Array.isArray,ln=Array.prototype.indexOf,Jn=Array.from,Qn=Object.defineProperty,wt=Object.getOwnPropertyDescriptor,un=Object.getOwnPropertyDescriptors,Wn=Object.prototype,Xn=Array.prototype,an=Object.getPrototypeOf;function tr(t){return typeof t=="function"}const $=()=>{};function nr(t){return t()}function At(t){for(var n=0;n<t.length;n++)t[n]()}const w=2,bt=4,U=8,ft=16,A=32,B=64,Z=128,I=256,J=512,h=1024,b=2048,P=4096,q=8192,F=16384,on=32768,xt=65536,rr=1<<17,fn=1<<19,St=1<<20,yt=Symbol("$state"),er=Symbol("legacy props"),sr=Symbol("");function kt(t){return t===this.v}function Dt(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function It(t){return!Dt(t,this.v)}function _n(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function cn(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function vn(t){throw new Error("https://svelte.dev/e/effect_orphan")}function pn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function lr(){throw new Error("https://svelte.dev/e/hydration_failed")}function ur(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function ar(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function or(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function hn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function dn(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let V=!1;function ir(){V=!0}const fr=1,_r=2,cr=4,vr=8,pr=16,hr=1,dr=2,Er=4,wr=8,yr=16,mr=1,Tr=2,En="[",wn="[!",yn="]",Rt={},gr=Symbol(),Ar="http://www.w3.org/2000/svg";function _t(t,n){var r={f:0,v:t,reactions:null,equals:kt,rv:0,wv:0};return r}function br(t){return Ot(_t(t))}function mn(t,n=!1){var e;const r=_t(t);return n||(r.equals=It),V&&o!==null&&o.l!==null&&((e=o.l).s??(e.s=[])).push(r),r}function xr(t,n=!1){return Ot(mn(t,n))}function Ot(t){return f!==null&&f.f&w&&(T===null?Fn([t]):T.push(t)),t}function Tn(t,n){return f!==null&&rt()&&f.f&(w|ft)&&(T===null||!T.includes(t))&&dn(),gn(t,n)}function gn(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=Qt(),Ct(t,b),rt()&&v!==null&&v.f&h&&!(v.f&(A|B))&&(g===null?Mn([t]):g.push(t))),n}function Ct(t,n){var r=t.reactions;if(r!==null)for(var e=rt(),s=r.length,l=0;l<s;l++){var u=r[l],a=u.f;a&b||!e&&u===v||(m(u,n),a&(h|I)&&(a&w?Ct(u,P):st(u)))}}function Nt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let k=!1;function Sr(t){k=t}let y;function L(t){if(t===null)throw Nt(),Rt;return y=t}function kr(){return L(R(y))}function Dr(t){if(k){if(R(y)!==null)throw Nt(),Rt;y=t}}function Ir(t=1){if(k){for(var n=t,r=y;n--;)r=R(r);y=r}}function Rr(){for(var t=0,n=y;;){if(n.nodeType===8){var r=n.data;if(r===yn){if(t===0)return n;t-=1}else(r===En||r===wn)&&(t+=1)}var e=R(n);n.remove(),n=e}}var mt,An,qt,Pt;function Or(){if(mt===void 0){mt=window,An=document;var t=Element.prototype,n=Node.prototype;qt=wt(n,"firstChild").get,Pt=wt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function lt(t=""){return document.createTextNode(t)}function ut(t){return qt.call(t)}function R(t){return Pt.call(t)}function Cr(t,n){if(!k)return ut(t);var r=ut(y);if(r===null)r=y.appendChild(lt());else if(n&&r.nodeType!==3){var e=lt();return r==null||r.before(e),L(e),e}return L(r),r}function Nr(t,n){if(!k){var r=ut(t);return r instanceof Comment&&r.data===""?R(r):r}return y}function qr(t,n=1,r=!1){let e=k?y:t;for(var s;n--;)s=e,e=R(e);if(!k)return e;var l=e==null?void 0:e.nodeType;if(r&&l!==3){var u=lt();return e===null?s==null||s.after(u):e.before(u),L(u),u}return L(e),e}function Pr(t){t.textContent=""}function bn(t){var n=w|b;v===null?n|=I:v.f|=St;var r=f!==null&&f.f&w?f:null;const e={children:null,ctx:o,deps:null,equals:kt,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:r??v};return r!==null&&(r.children??(r.children=[])).push(e),e}function Fr(t){const n=bn(t);return n.equals=It,n}function Ft(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&w?ct(e):D(e)}}}function xn(t){for(var n=t.parent;n!==null;){if(!(n.f&w))return n;n=n.parent}return null}function Mt(t){var n,r=v;tt(xn(t));try{Ft(t),n=Xt(t)}finally{tt(r)}return n}function Lt(t){var n=Mt(t),r=(S||t.f&I)&&t.deps!==null?P:h;m(t,r),t.equals(n)||(t.v=n,t.wv=Qt())}function ct(t){Ft(t),j(t,0),m(t,F),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Yt(t){v===null&&f===null&&vn(),f!==null&&f.f&I&&cn(),pt&&_n()}function Sn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function M(t,n,r,e=!0){var s=(t&B)!==0,l=v,u={ctx:o,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|b,first:null,fn:n,last:null,next:null,parent:s?null:l,prev:null,teardown:null,transitions:null,wv:0};if(r){var a=C;try{Tt(!0),ht(u),u.f|=on}catch(p){throw D(u),p}finally{Tt(a)}}else n!==null&&st(u);var _=r&&u.deps===null&&u.first===null&&u.nodes_start===null&&u.teardown===null&&(u.f&(St|Z))===0;if(!_&&!s&&e&&(l!==null&&Sn(u,l),f!==null&&f.f&w)){var i=f;(i.children??(i.children=[])).push(u)}return u}function Mr(t){const n=M(U,null,!1);return m(n,h),n.teardown=t,n}function kn(t){Yt();var n=v!==null&&(v.f&A)!==0&&o!==null&&!o.m;if(n){var r=o;(r.e??(r.e=[])).push({fn:t,effect:v,reaction:f})}else{var e=Ht(t);return e}}function Lr(t){return Yt(),Dn(t)}function Yr(t){const n=M(B,t,!0);return(r={})=>new Promise(e=>{r.outro?On(n,()=>{D(n),e(void 0)}):(D(n),e(void 0))})}function Ht(t){return M(bt,t,!1)}function Dn(t){return M(U,t,!0)}function Hr(t){return In(t)}function In(t,n=0){return M(U|ft|n,t,!0)}function jr(t,n=!0){return M(U|A,t,!0,n)}function jt(t){var n=t.teardown;if(n!==null){const r=pt,e=f;gt(!0),X(null);try{n.call(null)}finally{gt(r),X(e)}}}function Ut(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)ct(n[r])}}function Bt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;D(r,n),r=e}}function Rn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&A||D(n),n=r}}function D(t,n=!0){var r=!1;if((n||t.f&fn)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var l=e===s?null:R(e);e.remove(),e=l}r=!0}Bt(t,n&&!r),Ut(t),j(t,0),m(t,F);var u=t.transitions;if(u!==null)for(const _ of u)_.stop();jt(t);var a=t.parent;a!==null&&a.first!==null&&Vt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Vt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function On(t,n){var r=[];Gt(t,r,!0),Cn(r,()=>{D(t),n&&n()})}function Cn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Gt(t,n,r){if(!(t.f&q)){if(t.f^=q,t.transitions!==null)for(const u of t.transitions)(u.is_global||r)&&n.push(u);for(var e=t.first;e!==null;){var s=e.next,l=(e.f&xt)!==0||(e.f&A)!==0;Gt(e,n,l?r:!1),e=s}}}function Ur(t){$t(t,!0)}function $t(t,n){if(t.f&q){t.f^=q,t.f&h||(t.f^=h),G(t)&&(m(t,b),st(t));for(var r=t.first;r!==null;){var e=r.next,s=(r.f&xt)!==0||(r.f&A)!==0;$t(r,s?n:!1),r=e}if(t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&l.in()}}const Nn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let Q=!1,W=!1,at=[],ot=[];function Kt(){Q=!1;const t=at.slice();at=[],At(t)}function zt(){W=!1;const t=ot.slice();ot=[],At(t)}function Br(t){Q||(Q=!0,queueMicrotask(Kt)),at.push(t)}function Vr(t){W||(W=!0,Nn(zt)),ot.push(t)}function qn(){Q&&Kt(),W&&zt()}function vt(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}const Zt=0,Pn=1;let K=!1,z=Zt,Y=!1,H=null,C=!1,pt=!1;function Tt(t){C=t}function gt(t){pt=t}let x=[],N=0;let f=null;function X(t){f=t}let v=null;function tt(t){v=t}let T=null;function Fn(t){T=t}let d=null,E=0,g=null;function Mn(t){g=t}let Jt=1,nt=0,S=!1,o=null;function Qt(){return++Jt}function rt(){return!V||o!==null&&o.l===null}function G(t){var i;var n=t.f;if(n&b)return!0;if(n&P){var r=t.deps,e=(n&I)!==0;if(r!==null){var s,l,u=(n&J)!==0,a=e&&v!==null&&!S,_=r.length;if(u||a){for(s=0;s<_;s++)l=r[s],(u||!((i=l==null?void 0:l.reactions)!=null&&i.includes(t)))&&(l.reactions??(l.reactions=[])).push(t);u&&(t.f^=J)}for(s=0;s<_;s++)if(l=r[s],G(l)&&Lt(l),l.wv>t.wv)return!0}(!e||v!==null&&!S)&&m(t,h)}return!1}function Ln(t,n){for(var r=n;r!==null;){if(r.f&Z)try{r.fn(t);return}catch{r.f^=Z}r=r.parent}throw K=!1,t}function Yn(t){return(t.f&F)===0&&(t.parent===null||(t.parent.f&Z)===0)}function et(t,n,r,e){if(K){if(r===null&&(K=!1),Yn(n))throw t;return}r!==null&&(K=!0);{Ln(t,n);return}}function Wt(t,n,r=0){var e=t.reactions;if(e!==null)for(var s=0;s<e.length;s++){var l=e[s];l.f&w?Wt(l,n,r+1):n===l&&(r===0?m(l,b):l.f&h&&m(l,P),st(l))}}function Xt(t){var Et;var n=d,r=E,e=g,s=f,l=S,u=T,a=o,_=t.f;d=null,E=0,g=null,f=_&(A|B)?null:t,S=!C&&(_&I)!==0,T=null,o=t.ctx,nt++;try{var i=(0,t.fn)(),p=t.deps;if(d!==null){var c;if(j(t,E),p!==null&&E>0)for(p.length=E+d.length,c=0;c<d.length;c++)p[E+c]=d[c];else t.deps=p=d;if(!S)for(c=E;c<p.length;c++)((Et=p[c]).reactions??(Et.reactions=[])).push(t)}else p!==null&&E<p.length&&(j(t,E),p.length=E);if(rt()&&g!==null&&!(t.f&(w|P|b)))for(c=0;c<g.length;c++)Wt(g[c],t);return s!==null&&nt++,i}finally{d=n,E=r,g=e,f=s,S=l,T=u,o=a}}function Hn(t,n){let r=n.reactions;if(r!==null){var e=ln.call(r,t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&w&&(d===null||!d.includes(n))&&(m(n,P),n.f&(I|J)||(n.f^=J),j(n,0))}function j(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)Hn(t,r[e])}function ht(t){var n=t.f;if(!(n&F)){m(t,h);var r=v,e=o;v=t;try{n&ft?Rn(t):Bt(t),Ut(t),jt(t);var s=Xt(t);t.teardown=typeof s=="function"?s:null,t.wv=Jt;var l=t.deps,u}catch(a){et(a,t,r,e||t.ctx)}finally{v=r}}}function tn(){if(N>1e3){N=0;try{pn()}catch(t){if(H!==null)et(t,H,null);else throw t}}N++}function nn(t){var n=t.length;if(n!==0){tn();var r=C;C=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&h||(s.f^=h);var l=[];rn(s,l),jn(l)}}finally{C=r}}}function jn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(F|q)))try{G(e)&&(ht(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Vt(e):e.fn=null))}catch(s){et(s,e,null,e.ctx)}}}function Un(){if(Y=!1,N>1001)return;const t=x;x=[],nn(t),Y||(N=0,H=null)}function st(t){z===Zt&&(Y||(Y=!0,queueMicrotask(Un))),H=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(B|A)){if(!(r&h))return;n.f^=h}}x.push(n)}function rn(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,l=(s&A)!==0,u=l&&(s&h)!==0,a=r.next;if(!u&&!(s&q))if(s&U){if(l)r.f^=h;else try{G(r)&&ht(r)}catch(c){et(c,r,null,r.ctx)}var _=r.first;if(_!==null){r=_;continue}}else s&bt&&e.push(r);if(a===null){let c=r.parent;for(;c!==null;){if(t===c)break t;var i=c.next;if(i!==null){r=i;continue t}c=c.parent}}r=a}for(var p=0;p<e.length;p++)_=e[p],n.push(_),rn(_,n)}function en(t){var n=z,r=x;try{tn();const s=[];z=Pn,x=s,Y=!1,nn(r);var e=t==null?void 0:t();return qn(),(x.length>0||s.length>0)&&en(),N=0,H=null,e}finally{z=n,x=r}}async function Gr(){await Promise.resolve(),en()}function Bn(t){var p;var n=t.f,r=(n&w)!==0;if(r&&n&F){var e=Mt(t);return ct(t),e}if(f!==null){T!==null&&T.includes(t)&&hn();var s=f.deps;t.rv<nt&&(t.rv=nt,d===null&&s!==null&&s[E]===t?E++:d===null?d=[t]:d.push(t))}else if(r&&t.deps===null)for(var l=t,u=l.parent,a=l;u!==null;)if(u.f&w){var _=u;a=_,u=_.parent}else{var i=u;(p=i.deriveds)!=null&&p.includes(a)||(i.deriveds??(i.deriveds=[])).push(a);break}return r&&(l=t,G(l)&&Lt(l)),t.v}function dt(t){const n=f;try{return f=null,t()}finally{f=n}}const Vn=-7169;function m(t,n){t.f=t.f&Vn|n}function $r(t){return sn().get(t)}function Kr(t,n){return sn().set(t,n),n}function sn(t){return o===null&&vt(),o.c??(o.c=new Map(Gn(o)||void 0))}function Gn(t){let n=t.p;for(;n!==null;){const r=n.c;if(r!==null)return r;n=n.p}return null}function zr(t,n=1){var r=Bn(t),e=n===1?r++:r--;return Tn(t,r),e}function Zr(t,n=!1,r){o={p:o,c:null,e:null,m:!1,s:t,x:null,l:null},V&&!n&&(o.l={s:null,u:null,r1:[],r2:_t(!1)})}function Jr(t){const n=o;if(n!==null){t!==void 0&&(n.x=t);const u=n.e;if(u!==null){var r=v,e=f;n.e=null;try{for(var s=0;s<u.length;s++){var l=u[s];tt(l.effect),X(l.reaction),Ht(l.fn)}}finally{tt(r),X(e)}}o=n.p,n.m=!0}return t||{}}function Qr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(yt in t)it(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&yt in r&&it(r)}}}function it(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{it(t[e],n)}catch{}const r=an(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=un(r);for(let s in e){const l=e[s].get;if(l)try{l.call(t)}catch{}}}}}function $n(t,n,r){if(t==null)return n(void 0),$;const e=dt(()=>t.subscribe(n,r));return e.unsubscribe?()=>e.unsubscribe():e}const O=[];function Wr(t,n=$){let r=null;const e=new Set;function s(a){if(Dt(t,a)&&(t=a,r)){const _=!O.length;for(const i of e)i[1](),O.push(i,t);if(_){for(let i=0;i<O.length;i+=2)O[i][0](O[i+1]);O.length=0}}}function l(a){s(a(t))}function u(a,_=$){const i=[a,_];return e.add(i),e.size===1&&(r=n(s,l)||$),a(t),()=>{e.delete(i),e.size===0&&r&&(r(),r=null)}}return{set:s,update:l,subscribe:u}}function Xr(t){let n;return $n(t,r=>n=r)(),n}function Kn(t){o===null&&vt(),V&&o.l!==null?zn(o).m.push(t):kn(()=>{const n=dt(t);if(typeof n=="function")return n})}function te(t){o===null&&vt(),Kn(()=>()=>dt(t))}function zn(t){var n=t.l;return n.u??(n.u={a:[],b:[],m:[]})}export{An as $,br as A,lt as B,In as C,k as D,cr as E,L as F,kr as G,wn as H,Rr as I,Sr as J,y as K,q as L,Ur as M,jr as N,On as O,Jn as P,Br as Q,v as R,fr as S,gn as T,_r as U,Gt as V,Pr as W,Cn as X,D as Y,ut as Z,Fr as _,Jr as a,yn as a0,f as a1,vr as a2,_t as a3,Zn as a4,pr as a5,R as a6,Kr as a7,te as a8,mr as a9,dr as aA,wr as aB,tr as aC,yr as aD,X as aE,fn as aF,En as aG,Or as aH,Rt as aI,Nt as aJ,lr as aK,Yr as aL,Wr as aM,zr as aN,rt as aO,Ar as aP,Dt as aQ,Vr as aR,sr as aS,un as aT,mt as aU,Tr as aa,er as ab,en as ac,Kn as ad,Gr as ae,xr as af,yt as ag,Wn as ah,Xn as ai,ar as aj,wt as ak,gr as al,or as am,an,xt as ao,Ht as ap,Dn as aq,ur as ar,rr as as,Er as at,It as au,A as av,B as aw,tt as ax,hr as ay,V as az,kn as b,o as c,dt as d,At as e,Qr as f,Bn as g,bn as h,ir as i,$r as j,Nr as k,Xr as l,mn as m,$ as n,Tn as o,Zr as p,Qn as q,nr as r,$n as s,Mr as t,Lr as u,Cr as v,Ir as w,Dr as x,qr as y,Hr as z};

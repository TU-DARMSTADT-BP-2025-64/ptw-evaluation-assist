import{a as c,b as x,t as m}from"../chunks/DCngfxLn.js";import"../chunks/C2CtP4Bd.js";import{p as C,a as D,k as A,g as u,o as g,A as P,y as f,v as _,w as T,x as b,$ as B,af as H}from"../chunks/CVfhQmyV.js";import{d as q,h as E}from"../chunks/DnoWaJoF.js";import{D as I,T as K,d as N,B as S,H as R,a as L,R as O}from"../chunks/C_ugDeei.js";import{i as J}from"../chunks/ynBCf6fS.js";import{p as M,a as W}from"../chunks/mPLQjtID.js";import{T as F}from"../chunks/Df8iNtN6.js";import{i as G,g as j}from"../chunks/a2mPvBUy.js";import{p as Q}from"../chunks/CT6tQU6f.js";const U=!1,pe=Object.freeze(Object.defineProperty({__proto__:null,prerender:U},Symbol.toStringTag,{value:"Module"}));var V=m('<span data-testid="dialog-title">Login Konfiguration</span>'),X=m('<!> <!> <div class="actions svelte-1ryihsq"><!> <!></div>',1);function Y(v,l){C(l,!0);let n=P(""),p=P(!1),o=M(l,"open",15);async function d(){(await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"admin",password:u(n)})})).ok?(o(!1),await G(),j("/configuration")):g(p,!0)}function h(){o(!1)}I(v,{class:"login-dialog",get open(){return o()},set open(a){o(a)},children:(a,y)=>{var e=X(),t=A(e);K(t,{children:(r,$)=>{var s=V();c(r,s)},$$slots:{default:!0}});var i=f(t,2);N(i,{children:(r,$)=>{F(r,{required:!0,get invalid(){return u(p)},style:"width: 100%;",onkeydown:s=>s.key==="Enter"&&d(),type:"password",label:"Password",get value(){return u(n)},set value(s){g(n,W(s))}})},$$slots:{default:!0}});var w=f(i,2),k=_(w);S(k,{class:"cancel-button",onclick:()=>h(),children:(r,$)=>{T();var s=x("Abbrechen");c(r,s)},$$slots:{default:!0}});var z=f(k,2);S(z,{onclick:()=>d(),children:(r,$)=>{T();var s=x("Login");c(r,s)},$$slots:{default:!0}}),b(w),c(a,e)},$$slots:{default:!0}}),D()}var Z=m('<meta name="description" content="PTW evaluation assist">'),ee=(v,l)=>v.key==="Enter"&&l(),te=m('<section style="max-width: 60%; width: 100%;" class="svelte-13tvhf6"><a href="/assistant"><div class="assistant-button card-btn mdc-elevation--z2 svelte-13tvhf6"><div class="icon svelte-13tvhf6"><i class="material-icons svelte-13tvhf6">manage_search</i></div> <div class="label svelte-13tvhf6">Neuen Befund starten</div></div></a> <div class="configuration-button card-btn mdc-elevation--z2 svelte-13tvhf6" role="button" tabindex="0"><div class="icon svelte-13tvhf6"><i class="material-icons svelte-13tvhf6">settings</i></div> <div class="label svelte-13tvhf6">Konfiguration</div></div> <!></section>');function fe(v,l){C(l,!1);let n=H(!1);R.Instance.setTitle("Startseite");function p(){Q.subscribe(e=>{var t;(t=e.data)!=null&&t.isLoggedIn?j("/configuration"):g(n,!0)})()}J();var o=te();E(e=>{var t=Z();B.title="Homepage",c(e,t)});var d=_(o),h=_(d);L(h,(e,t)=>{var i;return(i=O)==null?void 0:i(e,t)},()=>({surface:!0})),b(d);var a=f(d,2);a.__keydown=[ee,p],a.__click=p,L(a,(e,t)=>{var i;return(i=O)==null?void 0:i(e,t)},()=>({surface:!0}));var y=f(a,2);Y(y,{get open(){return u(n)},set open(e){g(n,e)},$$legacy:!0}),b(o),c(v,o),D()}q(["keydown","click"]);export{fe as component,pe as universal};

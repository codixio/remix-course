import{o as p,p as y,q as j,t as f,r as o,_ as S,n as e,N as a,O as w,M as g,L as N,S as k}from"./components-6IuxtyGk.js";/**
 * @remix-run/react v2.15.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let l="positions";function v({getKey:t,...c}){let{isSpaMode:u}=p(),r=y(),d=j();f({getKey:t,storageKey:l});let h=o.useMemo(()=>{if(!t)return null;let s=t(r,d);return s!==r.key?s:null},[]);if(u)return null;let x=((s,m)=>{if(!window.history.state||!window.history.state.key){let n=Math.random().toString(32).slice(2);window.history.replaceState({key:n},"")}try{let i=JSON.parse(sessionStorage.getItem(s)||"{}")[m||window.history.state.key];typeof i=="number"&&window.scrollTo(0,i)}catch(n){console.error(n),sessionStorage.removeItem(s)}}).toString();return o.createElement("script",S({},c,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${x})(${JSON.stringify(l)}, ${JSON.stringify(h)})`}}))}const M="/assets/main-5wgR5NVb.css";function L(){return e.jsx("nav",{id:"main-navigation",children:e.jsxs("ul",{children:[e.jsx("li",{className:"nav-item",children:e.jsx(a,{to:"/",children:"Home"})}),e.jsx("li",{className:"nav-item",children:e.jsx(a,{to:"/notes",children:"My Notes"})})]})})}const R=()=>[{charset:"utf-8",title:"Quick Notes App",viewport:"width=device-width,initial-scale=1"}];function _({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx(g,{}),e.jsx(N,{})]}),e.jsxs("body",{children:[e.jsx("header",{children:e.jsx(L,{})}),t,e.jsx(v,{}),e.jsx(k,{})]})]})}function b(){return e.jsx(w,{})}function E(){return[{rel:"stylesheet",href:M}]}export{_ as Layout,b as default,E as links,R as meta};

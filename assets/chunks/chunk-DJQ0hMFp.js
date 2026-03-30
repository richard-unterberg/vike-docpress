import{d as g,h as T,M as B,t as m,u as f,j as n,k as x,S as K,B as G,L as z,e as Y,f as J}from"./chunk-e0eyPgHx.js";import{f as L,i as Q,h as V,j as _,D as j,b as $,l as A,k as X,a as h,n as Z,o as ee,u as te,c as k,s as ne,q as se,t as oe}from"./chunk-8QS9tFYl.js";import{i as re}from"./chunk-a42iUr1N.js";function ae(e,t){const s=`URL ${e} passed to ${t}() is invalid`;return L(Q(e),s),e.startsWith(location.origin)&&(e=e.slice(location.origin.length)),L(e.startsWith("/")||V(e),s),e}/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=g("Bug",[["path",{d:"m8 2 1.88 1.88",key:"fmnt4t"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",key:"d7y7pr"}],["path",{d:"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",key:"xs1cw7"}],["path",{d:"M12 20v-9",key:"1qisl0"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5",key:"32zzws"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4",key:"4p0ekp"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4",key:"18gb23"}],["path",{d:"M22 13h-4",key:"1jl80f"}],["path",{d:"M17.2 17c2.1.1 3.8 1.9 3.8 4",key:"k3fwyw"}]]);/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=g("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=g("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=g("Languages",[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]]);/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=g("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=g("Sprout",[["path",{d:"M7 20h10",key:"e6iznv"}],["path",{d:"M10 20c5.5-2.5.8-6.4 3-10",key:"161w41"}],["path",{d:"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z",key:"9gtqwd"}],["path",{d:"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z",key:"bkxnd2"}]]);/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=g("TableOfContents",[["path",{d:"M16 12H3",key:"1a2rj7"}],["path",{d:"M16 18H3",key:"12xzn7"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M21 12h.01",key:"msek7k"}],["path",{d:"M21 18h.01",key:"1e8rq1"}],["path",{d:"M21 6h.01",key:"1koanj"}]]),me=e=>e.replace(/^\/+|\/+$/g,""),E=e=>{const t=e.data;if(!t||typeof t!="object")return null;const s=Reflect.get(t,"docSlug"),o=Reflect.get(t,"resolvedLocale"),r=Reflect.get(t,"headings"),a=Reflect.get(t,"config");return typeof s=="string"&&typeof o=="string"&&Array.isArray(r)&&a&&typeof a=="object"?t:null},R=e=>{const t=E(e);if(t)return t.docSlug;const s=_(e);return me(e.routeParams?.slug??"")||s.defaultSlug},I=e=>e.replace(/\s+/g," ").trim(),ge=e=>I(e).normalize("NFKD").toLowerCase().replace(/['"]/g,"").replace(/[^\p{Letter}\p{Number}\s-]/gu," ").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"")||"section",fe=()=>{const e=new Map;return t=>{const s=ge(t),o=e.get(s)??0;return e.set(s,o+1),o===0?s:`${s}-${o}`}},pe=e=>I(e),v=e=>e.replace(/^\/+|\/+$/g,""),F=e=>T[e],be=e=>{const t=v(e);return Object.values(T).find(s=>v(s.docPath)===t)},xe=(e,t)=>X(F(e).docPath,t),O=(e,t=j,s)=>{const o=$(t),r=F(e);return{docPath:v(r.docPath),title:r.navTitle?.[o]??r.title[o],href:A(xe(e,s),o),description:r.excerpt?.[o]??null}},ve=(e,t=j,s)=>{const{title:o,href:r}=O(e,t,s);return{title:o,href:r}},je=(e,t=j)=>{const s=be(e);if(!s)return null;const o=$(t);return{title:s.title[o],description:s.excerpt?.[o]??null}},U=[{id:"get-started",icon:N,groupKey:"getStarted",links:["quickStart","concepts","bestPractices",{dividerText:"Guides"},"serverIntegration","initialData","permissions","validation","fileUploads","errorHandling",{dividerText:"Learn More"},"whySchemaless","howItWorks"]},{id:"guides",icon:B,groupKey:"api",collapsible:{isDefaultOpen:!0},links:[{dividerText:"Server"},"apiTelefunc","throwAbort","getContext","shield","onBug",{dividerText:"Client"},"onAbort",{dividerText:"Config"},"telefuncUrl","disableNamingConvention","httpHeaders","fetch","telefuncFiles","root","configShield","log"]},{id:"maintainers",icon:N,groupKey:"maintainers",links:["getStarted"]}],ke=(e,t)=>U.flatMap(s=>s.links.flatMap(o=>typeof o=="object"&&"dividerText"in o?[]:[O(o,e,t)])),ye=(e,t)=>U.map(s=>({id:s.id,icon:s.icon,title:m(e,"sidebar",s.groupKey),collapsible:s.collapsible,links:s.links.map(o=>typeof o=="object"&&"dividerText"in o?{id:`divider-${o.dividerText}`,title:o.dividerText,isDivider:!0}:ve(o,e,t))})),we=e=>typeof e!="string"?e:e.split(/(`[^`]+`)/g).map((t,s)=>t.startsWith("`")&&t.endsWith("`")?n.jsx("code",{className:"font-medium",children:t.slice(1,-1)},s):n.jsx(h.Fragment,{children:t},s)),H=e=>{const t=e.direction==="previous";return n.jsx("a",{href:e.item.href,className:x("group rounded-box border border-base-muted-light bg-base-100 p-5 no-underline transition-colors hover:bg-base-200 hover:border-primary-muted-medium",t?"text-left":"text-right",e.className),children:n.jsxs("div",{className:"flex flex-col justify-between",children:[n.jsx("p",{className:"text-xl mb-2 font-semibold text-base-content",children:we(e.item.title)}),n.jsxs("div",{className:x("flex items-center gap-1 text-base-muted transition-colors group-hover:text-base-content",t?"justify-start":"justify-end"),children:[t&&n.jsx(ce,{className:"h-4 w-4"}),n.jsx("span",{children:e.label}),!t&&n.jsx(le,{className:"h-4 w-4"})]})]})})},Le=()=>{const e=f(),{locale:t}=e,s=_(e);if(!s.footer.pagination)return null;const o=R(e),r=ke(t,s),a=r.findIndex(u=>u.docPath===o);if(a<0)return null;const c=a>0?r[a-1]:null,i=a<r.length-1?r[a+1]:null;if(!c&&!i)return null;const l=m(t,"docs","previous"),d=m(t,"docs","next");return n.jsx("nav",{className:"mt-16 mb-10","aria-label":`${l} ${d}`,children:n.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[c&&n.jsx(H,{item:c,direction:"previous",label:l,className:"sm:col-start-1"}),i&&n.jsx(H,{item:i,direction:"next",label:d,className:x(!c&&"sm:col-start-2")})]})})};Z();async function Ne(e,t){ae(e,"navigate"),re();const{keepScrollPosition:s,overwriteLastHistoryEntry:o,pageContext:r}={};await ee({scrollTarget:{preserveScroll:s??!1},urlOriginal:e,overwriteLastHistoryEntry:o,pageContextInitClient:r})}const He=()=>{const{urlPathnameLocalized:e,urlPathname:t}=f(),s=te(i=>i.setLocalePreference),o=e??t,r=k(o),a=ne(o).locale,c=async i=>{const d=i.currentTarget.value,u=A(r,d);s(d),u!==o&&Ne(u)};return n.jsxs("label",{className:"select select-sm w-28",children:[n.jsx("span",{className:"floating-label",children:n.jsx(de,{className:"w-4 h-4"})}),n.jsx("select",{value:a,onChange:i=>{c(i)},"aria-label":"Switch language",children:se.map(i=>n.jsx("option",{value:i,children:oe[i]},i))})]})},Se=()=>{const{locale:e}=f();return n.jsxs("footer",{className:"mb-8 mt-12 text-sm border-t border-base-muted-light pt-10",children:[n.jsxs("div",{className:"mb-16 flex items-center gap-2",children:[n.jsxs("a",{href:"edit",className:"btn btn-sm btn-primary btn-soft",children:[n.jsx(ue,{className:"w-3 h-3"})," ",m(e,"docs","edit")]}),n.jsxs("a",{href:"edit",className:"btn btn-sm btn-primary btn-soft",children:[n.jsx(ie,{className:"w-3 h-3"})," ",m(e,"docs","reportIssue")]})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx(K,{}),n.jsxs("div",{className:"flex gap-2 items-center",children:[n.jsx(He,{}),n.jsx(G,{locale:e,showText:!1})]})]})]})},b=e=>"href"in e,Me=(e,t)=>{const s=a=>{const c=k(a);return c==="/"?"/":c.replace(/\/+$/g,"")},o=s(e),r=s(t);return r==="/"?o===r:o===r||o.startsWith(`${r}/`)},Pe=(e,t)=>{let s=null,o=-1;for(const r of e)for(const a of r.links??[]){if(!b(a)||!Me(t,a.href))continue;const c=k(a.href).length;c>o&&(s=a.href,o=c)}return s},y=e=>typeof e!="string"?e:e.split(/(`[^`]+`)/g).map((t,s)=>t.startsWith("`")&&t.endsWith("`")?n.jsx("code",{className:"text-sm!",children:t.slice(1,-1)},s):n.jsx(h.Fragment,{children:t},s)),p=(e,t)=>("href"in e?e.href:e.id)??`sidebar-item-${t}`,S=e=>n.jsx("li",{children:n.jsx("a",{href:e.href,className:x("text-base-muted hover:text-base-content justify-start hover:bg-base-200",e.activeHref===e.href&&"text-primary! font-semibold bg-base-200"),children:y(e.title)})}),M=e=>n.jsx("li",{className:"ml-3 mt-2 text-xs text-base-muted-medium pointer-events-none font-semibold border-b border-base-muted-light mb-2",children:n.jsx("span",{className:"-ml-3",children:y(e.title)})}),P=e=>{const t=e.icon;return n.jsxs(n.Fragment,{children:[t&&n.jsx(t,{className:"inline w-3 h-3"}),n.jsx("span",{className:"text-base-content font-semibold",children:y(e.title)})]})},Ce=e=>{const t=e.collapsible!==!1&&e.collapsible!==void 0,s=typeof e.collapsible=="object"?e.collapsible.isDefaultOpen??!0:!1,o=(e.links??[]).some(i=>b(i)&&i.href===e.activeHref),r=h.useRef(null),a=h.useRef(!1),c=h.useRef(o);return h.useEffect(()=>{if(!(!t||!r.current)){if(!a.current){a.current=!0,(s||o)&&(r.current.open=!0),c.current=o;return}o&&!c.current&&(r.current.open=!0),c.current=o}},[o,t,s]),n.jsxs("li",{className:"pb-4",children:[t?n.jsxs("details",{ref:r,children:[n.jsx("summary",{children:n.jsx(P,{icon:e.icon,title:e.title})}),n.jsx("ul",{children:e.links?.map((i,l)=>b(i)?n.jsx(S,{...i,activeHref:e.activeHref},p(i,l)):n.jsx(M,{title:i.title},p(i,l)))})]}):n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"pointer-events-none",children:n.jsx(P,{icon:e.icon,title:e.title})}),n.jsx("ul",{children:e.links?.map((i,l)=>b(i)?n.jsx(S,{...i,activeHref:e.activeHref},p(i,l)):n.jsx(M,{title:i.title},p(i,l)))})]}),e.showSeparator&&n.jsx("span",{className:"pointer-events-none absolute -bottom-1 block rounded-none w-full mx-auto mb-3"})]})},qe=e=>{const t=Pe(e.groups,e.currentPathname);return n.jsx("ul",{className:"menu w-full px-0 py-5 li:last-child:border-0",children:e.groups.map((s,o)=>n.jsx(Ce,{...s,activeHref:t,showSeparator:o!==e.groups.length-1},`sidebar-group-${s.id}`))})},De=()=>{const{locale:e,urlPathnameLocalized:t,urlPathname:s}=f(),o=ye(e);return n.jsx(qe,{groups:o,currentPathname:t??s})},Te=()=>n.jsxs("div",{className:"-ml-3 sticky top-16",children:[n.jsx("div",{className:"absolute h-full w-px right-0 top-0 bg-linear-to-t to-base-muted-light  via-base-muted-light  pointer-events-none z-1"}),n.jsx("div",{className:"pr-4 h-[calc(100svh-16*var(--spacing))] overflow-y-scroll overflow-x-hidden  relative z-10",children:n.jsx(De,{})})]}),ze=z.a`
  block
  border-l
  border-base-muted-light
  py-1.5
  text-sm
  text-base-muted
  transition-colors
  hover:border-primary-muted
  hover:text-base-content
  ${e=>e.$isNested?"pl-6":"pl-4"}
  ${e=>e.$isActive?"border-l-2 border-primary text-base-content font-semibold":""}
`,_e=()=>{try{return decodeURIComponent(window.location.hash)}catch{return window.location.hash}},$e=()=>{const e=document.querySelector("[data-doc-content]");return e instanceof HTMLElement?Array.from(e.querySelectorAll("h2, h3, h4")).filter(t=>t instanceof HTMLHeadingElement):[]},C=e=>{const t=document.querySelector("[data-doc-content]");if(!(t instanceof HTMLElement))return;const s=fe(),o=Array.from(t.querySelectorAll("h2, h3, h4")).map(r=>{const a=pe(r.textContent??"");if(!a)return null;const c=r.id||s(a);return r.id||(r.id=c),{depth:Number(r.tagName.slice(1)),id:c,title:a}}).filter(r=>r!==null);e(o)},q=e=>{const t=$e();if(t.length===0)return;const s=144;let o=t[0]?.id??"";for(const a of t)if(a.id){if(a.getBoundingClientRect().top<=s){o=a.id;continue}break}const r=t.at(-1);r?.id&&window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-8&&(o=r.id),e(o)},Ae=({headings:e})=>{const{locale:t}=f(),[s,o]=h.useState(""),[r,a]=h.useState(e),c=r.length>0?r:e,i=c.length>0;return h.useEffect(()=>{let l=0;const d=()=>{l||(l=window.requestAnimationFrame(()=>{l=0,q(o)}))},u=()=>{const w=_e().replace(/^#/,"");if(w!==""){o(w);return}d()};return u(),queueMicrotask(()=>{C(a),d()}),window.addEventListener("hashchange",u),window.addEventListener("scroll",d,{passive:!0}),window.addEventListener("resize",d),()=>{l&&window.cancelAnimationFrame(l),window.removeEventListener("hashchange",u),window.removeEventListener("scroll",d),window.removeEventListener("resize",d)}},[]),h.useEffect(()=>{typeof window>"u"||(a(e),o(""),queueMicrotask(()=>{C(a),q(o)}))},[e]),n.jsx("aside",{className:"hidden xl:block w-64 shrink-0",children:i&&n.jsxs("div",{className:"sticky top-16 pt-10 max-h-[calc(100svh-7rem)] overflow-y-auto pb-8",children:[n.jsxs("p",{className:"mb-4 text-xs font-semibold tracking-widest text-base-muted uppercase flex gap-2 items-center",children:[n.jsx(he,{className:"w-3 h-3"}),m(t,"docs","onThisPage")]}),n.jsx("nav",{"aria-label":m(t,"docs","onThisPage"),children:n.jsx("ul",{children:c.map((l,d)=>n.jsx("li",{children:n.jsx(ze,{href:`#${l.id}`,$isNested:l.depth>2,$isActive:s?s===l.id:d===0,"aria-current":s===l.id?"location":void 0,onClick:()=>o(l.id),children:l.title})},l.id))})})]})})},D={title:"telefunc",description:"telefunc documentation"},Ee=()=>({title:D.title,description:D.description}),W=e=>{const t=R(e);return je(t,e.locale)??Ee()},Re=z.section`
  min-h-[calc(100svh-92*var(--spacing))]
  prose 
  prose-neutral
  max-w-none
  dark:prose-invert
  prose-a:text-primary

  prose-pre:bg-base-200!

  prose-code:py-0!
  prose-code:px-1!

  prose-code:rounded!
  prose-code:dark:inset-shadow-2xs

  prose-code:bg-primary/5!
  prose-code:border-primary/15!

  prose-code:dark:bg-primary/10!
  prose-code:dark:border-primary/20!

  prose-p:leading-[200%]
  prose-li:leading-[200%]

  prose-p:after:content-none
  prose-p:before:content-none
  prose-blockquote:not-italic
  prose-li:my-1
  [&_blockquote_p]:mt-0
  [&_blockquote_p]:mb-2
  [&_blockquote_ul]:pl-4
  [&_blockquote_ul]:mt-2
  [&_blockquote_li]:mt-2
  [&_blockquote_blockquote]:mt-2
  [&_blockquote_blockquote]:mb-0
  [&_blockquote_blockquote]:bg-base-300/40
  [&_blockquote_blockquote]:pt-2
  [&_blockquote_blockquote]:pb-1
`,Ie=({children:e})=>{const t=f(),{locale:s,pageId:o,is404:r,errorWhileRendering:a}=t,c=r||a,i=c?null:E(t),l=!c&&(i?.config.tableOfContents??!0),d=`${o}:${i?.docSlug??"docs-error"}:${s}`,u=W(t)?.title??"";return n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"absolute w-full h-full top-0 left-0 overflow-hidden",children:n.jsx("div",{className:"w-500 h-200 absolute top-16 -right-100 z-0 opacity-40 dark:opacity-70",children:n.jsx("img",{src:`${Y}decorators/dot.png`,alt:"",width:400,height:400,className:"w-full h-full object-fill absolute inset-0"})})}),n.jsx(J,{children:n.jsxs("div",{className:"lg:flex mx-auto gap-10 xl:gap-14",children:[n.jsx("div",{className:"basis-80 shrink-0 relative hidden lg:block",children:n.jsx(Te,{})}),n.jsxs("div",{className:"mt-10 flex-1 min-w-0 relative basis-auto shrink",children:[n.jsxs(Re,{className:"flex-1 z-1 relative","data-doc-content":!0,children:[n.jsx("h1",{children:u}),e]}),n.jsx(Le,{}),n.jsx(Se,{})]}),l&&n.jsx(Ae,{headings:i?.headings??[]},d)]})})]})},Be=Object.freeze(Object.defineProperty({__proto__:null,default:Ie},Symbol.toStringTag,{value:"Module"})),Fe=e=>`${W(e)?.title??""} | telefunc`,Ke=Object.freeze(Object.defineProperty({__proto__:null,default:Fe},Symbol.toStringTag,{value:"Module"}));export{Be as a,Ke as i};

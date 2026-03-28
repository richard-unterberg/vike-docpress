import{a as f,b as v,r as M,u as p,j as t,c as j,d as u,k as N,e as _,L as w,n as q,f as P,h as L}from"./chunk-CgUQLcTm.js";import{c as h,t as m,f as z,g as C,S as $,M as E,e as T,L as A}from"./chunk-bnKPzCGt.js";/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=h("Bug",[["path",{d:"m8 2 1.88 1.88",key:"fmnt4t"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",key:"d7y7pr"}],["path",{d:"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",key:"xs1cw7"}],["path",{d:"M12 20v-9",key:"1qisl0"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5",key:"32zzws"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4",key:"4p0ekp"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4",key:"18gb23"}],["path",{d:"M22 13h-4",key:"1jl80f"}],["path",{d:"M17.2 17c2.1.1 3.8 1.9 3.8 4",key:"k3fwyw"}]]);/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=h("Compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=h("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=h("Sprout",[["path",{d:"M7 20h10",key:"e6iznv"}],["path",{d:"M10 20c5.5-2.5.8-6.4 3-10",key:"161w41"}],["path",{d:"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z",key:"9gtqwd"}],["path",{d:"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z",key:"bkxnd2"}]]);/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=h("TableOfContents",[["path",{d:"M16 12H3",key:"1a2rj7"}],["path",{d:"M16 18H3",key:"12xzn7"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M21 12h.01",key:"msek7k"}],["path",{d:"M21 18h.01",key:"1e8rq1"}],["path",{d:"M21 6h.01",key:"1koanj"}]]),R=async e=>{const s=f(e),a=(e.routeParams.slug?.replace(/^\/+|\/+$/g,"")??"")||s.defaultSlug;if(!v(a,e.locale,s)?.Page)throw M(404)},he=Object.freeze(Object.defineProperty({__proto__:null,default:R},Symbol.toStringTag,{value:"Module"})),W=()=>{const{locale:e}=p();return t.jsxs("footer",{className:"mb-8 mt-12 text-sm border-t border-base-muted-light pt-10",children:[t.jsxs("div",{className:"mb-16 flex items-center gap-2",children:[t.jsxs("a",{href:"edit",className:"btn btn-sm btn-primary btn-soft",children:[t.jsx(D,{className:"w-3 h-3"})," ",m(e,"docs","edit")]}),t.jsxs("a",{href:"edit",className:"btn btn-sm btn-primary btn-soft",children:[t.jsx(O,{className:"w-3 h-3"})," ",m(e,"docs","reportIssue")]})]}),t.jsxs("div",{className:"flex justify-between items-center",children:[t.jsx(z,{}),t.jsxs("div",{className:"flex gap-2 items-center",children:[t.jsx(C,{}),t.jsx("p",{children:t.jsx("a",{href:"unterberg.dev",className:"text-base-content",children:t.jsx($,{className:"w-7 h-7"})})})]})]})]})},B=(e,s)=>{const n=r=>{const i=j(r);return i==="/"?"/":i.replace(/\/+$/g,"")},o=n(e),a=n(s);return a==="/"?o===a:o===a||o.startsWith(`${a}/`)},G=(e,s)=>{let n=null,o=-1;for(const a of e)for(const r of a.links??[]){if(!B(s,r.href))continue;const i=j(r.href).length;i>o&&(n=r.href,o=i)}return n},S=e=>typeof e!="string"?e:e.split(/(`[^`]+`)/g).map((s,n)=>s.startsWith("`")&&s.endsWith("`")?t.jsx("code",{className:"text-sm!",children:s.slice(1,-1)},n):t.jsx(u.Fragment,{children:s},n)),U=(e,s)=>`${e.href}::${s}`,Y=e=>t.jsx("li",{children:t.jsx("a",{href:e.href,className:N("text-base-muted hover:text-base-content justify-start hover:bg-base-200",e.activeHref===e.href&&"text-primary! font-semibold bg-base-200"),children:S(e.title)})}),J=e=>{const s=e.icon;return t.jsxs("li",{className:"pb-4",children:[t.jsxs("span",{className:"pointer-events-none",children:[s&&t.jsx(s,{className:"inline w-3 h-3"}),t.jsx("span",{className:"text-base-content font-semibold",children:S(e.title)})]}),t.jsx("ul",{children:e.links?.map((n,o)=>t.jsx(Y,{...n,activeHref:e.activeHref},U(n,o)))}),e.showSeparator&&t.jsx("span",{className:"pointer-events-none absolute -bottom-1 border-b border-base-muted-light block rounded-none w-full mx-auto mb-3"})]})},Q=e=>{const s=G(e.groups,e.currentPathname);return t.jsx("ul",{className:"menu w-full px-0 py-5 li:last-child:border-0",children:e.groups.map((n,o)=>t.jsx(J,{...n,activeHref:s,showSeparator:o!==e.groups.length-1},`sidebar-group-${n.id}`))})},V=[{id:"get-started",icon:F,titleKey:"getStarted",links:["getStarted","designSystem"]},{id:"components",icon:I,titleKey:"components",links:["components","alert"]},{id:"guides",icon:E,titleKey:"guides",links:["tailwind","daisyUiTestRange"]}],X=e=>V.map(s=>({id:s.id,icon:s.icon,title:m(e,"sidebar",s.titleKey),links:s.links.map(n=>_(n,e))})),Z=()=>{const{locale:e,urlPathnameLocalized:s,urlPathname:n}=p(),o=X(e);return t.jsx(Q,{groups:o,currentPathname:s??n})},ee=()=>t.jsxs("div",{className:"-ml-3 sticky top-16",children:[t.jsx("div",{className:"absolute h-full w-px right-0 top-0 bg-linear-to-t to-base-muted-light  via-base-muted-light  pointer-events-none z-1"}),t.jsx("div",{className:"pr-4 h-[calc(100svh-16*var(--spacing))] overflow-y-scroll overflow-x-hidden  relative z-10",children:t.jsx(Z,{})})]}),te=w.a`
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
`,se=()=>{try{return decodeURIComponent(window.location.hash)}catch{return window.location.hash}},ne=()=>{const e=document.querySelector("[data-doc-content]");return e instanceof HTMLElement?Array.from(e.querySelectorAll("h2, h3, h4")).filter(s=>s instanceof HTMLHeadingElement):[]},x=e=>{const s=document.querySelector("[data-doc-content]");if(!(s instanceof HTMLElement))return;const n=P(),o=Array.from(s.querySelectorAll("h2, h3, h4")).map(a=>{const r=q(a.textContent??"");if(!r)return null;const i=a.id||n(r);return a.id||(a.id=i),{depth:Number(a.tagName.slice(1)),id:i,title:r}}).filter(a=>a!==null);e(o)},k=e=>{const s=ne();if(s.length===0)return;const n=144;let o=s[0]?.id??"";for(const r of s)if(r.id){if(r.getBoundingClientRect().top<=n){o=r.id;continue}break}const a=s.at(-1);a?.id&&window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-8&&(o=a.id),e(o)},oe=({headings:e})=>{const{locale:s}=p(),[n,o]=u.useState(""),[a,r]=u.useState(e),i=a.length>0?a:e,b=i.length>0;return u.useEffect(()=>{let c=0;const l=()=>{c||(c=window.requestAnimationFrame(()=>{c=0,k(o)}))},d=()=>{const g=se().replace(/^#/,"");if(g!==""){o(g);return}l()};return d(),queueMicrotask(()=>{x(r),l()}),window.addEventListener("hashchange",d),window.addEventListener("scroll",l,{passive:!0}),window.addEventListener("resize",l),()=>{c&&window.cancelAnimationFrame(c),window.removeEventListener("hashchange",d),window.removeEventListener("scroll",l),window.removeEventListener("resize",l)}},[]),u.useEffect(()=>{typeof window>"u"||(r(e),o(""),queueMicrotask(()=>{x(r),k(o)}))},[e]),t.jsx("aside",{className:"hidden xl:block w-64 shrink-0",children:b&&t.jsxs("div",{className:"sticky top-16 pt-10 max-h-[calc(100svh-7rem)] overflow-y-auto pb-8",children:[t.jsxs("p",{className:"mb-4 text-xs font-semibold tracking-widest text-base-muted uppercase flex gap-2 items-center",children:[t.jsx(K,{className:"w-3 h-3"}),m(s,"docs","onThisPage")]}),t.jsx("nav",{"aria-label":m(s,"docs","onThisPage"),children:t.jsx("ul",{children:i.map((c,l)=>t.jsx("li",{children:t.jsx(te,{href:`#${c.id}`,$isNested:c.depth>2,$isActive:n?n===c.id:l===0,"aria-current":n===c.id?"location":void 0,onClick:()=>o(c.id),children:c.title})},c.id))})})]})})},ae=w.section`
  min-h-[calc(100svh-92*var(--spacing))]
  prose 
  prose-neutral
  max-w-none
  dark:prose-invert
  prose-a:text-primary

  prose-pre:bg-base-200!

  prose-code:rounded!
  prose-code:dark:inset-shadow-2xs

  prose-code:bg-primary/5!
  prose-code:border-primary/15!

  prose-code:dark:bg-primary/10!
  prose-code:dark:border-primary/20!

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
`,re=({children:e})=>{const s=p(),{locale:n,pageId:o,is404:a,errorWhileRendering:r}=s,i=f(s),c=(s.routeParams.slug??"").replace(/^\/+|\/+$/g,"")||i.defaultSlug,l=a||r,d=l?null:v(c,n,i),g=!l&&(d?.config.tableOfContents??!0),H=`${o}:${c}:${n}`;return t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"absolute w-full h-full top-0 left-0 overflow-hidden",children:t.jsx("div",{className:"w-500 h-200 absolute top-16 -right-100 z-0 opacity-40 dark:opacity-70",children:t.jsx("img",{src:`${T}decorators/dot.png`,alt:"",width:400,height:400,className:"w-full h-full object-fill absolute inset-0"})})}),t.jsx(A,{children:t.jsxs("div",{className:"lg:flex mx-auto gap-10 xl:gap-14",children:[t.jsx("div",{className:"basis-80 shrink-0 relative hidden lg:block",children:t.jsx(ee,{})}),t.jsxs("div",{className:"mt-10 flex-1 min-w-0 relative basis-auto shrink",children:[t.jsx(ae,{className:"flex-1 z-1 relative","data-doc-content":!0,children:e}),t.jsx(W,{})]}),g&&t.jsx(oe,{headings:d?.headings??[]},H)]})})]})},ge=Object.freeze(Object.defineProperty({__proto__:null,default:re},Symbol.toStringTag,{value:"Module"})),y={title:"mdex",description:"mdex docs starter kit"},ce=e=>e.replace(/^\/+|\/+$/g,""),ie=()=>({title:y.title,description:y.description}),le=e=>{const s=e,n=f(s),a=ce(s.routeParams?.slug??"")||n.defaultSlug;return L(a,s.locale)??ie()};function de(e){return`${le(e)?.title??""} | mdex`}const pe=Object.freeze(Object.defineProperty({__proto__:null,default:de},Symbol.toStringTag,{value:"Module"}));export{ge as a,he as b,pe as i};

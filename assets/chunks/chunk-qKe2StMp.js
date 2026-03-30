import{L as i,j as s,d as j,u as h,k as C}from"./chunk-e0eyPgHx.js";import{a as c,v as y,l as v}from"./chunk-8QS9tFYl.js";const x=e=>typeof e=="string"&&e.trim()?e.trim():null,u=e=>{const t=x(e["data-language-label"]);if(t)return t;const o=x(e["data-language"]);return o?o.toUpperCase():"Code"},w=(e,t)=>typeof e.key=="string"||typeof e.key=="number"?String(e.key):`block-${t}`,B=e=>typeof e=="string"?e.trim()==="":!1,L=e=>c.isValidElement(e)&&e.type===m,E=({label:e,children:t})=>s.jsxs(f,{"data-code-block-frame":"",children:[s.jsx(b,{"data-code-block-header":"",children:s.jsx(p,{children:e})}),t]}),m=({children:e,className:t,grouped:o=!1,...a})=>{const l=u(a),r=s.jsx(M,{"data-code-block-content":"",...a,className:["",t].filter(Boolean).join(" "),children:e});return o?r:s.jsx(E,{label:l,children:r})},T=({children:e})=>{const t=c.useId(),o=c.Children.toArray(e).reduce((n,d,g)=>L(d)?(n.push({id:w(d,g),label:u(d.props),node:d}),n):(B(d),n),[]),[a,l]=c.useState(o[0]?.id??""),r=o.find(n=>n.id===a)??o[0];return r?s.jsxs(f,{"data-code-block-frame":"",children:[o.length>1&&s.jsxs(b,{"data-code-block-header":"",children:[s.jsx(p,{children:r.label}),s.jsx("label",{className:"select select-xs w-fit min-w-28",children:s.jsx("select",{id:t,className:"",value:r.id,onChange:n=>l(n.target.value),children:o.map(n=>s.jsx("option",{value:n.id,children:n.label},n.id))})})]}),c.cloneElement(r.node,{grouped:!0,key:r.id})]}):s.jsx(s.Fragment,{children:e})},f=i.div`
  not-prose 
  relative
  mb-6
  min-w-0
  overflow-auto
  flex
  flex-col
  border
  border-base-muted-light
  rounded-box
`,b=i.div`
  flex
  inset-x-4
  top-0
  absolute
  min-h-10
  items-center
  justify-between 
  border-b-1
  border-base-muted-light
`,p=i.div`
  text-xs 
  font-semibold 
  font-mono
  text-base-muted
`,M=i.pre`
  flex-1 w-full max-w-full 
  min-w-0 overflow-auto 
  rounded-box p-4 pt-14 text-sm
`;/**
 * @license lucide-react v0.443.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=j("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]),N=(e,t)=>typeof e!="string"||!e.startsWith("/")?e:v(e,t),H=({href:e,children:t,className:o,...a})=>{const{locale:l}=h(),r=y(e??"");return s.jsxs("a",{href:N(e,l),className:C(o,"inline-flex gap-1 items-center"),...a,children:[t,r&&s.jsx(I,{className:"w-3 h-3"})]})},k=e=>e==="a"?H:e==="pre"?m:e,z=(e,t,o)=>s.jsx(k(e),t,o),F=(e,t,o)=>s.jsxs(k(e),t,o);export{T as C,H as L,F as a,z as j};

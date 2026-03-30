import{j as l,u as s,i as d,a as c,b as h,c as p,o as u}from"../chunks/chunk-e0eyPgHx.js";import{j as t,a}from"../chunks/chunk-qKe2StMp.js";import{A as i}from"../chunks/chunk-CSyoB8e_.js";import"../chunks/chunk-8QS9tFYl.js";import"../chunks/chunk-CqPJ7OJI.js";import{i as f,a as m}from"../chunks/chunk-DJQ0hMFp.js";/* empty css                      */import"../chunks/chunk-a42iUr1N.js";function n(o){const e={a:"a",blockquote:"blockquote",code:"code",em:"em",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...o.components};return a(l.Fragment,{children:[t(e.h2,{id:"schemaless-vs-schema-full",className:"scroll-mt-24",children:"Schemaless vs schema-full"}),`
`,t(e.p,{children:"Comparing RPC to GraphQL or REST is a bit like comparing apples to oranges. They each make trade-offs to achieve different goals."}),`
`,t(e.p,{children:`| RPC                                       | REST + GraphQL               |
| ----------------------------------------- | ---------------------------- |
| Full-stack: client calls server functions | Separate front- and back-end |
| Request tailored to caller's needs        | Consumer-agnostic            |`}),`
`,t(e.p,{children:"REST and GraphQL establish stable (but rigid) long-term data contracts. This makes it easier for third-parties to predictably consume your API, but gets in the way of prototyping, and forces the server to respond generically to clients."}),`
`,t(i,{children:a(e.p,{children:["A schema-full approach works best if you ",t(e.strong,{children:"must fulfill a maximum number of data requirements"}),", or want to allow other apps to be built on your data."]})}),`
`,t(e.p,{children:"RPC creates unique data contracts between specific pieces of UI and the server-side logic they call. This  allows components to invoke server-side logic as if it was local."}),`
`,t(e.h2,{id:"rpc",className:"scroll-mt-24",children:"RPC"}),`
`,a(e.blockquote,{children:[`
`,a(e.p,{children:["A ",t(e.a,{href:"https://en.wikipedia.org/wiki/Remote_procedure_call",children:"remote procedure call"})," (RPC) is when a [...] computer programmer writes essentially the same code whether the subroutine is local to the executing program, or remote."]}),`
`]}),`
`,t(e.p,{children:"RPC is a pattern for calling a remote function as if it were colocated with the client. No adapters or injection needed."}),`
`,a(e.ol,{children:[`
`,t(e.li,{children:"Create named Telefunctions to call the database or do other backend work."}),`
`,a(e.li,{children:["Import and call the function from your frontend, passing any required arguments (e.g., ",t(e.code,{children:"await onNewTodo(text)"}),")."]}),`
`,t(e.li,{children:"Telefunc creates a lightweight HTTP client to call your Telefunction, which returns only what the caller needs."}),`
`]}),`
`,t(i,{children:a(e.p,{children:["The term RPC is often used loosely to denote RPC-like approaches, like creating JSON endpoints. ",t(e.em,{children:"RPC-like describes an API that is schemaless — in contrast to RESTful and GraphQL APIs that always have a schema."})]})}),`
`,t(e.h2,{id:"rpc-vs-graphql-rest",className:"scroll-mt-24",children:"RPC vs GraphQL/REST"}),`
`,a(e.blockquote,{children:[`
`,t(e.p,{children:"Premature optimization is the root of all evil."}),`
`,a(e.ul,{children:[`
`,t(e.li,{children:t(e.em,{children:"Turing Award winner, Donal Knuth"})}),`
`]}),`
`]}),`
`,t(e.p,{children:"In most cases you can start with RPC, and switch to REST or GraphQL as needed."}),`
`,a(e.ul,{children:[`
`,t(e.li,{children:"RPC enables you to stay lean, iterating faster and pivoting more flexibly."}),`
`,t(e.li,{children:"Many apps will never need a public (or schema-full) API."}),`
`,t(e.li,{children:"RPC functions are just functions; migrating to REST or GraphQL is fairly straightforward."}),`
`]}),`
`,t(e.p,{children:"There's a simple litmus test for whether RPC is the right solution:"}),`
`,a(e.ul,{children:[`
`,t(e.li,{children:"If your goal is to enable third party developers to access your data, then you need a generic API and you'll have to use REST or GraphQL"}),`
`,t(e.li,{children:"If your goal is to seamlessly add data and interactivity to a front-end, then RPC can improve DX and enable security and performance optimizations."}),`
`]})]})}function y(o={}){const{wrapper:e}=o.components||{};return e?t(e,{...o,children:t(n,{...o})}):n(o)}const g=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),T={en:g},v=()=>{const e=s().data,r=T[e.resolvedLocale]?.default;if(!r)throw new Error('Missing generated doc module for "why-schemaless".');return l.jsx(r,{})},w=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"})),k={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:{server:!0}}},guardEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:u}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/(docs)/(generated)/why-schemaless/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:w}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/(docs)/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:m},{type:"plus-file",exportValues:p}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/(docs)/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:f}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+lang.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:h}},Wrapper:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/+Wrapper.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:c}]},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:d}}};export{k as configValuesSerialized};

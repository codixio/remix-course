import{w as r,x as l,n as e,y as o}from"./components-6IuxtyGk.js";const c="/assets/NewNote-C_0hQBxx.css";function a(){const t=r(),s=l(),n=s.state==="submitting";return e.jsxs(s.Form,{method:"post",id:"note-form",action:"/notes",children:[(t==null?void 0:t.message)&&e.jsx("p",{children:t.message}),e.jsxs("p",{children:[e.jsx("label",{htmlFor:"title",children:"Title"}),e.jsx("input",{type:"text",id:"title",name:"title",required:!0})]}),e.jsxs("p",{children:[e.jsx("label",{htmlFor:"content",children:"Content"}),e.jsx("textarea",{id:"content",name:"content",rows:5,required:!0})]}),e.jsx("div",{className:"form-actions",children:e.jsx("button",{type:"submit",disabled:n,children:n?"Adding...":"Add Note"})})]})}function d(){return[{rel:"stylesheet",href:c}]}const h="/assets/NoteList-COrfCza5.css";i.defaultProps={notes_list:[]};function i({notes_list:t}){return e.jsx("ul",{id:"note-list",children:t.map((s,n)=>e.jsx("li",{className:"note",children:e.jsxs("article",{children:[e.jsxs("header",{children:[e.jsxs("ul",{className:"note-meta",children:[e.jsxs("li",{children:["#",n+1]}),e.jsx("li",{children:e.jsx("time",{dateTime:s.id,children:new Date(s.id).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})})})]}),e.jsx("h2",{children:s.title})]}),e.jsx("p",{children:s.content})]})},s.id))})}function u(){return[{rel:"stylesheet",href:h}]}function m(){const t=o();return e.jsxs("main",{children:[e.jsx(a,{}),e.jsx(i,{notes_list:t})]})}function j(){return[...d(),...u()]}export{m as default,j as links};

import{u as k,i,J as c}from"./chunks/theme.CCs3Kc9h.js";import{q as e,a as F,y as n,z as h,ab as l,o as u,A as p}from"./chunks/framework.DdHOtYce.js";const C=l("",7),m=l("",4),B=l("",4),_=l("",4),A=l("",1),f=JSON.parse('{"title":"Prompt 输入确认框","description":"","frontmatter":{},"headers":[],"relativePath":"pages/prompt.md","filePath":"pages/prompt.md"}'),q={name:"pages/prompt.md"},P=Object.assign(q,{setup(D){function r(){k({title:"输入确认",placeholder:"请输入您的姓名"}).then(s=>{i({message:`Your name is: ${s}`,type:"success"})},()=>i({message:"Cancelled!",type:"warning"}))}function E(s){k({title:"输入确认",placeholder:"请输入内容",inputType:s}).then(a=>{i({message:`Value is: ${a}`,type:"success"})},()=>i({message:"Cancelled!",type:"warning"}))}function d(){k({title:"输入确认",placeholder:"请输入数字",validator:s=>/^[0-9]+$/.test(s)}).then(s=>{i({message:`Value is: ${s}`,type:"success"})},()=>i({message:"Cancelled!",type:"warning"}))}function g(){k({title:"输入确认",placeholder:"请输入内容",beforeConfirm:async s=>(await c({content:"确认提交吗？"}),s.toUpperCase())}).then(s=>{i({message:`Value is: ${s}`,type:"success"})},()=>i({message:"Cancelled!",type:"warning"}))}return(s,a)=>{const t=e("nue-button"),y=e("nue-div");return u(),F("div",null,[C,n(t,{onClick:r},{default:h(()=>[p("创建一个输入确认框")]),_:1}),m,n(y,null,{default:h(()=>[n(t,{onClick:a[0]||(a[0]=o=>E("password"))},{default:h(()=>[p(" 创建一个密码类型的输入确认框 ")]),_:1}),n(t,{onClick:a[1]||(a[1]=o=>E("number"))},{default:h(()=>[p(" 创建一个数字类型的输入确认框 ")]),_:1})]),_:1}),B,n(t,{onClick:d},{default:h(()=>[p(" 创建一个带有验证器的输入确认框 ")]),_:1}),_,n(t,{onClick:g},{default:h(()=>[p(" 创建一个带有确认前回调函数的输入确认框 ")]),_:1}),A])}}});export{f as __pageData,P as default};

import{H as e}from"./chunks/theme.C_k8YvUM.js";import{U as g,a as o,u as i,A as a,aa as p,o as c,B as t}from"./chunks/framework.CYRV2POx.js";const u=p("",5),F=p("",3),C=p("",4),_=p("",5),A=p("",1),v=JSON.parse('{"title":"Message 信息提示","description":"","frontmatter":{},"headers":[],"relativePath":"pages/message.md","filePath":"pages/message.md"}'),B={name:"pages/message.md"},q=Object.assign(B,{setup(m){function r(){e({message:"创建Message成功"})}function l(k){e({message:"创建Message成功",type:k})}function y(k){e({message:"创建Message成功",icon:k})}function E(k){e({message:"创建Message成功",duration:k})}return(k,s)=>{const n=g("nue-button"),d=g("nue-div");return c(),o("div",null,[u,i(n,{onClick:r},{default:a(()=>[t("创建一个消息提示")]),_:1}),F,i(d,null,{default:a(()=>[i(n,{onClick:s[0]||(s[0]=h=>l("success"))},{default:a(()=>[t("成功")]),_:1}),i(n,{onClick:s[1]||(s[1]=h=>l("info"))},{default:a(()=>[t("信息")]),_:1}),i(n,{onClick:s[2]||(s[2]=h=>l("warning"))},{default:a(()=>[t("警告")]),_:1}),i(n,{onClick:s[3]||(s[3]=h=>l("error"))},{default:a(()=>[t("错误")]),_:1}),i(n,{onClick:s[4]||(s[4]=h=>l("log"))},{default:a(()=>[t("日志")]),_:1})]),_:1}),C,i(n,{onClick:s[5]||(s[5]=h=>y("icon-completed"))},{default:a(()=>[t(" 创建一个带图标的消息提示 ")]),_:1}),_,i(d,null,{default:a(()=>[i(n,{onClick:s[6]||(s[6]=h=>E(5e3))},{default:a(()=>[t(" 创建一个持续时间为 5 秒的消息提示 ")]),_:1}),i(n,{onClick:s[7]||(s[7]=h=>E(0))},{default:a(()=>[t(" 创建一个需要手动关闭的消息提示 ")]),_:1})]),_:1}),A])}}});export{v as __pageData,q as default};
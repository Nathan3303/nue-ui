import{i as l}from"./chunks/theme.CCs3Kc9h.js";import{q as g,a as c,y as i,z as a,ab as p,o as u,A as t,u as r}from"./chunks/framework.DdHOtYce.js";const F=p("",5),C=p("",3),_=p("",3),B=p("",4),A=p("",5),D=p("",1),f=JSON.parse('{"title":"Message 信息提示","description":"","frontmatter":{},"headers":[],"relativePath":"pages/message.md","filePath":"pages/message.md"}'),m={name:"pages/message.md"},T=Object.assign(m,{setup(b){function y(){l({message:"创建Message成功"})}function e(k){l({message:"创建Message成功",type:k})}function o(k){l({message:"创建Message成功",icon:k})}function d(k){l({message:"创建Message成功",duration:k})}return(k,s)=>{const n=g("nue-button"),E=g("nue-div");return u(),c("div",null,[F,i(n,{onClick:y},{default:a(()=>[t("创建一个消息提示")]),_:1}),C,i(E,null,{default:a(()=>[i(n,{onClick:s[0]||(s[0]=h=>e("success"))},{default:a(()=>[t("成功")]),_:1}),i(n,{onClick:s[1]||(s[1]=h=>e("info"))},{default:a(()=>[t("信息")]),_:1}),i(n,{onClick:s[2]||(s[2]=h=>e("warning"))},{default:a(()=>[t("警告")]),_:1}),i(n,{onClick:s[3]||(s[3]=h=>e("error"))},{default:a(()=>[t("错误")]),_:1}),i(n,{onClick:s[4]||(s[4]=h=>e("log"))},{default:a(()=>[t("日志")]),_:1})]),_:1}),_,i(E,null,{default:a(()=>[i(n,{onClick:s[5]||(s[5]=h=>r(l).success("成功",5e3,"success"))},{default:a(()=>[t(" 成功 ")]),_:1}),i(n,{onClick:s[6]||(s[6]=h=>r(l).error("错误",5e3,"clear"))},{default:a(()=>[t(" 错误 ")]),_:1})]),_:1}),B,i(n,{onClick:s[7]||(s[7]=h=>o("completed"))},{default:a(()=>[t(" 创建一个带图标的消息提示 ")]),_:1}),A,i(E,null,{default:a(()=>[i(n,{onClick:s[8]||(s[8]=h=>d(5e3))},{default:a(()=>[t(" 创建一个持续时间为 5 秒的消息提示 ")]),_:1}),i(n,{onClick:s[9]||(s[9]=h=>d(0))},{default:a(()=>[t(" 创建一个需要手动关闭的消息提示 ")]),_:1})]),_:1}),D])}}});export{f as __pageData,T as default};

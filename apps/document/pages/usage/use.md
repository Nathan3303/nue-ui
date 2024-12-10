# 使用

## 完整导入

通过完整导入的方式可以在输入两到三条语句后使用 NueUI 中的所有组件。

::: warning 关于构建后的包大小
完整导入将导入所有组件。如果对于构建后产物的大小有要求，请使用手动导入的方式。若所使用的构建工具拥有树摇功能，可以尝试在构建配置中开启，以减小构建产物的体积。
:::

```js
// main.ts
import { createApp } from 'vue';

// 引入组件库
import NueUI from 'nue-ui';
// 引入全量组件样式
import 'nue-ui/dist/index.css';

const app = createApp(App);
// 载入组件库
app.use(NueUI);
app.mount('#app');
```

## Volar 支持

::: tip 提示
目前版本的 NueUI 并未对 Volar 做出支持，该功能将在未来的版本中添加。
:::

## 开始使用

在完成上述的相关引入操作后，就可以在模板中使用 NueUI 中的组件了。对于组件的使用方法，每个组件都拥有单独的文档页，可以点击左侧菜单栏进行查看。

当然，点击下方的下一篇按钮，就是 Button 按钮组件的文档页了。
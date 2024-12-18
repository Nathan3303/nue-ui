# 使用

## 完整导入

通过完整导入的方式可以在输入两到三条语句后使用 NueUI 中的所有组件。

::: warning 关于构建后的包大小
完整导入将导入所有组件。如果对于构建后产物的大小有要求，请使用手动导入的方式。
:::

```typescript {5,7,11}
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

### Volar 支持 <Badge type="tip" text="^0.7.2" />

如果您使用 Volar，请在 tsconfig.json 中通过 compilerOptions.type 指定全局组件类型。

```json5 {5-7}
{
    // ...
    "compilerOptions": {
        // ...
        "types": [
            "nue-ui/dist/global"
        ]
    },
    // ...
}
```

## 手动导入

通过手动导入的方式可以按需载入组件，从而减少构建后产物的体积。

```typescript
import { NueButton, NueText } from 'nue-ui';
```

## 开始使用

在完成上述的相关引入操作后，就可以在模板中使用 NueUI 中的组件了。对于组件的使用方法，每个组件都拥有单独的文档页，可以点击左侧菜单栏进行查看。

当然，点击下方的下一篇按钮，就是 Button 按钮组件的文档页了。
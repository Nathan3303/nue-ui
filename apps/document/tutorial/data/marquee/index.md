# Marquee 跑马灯 <Badge text="🧪 实验性" type="warning" />

跑马灯组件，用于循环播放一段文字或者一组图片。

## 基础用法

通过 `<NueMarquee>` 标签声明一个跑马灯组件。

### 播放类型

跑马灯组件拥有两种播放类型，一个是滚动播放，一个是轮播播放。滚动播放是指文字或图片滚动一次后，会自动返回到初始位置；
轮播播放是指文字或图片会自动切换到下一项，即第一项在跑过可视区域后会接在最后一项等待显示，看起来会像无限循环。

通过属性 `infinite` 设置是否为轮播播放。属性值类型为布尔类型。

设置属性 `infinite` 为 `false` 即为滚动播放。

::: preview
demo-preview=./un-infinite.vue
:::

设置属性 `infinite` 为 `true` 即为轮播播放。

::: preview
demo-preview=./infinite.vue
:::

### 动画速度

通过 `speed-ratio` 属性设置速度倍率系数，值越大，速度越慢。属性接受数字类型。

::: preview
demo-preview=./speed-ratio.vue
:::

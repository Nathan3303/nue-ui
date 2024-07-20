<script setup>

</script>
<style scoped>
.marquee-item {
    width: 80px;
    height: 80px;
    background-color: var(--divider-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--primary-radius);
}
</style>

# Marquee 跑马灯

跑马灯组件，用于循环播放一段文字或者一组图片。

## 基础使用

通过 `NueMarquee` 组件，实现跑马灯的功能。

通过 `speed-ratio` 属性设置速度倍率系数，值越大，速度越慢。属性接受数字类型。

:::raw
<nue-marquee :speed-ratio="20">
    <nue-text style="width: max-content">
        夏日的黄昏，微风拂面，夕阳洒下金色的光辉。街道两旁的树影婆娑，伴随着孩童的笑声，一切都显得那么宁静而美好。
    </nue-text>
</nue-marquee>
:::

```vue
<template>
    <nue-marquee :speed-ratio="20">
        <nue-text style="width: max-content">
            夏日的黄昏，微风拂面，夕阳洒下金色的光辉。
            街道两旁的树影婆娑，伴随着孩童的笑声，一切都显得那么宁静而美好。
        </nue-text>
    </nue-marquee>
</template>
```

## 无限循环

通过 `infinite` 属性设置是否无限循环，属性接受布尔类型。

:::raw
<nue-marquee infinite>
    <div class="marquee-item" v-for="(item, idx) in 12" :key="idx">
        {{ item }}
    </div>
</nue-marquee>
:::

```vue
<template>
    <nue-marquee infinite>
        <div class="marquee-item" v-for="item in 12" :key="item">
            {{ item }}
        </div>
    </nue-marquee>
</template>
<style scoped>
.marquee-item {
    width: 80px;
    height: 80px;
    background-color: var(--divider-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--primary-radius);
}
</style>
```

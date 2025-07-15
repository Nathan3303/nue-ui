import {
    Transition,
    computed,
    createApp,
    createBaseVNode,
    createBlock,
    createCommentVNode,
    createElementBlock,
    createVNode,
    defineComponent,
    normalizeClass,
    normalizeStyle,
    onMounted,
    openBlock,
    ref,
    renderSlot,
    toDisplayString,
    unref,
    watch,
    withCtx
} from './chunk-MVSCGQCM.js';

// ../../node_modules/.pnpm/@vitepress-demo-preview+component@file+apps+document+vitepress-demo-preview+component/node_modules/@vitepress-demo-preview/component/bundle/preview-component.js
var x = (o, e) => {
    const t = o.__vccOpts || o;
    for (const [c, l] of e) t[c] = l;
    return t;
};
var q = {};
var G = {
    t: '1661231422733',
    class: 'icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '3259',
    width: '20',
    height: '20'
};
function J(o, e) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            G,
            e[0] ||
                (e[0] = [
                    createBaseVNode(
                        'path',
                        {
                            d: 'M682.666667 810.666667c-12.8 0-21.333333-4.266667-29.866667-12.8-17.066667-17.066667-17.066667-42.666667 0-59.733334l226.133333-226.133333-226.133333-226.133333c-17.066667-17.066667-17.066667-42.666667 0-59.733334s42.666667-17.066667 59.733333 0l256 256c17.066667 17.066667 17.066667 42.666667 0 59.733334l-256 256c-8.533333 8.533333-17.066667 12.8-29.866666 12.8zM341.333333 810.666667c-12.8 0-21.333333-4.266667-29.866666-12.8l-256-256c-17.066667-17.066667-17.066667-42.666667 0-59.733334l256-256c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733334L145.066667 512l226.133333 226.133333c17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-17.066667 12.8-29.866667 12.8z',
                            'p-id': '3260'
                        },
                        null,
                        -1
                    )
                ])
        )
    );
}
var N = x(q, [['render', J]]);
var K = {};
var Q = {
    t: '1661231449868',
    class: 'icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '3541',
    width: '20',
    height: '20'
};
function W(o, e) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            Q,
            e[0] ||
                (e[0] = [
                    createBaseVNode(
                        'path',
                        {
                            d: 'M305.6 225.6c-17.6-17.6-43.2-17.6-59.2 0L19.2 460.8c-25.6 30.4-25.6 72 0 97.6l225.6 235.2c8 8 20.8 12.8 30.4 12.8s20.8-4.8 30.4-12.8c17.6-17.6 17.6-43.2 0-59.2L88 512l217.6-225.6c17.6-17.6 17.6-43.2 0-60.8zM1001.6 460.8L774.4 225.6c-17.6-17.6-43.2-17.6-59.2 0s-17.6 43.2 0 59.2L932.8 512 715.2 737.6c-17.6 17.6-17.6 43.2 0 59.2 8 8 17.6 12.8 30.4 12.8 12.8 0 20.8-4.8 30.4-12.8l225.6-235.2c28.8-28.8 28.8-70.4 0-100.8zM612.8 230.4c-20.8-8-46.4 4.8-56 25.6L382.4 742.4c-8 20.8 4.8 46.4 25.6 56 4.8 0 8 4.8 12.8 4.8 17.6 0 33.6-12.8 38.4-30.4l179.2-491.2c8-20.8-4.8-46.4-25.6-51.2z',
                            'p-id': '3542'
                        },
                        null,
                        -1
                    )
                ])
        )
    );
}
var I = x(K, [['render', W]]);
var X = {};
var Y = {
    viewBox: '0 0 544 560',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
};
function ee(o, e) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            Y,
            e[0] ||
                (e[0] = [
                    createBaseVNode(
                        'path',
                        {
                            d: 'M399.503 143.667C399.319 152.501 406.332 159.812 415.167 159.997C424.001 160.181 431.312 153.168 431.497 144.333L399.503 143.667ZM416 120L431.997 120.333C431.999 120.207 432 120.081 432 119.954L416 120ZM360 64L360.046 48.0001C360.03 48 360.015 48 360 48L360 64ZM144 64V48C143.984 48 143.968 48 143.953 48.0001L144 64ZM80 128L64.0001 127.953C64 127.968 64 127.984 64 128L80 128ZM80 344H64C64 344.015 64 344.03 64.0001 344.046L80 344ZM136 400L135.954 416C135.97 416 135.985 416 136 416L136 400ZM160 416C168.837 416 176 408.837 176 400C176 391.163 168.837 384 160 384V416ZM217 160H439V128H217V160ZM439 160C461.644 160 480 178.356 480 201H512C512 160.683 479.317 128 439 128V160ZM480 201V423H512V201H480ZM480 423C480 445.644 461.644 464 439 464V496C479.317 496 512 463.317 512 423H480ZM439 464H217V496H439V464ZM217 464C194.356 464 176 445.644 176 423H144C144 463.317 176.683 496 217 496V464ZM176 423V201H144V423H176ZM176 201C176 178.356 194.356 160 217 160V128C176.683 128 144 160.683 144 201H176ZM431.497 144.333L431.997 120.333L400.003 119.667L399.503 143.667L431.497 144.333ZM432 119.954C431.946 100.888 424.347 82.6173 410.865 69.1349L388.238 91.7624C395.741 99.2658 399.97 109.434 400 120.046L432 119.954ZM410.865 69.1349C397.383 55.6526 379.112 48.0543 360.046 48.0001L359.954 79.9999C370.566 80.0301 380.734 84.2589 388.238 91.7624L410.865 69.1349ZM360 48H144V80H360V48ZM143.953 48.0001C122.767 48.0627 102.467 56.5064 87.4868 71.4868L110.114 94.1142C119.117 85.1118 131.316 80.0376 144.047 79.9999L143.953 48.0001ZM87.4868 71.4868C72.5064 86.4673 64.0627 106.767 64.0001 127.953L95.9999 128.047C96.0376 115.316 101.112 103.117 110.114 94.1142L87.4868 71.4868ZM64 128V344H96V128H64ZM64.0001 344.046C64.0543 363.112 71.6526 381.383 85.1349 394.865L107.762 372.238C100.259 364.734 96.0301 354.566 95.9999 343.954L64.0001 344.046ZM85.1349 394.865C98.6173 408.347 116.888 415.946 135.954 416L136.046 384C125.434 383.97 115.266 379.741 107.762 372.238L85.1349 394.865ZM136 416H160V384H136V416Z',
                            fill: 'currentColor'
                        },
                        null,
                        -1
                    )
                ])
        )
    );
}
var D = x(X, [['render', ee]]);
var H = 'vitepress-demo-preview';
var M = (o, e, t, c) => {
    let l = e === '' ? `${o}` : `${o}-${e}`;
    return t && (l += `__${t}`), c && (l += `--${c}`), l;
};
var F = (o = '') => ({
    b: () => M(H, o),
    e: (_ = '') => M(H, o, _),
    m: (_ = '') => M(H, o, '', _),
    bem: (_, m, L) => M(H, _, m, L)
});
var S = () => {
    const o = ref(true);
    return {
        isCodeFold: o,
        setCodeFold: t => {
            o.value = t;
        }
    };
};
var U = () => ({
    copyContent: ref(''),
    clickCopy: async t => {
        await navigator.clipboard.writeText(t);
    }
});
var te = {};
var ne = {
    width: '20',
    height: '20',
    viewBox: '0 0 48 48',
    fill: 'currentColor',
    xmlns: 'http://www.w3.org/2000/svg'
};
function oe(o, e) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            ne,
            e[0] ||
                (e[0] = [
                    createBaseVNode(
                        'path',
                        {
                            d: 'M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z',
                            fill: 'currentColor',
                            stroke: '#333',
                            'stroke-width': '4',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round'
                        },
                        null,
                        -1
                    ),
                    createBaseVNode(
                        'path',
                        {
                            d: 'M17 24L22 29L32 19',
                            fill: 'currentColor',
                            stroke: '#333',
                            'stroke-width': '4',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round'
                        },
                        null,
                        -1
                    )
                ])
        )
    );
}
var se = x(te, [['render', oe]]);
var ce = defineComponent({
    __name: 'message-notice',
    props: {
        content: { default: '复制成功！' },
        close: {}
    },
    setup(o, { expose: e }) {
        const t = o,
            c = F(),
            l = ref(false),
            _ = d => {
                l.value = d;
            },
            m = ref(-999),
            L = d => {
                m.value = d;
            };
        watch(l, d => {
            d === true &&
                setTimeout(() => {
                    l.value = false;
                }, 3e3);
        });
        const p = () => {
            t.close();
        };
        return (
            e({
                setVisible: _,
                setTopHeight: L
            }),
            (d, g) => (
                openBlock(),
                createBlock(
                    Transition,
                    {
                        name: 'slide-fade',
                        onAfterLeave: p
                    },
                    {
                        default: withCtx(() => [
                            l.value
                                ? (openBlock(),
                                  createElementBlock(
                                      'div',
                                      {
                                          key: 0,
                                          class: normalizeClass([
                                              unref(c).bem('message-notice', 'container')
                                          ]),
                                          style: normalizeStyle({ top: m.value + 'px' })
                                      },
                                      [
                                          createVNode(se),
                                          createBaseVNode(
                                              'span',
                                              null,
                                              toDisplayString(d.content),
                                              1
                                          )
                                      ],
                                      6
                                  ))
                                : createCommentVNode('', true)
                        ]),
                        _: 1
                    }
                )
            )
        );
    }
});
var V = [];
var E = {
    open: () => {
        const o = document.createElement('div'),
            e = createApp(ce, {
                content: '复制成功！',
                close: () => {
                    document.body.removeChild(o), V.pop(), e.unmount();
                }
            }),
            t = e.mount(o);
        document.body.appendChild(o);
        const c = V.length,
            l = c === 0 ? 10 : (c + 1) * 10 + c * 42;
        t.setTopHeight(l), t.setVisible(true), V.push(t);
    }
};
var ie = ['innerHTML'];
var le = ['innerHTML'];
var de = defineComponent({
    __name: 'AntDesign',
    props: {
        code: {},
        showCode: {},
        title: { default: '默认标题' },
        description: { default: '描述内容' }
    },
    setup(o) {
        const e = o,
            t = F(),
            { isCodeFold: c, setCodeFold: l } = S(),
            { copyContent: _, clickCopy: m } = U(),
            L = ref(decodeURIComponent(e.code)),
            p = ref(decodeURIComponent(e.showCode)),
            d = ref(null),
            g = () => {
                m(L.value), E.open();
            },
            h = computed(() => {
                var r;
                return d.value ? ((r = d.value) == null ? void 0 : r.clientHeight) : 0;
            }),
            s = r => {
                c.value ? (d.value.style.height = '0px') : (d.value.style.height = `${r}px`);
            };
        return (
            onMounted(() => {
                const r = h.value;
                s(r);
            }),
            watch(c, () => {
                const r = h.value;
                s(r);
            }),
            (r, f) => (
                openBlock(),
                createElementBlock(
                    'div',
                    {
                        class: normalizeClass([unref(t).e('ant-design__container')])
                    },
                    [
                        createBaseVNode(
                            'section',
                            {
                                class: normalizeClass([unref(t).bem('preview')])
                            },
                            [renderSlot(r.$slots, 'default')],
                            2
                        ),
                        createBaseVNode(
                            'section',
                            {
                                class: normalizeClass([unref(t).bem('description')])
                            },
                            [
                                e.title
                                    ? (openBlock(),
                                      createElementBlock(
                                          'div',
                                          {
                                              key: 0,
                                              class: normalizeClass([
                                                  unref(t).bem('description', 'title')
                                              ])
                                          },
                                          toDisplayString(r.title),
                                          3
                                      ))
                                    : createCommentVNode('', true),
                                e.description
                                    ? (openBlock(),
                                      createElementBlock(
                                          'div',
                                          {
                                              key: 1,
                                              class: normalizeClass([
                                                  unref(t).bem('description', 'content')
                                              ]),
                                              innerHTML: r.description
                                          },
                                          null,
                                          10,
                                          ie
                                      ))
                                    : createCommentVNode('', true),
                                e.description || (!e.title && !e.description)
                                    ? (openBlock(),
                                      createElementBlock(
                                          'div',
                                          {
                                              key: 2,
                                              class: normalizeClass([
                                                  unref(t).bem('description', 'split-line')
                                              ])
                                          },
                                          null,
                                          2
                                      ))
                                    : createCommentVNode('', true),
                                createBaseVNode(
                                    'div',
                                    {
                                        class: normalizeClass([
                                            unref(t).bem('description', 'handle-btn')
                                        ])
                                    },
                                    [
                                        unref(c)
                                            ? (openBlock(),
                                              createBlock(N, {
                                                  key: 1,
                                                  onClick: f[1] || (f[1] = z => unref(l)(false))
                                              }))
                                            : (openBlock(),
                                              createBlock(I, {
                                                  key: 0,
                                                  onClick: f[0] || (f[0] = z => unref(l)(true))
                                              })),
                                        createVNode(D, { onClick: g })
                                    ],
                                    2
                                )
                            ],
                            2
                        ),
                        createBaseVNode(
                            'section',
                            {
                                class: normalizeClass([unref(t).bem('source')]),
                                ref_key: 'sourceCodeArea',
                                ref: d
                            },
                            [
                                createBaseVNode(
                                    'div',
                                    {
                                        innerHTML: p.value,
                                        class: 'language-vue'
                                    },
                                    null,
                                    8,
                                    le
                                )
                            ],
                            2
                        )
                    ],
                    2
                )
            )
        );
    }
});
var re = ['innerHTML'];
var pe = defineComponent({
    __name: 'ElementPlus',
    props: {
        code: {},
        showCode: {},
        title: { default: '默认标题' },
        description: { default: '描述内容' }
    },
    setup(o) {
        const e = o,
            t = F(),
            { isCodeFold: c, setCodeFold: l } = S(),
            { clickCopy: _ } = U(),
            m = ref(decodeURIComponent(e.code)),
            L = ref(decodeURIComponent(e.showCode)),
            p = ref(null),
            d = () => {
                _(m.value), E.open();
            },
            g = computed(() => {
                var s;
                return p.value ? ((s = p.value) == null ? void 0 : s.clientHeight) : 0;
            }),
            h = s => {
                c.value ? (p.value.style.height = '0px') : (p.value.style.height = `${s}px`);
            };
        return (
            onMounted(() => {
                const s = g.value;
                h(s);
            }),
            watch(c, () => {
                const s = g.value;
                h(s);
            }),
            (s, r) => (
                openBlock(),
                createElementBlock(
                    'div',
                    {
                        class: normalizeClass([unref(t).e('element-plus__container')])
                    },
                    [
                        createBaseVNode(
                            'section',
                            {
                                class: normalizeClass([unref(t).bem('preview'), 'vp-raw'])
                            },
                            [renderSlot(s.$slots, 'default')],
                            2
                        ),
                        createBaseVNode(
                            'section',
                            {
                                class: normalizeClass([unref(t).bem('description')])
                            },
                            [
                                createBaseVNode(
                                    'div',
                                    {
                                        class: normalizeClass([
                                            unref(t).bem('description', 'split-line')
                                        ])
                                    },
                                    null,
                                    2
                                ),
                                createBaseVNode(
                                    'div',
                                    {
                                        class: normalizeClass([
                                            unref(t).bem('description', 'handle-btn')
                                        ])
                                    },
                                    [
                                        unref(c)
                                            ? (openBlock(),
                                              createBlock(N, {
                                                  key: 1,
                                                  onClick: r[1] || (r[1] = f => unref(l)(false))
                                              }))
                                            : (openBlock(),
                                              createBlock(I, {
                                                  key: 0,
                                                  onClick: r[0] || (r[0] = f => unref(l)(true))
                                              })),
                                        createVNode(D, { onClick: d })
                                    ],
                                    2
                                )
                            ],
                            2
                        ),
                        createBaseVNode(
                            'section',
                            {
                                class: normalizeClass([unref(t).bem('source')]),
                                ref_key: 'sourceCodeArea',
                                ref: p
                            },
                            [
                                createBaseVNode(
                                    'div',
                                    {
                                        innerHTML: L.value,
                                        class: 'language-vue'
                                    },
                                    null,
                                    8,
                                    re
                                )
                            ],
                            2
                        )
                    ],
                    2
                )
            )
        );
    }
});
var ue = ['innerHTML'];
var Ce = defineComponent({
    __name: 'NaiveUI',
    props: {
        code: {},
        showCode: {},
        title: { default: '默认标题' },
        description: { default: '描述内容' }
    },
    setup(o) {
        const e = o,
            t = F(),
            { isCodeFold: c, setCodeFold: l } = S(),
            { clickCopy: _ } = U(),
            m = ref(decodeURIComponent(e.code)),
            L = ref(decodeURIComponent(e.showCode)),
            p = ref(null),
            d = () => {
                _(m.value), E.open();
            },
            g = computed(() => {
                var s;
                return p.value ? ((s = p.value) == null ? void 0 : s.clientHeight) : 0;
            }),
            h = s => {
                c.value ? (p.value.style.height = '0px') : (p.value.style.height = `${s}px`);
            };
        return (
            onMounted(() => {
                const s = g.value;
                h(s);
            }),
            watch(c, () => {
                const s = g.value;
                h(s);
            }),
            (s, r) => (
                openBlock(),
                createElementBlock(
                    'div',
                    {
                        class: normalizeClass([unref(t).e('naive-ui__container')])
                    },
                    [
                        createBaseVNode(
                            'section',
                            {
                                class: normalizeClass([unref(t).bem('name_handle')])
                            },
                            [
                                e.title
                                    ? (openBlock(),
                                      createElementBlock(
                                          'div',
                                          {
                                              key: 0,
                                              class: normalizeClass([
                                                  unref(t).bem('component', 'name')
                                              ])
                                          },
                                          toDisplayString(s.title),
                                          3
                                      ))
                                    : createCommentVNode('', true),
                                createBaseVNode(
                                    'div',
                                    {
                                        class: normalizeClass([unref(t).bem('description', 'btns')])
                                    },
                                    [
                                        createVNode(D, { onClick: d }),
                                        unref(c)
                                            ? (openBlock(),
                                              createBlock(N, {
                                                  key: 1,
                                                  onClick: r[1] || (r[1] = f => unref(l)(false))
                                              }))
                                            : (openBlock(),
                                              createBlock(I, {
                                                  key: 0,
                                                  onClick: r[0] || (r[0] = f => unref(l)(true))
                                              }))
                                    ],
                                    2
                                )
                            ],
                            2
                        ),
                        e.description
                            ? (openBlock(),
                              createElementBlock(
                                  'section',
                                  {
                                      key: 0,
                                      class: normalizeClass([unref(t).bem('description')])
                                  },
                                  [
                                      createBaseVNode(
                                          'span',
                                          null,
                                          toDisplayString(s.description),
                                          1
                                      )
                                  ],
                                  2
                              ))
                            : createCommentVNode('', true),
                        createBaseVNode(
                            'section',
                            {
                                class: normalizeClass([unref(t).bem('preview')])
                            },
                            [renderSlot(s.$slots, 'default')],
                            2
                        ),
                        createBaseVNode(
                            'section',
                            {
                                class: normalizeClass([unref(t).bem('source')]),
                                ref_key: 'sourceCodeArea',
                                ref: p
                            },
                            [
                                createBaseVNode(
                                    'div',
                                    {
                                        innerHTML: L.value,
                                        class: 'language-vue'
                                    },
                                    null,
                                    8,
                                    ue
                                )
                            ],
                            2
                        )
                    ],
                    2
                )
            )
        );
    }
});
export { de as AntDesignContainer, pe as ElementPlusContainer, Ce as NaiveUIContainer };
//# sourceMappingURL=@vitepress-demo-preview_component.js.map

import {
    openBlock as a,
    createElementBlock as C,
    createElementVNode as i,
    ref as _,
    defineComponent as b,
    watch as Z,
    createBlock as y,
    Transition as O,
    withCtx as R,
    normalizeClass as u,
    unref as n,
    normalizeStyle as P,
    createVNode as M,
    toDisplayString as $,
    createCommentVNode as H,
    createApp as j,
    computed as A,
    onMounted as T,
    renderSlot as N,
    resolveComponent as q
} from 'vue';
const x = (o, t) => {
        const e = o.__vccOpts || o;
        for (const [c, l] of t) e[c] = l;
        return e;
    },
    G = {},
    J = {
        t: '1661231422733',
        class: 'icon',
        viewBox: '0 0 1024 1024',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
        'p-id': '3259',
        width: '20',
        height: '20'
    },
    K = /* @__PURE__ */ i(
        'path',
        {
            d: 'M682.666667 810.666667c-12.8 0-21.333333-4.266667-29.866667-12.8-17.066667-17.066667-17.066667-42.666667 0-59.733334l226.133333-226.133333-226.133333-226.133333c-17.066667-17.066667-17.066667-42.666667 0-59.733334s42.666667-17.066667 59.733333 0l256 256c17.066667 17.066667 17.066667 42.666667 0 59.733334l-256 256c-8.533333 8.533333-17.066667 12.8-29.866666 12.8zM341.333333 810.666667c-12.8 0-21.333333-4.266667-29.866666-12.8l-256-256c-17.066667-17.066667-17.066667-42.666667 0-59.733334l256-256c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733334L145.066667 512l226.133333 226.133333c17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-17.066667 12.8-29.866667 12.8z',
            'p-id': '3260'
        },
        null,
        -1
    ),
    Q = [K];
function W(o, t) {
    return a(), C('svg', J, Q);
}
const I = /* @__PURE__ */ x(G, [['render', W]]),
    X = {},
    Y = {
        t: '1661231449868',
        class: 'icon',
        viewBox: '0 0 1024 1024',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
        'p-id': '3541',
        width: '20',
        height: '20'
    },
    ee = /* @__PURE__ */ i(
        'path',
        {
            d: 'M305.6 225.6c-17.6-17.6-43.2-17.6-59.2 0L19.2 460.8c-25.6 30.4-25.6 72 0 97.6l225.6 235.2c8 8 20.8 12.8 30.4 12.8s20.8-4.8 30.4-12.8c17.6-17.6 17.6-43.2 0-59.2L88 512l217.6-225.6c17.6-17.6 17.6-43.2 0-60.8zM1001.6 460.8L774.4 225.6c-17.6-17.6-43.2-17.6-59.2 0s-17.6 43.2 0 59.2L932.8 512 715.2 737.6c-17.6 17.6-17.6 43.2 0 59.2 8 8 17.6 12.8 30.4 12.8 12.8 0 20.8-4.8 30.4-12.8l225.6-235.2c28.8-28.8 28.8-70.4 0-100.8zM612.8 230.4c-20.8-8-46.4 4.8-56 25.6L382.4 742.4c-8 20.8 4.8 46.4 25.6 56 4.8 0 8 4.8 12.8 4.8 17.6 0 33.6-12.8 38.4-30.4l179.2-491.2c8-20.8-4.8-46.4-25.6-51.2z',
            'p-id': '3542'
        },
        null,
        -1
    ),
    te = [ee];
function ne(o, t) {
    return a(), C('svg', Y, te);
}
const D = /* @__PURE__ */ x(X, [['render', ne]]),
    oe = {},
    se = {
        viewBox: '0 0 544 560',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
    },
    ce = /* @__PURE__ */ i(
        'path',
        {
            d: 'M399.503 143.667C399.319 152.501 406.332 159.812 415.167 159.997C424.001 160.181 431.312 153.168 431.497 144.333L399.503 143.667ZM416 120L431.997 120.333C431.999 120.207 432 120.081 432 119.954L416 120ZM360 64L360.046 48.0001C360.03 48 360.015 48 360 48L360 64ZM144 64V48C143.984 48 143.968 48 143.953 48.0001L144 64ZM80 128L64.0001 127.953C64 127.968 64 127.984 64 128L80 128ZM80 344H64C64 344.015 64 344.03 64.0001 344.046L80 344ZM136 400L135.954 416C135.97 416 135.985 416 136 416L136 400ZM160 416C168.837 416 176 408.837 176 400C176 391.163 168.837 384 160 384V416ZM217 160H439V128H217V160ZM439 160C461.644 160 480 178.356 480 201H512C512 160.683 479.317 128 439 128V160ZM480 201V423H512V201H480ZM480 423C480 445.644 461.644 464 439 464V496C479.317 496 512 463.317 512 423H480ZM439 464H217V496H439V464ZM217 464C194.356 464 176 445.644 176 423H144C144 463.317 176.683 496 217 496V464ZM176 423V201H144V423H176ZM176 201C176 178.356 194.356 160 217 160V128C176.683 128 144 160.683 144 201H176ZM431.497 144.333L431.997 120.333L400.003 119.667L399.503 143.667L431.497 144.333ZM432 119.954C431.946 100.888 424.347 82.6173 410.865 69.1349L388.238 91.7624C395.741 99.2658 399.97 109.434 400 120.046L432 119.954ZM410.865 69.1349C397.383 55.6526 379.112 48.0543 360.046 48.0001L359.954 79.9999C370.566 80.0301 380.734 84.2589 388.238 91.7624L410.865 69.1349ZM360 48H144V80H360V48ZM143.953 48.0001C122.767 48.0627 102.467 56.5064 87.4868 71.4868L110.114 94.1142C119.117 85.1118 131.316 80.0376 144.047 79.9999L143.953 48.0001ZM87.4868 71.4868C72.5064 86.4673 64.0627 106.767 64.0001 127.953L95.9999 128.047C96.0376 115.316 101.112 103.117 110.114 94.1142L87.4868 71.4868ZM64 128V344H96V128H64ZM64.0001 344.046C64.0543 363.112 71.6526 381.383 85.1349 394.865L107.762 372.238C100.259 364.734 96.0301 354.566 95.9999 343.954L64.0001 344.046ZM85.1349 394.865C98.6173 408.347 116.888 415.946 135.954 416L136.046 384C125.434 383.97 115.266 379.741 107.762 372.238L85.1349 394.865ZM136 416H160V384H136V416Z',
            fill: 'currentColor'
        },
        null,
        -1
    ),
    ie = [ce];
function le(o, t) {
    return a(), C('svg', se, ie);
}
const S = /* @__PURE__ */ x(oe, [['render', le]]),
    w = 'vitepress-demo-preview',
    k = (o, t, e, c) => {
        let l = t === '' ? `${o}` : `${o}-${t}`;
        return e && (l += `__${e}`), c && (l += `--${c}`), l;
    },
    F = (o = '') => ({
        b: () => k(w, o),
        e: (v = '') => k(w, o, v),
        m: (v = '') => k(w, o, '', v),
        bem: (v, m, h) => k(w, v, m, h)
    }),
    U = () => {
        const o = _(!0);
        return {
            isCodeFold: o,
            setCodeFold: e => {
                o.value = e;
            }
        };
    },
    E = () => ({
        copyContent: _(''),
        clickCopy: async e => {
            await navigator.clipboard.writeText(e);
        }
    }),
    re = {},
    ue = {
        width: '20',
        height: '20',
        viewBox: '0 0 48 48',
        fill: 'currentColor',
        xmlns: 'http://www.w3.org/2000/svg'
    },
    ae = /* @__PURE__ */ i(
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
    de = /* @__PURE__ */ i(
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
    ),
    pe = [ae, de];
function Ce(o, t) {
    return a(), C('svg', ue, pe);
}
const _e = /* @__PURE__ */ x(re, [['render', Ce]]),
    ve = /* @__PURE__ */ b({
        __name: 'message-notice',
        props: {
            content: { default: '\u590D\u5236\u6210\u529F\uFF01' },
            close: {}
        },
        setup(o, { expose: t }) {
            const e = o,
                c = F(),
                l = _(!1),
                v = d => {
                    l.value = d;
                },
                m = _(-999),
                h = d => {
                    m.value = d;
                };
            Z(l, d => {
                d === !0 &&
                    setTimeout(() => {
                        l.value = !1;
                    }, 3e3);
            });
            const p = () => {
                e.close();
            };
            return (
                t({
                    setVisible: v,
                    setTopHeight: h
                }),
                (d, L) => (
                    a(),
                    y(
                        O,
                        {
                            name: 'slide-fade',
                            onAfterLeave: p
                        },
                        {
                            default: R(() => [
                                l.value
                                    ? (a(),
                                      C(
                                          'div',
                                          {
                                              key: 0,
                                              class: u([
                                                  n(c).bem(
                                                      'message-notice',
                                                      'container'
                                                  )
                                              ]),
                                              style: P({ top: m.value + 'px' })
                                          },
                                          [
                                              M(_e),
                                              i('span', null, $(d.content), 1)
                                          ],
                                          6
                                      ))
                                    : H('', !0)
                            ]),
                            _: 1
                        }
                    )
                )
            );
        }
    });
const B = [],
    z = {
        open: () => {
            const o = document.createElement('div'),
                t = j(ve, {
                    content: '\u590D\u5236\u6210\u529F\uFF01',
                    close: () => {
                        document.body.removeChild(o), B.pop(), t.unmount();
                    }
                }),
                e = t.mount(o);
            document.body.appendChild(o);
            const c = B.length,
                l = c === 0 ? 10 : (c + 1) * 10 + c * 42;
            e.setTopHeight(l), e.setVisible(!0), B.push(e);
        }
    },
    me = ['innerHTML'],
    he = ['innerHTML'],
    ye = /* @__PURE__ */ b({
        __name: 'AntDesign',
        props: {
            code: {},
            showCode: {},
            title: { default: '\u9ED8\u8BA4\u6807\u9898' },
            description: { default: '\u63CF\u8FF0\u5185\u5BB9' }
        },
        setup(o) {
            const t = o,
                e = F(),
                { isCodeFold: c, setCodeFold: l } = U(),
                { copyContent: v, clickCopy: m } = E(),
                h = _(decodeURIComponent(t.code)),
                p = _(decodeURIComponent(t.showCode)),
                d = _(null),
                L = () => {
                    m(h.value), z.open();
                },
                g = A(() => {
                    var r;
                    return d.value
                        ? (r = d.value) == null
                            ? void 0
                            : r.clientHeight
                        : 0;
                }),
                s = r => {
                    c.value
                        ? (d.value.style.height = '0px')
                        : (d.value.style.height = `${r}px`);
                };
            return (
                T(() => {
                    const r = g.value;
                    s(r);
                }),
                Z(c, () => {
                    const r = g.value;
                    s(r);
                }),
                (r, f) => (
                    a(),
                    C(
                        'div',
                        {
                            class: u([n(e).e('ant-design__container')])
                        },
                        [
                            i(
                                'section',
                                {
                                    class: u([n(e).bem('preview')])
                                },
                                [N(r.$slots, 'default')],
                                2
                            ),
                            i(
                                'section',
                                {
                                    class: u([n(e).bem('description')])
                                },
                                [
                                    t.title
                                        ? (a(),
                                          C(
                                              'div',
                                              {
                                                  key: 0,
                                                  class: u([
                                                      n(e).bem(
                                                          'description',
                                                          'title'
                                                      )
                                                  ])
                                              },
                                              $(r.title),
                                              3
                                          ))
                                        : H('', !0),
                                    t.description
                                        ? (a(),
                                          C(
                                              'div',
                                              {
                                                  key: 1,
                                                  class: u([
                                                      n(e).bem(
                                                          'description',
                                                          'content'
                                                      )
                                                  ]),
                                                  innerHTML: r.description
                                              },
                                              null,
                                              10,
                                              me
                                          ))
                                        : H('', !0),
                                    t.description ||
                                    (!t.title && !t.description)
                                        ? (a(),
                                          C(
                                              'div',
                                              {
                                                  key: 2,
                                                  class: u([
                                                      n(e).bem(
                                                          'description',
                                                          'split-line'
                                                      )
                                                  ])
                                              },
                                              null,
                                              2
                                          ))
                                        : H('', !0),
                                    i(
                                        'div',
                                        {
                                            class: u([
                                                n(e).bem(
                                                    'description',
                                                    'handle-btn'
                                                )
                                            ])
                                        },
                                        [
                                            n(c)
                                                ? (a(),
                                                  y(I, {
                                                      key: 1,
                                                      onClick:
                                                          f[1] ||
                                                          (f[1] = V => n(l)(!1))
                                                  }))
                                                : (a(),
                                                  y(D, {
                                                      key: 0,
                                                      onClick:
                                                          f[0] ||
                                                          (f[0] = V => n(l)(!0))
                                                  })),
                                            M(S, { onClick: L })
                                        ],
                                        2
                                    )
                                ],
                                2
                            ),
                            i(
                                'section',
                                {
                                    class: u([n(e).bem('source')]),
                                    ref_key: 'sourceCodeArea',
                                    ref: d
                                },
                                [
                                    i(
                                        'div',
                                        {
                                            innerHTML: p.value,
                                            class: 'language-vue'
                                        },
                                        null,
                                        8,
                                        he
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
const Le = ['innerHTML'],
    He = /* @__PURE__ */ b({
        __name: 'ElementPlus',
        props: {
            code: {},
            showCode: {},
            title: { default: '\u9ED8\u8BA4\u6807\u9898' },
            description: { default: '\u63CF\u8FF0\u5185\u5BB9' }
        },
        setup(o) {
            const t = o,
                e = F(),
                { isCodeFold: c, setCodeFold: l } = U(),
                { clickCopy: v } = E(),
                m = _(decodeURIComponent(t.code)),
                h = _(decodeURIComponent(t.showCode)),
                p = _(null),
                d = () => {
                    v(m.value), z.open();
                },
                L = A(() => {
                    var s;
                    return p.value
                        ? (s = p.value) == null
                            ? void 0
                            : s.clientHeight
                        : 0;
                }),
                g = s => {
                    c.value
                        ? (p.value.style.height = '0px')
                        : (p.value.style.height = `${s}px`);
                };
            return (
                T(() => {
                    const s = L.value;
                    g(s);
                }),
                Z(c, () => {
                    const s = L.value;
                    g(s);
                }),
                (s, r) => {
                    const f = q('ClientOnly');
                    return (
                        a(),
                        C(
                            'div',
                            {
                                class: u([n(e).e('element-plus__container')])
                            },
                            [
                                M(f, null, {
                                    default: R(() => [
                                        i(
                                            'section',
                                            {
                                                class: u([n(e).bem('preview')])
                                            },
                                            [N(s.$slots, 'default')],
                                            2
                                        )
                                    ]),
                                    _: 3
                                }),
                                i(
                                    'section',
                                    {
                                        class: u([n(e).bem('description')])
                                    },
                                    [
                                        i(
                                            'div',
                                            {
                                                class: u([
                                                    n(e).bem(
                                                        'description',
                                                        'split-line'
                                                    )
                                                ])
                                            },
                                            null,
                                            2
                                        ),
                                        i(
                                            'div',
                                            {
                                                class: u([
                                                    n(e).bem(
                                                        'description',
                                                        'handle-btn'
                                                    )
                                                ])
                                            },
                                            [
                                                n(c)
                                                    ? (a(),
                                                      y(I, {
                                                          key: 1,
                                                          onClick:
                                                              r[1] ||
                                                              (r[1] = V =>
                                                                  n(l)(!1))
                                                      }))
                                                    : (a(),
                                                      y(D, {
                                                          key: 0,
                                                          onClick:
                                                              r[0] ||
                                                              (r[0] = V =>
                                                                  n(l)(!0))
                                                      })),
                                                M(S, { onClick: d })
                                            ],
                                            2
                                        )
                                    ],
                                    2
                                ),
                                i(
                                    'section',
                                    {
                                        class: u([n(e).bem('source')]),
                                        ref_key: 'sourceCodeArea',
                                        ref: p
                                    },
                                    [
                                        i(
                                            'div',
                                            {
                                                innerHTML: h.value,
                                                class: 'language-vue'
                                            },
                                            null,
                                            8,
                                            Le
                                        )
                                    ],
                                    2
                                )
                            ],
                            2
                        )
                    );
                }
            );
        }
    });
const ge = ['innerHTML'],
    Me = /* @__PURE__ */ b({
        __name: 'NaiveUI',
        props: {
            code: {},
            showCode: {},
            title: { default: '\u9ED8\u8BA4\u6807\u9898' },
            description: { default: '\u63CF\u8FF0\u5185\u5BB9' }
        },
        setup(o) {
            const t = o,
                e = F(),
                { isCodeFold: c, setCodeFold: l } = U(),
                { clickCopy: v } = E(),
                m = _(decodeURIComponent(t.code)),
                h = _(decodeURIComponent(t.showCode)),
                p = _(null),
                d = () => {
                    v(m.value), z.open();
                },
                L = A(() => {
                    var s;
                    return p.value
                        ? (s = p.value) == null
                            ? void 0
                            : s.clientHeight
                        : 0;
                }),
                g = s => {
                    c.value
                        ? (p.value.style.height = '0px')
                        : (p.value.style.height = `${s}px`);
                };
            return (
                T(() => {
                    const s = L.value;
                    g(s);
                }),
                Z(c, () => {
                    const s = L.value;
                    g(s);
                }),
                (s, r) => (
                    a(),
                    C(
                        'div',
                        {
                            class: u([n(e).e('naive-ui__container')])
                        },
                        [
                            i(
                                'section',
                                {
                                    class: u([n(e).bem('name_handle')])
                                },
                                [
                                    t.title
                                        ? (a(),
                                          C(
                                              'div',
                                              {
                                                  key: 0,
                                                  class: u([
                                                      n(e).bem(
                                                          'component',
                                                          'name'
                                                      )
                                                  ])
                                              },
                                              $(s.title),
                                              3
                                          ))
                                        : H('', !0),
                                    i(
                                        'div',
                                        {
                                            class: u([
                                                n(e).bem('description', 'btns')
                                            ])
                                        },
                                        [
                                            M(S, { onClick: d }),
                                            n(c)
                                                ? (a(),
                                                  y(I, {
                                                      key: 1,
                                                      onClick:
                                                          r[1] ||
                                                          (r[1] = f => n(l)(!1))
                                                  }))
                                                : (a(),
                                                  y(D, {
                                                      key: 0,
                                                      onClick:
                                                          r[0] ||
                                                          (r[0] = f => n(l)(!0))
                                                  }))
                                        ],
                                        2
                                    )
                                ],
                                2
                            ),
                            t.description
                                ? (a(),
                                  C(
                                      'section',
                                      {
                                          key: 0,
                                          class: u([n(e).bem('description')])
                                      },
                                      [i('span', null, $(s.description), 1)],
                                      2
                                  ))
                                : H('', !0),
                            i(
                                'section',
                                {
                                    class: u([n(e).bem('preview')])
                                },
                                [N(s.$slots, 'default')],
                                2
                            ),
                            i(
                                'section',
                                {
                                    class: u([n(e).bem('source')]),
                                    ref_key: 'sourceCodeArea',
                                    ref: p
                                },
                                [
                                    i(
                                        'div',
                                        {
                                            innerHTML: h.value,
                                            class: 'language-vue'
                                        },
                                        null,
                                        8,
                                        ge
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
export {
    ye as AntDesignContainer,
    He as ElementPlusContainer,
    Me as NaiveUIContainer
};

import {
    Fragment,
    computed,
    createBaseVNode,
    createBlock,
    createCommentVNode,
    createElementBlock,
    createTextVNode,
    createVNode,
    defineComponent,
    guardReactiveProps,
    isVNode,
    mergeProps,
    nextTick,
    normalizeClass,
    normalizeProps,
    normalizeStyle,
    onBeforeUnmount,
    onMounted,
    onUnmounted,
    openBlock,
    popScopeId,
    pushScopeId,
    ref,
    renderList,
    renderSlot,
    resolveComponent,
    resolveDynamicComponent,
    toDisplayString,
    unref,
    useAttrs,
    watch,
    watchEffect,
    withCtx,
    withKeys,
    withScopeId
} from './chunk-HYY3Y2FS.js';

// ../../node_modules/.pnpm/@vitepress-demo-preview+component@2.6.1_vitepress@1.6.4_@algolia+client-search@5.44.0_@_414d5f85ce8128340154fa03b70eb535/node_modules/@vitepress-demo-preview/component/dist/preview-component.js
var Qo = Object.defineProperty;
var Jo = (e, t, o) =>
    t in e
        ? Qo(e, t, { enumerable: true, configurable: true, writable: true, value: o })
        : (e[t] = o);
var Z = (e, t, o) => (Jo(e, typeof t != 'symbol' ? t + '' : t, o), o);
var Dt = (e, t) => {
    const o = e.__vccOpts || e;
    for (const [n, i] of t) o[n] = i;
    return o;
};
var ln = {};
var cn = {
    t: '1661231422733',
    class: 'icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '3259',
    width: '20',
    height: '20'
};
function dn(e, t) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            cn,
            t[0] ||
                (t[0] = [
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
var Mt = Dt(ln, [['render', dn]]);
var un = {};
var pn = {
    t: '1661231449868',
    class: 'icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '3541',
    width: '20',
    height: '20'
};
function hn(e, t) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            pn,
            t[0] ||
                (t[0] = [
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
var Re = Dt(un, [['render', hn]]);
var fn = {};
var mn = {
    viewBox: '0 0 544 560',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
};
function gn(e, t) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            mn,
            t[0] ||
                (t[0] = [
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
var Rt = Dt(fn, [['render', gn]]);
var at = 'vitepress-demo-preview';
var lt = (e, t, o, n) => {
    let i = t === '' ? `${e}` : `${e}-${t}`;
    return (o && (i += `__${o}`), n && (i += `--${n}`), i);
};
var Nt = (e = '') => ({
    b: () => lt(at, e),
    e: (s = '') => lt(at, e, s),
    m: (s = '') => lt(at, e, '', s),
    bem: (s, r, a) => lt(at, s, r, a)
});
var zt = () => {
    const e = ref(true);
    return {
        isCodeFold: e,
        setCodeFold: o => {
            e.value = o;
        }
    };
};
var At = 1;
var vn = class {
    constructor() {
        Z(this, 'subscribers');
        Z(this, 'toasts');
        Z(this, 'dismissedToasts');
        Z(
            this,
            'subscribe',
            e => (
                this.subscribers.push(e),
                () => {
                    const t = this.subscribers.indexOf(e);
                    this.subscribers.splice(t, 1);
                }
            )
        );
        Z(this, 'publish', e => {
            this.subscribers.forEach(t => t(e));
        });
        Z(this, 'addToast', e => {
            (this.publish(e), (this.toasts = [...this.toasts, e]));
        });
        Z(this, 'create', e => {
            var r;
            const { message: t, ...o } = e,
                n =
                    typeof e.id == 'number' ||
                    (e.id && ((r = e.id) == null ? void 0 : r.length) > 0)
                        ? e.id
                        : At++,
                i = this.toasts.find(a => a.id === n),
                s = e.dismissible === void 0 ? true : e.dismissible;
            return (
                this.dismissedToasts.has(n) && this.dismissedToasts.delete(n),
                i
                    ? (this.toasts = this.toasts.map(a =>
                          a.id === n
                              ? (this.publish({
                                    ...a,
                                    ...e,
                                    id: n,
                                    title: t
                                }),
                                {
                                    ...a,
                                    ...e,
                                    id: n,
                                    dismissible: s,
                                    title: t
                                })
                              : a
                      ))
                    : this.addToast({
                          title: t,
                          ...o,
                          dismissible: s,
                          id: n
                      }),
                n
            );
        });
        Z(
            this,
            'dismiss',
            e => (
                e
                    ? (this.dismissedToasts.add(e),
                      requestAnimationFrame(() =>
                          this.subscribers.forEach(t =>
                              t({
                                  id: e,
                                  dismiss: true
                              })
                          )
                      ))
                    : this.toasts.forEach(t => {
                          this.subscribers.forEach(o =>
                              o({
                                  id: t.id,
                                  dismiss: true
                              })
                          );
                      }),
                e
            )
        );
        Z(this, 'message', (e, t) =>
            this.create({
                ...t,
                message: e,
                type: 'default'
            })
        );
        Z(this, 'error', (e, t) =>
            this.create({
                ...t,
                type: 'error',
                message: e
            })
        );
        Z(this, 'success', (e, t) =>
            this.create({
                ...t,
                type: 'success',
                message: e
            })
        );
        Z(this, 'info', (e, t) =>
            this.create({
                ...t,
                type: 'info',
                message: e
            })
        );
        Z(this, 'warning', (e, t) =>
            this.create({
                ...t,
                type: 'warning',
                message: e
            })
        );
        Z(this, 'loading', (e, t) =>
            this.create({
                ...t,
                type: 'loading',
                message: e
            })
        );
        Z(this, 'promise', (e, t) => {
            if (!t) return;
            let o;
            t.loading !== void 0 &&
                (o = this.create({
                    ...t,
                    promise: e,
                    type: 'loading',
                    message: t.loading,
                    description: typeof t.description != 'function' ? t.description : void 0
                }));
            const n = Promise.resolve(e instanceof Function ? e() : e);
            let i = o !== void 0,
                s;
            const r = n
                    .then(async l => {
                        if (((s = ['resolve', l]), isVNode(l)))
                            ((i = false),
                                this.create({
                                    id: o,
                                    type: 'default',
                                    message: l
                                }));
                        else if (yn(l) && !l.ok) {
                            i = false;
                            const f =
                                    typeof t.error == 'function'
                                        ? await t.error(`HTTP error! status: ${l.status}`)
                                        : t.error,
                                m =
                                    typeof t.description == 'function'
                                        ? await t.description(`HTTP error! status: ${l.status}`)
                                        : t.description,
                                v =
                                    typeof f == 'object' && !isVNode(f)
                                        ? f
                                        : {
                                              message: f || '',
                                              id: o || ''
                                          };
                            this.create({
                                id: o,
                                type: 'error',
                                description: m,
                                ...v
                            });
                        } else if (l instanceof Error) {
                            i = false;
                            const f = typeof t.error == 'function' ? await t.error(l) : t.error,
                                m =
                                    typeof t.description == 'function'
                                        ? await t.description(l)
                                        : t.description,
                                v =
                                    typeof f == 'object' && !isVNode(f)
                                        ? f
                                        : {
                                              message: f || '',
                                              id: o || ''
                                          };
                            this.create({
                                id: o,
                                type: 'error',
                                description: m,
                                ...v
                            });
                        } else if (t.success !== void 0) {
                            i = false;
                            const f =
                                    typeof t.success == 'function' ? await t.success(l) : t.success,
                                m =
                                    typeof t.description == 'function'
                                        ? await t.description(l)
                                        : t.description,
                                v =
                                    typeof f == 'object' && !isVNode(f)
                                        ? f
                                        : {
                                              message: f || '',
                                              id: o || ''
                                          };
                            this.create({
                                id: o,
                                type: 'success',
                                description: m,
                                ...v
                            });
                        }
                    })
                    .catch(async l => {
                        if (((s = ['reject', l]), t.error !== void 0)) {
                            i = false;
                            const c = typeof t.error == 'function' ? await t.error(l) : t.error,
                                f =
                                    typeof t.description == 'function'
                                        ? await t.description(l)
                                        : t.description,
                                y =
                                    typeof c == 'object' && !isVNode(c)
                                        ? c
                                        : {
                                              message: c || '',
                                              id: o || ''
                                          };
                            this.create({
                                id: o,
                                type: 'error',
                                description: f,
                                ...y
                            });
                        }
                    })
                    .finally(() => {
                        var l;
                        (i && (this.dismiss(o), (o = void 0)),
                            (l = t.finally) == null || l.call(t));
                    }),
                a = () =>
                    new Promise((l, c) =>
                        r.then(() => (s[0] === 'reject' ? c(s[1]) : l(s[1]))).catch(c)
                    );
            return typeof o != 'string' && typeof o != 'number'
                ? { unwrap: a }
                : Object.assign(o, { unwrap: a });
        });
        Z(this, 'custom', (e, t) => {
            const o = (t == null ? void 0 : t.id) || At++;
            return (
                this.publish({
                    component: e,
                    id: o,
                    ...t
                }),
                o
            );
        });
        Z(this, 'getActiveToasts', () => this.toasts.filter(e => !this.dismissedToasts.has(e.id)));
        ((this.subscribers = []),
            (this.toasts = []),
            (this.dismissedToasts = /* @__PURE__ */ new Set()));
    }
};
var oe = new vn();
function wn(e, t) {
    const o = (t == null ? void 0 : t.id) || At++;
    return (
        oe.create({
            message: e,
            id: o,
            type: 'default',
            ...t
        }),
        o
    );
}
var yn = e =>
    e &&
    typeof e == 'object' &&
    'ok' in e &&
    typeof e.ok == 'boolean' &&
    'status' in e &&
    typeof e.status == 'number';
var bn = wn;
var Cn = () => oe.toasts;
var $n = () => oe.getActiveToasts();
var _n = Object.assign(
    bn,
    {
        success: oe.success,
        info: oe.info,
        warning: oe.warning,
        error: oe.error,
        custom: oe.custom,
        message: oe.message,
        promise: oe.promise,
        dismiss: oe.dismiss,
        loading: oe.loading
    },
    {
        getHistory: Cn,
        getToasts: $n
    }
);
function ct(e) {
    return e.label !== void 0;
}
var Tn = 3;
var Eo = '24px';
var Lo = '16px';
var uo = 4e3;
var xn = 356;
var Sn = 14;
var An = 45;
var Oo = 200;
function Pn() {
    const e = ref(false);
    return (
        watchEffect(() => {
            const t = () => {
                e.value = document.hidden;
            };
            return (
                document.addEventListener('visibilitychange', t),
                () => window.removeEventListener('visibilitychange', t)
            );
        }),
        { isDocumentHidden: e }
    );
}
function Te(...e) {
    return e.filter(Boolean).join(' ');
}
function Bn(e) {
    const [t, o] = e.split('-'),
        n = [];
    return (t && n.push(t), o && n.push(o), n);
}
function kn(e, t) {
    const o = {};
    return (
        [e, t].forEach((n, i) => {
            const s = i === 1,
                r = s ? '--mobile-offset' : '--offset',
                a = s ? Lo : Eo;
            function l(c) {
                ['top', 'right', 'bottom', 'left'].forEach(f => {
                    o[`${r}-${f}`] = typeof c == 'number' ? `${c}px` : c;
                });
            }
            typeof n == 'number' || typeof n == 'string'
                ? l(n)
                : typeof n == 'object'
                  ? ['top', 'right', 'bottom', 'left'].forEach(c => {
                        n[c] === void 0
                            ? (o[`${r}-${c}`] = a)
                            : (o[`${r}-${c}`] = typeof n[c] == 'number' ? `${n[c]}px` : n[c]);
                    })
                  : l(a);
        }),
        o
    );
}
var En = [
    'data-rich-colors',
    'data-styled',
    'data-mounted',
    'data-promise',
    'data-swiped',
    'data-removed',
    'data-visible',
    'data-y-position',
    'data-x-position',
    'data-index',
    'data-front',
    'data-swiping',
    'data-dismissible',
    'data-type',
    'data-invert',
    'data-swipe-out',
    'data-swipe-direction',
    'data-expanded'
];
var Ln = ['aria-label', 'data-disabled'];
var On = defineComponent({
    __name: 'Toast',
    props: {
        toast: {},
        toasts: {},
        index: {},
        swipeDirections: {},
        expanded: { type: Boolean },
        invert: { type: Boolean },
        heights: {},
        gap: {},
        position: {},
        visibleToasts: {},
        expandByDefault: { type: Boolean },
        closeButton: { type: Boolean },
        interacting: { type: Boolean },
        style: {},
        cancelButtonStyle: {},
        actionButtonStyle: {},
        duration: {},
        class: {},
        unstyled: { type: Boolean },
        descriptionClass: {},
        loadingIcon: {},
        classes: {},
        icons: {},
        closeButtonAriaLabel: {},
        defaultRichColors: { type: Boolean }
    },
    emits: ['update:heights', 'update:height', 'removeToast'],
    setup(e, { emit: t }) {
        const o = e,
            n = t,
            i = ref(null),
            s = ref(null),
            r = ref(false),
            a = ref(false),
            l = ref(false),
            c = ref(false),
            f = ref(false),
            m = ref(0),
            y = ref(0),
            v = ref(o.toast.duration || o.duration || uo),
            $ = ref(null),
            w = ref(null),
            x = computed(() => o.index === 0),
            u = computed(() => o.index + 1 <= o.visibleToasts),
            p = computed(() => o.toast.type),
            _ = computed(() => o.toast.dismissible !== false),
            H = computed(() => o.toast.class || ''),
            L = computed(() => o.descriptionClass || ''),
            X = computed(() => {
                const d = o.toast.position || o.position,
                    D = o.heights
                        .filter(I => I.position === d)
                        .findIndex(I => I.toastId === o.toast.id);
                return D >= 0 ? D : 0;
            }),
            j = computed(() => {
                const d = o.toast.position || o.position;
                return o.heights
                    .filter(D => D.position === d)
                    .reduce((D, I, V) => (V >= X.value ? D : D + I.height), 0);
            }),
            U = computed(() => X.value * o.gap + j.value || 0),
            h = computed(() => {
                var d;
                return (d = o.toast.closeButton) != null ? d : o.closeButton;
            }),
            b = computed(() => o.toast.duration || o.duration || uo),
            C = ref(0),
            B = ref(0),
            O = ref(null),
            z = computed(() => o.position.split('-')),
            ee = computed(() => z.value[0]),
            te = computed(() => z.value[1]),
            K = computed(() => typeof o.toast.title != 'string'),
            Q = computed(() => typeof o.toast.description != 'string'),
            { isDocumentHidden: ne } = Pn(),
            ve = computed(() => p.value && p.value === 'loading');
        (onMounted(() => {
            ((r.value = true), (v.value = b.value));
        }),
            watchEffect(async () => {
                if (!r.value || !w.value) return;
                await nextTick();
                const d = w.value,
                    F = d.style.height;
                d.style.height = 'auto';
                const D = d.getBoundingClientRect().height;
                ((d.style.height = F),
                    (y.value = D),
                    n('update:height', {
                        toastId: o.toast.id,
                        height: D,
                        position: o.toast.position || o.position
                    }));
            }));
        function fe() {
            ((a.value = true),
                (m.value = U.value),
                setTimeout(() => {
                    n('removeToast', o.toast);
                }, Oo));
        }
        function Ne() {
            var d, F;
            if (ve.value || !_.value) return {};
            (fe(), (F = (d = o.toast).onDismiss) == null || F.call(d, o.toast));
        }
        function ot(d) {
            ve.value ||
                !_.value ||
                (($.value = /* @__PURE__ */ new Date()),
                (m.value = U.value),
                d.target.setPointerCapture(d.pointerId),
                d.target.tagName !== 'BUTTON' &&
                    ((l.value = true),
                    (O.value = {
                        x: d.clientX,
                        y: d.clientY
                    })));
        }
        function nt() {
            var Y, we, ye, be, Ce, $e, _e;
            if (c.value || !_.value) return;
            O.value = null;
            const d = Number(
                    ((Y = w.value) == null
                        ? void 0
                        : Y.style.getPropertyValue('--swipe-amount-x').replace('px', '')) || 0
                ),
                F = Number(
                    ((we = w.value) == null
                        ? void 0
                        : we.style.getPropertyValue('--swipe-amount-y').replace('px', '')) || 0
                ),
                D =
                    /* @__PURE__ */ new Date().getTime() -
                    (((ye = $.value) == null ? void 0 : ye.getTime()) || 0),
                I = i.value === 'x' ? d : F,
                V = Math.abs(I) / D;
            if (Math.abs(I) >= An || V > 0.11) {
                ((m.value = U.value),
                    (Ce = (be = o.toast).onDismiss) == null || Ce.call(be, o.toast),
                    i.value === 'x'
                        ? (s.value = d > 0 ? 'right' : 'left')
                        : (s.value = F > 0 ? 'down' : 'up'),
                    fe(),
                    (c.value = true));
                return;
            } else
                (($e = w.value) == null || $e.style.setProperty('--swipe-amount-x', '0px'),
                    (_e = w.value) == null || _e.style.setProperty('--swipe-amount-y', '0px'));
            ((f.value = false), (l.value = false), (i.value = null));
        }
        function it(d) {
            var ye, be, Ce, $e, _e, ze;
            if (
                !O.value ||
                !_.value ||
                ((Ce =
                    (be =
                        (ye = window == null ? void 0 : window.getSelection()) == null
                            ? void 0
                            : ye.toString()) == null
                        ? void 0
                        : be.length) != null
                    ? Ce
                    : false)
            )
                return;
            const D = d.clientY - O.value.y,
                I = d.clientX - O.value.x,
                V = ($e = o.swipeDirections) != null ? $e : Bn(o.position);
            !i.value &&
                (Math.abs(I) > 1 || Math.abs(D) > 1) &&
                (i.value = Math.abs(I) > Math.abs(D) ? 'x' : 'y');
            let Y = {
                x: 0,
                y: 0
            };
            const we = ce => 1 / (1.5 + Math.abs(ce) / 20);
            if (i.value === 'y') {
                if (V.includes('top') || V.includes('bottom'))
                    if ((V.includes('top') && D < 0) || (V.includes('bottom') && D > 0)) Y.y = D;
                    else {
                        const ce = D * we(D);
                        Y.y = Math.abs(ce) < Math.abs(D) ? ce : D;
                    }
            } else if (i.value === 'x' && (V.includes('left') || V.includes('right')))
                if ((V.includes('left') && I < 0) || (V.includes('right') && I > 0)) Y.x = I;
                else {
                    const ce = I * we(I);
                    Y.x = Math.abs(ce) < Math.abs(I) ? ce : I;
                }
            ((Math.abs(Y.x) > 0 || Math.abs(Y.y) > 0) && (f.value = true),
                (_e = w.value) == null || _e.style.setProperty('--swipe-amount-x', `${Y.x}px`),
                (ze = w.value) == null || ze.style.setProperty('--swipe-amount-y', `${Y.y}px`));
        }
        (onMounted(() => {
            if (((r.value = true), !w.value)) return;
            const d = w.value.getBoundingClientRect().height;
            y.value = d;
            const F = [
                {
                    toastId: o.toast.id,
                    height: d,
                    position: o.toast.position
                },
                ...o.heights
            ];
            n('update:heights', F);
        }),
            onBeforeUnmount(() => {
                w.value && n('removeToast', o.toast);
            }),
            watchEffect(d => {
                if (
                    (o.toast.promise && p.value === 'loading') ||
                    o.toast.duration === 1 / 0 ||
                    o.toast.type === 'loading'
                )
                    return;
                let F;
                const D = () => {
                        if (B.value < C.value) {
                            const V = /* @__PURE__ */ new Date().getTime() - C.value;
                            v.value = v.value - V;
                        }
                        B.value = /* @__PURE__ */ new Date().getTime();
                    },
                    I = () => {
                        v.value !== 1 / 0 &&
                            ((C.value = /* @__PURE__ */ new Date().getTime()),
                            (F = setTimeout(() => {
                                var V, Y;
                                ((Y = (V = o.toast).onAutoClose) == null || Y.call(V, o.toast),
                                    fe());
                            }, v.value)));
                    };
                (o.expanded || o.interacting || ne.value ? D() : I(),
                    d(() => {
                        clearTimeout(F);
                    }));
            }),
            watch(
                () => o.toast.delete,
                d => {
                    d !== void 0 && d && fe();
                },
                { deep: true }
            ));
        function st() {
            ((l.value = false), (i.value = null), (O.value = null));
        }
        return (d, F) => {
            var D,
                I,
                V,
                Y,
                we,
                ye,
                be,
                Ce,
                $e,
                _e,
                ze,
                ce,
                Ct,
                Gt,
                Xt,
                Kt,
                Qt,
                Jt,
                eo,
                to,
                oo,
                no,
                io,
                so,
                ro,
                ao,
                lo,
                co;
            return (
                openBlock(),
                createElementBlock(
                    'li',
                    {
                        tabindex: '0',
                        ref_key: 'toastRef',
                        ref: w,
                        class: normalizeClass(
                            unref(Te)(
                                o.class,
                                H.value,
                                (D = d.classes) == null ? void 0 : D.toast,
                                (I = d.toast.classes) == null ? void 0 : I.toast,
                                (V = d.classes) == null ? void 0 : V[p.value],
                                (we = (Y = d.toast) == null ? void 0 : Y.classes) == null
                                    ? void 0
                                    : we[p.value]
                            )
                        ),
                        'data-sonner-toast': '',
                        'data-rich-colors':
                            (ye = d.toast.richColors) != null ? ye : d.defaultRichColors,
                        'data-styled': !Boolean(
                            d.toast.component ||
                                ((be = d.toast) == null ? void 0 : be.unstyled) ||
                                d.unstyled
                        ),
                        'data-mounted': r.value,
                        'data-promise': Boolean(d.toast.promise),
                        'data-swiped': f.value,
                        'data-removed': a.value,
                        'data-visible': u.value,
                        'data-y-position': ee.value,
                        'data-x-position': te.value,
                        'data-index': d.index,
                        'data-front': x.value,
                        'data-swiping': l.value,
                        'data-dismissible': _.value,
                        'data-type': p.value,
                        'data-invert': d.toast.invert || d.invert,
                        'data-swipe-out': c.value,
                        'data-swipe-direction': s.value,
                        'data-expanded': Boolean(d.expanded || (d.expandByDefault && r.value)),
                        style: normalizeStyle({
                            '--index': d.index,
                            '--toasts-before': d.index,
                            '--z-index': d.toasts.length - d.index,
                            '--offset': `${a.value ? m.value : U.value}px`,
                            '--initial-height': d.expandByDefault ? 'auto' : `${y.value}px`,
                            ...d.style,
                            ...o.toast.style
                        }),
                        onDragend: st,
                        onPointerdown: ot,
                        onPointerup: nt,
                        onPointermove: it
                    },
                    [
                        h.value && !d.toast.component && p.value !== 'loading'
                            ? (openBlock(),
                              createElementBlock(
                                  'button',
                                  {
                                      key: 0,
                                      'aria-label': d.closeButtonAriaLabel || 'Close toast',
                                      'data-disabled': ve.value,
                                      'data-close-button': 'true',
                                      class: normalizeClass(
                                          unref(Te)(
                                              (Ce = d.classes) == null ? void 0 : Ce.closeButton,
                                              (_e = ($e = d.toast) == null ? void 0 : $e.classes) ==
                                                  null
                                                  ? void 0
                                                  : _e.closeButton
                                          )
                                      ),
                                      onClick: Ne
                                  },
                                  [
                                      (ze = d.icons) != null && ze.close
                                          ? (openBlock(),
                                            createBlock(
                                                resolveDynamicComponent(
                                                    (ce = d.icons) == null ? void 0 : ce.close
                                                ),
                                                { key: 0 }
                                            ))
                                          : renderSlot(d.$slots, 'close-icon', { key: 1 })
                                  ],
                                  10,
                                  Ln
                              ))
                            : createCommentVNode('v-if', true),
                        d.toast.component
                            ? (openBlock(),
                              createBlock(
                                  resolveDynamicComponent(d.toast.component),
                                  mergeProps({ key: 1 }, d.toast.componentProps, {
                                      onCloseToast: Ne
                                  }),
                                  null,
                                  16
                              ))
                            : (openBlock(),
                              createElementBlock(
                                  Fragment,
                                  { key: 2 },
                                  [
                                      p.value !== 'default' || d.toast.icon || d.toast.promise
                                          ? (openBlock(),
                                            createElementBlock(
                                                'div',
                                                {
                                                    key: 0,
                                                    'data-icon': '',
                                                    class: normalizeClass(
                                                        unref(Te)(
                                                            (Ct = d.classes) == null
                                                                ? void 0
                                                                : Ct.icon,
                                                            (Xt =
                                                                (Gt = d.toast) == null
                                                                    ? void 0
                                                                    : Gt.classes) == null
                                                                ? void 0
                                                                : Xt.icon
                                                        )
                                                    )
                                                },
                                                [
                                                    d.toast.icon
                                                        ? (openBlock(),
                                                          createBlock(
                                                              resolveDynamicComponent(d.toast.icon),
                                                              { key: 0 }
                                                          ))
                                                        : (openBlock(),
                                                          createElementBlock(
                                                              Fragment,
                                                              { key: 1 },
                                                              [
                                                                  p.value === 'loading'
                                                                      ? renderSlot(
                                                                            d.$slots,
                                                                            'loading-icon',
                                                                            { key: 0 }
                                                                        )
                                                                      : p.value === 'success'
                                                                        ? renderSlot(
                                                                              d.$slots,
                                                                              'success-icon',
                                                                              { key: 1 }
                                                                          )
                                                                        : p.value === 'error'
                                                                          ? renderSlot(
                                                                                d.$slots,
                                                                                'error-icon',
                                                                                { key: 2 }
                                                                            )
                                                                          : p.value === 'warning'
                                                                            ? renderSlot(
                                                                                  d.$slots,
                                                                                  'warning-icon',
                                                                                  { key: 3 }
                                                                              )
                                                                            : p.value === 'info'
                                                                              ? renderSlot(
                                                                                    d.$slots,
                                                                                    'info-icon',
                                                                                    { key: 4 }
                                                                                )
                                                                              : createCommentVNode(
                                                                                    'v-if',
                                                                                    true
                                                                                )
                                                              ],
                                                              64
                                                          ))
                                                ],
                                                2
                                            ))
                                          : createCommentVNode('v-if', true),
                                      createBaseVNode(
                                          'div',
                                          {
                                              'data-content': '',
                                              class: normalizeClass(
                                                  unref(Te)(
                                                      (Kt = d.classes) == null
                                                          ? void 0
                                                          : Kt.content,
                                                      (Jt =
                                                          (Qt = d.toast) == null
                                                              ? void 0
                                                              : Qt.classes) == null
                                                          ? void 0
                                                          : Jt.content
                                                  )
                                              )
                                          },
                                          [
                                              createBaseVNode(
                                                  'div',
                                                  {
                                                      'data-title': '',
                                                      class: normalizeClass(
                                                          unref(Te)(
                                                              (eo = d.classes) == null
                                                                  ? void 0
                                                                  : eo.title,
                                                              (to = d.toast.classes) == null
                                                                  ? void 0
                                                                  : to.title
                                                          )
                                                      )
                                                  },
                                                  [
                                                      K.value
                                                          ? (openBlock(),
                                                            createBlock(
                                                                resolveDynamicComponent(
                                                                    d.toast.title
                                                                ),
                                                                normalizeProps(
                                                                    mergeProps(
                                                                        { key: 0 },
                                                                        d.toast.componentProps
                                                                    )
                                                                ),
                                                                null,
                                                                16
                                                            ))
                                                          : (openBlock(),
                                                            createElementBlock(
                                                                Fragment,
                                                                { key: 1 },
                                                                [
                                                                    createTextVNode(
                                                                        toDisplayString(
                                                                            d.toast.title
                                                                        ),
                                                                        1
                                                                    )
                                                                ],
                                                                64
                                                            ))
                                                  ],
                                                  2
                                              ),
                                              d.toast.description
                                                  ? (openBlock(),
                                                    createElementBlock(
                                                        'div',
                                                        {
                                                            key: 0,
                                                            'data-description': '',
                                                            class: normalizeClass(
                                                                unref(Te)(
                                                                    d.descriptionClass,
                                                                    L.value,
                                                                    (oo = d.classes) == null
                                                                        ? void 0
                                                                        : oo.description,
                                                                    (no = d.toast.classes) == null
                                                                        ? void 0
                                                                        : no.description
                                                                )
                                                            )
                                                        },
                                                        [
                                                            Q.value
                                                                ? (openBlock(),
                                                                  createBlock(
                                                                      resolveDynamicComponent(
                                                                          d.toast.description
                                                                      ),
                                                                      normalizeProps(
                                                                          mergeProps(
                                                                              { key: 0 },
                                                                              d.toast.componentProps
                                                                          )
                                                                      ),
                                                                      null,
                                                                      16
                                                                  ))
                                                                : (openBlock(),
                                                                  createElementBlock(
                                                                      Fragment,
                                                                      { key: 1 },
                                                                      [
                                                                          createTextVNode(
                                                                              toDisplayString(
                                                                                  d.toast
                                                                                      .description
                                                                              ),
                                                                              1
                                                                          )
                                                                      ],
                                                                      64
                                                                  ))
                                                        ],
                                                        2
                                                    ))
                                                  : createCommentVNode('v-if', true)
                                          ],
                                          2
                                      ),
                                      d.toast.cancel
                                          ? (openBlock(),
                                            createElementBlock(
                                                'button',
                                                {
                                                    key: 1,
                                                    style: normalizeStyle(
                                                        d.toast.cancelButtonStyle ||
                                                            d.cancelButtonStyle
                                                    ),
                                                    class: normalizeClass(
                                                        unref(Te)(
                                                            (io = d.classes) == null
                                                                ? void 0
                                                                : io.cancelButton,
                                                            (so = d.toast.classes) == null
                                                                ? void 0
                                                                : so.cancelButton
                                                        )
                                                    ),
                                                    'data-button': '',
                                                    'data-cancel': '',
                                                    onClick:
                                                        F[0] ||
                                                        (F[0] = rt => {
                                                            var Fe, Ie;
                                                            !unref(ct)(d.toast.cancel) ||
                                                                !_.value ||
                                                                ((Ie = (Fe = d.toast.cancel)
                                                                    .onClick) == null ||
                                                                    Ie.call(Fe, rt),
                                                                fe());
                                                        })
                                                },
                                                toDisplayString(
                                                    unref(ct)(d.toast.cancel)
                                                        ? (ro = d.toast.cancel) == null
                                                            ? void 0
                                                            : ro.label
                                                        : d.toast.cancel
                                                ),
                                                7
                                            ))
                                          : createCommentVNode('v-if', true),
                                      d.toast.action
                                          ? (openBlock(),
                                            createElementBlock(
                                                'button',
                                                {
                                                    key: 2,
                                                    style: normalizeStyle(
                                                        d.toast.actionButtonStyle ||
                                                            d.actionButtonStyle
                                                    ),
                                                    class: normalizeClass(
                                                        unref(Te)(
                                                            (ao = d.classes) == null
                                                                ? void 0
                                                                : ao.actionButton,
                                                            (lo = d.toast.classes) == null
                                                                ? void 0
                                                                : lo.actionButton
                                                        )
                                                    ),
                                                    'data-button': '',
                                                    'data-action': '',
                                                    onClick:
                                                        F[1] ||
                                                        (F[1] = rt => {
                                                            var Fe, Ie;
                                                            !unref(ct)(d.toast.action) ||
                                                                ((Ie = (Fe = d.toast.action)
                                                                    .onClick) == null ||
                                                                    Ie.call(Fe, rt),
                                                                !rt.defaultPrevented && fe());
                                                        })
                                                },
                                                toDisplayString(
                                                    unref(ct)(d.toast.action)
                                                        ? (co = d.toast.action) == null
                                                            ? void 0
                                                            : co.label
                                                        : d.toast.action
                                                ),
                                                7
                                            ))
                                          : createCommentVNode('v-if', true)
                                  ],
                                  64
                              ))
                    ],
                    46,
                    En
                )
            );
        };
    }
});
var Hn = On;
var tt = (e, t) => {
    const o = e.__vccOpts || e;
    for (const [n, i] of t) o[n] = i;
    return o;
};
var Dn = {};
var Mn = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '12',
    height: '12',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stoke-width': '1.5',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
};
function Rn(e, t) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            Mn,
            t[0] ||
                (t[0] = [
                    createBaseVNode(
                        'line',
                        {
                            x1: '18',
                            y1: '6',
                            x2: '6',
                            y2: '18'
                        },
                        null,
                        -1
                    ),
                    createBaseVNode(
                        'line',
                        {
                            x1: '6',
                            y1: '6',
                            x2: '18',
                            y2: '18'
                        },
                        null,
                        -1
                    )
                ])
        )
    );
}
var Nn = tt(Dn, [['render', Rn]]);
var zn = ['data-visible'];
var Fn = { class: 'sonner-spinner' };
var In = defineComponent({
    __name: 'Loader',
    props: { visible: { type: Boolean } },
    setup(e) {
        const t = Array(12).fill(0);
        return (o, n) => (
            openBlock(),
            createElementBlock(
                'div',
                {
                    class: 'sonner-loading-wrapper',
                    'data-visible': o.visible
                },
                [
                    createBaseVNode('div', Fn, [
                        (openBlock(true),
                        createElementBlock(
                            Fragment,
                            null,
                            renderList(
                                unref(t),
                                i => (
                                    openBlock(),
                                    createElementBlock('div', {
                                        key: `spinner-bar-${i}`,
                                        class: 'sonner-loading-bar'
                                    })
                                )
                            ),
                            128
                        ))
                    ])
                ],
                8,
                zn
            )
        );
    }
});
var Vn = In;
var Wn = {};
var jn = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 20 20',
    fill: 'currentColor',
    height: '20',
    width: '20'
};
function Zn(e, t) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            jn,
            t[0] ||
                (t[0] = [
                    createBaseVNode(
                        'path',
                        {
                            'fill-rule': 'evenodd',
                            d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z',
                            'clip-rule': 'evenodd'
                        },
                        null,
                        -1
                    )
                ])
        )
    );
}
var Un = tt(Wn, [['render', Zn]]);
var Yn = {};
var qn = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 20 20',
    fill: 'currentColor',
    height: '20',
    width: '20'
};
function Gn(e, t) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            qn,
            t[0] ||
                (t[0] = [
                    createBaseVNode(
                        'path',
                        {
                            'fill-rule': 'evenodd',
                            d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z',
                            'clip-rule': 'evenodd'
                        },
                        null,
                        -1
                    )
                ])
        )
    );
}
var Xn = tt(Yn, [['render', Gn]]);
var Kn = {};
var Qn = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    height: '20',
    width: '20'
};
function Jn(e, t) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            Qn,
            t[0] ||
                (t[0] = [
                    createBaseVNode(
                        'path',
                        {
                            'fill-rule': 'evenodd',
                            d: 'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z',
                            'clip-rule': 'evenodd'
                        },
                        null,
                        -1
                    )
                ])
        )
    );
}
var ei = tt(Kn, [['render', Jn]]);
var ti = {};
var oi = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 20 20',
    fill: 'currentColor',
    height: '20',
    width: '20'
};
function ni(e, t) {
    return (
        openBlock(),
        createElementBlock(
            'svg',
            oi,
            t[0] ||
                (t[0] = [
                    createBaseVNode(
                        'path',
                        {
                            'fill-rule': 'evenodd',
                            d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z',
                            'clip-rule': 'evenodd'
                        },
                        null,
                        -1
                    )
                ])
        )
    );
}
var ii = tt(ti, [['render', ni]]);
var si = ['aria-label'];
var ri = [
    'data-sonner-theme',
    'dir',
    'data-theme',
    'data-rich-colors',
    'data-y-position',
    'data-x-position',
    'data-lifted'
];
var ai = typeof window < 'u' && typeof document < 'u';
function li() {
    if (typeof window > 'u' || typeof document > 'u') return 'ltr';
    const e = document.documentElement.getAttribute('dir');
    return e === 'auto' || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
var ci = defineComponent({
    name: 'Toaster',
    inheritAttrs: false,
    __name: 'Toaster',
    props: {
        invert: {
            type: Boolean,
            default: false
        },
        theme: { default: 'light' },
        position: { default: 'bottom-right' },
        hotkey: { default: () => ['altKey', 'KeyT'] },
        richColors: {
            type: Boolean,
            default: false
        },
        expand: {
            type: Boolean,
            default: false
        },
        duration: {},
        gap: { default: Sn },
        visibleToasts: { default: Tn },
        closeButton: {
            type: Boolean,
            default: false
        },
        toastOptions: { default: () => ({}) },
        class: { default: '' },
        style: {},
        offset: { default: Eo },
        mobileOffset: { default: Lo },
        dir: { default: 'auto' },
        swipeDirections: {},
        icons: {},
        containerAriaLabel: { default: 'Notifications' }
    },
    setup(e) {
        const t = e,
            o = useAttrs(),
            n = ref([]);
        function i(h, b) {
            return n.value.filter(C => (!C.position && b === 0) || C.position === h);
        }
        const s = computed(() => {
                const h = n.value.filter(b => b.position).map(b => b.position);
                return h.length > 0 ? Array.from(new Set([t.position].concat(h))) : [t.position];
            }),
            r = computed(() => {
                const h = {};
                return (
                    s.value.forEach(b => {
                        h[b] = n.value.filter(C => C.position === b);
                    }),
                    h
                );
            }),
            a = ref([]),
            l = ref(false),
            c = ref(false),
            f = ref(
                t.theme !== 'system'
                    ? t.theme
                    : typeof window < 'u' &&
                        window.matchMedia &&
                        window.matchMedia('(prefers-color-scheme: dark)').matches
                      ? 'dark'
                      : 'light'
            ),
            m = ref(null),
            y = ref(null),
            v = ref(false),
            $ = t.hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');
        function w(h) {
            var b;
            (((b = n.value.find(C => C.id === h.id)) != null && b.delete) || oe.dismiss(h.id),
                (n.value = n.value.filter(({ id: C }) => C !== h.id)),
                setTimeout(() => {
                    n.value.find(C => C.id === h.id) ||
                        (a.value = a.value.filter(C => C.toastId !== h.id));
                }, Oo + 50));
        }
        function x(h) {
            var b, C;
            v.value &&
                !(
                    (C = (b = h.currentTarget) == null ? void 0 : b.contains) != null &&
                    C.call(b, h.relatedTarget)
                ) &&
                ((v.value = false),
                y.value && (y.value.focus({ preventScroll: true }), (y.value = null)));
        }
        function u(h) {
            (h.target instanceof HTMLElement && h.target.dataset.dismissible === 'false') ||
                v.value ||
                ((v.value = true), (y.value = h.relatedTarget));
        }
        function p(h) {
            (h.target &&
                h.target instanceof HTMLElement &&
                h.target.dataset.dismissible === 'false') ||
                (c.value = true);
        }
        (watchEffect(h => {
            const b = oe.subscribe(C => {
                if (C.dismiss) {
                    requestAnimationFrame(() => {
                        n.value = n.value.map(B =>
                            B.id === C.id
                                ? {
                                      ...B,
                                      delete: true
                                  }
                                : B
                        );
                    });
                    return;
                }
                nextTick(() => {
                    const B = n.value.findIndex(O => O.id === C.id);
                    B !== -1
                        ? (n.value = [
                              ...n.value.slice(0, B),
                              {
                                  ...n.value[B],
                                  ...C
                              },
                              ...n.value.slice(B + 1)
                          ])
                        : (n.value = [C, ...n.value]);
                });
            });
            h(b);
        }),
            watchEffect(h => {
                if (typeof window > 'u') return;
                if (t.theme !== 'system') {
                    f.value = t.theme;
                    return;
                }
                const b = window.matchMedia('(prefers-color-scheme: dark)'),
                    C = O => {
                        f.value = O ? 'dark' : 'light';
                    };
                C(b.matches);
                const B = O => {
                    C(O.matches);
                };
                try {
                    b.addEventListener('change', B);
                } catch {
                    b.addListener(B);
                }
                h(() => {
                    try {
                        b.removeEventListener('change', B);
                    } catch {
                        b.removeListener(B);
                    }
                });
            }),
            watchEffect(() => {
                m.value &&
                    y.value &&
                    (y.value.focus({ preventScroll: true }), (y.value = null), (v.value = false));
            }),
            watchEffect(() => {
                n.value.length <= 1 && (l.value = false);
            }),
            watchEffect(h => {
                function b(C) {
                    const B = t.hotkey.every(ee => C[ee] || C.code === ee),
                        O = Array.isArray(m.value) ? m.value[0] : m.value;
                    B && ((l.value = true), O == null || O.focus());
                    const z =
                        document.activeElement === m.value ||
                        (O == null ? void 0 : O.contains(document.activeElement));
                    C.code === 'Escape' && z && (l.value = false);
                }
                !ai ||
                    (document.addEventListener('keydown', b),
                    h(() => {
                        document.removeEventListener('keydown', b);
                    }));
            }));
        function _() {
            l.value = true;
        }
        function H() {
            c.value || (l.value = false);
        }
        function L() {
            l.value = false;
        }
        function X() {
            c.value = false;
        }
        function j(h) {
            a.value = h;
        }
        function U(h) {
            const b = a.value.findIndex(C => C.toastId === h.toastId);
            if (b !== -1) a.value[b] = h;
            else {
                const C = a.value.findIndex(B => B.position === h.position);
                C !== -1 ? a.value.splice(C, 0, h) : a.value.unshift(h);
            }
        }
        return (h, b) => (
            openBlock(),
            createElementBlock(
                Fragment,
                null,
                [
                    createCommentVNode(
                        ' Remove item from normal navigation flow, only available via hotkey '
                    ),
                    createBaseVNode(
                        'section',
                        {
                            'aria-label': `${h.containerAriaLabel} ${unref($)}`,
                            tabIndex: -1,
                            'aria-live': 'polite',
                            'aria-relevant': 'additions text',
                            'aria-atomic': 'false'
                        },
                        [
                            (openBlock(true),
                            createElementBlock(
                                Fragment,
                                null,
                                renderList(s.value, (C, B) => {
                                    var O;
                                    return (
                                        openBlock(),
                                        createElementBlock(
                                            'ol',
                                            mergeProps(
                                                {
                                                    key: C,
                                                    ref_for: true,
                                                    ref_key: 'listRef',
                                                    ref: m,
                                                    'data-sonner-toaster': '',
                                                    'data-sonner-theme': f.value,
                                                    class: t.class,
                                                    dir: h.dir === 'auto' ? li() : h.dir,
                                                    tabIndex: -1,
                                                    'data-theme': h.theme,
                                                    'data-rich-colors': h.richColors,
                                                    'data-y-position': C.split('-')[0],
                                                    'data-x-position': C.split('-')[1],
                                                    'data-lifted':
                                                        l.value && n.value.length > 1 && !h.expand,
                                                    style: {
                                                        '--front-toast-height': `${((O = a.value[0]) == null ? void 0 : O.height) || 0}px`,
                                                        '--width': `${unref(xn)}px`,
                                                        '--gap': `${h.gap}px`,
                                                        ...h.style,
                                                        ...unref(o).style,
                                                        ...unref(kn)(h.offset, h.mobileOffset)
                                                    }
                                                },
                                                h.$attrs,
                                                {
                                                    onBlur: x,
                                                    onFocus: u,
                                                    onMouseenter: _,
                                                    onMousemove: _,
                                                    onMouseleave: H,
                                                    onDragend: L,
                                                    onPointerdown: p,
                                                    onPointerup: X
                                                }
                                            ),
                                            [
                                                (openBlock(true),
                                                createElementBlock(
                                                    Fragment,
                                                    null,
                                                    renderList(i(C, B), (z, ee) => {
                                                        var te,
                                                            K,
                                                            Q,
                                                            ne,
                                                            ve,
                                                            fe,
                                                            Ne,
                                                            ot,
                                                            nt,
                                                            it,
                                                            st,
                                                            d,
                                                            F;
                                                        return (
                                                            openBlock(),
                                                            createBlock(
                                                                Hn,
                                                                {
                                                                    key: z.id,
                                                                    heights: a.value,
                                                                    icons: h.icons,
                                                                    index: ee,
                                                                    toast: z,
                                                                    defaultRichColors: h.richColors,
                                                                    duration:
                                                                        (K =
                                                                            (te = h.toastOptions) ==
                                                                            null
                                                                                ? void 0
                                                                                : te.duration) !=
                                                                        null
                                                                            ? K
                                                                            : h.duration,
                                                                    class: normalizeClass(
                                                                        (ne =
                                                                            (Q = h.toastOptions) ==
                                                                            null
                                                                                ? void 0
                                                                                : Q.class) != null
                                                                            ? ne
                                                                            : ''
                                                                    ),
                                                                    descriptionClass:
                                                                        (ve = h.toastOptions) ==
                                                                        null
                                                                            ? void 0
                                                                            : ve.descriptionClass,
                                                                    invert: h.invert,
                                                                    visibleToasts: h.visibleToasts,
                                                                    closeButton:
                                                                        (Ne =
                                                                            (fe = h.toastOptions) ==
                                                                            null
                                                                                ? void 0
                                                                                : fe.closeButton) !=
                                                                        null
                                                                            ? Ne
                                                                            : h.closeButton,
                                                                    interacting: c.value,
                                                                    position: C,
                                                                    style: normalizeStyle(
                                                                        (ot = h.toastOptions) ==
                                                                            null
                                                                            ? void 0
                                                                            : ot.style
                                                                    ),
                                                                    unstyled:
                                                                        (nt = h.toastOptions) ==
                                                                        null
                                                                            ? void 0
                                                                            : nt.unstyled,
                                                                    classes:
                                                                        (it = h.toastOptions) ==
                                                                        null
                                                                            ? void 0
                                                                            : it.classes,
                                                                    cancelButtonStyle:
                                                                        (st = h.toastOptions) ==
                                                                        null
                                                                            ? void 0
                                                                            : st.cancelButtonStyle,
                                                                    actionButtonStyle:
                                                                        (d = h.toastOptions) == null
                                                                            ? void 0
                                                                            : d.actionButtonStyle,
                                                                    'close-button-aria-label':
                                                                        (F = h.toastOptions) == null
                                                                            ? void 0
                                                                            : F.closeButtonAriaLabel,
                                                                    toasts: r.value[C],
                                                                    expandByDefault: h.expand,
                                                                    gap: h.gap,
                                                                    expanded: l.value,
                                                                    swipeDirections:
                                                                        t.swipeDirections,
                                                                    'onUpdate:heights': j,
                                                                    'onUpdate:height': U,
                                                                    onRemoveToast: w
                                                                },
                                                                {
                                                                    'close-icon': withCtx(() => [
                                                                        renderSlot(
                                                                            h.$slots,
                                                                            'close-icon',
                                                                            {},
                                                                            () => [createVNode(Nn)]
                                                                        )
                                                                    ]),
                                                                    'loading-icon': withCtx(() => [
                                                                        renderSlot(
                                                                            h.$slots,
                                                                            'loading-icon',
                                                                            {},
                                                                            () => [
                                                                                createVNode(
                                                                                    Vn,
                                                                                    {
                                                                                        visible:
                                                                                            z.type ===
                                                                                            'loading'
                                                                                    },
                                                                                    null,
                                                                                    8,
                                                                                    ['visible']
                                                                                )
                                                                            ]
                                                                        )
                                                                    ]),
                                                                    'success-icon': withCtx(() => [
                                                                        renderSlot(
                                                                            h.$slots,
                                                                            'success-icon',
                                                                            {},
                                                                            () => [createVNode(Un)]
                                                                        )
                                                                    ]),
                                                                    'error-icon': withCtx(() => [
                                                                        renderSlot(
                                                                            h.$slots,
                                                                            'error-icon',
                                                                            {},
                                                                            () => [createVNode(ii)]
                                                                        )
                                                                    ]),
                                                                    'warning-icon': withCtx(() => [
                                                                        renderSlot(
                                                                            h.$slots,
                                                                            'warning-icon',
                                                                            {},
                                                                            () => [createVNode(ei)]
                                                                        )
                                                                    ]),
                                                                    'info-icon': withCtx(() => [
                                                                        renderSlot(
                                                                            h.$slots,
                                                                            'info-icon',
                                                                            {},
                                                                            () => [createVNode(Xn)]
                                                                        )
                                                                    ]),
                                                                    _: 2
                                                                },
                                                                1032,
                                                                [
                                                                    'heights',
                                                                    'icons',
                                                                    'index',
                                                                    'toast',
                                                                    'defaultRichColors',
                                                                    'duration',
                                                                    'class',
                                                                    'descriptionClass',
                                                                    'invert',
                                                                    'visibleToasts',
                                                                    'closeButton',
                                                                    'interacting',
                                                                    'position',
                                                                    'style',
                                                                    'unstyled',
                                                                    'classes',
                                                                    'cancelButtonStyle',
                                                                    'actionButtonStyle',
                                                                    'close-button-aria-label',
                                                                    'toasts',
                                                                    'expandByDefault',
                                                                    'gap',
                                                                    'expanded',
                                                                    'swipeDirections'
                                                                ]
                                                            )
                                                        );
                                                    }),
                                                    128
                                                ))
                                            ],
                                            16,
                                            ri
                                        )
                                    );
                                }),
                                128
                            ))
                        ],
                        8,
                        si
                    )
                ],
                2112
            )
        );
    }
});
var Ft = ci;
var di = {
    copySuccessText: '复制成功',
    copyCode: '复制代码',
    foldCode: '折叠代码',
    expandCode: '展开代码',
    hideSourceCode: '隐藏源代码'
};
function Ho(e = 'zh') {
    if (typeof window > 'u') return e;
    let t = window.location.pathname.split('/').filter(n => n.length > 0),
        o = /^[a-z]{2}(-[A-Z]{2})?$/;
    for (let n of t) if (o.test(n)) return n;
    return e;
}
function Do(e, t, o) {
    if (o.i18n && o.i18n[t] && o.i18n[t][e]) return o.i18n[t][e];
    let n = o.defaultLanguage || 'zh';
    return o.i18n && o.i18n[n] && o.i18n[n][e]
        ? o.i18n[n][e]
        : e === 'copySuccessText' && o.copySuccessText
          ? o.copySuccessText
          : di[e] || e;
}
var It = () => ({
    copyContent: ref(''),
    clickCopy: async o => {
        await navigator.clipboard.writeText(o);
        const n = window == null ? void 0 : window.demoPreviewConfig;
        let i = '复制成功';
        if (n) {
            const s = Ho(n.defaultLanguage);
            i = Do('copySuccessText', s, n);
        }
        _n.success(i, {
            position: 'top-center',
            closeButton: true
        });
    }
});
var Vt = () => {
    const e = typeof window < 'u' ? window.demoPreviewConfig : null,
        t = computed(() => Ho(e == null ? void 0 : e.defaultLanguage));
    return {
        currentLanguage: t,
        t: n => (e ? Do(n, t.value, e) : n)
    };
};
var ui = ['top', 'right', 'bottom', 'left'];
var po = ['start', 'end'];
var ho = ui.reduce((e, t) => e.concat(t, t + '-' + po[0], t + '-' + po[1]), []);
var Ke = Math.min;
var Le = Math.max;
var pi = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
};
var hi = {
    start: 'end',
    end: 'start'
};
function Pt(e, t, o) {
    return Le(e, Ke(t, o));
}
function De(e, t) {
    return typeof e == 'function' ? e(t) : e;
}
function de(e) {
    return e.split('-')[0];
}
function le(e) {
    return e.split('-')[1];
}
function Mo(e) {
    return e === 'x' ? 'y' : 'x';
}
function Wt(e) {
    return e === 'y' ? 'height' : 'width';
}
var fi = /* @__PURE__ */ new Set(['top', 'bottom']);
function me(e) {
    return fi.has(de(e)) ? 'y' : 'x';
}
function jt(e) {
    return Mo(me(e));
}
function Ro(e, t, o) {
    o === void 0 && (o = false);
    const n = le(e),
        i = jt(e),
        s = Wt(i);
    let r =
        i === 'x'
            ? n === (o ? 'end' : 'start')
                ? 'right'
                : 'left'
            : n === 'start'
              ? 'bottom'
              : 'top';
    return (t.reference[s] > t.floating[s] && (r = ft(r)), [r, ft(r)]);
}
function mi(e) {
    const t = ft(e);
    return [ht(e), t, ht(t)];
}
function ht(e) {
    return e.replace(/start|end/g, t => hi[t]);
}
var fo = ['left', 'right'];
var mo = ['right', 'left'];
var gi = ['top', 'bottom'];
var vi = ['bottom', 'top'];
function wi(e, t, o) {
    switch (e) {
        case 'top':
        case 'bottom':
            return o ? (t ? mo : fo) : t ? fo : mo;
        case 'left':
        case 'right':
            return t ? gi : vi;
        default:
            return [];
    }
}
function yi(e, t, o, n) {
    const i = le(e);
    let s = wi(de(e), o === 'start', n);
    return (i && ((s = s.map(r => r + '-' + i)), t && (s = s.concat(s.map(ht)))), s);
}
function ft(e) {
    return e.replace(/left|right|bottom|top/g, t => pi[t]);
}
function bi(e) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...e
    };
}
function No(e) {
    return typeof e != 'number'
        ? bi(e)
        : {
              top: e,
              right: e,
              bottom: e,
              left: e
          };
}
function Ze(e) {
    const { x: t, y: o, width: n, height: i } = e;
    return {
        width: n,
        height: i,
        top: o,
        left: t,
        right: t + n,
        bottom: o + i,
        x: t,
        y: o
    };
}
function go(e, t, o) {
    let { reference: n, floating: i } = e;
    const s = me(t),
        r = jt(t),
        a = Wt(r),
        l = de(t),
        c = s === 'y',
        f = n.x + n.width / 2 - i.width / 2,
        m = n.y + n.height / 2 - i.height / 2,
        y = n[a] / 2 - i[a] / 2;
    let v;
    switch (l) {
        case 'top':
            v = {
                x: f,
                y: n.y - i.height
            };
            break;
        case 'bottom':
            v = {
                x: f,
                y: n.y + n.height
            };
            break;
        case 'right':
            v = {
                x: n.x + n.width,
                y: m
            };
            break;
        case 'left':
            v = {
                x: n.x - i.width,
                y: m
            };
            break;
        default:
            v = {
                x: n.x,
                y: n.y
            };
    }
    switch (le(t)) {
        case 'start':
            v[r] -= y * (o && c ? -1 : 1);
            break;
        case 'end':
            v[r] += y * (o && c ? -1 : 1);
            break;
    }
    return v;
}
var Ci = async (e, t, o) => {
    const {
            placement: n = 'bottom',
            strategy: i = 'absolute',
            middleware: s = [],
            platform: r
        } = o,
        a = s.filter(Boolean),
        l = await (r.isRTL == null ? void 0 : r.isRTL(t));
    let c = await r.getElementRects({
            reference: e,
            floating: t,
            strategy: i
        }),
        { x: f, y: m } = go(c, n, l),
        y = n,
        v = {},
        $ = 0;
    for (let w = 0; w < a.length; w++) {
        const { name: x, fn: u } = a[w],
            {
                x: p,
                y: _,
                data: H,
                reset: L
            } = await u({
                x: f,
                y: m,
                initialPlacement: n,
                placement: y,
                strategy: i,
                middlewareData: v,
                rects: c,
                platform: r,
                elements: {
                    reference: e,
                    floating: t
                }
            });
        ((f = p != null ? p : f),
            (m = _ != null ? _ : m),
            (v = {
                ...v,
                [x]: {
                    ...v[x],
                    ...H
                }
            }),
            L &&
                $ <= 50 &&
                ($++,
                typeof L == 'object' &&
                    (L.placement && (y = L.placement),
                    L.rects &&
                        (c =
                            L.rects === true
                                ? await r.getElementRects({
                                      reference: e,
                                      floating: t,
                                      strategy: i
                                  })
                                : L.rects),
                    ({ x: f, y: m } = go(c, y, l))),
                (w = -1)));
    }
    return {
        x: f,
        y: m,
        placement: y,
        strategy: i,
        middlewareData: v
    };
};
async function vt(e, t) {
    var o;
    t === void 0 && (t = {});
    const { x: n, y: i, platform: s, rects: r, elements: a, strategy: l } = e,
        {
            boundary: c = 'clippingAncestors',
            rootBoundary: f = 'viewport',
            elementContext: m = 'floating',
            altBoundary: y = false,
            padding: v = 0
        } = De(t, e),
        $ = No(v),
        x = a[y ? (m === 'floating' ? 'reference' : 'floating') : m],
        u = Ze(
            await s.getClippingRect({
                element:
                    (o = await (s.isElement == null ? void 0 : s.isElement(x))) == null || o
                        ? x
                        : x.contextElement ||
                          (await (s.getDocumentElement == null
                              ? void 0
                              : s.getDocumentElement(a.floating))),
                boundary: c,
                rootBoundary: f,
                strategy: l
            })
        ),
        p =
            m === 'floating'
                ? {
                      x: n,
                      y: i,
                      width: r.floating.width,
                      height: r.floating.height
                  }
                : r.reference,
        _ = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)),
        H = (await (s.isElement == null ? void 0 : s.isElement(_)))
            ? (await (s.getScale == null ? void 0 : s.getScale(_))) || {
                  x: 1,
                  y: 1
              }
            : {
                  x: 1,
                  y: 1
              },
        L = Ze(
            s.convertOffsetParentRelativeRectToViewportRelativeRect
                ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
                      elements: a,
                      rect: p,
                      offsetParent: _,
                      strategy: l
                  })
                : p
        );
    return {
        top: (u.top - L.top + $.top) / H.y,
        bottom: (L.bottom - u.bottom + $.bottom) / H.y,
        left: (u.left - L.left + $.left) / H.x,
        right: (L.right - u.right + $.right) / H.x
    };
}
var $i = e => ({
    name: 'arrow',
    options: e,
    async fn(t) {
        const {
                x: o,
                y: n,
                placement: i,
                rects: s,
                platform: r,
                elements: a,
                middlewareData: l
            } = t,
            { element: c, padding: f = 0 } = De(e, t) || {};
        if (c == null) return {};
        const m = No(f),
            y = {
                x: o,
                y: n
            },
            v = jt(i),
            $ = Wt(v),
            w = await r.getDimensions(c),
            x = v === 'y',
            u = x ? 'top' : 'left',
            p = x ? 'bottom' : 'right',
            _ = x ? 'clientHeight' : 'clientWidth',
            H = s.reference[$] + s.reference[v] - y[v] - s.floating[$],
            L = y[v] - s.reference[v],
            X = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c));
        let j = X ? X[_] : 0;
        (!j || !(await (r.isElement == null ? void 0 : r.isElement(X)))) &&
            (j = a.floating[_] || s.floating[$]);
        const U = H / 2 - L / 2,
            h = j / 2 - w[$] / 2 - 1,
            b = Ke(m[u], h),
            C = Ke(m[p], h),
            B = b,
            O = j - w[$] - C,
            z = j / 2 - w[$] / 2 + U,
            ee = Pt(B, z, O),
            te =
                !l.arrow &&
                le(i) != null &&
                z !== ee &&
                s.reference[$] / 2 - (z < B ? b : C) - w[$] / 2 < 0,
            K = te ? (z < B ? z - B : z - O) : 0;
        return {
            [v]: y[v] + K,
            data: {
                [v]: ee,
                centerOffset: z - ee - K,
                ...(te && {
                    alignmentOffset: K
                })
            },
            reset: te
        };
    }
});
function _i(e, t, o) {
    return (
        e
            ? [...o.filter(i => le(i) === e), ...o.filter(i => le(i) !== e)]
            : o.filter(i => de(i) === i)
    ).filter(i => (e ? le(i) === e || (t ? ht(i) !== i : false) : true));
}
var Ti = function (e) {
    return (
        e === void 0 && (e = {}),
        {
            name: 'autoPlacement',
            options: e,
            async fn(t) {
                var o, n, i;
                const { rects: s, middlewareData: r, placement: a, platform: l, elements: c } = t,
                    {
                        crossAxis: f = false,
                        alignment: m,
                        allowedPlacements: y = ho,
                        autoAlignment: v = true,
                        ...$
                    } = De(e, t),
                    w = m !== void 0 || y === ho ? _i(m || null, v, y) : y,
                    x = await vt(t, $),
                    u = ((o = r.autoPlacement) == null ? void 0 : o.index) || 0,
                    p = w[u];
                if (p == null) return {};
                const _ = Ro(p, s, await (l.isRTL == null ? void 0 : l.isRTL(c.floating)));
                if (a !== p)
                    return {
                        reset: {
                            placement: w[0]
                        }
                    };
                const H = [x[de(p)], x[_[0]], x[_[1]]],
                    L = [
                        ...(((n = r.autoPlacement) == null ? void 0 : n.overflows) || []),
                        {
                            placement: p,
                            overflows: H
                        }
                    ],
                    X = w[u + 1];
                if (X)
                    return {
                        data: {
                            index: u + 1,
                            overflows: L
                        },
                        reset: {
                            placement: X
                        }
                    };
                const j = L.map(b => {
                        const C = le(b.placement);
                        return [
                            b.placement,
                            C && f
                                ? b.overflows.slice(0, 2).reduce((B, O) => B + O, 0)
                                : b.overflows[0],
                            b.overflows
                        ];
                    }).sort((b, C) => b[1] - C[1]),
                    h =
                        ((i = j.filter(b =>
                            b[2].slice(0, le(b[0]) ? 2 : 3).every(C => C <= 0)
                        )[0]) == null
                            ? void 0
                            : i[0]) || j[0][0];
                return h !== a
                    ? {
                          data: {
                              index: u + 1,
                              overflows: L
                          },
                          reset: {
                              placement: h
                          }
                      }
                    : {};
            }
        }
    );
};
var xi = function (e) {
    return (
        e === void 0 && (e = {}),
        {
            name: 'flip',
            options: e,
            async fn(t) {
                var o, n;
                const {
                        placement: i,
                        middlewareData: s,
                        rects: r,
                        initialPlacement: a,
                        platform: l,
                        elements: c
                    } = t,
                    {
                        mainAxis: f = true,
                        crossAxis: m = true,
                        fallbackPlacements: y,
                        fallbackStrategy: v = 'bestFit',
                        fallbackAxisSideDirection: $ = 'none',
                        flipAlignment: w = true,
                        ...x
                    } = De(e, t);
                if ((o = s.arrow) != null && o.alignmentOffset) return {};
                const u = de(i),
                    p = me(a),
                    _ = de(a) === a,
                    H = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)),
                    L = y || (_ || !w ? [ft(a)] : mi(a)),
                    X = $ !== 'none';
                !y && X && L.push(...yi(a, w, $, H));
                const j = [a, ...L],
                    U = await vt(t, x),
                    h = [];
                let b = ((n = s.flip) == null ? void 0 : n.overflows) || [];
                if ((f && h.push(U[u]), m)) {
                    const z = Ro(i, r, H);
                    h.push(U[z[0]], U[z[1]]);
                }
                if (
                    ((b = [
                        ...b,
                        {
                            placement: i,
                            overflows: h
                        }
                    ]),
                    !h.every(z => z <= 0))
                ) {
                    var C, B;
                    const z = (((C = s.flip) == null ? void 0 : C.index) || 0) + 1,
                        ee = j[z];
                    if (
                        ee &&
                        (!(m === 'alignment' ? p !== me(ee) : false) ||
                            b.every(Q => Q.overflows[0] > 0 && me(Q.placement) === p))
                    )
                        return {
                            data: {
                                index: z,
                                overflows: b
                            },
                            reset: {
                                placement: ee
                            }
                        };
                    let te =
                        (B = b
                            .filter(K => K.overflows[0] <= 0)
                            .sort((K, Q) => K.overflows[1] - Q.overflows[1])[0]) == null
                            ? void 0
                            : B.placement;
                    if (!te)
                        switch (v) {
                            case 'bestFit': {
                                var O;
                                const K =
                                    (O = b
                                        .filter(Q => {
                                            if (X) {
                                                const ne = me(Q.placement);
                                                return ne === p || ne === 'y';
                                            }
                                            return true;
                                        })
                                        .map(Q => [
                                            Q.placement,
                                            Q.overflows
                                                .filter(ne => ne > 0)
                                                .reduce((ne, ve) => ne + ve, 0)
                                        ])
                                        .sort((Q, ne) => Q[1] - ne[1])[0]) == null
                                        ? void 0
                                        : O[0];
                                K && (te = K);
                                break;
                            }
                            case 'initialPlacement':
                                te = a;
                                break;
                        }
                    if (i !== te)
                        return {
                            reset: {
                                placement: te
                            }
                        };
                }
                return {};
            }
        }
    );
};
var Si = /* @__PURE__ */ new Set(['left', 'top']);
async function Ai(e, t) {
    const { placement: o, platform: n, elements: i } = e,
        s = await (n.isRTL == null ? void 0 : n.isRTL(i.floating)),
        r = de(o),
        a = le(o),
        l = me(o) === 'y',
        c = Si.has(r) ? -1 : 1,
        f = s && l ? -1 : 1,
        m = De(t, e);
    let {
        mainAxis: y,
        crossAxis: v,
        alignmentAxis: $
    } = typeof m == 'number'
        ? {
              mainAxis: m,
              crossAxis: 0,
              alignmentAxis: null
          }
        : {
              mainAxis: m.mainAxis || 0,
              crossAxis: m.crossAxis || 0,
              alignmentAxis: m.alignmentAxis
          };
    return (
        a && typeof $ == 'number' && (v = a === 'end' ? $ * -1 : $),
        l
            ? {
                  x: v * f,
                  y: y * c
              }
            : {
                  x: y * c,
                  y: v * f
              }
    );
}
var Pi = function (e) {
    return (
        e === void 0 && (e = 0),
        {
            name: 'offset',
            options: e,
            async fn(t) {
                var o, n;
                const { x: i, y: s, placement: r, middlewareData: a } = t,
                    l = await Ai(t, e);
                return r === ((o = a.offset) == null ? void 0 : o.placement) &&
                    (n = a.arrow) != null &&
                    n.alignmentOffset
                    ? {}
                    : {
                          x: i + l.x,
                          y: s + l.y,
                          data: {
                              ...l,
                              placement: r
                          }
                      };
            }
        }
    );
};
var Bi = function (e) {
    return (
        e === void 0 && (e = {}),
        {
            name: 'shift',
            options: e,
            async fn(t) {
                const { x: o, y: n, placement: i } = t,
                    {
                        mainAxis: s = true,
                        crossAxis: r = false,
                        limiter: a = {
                            fn: x => {
                                let { x: u, y: p } = x;
                                return {
                                    x: u,
                                    y: p
                                };
                            }
                        },
                        ...l
                    } = De(e, t),
                    c = {
                        x: o,
                        y: n
                    },
                    f = await vt(t, l),
                    m = me(de(i)),
                    y = Mo(m);
                let v = c[y],
                    $ = c[m];
                if (s) {
                    const x = y === 'y' ? 'top' : 'left',
                        u = y === 'y' ? 'bottom' : 'right',
                        p = v + f[x],
                        _ = v - f[u];
                    v = Pt(p, v, _);
                }
                if (r) {
                    const x = m === 'y' ? 'top' : 'left',
                        u = m === 'y' ? 'bottom' : 'right',
                        p = $ + f[x],
                        _ = $ - f[u];
                    $ = Pt(p, $, _);
                }
                const w = a.fn({
                    ...t,
                    [y]: v,
                    [m]: $
                });
                return {
                    ...w,
                    data: {
                        x: w.x - o,
                        y: w.y - n,
                        enabled: {
                            [y]: s,
                            [m]: r
                        }
                    }
                };
            }
        }
    );
};
var ki = function (e) {
    return (
        e === void 0 && (e = {}),
        {
            name: 'size',
            options: e,
            async fn(t) {
                var o, n;
                const { placement: i, rects: s, platform: r, elements: a } = t,
                    { apply: l = () => {}, ...c } = De(e, t),
                    f = await vt(t, c),
                    m = de(i),
                    y = le(i),
                    v = me(i) === 'y',
                    { width: $, height: w } = s.floating;
                let x, u;
                m === 'top' || m === 'bottom'
                    ? ((x = m),
                      (u =
                          y ===
                          ((await (r.isRTL == null ? void 0 : r.isRTL(a.floating)))
                              ? 'start'
                              : 'end')
                              ? 'left'
                              : 'right'))
                    : ((u = m), (x = y === 'end' ? 'top' : 'bottom'));
                const p = w - f.top - f.bottom,
                    _ = $ - f.left - f.right,
                    H = Ke(w - f[x], p),
                    L = Ke($ - f[u], _),
                    X = !t.middlewareData.shift;
                let j = H,
                    U = L;
                if (
                    ((o = t.middlewareData.shift) != null && o.enabled.x && (U = _),
                    (n = t.middlewareData.shift) != null && n.enabled.y && (j = p),
                    X && !y)
                ) {
                    const b = Le(f.left, 0),
                        C = Le(f.right, 0),
                        B = Le(f.top, 0),
                        O = Le(f.bottom, 0);
                    v
                        ? (U = $ - 2 * (b !== 0 || C !== 0 ? b + C : Le(f.left, f.right)))
                        : (j = w - 2 * (B !== 0 || O !== 0 ? B + O : Le(f.top, f.bottom)));
                }
                await l({
                    ...t,
                    availableWidth: U,
                    availableHeight: j
                });
                const h = await r.getDimensions(a.floating);
                return $ !== h.width || w !== h.height
                    ? {
                          reset: {
                              rects: true
                          }
                      }
                    : {};
            }
        }
    );
};
function se(e) {
    var t;
    return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ue(e) {
    return se(e).getComputedStyle(e);
}
var vo = Math.min;
var Ue = Math.max;
var mt = Math.round;
function zo(e) {
    const t = ue(e);
    let o = parseFloat(t.width),
        n = parseFloat(t.height);
    const i = e.offsetWidth,
        s = e.offsetHeight,
        r = mt(o) !== i || mt(n) !== s;
    return (
        r && ((o = i), (n = s)),
        {
            width: o,
            height: n,
            fallback: r
        }
    );
}
function Pe(e) {
    return Io(e) ? (e.nodeName || '').toLowerCase() : '';
}
var dt;
function Fo() {
    if (dt) return dt;
    const e = navigator.userAgentData;
    return e && Array.isArray(e.brands)
        ? ((dt = e.brands.map(t => t.brand + '/' + t.version).join(' ')), dt)
        : navigator.userAgent;
}
function pe(e) {
    return e instanceof se(e).HTMLElement;
}
function Be(e) {
    return e instanceof se(e).Element;
}
function Io(e) {
    return e instanceof se(e).Node;
}
function wo(e) {
    if (typeof ShadowRoot > 'u') return false;
    const t = se(e).ShadowRoot;
    return e instanceof t || e instanceof ShadowRoot;
}
function wt(e) {
    const { overflow: t, overflowX: o, overflowY: n, display: i } = ue(e);
    return /auto|scroll|overlay|hidden|clip/.test(t + n + o) && !['inline', 'contents'].includes(i);
}
function Ei(e) {
    return ['table', 'td', 'th'].includes(Pe(e));
}
function Zt(e) {
    const t = /firefox/i.test(Fo()),
        o = ue(e),
        n = o.backdropFilter || o.WebkitBackdropFilter;
    return (
        o.transform !== 'none' ||
        o.perspective !== 'none' ||
        (n ? n !== 'none' : false) ||
        (t && o.willChange === 'filter') ||
        (t && (o.filter ? o.filter !== 'none' : false)) ||
        ['transform', 'perspective'].some(i => o.willChange.includes(i)) ||
        ['paint', 'layout', 'strict', 'content'].some(i => {
            const s = o.contain;
            return s != null ? s.includes(i) : false;
        })
    );
}
function Vo() {
    return !/^((?!chrome|android).)*safari/i.test(Fo());
}
function Ut(e) {
    return ['html', 'body', '#document'].includes(Pe(e));
}
function Wo(e) {
    return Be(e) ? e : e.contextElement;
}
var jo = {
    x: 1,
    y: 1
};
function Me(e) {
    const t = Wo(e);
    if (!pe(t)) return jo;
    const o = t.getBoundingClientRect(),
        { width: n, height: i, fallback: s } = zo(t);
    let r = (s ? mt(o.width) : o.width) / n,
        a = (s ? mt(o.height) : o.height) / i;
    return (
        (!r || !Number.isFinite(r)) && (r = 1),
        (!a || !Number.isFinite(a)) && (a = 1),
        {
            x: r,
            y: a
        }
    );
}
function Qe(e, t, o, n) {
    var i, s;
    (t === void 0 && (t = false), o === void 0 && (o = false));
    const r = e.getBoundingClientRect(),
        a = Wo(e);
    let l = jo;
    t && (n ? Be(n) && (l = Me(n)) : (l = Me(e)));
    const c = a ? se(a) : window,
        f = !Vo() && o;
    let m = (r.left + ((f && ((i = c.visualViewport) == null ? void 0 : i.offsetLeft)) || 0)) / l.x,
        y = (r.top + ((f && ((s = c.visualViewport) == null ? void 0 : s.offsetTop)) || 0)) / l.y,
        v = r.width / l.x,
        $ = r.height / l.y;
    if (a) {
        const w = se(a),
            x = n && Be(n) ? se(n) : n;
        let u = w.frameElement;
        for (; u && n && x !== w; ) {
            const p = Me(u),
                _ = u.getBoundingClientRect(),
                H = getComputedStyle(u);
            ((_.x += (u.clientLeft + parseFloat(H.paddingLeft)) * p.x),
                (_.y += (u.clientTop + parseFloat(H.paddingTop)) * p.y),
                (m *= p.x),
                (y *= p.y),
                (v *= p.x),
                ($ *= p.y),
                (m += _.x),
                (y += _.y),
                (u = se(u).frameElement));
        }
    }
    return {
        width: v,
        height: $,
        top: y,
        right: m + v,
        bottom: y + $,
        left: m,
        x: m,
        y
    };
}
function ke(e) {
    return ((Io(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function yt(e) {
    return Be(e)
        ? {
              scrollLeft: e.scrollLeft,
              scrollTop: e.scrollTop
          }
        : {
              scrollLeft: e.pageXOffset,
              scrollTop: e.pageYOffset
          };
}
function Li(e) {
    let { rect: t, offsetParent: o, strategy: n } = e;
    const i = pe(o),
        s = ke(o);
    if (o === s) return t;
    let r = {
            scrollLeft: 0,
            scrollTop: 0
        },
        a = {
            x: 1,
            y: 1
        };
    const l = {
        x: 0,
        y: 0
    };
    if ((i || (!i && n !== 'fixed')) && ((Pe(o) !== 'body' || wt(s)) && (r = yt(o)), pe(o))) {
        const c = Qe(o);
        ((a = Me(o)), (l.x = c.x + o.clientLeft), (l.y = c.y + o.clientTop));
    }
    return {
        width: t.width * a.x,
        height: t.height * a.y,
        x: t.x * a.x - r.scrollLeft * a.x + l.x,
        y: t.y * a.y - r.scrollTop * a.y + l.y
    };
}
function Zo(e) {
    return Qe(ke(e)).left + yt(e).scrollLeft;
}
function Oi(e) {
    const t = ke(e),
        o = yt(e),
        n = e.ownerDocument.body,
        i = Ue(t.scrollWidth, t.clientWidth, n.scrollWidth, n.clientWidth),
        s = Ue(t.scrollHeight, t.clientHeight, n.scrollHeight, n.clientHeight);
    let r = -o.scrollLeft + Zo(e);
    const a = -o.scrollTop;
    return (
        ue(n).direction === 'rtl' && (r += Ue(t.clientWidth, n.clientWidth) - i),
        {
            width: i,
            height: s,
            x: r,
            y: a
        }
    );
}
function Je(e) {
    if (Pe(e) === 'html') return e;
    const t = e.assignedSlot || e.parentNode || (wo(e) && e.host) || ke(e);
    return wo(t) ? t.host : t;
}
function Uo(e) {
    const t = Je(e);
    return Ut(t) ? t.ownerDocument.body : pe(t) && wt(t) ? t : Uo(t);
}
function gt(e, t) {
    var o;
    t === void 0 && (t = []);
    const n = Uo(e),
        i = n === ((o = e.ownerDocument) == null ? void 0 : o.body),
        s = se(n);
    return i ? t.concat(s, s.visualViewport || [], wt(n) ? n : []) : t.concat(n, gt(n));
}
function Hi(e, t) {
    const o = se(e),
        n = ke(e),
        i = o.visualViewport;
    let s = n.clientWidth,
        r = n.clientHeight,
        a = 0,
        l = 0;
    if (i) {
        ((s = i.width), (r = i.height));
        const c = Vo();
        (c || (!c && t === 'fixed')) && ((a = i.offsetLeft), (l = i.offsetTop));
    }
    return {
        width: s,
        height: r,
        x: a,
        y: l
    };
}
function Di(e, t) {
    const o = Qe(e, true, t === 'fixed'),
        n = o.top + e.clientTop,
        i = o.left + e.clientLeft,
        s = pe(e)
            ? Me(e)
            : {
                  x: 1,
                  y: 1
              },
        r = e.clientWidth * s.x,
        a = e.clientHeight * s.y,
        l = i * s.x,
        c = n * s.y;
    return {
        width: r,
        height: a,
        x: l,
        y: c
    };
}
function yo(e, t, o) {
    return t === 'viewport' ? Ze(Hi(e, o)) : Be(t) ? Ze(Di(t, o)) : Ze(Oi(ke(e)));
}
function Mi(e, t) {
    const o = t.get(e);
    if (o) return o;
    let n = gt(e).filter(a => Be(a) && Pe(a) !== 'body'),
        i = null;
    const s = ue(e).position === 'fixed';
    let r = s ? Je(e) : e;
    for (; Be(r) && !Ut(r); ) {
        const a = ue(r),
            l = Zt(r);
        ((
            s
                ? !l && !i
                : !l && a.position === 'static' && !!i && ['absolute', 'fixed'].includes(i.position)
        )
            ? (n = n.filter(f => f !== r))
            : (i = a),
            (r = Je(r)));
    }
    return (t.set(e, n), n);
}
function Ri(e) {
    let { element: t, boundary: o, rootBoundary: n, strategy: i } = e;
    const r = [...(o === 'clippingAncestors' ? Mi(t, this._c) : [].concat(o)), n],
        a = r[0],
        l = r.reduce(
            (c, f) => {
                const m = yo(t, f, i);
                return (
                    (c.top = Ue(m.top, c.top)),
                    (c.right = vo(m.right, c.right)),
                    (c.bottom = vo(m.bottom, c.bottom)),
                    (c.left = Ue(m.left, c.left)),
                    c
                );
            },
            yo(t, a, i)
        );
    return {
        width: l.right - l.left,
        height: l.bottom - l.top,
        x: l.left,
        y: l.top
    };
}
function Ni(e) {
    return pe(e) ? zo(e) : e.getBoundingClientRect();
}
function bo(e) {
    return !pe(e) || ue(e).position === 'fixed' ? null : e.offsetParent;
}
function zi(e) {
    let t = Je(e);
    for (; pe(t) && !Ut(t); ) {
        if (Zt(t)) return t;
        t = Je(t);
    }
    return null;
}
function Co(e) {
    const t = se(e);
    let o = bo(e);
    for (; o && Ei(o) && ue(o).position === 'static'; ) o = bo(o);
    return o && (Pe(o) === 'html' || (Pe(o) === 'body' && ue(o).position === 'static' && !Zt(o)))
        ? t
        : o || zi(e) || t;
}
function Fi(e, t, o) {
    const n = pe(t),
        i = ke(t),
        s = Qe(e, true, o === 'fixed', t);
    let r = {
        scrollLeft: 0,
        scrollTop: 0
    };
    const a = {
        x: 0,
        y: 0
    };
    if (n || (!n && o !== 'fixed'))
        if (((Pe(t) !== 'body' || wt(i)) && (r = yt(t)), pe(t))) {
            const l = Qe(t, true);
            ((a.x = l.x + t.clientLeft), (a.y = l.y + t.clientTop));
        } else i && (a.x = Zo(i));
    return {
        x: s.left + r.scrollLeft - a.x,
        y: s.top + r.scrollTop - a.y,
        width: s.width,
        height: s.height
    };
}
var Ii = {
    getClippingRect: Ri,
    convertOffsetParentRelativeRectToViewportRelativeRect: Li,
    isElement: Be,
    getDimensions: Ni,
    getOffsetParent: Co,
    getDocumentElement: ke,
    getScale: Me,
    async getElementRects(e) {
        let { reference: t, floating: o, strategy: n } = e;
        const i = this.getOffsetParent || Co,
            s = this.getDimensions;
        return {
            reference: Fi(t, await i(o), n),
            floating: {
                x: 0,
                y: 0,
                ...(await s(o))
            }
        };
    },
    getClientRects: e => Array.from(e.getClientRects()),
    isRTL: e => ue(e).direction === 'rtl'
};
var Vi = (e, t, o) => {
    const n = /* @__PURE__ */ new Map(),
        i = {
            platform: Ii,
            ...o
        },
        s = {
            ...i.platform,
            _c: n
        };
    return Ci(e, t, {
        ...i,
        platform: s
    });
};
var He = {
    disabled: false,
    distance: 5,
    skidding: 0,
    container: 'body',
    boundary: void 0,
    instantMove: false,
    disposeTimeout: 150,
    popperTriggers: [],
    strategy: 'absolute',
    preventOverflow: true,
    flip: true,
    shift: true,
    overflowPadding: 0,
    arrowPadding: 0,
    arrowOverflow: true,
    autoHideOnMousedown: false,
    themes: {
        tooltip: {
            placement: 'top',
            triggers: ['hover', 'focus', 'touch'],
            hideTriggers: e => [...e, 'click'],
            delay: {
                show: 200,
                hide: 0
            },
            handleResize: false,
            html: false,
            loadingContent: '...'
        },
        dropdown: {
            placement: 'bottom',
            triggers: ['click'],
            delay: 0,
            handleResize: true,
            autoHide: true
        },
        menu: {
            $extend: 'dropdown',
            triggers: ['hover', 'focus'],
            popperTriggers: ['hover'],
            delay: {
                show: 0,
                hide: 400
            }
        }
    }
};
function Bt(e, t) {
    let o = He.themes[e] || {},
        n;
    do
        ((n = o[t]),
            typeof n > 'u'
                ? o.$extend
                    ? (o = He.themes[o.$extend] || {})
                    : ((o = null), (n = He[t]))
                : (o = null));
    while (o);
    return n;
}
function Wi(e) {
    const t = [e];
    let o = He.themes[e] || {};
    do
        o.$extend && !o.$resetCss
            ? (t.push(o.$extend), (o = He.themes[o.$extend] || {}))
            : (o = null);
    while (o);
    return t.map(n => `v-popper--theme-${n}`);
}
function $o(e) {
    const t = [e];
    let o = He.themes[e] || {};
    do o.$extend ? (t.push(o.$extend), (o = He.themes[o.$extend] || {})) : (o = null);
    while (o);
    return t;
}
var et = false;
if (typeof window < 'u') {
    et = false;
    try {
        const e = Object.defineProperty({}, 'passive', {
            get() {
                et = true;
            }
        });
        window.addEventListener('test', null, e);
    } catch {}
}
var Yo = false;
typeof window < 'u' &&
    typeof navigator < 'u' &&
    (Yo = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
var ji = ['auto', 'top', 'bottom', 'left', 'right'].reduce(
    (e, t) => e.concat([t, `${t}-start`, `${t}-end`]),
    []
);
var _o = {
    hover: 'mouseenter',
    focus: 'focus',
    click: 'click',
    touch: 'touchstart',
    pointer: 'pointerdown'
};
var To = {
    hover: 'mouseleave',
    focus: 'blur',
    click: 'click',
    touch: 'touchend',
    pointer: 'pointerup'
};
function xo(e, t) {
    const o = e.indexOf(t);
    o !== -1 && e.splice(o, 1);
}
function $t() {
    return new Promise(e =>
        requestAnimationFrame(() => {
            requestAnimationFrame(e);
        })
    );
}
var re = [];
var Ee = null;
var So = {};
function Ao(e) {
    let t = So[e];
    return (t || (t = So[e] = []), t);
}
var kt = function () {};
typeof window < 'u' && (kt = window.Element);
function E(e) {
    return function (t) {
        return Bt(t.theme, e);
    };
}
var _t = '__floating-vue__popper';
var qo = () =>
    defineComponent({
        name: 'VPopper',
        provide() {
            return {
                [_t]: {
                    parentPopper: this
                }
            };
        },
        inject: {
            [_t]: { default: null }
        },
        props: {
            theme: {
                type: String,
                required: true
            },
            targetNodes: {
                type: Function,
                required: true
            },
            referenceNode: {
                type: Function,
                default: null
            },
            popperNode: {
                type: Function,
                required: true
            },
            shown: {
                type: Boolean,
                default: false
            },
            showGroup: {
                type: String,
                default: null
            },
            ariaId: {
                default: null
            },
            disabled: {
                type: Boolean,
                default: E('disabled')
            },
            positioningDisabled: {
                type: Boolean,
                default: E('positioningDisabled')
            },
            placement: {
                type: String,
                default: E('placement'),
                validator: e => ji.includes(e)
            },
            delay: {
                type: [String, Number, Object],
                default: E('delay')
            },
            distance: {
                type: [Number, String],
                default: E('distance')
            },
            skidding: {
                type: [Number, String],
                default: E('skidding')
            },
            triggers: {
                type: Array,
                default: E('triggers')
            },
            showTriggers: {
                type: [Array, Function],
                default: E('showTriggers')
            },
            hideTriggers: {
                type: [Array, Function],
                default: E('hideTriggers')
            },
            popperTriggers: {
                type: Array,
                default: E('popperTriggers')
            },
            popperShowTriggers: {
                type: [Array, Function],
                default: E('popperShowTriggers')
            },
            popperHideTriggers: {
                type: [Array, Function],
                default: E('popperHideTriggers')
            },
            container: {
                type: [String, Object, kt, Boolean],
                default: E('container')
            },
            boundary: {
                type: [String, kt],
                default: E('boundary')
            },
            strategy: {
                type: String,
                validator: e => ['absolute', 'fixed'].includes(e),
                default: E('strategy')
            },
            autoHide: {
                type: [Boolean, Function],
                default: E('autoHide')
            },
            handleResize: {
                type: Boolean,
                default: E('handleResize')
            },
            instantMove: {
                type: Boolean,
                default: E('instantMove')
            },
            eagerMount: {
                type: Boolean,
                default: E('eagerMount')
            },
            popperClass: {
                type: [String, Array, Object],
                default: E('popperClass')
            },
            computeTransformOrigin: {
                type: Boolean,
                default: E('computeTransformOrigin')
            },
            autoMinSize: {
                type: Boolean,
                default: E('autoMinSize')
            },
            autoSize: {
                type: [Boolean, String],
                default: E('autoSize')
            },
            autoMaxSize: {
                type: Boolean,
                default: E('autoMaxSize')
            },
            autoBoundaryMaxSize: {
                type: Boolean,
                default: E('autoBoundaryMaxSize')
            },
            preventOverflow: {
                type: Boolean,
                default: E('preventOverflow')
            },
            overflowPadding: {
                type: [Number, String],
                default: E('overflowPadding')
            },
            arrowPadding: {
                type: [Number, String],
                default: E('arrowPadding')
            },
            arrowOverflow: {
                type: Boolean,
                default: E('arrowOverflow')
            },
            flip: {
                type: Boolean,
                default: E('flip')
            },
            shift: {
                type: Boolean,
                default: E('shift')
            },
            shiftCrossAxis: {
                type: Boolean,
                default: E('shiftCrossAxis')
            },
            noAutoFocus: {
                type: Boolean,
                default: E('noAutoFocus')
            },
            disposeTimeout: {
                type: Number,
                default: E('disposeTimeout')
            }
        },
        emits: {
            show: () => true,
            hide: () => true,
            'update:shown': e => true,
            'apply-show': () => true,
            'apply-hide': () => true,
            'close-group': () => true,
            'close-directive': () => true,
            'auto-hide': () => true,
            resize: () => true
        },
        data() {
            return {
                isShown: false,
                isMounted: false,
                skipTransition: false,
                classes: {
                    showFrom: false,
                    showTo: false,
                    hideFrom: false,
                    hideTo: true
                },
                result: {
                    x: 0,
                    y: 0,
                    placement: '',
                    strategy: this.strategy,
                    arrow: {
                        x: 0,
                        y: 0,
                        centerOffset: 0
                    },
                    transformOrigin: null
                },
                randomId: `popper_${[Math.random(), Date.now()].map(e => e.toString(36).substring(2, 10)).join('_')}`,
                shownChildren: /* @__PURE__ */ new Set(),
                lastAutoHide: true,
                pendingHide: false,
                containsGlobalTarget: false,
                isDisposed: true,
                mouseDownContains: false
            };
        },
        computed: {
            popperId() {
                return this.ariaId != null ? this.ariaId : this.randomId;
            },
            shouldMountContent() {
                return this.eagerMount || this.isMounted;
            },
            slotData() {
                return {
                    popperId: this.popperId,
                    isShown: this.isShown,
                    shouldMountContent: this.shouldMountContent,
                    skipTransition: this.skipTransition,
                    autoHide:
                        typeof this.autoHide == 'function' ? this.lastAutoHide : this.autoHide,
                    show: this.show,
                    hide: this.hide,
                    handleResize: this.handleResize,
                    onResize: this.onResize,
                    classes: {
                        ...this.classes,
                        popperClass: this.popperClass
                    },
                    result: this.positioningDisabled ? null : this.result,
                    attrs: this.$attrs
                };
            },
            parentPopper() {
                var e;
                return (e = this[_t]) == null ? void 0 : e.parentPopper;
            },
            hasPopperShowTriggerHover() {
                var e, t;
                return (
                    ((e = this.popperTriggers) == null ? void 0 : e.includes('hover')) ||
                    ((t = this.popperShowTriggers) == null ? void 0 : t.includes('hover'))
                );
            }
        },
        watch: {
            shown: '$_autoShowHide',
            disabled(e) {
                e ? this.dispose() : this.init();
            },
            async container() {
                this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
            },
            triggers: {
                handler: '$_refreshListeners',
                deep: true
            },
            positioningDisabled: '$_refreshListeners',
            ...[
                'placement',
                'distance',
                'skidding',
                'boundary',
                'strategy',
                'overflowPadding',
                'arrowPadding',
                'preventOverflow',
                'shift',
                'shiftCrossAxis',
                'flip'
            ].reduce((e, t) => ((e[t] = '$_computePosition'), e), {})
        },
        created() {
            (this.autoMinSize &&
                console.warn(
                    '[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'
                ),
                this.autoMaxSize &&
                    console.warn(
                        '[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.'
                    ));
        },
        mounted() {
            (this.init(), this.$_detachPopperNode());
        },
        activated() {
            this.$_autoShowHide();
        },
        deactivated() {
            this.hide();
        },
        beforeUnmount() {
            this.dispose();
        },
        methods: {
            show({ event: e = null, skipDelay: t = false, force: o = false } = {}) {
                var n, i;
                ((n = this.parentPopper) != null &&
                    n.lockedChild &&
                    this.parentPopper.lockedChild !== this) ||
                    ((this.pendingHide = false),
                    (o || !this.disabled) &&
                        (((i = this.parentPopper) == null ? void 0 : i.lockedChild) === this &&
                            (this.parentPopper.lockedChild = null),
                        this.$_scheduleShow(e, t),
                        this.$emit('show'),
                        (this.$_showFrameLocked = true),
                        requestAnimationFrame(() => {
                            this.$_showFrameLocked = false;
                        })),
                    this.$emit('update:shown', true));
            },
            hide({ event: e = null, skipDelay: t = false } = {}) {
                var o;
                if (!this.$_hideInProgress) {
                    if (this.shownChildren.size > 0) {
                        this.pendingHide = true;
                        return;
                    }
                    if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
                        this.parentPopper &&
                            ((this.parentPopper.lockedChild = this),
                            clearTimeout(this.parentPopper.lockedChildTimer),
                            (this.parentPopper.lockedChildTimer = setTimeout(() => {
                                this.parentPopper.lockedChild === this &&
                                    (this.parentPopper.lockedChild.hide({ skipDelay: t }),
                                    (this.parentPopper.lockedChild = null));
                            }, 1e3)));
                        return;
                    }
                    (((o = this.parentPopper) == null ? void 0 : o.lockedChild) === this &&
                        (this.parentPopper.lockedChild = null),
                        (this.pendingHide = false),
                        this.$_scheduleHide(e, t),
                        this.$emit('hide'),
                        this.$emit('update:shown', false));
                }
            },
            init() {
                var t;
                var e;
                this.isDisposed &&
                    ((this.isDisposed = false),
                    (this.isMounted = false),
                    (this.$_events = []),
                    (this.$_preventShow = false),
                    (this.$_referenceNode =
                        (t = (e = this.referenceNode) == null ? void 0 : e.call(this)) != null
                            ? t
                            : this.$el),
                    (this.$_targetNodes = this.targetNodes().filter(
                        o => o.nodeType === o.ELEMENT_NODE
                    )),
                    (this.$_popperNode = this.popperNode()),
                    (this.$_innerNode = this.$_popperNode.querySelector('.v-popper__inner')),
                    (this.$_arrowNode = this.$_popperNode.querySelector(
                        '.v-popper__arrow-container'
                    )),
                    this.$_swapTargetAttrs('title', 'data-original-title'),
                    this.$_detachPopperNode(),
                    this.triggers.length && this.$_addEventListeners(),
                    this.shown && this.show());
            },
            dispose() {
                this.isDisposed ||
                    ((this.isDisposed = true),
                    this.$_removeEventListeners(),
                    this.hide({ skipDelay: true }),
                    this.$_detachPopperNode(),
                    (this.isMounted = false),
                    (this.isShown = false),
                    this.$_updateParentShownChildren(false),
                    this.$_swapTargetAttrs('data-original-title', 'title'));
            },
            async onResize() {
                this.isShown && (await this.$_computePosition(), this.$emit('resize'));
            },
            async $_computePosition() {
                var n;
                if (this.isDisposed || this.positioningDisabled) return;
                const e = {
                    strategy: this.strategy,
                    middleware: []
                };
                (this.distance || this.skidding) &&
                    e.middleware.push(
                        Pi({
                            mainAxis: this.distance,
                            crossAxis: this.skidding
                        })
                    );
                const t = this.placement.startsWith('auto');
                if (
                    (t
                        ? e.middleware.push(
                              Ti({
                                  alignment: (n = this.placement.split('-')[1]) != null ? n : ''
                              })
                          )
                        : (e.placement = this.placement),
                    this.preventOverflow &&
                        (this.shift &&
                            e.middleware.push(
                                Bi({
                                    padding: this.overflowPadding,
                                    boundary: this.boundary,
                                    crossAxis: this.shiftCrossAxis
                                })
                            ),
                        !t &&
                            this.flip &&
                            e.middleware.push(
                                xi({
                                    padding: this.overflowPadding,
                                    boundary: this.boundary
                                })
                            )),
                    e.middleware.push(
                        $i({
                            element: this.$_arrowNode,
                            padding: this.arrowPadding
                        })
                    ),
                    this.arrowOverflow &&
                        e.middleware.push({
                            name: 'arrowOverflow',
                            fn: ({ placement: i, rects: s, middlewareData: r }) => {
                                let a;
                                const { centerOffset: l } = r.arrow;
                                return (
                                    i.startsWith('top') || i.startsWith('bottom')
                                        ? (a = Math.abs(l) > s.reference.width / 2)
                                        : (a = Math.abs(l) > s.reference.height / 2),
                                    {
                                        data: {
                                            overflow: a
                                        }
                                    }
                                );
                            }
                        }),
                    this.autoMinSize || this.autoSize)
                ) {
                    const i = this.autoSize ? this.autoSize : this.autoMinSize ? 'min' : null;
                    e.middleware.push({
                        name: 'autoSize',
                        fn: ({ rects: s, placement: r, middlewareData: a }) => {
                            var l;
                            if ((l = a.autoSize) != null && l.skip) return {};
                            let c, f;
                            return (
                                r.startsWith('top') || r.startsWith('bottom')
                                    ? (c = s.reference.width)
                                    : (f = s.reference.height),
                                (this.$_innerNode.style[
                                    i === 'min' ? 'minWidth' : i === 'max' ? 'maxWidth' : 'width'
                                ] = c != null ? `${c}px` : null),
                                (this.$_innerNode.style[
                                    i === 'min' ? 'minHeight' : i === 'max' ? 'maxHeight' : 'height'
                                ] = f != null ? `${f}px` : null),
                                {
                                    data: {
                                        skip: true
                                    },
                                    reset: {
                                        rects: true
                                    }
                                }
                            );
                        }
                    });
                }
                (this.autoMaxSize || this.autoBoundaryMaxSize) &&
                    ((this.$_innerNode.style.maxWidth = null),
                    (this.$_innerNode.style.maxHeight = null),
                    e.middleware.push(
                        ki({
                            boundary: this.boundary,
                            padding: this.overflowPadding,
                            apply: ({ availableWidth: i, availableHeight: s }) => {
                                ((this.$_innerNode.style.maxWidth = i != null ? `${i}px` : null),
                                    (this.$_innerNode.style.maxHeight =
                                        s != null ? `${s}px` : null));
                            }
                        })
                    ));
                const o = await Vi(this.$_referenceNode, this.$_popperNode, e);
                Object.assign(this.result, {
                    x: o.x,
                    y: o.y,
                    placement: o.placement,
                    strategy: o.strategy,
                    arrow: {
                        ...o.middlewareData.arrow,
                        ...o.middlewareData.arrowOverflow
                    }
                });
            },
            $_scheduleShow(e, t = false) {
                if (
                    (this.$_updateParentShownChildren(true),
                    (this.$_hideInProgress = false),
                    clearTimeout(this.$_scheduleTimer),
                    Ee && this.instantMove && Ee.instantMove && Ee !== this.parentPopper)
                ) {
                    (Ee.$_applyHide(true), this.$_applyShow(true));
                    return;
                }
                t
                    ? this.$_applyShow()
                    : (this.$_scheduleTimer = setTimeout(
                          this.$_applyShow.bind(this),
                          this.$_computeDelay('show')
                      ));
            },
            $_scheduleHide(e, t = false) {
                if (this.shownChildren.size > 0) {
                    this.pendingHide = true;
                    return;
                }
                (this.$_updateParentShownChildren(false),
                    (this.$_hideInProgress = true),
                    clearTimeout(this.$_scheduleTimer),
                    this.isShown && (Ee = this),
                    t
                        ? this.$_applyHide()
                        : (this.$_scheduleTimer = setTimeout(
                              this.$_applyHide.bind(this),
                              this.$_computeDelay('hide')
                          )));
            },
            $_computeDelay(e) {
                const t = this.delay;
                return parseInt((t && t[e]) || t || 0);
            },
            async $_applyShow(e = false) {
                (clearTimeout(this.$_disposeTimer),
                    clearTimeout(this.$_scheduleTimer),
                    (this.skipTransition = e),
                    !this.isShown &&
                        (this.$_ensureTeleport(),
                        await $t(),
                        await this.$_computePosition(),
                        await this.$_applyShowEffect(),
                        this.positioningDisabled ||
                            this.$_registerEventListeners(
                                [...gt(this.$_referenceNode), ...gt(this.$_popperNode)],
                                'scroll',
                                () => {
                                    this.$_computePosition();
                                }
                            )));
            },
            async $_applyShowEffect() {
                if (this.$_hideInProgress) return;
                if (this.computeTransformOrigin) {
                    const t = this.$_referenceNode.getBoundingClientRect(),
                        o = this.$_popperNode.querySelector('.v-popper__wrapper'),
                        n = o.parentNode.getBoundingClientRect(),
                        i = t.x + t.width / 2 - (n.left + o.offsetLeft),
                        s = t.y + t.height / 2 - (n.top + o.offsetTop);
                    this.result.transformOrigin = `${i}px ${s}px`;
                }
                ((this.isShown = true),
                    this.$_applyAttrsToTarget({
                        'aria-describedby': this.popperId,
                        'data-popper-shown': ''
                    }));
                const e = this.showGroup;
                if (e) {
                    let t;
                    for (let o = 0; o < re.length; o++)
                        ((t = re[o]), t.showGroup !== e && (t.hide(), t.$emit('close-group')));
                }
                (re.push(this), document.body.classList.add('v-popper--some-open'));
                for (const t of $o(this.theme))
                    (Ao(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`));
                (this.$emit('apply-show'),
                    (this.classes.showFrom = true),
                    (this.classes.showTo = false),
                    (this.classes.hideFrom = false),
                    (this.classes.hideTo = false),
                    await $t(),
                    (this.classes.showFrom = false),
                    (this.classes.showTo = true),
                    this.noAutoFocus || this.$_popperNode.focus());
            },
            async $_applyHide(e = false) {
                if (this.shownChildren.size > 0) {
                    ((this.pendingHide = true), (this.$_hideInProgress = false));
                    return;
                }
                if ((clearTimeout(this.$_scheduleTimer), !this.isShown)) return;
                ((this.skipTransition = e),
                    xo(re, this),
                    re.length === 0 && document.body.classList.remove('v-popper--some-open'));
                for (const o of $o(this.theme)) {
                    const n = Ao(o);
                    (xo(n, this),
                        n.length === 0 &&
                            document.body.classList.remove(`v-popper--some-open--${o}`));
                }
                (Ee === this && (Ee = null),
                    (this.isShown = false),
                    this.$_applyAttrsToTarget({
                        'aria-describedby': void 0,
                        'data-popper-shown': void 0
                    }),
                    clearTimeout(this.$_disposeTimer));
                const t = this.disposeTimeout;
                (t !== null &&
                    (this.$_disposeTimer = setTimeout(() => {
                        this.$_popperNode && (this.$_detachPopperNode(), (this.isMounted = false));
                    }, t)),
                    this.$_removeEventListeners('scroll'),
                    this.$emit('apply-hide'),
                    (this.classes.showFrom = false),
                    (this.classes.showTo = false),
                    (this.classes.hideFrom = true),
                    (this.classes.hideTo = false),
                    await $t(),
                    (this.classes.hideFrom = false),
                    (this.classes.hideTo = true));
            },
            $_autoShowHide() {
                this.shown ? this.show() : this.hide();
            },
            $_ensureTeleport() {
                if (this.isDisposed) return;
                let e = this.container;
                if (
                    (typeof e == 'string'
                        ? (e = window.document.querySelector(e))
                        : e === false && (e = this.$_targetNodes[0].parentNode),
                    !e)
                )
                    throw new Error('No container for popover: ' + this.container);
                (e.appendChild(this.$_popperNode), (this.isMounted = true));
            },
            $_addEventListeners() {
                const e = o => {
                    (this.isShown && !this.$_hideInProgress) ||
                        ((o.usedByTooltip = true), !this.$_preventShow && this.show({ event: o }));
                };
                (this.$_registerTriggerListeners(
                    this.$_targetNodes,
                    _o,
                    this.triggers,
                    this.showTriggers,
                    e
                ),
                    this.$_registerTriggerListeners(
                        [this.$_popperNode],
                        _o,
                        this.popperTriggers,
                        this.popperShowTriggers,
                        e
                    ));
                const t = o => {
                    o.usedByTooltip || this.hide({ event: o });
                };
                (this.$_registerTriggerListeners(
                    this.$_targetNodes,
                    To,
                    this.triggers,
                    this.hideTriggers,
                    t
                ),
                    this.$_registerTriggerListeners(
                        [this.$_popperNode],
                        To,
                        this.popperTriggers,
                        this.popperHideTriggers,
                        t
                    ));
            },
            $_registerEventListeners(e, t, o) {
                (this.$_events.push({ targetNodes: e, eventType: t, handler: o }),
                    e.forEach(n =>
                        n.addEventListener(
                            t,
                            o,
                            et
                                ? {
                                      passive: true
                                  }
                                : void 0
                        )
                    ));
            },
            $_registerTriggerListeners(e, t, o, n, i) {
                let s = o;
                (n != null && (s = typeof n == 'function' ? n(s) : n),
                    s.forEach(r => {
                        const a = t[r];
                        a && this.$_registerEventListeners(e, a, i);
                    }));
            },
            $_removeEventListeners(e) {
                const t = [];
                (this.$_events.forEach(o => {
                    const { targetNodes: n, eventType: i, handler: s } = o;
                    !e || e === i ? n.forEach(r => r.removeEventListener(i, s)) : t.push(o);
                }),
                    (this.$_events = t));
            },
            $_refreshListeners() {
                this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
            },
            $_handleGlobalClose(e, t = false) {
                this.$_showFrameLocked ||
                    (this.hide({ event: e }),
                    e.closePopover ? this.$emit('close-directive') : this.$emit('auto-hide'),
                    t &&
                        ((this.$_preventShow = true),
                        setTimeout(() => {
                            this.$_preventShow = false;
                        }, 300)));
            },
            $_detachPopperNode() {
                this.$_popperNode.parentNode &&
                    this.$_popperNode.parentNode.removeChild(this.$_popperNode);
            },
            $_swapTargetAttrs(e, t) {
                for (const o of this.$_targetNodes) {
                    const n = o.getAttribute(e);
                    n && (o.removeAttribute(e), o.setAttribute(t, n));
                }
            },
            $_applyAttrsToTarget(e) {
                for (const t of this.$_targetNodes)
                    for (const o in e) {
                        const n = e[o];
                        n == null ? t.removeAttribute(o) : t.setAttribute(o, n);
                    }
            },
            $_updateParentShownChildren(e) {
                let t = this.parentPopper;
                for (; t; )
                    (e
                        ? t.shownChildren.add(this.randomId)
                        : (t.shownChildren.delete(this.randomId), t.pendingHide && t.hide()),
                        (t = t.parentPopper));
            },
            $_isAimingPopper() {
                const e = this.$_referenceNode.getBoundingClientRect();
                if (Ye >= e.left && Ye <= e.right && qe >= e.top && qe <= e.bottom) {
                    const t = this.$_popperNode.getBoundingClientRect(),
                        o = Ye - xe,
                        n = qe - Se,
                        i =
                            t.left +
                            t.width / 2 -
                            xe +
                            (t.top + t.height / 2) -
                            Se +
                            t.width +
                            t.height,
                        s = xe + o * i,
                        r = Se + n * i;
                    return (
                        ut(xe, Se, s, r, t.left, t.top, t.left, t.bottom) ||
                        ut(xe, Se, s, r, t.left, t.top, t.right, t.top) ||
                        ut(xe, Se, s, r, t.right, t.top, t.right, t.bottom) ||
                        ut(xe, Se, s, r, t.left, t.bottom, t.right, t.bottom)
                    );
                }
                return false;
            }
        },
        render() {
            return this.$slots.default(this.slotData);
        }
    });
if (typeof document < 'u' && typeof window < 'u') {
    if (Yo) {
        const e = et
            ? {
                  passive: true,
                  capture: true
              }
            : true;
        (document.addEventListener('touchstart', t => Po(t), e),
            document.addEventListener('touchend', t => Bo(t, true), e));
    } else
        (window.addEventListener('mousedown', e => Po(e), true),
            window.addEventListener('click', e => Bo(e, false), true));
    window.addEventListener('resize', Yi);
}
function Po(e, t) {
    for (let o = 0; o < re.length; o++) {
        const n = re[o];
        try {
            n.mouseDownContains = n.popperNode().contains(e.target);
        } catch {}
    }
}
function Bo(e, t) {
    Zi(e, t);
}
function Zi(e, t) {
    const o = {};
    for (let n = re.length - 1; n >= 0; n--) {
        const i = re[n];
        try {
            const s = (i.containsGlobalTarget =
                i.mouseDownContains || i.popperNode().contains(e.target));
            ((i.pendingHide = false),
                requestAnimationFrame(() => {
                    if (((i.pendingHide = false), !o[i.randomId] && ko(i, s, e))) {
                        if (
                            (i.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s)
                        ) {
                            let a = i.parentPopper;
                            for (; a; ) ((o[a.randomId] = true), (a = a.parentPopper));
                            return;
                        }
                        let r = i.parentPopper;
                        for (; r && ko(r, r.containsGlobalTarget, e); )
                            (r.$_handleGlobalClose(e, t), (r = r.parentPopper));
                    }
                }));
        } catch {}
    }
}
function ko(e, t, o) {
    return o.closeAllPopover || (o.closePopover && t) || (Ui(e, o) && !t);
}
function Ui(e, t) {
    if (typeof e.autoHide == 'function') {
        const o = e.autoHide(t);
        return ((e.lastAutoHide = o), o);
    }
    return e.autoHide;
}
function Yi() {
    for (let e = 0; e < re.length; e++) re[e].$_computePosition();
}
var xe = 0;
var Se = 0;
var Ye = 0;
var qe = 0;
typeof window < 'u' &&
    window.addEventListener(
        'mousemove',
        e => {
            ((xe = Ye), (Se = qe), (Ye = e.clientX), (qe = e.clientY));
        },
        et
            ? {
                  passive: true
              }
            : void 0
    );
function ut(e, t, o, n, i, s, r, a) {
    const l = ((r - i) * (t - s) - (a - s) * (e - i)) / ((a - s) * (o - e) - (r - i) * (n - t)),
        c = ((o - e) * (t - s) - (n - t) * (e - i)) / ((a - s) * (o - e) - (r - i) * (n - t));
    return l >= 0 && l <= 1 && c >= 0 && c <= 1;
}
var qi = {
    extends: qo()
};
var Yt = (e, t) => {
    const o = e.__vccOpts || e;
    for (const [n, i] of t) o[n] = i;
    return o;
};
function Gi(e, t, o, n, i, s) {
    return (
        openBlock(),
        createElementBlock(
            'div',
            {
                ref: 'reference',
                class: normalizeClass([
                    'v-popper',
                    {
                        'v-popper--shown': e.slotData.isShown
                    }
                ])
            },
            [renderSlot(e.$slots, 'default', normalizeProps(guardReactiveProps(e.slotData)))],
            2
        )
    );
}
var Xi = Yt(qi, [['render', Gi]]);
function Ki() {
    var e = window.navigator.userAgent,
        t = e.indexOf('MSIE ');
    if (t > 0) return parseInt(e.substring(t + 5, e.indexOf('.', t)), 10);
    var o = e.indexOf('Trident/');
    if (o > 0) {
        var n = e.indexOf('rv:');
        return parseInt(e.substring(n + 3, e.indexOf('.', n)), 10);
    }
    var i = e.indexOf('Edge/');
    return i > 0 ? parseInt(e.substring(i + 5, e.indexOf('.', i)), 10) : -1;
}
var pt;
function Et() {
    Et.init || ((Et.init = true), (pt = Ki() !== -1));
}
var bt = {
    name: 'ResizeObserver',
    props: {
        emitOnMount: {
            type: Boolean,
            default: false
        },
        ignoreWidth: {
            type: Boolean,
            default: false
        },
        ignoreHeight: {
            type: Boolean,
            default: false
        }
    },
    emits: ['notify'],
    mounted() {
        (Et(),
            nextTick(() => {
                ((this._w = this.$el.offsetWidth),
                    (this._h = this.$el.offsetHeight),
                    this.emitOnMount && this.emitSize());
            }));
        const e = document.createElement('object');
        ((this._resizeObject = e),
            e.setAttribute('aria-hidden', 'true'),
            e.setAttribute('tabindex', -1),
            (e.onload = this.addResizeHandlers),
            (e.type = 'text/html'),
            pt && this.$el.appendChild(e),
            (e.data = 'about:blank'),
            pt || this.$el.appendChild(e));
    },
    beforeUnmount() {
        this.removeResizeHandlers();
    },
    methods: {
        compareAndNotify() {
            ((!this.ignoreWidth && this._w !== this.$el.offsetWidth) ||
                (!this.ignoreHeight && this._h !== this.$el.offsetHeight)) &&
                ((this._w = this.$el.offsetWidth),
                (this._h = this.$el.offsetHeight),
                this.emitSize());
        },
        emitSize() {
            this.$emit('notify', {
                width: this._w,
                height: this._h
            });
        },
        addResizeHandlers() {
            (this._resizeObject.contentDocument.defaultView.addEventListener(
                'resize',
                this.compareAndNotify
            ),
                this.compareAndNotify());
        },
        removeResizeHandlers() {
            this._resizeObject &&
                this._resizeObject.onload &&
                (!pt &&
                    this._resizeObject.contentDocument &&
                    this._resizeObject.contentDocument.defaultView.removeEventListener(
                        'resize',
                        this.compareAndNotify
                    ),
                this.$el.removeChild(this._resizeObject),
                (this._resizeObject.onload = null),
                (this._resizeObject = null));
        }
    }
};
var Qi = withScopeId('data-v-b329ee4c');
pushScopeId('data-v-b329ee4c');
var Ji = {
    class: 'resize-observer',
    tabindex: '-1'
};
popScopeId();
var es = Qi((e, t, o, n, i, s) => (openBlock(), createBlock('div', Ji)));
bt.render = es;
bt.__scopeId = 'data-v-b329ee4c';
bt.__file = 'src/components/ResizeObserver.vue';
var Go = (e = 'theme') => ({
    computed: {
        themeClass() {
            return Wi(this[e]);
        }
    }
});
var ts = defineComponent({
    name: 'VPopperContent',
    components: {
        ResizeObserver: bt
    },
    mixins: [Go()],
    props: {
        popperId: String,
        theme: String,
        shown: Boolean,
        mounted: Boolean,
        skipTransition: Boolean,
        autoHide: Boolean,
        handleResize: Boolean,
        classes: Object,
        result: Object
    },
    emits: ['hide', 'resize'],
    methods: {
        toPx(e) {
            return e != null && !isNaN(e) ? `${e}px` : null;
        }
    }
});
var os = ['id', 'aria-hidden', 'tabindex', 'data-popper-placement'];
var ns = {
    ref: 'inner',
    class: 'v-popper__inner'
};
var is = createBaseVNode('div', { class: 'v-popper__arrow-outer' }, null, -1);
var ss = createBaseVNode('div', { class: 'v-popper__arrow-inner' }, null, -1);
var rs = [is, ss];
function as(e, t, o, n, i, s) {
    const r = resolveComponent('ResizeObserver');
    return (
        openBlock(),
        createElementBlock(
            'div',
            {
                id: e.popperId,
                ref: 'popover',
                class: normalizeClass([
                    'v-popper__popper',
                    [
                        e.themeClass,
                        e.classes.popperClass,
                        {
                            'v-popper__popper--shown': e.shown,
                            'v-popper__popper--hidden': !e.shown,
                            'v-popper__popper--show-from': e.classes.showFrom,
                            'v-popper__popper--show-to': e.classes.showTo,
                            'v-popper__popper--hide-from': e.classes.hideFrom,
                            'v-popper__popper--hide-to': e.classes.hideTo,
                            'v-popper__popper--skip-transition': e.skipTransition,
                            'v-popper__popper--arrow-overflow': e.result && e.result.arrow.overflow,
                            'v-popper__popper--no-positioning': !e.result
                        }
                    ]
                ]),
                style: normalizeStyle(
                    e.result
                        ? {
                              position: e.result.strategy,
                              transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
                          }
                        : void 0
                ),
                'aria-hidden': e.shown ? 'false' : 'true',
                tabindex: e.autoHide ? 0 : void 0,
                'data-popper-placement': e.result ? e.result.placement : void 0,
                onKeyup: t[2] || (t[2] = withKeys(a => e.autoHide && e.$emit('hide'), ['esc']))
            },
            [
                createBaseVNode('div', {
                    class: 'v-popper__backdrop',
                    onClick: t[0] || (t[0] = a => e.autoHide && e.$emit('hide'))
                }),
                createBaseVNode(
                    'div',
                    {
                        class: 'v-popper__wrapper',
                        style: normalizeStyle(
                            e.result
                                ? {
                                      transformOrigin: e.result.transformOrigin
                                  }
                                : void 0
                        )
                    },
                    [
                        createBaseVNode(
                            'div',
                            ns,
                            [
                                e.mounted
                                    ? (openBlock(),
                                      createElementBlock(
                                          Fragment,
                                          { key: 0 },
                                          [
                                              createBaseVNode('div', null, [
                                                  renderSlot(e.$slots, 'default')
                                              ]),
                                              e.handleResize
                                                  ? (openBlock(),
                                                    createBlock(r, {
                                                        key: 0,
                                                        onNotify:
                                                            t[1] ||
                                                            (t[1] = a => e.$emit('resize', a))
                                                    }))
                                                  : createCommentVNode('', true)
                                          ],
                                          64
                                      ))
                                    : createCommentVNode('', true)
                            ],
                            512
                        ),
                        createBaseVNode(
                            'div',
                            {
                                ref: 'arrow',
                                class: 'v-popper__arrow-container',
                                style: normalizeStyle(
                                    e.result
                                        ? {
                                              left: e.toPx(e.result.arrow.x),
                                              top: e.toPx(e.result.arrow.y)
                                          }
                                        : void 0
                                )
                            },
                            rs,
                            4
                        )
                    ],
                    4
                )
            ],
            46,
            os
        )
    );
}
var Xo = Yt(ts, [['render', as]]);
var Ko = {
    methods: {
        show(...e) {
            return this.$refs.popper.show(...e);
        },
        hide(...e) {
            return this.$refs.popper.hide(...e);
        },
        dispose(...e) {
            return this.$refs.popper.dispose(...e);
        },
        onResize(...e) {
            return this.$refs.popper.onResize(...e);
        }
    }
};
var Lt = function () {};
typeof window < 'u' && (Lt = window.Element);
var ls = defineComponent({
    name: 'VPopperWrapper',
    components: {
        Popper: Xi,
        PopperContent: Xo
    },
    mixins: [Ko, Go('finalTheme')],
    props: {
        theme: {
            type: String,
            default: null
        },
        referenceNode: {
            type: Function,
            default: null
        },
        shown: {
            type: Boolean,
            default: false
        },
        showGroup: {
            type: String,
            default: null
        },
        ariaId: {
            default: null
        },
        disabled: {
            type: Boolean,
            default: void 0
        },
        positioningDisabled: {
            type: Boolean,
            default: void 0
        },
        placement: {
            type: String,
            default: void 0
        },
        delay: {
            type: [String, Number, Object],
            default: void 0
        },
        distance: {
            type: [Number, String],
            default: void 0
        },
        skidding: {
            type: [Number, String],
            default: void 0
        },
        triggers: {
            type: Array,
            default: void 0
        },
        showTriggers: {
            type: [Array, Function],
            default: void 0
        },
        hideTriggers: {
            type: [Array, Function],
            default: void 0
        },
        popperTriggers: {
            type: Array,
            default: void 0
        },
        popperShowTriggers: {
            type: [Array, Function],
            default: void 0
        },
        popperHideTriggers: {
            type: [Array, Function],
            default: void 0
        },
        container: {
            type: [String, Object, Lt, Boolean],
            default: void 0
        },
        boundary: {
            type: [String, Lt],
            default: void 0
        },
        strategy: {
            type: String,
            default: void 0
        },
        autoHide: {
            type: [Boolean, Function],
            default: void 0
        },
        handleResize: {
            type: Boolean,
            default: void 0
        },
        instantMove: {
            type: Boolean,
            default: void 0
        },
        eagerMount: {
            type: Boolean,
            default: void 0
        },
        popperClass: {
            type: [String, Array, Object],
            default: void 0
        },
        computeTransformOrigin: {
            type: Boolean,
            default: void 0
        },
        autoMinSize: {
            type: Boolean,
            default: void 0
        },
        autoSize: {
            type: [Boolean, String],
            default: void 0
        },
        autoMaxSize: {
            type: Boolean,
            default: void 0
        },
        autoBoundaryMaxSize: {
            type: Boolean,
            default: void 0
        },
        preventOverflow: {
            type: Boolean,
            default: void 0
        },
        overflowPadding: {
            type: [Number, String],
            default: void 0
        },
        arrowPadding: {
            type: [Number, String],
            default: void 0
        },
        arrowOverflow: {
            type: Boolean,
            default: void 0
        },
        flip: {
            type: Boolean,
            default: void 0
        },
        shift: {
            type: Boolean,
            default: void 0
        },
        shiftCrossAxis: {
            type: Boolean,
            default: void 0
        },
        noAutoFocus: {
            type: Boolean,
            default: void 0
        },
        disposeTimeout: {
            type: Number,
            default: void 0
        }
    },
    emits: {
        show: () => true,
        hide: () => true,
        'update:shown': e => true,
        'apply-show': () => true,
        'apply-hide': () => true,
        'close-group': () => true,
        'close-directive': () => true,
        'auto-hide': () => true,
        resize: () => true
    },
    computed: {
        finalTheme() {
            var e;
            return (e = this.theme) != null ? e : this.$options.vPopperTheme;
        }
    },
    methods: {
        getTargetNodes() {
            return Array.from(this.$el.children).filter(e => e !== this.$refs.popperContent.$el);
        }
    }
});
function cs(e, t, o, n, i, s) {
    const r = resolveComponent('PopperContent'),
        a = resolveComponent('Popper');
    return (
        openBlock(),
        createBlock(
            a,
            mergeProps({ ref: 'popper' }, e.$props, {
                theme: e.finalTheme,
                'target-nodes': e.getTargetNodes,
                'popper-node': () => e.$refs.popperContent.$el,
                class: [e.themeClass],
                onShow: t[0] || (t[0] = () => e.$emit('show')),
                onHide: t[1] || (t[1] = () => e.$emit('hide')),
                'onUpdate:shown': t[2] || (t[2] = l => e.$emit('update:shown', l)),
                onApplyShow: t[3] || (t[3] = () => e.$emit('apply-show')),
                onApplyHide: t[4] || (t[4] = () => e.$emit('apply-hide')),
                onCloseGroup: t[5] || (t[5] = () => e.$emit('close-group')),
                onCloseDirective: t[6] || (t[6] = () => e.$emit('close-directive')),
                onAutoHide: t[7] || (t[7] = () => e.$emit('auto-hide')),
                onResize: t[8] || (t[8] = () => e.$emit('resize'))
            }),
            {
                default: withCtx(
                    ({
                        popperId: l,
                        isShown: c,
                        shouldMountContent: f,
                        skipTransition: m,
                        autoHide: y,
                        show: v,
                        hide: $,
                        handleResize: w,
                        onResize: x,
                        classes: u,
                        result: p
                    }) => [
                        renderSlot(e.$slots, 'default', {
                            shown: c,
                            show: v,
                            hide: $
                        }),
                        createVNode(
                            r,
                            {
                                ref: 'popperContent',
                                'popper-id': l,
                                theme: e.finalTheme,
                                shown: c,
                                mounted: f,
                                'skip-transition': m,
                                'auto-hide': y,
                                'handle-resize': w,
                                classes: u,
                                result: p,
                                onHide: $,
                                onResize: x
                            },
                            {
                                default: withCtx(() => [
                                    renderSlot(e.$slots, 'popper', {
                                        shown: c,
                                        hide: $
                                    })
                                ]),
                                _: 2
                            },
                            1032,
                            [
                                'popper-id',
                                'theme',
                                'shown',
                                'mounted',
                                'skip-transition',
                                'auto-hide',
                                'handle-resize',
                                'classes',
                                'result',
                                'onHide',
                                'onResize'
                            ]
                        )
                    ]
                ),
                _: 3
            },
            16,
            ['theme', 'target-nodes', 'popper-node', 'class']
        )
    );
}
var qt = Yt(ls, [['render', cs]]);
({
    ...qt
});
({
    ...qt
});
var ds = {
    ...qt,
    name: 'VTooltip',
    vPopperTheme: 'tooltip'
};
defineComponent({
    name: 'VTooltipDirective',
    components: {
        Popper: qo(),
        PopperContent: Xo
    },
    mixins: [Ko],
    inheritAttrs: false,
    props: {
        theme: {
            type: String,
            default: 'tooltip'
        },
        html: {
            type: Boolean,
            default: e => Bt(e.theme, 'html')
        },
        content: {
            type: [String, Number, Function],
            default: null
        },
        loadingContent: {
            type: String,
            default: e => Bt(e.theme, 'loadingContent')
        },
        targetNodes: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            asyncContent: null
        };
    },
    computed: {
        isContentAsync() {
            return typeof this.content == 'function';
        },
        loading() {
            return this.isContentAsync && this.asyncContent == null;
        },
        finalContent() {
            return this.isContentAsync
                ? this.loading
                    ? this.loadingContent
                    : this.asyncContent
                : this.content;
        }
    },
    watch: {
        content: {
            handler() {
                this.fetchContent(true);
            },
            immediate: true
        },
        async finalContent() {
            (await this.$nextTick(), this.$refs.popper.onResize());
        }
    },
    created() {
        this.$_fetchId = 0;
    },
    methods: {
        fetchContent(e) {
            if (
                typeof this.content == 'function' &&
                this.$_isShown &&
                (e || (!this.$_loading && this.asyncContent == null))
            ) {
                ((this.asyncContent = null), (this.$_loading = true));
                const t = ++this.$_fetchId,
                    o = this.content(this);
                o.then ? o.then(n => this.onResult(t, n)) : this.onResult(t, o);
            }
        },
        onResult(e, t) {
            e === this.$_fetchId && ((this.$_loading = false), (this.asyncContent = t));
        },
        onShow() {
            ((this.$_isShown = true), this.fetchContent());
        },
        onHide() {
            this.$_isShown = false;
        }
    }
});
var ge = ds;
var us = ['innerHTML'];
var ps = ['innerHTML'];
var vs = defineComponent({
    __name: 'AntDesign',
    props: {
        code: {},
        showCode: {},
        title: { default: '默认标题' },
        description: { default: '描述内容' }
    },
    setup(e) {
        const t = e,
            o = Nt(),
            { isCodeFold: n, setCodeFold: i } = zt(),
            { clickCopy: s } = It(),
            { t: r } = Vt(),
            a = ref(decodeURIComponent(t.code)),
            l = ref(decodeURIComponent(t.showCode)),
            c = ref(null),
            f = ref(false),
            m = computed(() => !n.value),
            y = () => {
                s(a.value);
            },
            v = () => {
                var p;
                const u = (p = c.value) == null ? void 0 : p.closest('[class*="__container"]');
                if (u) {
                    const _ = u.getBoundingClientRect(),
                        H = window.pageYOffset || document.documentElement.scrollTop,
                        L = _.top + H - 120;
                    window.scrollTo({
                        top: L,
                        behavior: 'smooth'
                    });
                }
            },
            $ = computed(() => {
                var u;
                return c.value ? ((u = c.value) == null ? void 0 : u.clientHeight) : 0;
            }),
            w = () => {
                if (!c.value) return;
                const u = c.value.getBoundingClientRect(),
                    p = window.innerHeight;
                (u.top < 0, u.bottom > p);
                const _ = u.top >= 0 && u.bottom <= p;
                f.value = !_;
            },
            x = u => {
                (n.value ? (c.value.style.height = '0px') : (c.value.style.height = `${u}px`),
                    n.value || setTimeout(w, 100));
            };
        return (
            onMounted(() => {
                const u = $.value;
                (x(u),
                    window.addEventListener('resize', w),
                    window.addEventListener('scroll', w, { passive: true }));
            }),
            onUnmounted(() => {
                (window.removeEventListener('resize', w), window.removeEventListener('scroll', w));
            }),
            watch(n, () => {
                const u = $.value;
                x(u);
            }),
            (u, p) => (
                openBlock(),
                createElementBlock(
                    Fragment,
                    null,
                    [
                        createBaseVNode(
                            'div',
                            {
                                class: normalizeClass([unref(o).e('ant-design__container')])
                            },
                            [
                                createBaseVNode(
                                    'section',
                                    {
                                        class: normalizeClass([unref(o).bem('preview')])
                                    },
                                    [renderSlot(u.$slots, 'default')],
                                    2
                                ),
                                createBaseVNode(
                                    'section',
                                    {
                                        class: normalizeClass([unref(o).bem('description')])
                                    },
                                    [
                                        t.title
                                            ? (openBlock(),
                                              createElementBlock(
                                                  'div',
                                                  {
                                                      key: 0,
                                                      class: normalizeClass([
                                                          unref(o).bem('description', 'title')
                                                      ])
                                                  },
                                                  toDisplayString(u.title),
                                                  3
                                              ))
                                            : createCommentVNode('', true),
                                        t.description
                                            ? (openBlock(),
                                              createElementBlock(
                                                  'div',
                                                  {
                                                      key: 1,
                                                      class: normalizeClass([
                                                          unref(o).bem('description', 'content')
                                                      ]),
                                                      innerHTML: u.description
                                                  },
                                                  null,
                                                  10,
                                                  us
                                              ))
                                            : createCommentVNode('', true),
                                        t.description || (!t.title && !t.description)
                                            ? (openBlock(),
                                              createElementBlock(
                                                  'div',
                                                  {
                                                      key: 2,
                                                      class: normalizeClass([
                                                          unref(o).bem('description', 'split-line')
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
                                                    unref(o).bem('description', 'handle-btn')
                                                ])
                                            },
                                            [
                                                createVNode(
                                                    unref(ge),
                                                    { placement: 'bottom' },
                                                    {
                                                        popper: withCtx(() => [
                                                            createTextVNode(
                                                                toDisplayString(
                                                                    unref(r)('copyCode')
                                                                ),
                                                                1
                                                            )
                                                        ]),
                                                        default: withCtx(() => [
                                                            createVNode(Rt, { onClick: y })
                                                        ]),
                                                        _: 1
                                                    }
                                                ),
                                                unref(n)
                                                    ? (openBlock(),
                                                      createBlock(
                                                          unref(ge),
                                                          {
                                                              key: 1,
                                                              placement: 'bottom'
                                                          },
                                                          {
                                                              popper: withCtx(() => [
                                                                  createTextVNode(
                                                                      toDisplayString(
                                                                          unref(r)('expandCode')
                                                                      ),
                                                                      1
                                                                  )
                                                              ]),
                                                              default: withCtx(() => [
                                                                  createVNode(Mt, {
                                                                      onClick:
                                                                          p[1] ||
                                                                          (p[1] = _ =>
                                                                              unref(i)(false))
                                                                  })
                                                              ]),
                                                              _: 1
                                                          }
                                                      ))
                                                    : (openBlock(),
                                                      createBlock(
                                                          unref(ge),
                                                          {
                                                              key: 0,
                                                              placement: 'bottom'
                                                          },
                                                          {
                                                              popper: withCtx(() => [
                                                                  createTextVNode(
                                                                      toDisplayString(
                                                                          unref(r)('foldCode')
                                                                      ),
                                                                      1
                                                                  )
                                                              ]),
                                                              default: withCtx(() => [
                                                                  createVNode(Re, {
                                                                      onClick:
                                                                          p[0] ||
                                                                          (p[0] = _ =>
                                                                              unref(i)(true))
                                                                  })
                                                              ]),
                                                              _: 1
                                                          }
                                                      ))
                                            ],
                                            2
                                        )
                                    ],
                                    2
                                ),
                                createBaseVNode(
                                    'section',
                                    {
                                        class: normalizeClass([unref(o).bem('source')]),
                                        ref_key: 'sourceCodeArea',
                                        ref: c
                                    },
                                    [
                                        createBaseVNode(
                                            'div',
                                            {
                                                innerHTML: l.value,
                                                class: 'language-vue'
                                            },
                                            null,
                                            8,
                                            ps
                                        )
                                    ],
                                    2
                                ),
                                m.value
                                    ? (openBlock(),
                                      createElementBlock(
                                          'div',
                                          {
                                              key: 0,
                                              class: normalizeClass([
                                                  unref(o).bem('bottom-close-button')
                                              ]),
                                              onClick:
                                                  p[2] ||
                                                  (p[2] = () => {
                                                      (unref(i)(true), v());
                                                  })
                                          },
                                          [
                                              createVNode(Re),
                                              p[3] ||
                                                  (p[3] = createBaseVNode(
                                                      'span',
                                                      null,
                                                      '隐藏源代码',
                                                      -1
                                                  ))
                                          ],
                                          2
                                      ))
                                    : createCommentVNode('', true)
                            ],
                            2
                        ),
                        createVNode(unref(Ft), {
                            expand: true,
                            closeButton: '',
                            richColors: ''
                        })
                    ],
                    64
                )
            )
        );
    }
});
var hs = ['innerHTML'];
var ws = defineComponent({
    __name: 'ElementPlus',
    props: {
        code: {},
        showCode: {},
        title: { default: '默认标题' },
        description: { default: '描述内容' }
    },
    setup(e) {
        const t = e,
            o = Nt(),
            { isCodeFold: n, setCodeFold: i } = zt(),
            { clickCopy: s } = It(),
            { t: r } = Vt(),
            a = ref(decodeURIComponent(t.code)),
            l = ref(decodeURIComponent(t.showCode)),
            c = ref(null),
            f = ref(false),
            m = computed(() => !n.value),
            y = () => {
                s(a.value);
            },
            v = () => {
                var p;
                const u = (p = c.value) == null ? void 0 : p.closest('[class*="__container"]');
                if (u) {
                    const _ = u.getBoundingClientRect(),
                        H = window.pageYOffset || document.documentElement.scrollTop,
                        L = _.top + H - 120;
                    window.scrollTo({
                        top: L,
                        behavior: 'smooth'
                    });
                }
            },
            $ = computed(() => {
                var u;
                return c.value ? ((u = c.value) == null ? void 0 : u.clientHeight) : 0;
            }),
            w = () => {
                if (!c.value) return;
                const u = c.value.getBoundingClientRect(),
                    p = window.innerHeight;
                (u.top < 0, u.bottom > p);
                const _ = u.top >= 0 && u.bottom <= p;
                f.value = !_;
            },
            x = u => {
                (n.value ? (c.value.style.height = '0px') : (c.value.style.height = `${u}px`),
                    n.value || setTimeout(w, 100));
            };
        return (
            onMounted(() => {
                const u = $.value;
                (x(u),
                    window.addEventListener('resize', w),
                    window.addEventListener('scroll', w, { passive: true }));
            }),
            onUnmounted(() => {
                (window.removeEventListener('resize', w), window.removeEventListener('scroll', w));
            }),
            watch(n, () => {
                const u = $.value;
                x(u);
            }),
            (u, p) => (
                openBlock(),
                createElementBlock(
                    Fragment,
                    null,
                    [
                        createBaseVNode(
                            'div',
                            {
                                class: normalizeClass([unref(o).e('element-plus__container')])
                            },
                            [
                                createBaseVNode(
                                    'section',
                                    {
                                        class: normalizeClass([unref(o).bem('preview')])
                                    },
                                    [renderSlot(u.$slots, 'default')],
                                    2
                                ),
                                createBaseVNode(
                                    'section',
                                    {
                                        class: normalizeClass([unref(o).bem('description')])
                                    },
                                    [
                                        createBaseVNode(
                                            'div',
                                            {
                                                class: normalizeClass([
                                                    unref(o).bem('description', 'split-line')
                                                ])
                                            },
                                            null,
                                            2
                                        ),
                                        createBaseVNode(
                                            'div',
                                            {
                                                class: normalizeClass([
                                                    unref(o).bem('description', 'handle-btn')
                                                ])
                                            },
                                            [
                                                createVNode(
                                                    unref(ge),
                                                    { placement: 'bottom' },
                                                    {
                                                        popper: withCtx(() => [
                                                            createTextVNode(
                                                                toDisplayString(
                                                                    unref(r)('copyCode')
                                                                ),
                                                                1
                                                            )
                                                        ]),
                                                        default: withCtx(() => [
                                                            createVNode(Rt, { onClick: y })
                                                        ]),
                                                        _: 1
                                                    }
                                                ),
                                                unref(n)
                                                    ? (openBlock(),
                                                      createBlock(
                                                          unref(ge),
                                                          {
                                                              key: 1,
                                                              placement: 'bottom'
                                                          },
                                                          {
                                                              popper: withCtx(() => [
                                                                  createTextVNode(
                                                                      toDisplayString(
                                                                          unref(r)('expandCode')
                                                                      ),
                                                                      1
                                                                  )
                                                              ]),
                                                              default: withCtx(() => [
                                                                  createVNode(Mt, {
                                                                      onClick:
                                                                          p[1] ||
                                                                          (p[1] = _ =>
                                                                              unref(i)(false))
                                                                  })
                                                              ]),
                                                              _: 1
                                                          }
                                                      ))
                                                    : (openBlock(),
                                                      createBlock(
                                                          unref(ge),
                                                          {
                                                              key: 0,
                                                              placement: 'bottom'
                                                          },
                                                          {
                                                              popper: withCtx(() => [
                                                                  createTextVNode(
                                                                      toDisplayString(
                                                                          unref(r)('foldCode')
                                                                      ),
                                                                      1
                                                                  )
                                                              ]),
                                                              default: withCtx(() => [
                                                                  createVNode(Re, {
                                                                      onClick:
                                                                          p[0] ||
                                                                          (p[0] = _ =>
                                                                              unref(i)(true))
                                                                  })
                                                              ]),
                                                              _: 1
                                                          }
                                                      ))
                                            ],
                                            2
                                        )
                                    ],
                                    2
                                ),
                                createBaseVNode(
                                    'section',
                                    {
                                        class: normalizeClass([unref(o).bem('source')]),
                                        ref_key: 'sourceCodeArea',
                                        ref: c
                                    },
                                    [
                                        createBaseVNode(
                                            'div',
                                            {
                                                innerHTML: l.value,
                                                class: 'language-vue'
                                            },
                                            null,
                                            8,
                                            hs
                                        )
                                    ],
                                    2
                                ),
                                m.value
                                    ? (openBlock(),
                                      createElementBlock(
                                          'div',
                                          {
                                              key: 0,
                                              class: normalizeClass([
                                                  unref(o).bem('bottom-close-button')
                                              ]),
                                              onClick:
                                                  p[2] ||
                                                  (p[2] = () => {
                                                      (unref(i)(true), v());
                                                  })
                                          },
                                          [
                                              createVNode(Re),
                                              p[3] ||
                                                  (p[3] = createBaseVNode(
                                                      'span',
                                                      null,
                                                      '隐藏源代码',
                                                      -1
                                                  ))
                                          ],
                                          2
                                      ))
                                    : createCommentVNode('', true)
                            ],
                            2
                        ),
                        createVNode(unref(Ft), {
                            expand: true,
                            closeButton: '',
                            richColors: ''
                        })
                    ],
                    64
                )
            )
        );
    }
});
var fs = ['innerHTML'];
var ys = defineComponent({
    __name: 'NaiveUI',
    props: {
        code: {},
        showCode: {},
        title: { default: '默认标题' },
        description: { default: '描述内容' }
    },
    setup(e) {
        const t = e,
            o = Nt(),
            { isCodeFold: n, setCodeFold: i } = zt(),
            { clickCopy: s } = It(),
            { t: r } = Vt();
        watch(
            () => n.value,
            u => {
                w();
            }
        );
        const a = ref(decodeURIComponent(t.code)),
            l = ref(decodeURIComponent(t.showCode)),
            c = ref(null),
            f = ref(false),
            m = computed(() => !n.value),
            y = () => {
                s(a.value);
            },
            v = () => {
                var p;
                const u = (p = c.value) == null ? void 0 : p.closest('[class*="__container"]');
                if (u) {
                    const _ = u.getBoundingClientRect(),
                        H = window.pageYOffset || document.documentElement.scrollTop,
                        L = _.top + H - 120;
                    window.scrollTo({
                        top: L,
                        behavior: 'smooth'
                    });
                }
            },
            $ = computed(() => {
                var u;
                return c.value ? ((u = c.value) == null ? void 0 : u.clientHeight) : 0;
            }),
            w = () => {
                if (!c.value) return;
                const u = c.value.getBoundingClientRect(),
                    p = window.innerHeight;
                (u.top < 0, u.bottom > p);
                const _ = u.top >= 0 && u.bottom <= p;
                f.value = !_;
            },
            x = u => {
                (n.value ? (c.value.style.height = '0px') : (c.value.style.height = `${u}px`),
                    n.value || setTimeout(w, 100));
            };
        return (
            onMounted(() => {
                const u = $.value;
                (x(u),
                    window.addEventListener('resize', w),
                    window.addEventListener('scroll', w, { passive: true }));
            }),
            onUnmounted(() => {
                (window.removeEventListener('resize', w), window.removeEventListener('scroll', w));
            }),
            watch(n, () => {
                const u = $.value;
                x(u);
            }),
            (u, p) => (
                openBlock(),
                createElementBlock(
                    Fragment,
                    null,
                    [
                        createBaseVNode(
                            'div',
                            {
                                class: normalizeClass([unref(o).e('naive-ui__container')])
                            },
                            [
                                createBaseVNode(
                                    'section',
                                    {
                                        class: normalizeClass([unref(o).bem('name_handle')])
                                    },
                                    [
                                        t.title
                                            ? (openBlock(),
                                              createElementBlock(
                                                  'div',
                                                  {
                                                      key: 0,
                                                      class: normalizeClass([
                                                          unref(o).bem('component', 'name')
                                                      ])
                                                  },
                                                  toDisplayString(u.title),
                                                  3
                                              ))
                                            : createCommentVNode('', true),
                                        createBaseVNode(
                                            'div',
                                            {
                                                class: normalizeClass([
                                                    unref(o).bem('description', 'btns')
                                                ])
                                            },
                                            [
                                                createVNode(
                                                    unref(ge),
                                                    { placement: 'bottom' },
                                                    {
                                                        popper: withCtx(() => [
                                                            createTextVNode(
                                                                toDisplayString(
                                                                    unref(r)('copyCode')
                                                                ),
                                                                1
                                                            )
                                                        ]),
                                                        default: withCtx(() => [
                                                            createVNode(Rt, { onClick: y })
                                                        ]),
                                                        _: 1
                                                    }
                                                ),
                                                unref(n)
                                                    ? (openBlock(),
                                                      createBlock(
                                                          unref(ge),
                                                          {
                                                              key: 1,
                                                              placement: 'bottom'
                                                          },
                                                          {
                                                              popper: withCtx(() => [
                                                                  createTextVNode(
                                                                      toDisplayString(
                                                                          unref(r)('expandCode')
                                                                      ),
                                                                      1
                                                                  )
                                                              ]),
                                                              default: withCtx(() => [
                                                                  createVNode(Mt, {
                                                                      onClick:
                                                                          p[1] ||
                                                                          (p[1] = _ =>
                                                                              unref(i)(false))
                                                                  })
                                                              ]),
                                                              _: 1
                                                          }
                                                      ))
                                                    : (openBlock(),
                                                      createBlock(
                                                          unref(ge),
                                                          {
                                                              key: 0,
                                                              placement: 'bottom'
                                                          },
                                                          {
                                                              popper: withCtx(() => [
                                                                  createTextVNode(
                                                                      toDisplayString(
                                                                          unref(r)('foldCode')
                                                                      ),
                                                                      1
                                                                  )
                                                              ]),
                                                              default: withCtx(() => [
                                                                  createVNode(Re, {
                                                                      onClick:
                                                                          p[0] ||
                                                                          (p[0] = _ =>
                                                                              unref(i)(true))
                                                                  })
                                                              ]),
                                                              _: 1
                                                          }
                                                      ))
                                            ],
                                            2
                                        )
                                    ],
                                    2
                                ),
                                t.description
                                    ? (openBlock(),
                                      createElementBlock(
                                          'section',
                                          {
                                              key: 0,
                                              class: normalizeClass([unref(o).bem('description')])
                                          },
                                          [
                                              createBaseVNode(
                                                  'span',
                                                  null,
                                                  toDisplayString(u.description),
                                                  1
                                              )
                                          ],
                                          2
                                      ))
                                    : createCommentVNode('', true),
                                createBaseVNode(
                                    'section',
                                    {
                                        class: normalizeClass([unref(o).bem('preview')])
                                    },
                                    [renderSlot(u.$slots, 'default')],
                                    2
                                ),
                                createBaseVNode(
                                    'section',
                                    {
                                        class: normalizeClass([unref(o).bem('source')]),
                                        ref_key: 'sourceCodeArea',
                                        ref: c
                                    },
                                    [
                                        createBaseVNode(
                                            'div',
                                            {
                                                innerHTML: l.value,
                                                class: 'language-vue'
                                            },
                                            null,
                                            8,
                                            fs
                                        )
                                    ],
                                    2
                                ),
                                m.value
                                    ? (openBlock(),
                                      createElementBlock(
                                          'div',
                                          {
                                              key: 1,
                                              class: normalizeClass([
                                                  unref(o).bem('bottom-close-button')
                                              ]),
                                              onClick:
                                                  p[2] ||
                                                  (p[2] = () => {
                                                      (unref(i)(true), v());
                                                  })
                                          },
                                          [
                                              createVNode(Re),
                                              createBaseVNode(
                                                  'span',
                                                  null,
                                                  toDisplayString(unref(r)('hideSourceCode')),
                                                  1
                                              )
                                          ],
                                          2
                                      ))
                                    : createCommentVNode('', true)
                            ],
                            2
                        ),
                        createVNode(unref(Ft), {
                            expand: true,
                            closeButton: '',
                            richColors: ''
                        })
                    ],
                    64
                )
            )
        );
    }
});
export { vs as AntDesignContainer, ws as ElementPlusContainer, ys as NaiveUIContainer };
//# sourceMappingURL=@vitepress-demo-preview_component.js.map

import { computed, createVNode, defineComponent, type VNode } from 'vue';
import { NueDivider } from '../divider';
import { parseFlex, parseFlexWrap, parseTheme } from '@nue-ui/utils';
import './div.css';

export default defineComponent({
    name: 'NueDiv',
    props: {
        direction: String,
        vertical: Boolean,
        align: String,
        justify: String,
        flex: String,
        wrap: String,
        gap: String,
        width: String,
        height: String,
        divider: { type: [String, Number, Boolean, Object], default: null },
        theme: [String, Array<string>],
        inline: Boolean,
        overflow: String,
        autoFit: Boolean
    },
    setup(props, { slots }) {
        const classes = computed(() => {
            const prefix = 'nue-div';
            return [prefix, ...parseTheme(props.theme, prefix)];
        });

        const direction = computed(() => {
            return props.direction ? props.direction : props.vertical ? 'column' : 'row';
        });

        const style = computed(() => ({
            '--nue-div-width': props.width,
            '--nue-div-height': props.height,
            '--nue-div-flex-direction': direction.value,
            '--nue-div-align-items': props.align,
            '--nue-div-justify-content': props.justify,
            '--nue-div-flex-wrap': parseFlexWrap(props.wrap as string),
            '--nue-div-gap': props.gap,
            '--nue-div-flex': parseFlex(props.flex as string),
            '--nue-div-overflow': props.overflow,
            display: props.inline ? 'inline-flex' : void 0
        }));

        function createDivider() {
            const { divider, vertical } = props;
            if (typeof divider === 'object' && divider !== null) {
                const direction = vertical ? 'horizontal' : 'vertical';
                return createVNode(NueDivider, { ...divider, direction });
            } else {
                const options = { class: 'nue-div__divider' };
                return createVNode('div', options, divider);
            }
        }

        function generateDividedSlot(defaultSlot: VNode[], spaceElement: VNode) {
            return defaultSlot.reduce((acc: VNode[], cur: VNode, idx: number) => {
                acc.push(cur);
                if (typeof cur.type !== 'symbol' && idx !== defaultSlot.length - 1) {
                    acc.push(spaceElement);
                }
                return acc;
            }, []);
        }

        return () => {
            const options = {
                class: classes.value,
                style: style.value,
                'data-direction': props.autoFit ? direction.value : void 0
            };
            if (props.divider !== null) {
                const defaultSlot = slots.default!();
                const divider = createDivider();
                const spacedSlot = generateDividedSlot(defaultSlot, divider);
                return createVNode('div', options, spacedSlot);
            }
            return createVNode('div', options, slots);
        };
    }
});

import type { VNode } from 'vue';
import { computed, createVNode, defineComponent } from 'vue';
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
        theme: [String, Array],
        inline: Boolean
    },
    setup(props, { slots }) {
        function getDirection() {
            const { direction, vertical } = props;
            return direction ? direction : vertical ? 'column' : void 0;
        }

        const style = computed(() => {
            const { align, justify, flex, wrap, gap, width, height } = props;
            return {
                '--nue-div-width': width,
                '--nue-div-height': height,
                '--nue-div-flex-direction': getDirection(),
                '--nue-div-align-items': align,
                '--nue-div-justify-content': justify,
                '--nue-div-flex-wrap': parseFlexWrap(wrap as string),
                '--nue-div-gap': gap,
                '--nue-div-flex': parseFlex(flex as string),
                display: props.inline ? 'inline-flex' : void 0
            };
        });

        const classes = computed(() => {
            const list = [];
            const { theme } = props;
            list.push('nue-div');
            if (theme) list.push(...parseTheme(theme as string | string[], 'nue-div'));
            return list;
        });

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
            const options = { class: classes.value, style: style.value };
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

import { computed, createVNode, defineComponent } from "vue";
import type { VNode } from "vue";
import { NueDivider } from "../divider";
import { parseFlex, parseFlexWrap } from "@nue-ui/utils";
import "./div.css";

export default defineComponent({
    name: "NueDiv",
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
    },
    setup(props, { slots }) {
        function getDirection() {
            const { direction, vertical } = props;
            return direction ? direction : vertical ? "column" : "row";
        }

        const style = computed(() => {
            const { align, justify, flex, wrap, gap, width, height } = props;
            return {
                "--flex-direction": getDirection(),
                "--align-items": align,
                "--justify-content": justify,
                "--flex": parseFlex(flex as string),
                "--flex-wrap": parseFlexWrap(wrap as string),
                "--gap": gap,
                "--width": width,
                "--height": height,
            };
        });

        function createDivider() {
            const { divider, vertical } = props;
            if (typeof divider === "object" && divider !== null) {
                const direction = vertical ? "horizontal" : "vertical";
                return createVNode(NueDivider, { ...divider, direction });
            } else {
                const options = { class: "nue-div__divider" };
                return createVNode("div", options, divider);
            }
        }

        function generateDividedSlot(
            defaultSlot: VNode[],
            spaceElement: VNode
        ) {
            return defaultSlot.reduce(
                (acc: VNode[], cur: VNode, idx: number) => {
                    acc.push(cur);
                    if (
                        typeof cur.type !== "symbol" &&
                        idx !== defaultSlot.length - 1
                    ) {
                        acc.push(spaceElement);
                    }
                    return acc;
                },
                []
            );
        }

        return () => {
            const options = { class: "nue-div", style: style.value };
            if (props.divider !== null) {
                const defaultSlot = slots.default!();
                const divider = createDivider();
                const spacedSlot = generateDividedSlot(defaultSlot, divider);
                return createVNode("div", options, spacedSlot);
            }
            return createVNode("div", options, slots);
        };
    },
});

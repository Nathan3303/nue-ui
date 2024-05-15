import { computed, createVNode, defineComponent } from "vue";
import { type VNode, type VNodeArrayChildren } from "vue";
import { NueDivider } from "../../index";
import "../style/div.css";

export default defineComponent({
    name: "NueDiv",
    props: {
        vertical: {
            type: Boolean,
            default: false,
        },
        align: {
            type: String,
            default: "start",
        },
        justify: {
            type: String,
            default: "start",
        },
        flex: {
            type: String,
            default: "none",
        },
        wrap: {
            type: String,
            default: "no-wrap",
        },
        gap: {
            type: String,
            default: "16px",
        },
        width: {
            type: String,
            default: "100%",
        },
        height: {
            type: String,
            default: "auto",
        },
        divider: {
            type: [String, Number, Boolean, Object],
            default: null,
        },
    },
    setup(props, { slots }) {
        const style = computed(() => {
            const styleObj: { [key: string]: string | number } = {};
            const { vertical, align, justify, flex, wrap, gap, width, height } =
                props;
            if (vertical) styleObj["--flex-direction"] = "column";
            if (width !== "100%") styleObj["--width"] = width;
            if (height !== "auto") styleObj["--height"] = height;
            if (align !== "stretch") styleObj["--align-items"] = align;
            if (justify !== "start") styleObj["--justify-content"] = justify;
            if (gap !== "16px") styleObj["--gap"] = gap;
            if (flex !== "none") styleObj["--flex"] = flex;
            if (wrap !== "no-wrap")
                styleObj["--flex-wrap"] = wrap === "" ? "wrap" : wrap;
            return styleObj;
        });

        function createDivider() {
            const { divider, vertical } = props;
            if (typeof divider === "object" && divider !== null) {
                return createVNode(NueDivider, {
                    ...divider,
                    direction: vertical ? "horizontal" : "vertical",
                });
            } else {
                return createVNode(
                    "div",
                    { class: "nue-div__divider" },
                    props.divider
                );
            }
        }

        function generateDividedSlot(
            defaultSlot: VNode[],
            spaceElement: VNode
        ) {
            return defaultSlot.reduce(
                (acc: VNodeArrayChildren, cur: VNode, idx: number) => {
                    acc.push(cur);
                    if (idx !== defaultSlot.length - 1) {
                        acc.push(spaceElement);
                    }
                    return acc;
                },
                []
            );
        }

        return () => {
            if (props.divider !== null) {
                const defaultSlot = slots.default!();
                const divider = createDivider();
                const spacedSlot = generateDividedSlot(defaultSlot, divider);
                return createVNode(
                    "div",
                    { class: "nue-div", style: style.value },
                    spacedSlot
                );
            }
            return createVNode(
                "div",
                { class: "nue-div", style: style.value },
                slots
            );
        };
    },
});

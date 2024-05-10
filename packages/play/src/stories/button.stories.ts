import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { fn } from "@storybook/test";
import { NueButton, NueButtonGropu } from "nue-ui";
import components from "nue-ui/components";

type Story = StoryObj<typeof NueButton> & { argTypes: ArgTypes };

const meta: Meta<typeof NueButton> = {
    title: "NueButton",
    component: NueButton,
    subcomponents: { ButtonGroup: NueButtonGropu },
    tags: ["autodocs"],
    argTypes: {
        theme: {
            control: { type: "select" },
            options: ["icon-only", "text-only", "default"],
        },
        shape: {
            control: { type: "select" },
            options: [
                "square",
                "round",
                "square-no-border",
                "round-no-border",
                "no-shape",
            ],
        },
        size: {
            control: "text",
        },
        icon: {
            control: "text",
        },
        disabled: {
            control: "boolean",
        },
        loading: {
            control: "boolean",
        },
        loadingIcon: {
            control: "text",
        },
        title: {
            control: "text",
        },
        align: {
            control: { type: "select" },
            options: ["left", "center", "right"],
        },
        flex: {
            control: { type: "select" },
            options: ["auto", "none"],
        },
        useThrottle: {
            control: "boolean",
        },
        throttleDuration: {
            control: "number",
        },
    },
};

const container = (val: string) => `<div style="padding: 20px;">${val}</div>`;

export const Default: Story & { args: { content: string } } = {
    argTypes: {
        content: {
            control: { type: "text" },
        },
    },
    args: {
        content: "Button",
    },
    render: (args) => ({
        components: { NueButton },
        setup() {
            return { args };
        },
        template: container(
            `<nue-button v-bind="args">{{ args.content }}</nue-button>`
        ),
    }),
};

export default meta;

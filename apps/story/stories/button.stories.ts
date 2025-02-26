import type { Meta, StoryObj } from '@storybook/vue3';

import { NueButton } from 'nue-ui';

const meta: Meta<typeof NueButton> = {
    component: NueButton,
    argTypes: {
        theme: {
            options: ['primary', 'ghost', 'secondary', 'destructive'],
            control: { type: 'check' }
        }
    }
};

export default meta;
type Story = StoryObj<typeof NueButton>;

export const Primary: Story = {
    render: args => ({
        components: { NueButton },
        setup() {
            return { args };
        },
        template: '<NueButton v-bind="args">123</NueButton>'
    }),
    args: {
        theme: 'primary'
    }
};

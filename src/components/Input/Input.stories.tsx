import React, {ComponentProps} from 'react';
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Input} from "./Input";

export default {
    component: Input,
    title: 'Components/Input',
} as Meta;

const Template: Story<ComponentProps<typeof Input>> =
    (args) => <Input {...args} />;

const callback = action('event is happened');

export const InputStories = Template.bind({});
InputStories.args = {
    callbackAddItem:callback,
};

export const InputDisableExample = Template.bind({});
InputDisableExample.args = {
    callbackAddItem:callback,
    disabled:true,
};
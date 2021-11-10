import React, {ComponentProps} from 'react';
import {EditableItem} from "./EditableItem";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    component: EditableItem,
    title: 'Components/EditableItem',
    argTypes: {
        color: {control: 'color'},
    },
} as Meta;

const Template: Story<ComponentProps<typeof EditableItem>> =
    (args) => {
        return (
            <div>
                <EditableItem {...args} />
            </div>
        )
    };

const callback = action('event is happened')
export const EditableItemStories = Template.bind({});
EditableItemStories.args = {
    title: 'привет',
    callback: callback,
};
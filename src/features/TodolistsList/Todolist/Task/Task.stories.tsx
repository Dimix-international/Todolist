import React, {ComponentProps} from 'react';
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";
import {v1} from "uuid";


export default {
    component: Task,
    title: 'Components/Task',
}as Meta;

const Template: Story<ComponentProps<typeof Task>> =
    (args) => <Task {...args} />;

const callbackRemove = action('tasked is removed')
const callbackChange = action('tasked is changed')
const callbackChangeTitleInput = action('title of tasked is changed');

export const TaskStories = Template.bind({});

TaskStories.args = {
    task: {
        id: '1',
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: '1',
        order: 0,
    },
    removeTask: callbackRemove,
    onChangeHandler:callbackChange ,
    changeTitleInInput: callbackChangeTitleInput,
};

import React, {ComponentProps} from 'react';
import {Meta, Story} from "@storybook/react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";


export default {
    component: App,
    title: 'Components/App',
    decorators: [ReduxStoreProviderDecorator] //все истории будут внутри декоратора
} as Meta;

/*const Template: Story<ComponentProps<typeof App>> =
    () => <Provider store={store}><App/></Provider>;*/
//используем декоратор
const Template: Story<ComponentProps<typeof App>> =
    () => <App demo={true}/>;


export const AppStories = Template.bind({});

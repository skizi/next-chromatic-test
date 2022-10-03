import React from 'react';
import {
	ComponentStory,
	ComponentStoryObj,
	ComponentMeta,
} from '@storybook/react';
import { rest } from 'msw';
import { Button } from './button';

export default {
	title: 'Button',
	component: Button,
} as ComponentMeta<typeof Button>;

// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

// export const Primary = Template.bind({});
// Primary.args = {
// 	name: 'ボタン',
// };

type Story = ComponentStoryObj<typeof Button>;
export const Case1: Story = {
	storyName: 'モーダルを表示させ、一覧が表示できなかった（500）の場合',
	args: {
		name: 'ボタン',
	},
	parameters: {
		msw: {
			handlers: {
				mockGetMyClosetItemsForWear: rest.get(
					`${process.env.REACT_MSW_DOMAIN}/todos`,
					(req, res, ctx) => {
						return res(ctx.status(500), ctx.json(''));
					}
				),
			},
		},
	},
};

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Logo } from '@/auth/components/Logo';
import {
  AVATAR_URL_MOCK,
  ComponentDecorator,
  RouterDecorator,
} from 'twenty-ui/testing';

/**
 * [set] Состояний осталось два: знак есть или знака нет.
 *
 * Прежние четыре истории описывали связку «большой чужой логотип + наклейка
 * с нашим»; такой связки больше нет — см. комментарий в самом компоненте.
 */

const logoUrl = AVATAR_URL_MOCK;

const meta: Meta<typeof Logo> = {
  title: 'Modules/Auth/Logo',
  component: Logo,
  decorators: [ComponentDecorator, RouterDecorator],
};

export default meta;
type Story = StoryObj<typeof Logo>;

/** Логотип рабочей области пришёл первым полем. */
export const PrimaryLogo: Story = {
  args: {
    primaryLogo: logoUrl,
    secondaryLogo: null,
  },
};

/** Тот же знак, но переданный вторым полем: экраны входа делают так. */
export const SecondaryLogo: Story = {
  args: {
    primaryLogo: null,
    secondaryLogo: logoUrl,
  },
};

/** Логотипа нет — не рисуется ничего. Чужой знак не подставляется. */
export const NoLogo: Story = {
  args: {
    primaryLogo: null,
    secondaryLogo: null,
    placeholder: 'A',
  },
};

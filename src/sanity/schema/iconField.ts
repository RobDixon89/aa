import { IconType } from '@/utils/icon';
import { defineField } from 'sanity';

export const iconField = defineField({
  name: 'icon',
  title: 'Icon',
  type: 'string',
  options: {
    list: Object.values(IconType).map((icon) => ({
      value: icon,
      title: icon
        .split('-')
        .map((i) => i[0].toUpperCase() + i.substring(1))
        .join(' '),
    })),
  },
  validation: (Rule) => Rule.required(),
});

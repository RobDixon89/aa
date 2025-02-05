import { globalFormFields } from '@/stories/widgets/EmbeddedForm/schema';
import { footerFields } from '@/stories/widgets/Footer/schema';
import { headerFields } from '@/stories/widgets/Header/schema';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  type: 'object',
  title: 'Site Settings',
  groups: [
    {
      title: 'Settings',
      name: 'settings',
      default: true,
    },
    {
      title: 'Navigation',
      name: 'navigation',
    },
    {
      title: 'Footer',
      name: 'footer',
    },
    {
      title: 'USP List',
      name: 'usps',
    },
    {
      title: 'Contact Form',
      name: 'contact',
    },
  ],
  fields: [
    defineField({
      title: 'Google Analytics ID',
      name: 'gaID',
      type: 'string',
      group: 'settings',
    }),
    ...headerFields,
    ...footerFields,
    defineField({
      name: 'uspItems',
      title: 'USP Items',
      type: 'uspList',
      description: `These will be used within any Banner or Rich Text block where "Display USP List" is enabled`,
      group: 'usps',
    }),
    ...globalFormFields,
  ],
});

import { EnvelopeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import {
  blockContent,
  contentOnlySnippet,
} from '../../../sanity/schema/blockContent';

export const embeddedFormSchema = defineType({
  icon: EnvelopeIcon,
  name: 'embeddedForm',
  type: 'object',
  title: 'Embedded Form',
  preview: {
    select: {
      title: 'title',
      blockContent: 'blockContent',
    },
    prepare(selection) {
      const { title, blockContent } = selection;
      return {
        title: title
          ? title
          : blockContent?.[0]?.children[0]?.text
            ? blockContent?.[0]?.children[0]?.text
            : 'Contact Form Only',
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Heading',
      description: 'Will be a h2 tag',
    }),
    blockContent('contentOnly', undefined, 'Introduction'),
  ],
});

export const embeddedFormSnippet = `
  ...,
  blockContent[] {
    ${contentOnlySnippet}
  },
`;

export type EmbeddedFormResponse = {
  _type: 'embeddedForm';
  _key: string;
  title: string | null;
  blockContent: any;
};

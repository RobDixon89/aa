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

export const globalFormFields = [
  defineField({
    name: 'formIntroduction',
    type: 'string',
    title: 'Form introduction text',
    description: 'Will be displayed directly above each embedded form',
    group: 'contact',
  }),
  defineField({
    name: 'successMessage',
    type: 'string',
    title: 'Success Message',
    description: 'Message to display when an enquiry form is submitted',
    validation: (Rule) => Rule.required(),
    group: 'contact',
  }),
  defineField({
    name: 'targetEmail',
    title: 'Target Email',
    description: 'Where should the embedded form submissions be sent?',
    type: 'email',
    validation: (Rule) => Rule.required(),
    group: 'contact',
  }),
  defineField({
    name: 'confirmationMessage',
    type: 'string',
    title: 'Success Message',
    description: `When an enquiry has been submitted we'll send an email to the customer, this will be what it says in that email`,
    validation: (Rule) => Rule.required(),
    group: 'contact',
  }),
];

export const globalFormFieldQuery = `
  "form": {
    formIntroduction,
    successMessage,
    targetEmail,
    confirmationMessage,
  }
`;

export type GlobalFormFieldsResponse = {
  formIntroduction: string | null;
  successMessage: string;
  targetEmail: string;
  confirmationMessage: string;
};

import { SplitVerticalIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import {
  blockContent,
  contentOnlySnippet,
} from '../../../sanity/schema/blockContent';
import {
  imageWithAltSnippet,
  type ImageWithAlt,
} from '../../../sanity/schema/image';
import {
  labelledLinkSnippet,
  type LabelledLink,
} from '../../../sanity/schema/linkList';
import { themeList } from '../../../sanity/schema/themes';
import { Themes } from '../../components/Section/Section';

export const imageText5050Schema = defineType({
  icon: SplitVerticalIcon,
  name: 'imageText5050',
  type: 'object',
  title: 'Image Text 50/50',
  preview: {
    select: {
      title: 'title',
      blockContent: 'blockContent',
    },
    prepare(selection) {
      const { title, blockContent } = selection;
      return {
        title: title ? title : blockContent?.[0]?.children[0].text,
      };
    },
  },
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAlign',
      title: 'Image Alignment',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          { value: 'left', title: 'Left' },
          { value: 'right', title: 'Right' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Heading',
      description: 'Will be a h2 tag',
    }),
    blockContent('contentOnly', undefined, 'Text Content'),
    defineField({
      name: 'ctas',
      title: 'Link List',
      type: 'linkList',
    }),
    themeList([Themes.navy]),
  ],
});

export const imageText5050Snippet = `
  ...,
  image {
    ${imageWithAltSnippet}
  },
  blockContent[] {
    ${contentOnlySnippet}
  },
  ctas[] {
    ${labelledLinkSnippet}
  },
`;

export type ImageText5050Response = {
  _type: 'imageText5050';
  _key: string;
  image: ImageWithAlt;
  imageAlign: 'left' | 'right';
  title: string | null;
  blockContent: any;
  ctas: LabelledLink[] | null;
  theme: Exclude<Themes, Themes.navy>;
};

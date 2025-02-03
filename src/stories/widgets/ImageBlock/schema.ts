import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import {
  imageWithAltSnippet,
  type ImageWithAlt,
} from '../../../sanity/schema/image';
import { themeList } from '../../../sanity/schema/themes';
import { Themes, type ThemeKeys } from '../../Global/Section/Section';

export const imageBlockSchema = defineType({
  icon: ImageIcon,
  name: 'imageBlock',
  type: 'object',
  title: 'Image Block',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
    themeList([Themes.blue, Themes.yellow]),
  ],
});

export const imageBlockSnippet = `
  ...,
  image {
    ${imageWithAltSnippet}
  }
`;

export type ImageBlockResponse = {
  _type: 'imageBlock';
  _key: string;
  caption: string | null;
  image: ImageWithAlt;
  theme: ThemeKeys;
};

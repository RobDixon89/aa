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
import { Themes, type ThemeKeys } from '../../Global/Section/Section';

export const innerPageBannerSchema = defineType({
  name: 'innerPageBanner',
  type: 'object',
  title: 'Page Banner',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Heading',
      description:
        'Wrap words in asterisks to add a highlight, eg. Your local TV Aerial and Satellite *specialists*',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Sub Heading',
      description:
        'Displayed before the heading, will default to the name of the parent page if unpopulated',
    }),
    blockContent('contentOnly', undefined, 'Text Content'),
    defineField({
      name: 'ctas',
      title: 'Link List',
      type: 'linkList',
    }),
    defineField({
      name: 'usps',
      title: 'Display USP List',
      type: 'boolean',
    }),
    themeList([Themes.default, Themes.navy]),
  ],
});

export const innerPageBannerSnippet = `
  image {
    ${imageWithAltSnippet}
  },
  subtitle,
  title,
  blockContent[] {
    ${contentOnlySnippet}
  },
  ctas[] {
    ${labelledLinkSnippet}
  },
  usps,
  theme,
`;

export type InnerPageBannerResponse = {
  title: string;
  subtitle: string | null;
  image: ImageWithAlt | null;
  blockContent: any;
  ctas: LabelledLink[] | null;
  usps: boolean | null;
  theme: ThemeKeys;
};

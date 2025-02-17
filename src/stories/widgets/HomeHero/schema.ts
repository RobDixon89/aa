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

export const homeHeroSchema = defineType({
  name: 'homeHero',
  type: 'object',
  title: 'Page Banner',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Heading',
      validation: (Rule) => Rule.required(),
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
  ],
});

export const homeHeroBannerSnippet = `
  image {
    ${imageWithAltSnippet}
  },
  title,
  blockContent[] {
    ${contentOnlySnippet}
  },
  ctas[] {
    ${labelledLinkSnippet}
  },
  usps,
`;

export type HomeHeroBannerResponse = {
  title: string;
  image: ImageWithAlt;
  blockContent: any;
  ctas: LabelledLink[] | null;
  usps: boolean | null;
};

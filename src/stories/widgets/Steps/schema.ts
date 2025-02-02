import { DashboardIcon } from '@sanity/icons';
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

export const stepsSchema = defineType({
  icon: DashboardIcon,
  name: 'steps',
  type: 'object',
  title: 'Steps',
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
      name: 'title',
      type: 'string',
      title: 'Heading',
      description: 'Will be a h2 tag',
    }),
    blockContent('contentOnly', undefined, 'Introduction'),
    defineField({
      name: 'items',
      title: 'Steps',
      type: 'array',
      of: [
        defineField({
          name: 'step',
          type: 'object',
          title: 'Content Step',
          preview: {
            select: {
              title: 'blockContent',
            },
          },
          fields: [
            blockContent('contentOnly', undefined, 'Content'),
            themeList([Themes.default, Themes.blue]),
          ],
        }),
        defineField({
          name: 'stepImage',
          type: 'object',
          title: 'Image Step',
          preview: {
            select: {
              title: 'image.altText',
            },
          },
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'imageWithAlt',
            }),
            defineField({
              name: 'imageType',
              title: 'Image Type',
              type: 'string',
              description:
                'Should the image expand to cover the entire square or should it be contained within without cropping (eg. a logo)',
              initialValue: 'cover',
              options: {
                list: [
                  { value: 'contain', title: 'Cover' },
                  { value: 'cover', title: 'Contain' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctas',
      title: 'Link List',
      type: 'linkList',
    }),
    themeList([Themes.lightBlue, Themes.yellow, Themes.lightBlue]),
  ],
});

export const stepsSnippet = `
  ...,
  blockContent[] {
    ${contentOnlySnippet}
  },
  items[] {
    ...,
    _type=="step"=>{
      blockContent[] {
        ${contentOnlySnippet}
      }
    },
    _type=="stepImage"=>{
      image {
        ${imageWithAltSnippet}
      }
    }
  },
  ctas[] {
    ${labelledLinkSnippet}
  }
`;

export type ContentStep = {
  _type: 'step';
  _key: string;
  blockContent: any;
  theme: Themes;
};

export type ImageStep = {
  _type: 'stepImage';
  _key: string;
  imageType: 'contain' | 'cover';
  image: ImageWithAlt;
};

export type StepsResponse = {
  _type: 'steps';
  _key: string;
  title: string | null;
  blockContent: any;
  items: (ContentStep | ImageStep)[];
  ctas: LabelledLink[] | null;
  theme: Exclude<Themes, Themes.lightBlue | Themes.navy | Themes.yellow>;
};

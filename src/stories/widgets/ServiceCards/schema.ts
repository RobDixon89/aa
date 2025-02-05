import { WrenchIcon } from '@sanity/icons';
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
  serviceLinkSnippet,
  type LabelledLink,
} from '../../../sanity/schema/linkList';

export const serviceCardsSchema = defineType({
  icon: WrenchIcon,
  name: 'serviceCards',
  type: 'object',
  title: 'Service Cards',
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
      title: 'Services',
      description: `Select service pages to link to, if list isn't populated then all services will be displayed`,
      type: 'array',
      of: [
        defineField({
          title: 'Service',
          name: 'serviceLink',
          type: 'reference',
          to: [{ type: 'service' }],
        }),
      ],
    }),
    defineField({
      name: 'serviceTypes',
      title: 'Service Types',
      type: 'string',
      initialValue: 'parent',
      description:
        "If no services are populated, which services should be displayed? Parent Services Only will display only the services which don't have a parent. The Children option will only have an effect on a service landing page if that service has children.",
      options: {
        list: [
          { value: 'parent', title: 'Parent Services Only' },
          {
            value: 'children',
            title: 'Children Services Only (if on a service landing page)',
          },
          { value: 'all', title: 'All Services' },
        ],
      },
      hidden: ({ parent }) => parent?.items?.length > 0,
    }),
    defineField({
      name: 'ctas',
      title: 'Link List',
      type: 'linkList',
    }),
  ],
});

export const serviceCardSnippet = `  
  ...,
  ${serviceLinkSnippet},
  "bannerImage": landingBanner.image {
    ${imageWithAltSnippet}
  },    
  "metaImage": landingMetaMetaImage {
    ${imageWithAltSnippet}
  },
  "hasLocationPage": defined(locationContent) && defined(locationContent)
`;

export const serviceCardsSnippet = `
  ...,
  blockContent[] {
    ${contentOnlySnippet}
  },
  items[]->{
    _type=='service'=>{
      ${serviceCardSnippet},
    }
  },
  ctas[] {
    ${labelledLinkSnippet}
  }
`;

export type ServiceCardResponse = {
  _type: 'service';
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  parent: string | null;
  bannerImage: ImageWithAlt | null;
  metaImage: ImageWithAlt | null;
  hasLocationPage: boolean;
};

export type ServiceCardsResponse = {
  _type: 'serviceCards';
  _key: string;
  title: string | null;
  blockContent: any;
  serviceTypes: 'parent' | 'all' | 'children' | null;
  items: ServiceCardResponse[] | null;
  ctas: LabelledLink[] | null;
};

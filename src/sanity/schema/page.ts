import type { Slug } from 'sanity';
import { defineField, defineType } from 'sanity';
import { blockContent } from './blockContent';

function slugify(S: string): string {
  return S.toLowerCase().replace(/\s+/g, '-').slice(0, 85);
}

async function asyncSlugGenerator(
  input: string,
  _schemaType: unknown,
  context: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parent?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getClient?: any;
  }
) {
  if (!context.parent || !context.parent.parentPage) return slugify(input);
  const { getClient } = context;
  const client = getClient();
  const query = '*[_type=="page" && _id == $_ref]{slug}[0]';
  const params = { _ref: context.parent.parentPage._ref };
  return client.fetch(query, params).then((page: { slug: Slug }) => {
    return `${page.slug.current}/${slugify(input)}`;
  });
}

export const pageGroups = [
  {
    title: 'Settings',
    name: 'settings',
    default: true,
  },
  {
    title: 'Content',
    name: 'pageContent',
  },
  {
    title: 'Metadata',
    name: 'metadata',
  },
];

export const settingFields = [
  defineField({
    name: 'title',
    type: 'string',
    validation: (Rule) => Rule.required(),
    group: 'settings',
  }),
];

export const pageFields = (group?: string) => [
  defineField({
    title: 'Title (Meta only)',
    description: '* If left empty, the page title will be used in metadata.',
    name: group ? `${group}MetaTitle` : 'metaTitle',
    type: 'string',
    group: group ?? 'metadata',
  }),
  defineField({
    title: 'Description',
    name: group ? `${group}MetaDescription` : 'metaDescription',
    type: 'text',
    group: group ?? 'metadata',
    rows: 3,
  }),
  defineField({
    title: 'Image (og-image)',
    name: group ? `${group}MetaImage` : 'metaImage',
    type: 'image',
    group: group ?? 'metadata',
  }),
];

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Inner Page',
  groups: pageGroups,
  fields: [
    ...settingFields,
    defineField({
      title: 'Parent page',
      name: 'parentPage',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Parent page is used to generate the Slug field.',
      options: {
        disableNew: true,
        filter: '!defined(parentPage)',
      },
      validation: (rule) =>
        rule.custom((parentPage, context) => {
          if (!parentPage) return true;
          if (
            context.document &&
            context.document._id.includes(parentPage._ref)
          )
            return 'You can not select the current page. Please select another page.';
          return true;
        }),
      group: 'settings',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        slugify: asyncSlugGenerator,
      },
      group: 'settings',
    }),

    defineField({
      name: 'banner',
      title: 'Banner',
      type: 'innerPageBanner',
      group: 'pageContent',
    }),

    blockContent('all', 'pageContent'),
    ...pageFields(),
  ],
});

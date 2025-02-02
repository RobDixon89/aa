import { Themes } from '@/stories/components/Section/Section';
import { defineField } from 'sanity';

export const themeList = (exclude?: Themes[]) =>
  defineField({
    name: 'theme',
    title: 'Theme',
    type: 'string',
    options: {
      list: Object.values(Themes)
        .filter((theme) => !exclude?.includes(theme))
        .map((theme) => ({
          value: theme,
          title:
            theme === Themes.default
              ? 'White'
              : theme
                  .split('-')
                  .map((t) => t[0].toUpperCase() + t.substring(1))
                  .join(' '),
        })),
    },
    validation: (Rule) => Rule.required(),
  });

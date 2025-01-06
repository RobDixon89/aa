import { defineField } from "sanity";
import { Themes } from "../src/stories/components/Section/Section";

export const themeList = (exclude?: Themes[]) =>
  defineField({
    name: "theme",
    title: "Theme",
    type: "string",
    options: {
      list: Object.values(Themes)
        .filter((theme) => !exclude?.includes(theme))
        .map((theme) => ({
          value: theme,
          title: theme.replaceAll("-", " "),
        })),
    },
    validation: (Rule) => Rule.required(),
  });

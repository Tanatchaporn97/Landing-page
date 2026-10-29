import "server-only";
import type { Locale } from "./i18n-config";
import { HIDDEN_POSTS } from "./lib/posts";

const dictionaries = {
  th: () => import("./dictionaries/th.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const dict = await (dictionaries[locale]?.() ?? dictionaries.th());
  // hidden articles are left out of every blog / newsroom list
  return { ...dict, blogPosts: dict.blogPosts.filter((p) => !HIDDEN_POSTS.includes(p.slug)) };
};

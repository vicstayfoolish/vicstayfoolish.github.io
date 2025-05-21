import { defineCollection, z } from 'astro:content';

// 定義 pets 集合的模式
const petsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // 這將字符串轉換為日期對象
    category: z.string(),
    tag: z.string().optional(),
    icon: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 定義 psychology 集合的模式
const psychologyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // 這將字符串轉換為日期對象
    category: z.string(),
    tag: z.string().optional(),
    icon: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 定義 health 集合的模式 (目前可能沒有檔案，但先定義好)
const healthCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // 這將字符串轉換為日期對象
    category: z.string(),
    tag: z.string().optional(),
    icon: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 定義 technology 集合的模式 (目前可能沒有檔案，但先定義好)
const technologyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // 這將字符串轉換為日期對象
    category: z.string(),
    tag: z.string().optional(),
    icon: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 導出集合
export const collections = {
  'pets': petsCollection,
  'psychology': psychologyCollection,
  'health': healthCollection,
  'technology': technologyCollection,
};

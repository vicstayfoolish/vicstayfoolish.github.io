import { defineCollection, z } from 'astro:content';

// 定義知識頁面的集合模式
export const collections = {
  // 心理學分類
  psychology: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      tag: z.string(),
      icon: z.string().default('brain'),
      pubDate: z.date().optional(),
      updatedDate: z.date().optional(),
      draft: z.boolean().default(false),
    }),
  }),
  
  // 健康分類
  health: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      tag: z.string(),
      icon: z.string().default('heartbeat'),
      pubDate: z.date().optional(),
      updatedDate: z.date().optional(),
      draft: z.boolean().default(false),
    }),
  }),
  
  // 寵物分類
  pets: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      tag: z.string(),
      icon: z.string().default('paw'),
      pubDate: z.date().optional(),
      updatedDate: z.date().optional(),
      draft: z.boolean().default(false),
    }),
  }),
  
  // 科技分類
  technology: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      tag: z.string(),
      icon: z.string().default('microchip'),
      pubDate: z.date().optional(),
      updatedDate: z.date().optional(),
      draft: z.boolean().default(false),
    }),
  }),
};

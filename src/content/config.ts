import { defineCollection, z } from 'astro:content';

// 定義統一的知識文章集合模式
const knowledgeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(["psychology", "health", "pets", "technology", "others"]), // 分類欄位
    tag: z.string().optional(),
    icon: z.string().optional(),
    draft: z.boolean().default(false),
    hidden: z.boolean().default(false), // 添加隱藏屬性
  }),
});

// 導出集合
export const collections = {
  'knowledge': knowledgeCollection, // 統一的集合名稱
};

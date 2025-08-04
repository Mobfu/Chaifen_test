import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

// 文章段落拆分工作流的输入参数验证
export const articleSplitInputSchema = z.object({
  article: z.string().min(1, '文章内容不能为空'),
  articleName: z.string().min(1, '文章名字不能为空'),
})

export type ArticleSplitInput = z.infer<typeof articleSplitInputSchema> 
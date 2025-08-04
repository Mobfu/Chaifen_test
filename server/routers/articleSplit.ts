import { z } from 'zod'
import { router, publicProcedure, articleSplitInputSchema } from '../trpc'
import { CozeAPI } from '@coze/api'

export const articleSplitRouter = router({
  splitArticle: publicProcedure
    .input(articleSplitInputSchema)
    .mutation(async ({ input }) => {
      try {
        // 从环境变量获取配置
        const apiToken = process.env.COZE_API_TOKEN
        const baseURL = process.env.COZE_BASE_URL
        const workflowId = process.env.COZE_WORKFLOW_ID

        if (!apiToken) {
          throw new Error('API Token is required. Please set COZE_API_TOKEN in .env.local')
        }

        if (!workflowId) {
          throw new Error('Workflow ID is required. Please set COZE_WORKFLOW_ID in .env.local')
        }

        // 创建 Coze API 客户端
        const apiClient = new CozeAPI({
          token: apiToken,
          baseURL: baseURL || 'https://api.coze.cn'
        })

        // 准备参数 - 使用Coze官方示例的参数名称
        const parameters = {
          input: input.article,
          name: input.articleName,
        }

        console.log('发送的参数:', JSON.stringify(parameters, null, 2))
        console.log('工作流ID:', workflowId)

        // 调用文章段落拆分工作流
        const result = await apiClient.workflows.runs.create({
          workflow_id: workflowId,
          parameters: parameters,
        })

        return {
          success: true,
          data: result,
          input: {
            articleName: input.articleName,
            articleLength: input.article.length,
          }
        }
      } catch (error) {
        console.error('Article split workflow error:', error)
        throw new Error(error instanceof Error ? error.message : 'Unknown error occurred')
      }
    }),

  // 获取工作流状态 - 暂时注释掉，因为API方法名不确定
  // getStatus: publicProcedure
  //   .input(z.object({ runId: z.string() }))
  //   .query(async ({ input }) => {
  //     try {
  //       const apiToken = process.env.COZE_API_TOKEN
  //       const baseURL = process.env.COZE_BASE_URL

  //       if (!apiToken) {
  //         throw new Error('API Token is required')
  //       }

  //       const apiClient = new CozeAPI({
  //         token: apiToken,
  //         baseURL: baseURL || 'https://api.coze.cn/v1'
  //       })

  //       const result = await apiClient.workflows.runs.retrieve({
  //         run_id: input.runId
  //       })

  //       return {
  //         success: true,
  //         data: result
  //       }
  //     } catch (error) {
  //       console.error('Get workflow status error:', error)
  //       throw new Error(error instanceof Error ? error.message : 'Unknown error occurred')
  //     }
  //   })
}) 
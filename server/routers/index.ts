import { router } from '../trpc'
import { articleSplitRouter } from './articleSplit'

export const appRouter = router({
  articleSplit: articleSplitRouter,
})

export type AppRouter = typeof appRouter 
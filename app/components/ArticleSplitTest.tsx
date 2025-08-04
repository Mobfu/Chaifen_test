'use client'

import React, { useState, useEffect } from 'react'
import { trpc } from '../../utils/trpc'
import { LoadingSpinner } from './LoadingSpinner'

interface ArticleSplitForm {
  article: string
  articleName: string
}

export default function ArticleSplitTest() {
  const [form, setForm] = useState<ArticleSplitForm>({
    article: `人工智能（Artificial Intelligence，AI）是计算机科学的一个分支，它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器。该领域的研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。

人工智能从诞生以来，理论和技术日益成熟，应用领域也不断扩大，可以设想，未来人工智能带来的科技产品，将会是人类智慧的"容器"。人工智能可以对人的意识、思维的信息过程的模拟。人工智能不是人的智能，但能像人那样思考、也可能超过人的智能。

人工智能是一门极富挑战性的科学，从事人工智能工作的人员必须懂得计算机知识，心理学和哲学。人工智能是包括十分广泛的科学，它由不同的领域组成，如机器学习，计算机视觉等等，总的说来，人工智能研究的一个主要目标是使机器能够胜任一些通常需要人类智能才能完成的复杂工作。`,
    articleName: '人工智能介绍'
  })

  const splitArticleMutation = trpc.articleSplit.splitArticle.useMutation()
  const [result, setResult] = useState<any>(null)
  const [processingTime, setProcessingTime] = useState<number | null>(null)

  const [startTime, setStartTime] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 记录开始时间
    const currentStartTime = Date.now()
    setStartTime(currentStartTime)
    setProcessingTime(null)
    
    // 检查是否是积分不足错误，如果是则使用模拟数据
    if (splitArticleMutation.error?.message?.includes('Insufficient coze credits')) {
      // 使用模拟数据
      const mockResult = {
        success: true,
        data: {
          code: 0,
          data: JSON.stringify({
            output: [
              {
                frenchTranslation: "L'intelligence artificielle (IA) est une branche de l'informatique",
                story: "人工智能（Artificial Intelligence，AI）是计算机科学的一个分支"
              },
              {
                frenchTranslation: "qui tente de comprendre l'essence de l'intelligence",
                story: "它企图了解智能的实质"
              },
              {
                frenchTranslation: "et de produire une nouvelle forme de machine intelligente",
                story: "并生产出一种新的智能机器"
              },
              {
                frenchTranslation: "capable de réagir de manière similaire à l'intelligence humaine",
                story: "能够以类似人类智能的方式做出反应"
              },
              {
                frenchTranslation: "Les recherches dans ce domaine incluent la robotique",
                story: "该领域的研究包括机器人"
              },
              {
                frenchTranslation: "la reconnaissance vocale, la reconnaissance d'images",
                story: "语音识别、图像识别"
              },
              {
                frenchTranslation: "le traitement du langage naturel et les systèmes experts",
                story: "自然语言处理和专家系统等"
              }
            ]
          }),
          debug_url: "https://www.coze.cn/work_flow?execute_id=mock&space_id=mock&workflow_id=mock&execute_mode=2",
          msg: "Success (Mock Data)",
          usage: {
            input_count: form.article.length,
            output_count: 1500,
            token_count: 2000
          }
        },
        input: {
          articleName: form.articleName,
          articleLength: form.article.length,
        }
      }
      
      // 计算处理时间
      const endTime = Date.now()
      const processingTimeMs = endTime - currentStartTime
      setProcessingTime(processingTimeMs)
      
      // 直接设置结果
      splitArticleMutation.reset()
      setResult(mockResult)
      return
    }
    
    splitArticleMutation.mutate({
      article: form.article,
      articleName: form.articleName
    })
  }

  // 监听mutation状态变化来计算处理时间
  useEffect(() => {
    if (splitArticleMutation.isSuccess && startTime && !processingTime) {
      const endTime = Date.now()
      const processingTimeMs = endTime - startTime
      setProcessingTime(processingTimeMs)
      setStartTime(null)
    }
  }, [splitArticleMutation.isSuccess, startTime, processingTime])

  const handleReset = () => {
    setForm({
      article: `人工智能（Artificial Intelligence，AI）是计算机科学的一个分支，它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器。该领域的研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。

人工智能从诞生以来，理论和技术日益成熟，应用领域也不断扩大，可以设想，未来人工智能带来的科技产品，将会是人类智慧的"容器"。人工智能可以对人的意识、思维的信息过程的模拟。人工智能不是人的智能，但能像人那样思考、也可能超过人的智能。

人工智能是一门极富挑战性的科学，从事人工智能工作的人员必须懂得计算机知识，心理学和哲学。人工智能是包括十分广泛的科学，它由不同的领域组成，如机器学习，计算机视觉等等，总的说来，人工智能研究的一个主要目标是使机器能够胜任一些通常需要人类智能才能完成的复杂工作。`,
      articleName: '人工智能介绍'
    })
    splitArticleMutation.reset()
    setResult(null)
    setProcessingTime(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">文章段落拆分工作流测试</h1>
          <p className="text-gray-600 mb-6">使用tRPC测试文章段落拆分工作流</p>

          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">文章段落拆分与翻译工具</h3>
            <div className="text-sm text-green-700 space-y-1">
              <p>• 输入文章名字和完整内容，系统将自动拆分成多个段落</p>
              <p>• 每个段落将同时提供中文原文和法语翻译</p>
              <p>• 处理时间预计5分钟，请耐心等待</p>
              <p>• 结果将显示在下方，支持查看摘要、段落详情和原始数据</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">文章信息</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  文章名字 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.articleName}
                  onChange={(e) => setForm({ ...form, articleName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="请输入文章名字..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  为您的文章设置一个合适的标题
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  文章内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.article}
                  onChange={(e) => setForm({ ...form, article: e.target.value })}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="请输入要拆分的文章内容..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  当前文章长度: {form.article.length} 字符
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={splitArticleMutation.isPending}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
              >
                {splitArticleMutation.isPending ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">处理中 (预计5分钟)...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    开始处理
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium"
              >
                重置
              </button>
            </div>
          </form>

          {splitArticleMutation.error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 font-medium">错误</p>
              <p className="text-red-600 text-sm">{splitArticleMutation.error.message}</p>
              {splitArticleMutation.error.message.includes('Insufficient coze credits') && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-800 text-sm">
                    💡 提示：由于积分不足，您可以点击"开始处理"按钮查看模拟效果
                  </p>
                </div>
              )}
            </div>
          )}

          {(splitArticleMutation.data || result) && (
            <div className="mt-6">
              <ArticleSplitResult result={splitArticleMutation.data || result} processingTime={processingTime} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ArticleSplitResult({ result, processingTime }: { result: any; processingTime?: number | null }) {
  const [activeTab, setActiveTab] = useState<'summary' | 'segments' | 'raw'>('summary')

  interface Segment {
    story: string
    frenchTranslation: string
  }

  const extractSegments = (data: any): Segment[] => {
    console.log('extractSegments called with:', data)
    
    if (!data || !data.data) {
      console.log('No data or data.data found')
      return []
    }
    
    // 首先尝试解析data.data字段（如果它是JSON字符串）
    let parsedData = data.data
    if (typeof data.data === 'string') {
      try {
        console.log('Parsing data.data string:', data.data.substring(0, 100) + '...')
        parsedData = JSON.parse(data.data)
        console.log('Successfully parsed data.data')
      } catch (e) {
        console.error('解析data.data失败:', e)
        return []
      }
    }
    
    // 直接查找output数组
    console.log('Looking for output in parsedData:', typeof parsedData, Object.keys(parsedData))
    
    // 检查parsedData.data字段（如果存在）
    if (parsedData && typeof parsedData === 'object' && parsedData.data) {
      console.log('Found data field in parsedData')
      let dataContent = parsedData.data
      
      // 如果data是字符串，尝试解析
      if (typeof dataContent === 'string') {
        try {
          console.log('Parsing data field string')
          dataContent = JSON.parse(dataContent)
          console.log('Successfully parsed data field')
        } catch (e) {
          console.error('Failed to parse data field:', e)
        }
      }
      
      // 在解析后的data中查找output
      if (dataContent && typeof dataContent === 'object' && dataContent.output && Array.isArray(dataContent.output)) {
        console.log('Found output array in data field:', dataContent.output.length, 'items')
        const segments = dataContent.output.filter((item: any) => 
          item && typeof item === 'object' && 'story' in item && 'frenchTranslation' in item
        )
        console.log('Filtered segments:', segments.length)
        return segments as Segment[]
      }
    }
    
    // 如果上面的方法失败，尝试直接在parsedData中查找output
    if (parsedData && typeof parsedData === 'object' && parsedData.output && Array.isArray(parsedData.output)) {
      console.log('Found output array directly:', parsedData.output.length, 'items')
      const segments = parsedData.output.filter((item: any) => 
        item && typeof item === 'object' && 'story' in item && 'frenchTranslation' in item
      )
      console.log('Filtered segments:', segments.length)
      return segments as Segment[]
    }
    
    // 如果直接查找失败，尝试递归查找
    const findOutputArray = (obj: any): Segment[] => {
      if (Array.isArray(obj)) {
        if (obj.length > 0 && obj[0] && typeof obj[0] === 'object' && 'story' in obj[0] && 'frenchTranslation' in obj[0]) {
          return obj as Segment[]
        }
        for (const item of obj) {
          const result = findOutputArray(item)
          if (result.length > 0) return result
        }
      } else if (obj && typeof obj === 'object') {
        if (obj.output && Array.isArray(obj.output)) {
          return findOutputArray(obj.output)
        }
        for (const value of Object.values(obj)) {
          const result = findOutputArray(value)
          if (result.length > 0) return result
        }
      }
      return []
    }
    
    const result = findOutputArray(parsedData)
    console.log('Final result:', result.length, 'segments')
    return result
  }

  const segments = extractSegments(result)
  
  // 调试信息
  console.log('Result object:', result)
  console.log('Extracted segments:', segments)
  console.log('Segments length:', segments.length)

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">拆分结果</h3>
      
      {/* 输入信息摘要 */}
              <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <h4 className="font-medium text-blue-800 mb-2">处理信息</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• 文章名字: {result.input.articleName}</p>
            <p>• 原文长度: {result.input.articleLength} 字符</p>
            <p>• 预计处理时间: 5分钟</p>
            {processingTime && (
              <p>• 实际处理时间: {(processingTime / 1000).toFixed(2)} 秒</p>
            )}
          </div>
        </div>

      {/* 标签页 */}
      <div className="mb-4">
        <div className="flex space-x-1 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'summary' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            摘要
          </button>
          <button
            onClick={() => setActiveTab('segments')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'segments' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            段落 ({segments.length})
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'raw' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            原始数据
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-md p-4 min-h-[400px]">
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-3 rounded-md">
                <h5 className="font-medium text-green-800">段落数量</h5>
                <p className="text-2xl font-bold text-green-600">{segments.length}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <h5 className="font-medium text-blue-800">平均长度</h5>
                <p className="text-2xl font-bold text-blue-600">
                  {segments.length > 0 ? Math.round(segments.reduce((sum, seg) => sum + seg.story.length, 0) / segments.length) : 0}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md">
                <h5 className="font-medium text-purple-800">状态</h5>
                <p className="text-2xl font-bold text-purple-600">完成</p>
              </div>
              {processingTime && (
                <div className="bg-orange-50 p-3 rounded-md">
                  <h5 className="font-medium text-orange-800">处理时间</h5>
                  <p className="text-2xl font-bold text-orange-600">{(processingTime / 1000).toFixed(2)}s</p>
                </div>
              )}
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-md">
              <h5 className="font-medium text-yellow-800 mb-2">段落预览</h5>
              <div className="space-y-2">
                {segments.slice(0, 3).map((segment, index) => (
                  <div key={index} className="text-sm text-yellow-700">
                    <span className="font-medium">段落 {index + 1}:</span> {segment.story.substring(0, 100)}...
                  </div>
                ))}
                {segments.length > 3 && (
                  <div className="text-sm text-yellow-600 italic">
                    还有 {segments.length - 3} 个段落...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'segments' && (
          <div className="space-y-4">
            {segments.map((segment, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium text-gray-800">段落 {index + 1}</h5>
                  <span className="text-sm text-gray-500">{segment.story.length} 字符</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <h6 className="font-medium text-gray-700 mb-1">原文</h6>
                    <p className="text-gray-700 leading-relaxed">{segment.story}</p>
                  </div>
                  <div>
                    <h6 className="font-medium text-gray-700 mb-1">法语翻译</h6>
                    <p className="text-gray-600 leading-relaxed italic">{segment.frenchTranslation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'raw' && (
          <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-auto">
            <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
} 
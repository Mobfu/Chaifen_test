# Coze 工作流测试网页

这是一个基于 Next.js 和 TypeScript 构建的网页应用，用于测试 Coze 工作流 API 集成。

## 功能特性

- 🎨 现代化的用户界面设计
- 📱 响应式布局，支持移动设备
- ⚡ 实时的工作流执行和结果展示
- 📝 固定的工作流参数表单 (content, image_prompt, title)
- 🔒 环境变量配置，保护敏感的API信息
- 🖼️ 自动识别和展示生成的图片
- 🔍 大图预览和图片下载功能
- 🛡️ 完善的错误处理和状态管理

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量（必需）

复制环境变量示例文件：

```bash
cp env.example .env.local
```

编辑 `.env.local` 文件，填入您的 Coze API 配置：

```env
# Coze API配置
COZE_API_TOKEN=your_coze_api_token_here
COZE_BASE_URL=https://api.coze.cn/v1
COZE_WORKFLOW_ID=your_workflow_id_here
```

**说明：**
- 环境变量配置是必需的，应用完全依赖环境变量获取API配置
- 这样确保敏感的API信息不会暴露在前端界面中
- 请确保所有必需的环境变量都已正确配置

### 3. 运行开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 使用说明

1. **环境变量配置**：必须在 `.env.local` 文件中配置 API 信息
2. **参数设置**：
   - 填写内容描述 (content)
   - 设置图片生成提示 (image_prompt)  
   - 输入标题 (title)
3. **执行测试**：点击"执行工作流"按钮开始测试
4. **查看结果**：
   - 执行结果将在页面底部展示
   - 自动识别和展示生成的图片
   - 支持点击图片查看大图和下载功能

## 项目结构

```
├── app/
│   ├── api/
│   │   └── coze-workflow/
│   │       └── route.ts           # 工作流执行API
│   ├── components/
│   │   ├── CozeWorkflowTest.tsx   # 主要组件
│   │   ├── ParametersSection.tsx  # 参数设置组件
│   │   ├── ResultDisplay.tsx      # 结果展示组件
│   │   ├── ImagePreview.tsx       # 图片预览组件
│   │   └── LoadingSpinner.tsx     # 加载动画组件
│   ├── globals.css                # 全局样式
│   ├── layout.tsx                 # 布局组件
│   └── page.tsx                   # 主页面
├── env.example                    # 环境变量示例文件
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Coze API** - 工作流集成

## 开发

### 构建项目

```bash
npm run build
```

### 启动生产服务器

```bash
npm run start
```

### 代码检查

```bash
npm run lint
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License 
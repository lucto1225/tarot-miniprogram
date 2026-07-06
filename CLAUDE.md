# 塔罗占卜 · 微信小程序

基于原生微信小程序 + Coze AI Workflow 的塔罗牌占卜应用。用户输入个人信息和占卜问题后，系统自动匹配最佳牌阵，引导用户抽牌，最终由 AI 给出完整解读。

---

## 技术栈

| 层面 | 技术 | 版本 |
|---|---|---|
| 运行时 | 微信小程序基础库 | `3.16.2` |
| 语言 | JavaScript (ES6+) | ES6 → ES5（微信开发者工具自动转译） |
| 组件框架 | glass-easel | 已启用（`app.json` `componentFramework`） |
| UI 组件库 | [Vant Weapp](https://vant-ui.github.io/vant-weapp/) | `1.11.x` |
| 网络请求 | `wx.request` + Promise 封装 | 原生 API |
| 状态管理 | `getApp()` 全局 data + 页面级 data | 无第三方状态库 |
| 样式方案 | WXSS + CSS 变量 | rpx 响应式单位 |
| 塔罗数据 | 本地 JSON 文件 | `/data/cards.json` + `/data/spreads.json` |
| AI 后端 | [Coze Workflow API v3](https://www.coze.com/docs/developer_guides/workflow_api) | REST，`wx.request` POST 直连 |
| 登录 | `wx.login()` → code 换 openId | Coze 端处理用户标识 |

## 项目结构

```
tarot/
├── app.js                  # 应用入口，全局数据
├── app.json                # 页面注册 + 窗口配置 + glass-easel
├── app.wxss                # 全局样式 + CSS 变量（主题色）
├── project.config.json     # 微信开发者工具配置
├── project.private.config.json  # 本地私有配置（AppID: wx29b8d641131ae3b8）
├── sitemap.json
│
├── pages/
│   ├── index/              # 首页 · 微信登录
│   │   ├── index.js        # wx.login() → 获取用户信息
│   │   ├── index.json      # { "usingComponents": { "van-button": "..." } }
│   │   ├── index.wxml
│   │   └── index.wxss
│   │
│   ├── input/              # 信息输入页
│   │   ├── input.js        # 表单：生日、性别、出生城市、占卜问题
│   │   ├── input.json      # 引入 van-field / van-datetime-picker / van-radio / van-area
│   │   ├── input.wxml
│   │   └── input.wxss
│   │
│   ├── spread/             # 牌阵展示页
│   │   ├── spread.js       # 根据问题匹配牌阵，展示牌阵说明
│   │   ├── spread.json
│   │   ├── spread.wxml
│   │   └── spread.wxss
│   │
│   ├── draw/               # 抽牌页
│   │   ├── draw.js         # 洗牌动画 + 用户点击选牌
│   │   ├── draw.json
│   │   ├── draw.wxml
│   │   └── draw.wxss
│   │
│   └── result/             # 解读结果页
│       ├── result.js       # 展示所选牌面 + Coze AI 解读文案
│       ├── result.json
│       ├── result.wxml
│       └── result.wxss
│
├── data/
│   ├── cards.json          # 78 张塔罗牌（22 大阿卡纳 + 56 小阿卡纳）
│   │                       # 每张牌：id, name_zh, name_en, type, arcana, keywords[], meaning_upright, meaning_reversed
│   └── spreads.json        # 牌阵定义
│   │                       # 每个牌阵：id, name, card_count, positions[], suitable_for[], description
│
├── services/
│   ├── api.js              # Coze Workflow API 封装
│   │                       # - cozeRequest(workflowId, params) → Promise
│   │                       # - 错误处理、loading 状态
│   └── auth.js             # 微信登录封装
│                           # - wxLogin() → Promise<{ code, userInfo }>
│                           # - 检查登录态、Session 过期处理
│
├── components/
│   └── tarot-card/         # 塔罗牌面组件（可复用）
│       ├── index.js
│       ├── index.json
│       ├── index.wxml
│       └── index.wxss
│
├── images/
│   └── tarot/              # 78 张塔罗牌面图片（命名: card_{id}.png）
│
├── utils/
│   └── util.js             # 通用工具函数（formatTime 等）

│
├── .claude/
│   ├── settings.local.json # Claude Code 本地配置
│   └── skills/             # Superpowers-zh 20 个 skills
│
└── miniprogram_npm/        # npm 构建产物（Vant Weapp）
```

## 用户流程

```
微信打开小程序
    │
    ▼
[登录页 index]  ──wx.login()──▶  获取 openId + 用户头像昵称
    │
    ▼
[信息输入页 input]  ──表单填写──▶  { 生日, 性别, 出生城市, 占卜问题 }
    │
    ▼
[牌阵展示页 spread]  ──问题匹配──▶  展示推荐牌阵 + 各位置含义
    │
    ▼
[抽牌页 draw]  ──洗牌 + 用户点选──▶  选出 N 张牌（N = 牌阵卡位数）
    │
    ▼
[结果页 result]  ──Coze API──▶  展示牌面 + AI 解读文案
    │                        每张牌位置含义 + 综合分析
    ▼
[可返回首页重新占卜]
```

## Coze Workflow 对接说明

### 调用方式
```js
// services/api.js
function tarotDivination(params) {
  return wx.request({
    url: 'https://api.coze.cn/v3/workflow/run',
    method: 'POST',
    header: {
      'Authorization': 'Bearer <YOUR_COZE_API_TOKEN>',
      'Content-Type': 'application/json'
    },
    data: {
      workflow_id: '<YOUR_WORKFLOW_ID>',
      parameters: {
        birthday: params.birthday,      // "1990-05-20"
        gender: params.gender,          // "男" | "女"
        birth_city: params.birthCity,   // "北京"
        question: params.question,      // 用户的占卜问题
        spread_id: params.spreadId,     // 匹配到的牌阵 ID
        cards: params.cards,            // 用户抽到的牌 [cardId1, cardId2, ...]
        card_positions: params.positions // 每张牌对应的位置
      }
    }
  })
}
```

### 入参
- `birthday`: 用户生日
- `gender`: 性别
- `birth_city`: 出生城市
- `question`: 占卜问题
- `spread_id`: 牌阵 ID（前端匹配后传入）
- `cards`: 用户抽取的牌 ID 数组
- `card_positions`: 牌与牌阵位置的对应关系

### 出参
- 每张牌的解读（结合位置含义）
- 综合分析/总结建议
- 流式返回可选（增强体验）

## 牌阵匹配逻辑

```
用户输入问题
    │
    ▼
提取关键词（情感/事业/健康/财运/决策/通用）
    │
    ▼
遍历 spreads.json → 匹配 suitable_for 字段
    │
    ├── "情感" → 爱情十字牌阵 (5 张)
    ├── "事业" → 事业三选一 (6 张)
    ├── "决策" → 二选一牌阵 (4 张)
    └── "通用" → 凯尔特十字 (10 张) / 圣三角 (3 张)
    │
    ▼
展示牌阵 + 各位置含义 → 用户确认后进入抽牌
```

## 开发约束

1. **不建后端服务** — Coze Workflow 直连，API Token 存小程序云存储或配置中（注意安全性）
2. **塔罗数据本地化** — `data/cards.json` 和 `data/spreads.json` 不经过网络请求
3. **API Token 安全** — 不要将 Coze API Token 上传到 Git，存入私有配置或小程序云开发环境变量
4. **包体积控制** — 微信小程序主包 ≤ 2MB，塔罗牌图片使用 WebP 格式，或使用云存储外链
5. **基础库兼容** — 最低支持 3.0.0 基础库，主要运行在 3.16.2

---

## Git 忽略规则

```gitignore
# 已在 .gitignore 中配置
node_modules/
miniprogram_npm/
.env
project.private.config.json
```

---

<!-- superpowers-zh:begin (do not edit between these markers) -->

## Superpowers-ZH 中文增强版

本项目已安装 superpowers-zh 技能框架（20 个 skills）。

### 核心规则

1. **收到任务时，先检查是否有匹配的 skill** — 哪怕只有 1% 的可能性也要检查
2. **设计先于编码** — 收到功能需求时，先用 brainstorming skill 做需求分析
3. **测试先于实现** — 写代码前先写测试（TDD）
4. **验证先于完成** — 声称完成前必须运行验证命令

### 可用 Skills

Skills 位于 `.claude/skills/` 目录，每个 skill 有独立的 `SKILL.md` 文件。

- **brainstorming**: 在任何创造性工作之前必须使用此技能——创建功能、构建组件、添加功能或修改行为。在实现之前先探索用户意图、需求和设计。
- **chinese-code-review**: 中文 review 沟通参考——话术模板、分级标注（必须修复/建议修改/仅供参考）、国内团队常见反模式应对。仅在用户显式 /chinese-code-review 时调用，不要根据上下文自动触发。
- **chinese-commit-conventions**: 中文 commit 与 changelog 配置参考——Conventional Commits 中文适配、commitlint/husky/commitizen 中文模板、conventional-changelog 中文配置。仅在用户显式 /chinese-commit-conventions 时调用，不要根据上下文自动触发。
- **chinese-documentation**: 中文文档排版参考——中英文空格、全半角标点、术语保留、链接格式、中文文案排版指北约定。仅在用户显式 /chinese-documentation 时调用，不要根据上下文自动触发。
- **chinese-git-workflow**: 国内 Git 平台配置参考——Gitee、Coding.net、极狐 GitLab、CNB 的 SSH/HTTPS/凭据/CI 接入差异与镜像同步配置。仅在用户显式 /chinese-git-workflow 时调用，不要根据上下文自动触发。
- **dispatching-parallel-agents**: 当面对 2 个以上可以独立进行、无共享状态或顺序依赖的任务时使用
- **executing-plans**: 当你有一份书面实现计划需要在单独的会话中执行，并设有审查检查点时使用
- **finishing-a-development-branch**: 当实现完成、所有测试通过、需要决定如何集成工作时使用——通过提供合并、PR 或清理等结构化选项来引导开发工作的收尾
- **mcp-builder**: MCP 服务器构建方法论 — 系统化构建生产级 MCP 工具，让 AI 助手连接外部能力
- **receiving-code-review**: 收到代码审查反馈后、实施建议之前使用，尤其当反馈不明确或技术上有疑问时——需要技术严谨性和验证，而非敷衍附和或盲目执行
- **requesting-code-review**: 完成任务、实现重要功能或合并前使用，用于验证工作成果是否符合要求
- **subagent-driven-development**: 当在当前会话中执行包含独立任务的实现计划时使用
- **systematic-debugging**: 遇到任何 bug、测试失败或异常行为时使用，在提出修复方案之前执行
- **test-driven-development**: 在实现任何功能或修复 bug 时使用，在编写实现代码之前
- **using-git-worktrees**: 当需要开始与当前工作区隔离的功能开发，或在执行实现计划之前使用——通过原生工具或 git worktree 回退机制确保隔离工作区存在
- **using-superpowers**: 在开始任何对话时使用——确立如何查找和使用技能，要求在任何响应（包括澄清性问题）之前调用 Skill 工具
- **verification-before-completion**: 在宣称工作完成、已修复或测试通过之前使用，在提交或创建 PR 之前——必须运行验证命令并确认输出后才能声称成功；始终用证据支撑断言
- **workflow-runner**: 在 Claude Code / OpenClaw / Cursor 中直接运行 agency-orchestrator YAML 工作流——无需 API key，使用当前会话的 LLM 作为执行引擎。当用户提供 .yaml 工作流文件或要求多角色协作完成任务时触发。
- **writing-plans**: 当你有规格说明或需求用于多步骤任务时使用，在动手写代码之前
- **writing-skills**: 当创建新技能、编辑现有技能或在部署前验证技能是否有效时使用

### 如何使用

当任务匹配某个 skill 时，使用 `Skill` 工具加载对应 skill 并严格遵循其流程。绝不要用 Read 工具读取 SKILL.md 文件。

如果你认为哪怕只有 1% 的可能性某个 skill 适用于你正在做的事情，你必须调用该 skill 检查。

<!-- superpowers-zh:end -->

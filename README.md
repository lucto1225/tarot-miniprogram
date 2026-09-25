# 塔罗占卜 · AI 微信小程序

基于原生微信小程序 + Coze AI Workflow 的塔罗牌占卜应用。用户输入个人信息和占卜问题后，小程序通过**本地关键词算法自动匹配牌阵**，引导用户洗牌抽牌（支持逆位），最后由 **LLM 结合牌阵位置含义生成个性化解读**。

## 📱 演示

完整流程演示（67 秒）：登录 → 信息输入 → 牌阵匹配 → 洗牌抽牌 → AI 解读

<video src="docs/demo.mp4" controls width="100%"></video>

> 若视频未加载，可[直接下载观看](docs/demo.mp4)

## ✨ 功能特性

- **完整占卜闭环**：登录 → 信息输入 → 牌阵展示 → 洗牌抽牌 → AI 解读，5 个页面
- **智能牌阵匹配**：本地关键词匹配算法，9 种牌阵按优先级命中（详见下文），无网络延迟
- **全量塔罗数据**：78 张牌（22 大阿卡纳 + 56 小阿卡纳），正位/逆位双语义解读
- **AI 个性化解读**：Coze Workflow 按「牌面 × 牌阵位置」生成结构化解读，Markdown 渲染
- **洗牌抽牌动效**：洗牌动画 + 点选翻牌 + 逆位随机
- **用户信息持久化**：生日/性别/城市本地缓存，跨会话免重复输入
- **密钥安全**：Coze token 存于本地私有配置，已加入 `.gitignore`

## 🏗 架构

```
┌────────────── 微信小程序 ──────────────┐
│  index → input → spread → draw → result │
│         │ 本地牌阵匹配（关键词算法）      │
│         │ 78 张牌面数据 / CDN 图片       │
└──────────────┬──────────────────────────┘
               │ wx.request (HTTPS)
               ▼
      ┌─────────────────┐
      │  Coze Workflow   │  ← 业务编排（LLM 节点）
      │  (api.coze.cn)   │
      └─────────────────┘
```

设计约束：**不建自研后端**，Coze Workflow 直连托管 AI 链路；塔罗数据全部本地化，仅解读走网络。

## 🎴 牌阵匹配算法

`pages/input/input.js` 中的 `matchSpreadLocal()` 遍历 `data/spreads.js` 定义的牌阵，按 `priority` 升序对用户问题进行**关键词子串匹配**，首个命中即选中；无命中回退到「圣三角牌阵」。

| 优先级 | 牌阵 | 张数 | 匹配关键词（节选） |
|---|---|---|---|
| 1 | Yes/No 牌阵 | 1 | 是否、会不会、能不能… |
| 2 | 单张指引 | 1 | 简单、快速、每日运势… |
| 3 | 金字塔牌阵 | 4 | 感情、爱情、暗恋、婚姻… |
| 4 | 二选一牌阵 | 5 | 选择、纠结、还是… |
| 5 | 时间流牌阵 | 3 | 过去现在未来、走向… |
| 6 | 身心灵牌阵 | 3 | 内在、自我、灵性… |
| 7 | 圣三角牌阵（兜底） | 3 | 怎么办、建议、想不通… |
| 8 | 六芒星牌阵 | 7 | 关系、人际、复合、全面分析… |
| 9 | 凯尔特十字 | 10 | 事业、职业、人生、综合… |

逆位支持：抽牌时随机决定正逆位，解读文案自动切换对应语义。

## 🛠 技术栈

| 层面 | 技术 |
|---|---|
| 运行时 | 微信小程序原生框架（glass-easel 组件框架，基础库 3.16.2） |
| 语言 | JavaScript (ES6+，开发者工具自动转译) |
| UI 组件 | [Vant Weapp](https://vant-ui.github.io/vant-weapp/) 1.11.x |
| 网络 | `wx.request` + Promise 封装 |
| 样式 | WXSS + CSS 变量 + rpx |
| AI 后端 | [Coze Workflow API](https://www.coze.cn/docs/developer_guides/workflow_run)（POST `/v1/workflow/run`） |
| 牌面图片 | CDN 外链（避免主包超 2MB 限制） |

## 📂 目录结构

```
tarot/
├── pages/
│   ├── index/     # 首页：微信登录（wx.login + 头像昵称授权）
│   ├── input/     # 信息输入：生日/性别/城市/问题 + 本地牌阵匹配
│   ├── spread/    # 牌阵展示：位置含义说明
│   ├── draw/      # 抽牌页：洗牌动画 + 点选翻牌（正逆位）
│   └── result/    # 结果页：牌面展示 + AI 解读（rich-text 渲染）
├── data/
│   ├── cards.js    # 78 张塔罗牌全量数据（含正逆位语义）
│   └── spreads.js  # 9 种牌阵定义（关键词/优先级/位置）
├── services/
│   ├── api.js      # Coze Workflow API 封装
│   ├── auth.js     # 微信登录封装
│   └── config.local.js  # 本地私有配置（token/workflowId，不入库）
├── components/tarot-card/  # 塔罗牌面组件
├── utils/util.js   # 工具函数 + Markdown→HTML 转换
└── workflow.md     # Coze 工作流设计文档
```

## 🚀 快速开始

1. **导入项目**：微信开发者工具 → 导入 `tarot/` 目录，填入你的 AppID（或选测试号）
2. **构建 npm**：工具 → 构建 npm（Vant Weapp）
3. **配置密钥**：
   ```bash
   cp services/config.example.js services/config.local.js
   ```
   填入 Coze 个人访问令牌（需勾选工作流运行权限）和工作流 ID
4. **Coze 工作流**：按 `workflow.md` 的设计在 Coze 创建同名工作流并发布
5. **运行**：编译预览；真机体验需在小程序后台将 `api.coze.cn` 加入 request 合法域名

## 🔒 安全说明

- `config.local.js`（含真实 token）已通过 `.gitignore` 排除，仓库仅含占位示例 `config.example.js`
- 当前 token 直连方案适合开发/演示；上线生产建议加一层自建代理服务，避免 token 暴露在客户端
- Coze token 请定期轮换

## 📄 License

[MIT](LICENSE)

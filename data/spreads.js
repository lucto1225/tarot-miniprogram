// 塔罗牌阵定义
// 每个牌阵：id, name, card_count, positions[], suitable_for[], description

const spreads = [
  {
    id: 'celtic_cross',
    name: '凯尔特十字牌阵',
    card_count: 10,
    suitable_for: ['运势', '发展', '未来', '整体', '综合', '全面', '事业', '人生'],
    description: '最经典、最全面的塔罗牌阵之一，适合深入分析任何复杂问题，揭示过去、现在和未来的完整图景。',
    positions: [
      { name: '核心', meaning: '当前处境的核心能量' },
      { name: '阻碍', meaning: '阻碍或促进的因素' },
      { name: '根源', meaning: '问题的深层根源' },
      { name: '过去', meaning: '影响当下的过去事件' },
      { name: '目标', meaning: '可以达到的最高目标' },
      { name: '未来', meaning: '近期未来走向' },
      { name: '态度', meaning: '问卜者当前的态度和状态' },
      { name: '环境', meaning: '外部环境和他人影响' },
      { name: '希望/恐惧', meaning: '内心的希望或恐惧' },
      { name: '结果', meaning: '最终的结论和结果' }
    ]
  },
  {
    id: 'love_cross',
    name: '爱情十字牌阵',
    card_count: 5,
    suitable_for: ['感情', '情感', '爱情', '恋爱', '喜欢', '暗恋', '婚姻', '关系', '分手', '复合'],
    description: '专门为感情问题设计的经典牌阵，揭示双方状态、关系现状与未来走向。',
    positions: [
      { name: '你的状态', meaning: '问卜者当前的感情状态和心境' },
      { name: '对方状态', meaning: '对方当前的感情状态和心境' },
      { name: '关系现状', meaning: '两人关系的核心能量' },
      { name: '障碍/助力', meaning: '当前关系中的阻碍或积极因素' },
      { name: '未来结果', meaning: '这段感情的未来走向' }
    ]
  },
  {
    id: 'golden_triangle',
    name: '圣三角牌阵',
    card_count: 3,
    suitable_for: ['怎么办', '选择', '想不通', '简单', '快速', '建议'],
    description: '简洁而深刻的经典三牌阵，适合快速获得答案和建议，尤其适合初次占卜。',
    positions: [
      { name: '过去', meaning: '导致现状的过去因素' },
      { name: '现在', meaning: '当前处境和核心问题' },
      { name: '未来', meaning: '发展趋势和最终结果' }
    ]
  },
  {
    id: 'two_choices',
    name: '二选一牌阵',
    card_count: 5,
    suitable_for: ['选择', '抉择', '纠结', '对比', '哪个', '还是', '要不要'],
    description: '当面临两个选项举棋不定时，分别揭示两条路径的不同结果，帮助你做出明智决策。',
    positions: [
      { name: '现状', meaning: '你当前的处境和心态' },
      { name: '选项A过程', meaning: '选择A会经历的过程' },
      { name: '选项A结果', meaning: '选择A的最终结果' },
      { name: '选项B过程', meaning: '选择B会经历的过程' },
      { name: '选项B结果', meaning: '选择B的最终结果' }
    ]
  },
  {
    id: 'career_choice',
    name: '事业抉择牌阵',
    card_count: 6,
    suitable_for: ['事业', '工作', '职业', '求职', '跳槽', '转行', '创业', '发展'],
    description: '聚焦事业发展，从多个角度分析职场现状、机遇挑战与上升路径。',
    positions: [
      { name: '当前状况', meaning: '你当前的职业状态' },
      { name: '核心优势', meaning: '你最值得发挥的优势' },
      { name: '隐藏挑战', meaning: '需要注意的潜在问题' },
      { name: '发展机遇', meaning: '即将出现的机会' },
      { name: '贵人/资源', meaning: '可以获得的支持' },
      { name: '事业前景', meaning: '职业发展的整体展望' }
    ]
  }
]

module.exports = spreads

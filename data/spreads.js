// 塔罗牌阵定义
// 匹配优先级: yes-no → 单张 → 金字塔(情感) → 二选一(5张) → 三牌阵 → 六芒星(人际深层) → 凯尔特十字

var spreads = [
  // ==================== 1 张牌 ====================
  {
    id: 'yes_no',
    name: 'Yes/No 牌阵',
    card_count: 1,
    priority: 1,
    suitable_for: ['是否', '会不会', '能不能', '可以吗', '对吗', '要不要', '应不应该', '是不是', '有无', 'yes', 'no'],
    description: '最简单的占卜方式，一张牌直接回答你的问题。正位表示肯定/有利，逆位表示否定/不利。',
    positions: [
      { name: '答案', meaning: '问题的直接答案' }
    ]
  },
  {
    id: 'single_card',
    name: '单张指引牌阵',
    card_count: 1,
    priority: 2,
    suitable_for: ['简单', '快速', '一句话', '概括', '简洁', '每日', '运势'],
    description: '一张牌为你提供今日指引或问题的核心启示，简洁有力。',
    positions: [
      { name: '指引', meaning: '宇宙给你的核心讯息' }
    ]
  },

  // ==================== 4 张牌 - 情感状态 ====================
  {
    id: 'pyramid',
    name: '金字塔牌阵',
    card_count: 4,
    priority: 3,
    suitable_for: ['感情', '情感', '爱情', '恋爱', '喜欢', '暗恋', '婚姻', '另一半', '对象', '正缘', '桃花', '心动', '暧昧'],
    description: '专为感情状态设计的牌阵，从四个角度揭示你的感情全貌。',
    positions: [
      { name: '感情现状', meaning: '你当前感情关系的核心能量' },
      { name: '提问者现状', meaning: '你在感情中的状态和心态' },
      { name: '对方现状', meaning: '对方在感情中的状态和心态' },
      { name: '未来发展', meaning: '感情关系的未来走向' }
    ]
  },

  // ==================== 5 张牌 - 选择 ====================
  {
    id: 'two_choices',
    name: '二选一牌阵',
    card_count: 5,
    priority: 4,
    suitable_for: ['选择', '抉择', '纠结', '哪个', '还是', '对比', '取舍', '选哪个'],
    description: '当面临两个方向举棋不定时，分别揭示两条路径的过程与结果。',
    positions: [
      { name: '现状', meaning: '你当前的处境和心态' },
      { name: '选项A过程', meaning: '选择A会经历的过程' },
      { name: '选项A结果', meaning: '选择A的最终结果' },
      { name: '选项B过程', meaning: '选择B会经历的过程' },
      { name: '选项B结果', meaning: '选择B的最终结果' }
    ]
  },

  // ==================== 3 张牌 ====================
  {
    id: 'timeline',
    name: '时间流牌阵',
    card_count: 3,
    priority: 5,
    suitable_for: ['过去现在未来', '时间线', '过程', '趋势', '走向', '发展过程'],
    description: '揭示过去的影响、现在的状态和未来的趋势，看清事情的发展脉络。',
    positions: [
      { name: '过去', meaning: '影响当下的过去因素' },
      { name: '现在', meaning: '当前处境和核心能量' },
      { name: '未来', meaning: '未来的发展趋势' }
    ]
  },
  {
    id: 'mind_body_spirit',
    name: '身心灵牌阵',
    card_count: 3,
    priority: 5,
    suitable_for: ['身心', '灵性', '内在', '自我', '灵魂', '精神状态', '个人成长'],
    description: '从身体、心理、灵性三个层面深度探索你的内在状态。',
    positions: [
      { name: '身', meaning: '身体状态和外在处境' },
      { name: '心', meaning: '心理状态和情绪感受' },
      { name: '灵', meaning: '灵性状态和内在智慧' }
    ]
  },
  {
    id: 'golden_triangle',
    name: '圣三角牌阵',
    card_count: 3,
    priority: 5,
    suitable_for: ['怎么办', '建议', '想不通', '什么意思', '为什么会', '帮助', '不知道'],
    description: '最经典的三牌阵，帮你理清来龙去脉，找到前行的方向。',
    positions: [
      { name: '过去', meaning: '导致现状的过去因素' },
      { name: '现在', meaning: '当前处境和核心问题' },
      { name: '未来', meaning: '发展和最终结果' }
    ]
  },

  // ==================== 7 张牌 - 人际深层分析 ====================
  {
    id: 'hexagram',
    name: '六芒星牌阵',
    card_count: 7,
    priority: 6,
    suitable_for: ['关系', '人际', '双方', '伴侣', '朋友', '合作', '分手', '复合', '深入', '详细', '全面分析'],
    description: '深入探索人与人之间关系的牌阵，从七个角度全面揭示连接的真相。适合需要详细分析的人际和情感问题。',
    positions: [
      { name: '过去', meaning: '关系的历史渊源' },
      { name: '现在', meaning: '关系的当前状况' },
      { name: '未来', meaning: '关系的发展趋势' },
      { name: '原因', meaning: '问题的根本原因' },
      { name: '环境', meaning: '外部环境对关系的影响' },
      { name: '态度', meaning: '双方的真实态度与期望' },
      { name: '结果', meaning: '关系的最终走向' }
    ]
  },

  // ==================== 10 张牌 - 默认兜底 ====================
  {
    id: 'celtic_cross',
    name: '凯尔特十字牌阵',
    card_count: 10,
    priority: 7,
    suitable_for: ['全面', '综合', '全貌', '人生', '事业', '工作', '职业', '发展', '命运', '整体'],
    description: '最全面深入的塔罗牌阵，适合探索复杂问题，揭示事件全貌与深层真相。',
    positions: [
      { name: '核心', meaning: '当前处境的核心能量' },
      { name: '阻碍', meaning: '横跨在你面前的阻碍' },
      { name: '根源', meaning: '问题的深层根源' },
      { name: '过去', meaning: '正在逝去的影响' },
      { name: '目标', meaning: '可以达到的最高目标' },
      { name: '未来', meaning: '近期未来走向' },
      { name: '态度', meaning: '你当前的真实态度' },
      { name: '环境', meaning: '外部环境和他人影响' },
      { name: '希望与恐惧', meaning: '内心的希望或恐惧' },
      { name: '结果', meaning: '最终的结论和结果' }
    ]
  }
]

module.exports = spreads

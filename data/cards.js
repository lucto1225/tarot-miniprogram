// 78 张塔罗牌数据
// 每张牌包含：id, name_zh, name_en, type(major/minor), arcana, suit, keywords, meaning_upright, meaning_reversed

var cards = [
  // ==================== 大阿卡纳 (Major Arcana) 0-21 ====================
  { id: 0, name_zh: '愚者', name_en: 'The Fool', type: 'major', arcana: 0, suit: null,
    keywords: ['开始', '冒险', '天真', ' spontaneity'],
    meaning_upright: '新的开始、冒险精神、自由、天真、无限可能',
    meaning_reversed: '鲁莽、轻率、犹豫不决、错失良机' },

  { id: 1, name_zh: '魔术师', name_en: 'The Magician', type: 'major', arcana: 1, suit: null,
    keywords: ['创造力', '技能', '意志力', '专注'],
    meaning_upright: '创造力、技能、意志力、表现力、掌控力',
    meaning_reversed: '滥用才华、缺乏方向、欺骗、躁动' },

  { id: 2, name_zh: '女祭司', name_en: 'The High Priestess', type: 'major', arcana: 2, suit: null,
    keywords: ['直觉', '潜意识', '神秘', '内在知识'],
    meaning_upright: '直觉、潜意识知识、神秘力量、内在智慧',
    meaning_reversed: '忽视直觉、秘密泄露、情感封闭' },

  { id: 3, name_zh: '皇后', name_en: 'The Empress', type: 'major', arcana: 3, suit: null,
    keywords: ['丰饶', '母性', '自然', '感官'],
    meaning_upright: '丰饶、母性、自然之美、创造力、感官享受',
    meaning_reversed: '依赖、创造力枯竭、情感贫瘠' },

  { id: 4, name_zh: '皇帝', name_en: 'The Emperor', type: 'major', arcana: 4, suit: null,
    keywords: ['权威', '结构', '稳定', '领导力'],
    meaning_upright: '权威、稳定、结构、领导力、秩序建立',
    meaning_reversed: '专制、失控、缺乏纪律、权威滥用' },

  { id: 5, name_zh: '教皇', name_en: 'The Hierophant', type: 'major', arcana: 5, suit: null,
    keywords: ['传统', '信仰', '教导', '精神指引'],
    meaning_upright: '传统智慧、精神指导、信仰、正规学习',
    meaning_reversed: '反叛传统、盲目追随、教条主义' },

  { id: 6, name_zh: '恋人', name_en: 'The Lovers', type: 'major', arcana: 6, suit: null,
    keywords: ['爱情', '选择', '和谐', '关系'],
    meaning_upright: '爱情、和谐、重要选择、灵魂伴侣、价值契合',
    meaning_reversed: '分离、不忠、错误选择、价值观冲突' },

  { id: 7, name_zh: '战车', name_en: 'The Chariot', type: 'major', arcana: 7, suit: null,
    keywords: ['胜利', '决心', '掌控', '前进'],
    meaning_upright: '胜利、决心、自我掌控、勇往直前',
    meaning_reversed: '失控、挫败、缺乏方向、犹豫不决' },

  { id: 8, name_zh: '力量', name_en: 'Strength', type: 'major', arcana: 8, suit: null,
    keywords: ['勇气', '耐心', '内心力量', '驯服'],
    meaning_upright: '内在力量、勇气、耐心、以柔克刚',
    meaning_reversed: '软弱、恐惧、失控、自我怀疑' },

  { id: 9, name_zh: '隐士', name_en: 'The Hermit', type: 'major', arcana: 9, suit: null,
    keywords: ['内省', '孤独', '寻求真理', '冥想'],
    meaning_upright: '内省、寻求智慧、独处、精神探索',
    meaning_reversed: '孤立、逃避现实、拒绝帮助' },

  { id: 10, name_zh: '命运之轮', name_en: 'The Wheel of Fortune', type: 'major', arcana: 10, suit: null,
    keywords: ['命运', '转折', '循环', '机遇'],
    meaning_upright: '命运转折、好运降临、循环往复、关键节点',
    meaning_reversed: '厄运、失控、负面循环、错过时机' },

  { id: 11, name_zh: '正义', name_en: 'Justice', type: 'major', arcana: 11, suit: null,
    keywords: ['公正', '真理', '因果', '责任'],
    meaning_upright: '公正、真理、因果报应、正确决策、平衡',
    meaning_reversed: '不公、偏见、逃避责任、失衡' },

  { id: 12, name_zh: '倒吊人', name_en: 'The Hanged Man', type: 'major', arcana: 12, suit: null,
    keywords: ['牺牲', '放手', '新视角', '暂停'],
    meaning_upright: '牺牲、换个角度、暂停、放手、精神转化',
    meaning_reversed: '固执、无谓牺牲、拖延、拒绝改变' },

  { id: 13, name_zh: '死神', name_en: 'Death', type: 'major', arcana: 13, suit: null,
    keywords: ['结束', '转变', '重生', '净化'],
    meaning_upright: '结束与重生、重大转变、放下过去、净化',
    meaning_reversed: '抗拒改变、停滞、恐惧转变、拖着不放手' },

  { id: 14, name_zh: '节制', name_en: 'Temperance', type: 'major', arcana: 14, suit: null,
    keywords: ['平衡', '调和', '耐心', '中庸'],
    meaning_upright: '平衡、调和、耐心等待、中庸之道、整合',
    meaning_reversed: '失衡、过度、缺乏耐心、冲突' },

  { id: 15, name_zh: '恶魔', name_en: 'The Devil', type: 'major', arcana: 15, suit: null,
    keywords: ['束缚', '欲望', '物质主义', '阴影'],
    meaning_upright: '束缚、欲望、物质依赖、面对自己的阴影',
    meaning_reversed: '挣脱束缚、觉醒、摆脱依赖、重新掌控' },

  { id: 16, name_zh: '高塔', name_en: 'The Tower', type: 'major', arcana: 16, suit: null,
    keywords: ['突变', '崩塌', '觉醒', '颠覆'],
    meaning_upright: '突然变故、旧结构崩塌、真相大白、觉醒',
    meaning_reversed: '逃避灾变、延缓崩溃、内心恐惧' },

  { id: 17, name_zh: '星星', name_en: 'The Star', type: 'major', arcana: 17, suit: null,
    keywords: ['希望', '疗愈', '灵感', '信仰'],
    meaning_upright: '希望、疗愈、灵感、内心平静、美好未来',
    meaning_reversed: '绝望、失去信心、灵感枯竭、消极' },

  { id: 18, name_zh: '月亮', name_en: 'The Moon', type: 'major', arcana: 18, suit: null,
    keywords: ['幻象', '恐惧', '潜意识', '迷惑'],
    meaning_upright: '幻象、潜意识浮现、不安、直觉敏锐',
    meaning_reversed: '真相揭晓、恐惧消散、走出迷茫' },

  { id: 19, name_zh: '太阳', name_en: 'The Sun', type: 'major', arcana: 19, suit: null,
    keywords: ['喜悦', '成功', '活力', '孩童'],
    meaning_upright: '喜悦、成功、活力、阳光灿烂、正向能量',
    meaning_reversed: '短暂成功、阴云、缺乏活力、压抑' },

  { id: 20, name_zh: '审判', name_en: 'Judgement', type: 'major', arcana: 20, suit: null,
    keywords: ['复活', '召唤', '清算', '觉醒'],
    meaning_upright: '觉醒召唤、重新评估、内心清算、人生新阶段',
    meaning_reversed: '逃避召唤、后悔、无法释怀、自我批判' },

  { id: 21, name_zh: '世界', name_en: 'The World', type: 'major', arcana: 21, suit: null,
    keywords: ['完成', '圆满', '旅程', '成就'],
    meaning_upright: '完美结局、圆满达成、旅程完成、整体融合',
    meaning_reversed: '功亏一篑、不完整、拖延完成、空虚' },

  // ==================== 小阿卡纳 (Minor Arcana) ====================
  // --- 圣杯 (Cups) - 情感 ---
  { id: 22, name_zh: '圣杯王牌', name_en: 'Ace of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['新情感', '爱', '直觉', '喜悦'],
    meaning_upright: '新感情的开始、爱与喜悦、情感满溢、直觉开启',
    meaning_reversed: '情感空洞、压抑、失去爱、创造力枯竭' },

  { id: 23, name_zh: '圣杯二', name_en: 'Two of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['结合', '伴侣', '共鸣', '双人'],
    meaning_upright: '两情相悦、合作关系、灵魂伴侣、和谐统一',
    meaning_reversed: '关系破裂、不平等、分离、不信任' },

  { id: 24, name_zh: '圣杯三', name_en: 'Three of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['庆祝', '友谊', '团体', '欢乐'],
    meaning_upright: '欢庆、友谊、团体聚会、分享快乐、团结',
    meaning_reversed: '社交过度、流言蜚语、团体分裂' },

  { id: 25, name_zh: '圣杯四', name_en: 'Four of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['倦怠', '沉思', '不满', '冷漠'],
    meaning_upright: '倦怠、内省、对现状不满、忽视机会',
    meaning_reversed: '觉醒、抓住新机、摆脱倦怠' },

  { id: 26, name_zh: '圣杯五', name_en: 'Five of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['失落', '遗憾', '悲伤', '遗弃'],
    meaning_upright: '失落与遗憾、悲伤、但仍有希望留下',
    meaning_reversed: '走出阴影、接受现实、看到阳光、重建' },

  { id: 27, name_zh: '圣杯六', name_en: 'Six of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['回忆', '纯真', '往事', '怀旧'],
    meaning_upright: '童年回忆、纯真、怀旧、分享快乐',
    meaning_reversed: '沉溺过去、无法前行、幻想破灭' },

  { id: 28, name_zh: '圣杯七', name_en: 'Seven of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['幻想', '选择', '迷梦', '诱惑'],
    meaning_upright: '多重选择、幻想、创造灵感、但也容易迷失',
    meaning_reversed: '认清现实、做出决定、专注目标' },

  { id: 29, name_zh: '圣杯八', name_en: 'Eight of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['离去', '追寻', '放弃', '更高意义'],
    meaning_upright: '放下过往、追寻更高意义、离开舒适区',
    meaning_reversed: '徘徊不走、恐惧改变、无法放手' },

  { id: 30, name_zh: '圣杯九', name_en: 'Nine of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['如愿', '满足', '幸福', '舒适'],
    meaning_upright: '愿望成真、心满意足、幸福感、自得其乐',
    meaning_reversed: '虚假满足、贪婪、内在空虚、炫耀' },

  { id: 31, name_zh: '圣杯十', name_en: 'Ten of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['美满', '家庭', '和谐', '终极幸福'],
    meaning_upright: '家庭美满、情感圆满、和谐幸福、理想实现',
    meaning_reversed: '家庭不和、理想破碎、短暂幸福' },

  { id: 32, name_zh: '圣杯侍从', name_en: 'Page of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['创意', '敏感', '启示', '艺术'],
    meaning_upright: '创意灵感、敏感心灵、好消息、年轻艺术家',
    meaning_reversed: '情绪化、不成熟、创意受阻、空想' },

  { id: 33, name_zh: '圣杯骑士', name_en: 'Knight of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['浪漫', '追求', '理想化', '魅力'],
    meaning_upright: '浪漫追求、理想主义、魅力四射、情感邀约',
    meaning_reversed: '情绪泛滥、不切实际、空头承诺' },

  { id: 34, name_zh: '圣杯女皇', name_en: 'Queen of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['同理心', '滋养', '直觉', '深情'],
    meaning_upright: '深厚同理心、情感滋养、直觉敏锐、温柔力量',
    meaning_reversed: '情绪过度、依赖、不切实际、自怜' },

  { id: 35, name_zh: '圣杯国王', name_en: 'King of Cups', type: 'minor', arcana: null, suit: 'cups',
    keywords: ['情感成熟', '慈悲', '智慧', '平衡'],
    meaning_upright: '情感成熟、慈悲领导、情绪智慧、内心平衡',
    meaning_reversed: '情绪操控、压抑、冷暴力、失控' },

  // --- 宝剑 (Swords) - 思想/挑战 ---
  { id: 36, name_zh: '宝剑王牌', name_en: 'Ace of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['思维', '真相', '清晰', '决断'],
    meaning_upright: '思维清晰、真理显现、果断出击、新想法',
    meaning_reversed: '思维混乱、误判、错误决定、暴力' },

  { id: 37, name_zh: '宝剑二', name_en: 'Two of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['僵局', '抉择', '回避', '平衡'],
    meaning_upright: '进退两难、重要抉择、需要权衡、暂时回避',
    meaning_reversed: '做出决定、打破僵局、揭示真相' },

  { id: 38, name_zh: '宝剑三', name_en: 'Three of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['心碎', '痛苦', '背叛', '悲伤'],
    meaning_upright: '心碎、痛苦真相、背叛、悲伤释放',
    meaning_reversed: '愈合、从痛苦中恢复、放下过去' },

  { id: 39, name_zh: '宝剑四', name_en: 'Four of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['休息', '恢复', '沉思', '退隐'],
    meaning_upright: '休息恢复、内省、退隐、需要安静',
    meaning_reversed: '复出、焦虑、不知休息、过度活跃' },

  { id: 40, name_zh: '宝剑五', name_en: 'Five of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['冲突', '胜负', '代价', '羞辱'],
    meaning_upright: '冲突、胜负之分、不光彩的胜利、必须付出的代价',
    meaning_reversed: '和解、放下自尊、寻求和平' },

  { id: 41, name_zh: '宝剑六', name_en: 'Six of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['过渡', '离开', '疗愈', '前行'],
    meaning_upright: '艰难过渡、离开困境、走向平静、疗愈',
    meaning_reversed: '无法脱身、抗拒改变、积重难返' },

  { id: 42, name_zh: '宝剑七', name_en: 'Seven of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['策略', '欺骗', '隐秘', '巧计'],
    meaning_upright: '策略巧计、暗中安排、需要谨慎行事',
    meaning_reversed: '曝光、露馅、计谋失败' },

  { id: 43, name_zh: '宝剑八', name_en: 'Eight of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['束缚', '受限', '无力感', '自缚'],
    meaning_upright: '感到束缚、自我限制、无力动弹、需要新视角',
    meaning_reversed: '挣脱束缚、找到出路、重获自由' },

  { id: 44, name_zh: '宝剑九', name_en: 'Nine of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['焦虑', '噩梦', '担忧', '失眠'],
    meaning_upright: '焦虑不安、噩梦连连、过度担忧、内心折磨',
    meaning_reversed: '焦虑消散、看到希望、求助、走出阴霾' },

  { id: 45, name_zh: '宝剑十', name_en: 'Ten of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['终结', '谷底', '完败', '转折'],
    meaning_upright: '彻底终结、触底、背叛导致的毁灭（但已是最低点，只有向上）',
    meaning_reversed: '触底反弹、恢复、从教训中学习' },

  { id: 46, name_zh: '宝剑侍从', name_en: 'Page of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['好奇', '敏锐', '学习', '警惕'],
    meaning_upright: '好奇心、求知欲、思维敏捷、新想法',
    meaning_reversed: '轻率发言、八卦、思维浅薄' },

  { id: 47, name_zh: '宝剑骑士', name_en: 'Knight of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['冲劲', '决断', '速度', '激烈'],
    meaning_upright: '迅猛行动、果断出击、压倒性力量',
    meaning_reversed: '鲁莽冒进、不计后果、过于激进' },

  { id: 48, name_zh: '宝剑女皇', name_en: 'Queen of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['理智', '独立', '洞察', '清晰'],
    meaning_upright: '理智清晰、独立判断、精准洞察、实事求是',
    meaning_reversed: '刻薄、冷漠、过度理性、偏见' },

  { id: 49, name_zh: '宝剑国王', name_en: 'King of Swords', type: 'minor', arcana: null, suit: 'swords',
    keywords: ['权威', '智慧', '法律', '公正'],
    meaning_upright: '智慧权威、公正决策、法律与规则、理性主导',
    meaning_reversed: '专制滥用、不公正、冷酷无情' },

  // --- 权杖 (Wands) - 行动/事业 ---
  { id: 50, name_zh: '权杖王牌', name_en: 'Ace of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['灵感', '新计划', '热情', '创造'],
    meaning_upright: '新灵感、新事业起点、热情燃烧、创造之火',
    meaning_reversed: '创意受阻、热情消退、计划推迟' },

  { id: 51, name_zh: '权杖二', name_en: 'Two of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['规划', '愿景', '抉择', '等待'],
    meaning_upright: '未来规划、宏大愿景、在起点前的最后一步',
    meaning_reversed: '恐惧未来、缺乏规划、迟迟不行动' },

  { id: 52, name_zh: '权杖三', name_en: 'Three of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['拓展', '远见', '贸易', '探索'],
    meaning_upright: '拓展视野、事业扩张、远见卓识、等待收货',
    meaning_reversed: '计划受阻、视野狭窄、挫折' },

  { id: 53, name_zh: '权杖四', name_en: 'Four of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['庆祝', '安定', '里程碑', '归家'],
    meaning_upright: '庆祝成功、安定和谐、里程碑达成',
    meaning_reversed: '不稳定、不安感、暂未抵达安定' },

  { id: 54, name_zh: '权杖五', name_en: 'Five of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['竞争', '冲突', '挑战', '多样性'],
    meaning_upright: '竞争挑战、意见冲突、良性比拼、多元碰撞',
    meaning_reversed: '躲避竞争、冲突升级、不健康争执' },

  { id: 55, name_zh: '权杖六', name_en: 'Six of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['胜利', '认可', '凯旋', '荣誉'],
    meaning_upright: '胜利凯旋、获得认可、荣誉加身、自信',
    meaning_reversed: '失败、不被认可、过于膨胀、嫉妒' },

  { id: 56, name_zh: '权杖七', name_en: 'Seven of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['坚守', '抵抗', '勇气', '防守'],
    meaning_upright: '坚守阵地、抵抗压力、勇气十足、护卫成果',
    meaning_reversed: '退让、难以招架、失去立场' },

  { id: 57, name_zh: '权杖八', name_en: 'Eight of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['速度', '进展', '消息', '畅通'],
    meaning_upright: '高速进展、好消息传来、障碍扫清、快速推进',
    meaning_reversed: '延迟、阻碍、进展缓慢、误解' },

  { id: 58, name_zh: '权杖九', name_en: 'Nine of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['坚守', '韧性', '最后冲刺', '耐力'],
    meaning_upright: '坚守最后关口、绝不放弃、积累韧性',
    meaning_reversed: '崩溃、半途而废、精疲力尽' },

  { id: 59, name_zh: '权杖十', name_en: 'Ten of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['负担', '压力', '过度', '承担'],
    meaning_upright: '负担过重、责任压身、需要释放、超负荷',
    meaning_reversed: '卸下重担、学会拒绝、减轻压力' },

  { id: 60, name_zh: '权杖侍从', name_en: 'Page of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['探索', '新消息', '热情', '冒险'],
    meaning_upright: '探索新领域、好消息、新计划萌芽、冒险精神',
    meaning_reversed: '缺乏方向、肤浅、坏消息' },

  { id: 61, name_zh: '权杖骑士', name_en: 'Knight of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['行动', '冒险', '热情', '冲动'],
    meaning_upright: '行动力爆表、冒险热情、勇闯天下',
    meaning_reversed: '冲动冒失、三分钟热度、半途而废' },

  { id: 62, name_zh: '权杖女皇', name_en: 'Queen of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['魅力', '自信', '领导力', '热情'],
    meaning_upright: '魅力自信、强势领导、富有感染力、独立',
    meaning_reversed: '控制欲过强、操纵、缺乏自信' },

  { id: 63, name_zh: '权杖国王', name_en: 'King of Wands', type: 'minor', arcana: null, suit: 'wands',
    keywords: ['领导', '魄力', '远见', '果断'],
    meaning_upright: '卓越领导、魄力十足、大格局思考、企业精神',
    meaning_reversed: '专横、冒进、不具备领导能力' },

  // --- 星币 (Pentacles) - 物质/健康 ---
  { id: 64, name_zh: '星币王牌', name_en: 'Ace of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['财富', '机会', '稳定', '新开始'],
    meaning_upright: '财富机遇、稳定投资、新收入来源、富足',
    meaning_reversed: '财务挫折、错失机会、经济不稳' },

  { id: 65, name_zh: '星币二', name_en: 'Two of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['平衡', '灵活', '多任务', '适应'],
    meaning_upright: '平衡收支、灵活应变、多线操作、起起伏伏',
    meaning_reversed: '失衡、入不敷出、应付不来' },

  { id: 66, name_zh: '星币三', name_en: 'Three of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['合作', '技艺', '建造', '规划'],
    meaning_upright: '团队合作、专业技能、精益求精、蓝图规划',
    meaning_reversed: '缺乏合作、敷衍了事、团队分裂' },

  { id: 67, name_zh: '星币四', name_en: 'Four of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['守财', '控制', '安全感', '吝啬'],
    meaning_upright: '守护财富、追求安全、但也过于保守',
    meaning_reversed: '释放、慷慨、过度挥霍、失去稳定' },

  { id: 68, name_zh: '星币五', name_en: 'Five of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['困境', '匮乏', '孤立', '求助'],
    meaning_upright: '物质困境、感到孤独、被排斥、需要求助',
    meaning_reversed: '困境缓解、找到帮助、重新加入' },

  { id: 69, name_zh: '星币六', name_en: 'Six of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['施舍', '分享', '恩惠', '不平等'],
    meaning_upright: '慷慨施舍、分享财富、恩惠、但需关注权力关系',
    meaning_reversed: '吝啬、拒绝援助、施舍附带条件' },

  { id: 70, name_zh: '星币七', name_en: 'Seven of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['等待', '评估', '投入', '耐心'],
    meaning_upright: '耐心等待收获、评估投入产出、需要持之以恒',
    meaning_reversed: '前功尽弃、投入无果、焦虑无耐心' },

  { id: 71, name_zh: '星币八', name_en: 'Eight of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['勤奋', '技艺', '专注', '积累'],
    meaning_upright: '勤奋练习、精进技艺、专注细节、积累能力',
    meaning_reversed: '敷衍了事、缺乏热情、撞钟度日' },

  { id: 72, name_zh: '星币九', name_en: 'Nine of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['富裕', '独立', '优雅', '享受'],
    meaning_upright: '自给自足、优雅享受、财务独立、悠然自得',
    meaning_reversed: '财务陷阱、外强中干、肤浅炫耀' },

  { id: 73, name_zh: '星币十', name_en: 'Ten of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['财富', '传承', '家族', '永恒'],
    meaning_upright: '丰厚的财富积累、家族传承、永久基业、繁华',
    meaning_reversed: '家族纷争、财富流失、不稳固的根基' },

  { id: 74, name_zh: '星币侍从', name_en: 'Page of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['学习', '务实', '新技能', '规划'],
    meaning_upright: '务实学习、获得新技能、脚踏实地的新机会',
    meaning_reversed: '缺乏进取心、学而不成、浪费机会' },

  { id: 75, name_zh: '星币骑士', name_en: 'Knight of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['踏实', '稳定', '可靠', '保守'],
    meaning_upright: '踏实可靠、按部就班、最有耐心、稳扎稳打',
    meaning_reversed: '死板、过于保守、停滞不前' },

  { id: 76, name_zh: '星币女皇', name_en: 'Queen of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['丰裕', '安全感', '务实', '滋养'],
    meaning_upright: '丰裕富足、极度务实、擅长理财、温馨的庇护所',
    meaning_reversed: '财务危机、奢侈无度、忽视家庭' },

  { id: 77, name_zh: '星币国王', name_en: 'King of Pentacles', type: 'minor', arcana: null, suit: 'pentacles',
    keywords: ['财富', '稳定', '务实', '成就'],
    meaning_upright: '财富的终极掌控者、商业奇才、稳如泰山',
    meaning_reversed: '贪婪、破产、守不住财富、腐败' }
]

module.exports = cards

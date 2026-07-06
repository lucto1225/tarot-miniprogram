// Coze Workflow API 封装
// 文档: https://www.coze.com/docs/developer_guides/workflow_api

const COZE_CONFIG = {
  baseUrl: 'https://api.coze.cn/v3/workflow/run',
  // ⚠️ Token 不要硬编码在代码中，上线前替换为安全存储方案
  token: 'YOUR_COZE_API_TOKEN',
  workflowId: 'YOUR_WORKFLOW_ID',
  timeout: 60000 // Coze workflow 可能需要较长时间
}

/**
 * 通用 Coze Workflow 请求
 * @param {Object} params - workflow 参数
 * @returns {Promise<Object>}
 */
function cozeRequest(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: COZE_CONFIG.baseUrl,
      method: 'POST',
      timeout: COZE_CONFIG.timeout,
      header: {
        'Authorization': `Bearer ${COZE_CONFIG.token}`,
        'Content-Type': 'application/json'
      },
      data: {
        workflow_id: COZE_CONFIG.workflowId,
        parameters: params
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          // Coze API 返回格式: { code: 0, data: {...}, msg: "success" }
          if (res.data.code === 0) {
            resolve(res.data.data)
          } else {
            reject(new Error(res.data.msg || 'Coze API 返回错误'))
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}`))
        }
      },
      fail: (err) => {
        console.error('Coze API 请求失败:', err)
        reject(err)
      }
    })
  })
}

/**
 * 塔罗占卜
 * @param {Object} input - 用户输入
 * @param {string} input.birthday - 生日
 * @param {string} input.gender - 性别
 * @param {string} input.birthCity - 出生城市
 * @param {string} input.question - 占卜问题
 * @param {string} input.spreadId - 牌阵 ID
 * @param {string} input.spreadName - 牌阵名称
 * @param {number[]} input.cards - 抽到的牌 ID 数组
 * @param {Object[]} input.positions - 牌与位置的对应
 * @returns {Promise<Object>} { interpretations: [...], summary: "..." }
 */
function tarotDivination(input) {
  return cozeRequest({
    birthday: input.birthday,
    gender: input.gender,
    birth_city: input.birthCity,
    question: input.question,
    spread_id: input.spreadId,
    spread_name: input.spreadName,
    cards: input.cards,
    positions: input.positions
  })
}

module.exports = {
  tarotDivination,
  cozeRequest
}

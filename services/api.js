// Coze Workflow API 封装
// 文档: https://docs.coze.cn/developer_guides/workflow_run
// 版本: v1

var util = require('../utils/util.js')

// 尝试加载本地配置，不存在则使用占位值
var localConfig = {}
try {
  localConfig = require('./config.local.js')
} catch (e) {
  // config.local.js 不存在，使用占位值
}

var COZE_CONFIG = {
  baseUrl: 'https://api.coze.cn/v1/workflow/run',
  token: localConfig.token || 'YOUR_COZE_TOKEN',
  workflowId: localConfig.workflowId || 'YOUR_WORKFLOW_ID'
}

/**
 * 递归清理对象所有字符串值中的转义字符
 */
function unescapeStrings(obj) {
  if (typeof obj === 'string') {
    return obj.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\r/g, '\r')
  }
  if (Array.isArray(obj)) {
    return obj.map(function(item) { return unescapeStrings(item) })
  }
  if (obj && typeof obj === 'object') {
    var cleaned = {}
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        cleaned[key] = unescapeStrings(obj[key])
      }
    }
    return cleaned
  }
  return obj
}

/**
 * 执行 Coze Workflow
 * @param {Object} params - 工作流入参
 * @returns {Promise<Object>} 解析后的 data
 */
function runWorkflow(params) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: COZE_CONFIG.baseUrl,
      method: 'POST',
      timeout: 90000,
      header: {
        'Authorization': 'Bearer ' + COZE_CONFIG.token,
        'Content-Type': 'application/json'
      },
      data: {
        workflow_id: COZE_CONFIG.workflowId,
        parameters: params
      },
      success: function(res) {
        // Coze 返回: { code: 0, data: "{\"output\":\"...\"}", msg: "" }
        if (res.statusCode === 200 && res.data) {
          var body = res.data
          if (body.code === 0) {
            try {
              // 第一层解析: data 是 JSON 字符串，解开得到 { output: "..." }
              var first = typeof body.data === 'string'
                ? JSON.parse(body.data)
                : body.data

              // 第二层解析: output 是 workflow 的实际输出字符串
              var output = first.output
              if (output && typeof output === 'string') {
                try {
                  // output 可能是 JSON 字符串，解析后清理转义
                  var result = JSON.parse(output)
                  result = unescapeStrings(result)
                  resolve(result)
                } catch (e2) {
                  // output 是纯文本，清理转义后返回
                  resolve({ output: unescapeStrings(output) })
                }
              } else {
                // 没有 output 字段，返回第一层结果
                resolve(first)
              }
            } catch (e) {
              resolve(body.data)
            }
          } else {
            reject(new Error(body.msg || 'Coze 错误码: ' + body.code))
          }
        } else {
          reject(new Error('HTTP ' + res.statusCode))
        }
      },
      fail: function(err) {
        util.logError('Coze API 请求失败:', err)
        reject(err)
      }
    })
  })
}

/**
 * 第一步：发送用户信息，获取牌阵推荐
 * @param {Object} input
 * @param {string} input.birthday - 生日 "YYYY-MM-DD"
 * @param {string} input.sex      - 性别 "男" | "女"
 * @param {string} input.city     - 出生城市
 * @param {string} input.query    - 占卜问题
 * @returns {Promise<Object>} workflow 原始返回
 */
function matchSpread(input) {
  return runWorkflow({
    birthday: input.birthday,
    city: input.city,
    sex: input.sex,
    query: input.query,
    num: input.num
  })
}

/**
 * 第二步：发送完整占卜信息，获取 AI 解读
 * @param {string} input.birthday - 生日
 * @param {string} input.sex      - 性别
 * @param {string} input.city     - 出生城市
 * @param {string} input.query    - 占卜问题
 * @param {number} input.num      - 抽取的塔罗牌数量
 * @param {Array}  input.cards    - 用户抽到的牌 [{id, name_zh, position}]
 * @returns {Promise<Object>} workflow 原始返回
 */
function getReading(input) {
  return runWorkflow({
    birthday: input.birthday,
    city: input.city,
    sex: input.sex,
    query: input.query,
    num: input.num,
    cards: input.cards
  })
}

module.exports = {
  runWorkflow: runWorkflow,
  matchSpread: matchSpread,
  getReading: getReading
}

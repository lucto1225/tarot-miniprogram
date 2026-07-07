// 仅开发环境输出日志，生产环境静默
function isDev() {
  try {
    var account = wx.getAccountInfoSync()
    return account.miniProgram.envVersion === 'develop'
  } catch (e) {
    return false
  }
}

function log() {
  if (isDev()) { console.log.apply(console, arguments) }
}
function logError() {
  if (isDev()) { console.error.apply(console, arguments) }
}

var formatTime = function(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

var formatNumber = function(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 简易 Markdown → HTML 转换
 * 微信小程序用 <rich-text nodes="..."> 渲染
 */
function markdownToHtml(md) {
  if (!md || typeof md !== 'string') return ''

  var html = md

  // 先处理标题行
  html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:28rpx;color:#c9a84c;margin:16rpx 0 8rpx;">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 style="font-size:30rpx;color:#c9a84c;margin:20rpx 0 10rpx;">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 style="font-size:32rpx;color:#c9a84c;margin:24rpx 0 12rpx;">$1</h1>')

  // 分割线
  html = html.replace(/^---+$/gm, '<hr style="border:none;border-top:1rpx solid rgba(201,168,76,0.3);margin:16rpx 0;" />')

  // 粗体
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff;">$1</strong>')

  // 斜体
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // 无序列表
  html = html.replace(/^- (.+)$/gm, '<li style="margin-left:16rpx;line-height:1.8;">• $1</li>')
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li style="margin-left:16rpx;line-height:1.8;">$1. $2</li>')

  // 双换行 → 段落分隔
  html = html.replace(/\n\n/g, '<br/><br/>')

  // 单换行 → 换行
  html = html.replace(/\n/g, '<br/>')

  return html
}

module.exports = {
  formatTime: formatTime,
  markdownToHtml: markdownToHtml,
  log: log,
  logError: logError
}

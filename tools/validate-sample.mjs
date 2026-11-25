import fs from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('用法: node validate-detail-sample.mjs <示例文件>')
  process.exit(1)
}
const text = fs.readFileSync(file, 'utf8')
const lines = text.split(/\r?\n/)

const prompts = lines.filter((l) => l.includes('画面提示词')).map((l) => l.replace(/^.*?画面提示词[^：]*：/, '').trim())
const copies = lines.filter((l) => l.includes('**文案**')).map((l) => l.replace(/^.*?文案[^：]*：/, '').trim())

const results = []
const add = (name, ok, detail = '') => results.push({ name, ok, detail })

add('屏数 ≥ 8', prompts.length >= 8, `实际 ${prompts.length} 屏`)
add('每条提示词都锚定 [img0]', prompts.every((p) => p.includes('[img0]')), `${prompts.filter((p) => !p.includes('[img0]')).length} 条缺锚定`)
add('每条提示词 ≤ 750 字', prompts.every((p) => p.length <= 750), `最长 ${Math.max(...prompts.map((p) => p.length))} 字`)

const zeroWidth = /[\u200B-\u200D\uFEFF\u2060]/
add('提示词无零宽字符', !prompts.some((p) => zeroWidth.test(p)))

const badPunct = /[：；！？—－…:;!?]/
const offenders = prompts.filter((p) => badPunct.test(p))
add('提示词标点只用顿号逗号句号', offenders.length === 0, offenders.length ? `${offenders.length} 条含禁用标点` : '')

add('文案使用中文双引号', copies.length > 0 && copies.every((c) => c.startsWith('“') && c.endsWith('”')), `${copies.length} 条文案`)

const fabricated = ['¥', '￥', '销量', '好评率', '认证编号']
add('未编造价格与销量', !fabricated.some((k) => text.includes(k)))

const missingParam = text.includes('见包装')
add('参数缺失时写「见包装」', missingParam)

const pass = results.filter((r) => r.ok).length
for (const r of results) {
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? '  (' + r.detail + ')' : ''}`)
}
console.log(`\n结果：${pass} / ${results.length} 通过`)
process.exit(pass === results.length ? 0 : 1)

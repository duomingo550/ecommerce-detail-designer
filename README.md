# ecommerce-detail-designer · 让详情页自己会说话

一个纯提示词的 Agent Skill：给一张产品图，产出九屏电商详情页方案 —— 每屏一句文案、一段可直接出图的提示词、一套不重样的版式。

不编价格、不编销量、不编认证；参数缺了就写「见包装」。

## 触发

装上之后直接说：

- 「做一套锅巴的详情页」
- 「这个产品帮我出 9 屏详情」
- 「改第 3 屏，背景太暗」

## 安装

```bash
git clone https://github.com/duomingo550/ecommerce-detail-designer.git "<技能目录>/ecommerce-detail-designer"
```

或从 [Releases](https://github.com/duomingo550/ecommerce-detail-designer/releases) 下载 zip 解压。

> 技能目录：豆包是 `.user_skills`；其它智能体换成各自的 skills 目录。纯 Markdown，无代码依赖。

## 它交付什么

一份 Markdown 方案，包含：

1. 产品四维分析（卖点 / 特征 / 场景 / 痛点）
2. 屏次规划（≥ 8 屏，版式与运镜交替）
3. 每屏：文案（中文双引号）+ 画面提示词 + 版式 + 风格
4. 全局视觉锚点（主色、光源、字体、产品外观）

宿主有图像编辑能力时（如豆包 `image_edit`）可以直接出图；没有就交付方案。

## 八条硬规则

1. 屏数 ≥ 8
2. 每屏提示词以 `[img0]` 锚定产品
3. 单条提示词 ≤ 750 字
4. 提示词内无零宽字符
5. 标点只用顿号、逗号、句号
6. 画面文案用中文双引号 “”
7. 不编造价格、销量、认证
8. 参数缺失写「见包装」

可以用随包的脚本校验任何一份产出：

```bash
node tools/validate-sample.mjs 示例-锅巴详情页方案.md
```

## 示例

[`示例-锅巴详情页方案.md`](示例-锅巴详情页方案.md)：9 屏完整方案，校验 8/8 通过。

## 完整说明书

- [`docs/使用说明.html`](docs/使用说明.html)
- [`docs/使用说明.pdf`](docs/使用说明.pdf)
- [`TESTING.md`](TESTING.md)

## 关于

作者：明叔 · [lark123.com](https://lark123.com) · MIT 许可

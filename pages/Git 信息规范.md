- 不规范 Git 提交信息大赏：
- 1. 修复某些 bug
  2. 编辑部分注释
  3. 111
-
- 1. commit message 可读性
  2. 信息分类
  3. 为 git log 提供可查询的关键字
  4. 自动生成 CHANGELOG.md
-
-
- ## 提交类型
  
  包含以下八种：
- **feat**（feature，产品新功能，通常是能够让用户觉察到的变化，小到文案或样式修改）
- **fix**（bug fix，修复 bug）
- **docs**（documentation，更新文档或注释）
- **style**（code formatting, missing semi colons, … 代码格式调整，对逻辑无影响：比如为按照 eslint 或团队风格修改代码格式。注意不是 UI 变更）
- **refactor**（重构：代码优化但不影响现有功能或添加功能。比如文件、变量重命名、代码抽象为函数，消除魔法数字等）
- **test**（when adding missing tests 单测相关变更）
- **chore**（杂项：其他无法归类的变更，比如代码合并）
- **perf** （性能提升变更）
- **ci**（持续集成脚本相关变更）
- **build**（代码构建相关变更：比如修复部署时的构建问题、构建脚本 webpack 或 gulp 相关变更）
- **temp**（临时代码：不计入 CHANGELOG，比如必须部署到某种环境才能测试的变更。如测试真机上 transparent title 启动参数是否设置成功）
-
- ## 提交范围
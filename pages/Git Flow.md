- # 分支管理
- ### master 分支
- 仅用于线上发布，任意一个线上 `commit` 都需要打 `tag`，并在远端同步。标签的主要作用是发布节点的归档与回滚的锚点。
- 即便项目没有版本号，也应使用自定义的开发版本号替代。
- ![image.png](../assets/image_1665469313236_0.png){:height 271, :width 449}
-
- ### 开发分支
- 以 `release/` 为前缀做分支收纳，具体格式为 `release/{ developing version }`，例如 `release/1.1`、`release/1.5.2` 等。在该开发中版本未发布之前的 feature 开发均提交在该分支中。
- ![image.png](../assets/image_1665469782577_0.png){:height 308, :width 444}
-
- ### 针对线上的 bug 修复分支
- 应当以 `hotfix/` 前缀做分支收纳，具体格式为 `hotfix/{ YYYYMMDD }-{ bug component or intro }`，例如 `hotfix/20221012-token`、`hotfix/20221010-watcher-queue` 等。
- 线上修复视规模大小决定是否给与发布节点一个新的 `tag`。
- `hotfix` 分支视 `release` 分支需求与否，适当地将代码合并入其中，这之中分两种情况：
- * 修复内容与开发中内容冲突不多，直接 merge 即可。
  * 修复内容依赖的基础代码已与开发分支差别极大，考虑 git cherry pick 入 `release` 分支。
- ![image.png](../assets/image_1665470840608_0.png){:height 351, :width 468}
-
- ### 扩展分支
- 在此 `Git-Flow` 中，分支的扩展性很好。可以视开发需求，任意拓展自定义分支。例如在某一开发阶段中，增加了预演环境，并且会有多版本交错开发的情况出现。
- 只要明确以下几个原则，分支管理就不会出错：
- 1. `master` 用来发布线上版本。
  2. 哪里需要修复 `hotfix` 就在哪个分支上创建(不可能在 `release` 上)。
  3. 如果在跨版本开发过程中需求其他分支的代码，需要思考两点，一是合并不能影响到master，二是是否会合入超越版本的代码。
- ![image.png](../assets/image_1665472157414_0.png){:height 369, :width 533}
-
- ### 远程分支管理
- 1. `master` 分支设置为 `default branch`，提供两种保护：**不可删除**、**不可被强制推送**。
  2. 统配 `v*` 将所有发布标签设置为 `protected tags`，提供以下保护：**不可删除**、**不可更改**、**避免创建于分支同名的标签**。
-
- ### 分支管理总结
- | 分支名称 | 命名规则 | 功能概述 |
  | :-----| ----: | :----: |
  | master | N/A | 线上发布分支 |
  | release | release/{ developing version } | 版本开发分支 |
  | hotfix | hotfix/{ YYYYMMDD }-{ bug component or intro } | 非开发阶段修复分支 |
-
- ### Git 树的剪枝
- 对 Git 树进行审视，适当利用 `git rebase` 或 `git cherrypick` 修剪 Git 树，使分支保持清爽，利于 `code review` 及历史追溯，不至于淹没在 `git log` 出的垃圾提交海洋之中。**务必确保在无人开发的分支上进行编辑，避免 Git 树型变动导致的本地提交记录丢失**。
- 1. 合并本地连续的杂乱改动 `commit` 再推送远端。
- ![image.png](../assets/image_1665476049582_0.png){:height 278, :width 520}
- 2. 避免不必要的 `merge commit` 提交。
- ![image.png](../assets/image_1665476435686_0.png){:height 405, :width 506}
-
- # 提交规范
-
-
-
-
-
-
-
-
-
-
-
-
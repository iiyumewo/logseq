- `pnpm` 提供了 **[-w, --workspace-root](https://link.zhihu.com/?target=https%3A//pnpm.io/zh/pnpm-cli%23-w---workspace-root)** 参数，可以将依赖包安装到工程的根目录下，作为所有 package 的公共依赖。
- ```
  $ pnpm install react -w
  ```
- 如果是一个开发依赖的话，可以加上 `-D` 参数，表示这是一个开发依赖，会装到 `pacakage.json` 中的 `devDependencies` 中，比如：
- ```
  $ pnpm install rollup -wD
  ```
- **给某个package单独安装指定依赖**
  
  `pnpm` 提供了 **[--filter](https://link.zhihu.com/?target=https%3A//pnpm.io/zh/filtering)** 参数，可以用来对特定的package进行某些操作。
  
  因此，如果想给 pkg1 安装一个依赖包，比如 `axios`，可以进行如下操作：
  
  ```
  $ pnpm add axios --filter @qftjs/monorepo1
  ```
- 需要注意的是，`--filter` 参数跟着的是package下的 `package.json` 的 `name` 字段，并不是目录名。
- 关于 `--filter` 操作其实还是很丰富的，比如执行 pkg1 下的 scripts 脚本：
- ```
  $ pnpm build --filter @qftjs/monorepo1
  ```
- `filter` 后面除了可以指定具体的包名，还可以跟着匹配规则来指定对匹配上规则的包进行操作，比如：
- ```
  $ pnpm build --filter "./packages/**"
  ```
- 此命令会执行所有 package 下的 `build` 命令。具体的用法可以参考**[filter](https://link.zhihu.com/?target=https%3A//pnpm.io/zh/filtering)**文档。
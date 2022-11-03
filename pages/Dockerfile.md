- 为什么推荐 Dockerfile 来替代 docker commit 构建镜像？#card
	- 可重复性、透明性、幂等性
	- 易于调试，指令失败也可以获得一个可用的镜像
	- 支持注释
- Dockerfile 执行流程 #card
	- Docker 从基础镜像运行一个容器。
	- 执行一条指令，对容器做出修改。
	- 执行类似 docker commit 的操作，提交一个新的镜像层。
	- Docker 再基于刚提交的镜像运行一个新容器。
	- 执行 Dockerfile 中的下一条指令，知道所有指令都执行完毕。
- # 指令
- https://docs.docker.com/engine/reference/builder/
- **FROM**：Dockerfile 第一条指令必须是 FROM，指定一个已经存在的镜像，后续指令都基于该镜像，该镜像被称为基础镜像(base image)。
- **MAINTAINER**：记录镜像作者，作者的电子邮箱。
- **RUN**：在镜像中运行指定命令。
- 默认情况下，RUN 指令会在 shell 里使用命令包装器 `/bin/sh -c` 来执行。如果是在一个不支持 shell 的平台上运行或不希望在 shell 中运行(比如避免 shell 字符串篡改)，也可以使用 exec 格式的 RUN 指令，例如：
- ```exec
  RUN ["apt-get", "install", "-y", "nginx"]
  ```
- **EXPOSE**：告诉 Docker 该容器内的应用程序将会使用容器的指定端口。
- 处于安全原因，Docker 并不会自动打开该端口，而是需要用户在使用 docker run 运行容器时来指定需要打开哪些端口。
- **REFRESHED_AT**：表明该镜像模板最后的更新时间。如需无视如需指令的构建缓存，修改 Dockerfile 中的 REFRESH_AT 时间即可。
- **CMD**：指定容器启动时运行的命令。
- ```
  CMD ["/bin/bash", "-l"]
  CMD "/bin/bash -l"
  ```
- 1. 放在数组中的指令会按指令的原样执行。
  2. 指定 CMD 指令的话，Docker 会指令前加上 /bin/sh -c。可能会导致意外结果，不推荐。
  3. docker run 中的指令会覆盖 CMD 指令。
  4. 只能用 CMD 指定一条指令，多条指令会被最后的指令覆盖。
- **ENTRYPOINT**：
- **WORKDIR**：
- **ENV**：
- **USER**：
- **VOLUME**：
- **ADD**：
- **COPY**：
- **LABEL**：
- **STOPSIGNAL**：
- **ARG**：
- **ONBUILD**：
-
-
-
-
- # .dockerignore
- 设置哪些文件不会被当做构建上下文的一部分，防止它们被上传到 Docker 守护进程中。
- 匹配规则采用了 Golang 的 filepath。
-
- # 构建上下文
-
- # 构建缓存
-
-
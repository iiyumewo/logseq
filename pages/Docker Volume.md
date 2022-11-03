- https://docs.docker.com/storage/volumes/
- ![Docker 主机上的卷](https://docs.docker.com/storage/images/types-of-mounts-volume.png)
-
- Volumes have several advantages over bind mounts: #card
	- 1. Volumes are easier to back up or migrate than bind mounts.
	  易于备份迁移
	- 2. You can manage volumes using Docker CLI commands or the Docker API.
	  Docker 命令行工具、Docker API 可以操作卷
	- 3. Volumes work on both Linux and Windows containers.
	  Linux、Windows 容器通用
	- 4. Volumes can be more safely shared among multiple containers.
	  容器间共享数据更安全
	- 5. Volume drivers let you store volumes on remote hosts or cloud providers, to encrypt the contents of volumes, or to add other functionality.
	  卷驱动
	- 6. New volumes can have their content pre-populated by a container.
	  卷可以预填充容器内的数据
	- 7. Volumes on Docker Desktop have much higher performance than bind mounts from Mac and Windows hosts.
	  Docker Desktop 管理的卷比来自 Mac 和 Windows 主机的绑定挂载具有更高的性能
-
- ## 基本命令
- ```shell
  # 创建卷
  $ docker volume create my-vol
  
  # 查看卷
  $ docker volume ls
  local    my-vol
  
  # 查看卷详情
  $ docker volume inspect my-vol
  [
   {
    "Driver": "local",
    "Labels": {},
    "Mountpoint": "/var/lib/docker/volumes/my-vol/_data",
    "Name": "my-vol",
    "Options": {},
    "Scope": "local"
   }
  ]
  
  # 移除卷
  $ docker volume rm my-vol
  ```
-
- ## 使用 `--mount` 或 `-v` 标识挂载卷
- 1. 如果容器中的待挂载的目录不是一个空目录，那么该目录下的文件会被复制到数据卷中。（Bind mounts下，宿主机上的目录总会覆盖容器中的待挂载目录）
- 2. `-v` 和 `--mount` 除了语法几乎相同，唯一的区别是在运行一个 service 时只能够 `--mount` 参数来挂载数据卷。
-
- `-v`：固定由三个字段组成，冒号分割，顺序不可颠倒。
	- 第一个字段卷名。
	- 第二个字段挂载路径。
	- 第三个字段是可选的，是以逗号分隔的选项列表，例如 `ro` 。
- `--mount`：参数由多个 `<key>=<value>` 组成，逗号分割。
	- `type`：数据挂载的模式，`bind`、`volume`、`tmpfs` 之一。
	- `source`、`src`：卷的名称。
	- `destination`、`dst`、`target`：挂载在容器中的路径。
	- `readonly`、`ro`：标识只读挂载，无值。
	- `volume-opt`：可以多次指定的选项，值也是键值对，例如 `volume-opt=type=nfs`。
- ```shell
  # --mount 启动带有卷的容器
  $ docker run -d \
    --name=nginxtest \
    --mount source=nginx-vol,destination=/usr/share/nginx/html \
    nginx:latest
   
  # -v 启动带有卷的容器
  $ docker run -d \
    --name=nginxtest \
    -v nginx-vol:/usr/share/nginx/html \
    nginx:latest
   
  # 只读卷
  $ docker run -d \
    --name=nginxtest \
    --mount source=nginx-vol,destination=/usr/share/nginx/html,readonly \
    nginx:latest
    
  # 启动带有卷的 service
  $ docker service create -d \
    --replicas=4 \
    --name devtest-service \
    --mount source=myvol2,target=/app \
    nginx:latest
  ```
-
-
-
- ## 机器间共享数据
- ![共享存储](https://docs.docker.com/storage/images/volumes-shared-storage.svg)
-
## 配置卷驱动
-
- ##
## 备份、恢复或迁移数据卷
- ```shell
  # 备份卷
  $ docker run --rm --volumes-from dbstore -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /dbdata
  
  # 从备份恢复卷
  $ docker run --rm --volumes-from dbstore2 -v $(pwd):/backup ubuntu bash -c "cd /dbdata && tar xvf /backup/backup.tar --strip 1"
  
  # 自动删除匿名卷
  $ docker run --rm -v /foo -v awesome:/bar busybox top
  
  # 删除所有卷
  $ docker volume prune
  ```
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
-
-
-
-
-
-
-
-
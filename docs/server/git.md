# Git

## 第1章 Git基本概念

### 1.1 控制系统

#### 1.1.1 本地版本控制系统

1. 单机运行，不支持多人协作开发
2. 版本数据库故障后，所有历史更新记录会丢失

#### 1.1.2 集中化的版本控制系统

> 典型代表：SVN

1. 特点：

   1）基于服务器、客户端的运行模式

   2）服务器保存文件的所有更新记录

   3）客户端只保留最新的文件版本

2. 优点：联网运行，支持多人协作开发

3. 缺点：

   1）不支持离线提交版本更新

   2）中心服务器崩溃后，所有人无法正常工作

   3）版本数据库故障后，所有历史更新记录会丢失

#### 1.1.3 分布式版本控制系统

> 典型代表：Git

1. 特点：

   1）基于服务器、客户端的运行模式

   2）服务器保存文件的所有更新版本

   3）客户端是服务器的完整备份，并不是只保留文件的最新版本

2. 优点：

   1）联网运行，支持多人协作开发

   2）客户端断网后支持离线本地提交版本更新

   3）服务器故障或损坏后，可使用任何一个客户端的备份进行恢复

------

### 1.2 Git基础概念

> Git是一个开源的分布式版本控制系统，是目前世界上最先进、最流行的版本控制系统。可以快速高效地处理从很小到非常大的项目版本管理。

1. 特点：项目越大越复杂，协同开发者越多，越能体现出 Git 的高性能和高可用性

2. 直接记录快照，而非差异比较：

   1）SVN的差异比较：存储的是一组基本文件和每个文件随时间逐步累积的差异

   * 优点：节省磁盘空间
   * 缺点：耗时、效率低；在每次切换版本的时候，都需要在基本文件的基础上，应用每个差异，从而生成目标版本对应的文件

   2）Git 的记录快照：在原有文件版本的基础上重新生成一份新的文件，类似于备份。为了效率，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件

   * 优点：版本切换时非常快，因为每个版本都是完整的文件快照，切换版本时直接恢复目标版本的快照即可
   * 缺点：占用磁盘空间较大
   * 特点：空间换时间

3. 近乎所有操作都是本地执行：

   1）断网后依旧可以在本地对项目进行版本管理

   2）联网后，把本地修改的记录同步到云端服务器即可

4. 三个区域：

   1）工作区：处理工作的区域

   2）暂存区：已完成的工作的临时存放区域，等待被提交

   3）Git 仓库：最终的存放区域

5. 四种状态：

   1）已修改（Modified）：表示修改了文件，但还没将修改的结果放到暂存区；工作区的文件被修改了，但还没有放到暂存区，就是已修改状态

   2）已暂存（Staged）：表示对已修改文件的当前版本做了标记，使之包含在下次提交的列表中；如果文件已修改并放入暂存区，就属于已暂存状态

   3）已提交（Committed）：表示文件已经安全地保存在本地的 Git 仓库中；如果 Git 仓库中保存着特定版本的文件，就属于已提交状态

   4）未跟踪（Untracked）：不被 Git 所管理的文件

------

## 第2章 安装并配置Git

1. 下载地址：[https://git-scm.com/downloads](https://git-scm.com/downloads)

2. 配置用户信息：

   ```git
   git config --global user.name "yourname"
   git config --global user.email "your@email.com"
   ```

3. 检查配置信息：

   1）全局配置文件

   ```git
   C:/Users/用户名/.gitconfig
   ```

   2）查看所有全局配置项

   ```git
   git config --list --global
   ```

   3）查看制定的全局配置项

   ```git
   git config user.name
   git config user.email
   ```

4. 获取帮助信息：

   1）查看帮助

   ```git
   git help <verb>
   git <verb> -h
   ```

   2）打开config帮助手册

   ```git
   git help config
   ```

   3）获取git config命令的快速参考

   ```git
   git config -h
   ```

------

## 第3章 Git操作

### 3.1 常用命令

<!-- ![git工作流](/imgs/basic/git工作流.png) -->
<img :src="$withBase('/imgs/basic/git工作流.png')" alt="git工作流">

#### 3.1.1 获取仓库

1. 将尚未进行版本控制的本地目录转换为 Git 仓库（形式：.git文件夹）

   ```git
   git init
   ```

2. 从其它服务器克隆一个已存在的 Git 仓库

   ```git
   git clone url地址
   ```

#### 3.1.2 检查状态

1. 命令：

   ```git
   git status
   
   // 精简命令
   git status -s
   git status --short
   ```

2. 状态：

   * M：已修改
   * A：新添加到暂存区
   * D：已删除
   * R：重命名
   * C：已复制
   * ??：未跟踪
   * !!：已忽略

#### 3.1.3 暂存文件

1. 添加单个文件：

   ```git
   git add 文件名
   ```

2. 添加所有新增与修改过的文件

   ```git
   git add .
   ```

3. 状态：`A`，已被跟踪并处于暂存状态（Changes to be committed）

#### 3.1.4 取消暂存

1. 命令：

   ```git
   git reset HEAD 要移除的文件名称
   ```

#### 3.1.5 提交更新

1. 命令：

   ```git
   git commit -m "描述内容"
   ```

2. 状态：`nothing to commit, working tree clean`

#### 3.1.6 跳过暂存区直接提交

1. 将“工作区 → 暂存区 → Git 仓库”的中间步骤省略，直接“工作区 → Git 仓库”

2. 命令：

   ```git
   git commit -a -m "描述内容"
   ```

------

### 3.2 修改文件

<!-- ![git修改文件](/imgs/basic/git修改文件.png) -->
<img :src="$withBase('/imgs/basic/git修改文件.png')" alt="git修改文件">

#### 3.2.1 修改已提交文件

1. 场景：对已被git跟踪的文件进行修改
2. 状态：红色M，已跟踪文件的内容发生了变化，但还没有放到暂存区（Changes not staged for commit）

#### 3.2.2 暂存已修改文件

1. 命令：

   ```git
   git add 修改的文件
   ```

2. 状态：绿色M，已修改并放入暂存区（modified）

#### 3.2.3 提交已暂存文件

1. 命令：

   ```git
   git commit -m "描述内容"
   ```

2. 状态：nothing to commit, working tree clean

#### 3.2.4 撤销修改

<!-- ![git撤销修改](/imgs/basic/git撤销修改.png) -->
<img :src="$withBase('/imgs/basic/git撤销修改.png')" alt="git撤销修改">

1. 命令：

   ```git
   git checkout -- 文件名
   ```

2. 场景：把对工作区中对应文件的修改，还原成 Git 仓库中所保存的版本

3. 影响：所有的修改会丢失，且无法恢复！危险性比较高，请慎重操作！

4. 本质：用 Git 仓库中保存的文件，覆盖工作区中指定的文件

------

### 3.3 删除文件

1. 从 Git 仓库和工作区中同时移除对应的文件

   ```git
   git rm -f  要移除的文件名称
   ```

2. 只从 Git 仓库中移除指定的文件，但保留工作区中对应的文件

   ```git
   git rm --cached 要移除的文件名称
   ```

------

### 3.4 忽略文件 gitignore

1. 语法：

   1）以 # 开头的是注释

   2）以 / 结尾的是目录：例：`build/`，忽略任何目录下名为build的文件夹

   3）以 / 开头防止递归，例：`/TODO`，只忽略当前目录下的TODO文件，而不忽略subdir/TODO

   4）以 ! 开头表示取反

   5）可用 glob 模式（简化了的正则表达式）进行文件和文件夹的匹配

2. glob 模式

   1）`?`：只匹配一个任意字符

   2）`*`：匹配0个或多个任意字符，例：`doc/*.txt`，忽略`doc/notes.txt`，但不忽略`doc/server/arch.txt``

   3）``**`：匹配任意中间目录

   * 例：`a/**/z` 可以匹配 `a/z` 、 `a/b/z` 或 `a/b/c/z` 等
   * 例：`doc/**/*.pdf`，忽略doc/目录及其所有子目录下的.pdf文件

   4）[]：匹配任何一个列在方括号中的字符

   5）[-]：所有在这两个字符范围内的都可以匹配

------

### 3.5 查看提交历史 git log

1. 按时间先后顺序列出所有的提交历史，最近的排在最上面

   ```git
   git log
   ```

2. 只展示最新的2条提交历史

   ```git
   git log -2
   ```

3. 在上一行展示最近2条提交历史的信息

   ```git
   git log -2 --pretty=oneline
   ```

4. 自定义输出格式

   1）`%h`：提交的简写哈希值

   2）`%an`：作者名字

   3）`%ar`：作者修订日期，按多久以前的方式显示

   4）`%s`：提交说明

   ```git
   git log -2 --pretty=format:"%h |%an | %an | %s"
   ```

------

### 3.6 回退到指定的版本

1. 在上一行展示所有提交历史

   ```git
   git log --pretty==oneline
   ```

2. 根据指定的提交ID回退到指定版本

   ```git
   git reset --hard <CommitID>
   ```

3. 回退到旧版本后查看命令操作历史

   ```git
   git reflog --pretty=oneline
   ```

4. 根据指定的提交ID回退到指定版本

   ```git
   git reset --hard <CommitID>
   ```

------

## 第4章 Github

1. 开源许可协议（Open Source License）：限制使用者的使用范围和保护作者的权利

   1）BSD（Berkeley Software Distribution）

   2）Apache Licence 2.0

   3）GPL（GNU General Public License）：不允许修改后和衍生的代码做为闭源的商业软件发布和销售，最著名的软件项目是：Linux

   4）LGPL（GNU Lesser General Public License）

   5）MIT：限制最少的协议，只需在修改后的代码或者发行包中包含原作者的许可信息，使用MIT的项目有：jquery、Node.js

2. 托管平台：以下3个开源项目托管平台，只能托管以Git管理的项目源代码

   1）Github：全球最牛的开源项目托管平台，没有之一

   2）Gitlab：对代码私有性支持较好，因此企业用户较多

   3）Gitee：又叫做码云，是国产的开源项目托管平台。访问速度快、纯中文界面、使用友好

3. 主要功能：

   1）Star：关注自己喜欢的开源项目

   2）Pull Request：为自己喜欢的开源项目做贡献

   3）Issues：和开源项目的作者讨论 Bug 和提需求

   4）Fork：把喜欢的项目复制一份作为自己的项目进行修改

4. 访问仓库：

   1）HTTPS：零配置；但是每次访问仓库时，需要重复输入 Github 的账号和密码才能访问成功

   2）SSH：（推荐）需要进行额外的配置；但是配置成功后，每次访问仓库时，不需重复输入 Github 的账号和密码

5. 关联仓库

   1）本地没有仓库

   ```git
   echo "# 仓库名" >> README.md
   git init
   git add README.md
   git commit -m "评论"
   git remote add orgin 地址
   git push -u origin main
   ```

   2）本地已有仓库

   ```git
   git remote add origin 地址
   git branch -M main
   git push -u origin main
   ```

6. SSH key

   1）作用：实现本地仓库和 Github 之间免登录的加密数据传输

   2）结构：

   * `id_rsa`：私钥文件，存放于客户端的电脑中
   * `id_rsa.pub`：公钥文件，需要配置到 Github 中

   3）命令：

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

   4）配置：将 id_rsa.pub 中的公钥复制到Github的SSH设置中

   5）检测：

   ```bash
   sst -t git@github.com
   ```

------

## 第5章 Git分支

<!-- ![git分支](/imgs/basic/git分支.png) -->
<img :src="$withBase('/imgs/basic/git分支.png')" alt="git分支">

1. 作用：多人协作开发时，为了防止互相干扰，提高协同开发的体验，建议每个开发者都基于分支进行项目功能的开发
2. 功能分支：专门用来开发新功能的分支，临时从 master 主分支上分叉出来，当新功能开发且测试完毕后，最终需要合并到 master 主分支上

### 5.1 main主分支

1. 作用：git默认创建的分支，用来保存和记录整个项目已完成的功能代码
2. 有时候也叫master分支，需要看github上面的名称
3. 不允许程序员直接在 master 分支上修改代码，因为这样做的风险太高，容易导致整个项目崩溃

### 5.2 本地分支

1. 查看分支列表：分支名字前面的 * 号表示当前所处的分支

   ```git
   git branch
   ```

2. 创建新分支：基于当前分支创建一个新的分支，分支中的代码和当前分支完全一样

   ```git
   git branch 分支名称

3. 切换分支：切换到指定的分支上进行开发

   ```git
   git chechout 分支名称
   ```

4. 分支的快速创建和切换：创建指定名称的新分支，并立即切换到新分支上

   ```git
   git checkout -b 分支名称
   ```

5. 合并分支：功能分支的代码开发测试完毕之后，将完成后的代码合并到master主分支上

   ```git
   git checkout main：切换到main分支
   git merge 分支名称：在main分支运行merge命令
   ```

6. 删除分支：当把功能分支的代码合并到 master 主分支上以后，删除对应的功能分支

   ```js
   git branch -d 分支名称
   ```

7. 遇到冲突时的分支合并：如果在两个不同的分支中，对同一个文件进行了不同的修改，Git就没法干净的合并它们，需要手动解决冲突

   ```git
   git checkout main
   git merge 分支X
   git add . 
   git commit -m "解决冲突问题"
   ```

### 5.3 远程分支

1. 将本地分支推送到远程仓库：

   1）首次推送带`-u`参数

   ```git
   git push -u origin 本地分支名称：远程分支名称
   ```

   2）若远程和本地分支名称一致

   ```git
   git push -u origin 分支名称
   ```

2. 查看远程仓库中所有的分支列表：需要在本地仓库根目录中打开bash

   ```git
   git remote show origin
   ```

3. 跟踪分支：从远程仓库中，把远程分支下载到本地仓库中

   1）远程仓库与本地仓库分支名称相同

   ```git
   git checkout 远程分支名称
   ```

   2）远程仓库与本地仓库分支名称不同

   ```git
   git checkout -b 本地分支名称 origin/远程分支名称
   ```

4. 拉取远程分支的最新的代码：当前处于哪个分支，就更新该分支的代码

   ```git
   git pull
   ```

5. 删除远程分支

   ```git
   git push origin --delete 远程分支名称
   ```

------
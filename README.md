# YouKu-Danmu-Downloader
优酷弹幕下载器

### 使用环境：
<a href="https://nodejs.org">NodeJS</a>

### 使用方法
* 按格式编写 <strong>input.js</strong> ，由于是js文件，有能力的话，可以进行一些骚操作也是可以的。
* 运行 <strong>npm start</strong> 即可开始下载。

### 相关参数
field | default | desc 
---|---|---
url | {url} | 视频的url链接
name | {name} | 弹幕文件的文件名

### 输出
在此项目目录自动生成的文件夹 <strong>output</strong> 中

### 弹幕文件使用
下载的弹幕会自动转换成 <strong>B站(bilibili)</strong> 格式的弹幕，因此能支持<a href="https://github.com/AncientLysine/BiliLocal">BiliLocal</a>，<a href="http://www.dandanplay.com">弹弹play</a>等播放器。
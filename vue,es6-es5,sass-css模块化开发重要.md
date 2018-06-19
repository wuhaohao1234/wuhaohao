## es6 编译 es5


### 直接使用babel转码

- 安装babel-cli
	 npm install --global babel-cli 全局安装

- 使用babel命令转码

	babel test.js --out-file compiled.js


### 使用webpack运行Babel

- 安装webpack

	npm install --global webpack 全局安装

	webpack --version
	4.10.0

- 安装babel

	npm install --save-dev babel-cli babel-preset-env  本地安装

- 安装babel-loader

	npm install --save-dev babel-loader 本地安装

- 配置babel
	
	新增.babelrc文件：

	{
	    "presets": ["env"]
	}

- 配置webpack

	新增webpack.config.js文件：

	module.exports = {
	    entry: './test.js',						//入口文件
	    output:	//出口文件
	    {
	        path: __dirname,
	        filename: 'bundle.js'
	    },
	    module: //模块依赖
	    {
	        rules: [ 							//规则
	        {
	            test: /\.js$/,	
	            exclude: /node_modules/,
	            loader: 'babel-loader'			//loader
	        }]
	    }
	};

- 使用webpack运行babel

	webpack --mode production




## gulp 将sass文件转css文件

- 初始化项目

	npm iniy -y

- 先安装gulp

	npm install gulp -g	全局安装
	npm install gulp -save-dev	本地安装


- 安装gulp-sass

	npm install --save-dev gulp-sass

- 安装好之后，配置gulpfile.js

	const gulp = require('gulp')
	const sass = require('gulp-sass')

	gulp.task('sass', function () {
	    return sass('./*.scss')//编译文件
	    .on('error', sass.logError)//错误信息
	    .pipe(gulp.dest('./css'))////输出路径
	})

	gulp.task('dist',function(){
	   gulp.watch('./*.scss',['sass']);// 监听的文件
	});

- 使用glup运行sass模块

* glup也可以将es6转es5	参考文章https://segmentfault.com/a/1190000011829169

## webpack4入门


- 初始化项目

	npm init-y

- 安装webpack4及其命令行接口

	npm i webpack webpack-cli --save-dev

- package.json文件增加build参数

	"scripts": {
	  "build": "webpack"
	}
- 创建./src/index.js文件

	console.log('我是入口文件')

- 终端执行npm run build

	目录下多了一个./dist/main.js。
	这个文件是webpack对./src/index.js的打包结果。

- 修改package.json文件的scripts字段

	"scripts": {
	  "dev": "webpack --mode development",
	  "build": "webpack --mode production"
	}

	npm run dev 未压缩版本，超级快 npm run build压缩版本，慢

### ES6和React

- 安装对应依赖包
	
	npm i babel-core babel-loader babel-preset-env react react-dom babel-preset-react --save-dev	
- 新建.babelrc文件，进行相关配置

	{
	  "presets": ["env", "react"]
	}

- 新建webpack.config.js文件，进行相关配置

	module.exports = {
	  module: {
	    rules: [
	      {
	        test: /\.js$/,
	        exclude: /node_modules/,
	        use: {
	          loader: "babel-loader"
	        }
	      }
	    ]
	  }
	};

- 新增./src/app.js以及修改./src/index.js
	
	'app.js'

	import React from "react";
	import ReactDOM from "react-dom";
	const App = () => {
	  return (
	    <div>
	      <p>React here!</p>
	    </div>
	  );
	};
	export default App;
	ReactDOM.render(<App />, document.getElementById("app"));

	'index.js'

	import App from "./App";

- 执行npm run dev

### 使用html-webpack-plugin插件对html进行打包

- 新建./src/index.html文件，内容如下：

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="utf-8">
	    <title>webpack4入门</title>
	</head>
	<body>
	    <div id="app">
	    </div>
	</body>
	</html>

- 安装依赖包。

	npm i html-webpack-plugin html-loader --save-dev

	........................

	..................

### 所有文章选自https://www.jianshu.com/p/ea2fa79a1c71 暂不继续总结




## vue项目构建

- 全局安装vue-cli

	npm install -g vue-cli

- 使用vue模板初始化项目(webpack比较坑，使用webpack-simple)

	vue init webpack-simple my-project

- 进入my-project 下载对应依赖

	cd my-project

	npm install

- 运行项目

	npm run dev

	文章选自https://vuejs-templates.github.io/webpack/
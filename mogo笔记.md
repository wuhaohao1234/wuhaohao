## mongod --dbpath 路径

	输入网址不能运行

	重新开一个cmd输入mongo可以登录

## 命令：

	showdbs查看当前有几个数据库

	默认：admin与local

	use test新建一个，若已经存在则进入


* 
	use test
	db.user.insert({"name":"xiaoming","age":17,"hobby":["eat","sleep"]})
	db.user.find()  查看

* 导入一组数据
	mongoimport --db test --collection user --drop --file 导入文件

	--db 导入到哪个库
	--collection 导入到哪个集合
	--drop 加上就表示清空原有文档
	--file 要导入的文件

# 总结
	mongod --dbpath dir //打开或新建一个数据库

## mongo:
	show dbs //查看有几个库
	show collections 查看当前库所有集合

	use dbname //创建新的库
	db.collectionName.insert(obj) //在名为collectionName的集合中插入一条文档,如果集合不存在，则新建一个集合

	db.collectionName.find() 查找名为ollectionName集合中的所有记录

* 导入一组数据
	mongoimport --db test --collection user --drop --file 导入文件

	--db 导入到哪个库
	--collection 导入到哪个集合
	--drop 加上就表示清空原有文档
	--file 要导入的文件

* 查询

	db.collection.find()  //查询所有文档
	db.collection.find({"name","wuhao"}) //查询name为wuhao的文档


* 增加
	db.collection.insert(obj) //增加一个obj文档

	mongoimport

* 修改

	db.collection.updata(
		{
			k:v
		},
		{
			$set:{k2:v2,k3:v3}
		}
		)

* 删

- 文档

	db.user.remove({"name":"xiaojianhua"})

- 库
	
	db.dropData.base() //删除当前所在数据库

	db.collectionName.drop()//删除集合
	db.collectionName.remove({k,v})//删除匹配到的文档







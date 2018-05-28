var fs = require('fs');
/*读取css,img,iconfont,js*/
function getReq(req,res,path,type)
{
	path = '.' + path;
	fs.readFile(path,function(err,data)
	{
		if(err)
		{
			console.log('读取文件错误:'+path);
			res.end();
		}
		else
		{
			res.writeHead(200,type);
			res.write(data);
			res.end();
		}
		
	});
}

module.exports = 
{
	// ./views/main/index.html
	index:function(req,res)
	{
		var path = '/views/main/index.html'
		var type = {'Content-Type':'text/html'};
		getReq(req,res,path,type);
	},
	reqImg:function(req,res,path)
	{
		var type = {'Content-Type':'image/jpeg'};
		getReq(req,res,path,type);
	},
	reqCss:function(req,res,path)
	{
		var type = {'Content-Type':'text/css'};
		getReq(req,res,path,type);
	},
	reqJs:function(req,res,path)
	{
		var type = {'Content-Type':'application/javascript'};
		getReq(req,res,path,type);
	},
	reqHtml:function(req,res,path) 
	{
		var type = {'Content-Type':'text/html'};
		getReq(req,res,path,type);	
	}
}
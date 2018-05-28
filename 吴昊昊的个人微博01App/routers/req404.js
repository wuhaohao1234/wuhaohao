var fs = require('fs');
exports.get404 = function(req,res)
{
	fs.readFile('./views/main/page404.html',function(err,data)
	{
		if(err)
		{
			res.end();
		}
		else
		{
			res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
			res.write(data);
			res.end();
		}
	});
}


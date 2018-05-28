var http = require('http');
var url = require('url');
var api = require('./routers/api');
var req404 = require('./routers/req404');

function onRequest(request,response)
{
	if(request.url !== '/favicon.ico')
	{
		var path = url.parse(request.url).pathname;
		try
		{
			var Post = new RegExp('/post').test(path);
			var Get = new RegExp('/get').test(path);
			var Css = new RegExp('css').test(path);
			var Img = new RegExp('images').test(path);
			var Js = new RegExp('js').test(path);
			var html = new RegExp('.html').test(path);
				if(path == '/')
				{
					api['index'](request,response);
				}
				else if(Img)
				{
					api['reqImg'](request,response,path);
				}
				else if(Css)
				{
					api['reqCss'](request,response,path);
				}
				else if(Js)
				{
					api['reqJs'](request,response,path);
				}
				else if(html)
				{
					api['reqHtml'](request,response,path);	
				}
				else if(Post)
				{
					api['post'](request,response,path);		
				}
				else if(Get)
				{
					api['get'](request,response,path);		
				}
		}
		catch(err)
		{
			console.log(err+':app.js/60');
			req404['get404'](request,response);
		}
		
	}
}

http.createServer(onRequest).listen(80);
console.log('run success');



var http = require('http')
var fs = require('fs')
var urlLib = require('url')
var arr = {}
var i = 0;
var str = ''
// 注册18329723317
http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.writeHead(200,{"contest-type":"text/plan"})
    var json = urlLib.parse(req.url, true).query
    console.log(i++)
    fs.readFile('./user.json',function(err,data){
        if(err){
            console.log(err)
        }else{
            console.log(data)
            arr = JSON.parse(data);
        }
    })
    console.log(arr)
    if(arr[json.user]){
        res.write('false')   
    }else{
        res.write('true')
        arr[json.user] = json.pass;
        str = JSON.stringify(arr)
        fs.writeFile('./user.json',str,function(err){
            if(err){
                console.log(err)
            }
        })
    }
    res.end()
}).listen(8989)

// 登录
http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.writeHead(200, { "contest-type": "text/plan" })
    console.log(i++)
    var json = urlLib.parse(req.url, true).query
    /*
        { user: 'blue', pass: '123' }
    */
    fs.readFile('./user.json',function(err,data){
        if(err){
            console.log(err)
        }else{
            arr = JSON.parse(data);
        }
    })
    if (arr[json.user]) {
        if(json.pass == arr[json.user]){
            res.write('true true')
        }else{
            res.write('true false')
        }
    } else {
        res.write('false false')
    }
    console.log(arr)
    res.end()
}).listen(9090)
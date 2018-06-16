const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

const mainUrl = 'http://www.baidu.com'  

let url = ''    

superagent.get(mainUrl + url).end(function (err, res) {
        // 抛错拦截
    if (err) {
        return
        throw Error(err)
    }
    console.log(res.text)
    fs.writeFile('./demo.html',res.text,function(err,data){
    	if(err){
    		console.log(err)
    	}else{
    		console.log('ok')
    	}
    })
    // console.log(res)

})



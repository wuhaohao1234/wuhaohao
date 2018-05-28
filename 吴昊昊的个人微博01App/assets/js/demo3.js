var bigLi = $('.bigLi')
var container = $('.container');
var oUl = $('ul')[0]
//下拉菜单
$.dropdown(bigLi, container)
var pre = document.getElementById('editor')
var str = ''

// 获取用户输入的代码，目前存在bug，暂时无法解决
$('button').on('click',function () {
    var span = pre.getElementsByTagName('span')
    str = ''
    for(var i = 0;i < span.length;i ++) {
        str += span[i].innerHTML + ''
    }
    // console.log(str)
    var reg = /&lt;/g
    var reg2 = /&gt;/g
    var reg3 = /<span class="ace_cjk" style="width:13.1953125px">/g
    var reg4 = /<\/span>/g
    var reg5 = /[\u4E00-\u9FA5]+ /g
    var str2 = str.replace(reg,'<')
    var str3 = str2.replace(reg2, '>')
    var str4 = str3.replace(reg3, '')
    var str5 = str4.replace(reg5, '')
    // console.log(str5.replace(reg5, ''))
    // console.log(str5)
    // 将用户输入的代码用str4表示，然后给展示层:主要问题：无法处理汉字
    $('.sublime_contaiter').html()
    $('.sublime_contaiter').html(str5)
    console.log(str5)
})
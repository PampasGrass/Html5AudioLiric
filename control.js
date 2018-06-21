var music = ["戴荃 - 悟空", "凤飞飞 - 追梦人", "李宇春 - 再不疯狂我们就老了", "李宗盛 - 山丘", "马頔 - 傲寒",
						"南里侑香 - 暁の車", "牛奶咖啡 - 早上好", "朴树 - 那些花儿", "陶晶莹 - 走路去纽约", "羽泉 - 老男孩"];//歌单
var sel;
var num;
var au;
var str;
var screen;

window.onload = function(){
    num = 0
    sel = document.getElementById("sel");
    au = document.getElementsByTagName("audio")[0];
    screen = document.getElementById("screen");
    refreshLyric();

    //下拉菜单选歌
    sel.onchange = function(e){
        num = e.target.selectedIndex;
        au.src =  "music/"+music[num]+".mp3";
        refreshLyric();
        au.play();
    }

    //播放
    var btn1 = document.getElementById("btn-play");
    btn1.onclick = function(){
        if(au.paused){                 
            au.play();
        }
    }

    //暂停
    var btn2 = document.getElementById("btn-stop");
        btn2.onclick = function(){
            if(au.played){                 
                au.pause();
        }
    }

    //上一首
    var btn3 = document.getElementById("btn-pre");
    btn3.onclick = function(){
            num = num > 0 ? num - 1 : 9;
            au.src =  "music/"+music[num]+".mp3";
            refreshLyric();
            sel.selectedIndex = num;
            au.play();
    }
        
    //下一首
    var btn4 = document.getElementById("btn-next");
    btn4.onclick = function(){
            num = (num +1)%10;
            au.src =  "music/"+music[num]+".mp3";
            refreshLyric();
            sel.selectedIndex = num;
            au.play();
    }

    //循环
    var btn5 = document.getElementById("loop");
    btn5.onclick = function(){
        if(au.loop){
            au.loop = false;
            btn5.innerHTML = "单曲循环：关"
        } else {
            au.loop = true;
            btn5.innerHTML = "单曲循环：开"
        }
    }

    //复位
    var btn6 = document.getElementById("return");
    btn6.onclick = function(){
        au.src =  "music/"+music[num]+".mp3";
        au.pause;
    }

    //快进
    var btn7 = document.getElementById("go-for");
    btn7.onclick = function(){
        au.currentTime += 10;
    }

    //快退
    var btn8 = document.getElementById("go-bac");
    btn8.onclick = function(){
        au.currentTime -= 10;
    }

    //如果单曲循环，到结尾自动跳下一首
    au.onended = btn4.onclick;

    
    au.ontimeupdate = function(){
        var i = findCurrentLyric(str ,this.currentTime);  
        $('#gc #screen').css('top',-i*63+150+'px'); //让歌词向上移动    
        $('#gc #screen li').css('visibility','hidden');    
        $('#gc #screen li:nth-child('+(i+1)+')').css('visibility','visible'); //高亮显示当前播放的哪一句歌词    
    } 
}

//读取lrc文件    
function parseLyric(text) {    
    //将文本分隔成一行一行，存入数组    
    var lines = text.split('\n');    
    //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]    
    var pattern = /\[\d{2}:\d{2}.\d{2}\]/g;   
    //保存最终结果的数组    
    var result = [];    
    //去掉不含时间的行    
    while (!pattern.test(lines[0])) {    
        lines = lines.slice(1);    
    }    
    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉  
    lines[lines.length - 1].length === 0 && lines.pop();    
    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {    
        //提取出时间[xx:xx.xx]    
        var time = v.match(pattern);    
        //提取歌词    
        var value = v.replace(pattern, '');    
        //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔    
        time.forEach(function(v1, i1, a1) {    
            //去掉时间里的中括号得到xx:xx.xx    
            var t = v1.slice(1, -1).split(':');    
            //将结果压入最终数组    
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);    
        });    
    });    
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词    
    result.sort(function(a, b) {    
        return a[0] - b[0];    
    });    
    return result;    
}  

//载入当前歌曲的歌词
function refreshLyric(){
    var a = "https://pampasgrass.github.io/Html5AudioLiric/lyric/" + music[num] + ".lrc";
    $.get(a,function(data){
        str = parseLyric(data);
        screen.innerHTML ="";
        for(var i = 0, li; i < str.length; i++){    
            li=('<li>'+str[i][1]+'</li>');    
            $('#gc #screen').append(li);    
        }
 
    });
}

//二分查找确认当前歌词编号
function findCurrentLyric(list, FindValue){
    var min = 0;
    var max = list.length - 1;
    var middle = 0;
    while (min < max - 1)
    {
        middle = Math.floor((min + max) / 2);

        if (list[middle][0] == FindValue)
        {
            return middle;
        }
        else if (list[middle][0] > FindValue)
        {
            max = middle;
        }
        else
        {

            min = middle;
        }
    }
    return min;
}
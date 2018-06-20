//歌词同步部分    
function parseLyric(text) {    
    //将文本分隔成一行一行，存入数组    
    var lines = text.split('\n');    
    //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]    
    pattern = /\[\d{2}:\d{2}.\d{2}\]/g;   
    //保存最终结果的数组    
    result = [];    
    //去掉不含时间的行    
    while (!pattern.test(lines[0])) {    
        lineslines = lines.slice(1);    
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


function fn(sgname){    
    $.get('music/'+sgname+'.lrc',function(data){    
        var str=parseLyric(data);    
        for(var i=0,li;i<str.length;i++){    
            li=$('<li>'+str[i][1]+'</li>');    
            $('#gc ul').append(li);    
        }    
        $('#aud')[0].ontimeupdate=function(){//视屏 音频当前的播放位置发生改变时触发    
            for (var i = 0, l = str.length; i < l; i++) {    
                if (this.currentTime /*当前播放的时间*/ > str[i][0]) {    
                    //显示到页面    
                    $('#gc ul').css('top',-i*40+200+'px'); //让歌词向上移动    
                    $('#gc ul li').css('color','#fff');    
                    $('#gc ul li:nth-child('+(i+1)+')').css('color','red'); //高亮显示当前播放的哪一句歌词    
                }    
            }    
            if(this.ended){ //判断当前播放的音乐是否播放完毕    
                var songslen=$('.songs_list li').length;    
                for(var i= 0,val;i<songslen;i++){    
                    val=$('.songs_list li:nth-child('+(i+1)+')').text();    
                    if(val==sgname){    
                        i=(i==(songslen-1))?1:i+2;    
                        sgname=$('.songs_list li:nth-child('+i+')').text(); //音乐播放完毕之后切换下一首音乐    
                        $('#gc ul').empty(); //清空歌词    
                        $('#aud').attr('src','music/'+sgname+'.mp3');    
                        fn(sgname);    
                        return;    
                    }    
                }    
            }    
        };    
    });    
}
alert($("#sel").prop(""));
//fn($('#sel')[0].'selectedIndex');   



    
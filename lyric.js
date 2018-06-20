$.ajax({
    url:this.url,
    headers:{
        contentType:"application/x-www-form-urlencoded"
    },
    success:function(lrc){
        var lyric = parseLyric(lrc);
        if(success)success(lyric);
    },
    error:function(e){
        if(error)error(e);
    }
});

function parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');
        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
}

$player.bind("playing",function(){
    renderLyric($player.music);
});
function renderLyric(music){
lyric.html("");
var lyricLineHeight = 27,
    offset = lyric_wrap.offset().height*0.4;
music.lyric.fetch(function(data){
    music.lyric.parsed = {};
    var i = 0;
    for(var k in data){
        var txt = data[k];
        if(!txt)txt = "&nbsp;";
        music.lyric.parsed[k] = {
            index:i++,
            text:txt,
            top: i*lyricLineHeight-offset
        };
        var li = $("<li>"+txt+"</li>");
        lyric.append(li);
    }
    $player.bind("timeupdate",updateLyric);
},function(){
    lyric.html("<li style='text-align: center'>歌词加载失败</li>");
});
}

$player.bind("timeupdate",updateLyric);
var text_temp;
function updateLyric(){
    var data = $player.music.lyric.parsed;
    if(!data)return;
    var currentTime = Math.round(this.currentTime);
    var lrc = data[currentTime];
    if(!lrc)return;
    var text = lrc.text;
    if(text != text_temp){
        locationLrc(lrc);
        text_temp = text;
    }
    function locationLrc(lrc){
        lyric_wrap.find(".lyric_wrap .on").removeClass("on");
        var li = lyric_wrap.find("li:nth-child("+(lrc.index+1)+")");
        li.addClass("on");
        var top = Math.min(0,-lrc.top);
        //lyric.css({"-webkit-transform":"translate(0,-"+lrc.top+"px)"});
        lyric.css({"margin-top":top});
    }
}
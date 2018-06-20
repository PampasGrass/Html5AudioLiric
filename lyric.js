$.ajax({
    url:"https://github.com/PampasGrass/Html5AudioLiric/blob/master/%E5%87%A4%E9%A3%9E%E9%A3%9E%20-%20%E8%BF%BD%E6%A2%A6%E4%BA%BA.lrc",
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
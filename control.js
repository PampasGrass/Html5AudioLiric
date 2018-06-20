var music = ["戴荃 - 悟空", "凤飞飞 - 追梦人", "李宇春 - 再不疯狂我们就老了", "李宗盛 - 山丘", "马頔 - 傲寒",
						"南里侑香 - 暁の車", "牛奶咖啡 - 早上好", "朴树 - 那些花儿", "陶晶莹 - 走路去纽约", "羽泉 - 老男孩"];//歌单
var sel;
var num;

window.onload = function(){
    num = 0
    sel = document.getElementById("sel");

    //下拉菜单选歌
    sel.onchange = function(e){
        num = e.target.selectedIndex;
        audio.src =  "music/"+music[num]+".mp3";
        audio.play();
    }

    //播放
    var btn1 = document.getElementById("btn-play");
    btn1.onclick = function(){
        if(audio.paused){                 
            audio.play();
        }
    }

    //暂停
    var btn2 = document.getElementById("btn-stop");
        btn2.onclick = function(){
            if(audio.played){                 
                audio.pause();
        }
    }

    //上一首
    var btn3 = document.getElementById("btn-pre");
    btn3.onclick = function(){
            num = num > 0 ? num - 1 : 9;
            audio.src =  "music/"+music[num]+".mp3";
            sel.selectedIndex = num;
            audio.play();
    }
        
    //下一首
    var btn4 = document.getElementById("btn-next");
    btn4.onclick = function(){
            num = (num +1)%10;
            audio.src =  "music/"+music[num]+".mp3";
            sel.selectedIndex = num;
            audio.play();
    }

    //循环
    var btn5 = document.getElementById("loop");
    btn5.onclick = function(){
        if(audio.loop){
            audio.loop = false;
            btn5.innerHTML = "单曲循环：关"
        } else {
            audio.loop = true;
            btn5.innerHTML = "单曲循环：开"
        }

    }

    //复位
    var btn6 = document.getElementById("return");
    btn6.onclick = function(){
        audio.src =  "music/"+music[num]+".mp3";
        audio.pause;
    }

    //快进
    var btn7 = document.getElementById("go-for");
    btn7.onclick = function(){
        audio.currentTime += 10;
    }

    //快退
    var btn8 = document.getElementById("go-bac");
    btn8.onclick = function(){
        audio.currentTime -= 10;
    }

    //如果单曲循环，到结尾自动跳下一首
    audio.onended = btn4.onclick;
}
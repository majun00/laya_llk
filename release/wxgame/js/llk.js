var g_list_A = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var g_list_B = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var gameStatue;
//索引
var g_list_C = [];
for (var i = 0; i < g_list_A.length; i++) {
    g_list_C[i] = i;
}
//初始化卡片
function gameStart() {
    if (!gameStatue) {
        gameStatue = true;
        g_list_C.sort(function () {
            return 0.5 - Math.random();
        });
        var g_list_word = [];
        for (var i = 0; i < 8 * 3 / 2; i++) {
            g_list_word[i] = g_list_A[g_list_C[i]];
            g_list_word[i + 8 * 3 / 2] = g_list_B[g_list_C[i]];
        }
        g_list_word.sort(function () {
            return 0.5 - Math.random();
        });
        for (var i = 0; i < 24; i++) {
            button[i].text = g_list_word[i];
        }
        //开始计分
        Laya.timer.loop(1000, this, gameCounter);
    }
}
//计分
var timeCount = 0;
var errorCount = 0;
function gameCounter() {
    txt.text = "用时 : " + timeCount + " 失误:" + errorCount;
    timeCount += 1;
}
// 连连看逻辑
var card_A;
var card_B;
var winCount;
var card = [];
var button = [];
for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 3; j++) {
        var index = 8 * j + i;
        card[index] = new Laya.Sprite();
        Laya.stage.addChild(card[index]);
        card[index].name = index;
        card[index].graphics.drawRect(0, 0, 80, 120, null, "#000000", 2);
        card[index].loadImage("res/card.jpg", 0, 0, 80, 120);
        card[index].size(80, 120);
        card[index].pos(10 + 100 * i, 130 + 140 * j);
        card[index].on(Laya.Event.CLICK, this, function (e) {
            if (gameStatue == true) {
                if ((card_A == -1) && (card_B == -1)) {
                    card_A = e.target.name;
                    button[card_A].color = "red";
                }
                else if ((card_A != -1) && (card_B == -1)) {
                    card_B = e.target.name;
                    if ((g_list_A.indexOf(button[card_A].text) != -1) && (g_list_A.indexOf(button[card_A].text) == g_list_B.indexOf(button[card_B].text)) || (g_list_A.indexOf(button[card_A].text) == -1) && (g_list_A.indexOf(button[card_B].text) == g_list_B.indexOf(button[card_A].text))) {
                        button[card_A].color = "red";
                        button[card_B].color = "red";
                        winCount = winCount + 1;
                        if (winCount == 8 * 3 / 2) {
                            Laya.timer.clear(this, gameCounter);
                            var score = 100 - timeCount - errorCount;
                            txt.text = "游戏结束 得分 : " + score;
                        }
                    }
                    else {
                        button[card_A].color = "black";
                        button[card_B].color = "black";
                        errorCount += 1;
                    }
                }
                else if ((card_A != -1) && (card_B != -1)) {
                    card_A = e.target.name;
                    card_B = -1;
                    button[card_A].color = "red";
                }
            }
        });
        button[index] = new laya.display.Text();
        Laya.stage.addChild(button[index]);
        button[index].fontSize = 50;
        button[index].pos(5 + 100 * i + 40 - 50 / 2, 150 + 140 * j + 60 - 50 / 2);
    }
}
//# sourceMappingURL=llk.js.map
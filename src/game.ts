class game {
    g_list_A = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    g_list_B = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    g_list_C = [];
    gameStatue = false;
    timeCount = 0;
    errorCount = 0;
    button = [];
    txt = new laya.display.Text();

    // 初始化游戏
    initGame() {
        this.txt.text = "开始游戏";
        this.txt.font = "Arial";
        this.txt.fontSize = 28;
        this.txt.bold = true;
        this.txt.pos(g_stat_width - this.txt.width - 140, g_stat_heiht - this.txt.height - 20);
        Laya.stage.addChild(this.txt);
        this.txt.on(Laya.Event.CLICK, this, function (e) {
            switch (e.type) {
                case Laya.Event.CLICK:
                    this.startGame();
                    break;
            }
        });
        //索引
        for (let i = 0; i < this.g_list_A.length; i++) {
            this.g_list_C[i] = i;
        }
        this.doGame()

    }

    // 点击开始
    startGame() {
        if (!this.gameStatue) {
            this.gameStatue = true;
            this.g_list_C.sort(function () {
                return 0.5 - Math.random()
            })
            let g_list_word = [];
            for (let i = 0; i < 8 * 3 / 2; i++) {
                g_list_word[i] = this.g_list_A[this.g_list_C[i]];
                g_list_word[i + 8 * 3 / 2] = this.g_list_B[this.g_list_C[i]];
            }
            g_list_word.sort(function () {
                return 0.5 - Math.random()
            })
            for (let i = 0; i < 24; i++) {
                this.button[i].text = g_list_word[i];
            }
            //开始计分
            Laya.timer.loop(1000, this, this.gameCounter);
        }
    }

    // 连连看逻辑
    doGame() {
        let card_A;
        let card_B;
        let winCount = 0;
        let card = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 3; j++) {
                let index = 8 * j + i
                card[index] = new Laya.Sprite();
                Laya.stage.addChild(card[index]);
                card[index].name = index;
                card[index].loadImage("res/card.jpg", 0, 0, 80, 120);
                card[index].size(80, 120);
                card[index].pos(10 + 100 * i, 130 + 140 * j);

                this.button[index] = new laya.display.Text();
                Laya.stage.addChild(this.button[index]);
                this.button[index].fontSize = 50;
                this.button[index].pos(5 + 100 * i + 40 - 50 / 2, 150 + 140 * j + 60 - 50 / 2);

                card[index].on(Laya.Event.CLICK, this, function (e) {
                    if (this.gameStatue == true) {
                        if ((card_A == -1) && (card_B == -1)) {
                            card_A = e.target.name;
                            this.button[card_A].color = "red";
                            card[card_A].graphics.drawRect(0, 0, 80, 120, null, "#000000", 2);

                        } else if ((card_A != -1) && (card_B == -1)) {
                            card_B = e.target.name;
                            if ((this.g_list_A.indexOf(this.button[card_A].text) != -1) && (this.g_list_A.indexOf(this.button[card_A].text) == this.g_list_B.indexOf(this.button[card_B].text)) || (this.g_list_A.indexOf(this.button[card_A].text) == -1) && (this.g_list_A.indexOf(this.button[card_B].text) == this.g_list_B.indexOf(this.button[card_A].text))) {
                                this.button[card_A].color = "red";
                                this.button[card_B].color = "red";
                                winCount = winCount + 1;
                                Laya.stage.removeChild(card[card_A]);
                                Laya.stage.removeChild(card[card_B]);
                                Laya.stage.removeChild(this.button[card_A]);
                                Laya.stage.removeChild(this.button[card_B]);

                                if (winCount == 8 * 3 / 2) {
                                    console.log('win')
                                    Laya.timer.clear(this, this.gameCounter);
                                    let score = 100 - this.timeCount - this.errorCount;
                                    this.txt.text = "游戏结束 得分 : " + score;
                                }

                            } else {
                                this.button[card_A].color = "black";
                                this.button[card_B].color = "black";
                                card[card_A].graphics.drawRect(0, 0, 80, 120, null, "#fff", 3);
                                card[card_B].graphics.drawRect(0, 0, 80, 100, null, "#fff", 3);
                                this.errorCount += 1;
                            }
                            
                        } else if ((card_A != -1) && (card_B != -1)) {
                            card_A = e.target.name;
                            card_B = -1;
                            this.button[card_A].color = "red";
                            card[card_A].graphics.drawRect(0, 0, 80, 120, null, "#000000", 2);

                        }
                    }
                });
            }
        }
    }

    //计分
    gameCounter() {
        this.txt.text = "用时 : " + this.timeCount + " 失误:" + this.errorCount;
        this.timeCount += 1;
    }

}
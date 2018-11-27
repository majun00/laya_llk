var g_stat_width = 800;
var g_stat_heiht = 600;
// 程序入口
var start = /** @class */ (function () {
    function start() {
        this.initStage();
        this.initGame();
    }
    //初始化舞台
    start.prototype.initStage = function () {
        Laya.MiniAdpter.init();
        Laya.init(g_stat_width, g_stat_heiht);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
    };
    //初始化背景及游戏
    start.prototype.initGame = function () {
        var background = new Laya.Sprite();
        background.loadImage("res/1.jpg", 0, 0, 800, 600);
        background.cacheAsBitmap = true;
        Laya.stage.addChild(background);
        new game().initGame();
    };
    return start;
}());
new start();
//# sourceMappingURL=main.js.map
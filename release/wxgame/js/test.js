//点击切换图片
var Main1 = /** @class */ (function () {
    function Main1() {
        this.monkey1 = 'res/monkey2.png';
        this.monkey2 = 'res/monkey1.png';
        this.flag = false;
        Laya.init(1334, 750);
        Laya.stage.bgColor = '#fff';
        Laya.loader.load([this.monkey1, this.monkey2], Laya.Handler.create(this, this.graphicsImg));
    }
    Main1.prototype.graphicsImg = function () {
        this.img = new Laya.Sprite();
        Laya.stage.addChild(this.img);
        this.switchImg();
        this.img.on(Laya.Event.CLICK, this, this.switchImg);
        this.img.pos(100, 50);
    };
    Main1.prototype.switchImg = function () {
        this.img.graphics.clear();
        var imgUrl = (this.flag = !this.flag) ? this.monkey1 : this.monkey2;
        var texture = Laya.loader.getRes(imgUrl);
        this.img.graphics.drawTexture(texture);
        this.img.size(texture.width, texture.height);
    };
    return Main1;
}());
new Main1();
//# sourceMappingURL=test.js.map
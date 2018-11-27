var Main = /** @class */ (function () {
    function Main() {
        this.monkey1 = 'res/monkey1.png';
        this.monkey2 = 'res/monkey2.png';
        this.flag = false;
        Laya.init(1334, 750);
        Laya.stage.bgColor = '#fff';
        this.img = new Laya.Sprite();
        this.switchImg();
        this.img.on(Laya.Event.CLICK, this, this.switchImg);
        Laya.stage.addChild(this.img);
    }
    Main.prototype.switchImg = function () {
        this.img.graphics.clear();
        var imgUrl = (this.flag = !this.flag) ? this.monkey1 : this.monkey2;
        this.img.loadImage(imgUrl, 100, 100);
    };
    return Main;
}());
new Main();
//# sourceMappingURL=hello.js.map
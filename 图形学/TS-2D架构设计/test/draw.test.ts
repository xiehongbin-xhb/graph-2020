import { Canvas2DApplication } from '../src/Application';

class TestApplication extends Canvas2DApplication {
    private _lineDashOffset: number = 0;
    // 由于 Colors 独一无二，没有多个实例，所以可以声明为公开的静态的数组类型
    public static Colors : string[] = [
        'aqua' ,                   //浅绿色
        'black' ,                  //黑色
        'blue' ,                   //蓝色
        'fuchsia' ,                //紫红色
        'gray',                    //灰色
        'green' ,                  //绿色
        'lime' ,                   //绿黄色
        'maroon' ,                 //褐红色
        'navy' ,                   //海军蓝
        'olive' ,                  //橄榄色
        'orange' ,                 //橙色
        'purple' ,                 //紫色
        'red',                     //红色
        'silver' ,                 //银灰色
        'teal' ,                   //蓝绿色
        'white' ,                  //白色
        'yellow'                   //黄色
    ];
    start() {
        // 更新虚线偏移位置，也可以写在 update 里面
        this.addTimer(this.timeCallback.bind(this), 50);
        super.start();
    }
    render() {
        if (!this.ctx2D) return;
        // 清屏
        this.ctx2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 具体绘制
        this.drawRect(0, 0, this.canvas.width / 2, this.canvas.height / 2);
        this.drawGrid();
    }
    drawRect(x: number, y: number, w: number, h: number) {
        // save -> paint -> restore 经典的渲染状态机模式
        const ctx2D: CanvasRenderingContext2D | null = this.ctx2D;
        if (!ctx2D) return;
        ctx2D.save();
        ctx2D.fillStyle = 'yellow';
        ctx2D.strokeStyle = 'red';
        ctx2D.lineWidth = 10;
        // 虚线的宽为 30px，间隔为 15px
        ctx2D.setLineDash([30, 15]);
        ctx2D.lineDashOffset = this._lineDashOffset;
        ctx2D.beginPath();
        ctx2D.moveTo(x, y);
        ctx2D.lineTo(x + w, y);
        ctx2D.lineTo(x + w, y + h);
        ctx2D.lineTo(x, y + h);
        ctx2D.closePath();
        // 填充
        ctx2D.fill();
        // 描边
        ctx2D.stroke();
        ctx2D.restore();
    }
    drawCircle(x: number, y: number, radius: number, fillStyle: string | CanvasGradient | CanvasPattern = '#000') {
        const ctx2D: CanvasRenderingContext2D | null = this.ctx2D;
        if (!ctx2D) return;
        ctx2D.save();
        ctx2D.fillStyle = fillStyle;
        ctx2D.beginPath();
        ctx2D.arc(x, y, radius, 0, Math.PI * 2);
        ctx2D.fill();
        ctx2D.restore();
    }
    // 这里画线并没有使用 save 和 restore，因为这个方法一般会被调用多次，所以由开发者进行状态管理和设置
    drawLine(x1: number, y1: number, x2: number, y2: number) {
        const ctx2D: CanvasRenderingContext2D | null = this.ctx2D;
        if (!ctx2D) return;
        ctx2D.beginPath();
        ctx2D.moveTo(x1, y1);
        ctx2D.lineTo(x2, y2);
        ctx2D.stroke();
    }
    drawCoords(originX: number, originY: number, width: number, height: number) {
        const ctx2D: CanvasRenderingContext2D | null = this.ctx2D;
        if (!ctx2D) return;
        ctx2D.save();
        this.drawLine(originX, originY, originX + width, originY);
        this.drawLine(originX, originY, originX, originY + height);
        ctx2D.restore();
    }
    drawGrid(color: string = '#000', interval: number = 10) {
        const ctx2D: CanvasRenderingContext2D | null = this.ctx2D;
        if (!ctx2D) return;
        ctx2D.save();
        ctx2D.strokeStyle = color;
        ctx2D.lineWidth = 0.5;
        // 从左到右画垂直线
        for(let i = interval + 0.5; i < this.canvas.width; i += interval) {
            this.drawLine(i, 0, i, this.canvas.height);
        }
        // 从上到下画水平线
        for(let i = interval + 0.5; i < this.canvas.height; i += interval) {
            this.drawLine(0, i, this.canvas.width, i);
        }
        ctx2D.restore();
        // 绘制全局坐标系，左上角为原点，x 轴向右，y 轴向下，特别适合用来观察坐标变换
        this.drawCircle(0, 0, 5, '#000');
        this.drawCoords(0, 0, this.canvas.width, this.canvas.height);
    }
    timeCallback(id: number, data: any) {
        if (!this.ctx2D) return;
        this.updateLineDashOffset();
        this.drawRect(20, 20, this.ctx2D.canvas.width / 2, this.ctx2D.canvas.height / 2);
    }
    private updateLineDashOffset() {
        this._lineDashOffset++;
        if (this._lineDashOffset > 1000) {
            this._lineDashOffset = 0;
        }
    }
}

// 测试主流程
const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
const app: TestApplication = new TestApplication(canvas);
app.start();
const startBtn: HTMLButtonElement = document.getElementById('start') as HTMLButtonElement;
const stopBtn: HTMLButtonElement = document.getElementById('stop') as HTMLButtonElement;

startBtn.addEventListener('click', (e: MouseEvent) => {
    app.start();
});
stopBtn.addEventListener('click', (e: MouseEvent) => {
    app.stop();
});
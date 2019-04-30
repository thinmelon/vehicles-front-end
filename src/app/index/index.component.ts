import {Component, OnInit} from '@angular/core';
import {Action, ActionType, BackboneService} from '../services/backbone.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
    record: Action[] = [];      //  操作记录
    currentPage = 1;            //  当前页
    collectionSize = 0;         //  数据集大小
    pageSize = 10;              //  每页数量
    currentSpeed = 0;           //  当前时速
    minSpeed = 0;               //  最小时速
    maxSpeed = 240;             //  最大时速
    speedUnit = 10;             //  时速粒度
    errorMessage = '';
    currentAction = '';
    pilotLamp = '../../assets/public/green-light.png';

    constructor(private backbone: BackboneService) {
    }

    ngOnInit() {
        this.queryRecord();
        this.getVehicleStatus();
    }

    render() {
        const that = this;
        this.pilotLamp = '../../assets/public/red-light.png';           //  切换指标灯颜色
        this.queryRecord();                                             //  更新操作日志
        setTimeout(() => {                                               //  500ms 后复原指标灯颜色
            that.pilotLamp = '../../assets/public/green-light.png';
        }, 500);
    }

    /**
     * 记录操作记录
     * @param direction     方向
     */
    drive(direction: number) {
        this.currentAction = ActionType[direction];
        this.backbone
            .recordAction(this.backbone.publicEncrypt(''), direction, '')
            .subscribe(res => {
                // console.log(res);
                if (res.code === 0) {
                    this.render();
                }
            });
    }

    /**
     * 加速
     */
    speedUp() {
        if (this.currentSpeed + this.speedUnit <= this.maxSpeed) {
            this.currentSpeed += this.speedUnit;
            this.currentAction = ActionType[4];
            this.backbone
                .recordAction(this.backbone.publicEncrypt(''), 4, this.currentSpeed.toString())
                .subscribe(res => {
                    // console.log(res);
                    if (res.code === 0) {
                        this.render();
                    }
                });
        }
    }

    /**
     * 减速
     */
    slowDown() {
        if (this.currentSpeed - this.speedUnit >= this.minSpeed) {
            this.currentSpeed -= this.speedUnit;
            this.currentAction = ActionType[5];
            this.backbone
                .recordAction(this.backbone.publicEncrypt(''), 5, this.currentSpeed.toString())
                .subscribe(res => {
                    // console.log(res);
                    if (res.code === 0) {
                        this.render();
                    }
                });
        }
    }

    /**
     * 查询操作记录
     */
    queryRecord() {
        const that = this;
        this.backbone
            .queryRecord(this.backbone.publicEncrypt(''), (this.currentPage - 1) * this.pageSize, this.pageSize)
            .subscribe(res => {
                // console.log(res);
                if (res.code === 0 && res.data.length > 0) {
                    let index = 0;
                    that.collectionSize = res.amount;
                    that.record = res.data.map(item => {
                        return new Action(++index,
                            item._id,
                            ActionType[item.action],
                            item.remark,
                            item.createTime);
                    });
                }
            });
    }

    /**
     * 获取车辆实时状态
     */
    getVehicleStatus() {
        this.backbone.getVehicleStatus(this.backbone.publicEncrypt(''))
            .subscribe(res => {
                console.log(res);
                if (res.code === 0 && res.data) {
                    if (res.data.hasOwnProperty('action')) {
                        this.currentAction = ActionType[res.data.action];
                    }
                    if (res.data.hasOwnProperty('remark') && parseInt(res.data.remark, 10)) {
                        this.currentSpeed = parseInt(res.data.remark, 10);
                    }
                }
            });
    }

    onPageChanged(evt) {
        this.currentPage = evt;
        this.queryRecord();
    }

}

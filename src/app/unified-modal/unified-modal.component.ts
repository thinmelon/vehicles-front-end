import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-unified-modal',
    templateUrl: './unified-modal.component.html',
    styleUrls: ['./unified-modal.component.less']
})
export class UnifiedModalComponent implements OnInit {
    @Input() title: string;                                      //  模式框标题
    @Input() hint: string;                                       //  提示信息
    @Input() extra: string;                                      //  额外说明
    @Input() keyValues = [];                                      //  控件列表
    @Input() submitBtnText = '保存';                              //  提交按键名
    @Input() cancelBtnText = '取消';                              //  取消按键名
    @Output() submitEvt = new EventEmitter<any>();               //  提交按键回传事件
    @Output() cancelEvt = new EventEmitter<any>();               //  取消按键回传事件

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

    /**
     * 提交
     */
    onSubmit() {
        // this.activeModal.dismiss('Completed');
        this.submitEvt.emit(this.keyValues);
    }

    /**
     * 取消
     */
    onCancel() {
        this.activeModal.dismiss('Cancel');
        this.cancelEvt.emit('');
    }

}

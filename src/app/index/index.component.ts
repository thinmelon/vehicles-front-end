import {Component, OnInit} from '@angular/core';
import {Action} from '../services/backbone.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
    record: Action[];
    errorMessage = '';

    constructor() {
    }

    ngOnInit() {
        this.record = [
            new Action('asdfgh', 1, '向左', '2019-04-28')
        ]
    }

}

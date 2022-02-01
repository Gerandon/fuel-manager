import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    public testModel = {
        input_one: '',
        input_two: ''
    };

    constructor() {
    }

    ngOnInit(): void {
    }

}

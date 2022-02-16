import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Config, filteredMenu} from "../../app-common/common";
import {IMenu} from "../../app-common/interfaces/common.interface";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

    public menu: IMenu[] = filteredMenu('showAsTile');

    constructor() {
    }

    ngOnInit(): void {
    }

}

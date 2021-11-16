import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Config} from "../../app-common/common";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

    public menu = Config.menu.filter(menu => menu.showAsTile);

    constructor() {
    }

    ngOnInit(): void {
    }

}

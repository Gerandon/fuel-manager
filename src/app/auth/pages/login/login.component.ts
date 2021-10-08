import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public user: { userName?: string; password?: string; } = {};

    constructor(public cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
    }

}

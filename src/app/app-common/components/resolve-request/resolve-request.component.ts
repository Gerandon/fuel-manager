import {Component, Input, OnInit} from '@angular/core';
import {Observable, shareReplay} from "rxjs";
import {catchError, distinctUntilChanged, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'resolve-request',
    templateUrl: './resolve-request.component.html',
    styleUrls: ['./resolve-request.component.scss']
})
export class ResolveRequestComponent implements OnInit {

    @Input() public observable?: Observable<any>;
    @Input() public url?: string;
    @Input() public catchUrl?: string;
    public value: any;

    private lastGotUrl?: string;

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        if (this.url) {
            this.observable = this.http.get(this.url, {responseType: 'blob'}).pipe(
                distinctUntilChanged(() => this.url !== this.lastGotUrl),
                catchError(() => this.http.get(this.catchUrl || 'assets/images/nocar.jpeg', {responseType: 'blob'}).pipe(shareReplay())),
                tap((byteArray) => {
                    this.lastGotUrl = this.url;
                    this.processByteArray(byteArray);
                }),
            );
        }
    }

    private processByteArray(byteArray) {
        const r = new FileReader();
        r.onload = () => this.value = `data:image/png;base64,${btoa(<string>r.result)}`;
        r.readAsBinaryString(byteArray);
    }
}

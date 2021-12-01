import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {VehicleDataType} from "../../../app-common/interfaces/vehicle.interface";
import {defaultVehicle} from "../../../app-common/common";
import {_} from "../../../app-common/vendor/vendor.module";
import html2canvas from "html2canvas";
import {AuthService} from "../../../auth/services/auth.service";
import {first, tap} from "rxjs/operators";

@Component({
    selector: 'app-traffic-license',
    templateUrl: './traffic-license.component.html',
    styleUrls: ['./traffic-license.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TrafficLicenseComponent implements OnInit {

    @Input() public vehicle: VehicleDataType = _.cloneDeep(defaultVehicle);
    @Input() public scale:  number = 1;
    @Input() public edit = false;

    @ViewChild('screen') screen!: ElementRef;
    @ViewChild('canvas') canvas!: ElementRef;
    @ViewChild('downloadLink') downloadLink!: ElementRef;

    constructor(private cdr: ChangeDetectorRef,
                private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    download() {
        this.edit = false;
        this.cdr.detectChanges();
        html2canvas(this.screen.nativeElement,{
            onclone: (clonedDoc) => {
                // @ts-ignore
                clonedDoc?.getElementsByClassName('license-container')[0]?.style?.display = 'block';
            }
        }).then(canvas => {
            this.authService.getUserData().pipe(
                first(),
                tap((userData) => {
                    this.canvas.nativeElement.src = canvas.toDataURL();
                    this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
                    this.downloadLink.nativeElement.download = `${userData.email.split('@')[0]}_${this.vehicle.brand}_license.png`;
                    this.downloadLink.nativeElement.click();
                }),
            ).subscribe();
        });
    }
}

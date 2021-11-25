import {AfterViewInit, Component, ElementRef, Host, Input, OnInit, Optional, ViewChild} from '@angular/core';
import {BaseFormComponent} from "../../../app-common/widgets/core/base-form.component";
import {NgForm, ValidationErrors} from "@angular/forms";
import {VehicleDataType} from "../../../app-common/interfaces/vehicle.interface";
import {defaultVehicle} from "../../../app-common/common";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, debounceTime, map, startWith, switchMap, tap} from "rxjs/operators";
import {BasicInputComponent} from "../../../app-common/widgets/basic-input/basic-input.component";
import {_} from "../../../app-common/vendor/vendor.module";

@Component({
    selector: 'app-transport-type',
    templateUrl: './transport-type.component.html',
    styleUrls: ['./transport-type.component.scss']
})
export class TransportTypeComponent extends BaseFormComponent implements OnInit, AfterViewInit {

    @Input() public vehicle: VehicleDataType = _.cloneDeep(defaultVehicle);
    @Input() public showContainer = true;

    public wrongImageValidator!: Observable<ValidationErrors>;

    constructor(@Host() @Optional() protected parentForm: NgForm, private http: HttpClient) {
        super(parentForm);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit() {
        this.wrongImageValidator = of(this.vehicle.ownerData).pipe(
            switchMap((resp: any) => {
                const { imageUrl } = resp || { imageUrl: '' };
                return this.http.get(imageUrl, { responseType: 'blob' }).pipe(
                    map((resp) => {
                        return resp;
                    }),
                    catchError(err => (of({ wrongImage: true}))),
                );
            })
        );
    }
}

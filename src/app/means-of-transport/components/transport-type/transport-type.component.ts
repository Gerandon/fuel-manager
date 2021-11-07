import {Component, Host, Input, OnInit, Optional} from '@angular/core';
import {VehicleDataType} from "../../../app-common/interfaces/common.interface";
import {BaseFormComponent} from "../../../app-common/widgets/core/base-form.component";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-transport-type',
    templateUrl: './transport-type.component.html',
    styleUrls: ['./transport-type.component.scss']
})
export class TransportTypeComponent extends BaseFormComponent implements OnInit {

    @Input() public vehicle: VehicleDataType = {} as VehicleDataType;

    constructor(@Host() @Optional() protected parentForm: NgForm) {
        super(parentForm);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

}

import {Component, Host, Input, OnInit} from '@angular/core';
import {VehicleDataType} from "../../../app-common/interfaces/common.interface";
import {BaseFormComponent} from "../../../app-common/widgets/core/base-form.component";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-add-transport-type',
    templateUrl: './add-transport-type.component.html',
    styleUrls: ['./add-transport-type.component.scss']
})
export class AddTransportTypeComponent extends BaseFormComponent implements OnInit {

    @Input() public vehicle: VehicleDataType = {} as VehicleDataType;

    constructor(@Host() protected parentForm: NgForm) {
        super(parentForm);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

}

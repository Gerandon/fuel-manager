import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {VehicleDataType} from "../../../app-common/interfaces/vehicle.interface";

@Component({
    selector: 'app-vehicle-tile',
    templateUrl: './vehicle-tile.component.html',
    styleUrls: ['./vehicle-tile.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class VehicleTileComponent {

    @Input() vehicle!: VehicleDataType;
    @Output() onUpdate = new EventEmitter<VehicleDataType>();
    @Output() detail = new EventEmitter<VehicleDataType>();
    @Output() onDelete = new EventEmitter<VehicleDataType>();

    constructor() {
    }

    prevent(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}

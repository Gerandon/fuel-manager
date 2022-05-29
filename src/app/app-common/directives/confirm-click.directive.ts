import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../dialogs/confirm-dialog/confirm-dialog.component";

@Directive({
    selector: '[confirmClick]'
})
export class ConfirmClickDirective {

    @Output() public confirmClick = new EventEmitter();

    constructor(private dialog: MatDialog) {
    }

    @HostListener('click', ['$event'])
    public onClick(event) {
        event.stopPropagation();
        event.preventDefault();
        this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe((data) => {
            if(data) {
                this.confirmClick.emit();
            }
        });
    }
}

import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'app-triangle-button',
    templateUrl: './triangle-button.component.html',
    styleUrls: ['./triangle-button.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TriangleButtonComponent implements OnInit {

    @ViewChild('triangler', {static: true}) public inputRef!: ElementRef;
    @Output() click = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

    inputClicked() {
        this.inputRef.nativeElement.classList.toggle('triangle-input__clicked');
        setTimeout(() => {
            this.inputRef.nativeElement.classList.toggle('triangle-input__clicked');
        }, 100);
        this.click.emit();
    }
}

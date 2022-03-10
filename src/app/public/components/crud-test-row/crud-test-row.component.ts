import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {JsonEditorOptions} from "ang-jsoneditor";

export enum RequestType {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
    UPDATE = 'UPDATE'
}

@Component({
    selector: 'crud-test-row',
    templateUrl: './crud-test-row.component.html',
    styleUrls: ['./crud-test-row.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CrudTestRowComponent implements OnInit {

    @Input() public type: RequestType = RequestType.POST;
    @Input() public endpoint: string;
    @Input() public jsonData: any = { test: 11, asd: [1, 2]};

    public colorByRequest = {
        [RequestType.DELETE]: '#ff0000',
        [RequestType.GET]: '#4fa100',
        [RequestType.POST]: '#c98f00',
    };
    public editorOptions: JsonEditorOptions;

    constructor() {
        this.editorOptions = new JsonEditorOptions()
        this.editorOptions = {
            ...this.editorOptions,
            modes: ['tree'],
            mode: 'tree',
            expandAll: false,
            mainMenuBar: false,
            navigationBar: false,
            enableTransform: false,
            enableSort: false,
            statusBar: false,
            sortObjectKeys: false,
            history: false,
            search: false,
        }
        this.editorOptions.language = 'en';
        //this.options.mode = 'code'; //set only one mode
    }

    ngOnInit(): void {
    }

}

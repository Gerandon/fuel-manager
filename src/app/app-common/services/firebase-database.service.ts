import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {SessionStorage} from "ngx-webstorage";
import {first, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {BaseType} from "../interfaces/common.interface";
import {v4} from "uuid";
import {lodash as _} from 'src/app/app-common/vendor/vendor.module';

@Injectable()
export class FirebaseDatabaseService<ITEM extends BaseType> {

    @SessionStorage('uid')
    private uid!: string;
    private tutorialsRef!: AngularFireList<ITEM>;

    constructor(private db: AngularFireDatabase, private dbPath: string) {
        this.tutorialsRef = this.db.list(`${this.uid}/${this.dbPath}`);
    }

    getAll(): Observable<any> {
        return this.tutorialsRef.snapshotChanges().pipe(
            map(changes => changes.map(c => ({
                key: c.payload.key,
                ...c.payload.val() ,
                creationDate: new Date(c.payload.val()!.creationDate)
            })))
        );
    }

    create(tutorial: any): any {
        return this.tutorialsRef.push(_.omit({
            ...tutorial,
            id: v4(),
            creationDate: tutorial.creationDate.getTime(),
        }, ['key']));
    }

    update(item: ITEM): Observable<ITEM[]>{
        return this.getAll().pipe(
            first(),
            tap(items => {
                const editable = items.find(_item => _item.id === item.id);
                if (editable) {
                    this.tutorialsRef.update(editable['key'], {
                        ...item,
                        creationDate: item.creationDate.getTime()
                    });
                }
            })
        );
    }

    delete(item: ITEM): Observable<any> {
        return this.getAll().pipe(
            first(),
            tap(items => {
                const removable = items.find(_item => _item.id === item.id);
                if (removable) {
                    this.tutorialsRef.remove(removable.key);
                }
            })
        );
    }

    deleteAll(): Promise<void> {
        return this.tutorialsRef.remove();
    }
}

import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {SessionStorage} from "ngx-webstorage";
import {filter, first, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {BaseType} from "../interfaces/common.interface";
import {v4} from "uuid";
import {lodash as _} from 'src/app/app-common/vendor/vendor.module';
import {environment} from "../../../environments/environment";

@Injectable()
export class FirebaseDatabaseService<ITEM extends BaseType> {

    @SessionStorage('uid')
    private uid!: string;
    private dbRef!: AngularFireList<ITEM>;

    constructor(private db: AngularFireDatabase, private dbPath: string) {
        this.dbRef = this.db.list(`${environment.firebase.mode}/${this.uid}/${this.dbPath}`);
    }

    search(queryParams?: {key: keyof ITEM, value: string}): Observable<ITEM[]> {
        const { key, value } = queryParams || { key: null, value: null };
        // return this.dbRef.query.orderByChild(key).equalTo(value);
        // Not the best way, 'cause we're using the whole list to search in it
        // Should use query
        return this.getAll().pipe(
            map((array) => array.filter(item => {
                if (!queryParams) {
                    return true;
                }
                // Should be more generic
                if ((`'${key}'`).includes('Date')) {
                    return (<Date>item[key]).getMonth() === Number(value);
                }
                return item[key].includes(value);
            }))
        );
    }

    getAll(): Observable<any> {
        return this.dbRef.snapshotChanges().pipe(
            map(changes => changes.map(c => ({
                key: c.payload.key,
                ...c.payload.val() ,
                creationDate: new Date(c.payload.val()!.creationDate)
            })))
        );
    }

    create(tutorial: any): any {
        return this.dbRef.push(_.omit({
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
                    this.dbRef.update(editable['key'], {
                        ...item,
                        creationDate: item.creationDate.getTime()
                    });
                }
            })
        );
    }

    updateAll(item: ITEM): Observable<ITEM[]> {
        return this.getAll().pipe(
            first(),
            tap(items => items.forEach(_item => this.dbRef.update(_item['key'], {
                ..._item,
                ...item,
            })))
        )
    }

    delete(item: ITEM): Observable<any> {
        return this.getAll().pipe(
            first(),
            tap(items => {
                const removable = items.find(_item => _item.id === item.id);
                if (removable) {
                    this.dbRef.remove(removable.key);
                }
            })
        );
    }

    deleteAll(): Promise<void> {
        return this.dbRef.remove();
    }
}

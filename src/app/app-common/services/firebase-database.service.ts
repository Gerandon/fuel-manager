import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {SessionStorage} from "ngx-webstorage";
import {distinctUntilChanged, first, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {BaseType} from "../interfaces/common.interface";
import {v4} from "uuid";
import {_} from 'src/app/app-common/vendor/vendor.module';
import {environment} from "../../../environments/environment";
import firebase from "firebase/compat";
import {DatabaseReference, FirebaseOperation} from "@angular/fire/compat/database/interfaces";
import Query = firebase.database.Query;
import ThenableReference = firebase.database.ThenableReference;

interface _BaseType extends BaseType {
    [key: string]: any;
    key?: string;
}

@Injectable()
export class FirebaseDatabaseService<ITEM extends _BaseType> {

    @SessionStorage('uid')
    private uid!: string;

    private readonly path;
    private dbRef!: (query?: (ref: DatabaseReference) => Query) => AngularFireList<ITEM>;

    constructor(private db: AngularFireDatabase, private dbPath: string) {
        this.path = `${environment.firebase.mode}/${this.uid}/${this.dbPath}`;
        this.dbRef = (query?: (ref: DatabaseReference) => Query) => query
            ? this.db.list(this.path, query)
            : this.db.list(this.path);
            // : this.db.list(this.path, ref => ref.orderByChild('creationDate'));
    }

    search(queryParams?: {key: keyof ITEM, value: string}): Observable<ITEM[]> {
        const { key, value } = queryParams || { key: null, value: null };
        // return this.dbRef.query.orderByChild(key).equalTo(value);
        // Not the best way, 'cause we're using the whole list to search in it
        // Should use query

        return this.getAll(true).pipe(
            map((array) => array.filter(item => {
                if (!queryParams) {
                    return true;
                }
                // Should be more generic
                if ((`'${key}'`).includes('Date')) {
                    // @ts-ignore
                    return (<Date>item[key]).getMonth() === Number(value);
                }
                // @ts-ignore
                return item[key].includes(value);
            }))
        );
    }

    getAll(ordered?): Observable<ITEM[]> {
        return this.dbRef(ordered ? (ref => ref.orderByChild('creationDate')) : undefined).snapshotChanges().pipe(
            distinctUntilChanged(),
            map(changes => changes.map(c => {
                return {
                    ...{key: c.payload.key} as any,
                    ...c.payload.val() ,
                    creationDate: new Date(c.payload.val()!.creationDate)
                }
            }))
        );
    }

    create(item: ITEM): ThenableReference {
        return this.dbRef().push(_.omit({
            ...item,
            id: v4(),
            creationDate: new Date().getTime(),
        }, ['key']) as ITEM);
    }

    update(item: ITEM): Observable<ITEM[]>{
        return this.getAll().pipe(
            first(),
            tap(items => {
                const editable = items.find(_item => _item.id === item.id);
                if (editable) {
                    // @ts-ignore
                    this.dbRef().update(editable.key, _.omit(item, 'creationDate'));
                }
            })
        );
    }

    updateMultiple({property, value}, itemIds?: string[]): Observable<ITEM[]> {
        return this.getAll().pipe(
            first(),
            tap(items => items.forEach((_item: ITEM) => {
                if (!itemIds?.length || itemIds.includes(<string>_item.id)) {
                    this.dbRef().update(<FirebaseOperation>_item.key, _.set2(_item, property, value));
                }
            })
        ));
    }

    delete(item: ITEM): Observable<any> {
        return this.getAll().pipe(
            first(),
            tap(items => {
                const removable = items.find(_item => _item.id === item.id);
                if (removable) {
                    this.dbRef().remove(removable.key);
                }
            })
        );
    }

    deleteAll(): Promise<void> {
        return this.dbRef().remove();
    }
}

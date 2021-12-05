import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {SessionStorage} from "ngx-webstorage";
import {distinctUntilChanged, first, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {BaseType} from "../interfaces/common.interface";
import {v4} from "uuid";
import {_} from 'src/app/app-common/vendor/vendor.module';
import {environment} from "../../../environments/environment";
import firebase from "firebase/compat";
import {DatabaseReference, FirebaseOperation} from "@angular/fire/compat/database/interfaces";
import Query = firebase.database.Query;
import ThenableReference = firebase.database.ThenableReference;
import {formatObject} from "traversal-handler";

interface _BaseType extends BaseType {
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
                if ((`'${key}'`).toLocaleLowerCase().includes('date')) {
                    // @ts-ignore
                    return (<Date>item[key]).getMonth() === Number(value);
                }
                // @ts-ignore
                return item[key].includes(value);
            }))
        );
    }

    get(id: string): Observable<ITEM> {
        // @ts-ignore
        return this.getAll().pipe(
            map(list => list.find(item => item.id === id)),
        );
    }

    getAll(ordered?): Observable<ITEM[]> {
        return this.dbRef(ordered ? (ref => ref.orderByChild('creationDate')) : undefined).snapshotChanges().pipe(
            distinctUntilChanged((prev,curr) => {
                const prevMapped = prev.map(_curr => _curr.payload.val());
                const currMapped = curr.map(_curr => _curr.payload.val());
                return prevMapped.length === currMapped.length &&
                    prevMapped.every((_curr, index) => _.isEqual(_curr, currMapped[index]));
            }),
            map(changes => changes.map(c => {
                const payloadVal = formatObject(c.payload.val(), (object, key, value) =>
                    key.toLowerCase().endsWith('date') ? new Date(value) : value);
                return {
                    ...{key: c.payload.key} as any,
                    ...payloadVal,
                }
            }))
        );
    }

    create(item: ITEM): ThenableReference {
        const payloadVal = formatObject(item, (object, key, value) =>
            value instanceof Date ? new Date(value).getTime() : value);
        return this.dbRef().push(_.omit({
            ...payloadVal,
            id: v4(),
            creationDate: new Date().getTime(),
        }, ['key']) as ITEM);
    }

    update(item: ITEM): Observable<ITEM[]>{
        const payloadVal = formatObject(item, (object, key, value) =>
            value instanceof Date ? new Date(value).getTime() : value);
        // @ts-ignore
        this.dbRef().update(item.key, {
            ..._.omit(payloadVal, 'creationDate'),
            modificationDate: new Date().getTime()
        });
        return of([]);
    }

    updateMultiple({property, value}, itemIds?: string[], omitIds?: string[]): Observable<ITEM[]> {
        return this.getAll().pipe(
            first(),
            tap(items => items.forEach((_item: ITEM) => {
                if (!itemIds?.length || itemIds.includes(<string>_item.id) && !omitIds?.includes(_item.id)) {
                    const root = property.split('.')[0];
                    const dummyOldDiff = _.set({}, root, _item[root]);
                    const dummyNewDiff = _.set({}, property.split('.'), value);
                    const merged = {
                        ...dummyOldDiff[root],
                        ...dummyNewDiff[root]
                    };
                    // Update only those that value changed
                    //if (!_.isEqual(_.get(dummyOldDiff, property.split('.')), _.get(dummyNewDiff, property.split('.')))) {
                        //FIXME it now only updates the child property, but the root too
                        //this.dbRef().update(<FirebaseOperation>_item.key,_.set({}, property.split('.'), value));
                        // @ts-ignore
                    this.dbRef().update(<FirebaseOperation>_item.key,{ [root]: {...merged} });
                    //}
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

    deleteAll(): void {
        this.dbRef().remove();
    }
}

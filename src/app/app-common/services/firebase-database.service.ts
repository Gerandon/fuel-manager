import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

@Injectable({
    providedIn: 'root'
})
export class FirebaseDatabaseService {

    private dbPath!: string;
    private tutorialsRef!: AngularFireList<any>;

    constructor(private db: AngularFireDatabase) {
        this.dbPath = `test`;
        this.tutorialsRef = this.db.list(this.dbPath);
    }

    getAll(): AngularFireList<any> {
        return this.tutorialsRef;
    }

    create(tutorial: any): any {
        return this.tutorialsRef.push(tutorial);
    }

    update(key: string, value: any): Promise<void> {
        return this.tutorialsRef.update(key, value);
    }

    delete(key: string): Promise<void> {
        return this.tutorialsRef.remove(key);
    }

    deleteAll(): Promise<void> {
        return this.tutorialsRef.remove();
    }
}

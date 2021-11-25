export interface UserType {
    username: string;
    password: string;
}

export interface BaseType {
    id: string;
    creationDate: Date;
    modificationDate?: Date;
}

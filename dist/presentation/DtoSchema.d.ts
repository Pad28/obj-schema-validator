import { Schema, DynamicObject, SchemaValues } from "../domain";
export declare abstract class DtoSchema {
    abstract readonly schema: Schema;
    constructor();
    create(data: DynamicObject): [string?, DynamicObject?];
    get getValues(): SchemaValues<Schema>;
}

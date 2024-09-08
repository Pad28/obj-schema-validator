import { Schema, DynamicObject } from "../domain";
export declare abstract class DtoSchema {
    abstract readonly schema: Schema;
    constructor();
    create(data: DynamicObject): [string?, DynamicObject?];
    get values(): {
        [K in keyof this['schema']]: this['schema'][K]['value'];
    };
}

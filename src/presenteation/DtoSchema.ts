import { Schema, DynamicObject, ValidationDtoResult } from "../domain";
import { Validators } from "./Validators";
export abstract class DtoSchema {

    abstract readonly schema: Schema;
    constructor() { }

    create(data: DynamicObject): [string?, DynamicObject?] {
        try {
            const validators = new Validators(data, this.schema);
            validators.validateSchema();
            return [undefined, validators.getValues];
        } catch (error) {
            return [error as string];
        }
    }

    get values(): { [K in keyof this['schema']]: this['schema'][K]['value'] } {
        const obj: DynamicObject = {};
        for (const k in this.schema) {
            if (this.schema[k].value) obj[k] = this.schema[k].value;
        }
        return obj as { [K in keyof this['schema']]: this['schema'][K]['value'] };
    }
}
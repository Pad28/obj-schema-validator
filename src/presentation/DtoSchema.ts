import { Schema, DynamicObject, SchemaValues } from "../domain";
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

    get getValues(): SchemaValues<Schema> {
        const obj: DynamicObject = {};
        for (const k in this.schema) {
            const { value } = this.schema[k];
            if (value !== undefined) obj[k] = value;
        }
        return obj as SchemaValues<Schema>;
    }
}
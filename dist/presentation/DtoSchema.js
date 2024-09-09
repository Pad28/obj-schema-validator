"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoSchema = void 0;
const Validators_1 = require("./Validators");
class DtoSchema {
    constructor() { }
    create(data) {
        try {
            const validators = new Validators_1.Validators(data, this.schema);
            validators.validateSchema();
            return [undefined, validators.getValues];
        }
        catch (error) {
            return [error];
        }
    }
    get values() {
        const obj = {};
        for (const k in this.schema) {
            if (this.schema[k].value)
                obj[k] = this.schema[k].value;
        }
        return obj;
    }
}
exports.DtoSchema = DtoSchema;
//# sourceMappingURL=DtoSchema.js.map
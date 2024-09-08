import { Schema, DynamicObject, SchemaValues } from "../domain";
export declare class Validators<T extends Schema> {
    private readonly data;
    private readonly schema;
    private validators;
    constructor(data: DynamicObject, schema: T);
    validateSchema(): void;
    isRequired(key: string): void;
    private assignValueToScheme;
    get getValues(): SchemaValues<T>;
    get getSchema(): T;
    get getCurrentDateTime(): string;
    private isExisting;
    isUIID(key: string): void;
    isNumber(key: string): void;
    isFloat(key: string): void;
    isBoolean(key: string): void;
    isString(key: string): void;
    isDate(key: string): void;
    isEmail(key: string): void;
    toTitleCase(key: string): void;
    includes(key: string, array: any[]): void;
    toUpperCase(key: string): void;
    toLowerCase(key: string): void;
    checkPattern(key: string, pattern: RegExp): void;
}

export type SchemaType =
    | "string"
    | "number"
    | "boolean"
    | "float"
    | "email"
    | "uuid"
    | "Date";

export type SchemaOptions = {
    toTitleCase?: boolean,
    toUpperCase?: boolean,
    toLowerCase?: boolean,
    isEmail?: boolean,
    includes?: { check: true, list: Array<any> },
    checkPattern?: { check: true, regExp: RegExp },
}

export type Schema = {
    [key: string]: {
        required: boolean,
        type: SchemaType,
        value?: any,
        options?: SchemaOptions,
    };
}

export type SchemaValues<T extends Schema> = {
    [k in keyof T]: T[k]["value"]
}
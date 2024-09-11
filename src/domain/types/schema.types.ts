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
    includes?: Array<any>,
    checkPattern?: RegExp,
    isLength?: number,
    minLength?: number,
    maxLength?: number,
    minimunValue?: number,
    maximunValue?: number,
}

export type OptionsForType<T extends SchemaType> =
    T extends "string"
    ? {
        toTitleCase?: boolean;
        toUpperCase?: boolean;
        toLowerCase?: boolean;
        isEmail?: boolean;
        includes?: any[];
        checkPattern?: RegExp;
        isLength?: number;
        minLength?: number;
        maxLength?: number;
    }
    : T extends "number" | "float" ? {
        minimunValue?: number;
        maximunValue?: number;
    } : {};

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
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
    isLength?: { check: true, length: number },
    minLength?: { check: true, length: number },
    maxLength?: { check: true, length: number },
    minimunValue?: { check: true, value: number },
    maximunValue?: { check: true, value: number },
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
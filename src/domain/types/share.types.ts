import { DtoSchema } from "../../presenteation/DtoSchema";
import { Schema, SchemaValues } from "./schema.types";

export type DynamicObject = { [key: string]: any };

export type ValidationDtoResult<T extends Schema> =
    | [undefined, SchemaValues<T>]
    | [string, undefined];
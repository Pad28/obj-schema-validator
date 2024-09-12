import { SchemaType, Schema, DynamicObject, SchemaValues, SchemaOptions } from "../domain";

export class Validators<T extends Schema> {

    private validators: Record<SchemaType, (key: string) => void>;
    constructor(
        private readonly data: DynamicObject,
        private readonly schema: T,
    ) {

        this.validators = {
            // "Date": key => this.isDate(key),
            "Date": this.isDate.bind(this),
            "email": this.isEmail.bind(this),
            "float": this.isFloat.bind(this),
            "number": this.isNumber.bind(this),
            "string": this.isString.bind(this),
            "uuid": this.isUIID.bind(this),
            "boolean": this.isBoolean.bind(this),
        };

    }

    public validateSchema() {
        Object.keys(this.schema).forEach(key => {
            this.isRequired(key);

            const validator = this.validators[this.schema[key].type];
            validator(key);

            const { options } = this.schema[key];
            if (options) {
                const applyOption = (optionName: keyof SchemaOptions, handler: Function) => {
                    if (options[optionName]) handler(key, options[optionName]);
                };

                applyOption("toTitleCase", this.toTitleCase.bind(this));
                applyOption("toUpperCase", this.toUpperCase.bind(this));
                applyOption("toLowerCase", this.toLowerCase.bind(this));
                applyOption("isEmail", this.isEmail.bind(this));
                applyOption("checkPattern", (key: string, pattern: RegExp) => this.checkPattern(key, pattern));
                applyOption("includes", (key: string, array: any[]) => this.includes(key, array));
                applyOption("isLength", (key: string, length: number) => this.islength(key, length));
                applyOption("minLength", (key: string, length: number) => this.minLength(key, length));
                applyOption("maxLength", (key: string, length: number) => this.maxLength(key, length));
                applyOption("minimunValue", (key: string, value: number) => this.minimunValue(key, value));
                applyOption("maximunValue", (key: string, value: number) => this.maximunValue(key, value));
            }

            this.assignValueToScheme(key);
        });
    }

    public isRequired(key: string) {
        const schemaValue = this.schema[key];
        const dataValue = this.data[key];
        if (dataValue == undefined && schemaValue.required) throw `${key} is missing`;
    }

    private assignValueToScheme(key: string) {
        this.schema[key].value = this.data[key];
    }

    get getValues(): SchemaValues<T> {
        const obj: DynamicObject = {};
        for (const k in this.schema) {
            const { value } = this.schema[k];
            if (value !== undefined) obj[k] = value;
        }
        return obj as SchemaValues<T>;
    }

    public get getSchema() {
        return this.schema;
    }

    public get getCurrentDateTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    }

    private isExisting(key: string): boolean {
        return (this.data[key] !== undefined);
    }

    public isUIID(key: string) {
        if (!this.isExisting(key)) return;
        const regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!regExp.test(this.data[key])) throw `${key} is not a valid UUID`;
    }

    public isNumber(key: string) {
        if (!this.isExisting(key)) return;
        const num = parseInt(this.data[key]);
        if (isNaN(num)) throw `${key} is not a valid number`;
        this.data[key] = num;
    }

    public isFloat(key: string) {
        if (!this.isExisting(key)) return;
        const num = parseFloat(this.data[key]);
        if (isNaN(num)) throw `${key} is not a valid float`;
        this.data[key] = num;
    }

    public isBoolean(key: string) {
        if (!this.isExisting(key)) return;
        const dataValue = String(this.data[key]);
        if (!["true", "false"].includes(dataValue)) throw `${key} is not a valid boolean`;
        this.data[key] = (dataValue == "true");
    }

    public isString(key: string) {
        if (!this.isExisting(key)) return;
        if (typeof this.data[key] !== "string") throw `${key} is not a valid string`;
        this.data[key] = this.data[key] as string;
    }

    public isDate(key: string) {
        if (!this.isExisting(key)) return;
        const newDate = new Date(this.data[key]);
        if (newDate.toString() === 'Invalid Date') throw `${key} is not a valid Date`;
        this.data[key] = newDate;
    }

    public isEmail(key: string) {
        if (!this.isExisting(key)) return;
        const regExp = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regExp.test(this.data[key])) throw `${key} is not a valid email`;
    }


    public toTitleCase(key: string) {
        if (!this.isExisting(key)) return;
        const str = (this.data[key] as string)
            .toLocaleLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
            .trim();
        this.data[key] = str;
    }

    public includes(key: string, array: any[]) {
        if (!this.isExisting(key)) return
        if (!array.includes(this.data[key])) throw `${key} is not included in [${array}]`;
    }

    public toUpperCase(key: string) {
        if (!this.isExisting(key)) return;
        this.data[key] = (this.data[key] as string).toUpperCase();
    }

    public toLowerCase(key: string) {
        if (!this.isExisting(key)) return;
        this.data[key] = (this.data[key] as string).toLocaleLowerCase();
    }

    public checkPattern(key: string, pattern: RegExp) {
        if (!this.isExisting(key)) return;
        if (!pattern.test(this.data[key])) throw `${key} is not valid`;
    }

    public islength(key: string, length: number) {
        if (!this.isExisting(key)) return;
        this.isString(key);
        if (this.data[key].length !== length) throw `The length of the ${key} must be ${length}`;
    }

    public minLength(key: string, length: number) {
        if (!this.isExisting(key)) return;
        this.isString(key);
        if (this.data[key].length < length) throw `The minimun length of the ${key} must be ${length}`;
    }

    public maxLength(key: string, length: number) {
        if (!this.isExisting(key)) return;
        this.isString(key);
        if (this.data[key].length > length) throw `The maximun length of the ${key} must be ${length}`;
    }

    public minimunValue(key: string, value: number) {
        if (!this.isExisting(key)) return;

        (this.schema[key].type === "number")
            ? this.isNumber(key)
            : this.isFloat(key);

        if (this.data[key] < value) throw `The minimun value of the ${key} must be ${value}`;
    }

    public maximunValue(key: string, value: number) {
        if (!this.isExisting(key)) return;

        (this.schema[key].type === "number")
            ? this.isNumber(key)
            : this.isFloat(key);

        if (this.data[key] < value) throw `The maximun value of the ${key} must be ${value}`;
    }

}
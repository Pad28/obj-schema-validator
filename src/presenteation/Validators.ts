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
            "boolean": () => { },
        };
    }

    public validateSchema() {
        Object.keys(this.schema).forEach(k => {
            if (!this.data[k] && this.schema[k].required) throw `${k} is missing`;
            const validator = this.validators[this.schema[k].type];
            validator(k);

            if (this.schema[k].options) {
                const { options } = this.schema[k];
                (options.toTitleCase) && this.toTitleCase(k);
                (options.toLowerCase) && this.toLowerCase(k);
                (options.toUpperCase) && this.toUpperCase(k);

                (options.checkPattern && options.checkPattern.check)
                    && this.checkPattern(k, options.checkPattern.regExp);

                (options.includes && options.includes.check)
                    && this.includes(k, options.includes.list);
            }

            this.assignValueToScheme(k);
        });
    }

    public isRequired(key: string) {
        if (!this.data[key] && this.schema[key].required) throw `${key} is missing`;
    }

    private assignValueToScheme(key: string) {
        this.schema[key].value = this.data[key];
    }

    get getValues(): SchemaValues<T> {
        const obj: DynamicObject = {};
        for (const k in this.schema) {

            if (this.schema[k].value) obj[k] = this.schema[k].value;
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
        return (!this.data[key]) as boolean;
    }

    public isEmail(key: string) {
        if (this.isExisting(key)) return;
        const regExp = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regExp.test(this.data[key])) throw `${key} is not a valid email`;
    }

    public isUIID(key: string) {
        if (this.isExisting(key)) return;
        const regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!regExp.test(this.data[key])) throw `${key} is not a valid UUID`;
    }

    public isNumber(key: string) {
        if (this.isExisting(key)) return;
        if (isNaN(Number(this.data[key]))) throw `${key} is not a valid number`;
        this.data[key] = parseInt(this.data[key]);
    }

    public isFloat(key: string) {
        if (this.isExisting(key)) return;
        const num = parseFloat(this.data[key]);
        if (isNaN(num)) throw `${key} is not a valid float`;
        this.data[key] = num;
    }

    public isBoolean(key: string) {
        if (this.isExisting(key)) return;
        if (typeof this.data[key] !== 'boolean') throw `${key} is not a valid boolean`;
    }

    public isString(key: string) {
        if (this.isExisting(key)) return;
        if (typeof this.data[key] !== "string") throw `${key} is not a valid string`;
        this.data[key] = this.data[key] as string;
    }

    public isDate(key: string) {
        if (this.isExisting(key)) return;
        const newDate = new Date(this.data[key]);
        if (newDate.toString() === 'Invalid Date') throw `${key} is not a valid Date`;
        this.data[key] = newDate;
    }

    public toTitleCase(key: string) {
        if (this.isExisting(key)) return;
        const str = (this.data[key] as string)
            .toLocaleLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
            .trim();
        this.data[key] = str;
    }

    public includes(key: string, array: any[]) {
        if (this.isExisting(key)) return
        if (!array.includes(this.data[key])) throw `${key} is not included in [${array}]`;
    }

    public toUpperCase(key: string) {
        if (this.isExisting(key)) return;
        this.data[key] = (this.data[key] as string).toUpperCase();
    }

    public toLowerCase(key: string) {
        if (this.isExisting(key)) return;
        this.data[key] = (this.data[key] as string).toLocaleLowerCase();
    }

    public checkPattern(key: string, pattern: RegExp) {
        if (this.isExisting(key)) return;
        if (!pattern.test(this.data[key])) throw `${key} is not valid`;
    }
}
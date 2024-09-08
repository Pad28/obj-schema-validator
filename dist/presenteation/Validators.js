"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    constructor(data, schema) {
        this.data = data;
        this.schema = schema;
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
    validateSchema() {
        Object.keys(this.schema).forEach(k => {
            if (!this.data[k] && this.schema[k].required)
                throw `${k} is missing`;
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
    isRequired(key) {
        if (!this.data[key] && this.schema[key].required)
            throw `${key} is missing`;
    }
    assignValueToScheme(key) {
        this.schema[key].value = this.data[key];
    }
    get getValues() {
        const obj = {};
        for (const k in this.schema) {
            if (this.schema[k].value)
                obj[k] = this.schema[k].value;
        }
        return obj;
    }
    get getSchema() {
        return this.schema;
    }
    get getCurrentDateTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    }
    isExisting(key) {
        return (!this.data[key]);
    }
    isEmail(key) {
        if (this.isExisting(key))
            return;
        const regExp = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regExp.test(this.data[key]))
            throw `${key} is not a valid email`;
    }
    isUIID(key) {
        if (this.isExisting(key))
            return;
        const regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!regExp.test(this.data[key]))
            throw `${key} is not a valid UUID`;
    }
    isNumber(key) {
        if (this.isExisting(key))
            return;
        if (isNaN(Number(this.data[key])))
            throw `${key} is not a valid number`;
        this.data[key] = parseInt(this.data[key]);
    }
    isFloat(key) {
        if (this.isExisting(key))
            return;
        const num = parseFloat(this.data[key]);
        if (isNaN(num))
            throw `${key} is not a valid float`;
        this.data[key] = num;
    }
    isBoolean(key) {
        if (this.isExisting(key))
            return;
        if (typeof this.data[key] !== 'boolean')
            throw `${key} is not a valid boolean`;
    }
    isString(key) {
        if (this.isExisting(key))
            return;
        if (typeof this.data[key] !== "string")
            throw `${key} is not a valid string`;
        this.data[key] = this.data[key];
    }
    isDate(key) {
        if (this.isExisting(key))
            return;
        const newDate = new Date(this.data[key]);
        if (newDate.toString() === 'Invalid Date')
            throw `${key} is not a valid Date`;
        this.data[key] = newDate;
    }
    toTitleCase(key) {
        if (this.isExisting(key))
            return;
        const str = this.data[key]
            .toLocaleLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
            .trim();
        this.data[key] = str;
    }
    includes(key, array) {
        if (this.isExisting(key))
            return;
        if (!array.includes(this.data[key]))
            throw `${key} is not included in [${array}]`;
    }
    toUpperCase(key) {
        if (this.isExisting(key))
            return;
        this.data[key] = this.data[key].toUpperCase();
    }
    toLowerCase(key) {
        if (this.isExisting(key))
            return;
        this.data[key] = this.data[key].toLocaleLowerCase();
    }
    checkPattern(key, pattern) {
        if (this.isExisting(key))
            return;
        if (!pattern.test(this.data[key]))
            throw `${key} is not valid`;
    }
}
exports.Validators = Validators;
//# sourceMappingURL=Validators.js.map
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
            "boolean": this.isBoolean.bind(this),
        };
    }
    validateSchema() {
        Object.keys(this.schema).forEach(key => {
            this.isRequired(key);
            const validator = this.validators[this.schema[key].type];
            validator(key);
            const { options } = this.schema[key];
            if (options) {
                const applyOption = (optionName, handler) => {
                    if (options[optionName])
                        handler(key, options[optionName]);
                };
                applyOption("toTitleCase", this.toTitleCase.bind(this));
                applyOption("toUpperCase", this.toUpperCase.bind(this));
                applyOption("toLowerCase", this.toLowerCase.bind(this));
                applyOption("isEmail", this.isEmail.bind(this));
                applyOption("checkPattern", (key, pattern) => this.checkPattern(key, pattern));
                applyOption("includes", (key, array) => this.includes(key, array));
                applyOption("isLength", (key, length) => this.islength(key, length));
                applyOption("minLength", (key, length) => this.minLength(key, length));
                applyOption("maxLength", (key, length) => this.maxLength(key, length));
                applyOption("minimunValue", (key, value) => this.minimunValue(key, value));
                applyOption("maximunValue", (key, value) => this.maximunValue(key, value));
            }
            this.assignValueToScheme(key);
        });
    }
    isRequired(key) {
        const schemaValue = this.schema[key];
        const dataValue = this.data[key];
        if (dataValue == undefined && schemaValue.required)
            throw `${key} is missing`;
    }
    assignValueToScheme(key) {
        this.schema[key].value = this.data[key];
    }
    get getValues() {
        const obj = {};
        for (const k in this.schema) {
            const { value } = this.schema[k];
            if (value !== undefined)
                obj[k] = value;
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
        return (this.data[key] !== undefined);
    }
    isUIID(key) {
        if (!this.isExisting(key))
            return;
        const regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!regExp.test(this.data[key]))
            throw `${key} is not a valid UUID`;
    }
    isNumber(key) {
        if (!this.isExisting(key))
            return;
        const num = parseInt(this.data[key]);
        if (isNaN(num))
            throw `${key} is not a valid number`;
        this.data[key] = num;
    }
    isFloat(key) {
        if (!this.isExisting(key))
            return;
        const num = parseFloat(this.data[key]);
        if (isNaN(num))
            throw `${key} is not a valid float`;
        this.data[key] = num;
    }
    isBoolean(key) {
        if (!this.isExisting(key))
            return;
        const dataValue = String(this.data[key]);
        if (!["true", "false"].includes(dataValue))
            throw `${key} is not a valid boolean`;
        this.data[key] = (dataValue == "true");
    }
    isString(key) {
        if (!this.isExisting(key))
            return;
        if (typeof this.data[key] !== "string")
            throw `${key} is not a valid string`;
        this.data[key] = this.data[key];
    }
    isDate(key) {
        if (!this.isExisting(key))
            return;
        const newDate = new Date(this.data[key]);
        if (newDate.toString() === 'Invalid Date')
            throw `${key} is not a valid Date`;
        this.data[key] = newDate;
    }
    isEmail(key) {
        if (!this.isExisting(key))
            return;
        const regExp = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regExp.test(this.data[key]))
            throw `${key} is not a valid email`;
    }
    toTitleCase(key) {
        if (!this.isExisting(key))
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
        if (!this.isExisting(key))
            return;
        if (!array.includes(this.data[key]))
            throw `${key} is not included in [${array}]`;
    }
    toUpperCase(key) {
        if (!this.isExisting(key))
            return;
        this.data[key] = this.data[key].toUpperCase();
    }
    toLowerCase(key) {
        if (!this.isExisting(key))
            return;
        this.data[key] = this.data[key].toLocaleLowerCase();
    }
    checkPattern(key, pattern) {
        if (!this.isExisting(key))
            return;
        if (!pattern.test(this.data[key]))
            throw `${key} is not valid`;
    }
    islength(key, length) {
        if (!this.isExisting(key))
            return;
        this.isString(key);
        if (this.data[key].length !== length)
            throw `The length of the ${key} must be ${length}`;
    }
    minLength(key, length) {
        if (!this.isExisting(key))
            return;
        this.isString(key);
        if (this.data[key].length < length)
            throw `The minimun length of the ${key} must be ${length}`;
    }
    maxLength(key, length) {
        if (!this.isExisting(key))
            return;
        this.isString(key);
        if (this.data[key].length > length)
            throw `The maximun length of the ${key} must be ${length}`;
    }
    minimunValue(key, value) {
        if (!this.isExisting(key))
            return;
        (this.schema[key].type === "number")
            ? this.isNumber(key)
            : this.isFloat(key);
        if (this.data[key] < value)
            throw `The minimun value of the ${key} must be ${value}`;
    }
    maximunValue(key, value) {
        if (!this.isExisting(key))
            return;
        (this.schema[key].type === "number")
            ? this.isNumber(key)
            : this.isFloat(key);
        if (this.data[key] < value)
            throw `The maximun value of the ${key} must be ${value}`;
    }
}
exports.Validators = Validators;
//# sourceMappingURL=Validators.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const DtoSchema_1 = require("../../presentation/DtoSchema");
class UserDto extends DtoSchema_1.DtoSchema {
    constructor() {
        super(...arguments);
        this.schema = {
            name: {
                required: true,
                type: "string",
                options: {
                    toTitleCase: true,
                }
            },
            email: {
                required: true,
                type: "string",
                options: {
                    toLowerCase: true,
                    isEmail: true,
                }
            },
            age: {
                required: false,
                type: "float",
                options: {
                    minimunValue: 5
                }
            },
            city: {
                required: true,
                type: "string",
                options: {
                    includes: ["Mexico", "Queretaro"] // indicate the list of allowed values 
                }
            },
            verify: {
                required: false,
                type: "boolean"
            }
        };
    }
}
const main = () => {
    try {
        const data = {
            name: "test lastname",
            age: 5.12,
            email: "tEst@tesT.coM",
            password: "test",
            city: "Mexico",
            addres: "test address",
            verify: "true",
        };
        const [error, result] = new UserDto().create(data);
        if (error || !result)
            return console.log(error);
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }
};
exports.main = main;
//# sourceMappingURL=test.js.map
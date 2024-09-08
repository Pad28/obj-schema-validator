"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const DtoSchema_1 = require("../../presenteation/DtoSchema");
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
                type: "string",
                options: {
                    checkPattern: {
                        check: true, // indicate that this option is active
                        regExp: /^\d+$/ // indicate the regular expression to evaluate
                    },
                }
            },
            city: {
                required: true,
                type: "string",
                options: {
                    includes: {
                        check: true, // indicate that this option is active
                        list: ["Mexico", "Queretaro"] // indicate the list of allowed values 
                    }
                }
            },
        };
    }
}
const main = () => {
    try {
        const data = {
            name: "test lastname",
            age: "5",
            email: "test@test.com",
            password: "test",
            city: "Mexico",
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
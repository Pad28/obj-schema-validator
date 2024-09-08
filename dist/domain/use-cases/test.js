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
            age: {
                required: false,
                type: "number"
            },
            city: {
                required: true,
                type: "string",
                options: {
                    includes: { check: true, list: ["Mexico", "Queretaro"] }
                }
            }
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
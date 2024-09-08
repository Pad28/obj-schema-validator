import { DtoSchema } from "../../presenteation/DtoSchema";
import { Schema } from "../types";

class UserDto extends DtoSchema {
    schema: Schema = {
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

export const main = () => {
    try {
        const data = {
            name: "test lastname",
            age: "5",
            email: "test@test.com",
            password: "test",
            city: "Mexico",
        }

        const [error, result] = new UserDto().create(data);
        if (error || !result) return console.log(error);
        console.log(result);


    } catch (error) {
        console.log(error);

    }
}
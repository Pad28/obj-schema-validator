import { DtoSchema } from "../../presentation/DtoSchema";
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

export const main = () => {
    try {
        const data = {
            name: "test lastname",
            age: "5",
            email: "tEst@tesT.com",
            password: "test",
            city: "Mexico",
            addres: "test address"
        }

        const [error, result] = new UserDto().create(data);
        if (error || !result) return console.log(error);
        console.log(result);


    } catch (error) {
        console.log(error);
    }
}
# Obj-schema-validator

## Intalling
**Using npm:** <br/>
```bash
$ npm install obj-schema-validator
```

Once the package is installed, you can import the library using the import or require approach:

```js
import { DtoSchema, Schema } from "obj-schema-validator";
```

Later you must define a schema for the use of a dto, this by declaring a class that extends the DtoSchema class, you must implement the **schema** attribute of type Schema.
```js
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
            type: "number",
        },
        city: {
            required: true,
            type: "string",
            options: {
                includes: { check: true, list: ["CDMX", "Queretaro"] }
            }
        }

    };

}
```
The schema attribute is a hashmap where each key is an object in which it is declared whether it is required, the type, and as optional values ​​its initial value and an options object.
```js
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
                    list: ["CDMX", "Queretaro"] // indicate the list of allowed values 
                }
            }
        },
    };
```
You can use the **create** method of your dto to carry out the validations, this method returns an array with two positions, the first being the error and the second being the values ​​already validated.
```js
const data = {
    name: "test lastname",
    age: "5",
    email: "test@test.com",
    password: "test",
    city: "CDMX",
}

const [error, result] = new UserDto().create(data);
```

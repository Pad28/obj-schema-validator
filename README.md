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
                includes:  ["CDMX", "Queretaro"]
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
            type: "number",
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
    };
```
The options object has these optional values
```ts
type options = {
    toTitleCase: boolean, 
    // Converts the string to "Title Case", that is, capitalizes the first letter of each word and lowercases the rest.

    toUpperCase: boolean,
    // Converts the entire string to uppercase.

    toLowerCase: boolean,
    // Converts the entire string to lowercase
    
    isEmail: boolean,
    // Checks if the string is a valid email using a standard regular expression for validating emails

    includes: Array<any>,
    // Checks if the string is within the array of provided values.

    checkPattern: RegExp,
    // Check if the string matches the provided pattern (regular expression).
    
    isLength: number,
    // Checks if the length of the string is exactly equal to the provided number.
    
    minLength: number,
    // Checks if the length of the string is greater than or equal to the provided number.

    maxLength: number,
    // Checks if the length of the string is less than or equal to the provided number.

    minimunValue: number,
    // Checks if the numeric value of the string is greater than or equal to the provided number.
        
    maximunValue: number,
    // Checks if the numeric value of the string is less than or equal to the provided number.
}

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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aux = void 0;
exports.isTest = isTest;
;
exports.aux = {
    user: "test",
    password: "12345",
};
function isTest(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        typeof obj.user === 'string' &&
        typeof obj.password === 'string');
}
//# sourceMappingURL=app.js.map
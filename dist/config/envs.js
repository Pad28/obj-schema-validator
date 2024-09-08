"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    DEV: (0, env_var_1.get)("DEV").default("false").asBool(),
};
//# sourceMappingURL=envs.js.map
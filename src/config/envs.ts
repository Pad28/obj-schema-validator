import "dotenv/config";
import { get } from "env-var";

export const envs = {
    DEV: get("DEV").default("false").asBool(),
}
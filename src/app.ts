import { envs } from "./config/envs";
import { main } from "./domain";

export * from "./domain/types";
export * from "./presentation/Validators";
export * from "./presentation/DtoSchema";

(() => {
    if (!envs.DEV) return;
    main();
})();
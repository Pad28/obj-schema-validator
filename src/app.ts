import { envs } from "./config/envs";
import { main } from "./domain";

export * from "./domain/types";
export * from "./presenteation/Validators";
export * from "./presenteation/DtoSchema";


(() => {
    if (!envs.DEV) return;
    main();
})();
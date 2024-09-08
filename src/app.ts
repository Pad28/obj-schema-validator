import { envs } from "./config/envs";
import { main } from "./domain";

export * from "./domain/types/share.types";
export * from "./presenteation/Validators";
export * from "./presenteation/Validators";


(() => {
    if (!envs.DEV) return;
    main();
})();
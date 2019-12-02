import { startServer } from "./server";
import { syncDB } from "./odm";

async function appStart() {
    await syncDB();
    startServer();
}

appStart();

import { createFlow } from "@builderbot/bot";
import { mainFlow } from "./mainFlow"; // Importa mainFlow y flowA

export default createFlow([
    mainFlow
]);
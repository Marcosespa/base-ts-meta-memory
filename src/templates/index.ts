import { createFlow } from "@builderbot/bot";
import { mainFlow, flowAdministrativos, flowCarga } from "./mainFlow"; // Importamos todos los flujos

export default createFlow([
    mainFlow,
    flowAdministrativos,
    flowCarga,
]);
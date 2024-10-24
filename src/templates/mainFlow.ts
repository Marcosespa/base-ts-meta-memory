import { addKeyword, createFlow, EVENTS } from "@builderbot/bot";
import { createBot, createProvider, utils } from '@builderbot/bot';
import { MetaProvider as Provider } from '@builderbot/provider-meta';
import { addKeyword, addAction } from '@builderbot/bot';

const userDecisions = {
  name: '',
  decision1: '',
  name1: '',
};

const flowCarga = addKeyword(EVENTS.ACTION)
  .addAnswer('Gracias por escogernos para buscar Carga 🚛')

  .addAnswer("Por favor, comparte tu ubicación:", {
    requestLocation: true,
    capture: true
  }, async (ctx, { state }) => {
    const userLocation = ctx.location;
    // Log de respuestas del usuario
    const responseName = state.userName;
    const numberFrom = ctx.from;
    console.log("Nombre ingresado:", userDecisions.name);
    console.log("Número de teléfono del usuario:", numberFrom);
    console.log("Ciudad seleccionada:", state.selectedCity);
    console.log("Ubicación del usuario:", userLocation);
    console.log("Otras propiedades:", ctx);
  });


  

// Flujos administrativos
const flowAdministrativos = addKeyword(EVENTS.ACTION)
  .addAnswer('LA DECISION DE FLUJOS ADMINISTRATIVOS ACA');
  
const mainFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer('🚚 ¡Hola! Bienvenido a Rutix, queremos integrar la logística en Colombia')

  .addAction(async (_, { flowDynamic }): Promise<void> => {
    await flowDynamic('Cuál es tu nombre?');
  })

  .addAction({ capture: true }, async (ctx, { flowDynamic, state }): Promise<void> => {
    userDecisions.name = ctx.body; // Guardamos la decisión del usuario en name
    await state.update({ name: ctx.body });
    await flowDynamic(`El nombre es: ${ctx.body}`);
  })

  .addAnswer("¿Te interesan Buscar Carga o procesos administrativos con Rutix?", {
    buttons: [
      { body: "Buscar Carga 🚚" },
      { body: "Administrativos 🖥️" }
    ],
    capture: true
  }, async (ctx, { state, gotoFlow }) => {
    const answer = ctx.body.toLowerCase();
    if (answer.includes("buscar carga")) {
      state.available = true;
      return gotoFlow(flowCarga);
    } else if (answer.includes("administrativos")) {
      return gotoFlow(flowAdministrativos);
    } else {
      return gotoFlow(mainFlow);
    }
  });

// Exportaciones
export { mainFlow, flowCarga, flowAdministrativos };

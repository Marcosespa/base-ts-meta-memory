import { addKeyword, createFlow, EVENTS } from "@builderbot/bot";
import { createBot, createProvider, createFlow, addKeyword, utils } from '@builderbot/bot'
import { MetaProvider as Provider } from '@builderbot/provider-meta'

const decision = '';  // Se usa const ya que no se reasigna
let ciudadActual = '';  // Sigue siendo let porque puede cambiar más adelante
const tipoVehiculo = '';  // Se usa const ya que no se reasigna
const verificacionActual = '';  // Se usa const ya que no se reasigna

// Flujos

const flowCarga = addKeyword(EVENTS.ACTION)
  .addAnswer('Gracias por escogernos para buscar Carga 🚛')
  .addAnswer("Selecciona tu ciudad:", {
    buttons: [
      { body: "Cali" },
      { body: "Bogotá" },
      { body: "Medellín" }
    ],
    capture: true
  }, async (ctx, { flowDynamic }) => {
    ciudadActual = ctx.body;
    await flowDynamic([`Has seleccionado: ${ciudadActual}.`]); // Asegura que el flujo continúe
  })
  .addAnswer("¿Cuál es el tipo de carro?", {
    buttons: [
      { body: "Turbo" },
      { body: "Sencillo" },
      { body: "Doble Troque" },
      { body: "Patineta" },
      { body: "Mula" }
    ],
    capture: true
  }, async (ctx, { state, flowDynamic }) => {
    const carType = ctx.body;
    if (["Turbo", "Sencillo", "Doble Troque", "Patineta", "Mula"].includes(carType)) {
      state.carType = carType;
      await flowDynamic([`Has seleccionado: ${carType}.`]);
    } else {
      await flowDynamic([`Por favor selecciona un tipo de carro válido.`]);
    }
  })
  .addAnswer("Por favor, comparte tu ubicación:", {
    requestLocation: true,
    capture: true
  }, async (ctx, { state, flowDynamic }) => {
    const userLocation = ctx.body.location || ctx.location;
    if (userLocation) {
      state.userLocation = userLocation;
      await flowDynamic([`Gracias por compartir tu ubicación.`]);
    } else {
      await flowDynamic([`Por favor comparte una ubicación válida.`]);
    }
  });




// Flujos administrativos
const flowAdministrativos = addKeyword(EVENTS.ACTION).addAnswer(' LA DECISION DE FLUJOS ADMINISTRATIVOS ACA');



const mainFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer('🚚 ¡Hola! Bienvenido a Rutix, queremos integrar la logística en Colombia')

  .addAnswer('¿Cuál es tu nombre?', { capture: true }, async (ctx, { flowDynamic }) => {
    await flowDynamic([`¡Genial, ${ctx.body}!`, '']);
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

import { addKeyword, createFlow, EVENTS } from "@builderbot/bot";

const mainFlow = addKeyword(EVENTS.WELCOME)
.addAnswer("👋 Hola, ¿cuál es tu nombre?", { capture: true }, async (ctx, { state }) => {
    // Captura del nombre del usuario
    state.userName = ctx.body;
  })
  .addAnswer("¿Estás disponible para cargar?", {
    buttons: [
      { body: "Sí" },
      { body: "No" }
    ],
    capture: true
  }, async (ctx, { state }) => {
    const answer = ctx.body.toLowerCase();
    if (answer === "Sí" || answer === "Si") {
      state.available = true;
    } else {
      return "Gracias, esperamos ayudarte en otro momento.";
    }
  })
  .addAnswer("Selecciona tu ciudad:", {
    buttons: [
      { body: "Cali" },
      { body: "Bogotá" },
      { body: "Medellín" }
    ],
    capture: true
  }, async (ctx, { state }) => {
    const selectedCity = ctx.body;
    state.selectedCity = selectedCity;
  })
  .addAnswer("Por favor, comparte tu ubicación:", {
    requestLocation: true,
    capture: true
  }, async (ctx, { state }) => {
    const userLocation = ctx.location;
    console.log(`Nombre: ${state.userName}, Disponible para cargar en: ${state.selectedCity}, Ubicación: ${userLocation}`);
    
    


    // Log de respuestas del usuario
    const responseName = state.userName;
    const numberFrom = ctx.from;
    console.log("Nombre ingresado:", responseName);
    console.log("Número de teléfono del usuario:", numberFrom);
    console.log("Ciudad seleccionada:", state.selectedCity);
    console.log("Ubicación del usuario:", userLocation);
    console.log("Otras propiedades:", ctx);
  });

// Exportaciones
export { mainFlow };

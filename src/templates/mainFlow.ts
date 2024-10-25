import { addKeyword, createFlow, EVENTS } from "@builderbot/bot";
import { createBot, createProvider, utils } from '@builderbot/bot';
import { MetaProvider as Provider } from '@builderbot/provider-meta';
import { addKeyword, addAction } from '@builderbot/bot';

const userDecisions = {
  name: '',
  lat: '',
  long: '',
  carType:'',
  peso:'',
  cubicaje:'',
  placa:'',
  hojaVida:'',
};

const userDecisionsAdmin = {
  name: '',
  decisionAdministrativa: '',
};

//Flujo Bogota
const flowBogota = addKeyword(EVENTS.ACTION)
  .addAnswer('Te ayudaré a compartiendote los contactos importantes de Bogota')
  .addAnswer('', null, async (ctx, { provider }) => {
    await provider.sendContacts(ctx.from, [
        {
            name: {
                formatted_name: 'Saldos Bogota',
                first_name: 'Saldos Bogota'
            },
            phones: [{
                phone: '+573147516693',
                type: 'CELL'
            }]
        }
    ])
  })
  .addAnswer('', null, async (ctx, { provider }) => {
  await provider.sendContacts(ctx.from, [
      {
          name: {
              formatted_name: 'Despachos Bogota',
              first_name: 'Despachos Bogota'
          },
          phones: [{
              phone: '+573147516693',
              type: 'CELL'
          }]
      }
  ])
  });



  //Flujo cali
const flowCali = addKeyword(EVENTS.ACTION)
    .addAnswer('Te ayudaré a compartiendote los contactos importantes de Cali')
    .addAnswer('', null, async (ctx, { provider }) => {
      await provider.sendContacts(ctx.from, [
          {
              name: {
                  formatted_name: 'Saldos Cali',
                  first_name: 'Saldos Cali'
              },
              phones: [{
                  phone: '+573147516693',
                  type: 'CELL'
              }]
          }
      ])
  })
  .addAnswer('', null, async (ctx, { provider }) => {
    await provider.sendContacts(ctx.from, [
        {
            name: {
                formatted_name: 'Despachos Cali',
                first_name: 'Despachos Cali'
            },
            phones: [{
                phone: '+573147516693',
                type: 'CELL'
            }]
        }
    ])
  });









const flowCarga = addKeyword(EVENTS.ACTION)
  .addAnswer('Gracias por escogernos para buscar Carga 🚛')

  // Ubicacion del vehiculo 
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
  })

  // Tipo de vehiculo 

  .addAction(async (ctx, { provider }) => {
        await provider.sendButtons(ctx.from, [
            { body: 'Turbo' },
            { body: 'Sencillo' },
            { body: 'Mula' }
        ], `Send Buttons Alternative`)

    })
    .addAction({ capture: true }, async (ctx, { flowDynamic, state }): Promise<void> => {
      userDecisions.carType = ctx.body; // Guardamos la decisión del usuario en name
      await state.update({ carType: ctx.body });
      await flowDynamic(`El tipo de carro que seleccionaste es : ${ctx.body}`);
      console.log("CARRO TIPO:", userDecisions.carType);
    })

    // Peso del vehiculo 
    .addAction(async (_, { flowDynamic }): Promise<void> => {
      await flowDynamic('Porfavor ingrese el peso en KG con el pasa su vehiculo?');
    })
  
    .addAction({ capture: true }, async (ctx, { flowDynamic, state }): Promise<void> => {
      userDecisions.peso = ctx.body; // Guardamos la decisión del usuario en name
      await state.update({ peso: ctx.body });
      await flowDynamic(`El peso es: ${ctx.body}`);
    })

    // Cubicaje del vehiculo 
    .addAction(async (_, { flowDynamic }): Promise<void> => {
      await flowDynamic('Porfavor ingrese el cubicaje en Metros cubicos de su vehiculo?');
    })
  
    .addAction({ capture: true }, async (ctx, { flowDynamic, state }): Promise<void> => {
      userDecisions.cubicaje = ctx.body; // Guardamos la decisión del usuario en name
      await state.update({ cubicaje: ctx.body });
      await flowDynamic(`El peso es: ${ctx.body}`);
    })

    // Placa del vehiculo 
    .addAction(async (_, { flowDynamic }): Promise<void> => {
      await flowDynamic('Porfavor ingrese la placa del vehiculo');
    })
  
    .addAction({ capture: true }, async (ctx, { flowDynamic, state }): Promise<void> => {
      userDecisions.placa = ctx.body; // Guardamos la decisión del usuario en name
      await state.update({ placa: ctx.body });
      await flowDynamic(`La placa es: ${ctx.body}`);
    })

    //Hoja de vida
    .addAnswer([
    'Cuentas con hoja de vida con nosotros?', 
    'Si no cuentas con una no te preocupes, te ayudaremos a hacerla '
    ])
    .addAction(async (ctx, { provider }) => {
      await provider.sendButtons(ctx.from, [
          { body: 'Si' },
          { body: 'No' }
        ], `Porfavor selecciona si cuentas con hoja de vida o no.`)

  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, state }): Promise<void> => {
    userDecisions.hojaVida = ctx.body; // Guardamos la decisión del usuario en name
    await state.update({ hojaVida: ctx.body });
    await flowDynamic(`El tipo de carro que seleccionaste es : ${ctx.body}`);
    console.log("HOJA DE VIDA :", userDecisions.hojaVida);
    console.log("Otras propiedades:", ctx);

  });







  // Flujos administrativos
  const flowAdministrativos = addKeyword(EVENTS.ACTION)
    .addAnswer('Bienvenido a la parte administrativa') // Elimina el punto innecesario aquí
  
    .addAnswer("¿Te interesan comunicarte con Cali o Bogotá?", {
      buttons: [
        { body: "Cali" },
        { body: "Bogota" }, // Elimina el espacio adicional
        { body: "Menu Principal" } // Elimina el espacio adicional
      ],
      capture: true
    }, async (ctx, { state, gotoFlow }) => {
      const answer = ctx.body.toLowerCase();
      if (answer === "cali") { // Compara directamente con la cadena 'cali'
        state.available = true;
        return gotoFlow(flowCali);
      } else if (answer === "bogota") { // Compara directamente con la cadena 'bogota'
        return gotoFlow(flowBogota);
      } else if (answer === "menu principal") { // Maneja el caso del menú principal
        return gotoFlow(mainFlow);
      }
    });
  



















  
const mainFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer('🚚 ¡Hola! Bienvenido a Rutix, queremos integrar la logística en Colombia')

  .addAction(async (_, { flowDynamic }): Promise<void> => {
    await flowDynamic('Cuál es tu nombre?');
  })

  .addAction({ capture: true }, async (ctx, { flowDynamic, state }): Promise<void> => {
    userDecisions.name = ctx.body; // Guardamos la decisión del usuario en name
    await state.update({ name: ctx.body });
    await flowDynamic(`Hola ${ctx.body} es un gusto tenerte con nosotros de nuevo 😊`);
  })

  .addAnswer("¿Te interesan buscar carga o procesos administrativos con Rutix?", {
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
export { mainFlow, flowCarga, flowAdministrativos,flowCali,flowBogota };

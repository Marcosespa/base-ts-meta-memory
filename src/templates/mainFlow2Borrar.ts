import { addKeyword, createFlow, EVENTS } from "@builderbot/bot";
import { createBot, createProvider, utils } from '@builderbot/bot';
import { MetaProvider as Provider } from '@builderbot/provider-meta';
import { addKeyword, addAction } from '@builderbot/bot';
const userDecisions = {
  name: '',
  name1: '',
};





const mainFlow = addKeyword(['Hello', 'Hi'])
  .addAction(async (_, { flowDynamic }): Promise<void> => {
    await flowDynamic('Hi! how can I help you?');
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, state }): Promise<void> => {
    userDecisions.name = ctx.body; // Guardamos la decisión del usuario en name
    await state.update({ name: ctx.body });
    await flowDynamic(`The user said: ${ctx.body}`);
  })
  .addAction(async (_, { flowDynamic }): Promise<void> => {
    await flowDynamic('Segundo Type');
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, state }): Promise<void> => {
    userDecisions.name1 = ctx.body; // Guardamos la decisión del usuario en name1
    await state.update({ name1: ctx.body });
    await flowDynamic(`The user said: ${ctx.body}`);
  })
  .addAction(async (_, { flowDynamic }): Promise<void> => {
    await flowDynamic('Tercero Type');
    await flowDynamic([{ 
      body: `message with 2 seconds delay`,
      delay: 2000 
     }])
    // Al final, imprimimos todas las decisiones del usuario
    console.log('Decisiones del usuario:', userDecisions);
  })





// Exportaciones
export { mainFlow };

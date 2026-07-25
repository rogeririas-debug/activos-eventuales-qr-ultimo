const activos = require('./activos.json');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  try {
    const { activoId, pregunta } = JSON.parse(event.body || '{}');
    const activo = activos[activoId];

    if (!activo) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Activo no encontrado' })
      };
    }

    const promptSistema = `Eres un asistente virtual de un banco en Honduras. Respondes preguntas de clientes SOLO sobre el siguiente activo eventual en venta. No inventes datos que no estén en esta ficha. Si te preguntan algo que no está en la ficha, responde amablemente que no tienes esa información y sugiere contactar a la sucursal. Responde siempre en español, breve y claro.

Ficha del activo:
${JSON.stringify(activo, null, 2)}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: promptSistema },
          { role: "user", content: pregunta }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error?.message || 'Error al llamar a la API de OpenAI' })
      };
    }

    const respuestaIA = data.choices?.[0]?.message?.content || "Sin respuesta";

    return {
      statusCode: 200,
      body: JSON.stringify({ respuesta: respuestaIA })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

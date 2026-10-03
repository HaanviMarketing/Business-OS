import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    })
  : null;

app.get('/api/ai/status', (_req, res) => {
  res.json({
    connected: !!process.env.GEMINI_API_KEY,
    model: 'gemini-3.8-flash',
    features: ['causal_analysis', 'structured_actions', 'telemetry_grounding']
  });
});

app.post('/api/ai/ask', async (req, res) => {
  const { prompt, context } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  if (ai) {
    const promptPayload = `You are the executive AI Brain for BusinessOS ("Your Business. One Brain.").
Live Business Context Summary:
${typeof context === 'string' ? context : JSON.stringify(context, null, 2)}

User Business Query: "${prompt}"

Provide an executive, highly accurate answer with causal reasoning (explaining the root cause, connecting cross-departmental factors like receivables, inventory stock, sales cycle, or cash burn), 2 to 4 concrete supporting metric data points, and a decisive recommended action with action buttons.`;

    const modelConfig = {
      systemInstruction:
        "You are the central executive AI Brain of BusinessOS. You provide concise, sharp, high-impact business intelligence with causal root-cause analysis and clear recommendations. Always ground numbers in the provided business context.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          answer: {
            type: Type.STRING,
            description: "Direct executive answer addressing the user's business question with concrete numbers."
          },
          explanation: {
            type: Type.STRING,
            description: "Deep causal explanation connecting root causes across finance, sales, operations, or inventory."
          },
          supportingData: {
            type: Type.ARRAY,
            description: "2 to 4 supporting quantitative data points.",
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                value: { type: Type.STRING },
                meta: { type: Type.STRING }
              },
              required: ["label", "value"]
            }
          },
          recommendedAction: {
            type: Type.STRING,
            description: "Immediate prescriptive action the business owner or executive should take."
          },
          actionButtons: {
            type: Type.ARRAY,
            description: "1 to 3 direct action buttons the user can click.",
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                actionType: { type: Type.STRING },
                primary: { type: Type.BOOLEAN }
              },
              required: ["label", "actionType"]
            }
          }
        },
        required: ["answer", "explanation", "recommendedAction"]
      }
    };

    // Attempt primary model (gemini-3.8-flash) or cascade to high-availability gemini-3.1-flash-lite
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];

    for (const model of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: promptPayload,
          config: modelConfig
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json({
          source: model,
          ...parsed
        });
      } catch (err: any) {
        console.warn(`Model ${model} attempt failed (${err.message || 'unknown'}), trying next model...`);
      }
    }
  }

  return res.json({
    source: 'local-engine',
    fallback: true
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`BusinessOS Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
